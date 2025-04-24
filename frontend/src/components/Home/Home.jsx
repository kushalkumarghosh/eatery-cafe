import React from "react";
import { Typography } from "@material-tailwind/react";
import About from "./About.jsx";
import Menu from "./Menu.jsx";
import Reservation from "./Reservation.jsx";
import Contact from "./Contact.jsx";
import restaurantImage from "../../assets/banner.jpg";

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[70vh] relative">
        <img
          src={restaurantImage}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Typography
            variant="h1"
            className="text-white font-extrabold text-4xl md:text-6xl text-center"
          >
            Welcome to Eatery Cafe
          </Typography>
        </div>
      </div>

      <section id="about">
        <About />
      </section>

      <section id="menu">
        <Menu />
      </section>

      <section id="reservation">
        <Reservation />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
