"use client";
import * as React from "react";
import SectionImage5 from "@/images/01_5-Photo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../atoms/carousel";
import Image from "next/image";

import { cn } from "@/lib/utils";
export default function SumpSlider({ images = [] }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [childrenApi, setChildrenApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setChildrenApi((prev) => {
        prev?.scrollTo(api.selectedScrollSnap());
        return prev;
      });
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, childrenApi]);

  return (
    <Carousel
      dir="ltr"
      setApi={setApi}
      className="w-full relative overflow-hidden h-fit group"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-fit">
            <Image
              src={image}
              alt="Forklift"
              width="690"
              height="613"
              className="w-full z-0  object-cover max-h-[500px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="!p-2 size-16 left-0 hover:!text-white border-none !text-natural-dark fill-black absolute z-10 top-[45%] -translate-y-1/2" />
      <CarouselNext className="!p-2 size-16 border-none  hover:!text-white !text-natural-dark fill-black absolute z-10 top-[45%] -translate-y-1/2 right-0" />
      <div className="flex mt-4 h-[102px] items-center mx-auto w-full justify-center">
        <Carousel dir="ltr" setApi={setChildrenApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2  lg:basis-1/4 basis-1/2 h-[102px]"
              >
                <Image
                  onClick={() => {
                    setApi((prev) => {
                      prev?.scrollTo(index);
                      return prev;
                    });
                  }}
                  src={image}
                  alt="Forklift"
                  width="202"
                  height="202"
                  className={cn(
                    "cursor-pointer object-cover md:h-[100px] md:w-[250px] aspect-square object-center size-[100px]",
                    {
                      "border-[5px] border-secondary": index === current,
                    }
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Carousel>
  );
}
