import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Contact = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto px-6">
      <Card className="p-6 border border-[#FF9130] shadow-lg rounded-xl bg-[#FFF8E1]">
        <CardBody>
          <Typography
            variant="h6"
            className="mb-4 text-[#5C2C06] font-semibold"
          >
            Restaurant Address
          </Typography>
          <Typography variant="small" className="text-[#8A4B08]">
            123 Food Street, Flavor Town
          </Typography>
        </CardBody>
      </Card>
      <Card className="p-6 border border-[#FF9130] shadow-lg rounded-xl bg-[#FFF8E1]">
        <CardBody>
          <Typography
            variant="h6"
            className="mb-4 text-[#5C2C06] font-semibold"
          >
            Phone Number
          </Typography>
          <Typography variant="small" className="text-[#8A4B08]">
            +123-456-7890
          </Typography>
        </CardBody>
      </Card>
      <Card className="p-6 border border-[#FF9130] shadow-lg rounded-xl bg-[#FFF8E1]">
        <CardBody>
          <Typography
            variant="h6"
            className="mb-4 text-[#5C2C06] font-semibold"
          >
            Email
          </Typography>
          <Typography variant="small" className="text-[#8A4B08]">
            contact@restaurant.com
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Contact;
