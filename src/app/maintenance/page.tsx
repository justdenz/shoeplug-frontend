import Image from "next/image";
import ShoePlugLogo from "../../../public/logo.jpg";

export default function Maintenance() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="flex flex-row h-20 justify-between items-center bg-black text-white">
        <div className="logo ml-5">
          <Image
            src={ShoePlugLogo}
            alt="Logo"
            width={70}
            height={60}
            style={{ height: "auto" }}
            className="absolute top-2 m-auto rounded-full"
          />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">We&apos;ll be back soon!</h1>
        <p className="text-lg text-gray-400 max-w-md">
          ShoePlug is currently undergoing scheduled maintenance. We&apos;ll be
          back up and running shortly. Thank you for your patience.
        </p>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShoePlug. All rights reserved.
      </footer>
    </div>
  );
}
