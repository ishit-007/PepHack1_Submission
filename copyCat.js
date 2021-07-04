let compressPDFobject = require("./compressPDF");
let fromWordObject = require("./wordtopdf");
let watermarkObject = require("./watermark");
let detailsObject = require("./change_details");
let helperObject = require("./help");
let youTubeObject = require("./youtube");
//List of Commands:
// node copyCat.js details filepath Data1 Data2 Data3 Data4 Data5 Data6 (Data1 will be replaced by Data2) song
// node copyCat.js watermark filepath watermarkText song
// node copyCat.js compress filepath song
// node copyCat.js fromWord filepath song
// node copyCat.js help
let input = process.argv.slice(2);
let command = input[0];
if (command != "help") {
  youTubeObject.playMusic(input[input.length - 1]);
}
if (command == "watermark") {
  watermarkObject.addwatermark(input[1], input[2]);
} else if (command == "compress") {
  compressPDFobject.PDFconversion(input[1]);
} else if (command == "fromWord") {
  fromWordObject.Convert2PDF(input[1]);
} else if (command == "details") {
  let data = [];
  for (let i = 2; i <= 7; i++) {
    if (input[i] == undefined) {
      data.push("");
    } else {
      data.push(input[i]);
    }
  }
  detailsObject.changeDetails(
    input[1],
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5]
  );
} else if (command == "help") {
  helperObject.helpuser();
}
