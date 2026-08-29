// ==========================================
// 1. 鍏紬鍙锋枃绔犳澘鍧楋細鎬濈华鍒囩墖 (Mind Slices)
// 銆愭暀绋嬶細濡備綍娣诲姞鏂版枃绔犮€?// 澶嶅埗 `{ ... },` 杩欎竴鏁村潡锛屾斁鍒?`articleData` 鐨勬渶鍓嶉潰鎴栨渶鍚庨潰銆?// 灏嗛噷闈㈢殑 title锛堟爣棰橈級銆乨ate锛堟棩鏈燂級銆乻ummary锛堟憳瑕侊級銆乽rl锛堟枃绔犻摼鎺ワ級鍜?tag锛堟爣绛撅級淇敼涓轰綘鏂扮殑鍐呭銆?// 娉ㄦ剰姣忕瘒鏂囩珷鐨勫ぇ鎷彿 {} 涔嬮棿蹇呴』瑕佹湁涓€涓嫳鏂囬€楀彿 `,` 鍒嗛殧銆?// ==========================================
const articleData = [
  {
    title: "鐢变竴閬撻寮曞彂鐨勬€濊€?,
    date: "2025 / 09 / 24",
    summary: "浠庡叿浣撻棶棰樺嚭鍙戯紝鍓栨瀽鎬濈淮鑴夌粶涓庢繁灞傞€昏緫鎬濊€冦€?,
    url: "https://mp.weixin.qq.com/s/wrq8bHkXAtFApLXR4gArEg",
    tag: "鎬濊€冮殢绗?
  },
  {
    title: "鐢辫嚜韬粡鍘嗘祬鏄惧湴璋堜竴璋堟垜瀵逛簬涓婃捣甯傞珮鑰冪殑鐞嗚В涓庢劅鎮燂紙鈪? 璇枃绡囷級",
    date: "2026 / 07 / 24",
    summary: "绔嬭冻浜茶韩缁忓巻涓庡鑰冭瀵燂紝鍒嗕韩鍏充簬涓婃捣楂樿€冭鏂囩殑绯荤粺璁ょ煡涓庢劅鎮熴€?,
    url: "https://mp.weixin.qq.com/s/wHNv3QLal6ta-9CfrTmxGw?scene=1&click_id=493130552",
    tag: "楂樿€冩劅鎮?路 璇枃"
  },
  {
    title: "鐢辫嚜韬粡鍘嗘祬鏄惧湴璋堜竴璋堟垜瀵逛簬涓婃捣甯傞珮鑰冪殑鐞嗚В涓庢劅鎮燂紙鈪? 鏁板绡囷級",
    date: "2026 / 08 / 09",
    summary: "璋堜竴璋堟垜鐪间腑鐨勬暟瀛︼紝鍏充簬閫昏緫鏋勫缓銆佺煡璇嗕綋绯讳笌鍋氶鎬濊€冪殑娣卞害姊崇悊銆?,
    url: "https://mp.weixin.qq.com/s/G5ZKGlPfryYcJIJbtGP2og",
    tag: "楂樿€冩劅鎮?路 鏁板"
  }
];

// ==========================================
// 2. 鎷嶆憚鍣ㄦ潗鏁版嵁 (Equipment)
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

// ==========================================
// 4. 鎽勫奖鐢诲粖鏁版嵁 (Gallery)
// 銆愭暀绋嬶細濡備綍娣诲姞鏂扮収鐗囥€?// 1. 灏嗗師鍥炬斁鍒?`web/` 鏂囦欢澶癸紝灏嗙缉灏忓悗鐨勭缉鐣ュ浘鏀惧埌 `thumbs/` 鏂囦欢澶广€?// 2. 澶嶅埗涓嬫柟鐨勪竴涓?`{ ... },` 鍧楀埌 `galleryData` 鐨勬渶鍓嶉潰銆?// 3. 淇敼 `thumb` 鍜?`web` 鐨勫浘鐗囪矾寰勩€?// 4. 鍦?`exif` 閲岄潰濉啓浣犵殑鐩告満 (camera) 鍜?闀滃ご (lens)锛屽鏋滀笉鐭ラ亾鍙互鍐?'N/A'銆?// ==========================================
const galleryData = [
  {
    "id": "20260815_4",
    "fileName": "20260815_4.jpg",
    "thumb": "thumbs/20260815_4.jpg",
    "web": "web/20260815_4.jpg",
    "original": "xiyu/20260815_4.jpg",
    "width": 5304,
    "height": 4022,
    "aspectRatio": 1.3187,
    "date": "2026 / 08 / 15",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/4",
      "shutter": "1/125s",
      "iso": "ISO 1250",
      "focalLength": "71mm",
      "rawDate": "2026:08:15 18:17:02"
    }
  },
  {
    "id": "20260815",
    "fileName": "20260815.jpg",
    "thumb": "thumbs/20260815.jpg",
    "web": "web/20260815.jpg",
    "original": "xiyu/20260815.jpg",
    "width": 5304,
    "height": 7605,
    "aspectRatio": 0.6974,
    "date": "2026 / 08 / 15",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/4",
      "shutter": "1/200s",
      "iso": "ISO 1600",
      "focalLength": "28mm",
      "rawDate": "2026:08:15 17:52:56"
    }
  },
  {
    "id": "20260722_5",
    "fileName": "20260722_5.jpg",
    "thumb": "thumbs/20260722_5.jpg",
    "web": "web/20260722_5.jpg",
    "original": "xiyu/20260722_5.jpg",
    "width": 5304,
    "height": 7426,
    "aspectRatio": 0.7142,
    "date": "2026 / 07 / 22",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/2.8",
      "shutter": "1/200s",
      "iso": "ISO 4000",
      "focalLength": "28mm",
      "rawDate": "2026:07:22 18:45:56"
    }
  },
  {
    "id": "20260627_5",
    "fileName": "20260627_5.jpg",
    "thumb": "thumbs/20260627_5.jpg",
    "web": "web/20260627_5.jpg",
    "original": "xiyu/20260627_5.jpg",
    "width": 6187,
    "height": 5197,
    "aspectRatio": 1.1905,
    "date": "2026 / 06 / 27",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/2.8",
      "shutter": "1/400s",
      "iso": "ISO 200",
      "focalLength": "75mm",
      "rawDate": "2026:06:27 12:46:44"
    }
  },
  {
    "id": "20260625_2",
    "fileName": "20260625_2.jpg",
    "thumb": "thumbs/20260625_2.jpg",
    "web": "web/20260625_2.jpg",
    "original": "xiyu/20260625_2.jpg",
    "width": 7952,
    "height": 4132,
    "aspectRatio": 1.9245,
    "date": "2026 / 06 / 25",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/4",
      "shutter": "1/100s",
      "iso": "ISO 400",
      "focalLength": "28mm",
      "rawDate": "2026:06:25 18:59:48"
    }
  },
  {
    "id": "20260625",
    "fileName": "20260625.jpg",
    "thumb": "thumbs/20260625.jpg",
    "web": "web/20260625.jpg",
    "original": "xiyu/20260625.jpg",
    "width": 7952,
    "height": 5304,
    "aspectRatio": 1.4992,
    "date": "2026 / 06 / 25",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/4",
      "shutter": "1/100s",
      "iso": "ISO 2500",
      "focalLength": "28mm",
      "rawDate": "2026:06:25 19:32:06"
    }
  },
  {
    "id": "20260131-9",
    "fileName": "20260131-9.jpg",
    "thumb": "thumbs/20260131-9.jpg",
    "web": "web/20260131-9.jpg",
    "original": "xiyu/20260131-9.jpg",
    "width": 3268,
    "height": 4430,
    "aspectRatio": 0.7377,
    "date": "2026 / 01 / 31",
    "exif": {
      "camera": "Samsung NX2000",
      "lens": "Super Takumar 55mm f/1.8",
      "aperture": "鏆傛棤淇℃伅",
      "shutter": "1/200s",
      "iso": "ISO 160",
      "focalLength": "鏆傛棤淇℃伅",
      "rawDate": "2026:01:31 11:40:21"
    }
  },
  {
    "id": "20260131-1",
    "fileName": "20260131-1.jpg",
    "thumb": "thumbs/20260131-1.jpg",
    "web": "web/20260131-1.jpg",
    "original": "xiyu/20260131-1.jpg",
    "width": 4323,
    "height": 2859,
    "aspectRatio": 1.5121,
    "date": "2026 / 01 / 31",
    "exif": {
      "camera": "Samsung NX2000",
      "lens": "Super Takumar 55mm f/1.8",
      "aperture": "鏆傛棤淇℃伅",
      "shutter": "1/400s",
      "iso": "ISO 125",
      "focalLength": "鏆傛棤淇℃伅",
      "rawDate": "2026:01:31 10:53:53"
    }
  },
  {
    "id": "20260114-24",
    "fileName": "20260114-24.jpg",
    "thumb": "thumbs/20260114-24.jpg",
    "web": "web/20260114-24.jpg",
    "original": "xiyu/20260114-24.jpg",
    "width": 5902,
    "height": 3426,
    "aspectRatio": 1.7227,
    "date": "2026 / 01 / 14",
    "exif": {
      "camera": "Sony ZV-E10 II",
      "lens": "Tamron 28-200mm F/2.8-5.6 Di III RXD",
      "aperture": "f/5.6",
      "shutter": "1/640s",
      "iso": "ISO 100",
      "focalLength": "200mm",
      "rawDate": "2026:01:14 13:17:21"
    }
  },
  {
    "id": "20251122-7",
    "fileName": "20251122-7.jpg",
    "thumb": "thumbs/20251122-7.jpg",
    "web": "web/20251122-7.jpg",
    "original": "xiyu/20251122-7.jpg",
    "width": 2330,
    "height": 2533,
    "aspectRatio": 0.9199,
    "date": "2025 / 11 / 22",
    "exif": {
      "camera": "Samsung NX2000",
      "lens": "Super Takumar 55mm f/1.8",
      "aperture": "鏆傛棤淇℃伅",
      "shutter": "1/400s",
      "iso": "ISO 100",
      "focalLength": "鏆傛棤淇℃伅",
      "rawDate": "2025:11:22 11:31:31"
    }
  },
  {
    "id": "20251109",
    "fileName": "20251109.jpg",
    "thumb": "thumbs/20251109.jpg",
    "web": "web/20251109.jpg",
    "original": "xiyu/20251109.jpg",
    "width": 5472,
    "height": 3648,
    "aspectRatio": 1.5,
    "date": "2025 / 11 / 09",
    "exif": {
      "camera": "鏆傛棤淇℃伅",
      "lens": "鏆傛棤淇℃伅",
      "aperture": "鏆傛棤淇℃伅",
      "shutter": "1/80s",
      "iso": "ISO 400",
      "focalLength": "鏆傛棤淇℃伅",
      "rawDate": "2025:11:09 15:23:10"
    }
  },
  {
    "id": "20250831-1",
    "fileName": "20250831-1.jpg",
    "thumb": "thumbs/20250831-1.jpg",
    "web": "web/20250831-1.jpg",
    "original": "xiyu/20250831-1.jpg",
    "width": 3263,
    "height": 2263,
    "aspectRatio": 1.4419,
    "date": "2025 / 08 / 31",
    "exif": {
      "camera": "Samsung NX2000",
      "lens": "Super Takumar 55mm f/1.8",
      "aperture": "鏆傛棤淇℃伅",
      "shutter": "1/800s",
      "iso": "ISO 100",
      "focalLength": "鏆傛棤淇℃伅",
      "rawDate": "2025:08:31 15:24:19"
    }
  }
];

// ==========================================
// 3. 缃戠珯鏇存柊鏃ュ織 (Logs)
// ==========================================
const logData = [
  {
    date: "2026 / 02 / 29",
    content: "缃戠珯鍏ㄦ柊鏀圭増涓婄嚎锛氶噸鏋勬€濈华鍒囩墖涓庡畾鏍肩灛闂翠袱澶ф澘鍧楋紝寮曞叆鏋侀€熷弻灞傚浘鐗囦紭鍖栫绾夸笌 EXIF 鎮诞鍗＄墖銆?
  },
  {
    date: "2026 / 02 / 03",
    content: "鐮旂┒瑙嗚鏁堟灉涓庡姩鏁堜紭鍖栵紝鎺㈢储鏋佺畝澶ф皵鐨勫墠绔氦浜掍綋楠屻€?
  },
  {
    date: "2026 / 02 / 02",
    content: "绗竴娆¤瘯杩愯涓汉涓婚〉缃戠珯锛岃褰曟憚褰变笌鎬濊€冦€?
  }
];
