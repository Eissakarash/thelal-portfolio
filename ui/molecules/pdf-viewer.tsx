"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ url }: { url: string }) {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <section className="flex flex-col items-center w-full">
      <ControlPanel
        scale={scale}
        setScale={setScale}
        numPages={numPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        file={url}
      />
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderAnnotationLayer={false}
        />
      </Document>
    </section>
  );
}
