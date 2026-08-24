import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetsData } from "@/lib/googleapi";
import { IShoe } from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    const shoeId = request.nextUrl.searchParams.get("shoe_id");
    const data = await getGoogleSheetsData();

    if (shoeId) {
      const shoe = data.shoes.find((item) => item.shoe_id === shoeId);
      if (!shoe) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(shoe satisfies IShoe);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 },
    );
  }
}
