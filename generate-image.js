const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { FILENAME, POST_TYPE, IMAGE_HOOK, IMAGE_BODY } = process.env;

function esc(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1080px; overflow: hidden; background: #0d0d0d; }
</style>
</head>
<body>
<div style="width:1080px;height:1080px;background:#0d0d0d;font-family:Arial,Helvetica,sans-serif;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:100px">

  <div style="position:absolute;top:-100px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(40,20,80,0.9) 0%,transparent 70%)"></div>
  <div style="position:absolute;bottom:-150px;left:-150px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(30,15,60,0.8) 0%,transparent 70%)"></div>

  <div style="position:absolute;top:50px;right:50px;width:36px;height:36px;border-top:3px solid rgba(255,255,255,0.25);border-right:3px solid rgba(255,255,255,0.25)"></div>

  <div style="color:#1A9E96;font-size:17px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;margin-bottom:36px">${esc(POST_TYPE)}</div>

  <h1 style="color:#ffffff;font-size:72px;font-weight:900;line-height:1.1;margin:0 0 28px 0">${esc(IMAGE_HOOK)}</h1>

  <div style="width:64px;height:4px;background:#7B2FBE;border-radius:2px;margin-bottom:40px"></div>

  <p style="color:#aaaaaa;font-size:26px;line-height:1.6;max-width:820px">${esc(IMAGE_BODY)}</p>

  <div style="position:absolute;bottom:60px;right:70px;display:flex;align-items:center;gap:14px">
    <span style="color:#ffffff;font-size:22px;font-weight:bold">Movid Academy</span>
    <div style="width:40px;height:40px;background:linear-gradient(135deg,#7B2FBE,#1A9E96);border-radius:8px;display:flex;align-items:center;justify-content:center">
      <span style="color:#fff;font-size:20px;font-weight:900">M</span>
    </div>
  </div>

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
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  const outputPath = path.join('images', FILENAME);
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();

  console.log(`✅ Image saved: ${outputPath}`);
})();
