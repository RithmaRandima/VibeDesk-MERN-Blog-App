import React from "react";
import { footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* col 01 */}
        <div>
          <h1>logo</h1>
          <p className="max-w-[410px] mt-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nemo sunt quas, illum ipsam, ipsum vero inventore est earum laborum
            aperiam
          </p>
        </div>

        {/*col 02*/}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((Selection, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {Selection.title}
              </h3>
              <ul className="text-sm space-y-1">
                {Selection.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 @ blogpapp - All Rithe Reserved.
      </div>
    </div>
  );
};

export default Footer;
