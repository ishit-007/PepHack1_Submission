let path = require("path");
let puppeteer = require("puppeteer");
let mainpage;

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
function addwatermark(file, data) {
  let browseropenp = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--incognito", "--start-maximized"],
  });
  browseropenp
    .then(function (browser) {
      let all_pages_promise = browser.pages();
      return all_pages_promise;
    })
    .then(function (allpagesarr) {
      mainpage = allpagesarr[0];
      let open_watermark_site_promise = mainpage.goto(
        "https://www.ilovepdf.com/pdf_add_watermark"
      );
      return open_watermark_site_promise;
    })
    .then(function () {
      let select_files_promise = waitandclick(
        ".uploader__btn.tooltip--left.active"
      );
      return select_files_promise;
    })
    .then(async function () {
      const input = await mainpage.$('input[type="file"]');
      await input.uploadFile(file);
    })
    .then(function () {
      let select_watermark_position = waitandclick(
        '.d-flex div[data-vertical="bottom"]'
      );
      return select_watermark_position;
    })
    .then(function () {
      let click_watermarktext_promise = waitandclick('input[name="text"]');
      return click_watermarktext_promise;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let bksp = mainpage.keyboard.press("Backspace");
      return bksp;
    })
    .then(function () {
      let watermark_type_promise = mainpage.type('input[name="text"]', data, {
        delay: 200,
      });
      return watermark_type_promise;
    })
    .then(function () {
      let bold_text_promise = waitandclick(".editor__option.bold");
      return bold_text_promise;
    })
    .then(function () {
      function selectcolor() {
        return document
          .querySelectorAll('span[data-color="rgb(255, 0, 0)"]')[1]
          .click();
      }
      let color_selector_option_promise = mainpage.evaluate(selectcolor);
      return color_selector_option_promise;
    })
    .then(function () {
      let add_watermark_promise = waitandclick("#processTask");
      return add_watermark_promise;
    })
    .then(function () {
      let download_watermarked_file_promise = waitandclick(
        ".downloader__btn.active"
      );
      return download_watermarked_file_promise;
    });
}
module.exports = {
  addwatermark: addwatermark,
};
