import type { Metadata } from "next";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ShoePlug.Ph",
  description: "Your go-to place for everything trendy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-y-scroll min-h-screen">
      <body>
        <div className="flex flex-col min-h-screen">
          <Suspense>
            <Header />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
