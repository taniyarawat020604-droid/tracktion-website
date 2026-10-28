/**
 * Tracktion — "Book a call" form → Google Sheet.
 *
 * Setup:
 *  1. Create a Google Sheet. Extensions → Apps Script. Paste this file in as Code.gs.
 *  2. Project Settings → Script properties → add SHARED_SECRET (any long random string).
 *     Use the same value as GOOGLE_SCRIPT_SECRET in the Next.js .env.local.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Copy the Web app URL into GOOGLE_SCRIPT_URL in .env.local.
 *  4. After editing this script, Deploy → Manage deployments → Edit → New version,
 *     otherwise the old code keeps running.
 */

var SHEET_NAME = 'Bookings';
var HEADERS = ['Submitted at', 'Name', 'Email', 'Role', 'Platforms', 'Message', 'Page', 'User agent'];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (secret && body.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    if (!body.name || !body.email) return json_({ ok: false, error: 'missing name or email' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet_();
      sheet.appendRow([
        new Date(),
        clean_(body.name),
        clean_(body.email),
        clean_(body.role),
        clean_((body.platforms || []).join(', ')),
        clean_(body.message),
        clean_(body.page),
        clean_(body.userAgent),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Lets you open the web app URL in a browser to confirm it is deployed.
function doGet() {
  return json_({ ok: true, service: 'tracktion-book-a-call' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trims, caps length, and stops values starting with = + - @ being read as formulas.
function clean_(v) {
  var s = String(v == null ? '' : v).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
