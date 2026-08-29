# XIYU LOGIC STUDIO (xiyu-logicstudio.site)

欢迎来到 **LOGIC STUDIO** 个人主页与影像档案库。

本网站经过全新重构，采用现代极简黑白灰高质感设计（Matte Obsidian & Frosted Glass），内置丝滑微动效与响应式布局，并搭载了高性能双层图片压制引擎与 EXIF 元数据自动解析系统。

---

## 📂 核心文件目录结构

```text
xiyu-logicstudio/
├── index.html          # 网站核心页面（开屏 Hero、思绪切片、定格瞬间、EXIF Lightbox、互动区）
├── data.js             # 网站核心数据源（公众号文章、摄影器材、相册 EXIF 数据、更新日志）
├── sync_images.ps1     # 自动化图片优化与 EXIF 提取同步脚本
├── xiyu/               # 📷 原始高像素母片备份文件夹
├── thumbs/             # ⚡ 极速缩略图（~80KB/张，用于画廊网格秒开，杜绝任何卡顿）
└── web/                # 🔍 网页 2K 高清预览图（~500KB/张，用于点击放大与查看细节）
```

---

## 📝 1. 如何添加新的公众号文章（思绪切片）

打开根目录下的 `data.js`，找到顶部的 `articleData` 数组。复制一份模板粘贴进去，填入你的标题与公众号链接即可：

```javascript
const articleData = [
  // 在这里添加你的新文章：
  {
    title: "你的新文章标题",
    date: "2026 / 03 / 01",
    summary: "用一两句话简要概括这篇文章的核心内容...",
    url: "https://mp.weixin.qq.com/s/你的文章链接",
    tag: "思考随笔" // 标签自定义：如 摄影手记 / 随想 / 美学探索 等
  },
  // 原有文章...
];
```
> 保存 `data.js` 后，刷新网页即可自动渲染出新文章卡片，点击会在新标签页直接打开！

---

## 📷 2. 如何添加新的摄影照片（定格瞬间）

1. 把拍摄的原始照片（`.jpg`, `.jpeg`, `.png` 等）放进 `xiyu/` 文件夹中。
2. 在当前目录下打开 PowerShell，运行同步脚本：
   ```powershell
   .\sync_images.ps1
   ```
3. **脚本会自动完成以下所有工作**：
   - 自动读取照片内部的 EXIF 元数据（相机型号、镜头型号、光圈、快门、ISO、焦距、拍摄时间）；
   - 自动生成高质量流媒体缩略图（`thumbs/`）与 2K 高清大图（`web/`）；
   - 自动更新 `data.js` 中的画廊列表。
4. 刷新网页，新照片及其参数卡片就会自动展示！

---

## ⚡ 3. 图片性能优化原理（为什么之前会卡，现在不卡？）

* **原先的痛点**：原片单张高达 15MB~35MB，12 张照片总共超过 160MB。浏览器一次性加载 160MB 高分辨率原图，会导致极高的显存占用、网络阻塞以及滑动掉帧。
* **现在的解决方案**：
  1. **画廊缩略图流 (`thumbs/`)**：分辨率控制在 720px，采用高质量双三次插值（High-Quality Bicubic）压制到约 80KB~120KB，12 张图总体积不到 0.7MB，配合 `IntersectionObserver` 懒加载，滑动如丝般顺滑。
  2. **放大查看器 (`web/`)**：当用户点击特定照片时，才按需加载 ~500KB 的 2K 高清图，兼顾放大后的极致锐度与毫秒级加载速度。
  3. **原始母片 (`xiyu/`)**：完好保存在本地，不被破坏。

---

## 🚀 4. 实现“往文件夹上传图片即可自动同步到 GitHub 与网站”的原理与方案

### 💡 核心原理剖析
要实现“放图即同步”，本质上包含 3 个自动化环节：
1. **文件变更监听 (File Watcher)**：系统检测到 `xiyu/` 文件夹中有新文件存入；
2. **触发处理管线 (Build Pipeline)**：自动执行 `sync_images.ps1` 进行图片压缩与 EXIF 提取；
3. **Git 自动提交与推送 (Git Auto-Push)**：自动执行 `git add .` $\to$ `git commit -m "Add new photos"` $\to$ `git push origin main`，随后 GitHub Pages 或服务器自动更新上线。

---

### 🛠️ 推荐实现方式（两种方案供选择）

#### 方案 A：双击一键同步批处理（最稳定、最可控，推荐 ⭐⭐⭐⭐⭐）
在项目根目录创建一个 `一键同步.bat` 文件（已为您创建），每次在 `xiyu/` 放入新照片后，双击这个文件，它就会在后台自动压缩图片、提取 EXIF 并推送到 GitHub！

```bat
@echo off
chcp 65001 >nul
echo 正在处理图片与提取 EXIF 元数据...
powershell -ExecutionPolicy Bypass -File .\sync_images.ps1
echo 正在同步到 GitHub...
git add .
git commit -m "Auto sync: Update photos and gallery data"
git push origin main
echo 同步完成！网站已更新。
pause
```

#### 方案 B：后台自动监听文件夹守护进程（完全自动化）
通过 PowerShell 的 `FileSystemWatcher` 编写一个后台守护服务：只要有图片拖入 `xiyu/`，脚本在 5 秒防抖后自动运行图片处理并 push 到 GitHub。
```powershell
# 启动后台监听
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "$PSScriptRoot\xiyu"
$watcher.Filter = "*.*"
$watcher.EnableRaisingEvents = $true
# 当检测到新文件时自动触发 sync_images.ps1 + git push
```

#### 方案 C：GitHub Actions 云端全自动流水线
如果你直接在网页端或者通过 Git 客户端把照片传到 GitHub 仓库，可以使用 GitHub Actions 在 GitHub 云端服务器上自动运行压缩脚本并发布到 GitHub Pages 静态站点。
