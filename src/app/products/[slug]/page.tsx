import { notFound } from "next/navigation";
import { getGoogleSheetsData } from "@/lib/googleapi";
import ProductDetail from "@/components/ProductDetail";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { shoes } = await getGoogleSheetsData();
  return shoes.map((shoe) => ({ slug: shoe.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const { shoes } = await getGoogleSheetsData();
  const product = shoes.find((shoe) => shoe.slug === slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
