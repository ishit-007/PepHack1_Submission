function helpuser() {
  console.log("List of Commands:");
  console.log(
    "'node copyCat.js watermark filepath watermarkText'   ==> for adding a watermark on the bottom of the pdf provided"
  );
  console.log(
    "'node copyCat.js compress filepath'   ==> for compressing a PDF"
  );
  console.log(
      "'node copyCat.js details filepath Data1 Data2 Data3 Data4 Data5 Data6'   ==> for find and replace operation--> Data1 will be replaced by Data2...."
    );
    console.log("'node copyCat.js fromWord filepath'   ==> to convert a word file to PDF");
    console.log("'node copyCat.js help'   ==> to get help related to commands");
}
module.exports = {
    helpuser:helpuser,
}
