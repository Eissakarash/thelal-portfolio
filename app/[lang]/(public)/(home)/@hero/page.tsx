import React from "react";
import Slider from "@/ui/molecules/carosul";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  const values = await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  });

  const images = values?.images || [];

  return <Slider data={images} />;
};

export default HomePage;
