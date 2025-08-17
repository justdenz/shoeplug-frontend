import React from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const fbLink = "https://www.facebook.com/profile.php?id=100054236060642";
  const igLink = "https://www.instagram.com/shoeplug.ph/";
  return (
    <footer className="h-full bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">ShoePlug.Ph</h2>
          <p className="text-sm">
            Your go-to place for everything trendy. Fashion, gadgets, home decor
            and more.
          </p>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <Link href="/shipping_policy" className="hover:text-white">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup & Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <div className="flex space-x-4 mt-2">
            <a href={fbLink} target="_blank">
              <Facebook className="w-5 h-5 hover:text-white" />
            </a>
            <a href={igLink} target="_blank">
              <Instagram className="w-5 h-5 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} ShoePlug.Ph All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
