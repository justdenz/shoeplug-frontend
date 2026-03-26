import { getGoogleSheetsData } from "@/lib/googleapi";
import { IShoe } from "@/models/Product";
import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import Spinner from "@/components/Spinner";

export const revalidate = 300;

export default async function Page() {
  let shoes: IShoe[] = [];
  let brands: string[] = [];

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== "true") {
    const response = await getGoogleSheetsData();
    shoes = response.shoes;
    brands = response.brands;
  }

  return (
    <div className="min-w-xl justify-self-center">
      <Suspense fallback={<Spinner />}>
        <HomeClient allProducts={shoes} allBrands={brands} />
      </Suspense>
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
