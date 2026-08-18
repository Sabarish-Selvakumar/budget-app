// Paste this into Google Apps Script (Extensions > Apps Script in your Google Sheet)

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Data');
  }

  var cell = sheet.getRange('A1');
  var data = cell.getValue();

  return ContentService.createTextOutput(data || '{}')
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Data');
  }

  var payload = e.postData.contents;
  sheet.getRange('A1').setValue(payload);

  // Also save a timestamped backup in column B
  var lastRow = sheet.getRange('B1').getValue();
  var backupRow = lastRow ? parseInt(lastRow) + 1 : 2;
  sheet.getRange('B1').setValue(backupRow);
  sheet.getRange('C' + backupRow).setValue(new Date().toISOString());
  sheet.getRange('D' + backupRow).setValue(payload);

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
