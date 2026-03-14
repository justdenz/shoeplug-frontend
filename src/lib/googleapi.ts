import { google } from "googleapis";
import { IShoe } from "@/models/Product";

export async function getGoogleSheetsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },

    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth: auth });

  const rangeShoes = "Shoes!A2:I";

  const resShoes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeShoes,
    majorDimension: "ROWS",
  });

  const rows = resShoes.data.values;
  const shoeArray: IShoe[] = [];
  const brands: string[] = [];

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

      if (row[8] !== "" && !brands.includes(row[8])) brands.push(row[8]);
      shoeArray.push(tempShoe);
    }
  });

  brands.sort((a, b) => a.localeCompare(b));

  const sheetData = {
    shoes: shoeArray,
    brands: brands,
  };

  return sheetData;
}
