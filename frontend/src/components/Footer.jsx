import React from "react";
import { footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 p-5">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* ================= BRAND ================= */}
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                B
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                BlogSphere
              </h1>
            </div>

            <p className="mt-5 text-gray-500 leading-relaxed text-sm">
              BlogSphere is a modern blogging platform where creators share
              ideas, tutorials, and stories about technology, design, and
              development. Stay updated with the latest insights from the
              community.
            </p>

            {/* Optional CTA */}
            <div className="mt-5">
              <p className="text-sm text-gray-600 font-medium">
                ✨ Write. Share. Inspire.
              </p>
            </div>
          </div>

          {/* ================= LINKS ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-[55%]">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>

                <ul className="space-y-2 text-sm text-gray-500">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-primary transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
