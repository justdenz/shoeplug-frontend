import { google } from "googleapis";
import { IShoe } from "@/models/Product";

// Hoisted to module scope so the auth token is reused across calls.
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function getGoogleSheetsData() {
  const rangeShoes =
    process.env.NODE_ENV === "production" ? "Shoes!A2:I" : "Shoes!A2:I";

  const resShoes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeShoes,
    majorDimension: "ROWS",
  });

  const rangeBrands = "Brands!A1:A50";

  const resBrands = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeBrands,
    majorDimension: "COLUMNS",
  });

  const rows = resShoes.data.values;
  const brandCol = resBrands.data.values;
  const shoeArray: IShoe[] = [];

  rows?.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    if (row[2] !== "") {
      const tempShoe: IShoe = {
        shoe_id: row[0] ?? "N/A",
        date_bought: row[1] ?? "N/A",
        model: row[2] ?? "N/A",
        condition: row[3] ?? "N/A",
        size: row[4] ?? "N/A",
        price: row[5] ?? "N/A",
        status: row[6] ?? "N/A",
        image_url: row[7] ?? "N/A",
        brand: row[8] ?? "N/A",
      };
      shoeArray.push(tempShoe);
    }
  });

  const sheetData = {
    shoes: shoeArray,
    brands: brandCol![0],
  };

  return sheetData;
}
