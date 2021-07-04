let path = require("path");
let puppeteer = require("puppeteer");
let mainpage;
function PDFconversion(filepath) {
  let browseropenp = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--incognito", "--start-maximized"],
  });
  browseropenp
    .then(function (browser) {
      let allpagesp = browser.pages();
      return allpagesp;
    })
    .then(function (allpagesarr) {
      mainpage = allpagesarr[0];
      let compress_site_p = mainpage.goto(
        "https://www.ilovepdf.com/compress_pdf"
      );
      return compress_site_p;
    })
    .then(function () {
      let selectfilesbuttonp = waitandclick("#pickfiles");
      return selectfilesbuttonp;
    })
    .then(async function () {
      const input = await mainpage.$('input[type="file"]');
      await input.uploadFile(filepath);
    })
    .then(function () {
      let filedownloadp = waitandclick("#processTaskTextBtn");
      return filedownloadp;
    })
    .then(function () {
      console.log("file downloaded");
    });
}
function waitandclick(selector) {
  return new Promise(function (resolve, reject) {
    let waitP = mainpage.waitForSelector(selector, { visible: true });
    waitP
      .then(function () {
        let clickP = mainpage.click(selector);
        return clickP;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
module.exports = {
  PDFconversion:PDFconversion,
}