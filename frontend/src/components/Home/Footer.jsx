import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-[#8A4B08] py-8 text-center md:justify-between bg-[#FDCB58] mt-6">
      <Typography className="font-normal text-[#5C2C06]">
        © {new Date().getFullYear()} Eatery Cafe. All Rights Reserved.
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        {["About Us", "Menu", "Reservation", "Contact Us"].map(
          (item, index) => (
            <li key={index}>
              <Typography
                as="a"
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="font-normal text-[#5C2C06] transition-colors hover:text-[#FF9130] focus:text-[#FF9130]"
              >
                {item}
              </Typography>
            </li>
          )
        )}
      </ul>
    </footer>
  );
};

export default Footer;
