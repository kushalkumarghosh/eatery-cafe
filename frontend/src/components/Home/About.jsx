import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import aboutImage from "../../assets/about1.jpg";

const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-8">
      <Card className="overflow-hidden shadow-xl bg-[#FFFFFF] rounded-2xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-16 px-8">
          <div className="md:w-1/2 text-center md:text-left md:pr-8">
            <Typography
              variant="h2"
              className="mb-6 font-extrabold leading-tight text-[#8A4B08]"
            >
              About Our Restaurant
            </Typography>
            <Typography className="font-normal text-lg leading-relaxed text-[#5A3E36]">
              Welcome to Eatery Cafe! Our journey started with a passion for
              great food and creating memorable dining experiences. We offer a
              variety of delicious dishes made from the finest ingredients,
              ensuring every bite is full of flavor.
            </Typography>
          </div>
          <div className="md:w-1/2 md:pl-8 bg-transparent shadow-none">
            <img
              src={aboutImage}
              alt="About Us"
              className="h-[24rem] w-full object-cover object-center rounded-xl shadow-lg"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
