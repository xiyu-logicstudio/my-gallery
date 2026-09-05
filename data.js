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

const galleryData = [
  {
    "id": "20260904_7",
    "fileName": "20260904_7.jpg",
    "thumb": "thumbs/20260904_7.jpg",
    "web": "web/20260904_7.jpg",
    "original": "xiyu/20260904_7.jpg",
    "width": 7790,
    "height": 5017,
    "aspectRatio": 1.5527,
    "date": "2026 / 09 / 02",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/2.8",
      "shutter": "1/125s",
      "iso": "ISO 100",
      "focalLength": "75mm",
      "rawDate": "2026:09:02 15:59:42"
    }
  },
  {
    "id": "20260904_5",
    "fileName": "20260904_5.jpg",
    "thumb": "thumbs/20260904_5.jpg",
    "web": "web/20260904_5.jpg",
    "original": "xiyu/20260904_5.jpg",
    "width": 5304,
    "height": 5304,
    "aspectRatio": 1,
    "date": "2026 / 09 / 02",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/2.8",
      "shutter": "1/125s",
      "iso": "ISO 2500",
      "focalLength": "28mm",
      "rawDate": "2026:09:02 14:10:54"
    }
  },
  {
    "id": "20260904_1",
    "fileName": "20260904_1.jpg",
    "thumb": "thumbs/20260904_1.jpg",
    "web": "web/20260904_1.jpg",
    "original": "xiyu/20260904_1.jpg",
    "width": 7952,
    "height": 4951,
    "aspectRatio": 1.6061,
    "date": "2026 / 09 / 02",
    "exif": {
      "camera": "Sony A7R III A (ILCE-7RM3A)",
      "lens": "Tamron 28-75mm F/2.8 Di III VXD G2",
      "aperture": "f/2.8",
      "shutter": "1/125s",
      "iso": "ISO 100",
      "focalLength": "28mm",
      "rawDate": "2026:09:02 14:26:48"
    }
  },
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
      "aperture": "f/2",
      "shutter": "1/200s",
      "iso": "ISO 160",
      "focalLength": "55mm",
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
      "aperture": "f/2",
      "shutter": "1/400s",
      "iso": "ISO 125",
      "focalLength": "55mm",
      "rawDate": "2026:01:31 10:53:53"
    }
  },
  {
    "id": "20260114-24",
    "fileName": "20260114-24.jpg",
    "thumb": "thumbs/20260114-24.jpg",
    "web": "web/20260114-24.jpg",
    "original": "xiyu/20260114-24.jpg",
    "width": 5723,
    "height": 3426,
    "aspectRatio": 1.6705,
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
      "aperture": "f/2",
      "shutter": "1/400s",
      "iso": "ISO 100",
      "focalLength": "55mm",
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
      "camera": "Samsung NX2000",
      "lens": "Super Takumar 55mm f/1.8",
      "aperture": "f/1.8",
      "shutter": "1/80s",
      "iso": "ISO 400",
      "focalLength": "55mm",
      "rawDate": "2025:11:09 15:23:10"
    }
  }
];

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
