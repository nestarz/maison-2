const puppeteer = require("puppeteer");
const sharp = require("sharp");
const fs = require("fs-extra");
const { dirname } = require("path");

const chunks = (array, parts) => {
  let result = [];
  const duplicate = [...array];
  for (let i = parts; i > 0; i--) {
    result.push(duplicate.splice(0, Math.ceil(duplicate.length / i)));
  }
  return result;
};

const screenshot = async (urls_paths, instances = 2) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: ["--enable-features=NetworkService"]
  });

  const success = [];
  const runs = chunks(urls_paths, instances).map(async chunk => {
    const page = await browser.newPage();
    for (const { url, w800, w400, w200 } of chunk) {
      console.log(w400);
      if (!url) {
        console.log("Url null. ", url, w800);
        continue;
      }

      if (fs.existsSync(w800)) {
        success.push({ url, w800, w400, w200 });
        console.log("File exists. Aborting.", w800);
        continue;
      }

      fs.mkdir(dirname(w800), { recursive: true }, err => {
        err && console.log("Error", err);
      });

      try {
        const gotoconf = { waitUntil: "networkidle0", timeout: 20000 };
        await page.goto(url, gotoconf);
        const buffer = await page.screenshot({ path: w800 });
        await sharp(w800)
          .resize(400)
          .toFile(w400);
        await sharp(w800)
          .resize(200)
          .toFile(w200);
        success.push({ url, w800, w400, w200 });
        console.log("Success", url);
      } catch (error) {
        console.log("Error.", error, url);
      }
    }
  });

  await Promise.all(runs);
  await browser.close();
  return success;
};

module.exports = screenshot;
