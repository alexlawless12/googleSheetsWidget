// This script requires a Google API key
const GOOGLE_SHEETS_API_KEY = "YOUR_API_KEY";
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";

async function fetchDataFromGoogleSheets() {
  const range = '2024!L3:L4'; // Update this range to where your variables are
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`;

  try {
    const request = new Request(url);
    const response = await request.loadJSON();

    console.log("API Response:", response);

    if (response && response.values && response.values.length >= 2) {
      const variable1 = response.values[0][0];
      const variable2 = response.values[1][0];

      console.log(`Variable 1: ${variable1}`);
      console.log(`Variable 2: ${variable2}`);

      // Update below fields to customize the text in the widget
      const widget = new ListWidget();
      widget.addText(`Variable 1: ${applicationsSubmitted}`);
      widget.addText(`Variable 2: ${coverLettersLeft}`);

      // Present the widget
      if (config.runsInWidget) {
        Script.setWidget(widget);
        Script.complete();
      } else {
        await widget.presentMedium();
      }
    } else {
      throw new Error("Invalid or empty response from Google Sheets API");
    }
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error.message);
    throw error;
  }
}

await fetchDataFromGoogleSheets();