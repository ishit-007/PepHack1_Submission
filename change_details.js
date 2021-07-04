// will take a PDF as input and will perform the "Find and Replace" operation for multiple data(max 3 sets)
let path = require("path");
let puppeteer = require("puppeteer");
let mainpage;
function changeDetails(filepath, data1, data2, data3, data4, data5, data6) {
  let browseropenp = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--incognito", "--start-maximized"],
  });
  browseropenp
    .then(function (browser) {
      let all_pages_promise = browser.pages(); //gives all pgs of browser as an array(currently only 1 pg)
      return all_pages_promise;
    })
    .then(function (allpagesarr) {
      mainpage = allpagesarr[0];
      let replace_site_p = mainpage.goto(
        "http://www.pdfdu.com/pdf-replace-text.aspx"
      );
      return replace_site_p;
    })
    .then(function () {
      let original_name_promise = mainpage.type(
        'input[name="ctl00$content$txtFind1"]',
        data1,
        { delay: 300 }
      );
      return original_name_promise;
    })
    .then(function () {
      let my_name_promise = mainpage.type(
        'input[name="ctl00$content$txtReplace1"]',
        data2,
        { delay: 300 }
      );
      return my_name_promise;
    })
    .then(function () {
      let original_roll_number_promise = mainpage.type(
        'input[name="ctl00$content$txtFind2"]',
        data3,
        { delay: 300 }
      );
      return original_roll_number_promise;
    })
    .then(function () {
      let my_roll_number_promise = mainpage.type(
        'input[name="ctl00$content$txtReplace2"]',
        data4,
        { delay: 300 }
      );
      return my_roll_number_promise;
    })
    .then(function () {
      let original_batch_promise = mainpage.type(
        'input[name="ctl00$content$txtFind3"]',
        data5,
        { delay: 300 }
      );
      return original_batch_promise;
    })
    .then(function () {
      let my_batch_promise = mainpage.type(
        'input[name="ctl00$content$txtReplace3"]',
        data6,
        { delay: 300 }
      );
      return my_batch_promise;
    })
    .then(function () {
      let selectfilesbutton_promise = waitandclick("#lblnewFile");
      return selectfilesbutton_promise;
    })
    .then(async function () {
      const input = await mainpage.$('input[type="file"]');
      await input.uploadFile(filepath);
    })
    .then(function () {
      let replace_text_promise = waitandclick('input[value="Replace Text "] ');
      return replace_text_promise;
    })
    .then(function () {
      setTimeout(function () {
        let download_promise = waitandclick(
          "#ctl00_content_lblNew :nth-child(2)"
        );
        return download_promise;
      }, 25000);
    });
}
function waitandclick(selector) {
  return new Promise(function (resolve, reject) {
    let waitP = mainpage.waitForSelector(selector, {
      visible: true,
      setTimeout: 600000,
    });
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
  changeDetails: changeDetails,
};
