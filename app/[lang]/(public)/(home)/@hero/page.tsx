import React from "react";
import Slider from "@/ui/molecules/carosul";
import prisma from "@/lib/prisma";
import HeroImage1 from "@/images/01.jpg";
import HeroImage2 from "@/images/Cam_04.jpg";
import HeroImage3 from "@/images/00-Maquette.jpg";

const fallbackImages = [HeroImage1, HeroImage2, HeroImage3];

const HomePage = async () => {
  const values = await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  });

  const images = values?.images?.length ? values.images : fallbackImages;

  return <Slider data={images} />;
};

export default HomePage;
