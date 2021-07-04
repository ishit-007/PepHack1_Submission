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
function playMusic(song) {
  let browseropenp = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--incognito", "--start-maximized"],
  });
  browseropenp
    .then(function (browser) {
      browserInstance = browser;
      let all_pages_promise = browser.pages();
      return all_pages_promise;
    })
    .then(function (allpagesarr) {
      mainpage = allpagesarr[0];
      let open_YT_promise = mainpage.goto("https://www.youtube.com/");
      return open_YT_promise;
    })
    .then(function () {
      let click_searchbox_promise = waitandclick('input[id="search"]');
      return click_searchbox_promise;
    })
    .then(function () {
      let song_type_promise = mainpage.type(
        'input[id="search"]',
        song + " song"
      );
      return song_type_promise;
    })
    .then(function () {
      let search_promise = waitandclick('button[id="search-icon-legacy"]');
      return search_promise;
    })
    .then(function () {
      let song_click_promise = waitandclick(".style-scope.ytd-video-renderer");
      return song_click_promise;
    })
    .then(function () {
      let skip_add_promise = waitandclick(".ytp-ad-skip-button.ytp-button");
      return skip_add_promise;
    })
    .catch(function () {});
}
module.exports = {
    playMusic:playMusic,
}