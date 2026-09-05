<#
=============================================================================
  XIYU LOGIC STUDIO - 自动化图片处理、EXIF 提取与数据同步脚本
=============================================================================
#>

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 1. 自动检测并配置 Git 路径
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    $candidatePaths = @(
        "D:\Git\cmd",
        "C:\Program Files\Git\cmd",
        "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd"
    )
    foreach ($cp in $candidatePaths) {
        $found = Resolve-Path $cp -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($found -and (Test-Path (Join-Path $found "git.exe"))) {
            $env:PATH = "$found;$env:PATH"
            break
        }
    }
}

Add-Type -AssemblyName System.Drawing

$sourceDir = Join-Path $PSScriptRoot "xiyu"
$thumbsDir = Join-Path $PSScriptRoot "thumbs"
$webDir    = Join-Path $PSScriptRoot "web"
$dataFile  = Join-Path $PSScriptRoot "data.js"

if (-not (Test-Path $thumbsDir)) { [System.IO.Directory]::CreateDirectory($thumbsDir) | Out-Null }
if (-not (Test-Path $webDir))    { [System.IO.Directory]::CreateDirectory($webDir) | Out-Null }

function Get-ExifValue($prop) {
    if ($null -eq $prop) { return $null }
    $type = $prop.Type
    $bytes = $prop.Value
    
    try {
        if ($type -eq 2) {
            return [System.Text.Encoding]::ASCII.GetString($bytes).Trim([char]0).Trim()
        }
        if ($type -eq 3) {
            return [BitConverter]::ToUInt16($bytes, 0)
        }
        if ($type -eq 4) {
            return [BitConverter]::ToUInt32($bytes, 0)
        }
        if ($type -eq 5) {
            $num = [BitConverter]::ToUInt32($bytes, 0)
            $den = [BitConverter]::ToUInt32($bytes, 4)
            if ($den -ne 0) { return ($num / $den) }
            return $num
        }
        if ($type -eq 10) {
            $num = [BitConverter]::ToInt32($bytes, 0)
            $den = [BitConverter]::ToInt32($bytes, 4)
            if ($den -ne 0) { return ($num / $den) }
            return $num
        }
    } catch {
        return $null
    }
    return $null
}

function Resize-ImageFile {
    param(
        [string]$sourcePath,
        [string]$destPath,
        [int]$maxDimension,
        [int]$quality = 85
    )
    
    if (Test-Path $destPath) {
        $srcTime = (Get-Item $sourcePath).LastWriteTimeUtc
        $dstTime = (Get-Item $destPath).LastWriteTimeUtc
        if ($dstTime -ge $srcTime) {
            return
        }
    }

    $srcImage = [System.Drawing.Image]::FromFile($sourcePath)

    # 处理相机 EXIF 旋转方向 (Orientation)
    foreach ($p in $srcImage.PropertyItems) {
        if ($p.Id -eq 0x0112) {
            $orient = [BitConverter]::ToUInt16($p.Value, 0)
            if ($orient -eq 6) { $srcImage.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
            elseif ($orient -eq 8) { $srcImage.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
            elseif ($orient -eq 3) { $srcImage.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
            break
        }
    }

    $origWidth  = $srcImage.Width
    $origHeight = $srcImage.Height

    if ($origWidth -gt $origHeight) {
        $newWidth = [math]::Min($origWidth, $maxDimension)
        $newHeight = [int]($origHeight * ($newWidth / $origWidth))
    } else {
        $newHeight = [math]::Min($origHeight, $maxDimension)
        $newWidth = [int]($origWidth * ($newHeight / $origHeight))
    }

    if ($newWidth -lt 1) { $newWidth = 1 }
    if ($newHeight -lt 1) { $newHeight = 1 }

    $destBitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $graphics.DrawImage($srcImage, 0, 0, $newWidth, $newHeight)

    $jpegCodec = $null
    foreach ($codec in [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()) {
        if ($codec.MimeType -eq "image/jpeg") {
            $jpegCodec = $codec
            break
        }
    }

    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

    $destBitmap.Save($destPath, $jpegCodec, $encoderParams)

    $graphics.Dispose()
    $destBitmap.Dispose()
    $srcImage.Dispose()
}

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  XIYU LOGIC STUDIO 图片处理与 EXIF 提取引擎" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan

$imageExtensions = @('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP')
$files = Get-ChildItem -Path $sourceDir -File | Where-Object { $imageExtensions -contains $_.Extension } | Sort-Object Name -Descending

# 1. 自动清理机制：如果从 xiyu/ 删除了某照片，自动同步清理 thumbs/ 与 web/ 的残留文件
$validBaseNames = @($files | ForEach-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) })
$existingThumbs = Get-ChildItem -Path $thumbsDir -File
$cleanedCount = 0
foreach ($t in $existingThumbs) {
    $tBase = [System.IO.Path]::GetFileNameWithoutExtension($t.Name)
    if ($validBaseNames -notcontains $tBase) {
        Remove-Item $t.FullName -Force -ErrorAction SilentlyContinue
        $wPath = Join-Path $webDir $t.Name
        if (Test-Path $wPath) { Remove-Item $wPath -Force -ErrorAction SilentlyContinue }
        Write-Host "检测到已删除照片，已自动清理缓存: $($t.Name)" -ForegroundColor DarkGray
        $cleanedCount++
    }
}
if ($cleanedCount -gt 0) {
    Write-Host "已清理 $cleanedCount 张已删除照片的缩略图缓存。" -ForegroundColor Green
}

if ($files.Count -eq 0) {
    Write-Host "警告: 在 xiyu 文件夹中未发现图片！" -ForegroundColor Yellow
} else {
    Write-Host "共找到 $($files.Count) 张照片，开始处理与提取参数..." -ForegroundColor Green
}

$galleryItems = @()

foreach ($file in $files) {
    $fileName = $file.Name
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $outThumbName = "$baseName.jpg"
    $outWebName   = "$baseName.jpg"

    $thumbDestPath = Join-Path $thumbsDir $outThumbName
    $webDestPath   = Join-Path $webDir $outWebName

    Write-Host "处理图片: $fileName ..." -NoNewline

    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $propDict = @{}
    foreach ($p in $img.PropertyItems) {
        $propDict[$p.Id] = $p
    }

    $origW = $img.Width
    $origH = $img.Height

    $make       = Get-ExifValue $propDict[0x010F]
    $model      = Get-ExifValue $propDict[0x0110]
    $dateOrig   = Get-ExifValue $propDict[0x9003]
    if (-not $dateOrig) { $dateOrig = Get-ExifValue $propDict[0x0132] }
    $fNumber    = Get-ExifValue $propDict[0x829D]
    $iso        = Get-ExifValue $propDict[0x8827]
    $focal      = Get-ExifValue $propDict[0x920A]
    $lens       = Get-ExifValue $propDict[0xA434]

    $shutterStr = $null
    if ($propDict.ContainsKey(0x829A)) {
        $p = $propDict[0x829A]
        $num = [BitConverter]::ToUInt32($p.Value, 0)
        $den = [BitConverter]::ToUInt32($p.Value, 4)
        if ($num -gt 0 -and $den -gt 0) {
            if ($num -lt $den) {
                $shutterStr = "1/$([math]::Round($den / $num))s"
            } else {
                $shutterStr = "$([math]::Round($num / $den, 1))s"
            }
        }
    }

    $img.Dispose()

    Resize-ImageFile -sourcePath $file.FullName -destPath $thumbDestPath -maxDimension 720 -quality 82
    Resize-ImageFile -sourcePath $file.FullName -destPath $webDestPath -maxDimension 2160 -quality 88

    $cameraStr = "$make $model".Trim()
    if ($cameraStr -eq "SONY ILCE-7RM3A") { $cameraStr = "Sony A7R III A (ILCE-7RM3A)" }
    elseif ($cameraStr -eq "SONY ZV-E10M2") { $cameraStr = "Sony ZV-E10 II" }
    elseif ($cameraStr -eq "SAMSUNG NX2000") { $cameraStr = "Samsung NX2000" }

    $lensStr = $lens
    if ($lensStr -match "E 28-75mm F2.8 A063") { $lensStr = "Tamron 28-75mm F/2.8 Di III VXD G2" }
    elseif ($lensStr -match "E 28-200mm F2.8-5.6 A071") { $lensStr = "Tamron 28-200mm F/2.8-5.6 Di III RXD" }
    elseif (-not $lensStr -and $cameraStr -match "Samsung") { $lensStr = "Super Takumar 55mm f/1.8" }

    $apertureStr = if ($fNumber) { "f/$([math]::Round($fNumber, 1))" } else { "暂无信息" }
    $isoStr      = if ($iso) { "ISO $iso" } else { "暂无信息" }
    $focalStr    = if ($focal) { "$([math]::Round($focal, 0))mm" } else { "暂无信息" }
    $shutterVal  = if ($shutterStr) { $shutterStr } else { "暂无信息" }
    $cameraVal   = if ($cameraStr) { $cameraStr } else { "暂无信息" }
    $lensVal     = if ($lensStr) { $lensStr } else { "暂无信息" }

    $displayDate = ""
    if ($dateOrig -match "(\d{4}):(\d{2}):(\d{2})") {
        $displayDate = "$($matches[1]) / $($matches[2]) / $($matches[3])"
    } else {
        if ($baseName -match "(\d{4})(\d{2})(\d{2})") {
            $displayDate = "$($matches[1]) / $($matches[2]) / $($matches[3])"
        } else {
            $displayDate = "近期拍摄"
        }
    }

    # 针对 NX2000 转接手动镜头的特定历史照片固定参数 (0131 两张与 1122-7 光圈 f/2 焦距 55mm，1109 光圈 f/1.8 焦距 55mm，相机 Samsung NX2000)
    if ($baseName -eq "20251109") {
        $cameraVal   = "Samsung NX2000"
        $lensVal     = "Super Takumar 55mm f/1.8"
        $apertureStr = "f/1.8"
        $focalStr    = "55mm"
    } elseif ($baseName -eq "20260131-1" -or $baseName -eq "20260131-9" -or $baseName -eq "20251122-7") {
        $cameraVal   = "Samsung NX2000"
        $lensVal     = "Super Takumar 55mm f/1.8"
        $apertureStr = "f/2"
        $focalStr    = "55mm"
    }

    $aspectRatio = [math]::Round($origW / [math]::Max($origH, 1), 4)

    $itemJson = "  {`n" +
        "    `"id`": `"$baseName`",`n" +
        "    `"fileName`": `"$fileName`",`n" +
        "    `"thumb`": `"thumbs/$outThumbName`",`n" +
        "    `"web`": `"web/$outWebName`",`n" +
        "    `"original`": `"xiyu/$fileName`",`n" +
        "    `"width`": $origW,`n" +
        "    `"height`": $origH,`n" +
        "    `"aspectRatio`": $aspectRatio,`n" +
        "    `"date`": `"$displayDate`",`n" +
        "    `"exif`": {`n" +
        "      `"camera`": `"$cameraVal`",`n" +
        "      `"lens`": `"$lensVal`",`n" +
        "      `"aperture`": `"$apertureStr`",`n" +
        "      `"shutter`": `"$shutterVal`",`n" +
        "      `"iso`": `"$isoStr`",`n" +
        "      `"focalLength`": `"$focalStr`",`n" +
        "      `"rawDate`": `"$dateOrig`"`n" +
        "    }`n" +
        "  }"
    $galleryItems += $itemJson
    Write-Host " [完成]" -ForegroundColor Green
}

$articleDataBlock = @"
// ==========================================
// 1. 公众号文章板块：思绪切片 (Mind Slices)
// 如需添加新文章，只需复制一份下方对象，填入你的文章标题、链接与摘要即可：
// ==========================================
const articleData = [
  {
    title: "由一道题引发的思考",
    date: "2025 / 09 / 24",
    summary: "从具体问题出发，剖析思维脉络与深层逻辑思考。",
    url: "https://mp.weixin.qq.com/s/wrq8bHkXAtFApLXR4gArEg",
    tag: "思考随笔"
  },
  {
    title: "由自身经历浅显地谈一谈我对于上海市高考的理解与感悟（Ⅰ: 语文篇）",
    date: "2026 / 07 / 24",
    summary: "立足亲身经历与备考观察，分享关于上海高考语文的系统认知与感悟。",
    url: "https://mp.weixin.qq.com/s/wHNv3QLal6ta-9CfrTmxGw?scene=1&click_id=493130552",
    tag: "高考感悟 · 语文"
  },
  {
    title: "由自身经历浅显地谈一谈我对于上海市高考的理解与感悟（Ⅱ: 数学篇）",
    date: "2026 / 08 / 09",
    summary: "谈一谈我眼中的数学，关于逻辑构建、知识体系与做题思考的深度梳理。",
    url: "https://mp.weixin.qq.com/s/G5ZKGlPfryYcJIJbtGP2og",
    tag: "高考感悟 · 数学"
  }
];
"@

$gearDataBlock = @"
// ==========================================
// 2. 拍摄器材数据 (Equipment)
// ==========================================
const gearData = [
  {
    camera: "SONY A7R III A",
    lenses: [
      "Tamron 28-75mm F/2.8 Di III VXD G2"
    ]
  },
  {
    camera: "SAMSUNG NX2000",
    lenses: [
      "Super Takumar 55mm f/1.8",
      "SAMSUNG NX 20-50mm f/3.5-5.6 i-Fn"
    ]
  }
];
"@

$logDataBlock = @"
// ==========================================
// 3. 网站更新日志 (Logs)
// ==========================================
const logData = [
  {
    date: "2026 / 02 / 29",
    content: "网站全新改版上线：重构思绪切片与定格瞬间两大板块，引入极速双层图片优化管线与 EXIF 悬浮卡片。"
  },
  {
    date: "2026 / 02 / 03",
    content: "研究视觉效果与动效优化，探索极简大气的前端交互体验。"
  },
  {
    date: "2026 / 02 / 02",
    content: "第一次试运行个人主页网站，记录摄影与思考。"
  }
];
"@

$galleryDataBlock = "const galleryData = [`n" + ($galleryItems -join ",`n") + "`n];"

$finalJs = "$articleDataBlock`n`n$gearDataBlock`n`n$galleryDataBlock`n`n$logDataBlock`n"

[System.IO.File]::WriteAllText($dataFile, $finalJs, [System.Text.UTF8Encoding]::new($true))
Write-Host "`n[1/2] 成功生成并更新 data.js（无乱码 UTF-8）" -ForegroundColor Green
Write-Host "[1/2] 缩略图已同步至 thumbs/，2K预览已同步至 web/" -ForegroundColor Green

# 3. Git 自动提交与推送到 GitHub
Write-Host "`n=====================================================" -ForegroundColor Cyan
Write-Host "  [2/2] 正在同步到 GitHub 与 Cloudflare..." -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan

if (Get-Command git -ErrorAction SilentlyContinue) {
    git add thumbs/ web/ data.js xiyu/
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "检测到数据或图片有更新，正在提交并推送..." -ForegroundColor Yellow
        git commit -m "Auto update: photos and metadata sync"
        $pushOutput = git push origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 恭喜！全部推送成功！" -ForegroundColor Green
            Write-Host "✓ Cloudflare Pages 正在自动拉取并部署上线（预计 10~30 秒内生效）。" -ForegroundColor Green
            Write-Host "✓ 访问网站: https://xiyu-logicstudio.site" -ForegroundColor Cyan
        } else {
            Write-Host "`n⚠ 推送遇到问题，输出详情如下:" -ForegroundColor Red
            Write-Host "$pushOutput" -ForegroundColor Red
        }
    } else {
        Write-Host "✓ 当前文件无新变动，已是最新状态，无需重复推送。" -ForegroundColor Green
    }
} else {
    Write-Host "⚠ 系统未找到 Git 命令，已跳过云端推送。本地图片与数据已全部处理完毕。" -ForegroundColor Yellow
}

Write-Host "`n=====================================================" -ForegroundColor Cyan
Write-Host "  全部流程执行完毕！" -ForegroundColor Cyan
Write-Host "=====================================================`n" -ForegroundColor Cyan