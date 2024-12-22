import React from "react";
import { FACEBOOK_URL, IG_URL } from "@/models/resource";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} ShoePlug.Ph
          </p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  className="hover:text-gray-400"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={IG_URL}
                  target="_blank"
                  className="hover:text-gray-400"
                >
                  Instagram
                </a>
              </li>
              {/* <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
