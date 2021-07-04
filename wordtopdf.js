let path = require("path");
let puppeteer = require("puppeteer");
let filepath =
  "C:\\Users\\Ishit Singh\\Desktop\\PAB_WEB_DEV\\Automation_javascript\\pepcoding hackathon\\DSA LAB ASSIGNMENT 3.docx";
let mainpage;
function Convert2PDF(filepath) {
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
      let opencoversionsitep = mainpage.goto(
        "https://smallpdf.com/word-to-pdf"
      );
      return opencoversionsitep;
    })
    .then(function () {
      let selectfilesbuttonp = waitandclick(".l3tlg0-0.hrcxSS");
      return selectfilesbuttonp;
    })
    .then(async function () {
      const input = await mainpage.$('input[type="file"]');
      await input.uploadFile(filepath);
    })
    .then(function () {
      let filedownloadp = waitandclick(".l3tlg0-0.eqlXyA");
      return filedownloadp;
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
  Convert2PDF:Convert2PDF,
}
//Convert2PDF(filepath);