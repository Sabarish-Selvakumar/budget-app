# Google Sheets Backend Setup

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com and create a new spreadsheet
2. Name it "Budget App Data"
3. Note the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`

## Step 2: Add the Apps Script

1. In the spreadsheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste the contents of `apps-script.js` (from this folder)
3. Click **Save** (name the project "Budget API")

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set:
   - Description: "Budget API"
   - Execute as: **Me**
   - Who has access: **Anyone** (this is safe because it only accesses YOUR sheet)
4. Click **Deploy**
5. **Authorize** when prompted (click through the "unsafe app" warning — it's your own script)
6. Copy the **Web app URL**

## Step 4: Configure the App

1. Open the budget app in your browser
2. Tap the gear icon > look for the "Cloud Sync" section
3. Paste the Web app URL and save

Your data will now sync to the Google Sheet automatically.
