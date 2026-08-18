// Paste this into Google Apps Script (Extensions > Apps Script in your Google Sheet)

// CHANGE THIS to your own secret password
var SECRET_KEY = 'your-secret-password-here';

function checkAuth(e) {
  var key = e.parameter.key;
  if (key !== SECRET_KEY) {
    return ContentService.createTextOutput(JSON.stringify({error: 'Unauthorized'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return null;
}

function doGet(e) {
  var authError = checkAuth(e);
  if (authError) return authError;

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
  var authError = checkAuth(e);
  if (authError) return authError;

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
