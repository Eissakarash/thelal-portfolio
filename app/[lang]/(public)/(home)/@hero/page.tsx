import React from "react";
import Slider from "@/ui/molecules/carosul";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  let values = await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return null;
  });

  // Fallback data if no data in database
  if (!values) {
    values = {
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
      ]
    };
  }

  return <Slider data={values?.images as string[]} />;
};

export default HomePage;
