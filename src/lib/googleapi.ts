import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { IShoe } from "@/models/Product";
import { COLUMNS } from "@/models/resource";
import { generateSlug } from "@/utils/ProductUtils";

async function fetchGoogleSheetsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },

    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth: auth });

  const rangeShoes = "SNEAKERS!A2:I";

  const resShoes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeShoes,
    majorDimension: "ROWS",
  });

  const rows = resShoes.data.values;
  const shoeArray: IShoe[] = [];
  const brands: string[] = [];

  rows?.forEach((row) => {
    if (row[COLUMNS.model] !== "") {
      const brand = row[COLUMNS.brand] ?? "N/A";
      const model = row[COLUMNS.model] ?? "N/A";
      const size = row[COLUMNS.size] ?? "N/A";
      const tempShoe: IShoe = {
        shoe_id: row[COLUMNS.shoe_id] ?? "N/A",
        date_bought: row[COLUMNS.date_bought] ?? "N/A",
        model,
        condition: row[COLUMNS.condition] ?? "N/A",
        size,
        price: row[COLUMNS.price] ?? "N/A",
        status: row[COLUMNS.status] ?? "N/A",
        brand,
        description: row[COLUMNS.description] ?? "N/A",
        slug: generateSlug(brand, model, size),
      };

      if (
        row[COLUMNS.brand] !== "" &&
        !brands.includes(row[COLUMNS.brand]) &&
        row[COLUMNS.brand] !== undefined
      )
        brands.push(row[COLUMNS.brand]);
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

export const getGoogleSheetsData = unstable_cache(
  fetchGoogleSheetsData,
  ["google-sheets-data"],
  { revalidate: 300, tags: ["google-sheets-data"] },
);
