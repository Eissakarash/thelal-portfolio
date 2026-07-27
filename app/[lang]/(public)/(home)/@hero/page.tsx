import React from "react";
import Slider from "@/ui/molecules/carosul";
import prisma from "@/lib/prisma";
import HeroImage1 from "@/images/hero-villa-03.webp";
import HeroImage2 from "@/images/hero-muheer-day.webp";
import HeroImage3 from "@/images/hero-muheer-street.webp";
import HeroImage4 from "@/images/hero-watad-evening.webp";
import HeroImage5 from "@/images/hero-watad-night.webp";

const fallbackImages = [HeroImage1, HeroImage2, HeroImage3, HeroImage4, HeroImage5];

const HomePage = async () => {
  const values = await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  });

  const images = values?.images?.length ? values.images : fallbackImages;

  return <Slider data={images} />;
};

export default HomePage;
