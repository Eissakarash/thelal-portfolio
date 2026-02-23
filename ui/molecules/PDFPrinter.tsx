"use client";
import React from "react";
import { Button } from "../atoms";
import { Printer } from "lucide-react";
const PDFPrinter = ({ file }: { file: string }) => {
  const print = () => {
    const pdfFrame = document.createElement("iframe") as any;
    pdfFrame.style.visibility = "hidden";
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
  };
  return (
    <Button className="!p-0 !m-0" onClick={print} title="download">
      <Printer className="size-8" />
    </Button>
  );
};

export default PDFPrinter;
