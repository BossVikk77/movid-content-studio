const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { FILENAME, POST_TYPE, IMAGE_HOOK, IMAGE_BODY } = process.env;

// Default typography — matches site defaults: T = {hero:60, body:40, lh:1.5}
const HERO  = 60;
const BODY  = 40;
const LH    = 1.5;
const PILL  = Math.round(HERO * 0.43); // 26px

function esc(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Exact replica of buildImg() from movid-academy.html
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1080px;
    background:#0D0D0D;
    overflow:hidden;
    font-family: Arial, sans-serif;
    position:relative;
  }
  .a1 {
    position:absolute; top:-180px; right:-180px;
    width:560px; height:560px;
    background:#7B2FBE; opacity:0.08; border-radius:50%;
  }
  .a2 {
    position:absolute; bottom:-130px; left:-130px;
    width:460px; height:460px;
    background:#1A9E96; opacity:0.08; border-radius:50%;
  }
  .bt  { position:absolute; top:0; left:0; width:100%; height:6px; background:#7B2FBE; }
  .bt2 { position:absolute; top:6px; left:0; width:55%; height:2px; background:#1A9E96; opacity:0.5; }
  .corner {
    position:absolute; top:72px; right:72px;
    width:44px; height:44px;
    border-top:3px solid #1A9E96; border-right:3px solid #1A9E96;
  }
  .safe {
    position:absolute; top:80px; left:80px; right:80px; bottom:110px;
    display:flex; flex-direction:column; justify-content:center;
  }
  .pill {
    font-size:${PILL}px; color:#1A9E96;
    letter-spacing:4px; text-transform:uppercase;
    margin-bottom:34px; font-weight:500;
  }
  .hero {
    font-size:${HERO}px; color:#fff;
    font-family:'Playfair Display', Georgia, serif;
    font-style:italic; font-weight:700;
    line-height:${LH}; margin-bottom:26px;
  }
  .div  { width:72px; height:3px; background:#7B2FBE; margin-bottom:26px; }
  .sub  { font-size:${BODY}px; color:#bbb; line-height:${LH}; font-weight:400; }
  .logo-area {
    position:absolute; bottom:50px; right:58px;
    display:flex; align-items:center; gap:14px;
  }
  .bname { font-size:30px; color:#fff; font-weight:700; letter-spacing:1px; }
  .logo-area img { height:46px; width:auto; object-fit:contain; }
</style>
</head>
<body>
  <div class="a1"></div>
  <div class="a2"></div>
  <div class="bt"></div>
  <div class="bt2"></div>
  <div class="corner"></div>
  <div class="safe">
    <div class="pill">${esc(POST_TYPE) || 'Movid Academy'}</div>
    <div class="hero">${esc(IMAGE_HOOK)}</div>
    <div class="div"></div>
    <div class="sub">${esc(IMAGE_BODY) || 'Tech is our tool. We will use it.'}</div>
  </div>
  <div class="logo-area">
    <div class="bname">Movid Academy</div>
    <img src="https://i.imgur.com/cG9mIJT.png" alt="Movid Academy" crossorigin="anonymous">
  </div>
</body>
</html>`;

(async () => {
  if (!fs.existsSync('images')) fs.mkdirSync('images');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  // networkidle0 waits for Google Font + Imgur logo to fully load
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  const outputPath = path.join('images', FILENAME);
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();

  console.log(`✅ Image saved: ${outputPath}`);
})();
