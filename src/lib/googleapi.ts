import { google } from "googleapis";
import { IShoe } from "@/models/Product";

export async function getGoogleSheetsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const rangeShoes = "Shoes!A2:I100";

  const resShoes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeShoes,
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

    const tempShoe: IShoe = {
      shoe_id: row[0],
      date_bought: row[1],
      model: row[2],
      condition: row[3],
      size: row[4],
      price: row[5],
      status: row[6],
      image_url: row[7],
      brand: row[8],
    };
    shoeArray.push(tempShoe);
  });

  const sheetData = {
    shoes: shoeArray,
    brands: brandCol![0],
  };

  return sheetData;
}

export async function getBrands() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const range = "Brands!A1:A5";

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: range,
    majorDimension: "COLUMNS",
  });

  const rows = res.data.values;

  return rows![0];
}
