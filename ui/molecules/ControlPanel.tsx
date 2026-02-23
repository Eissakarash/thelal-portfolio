import React from "react";
import { ZoomInIcon, ZoomOutIcon, DownloadIcon } from "lucide-react";
import { Button, Input } from "../atoms";
import { useTranslations } from "next-intl";
const ControlPanel = (props: {
  file: string;
  pageNumber: number;
  numPages: number | null;
  setPageNumber: (pageNumber: number) => void;
  scale: number;
  setScale: (scale: number) => void;
}) => {
  const t = useTranslations("common");
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages || 1);
  };

  const onPageChange = (e: any) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="bg-white shadow-2xl flex rounded-md m-3 p-3 items-center justify-between gap-10">
      <div className="flex justify-between items-center gap-10">
        <Button
          className="!p-0 !m-0"
          onClick={goToFirstPage}
          disabled={isFirstPage}
        >
          {/* <PinRightIcon className="size-8" /> */}
        </Button>
        <Button
          className="!p-0 !m-0"
          onClick={goToPreviousPage}
          disabled={isFirstPage}
        >
          {/* < className="size-8" /> */}
        </Button>

        <div className="flex justify-between items-center gap-10">
          {t("page")}
          <Input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={onPageChange}
          />
          {t("of")}
          {numPages}
        </div>

        <Button
          className="!p-0 !m-0"
          onClick={goToNextPage}
          disabled={isLastPage}
        >
          {/* <TrackPreviousIcon className="size-8" /> */}
        </Button>

        <Button
          className="!p-0 !m-0"
          onClick={goToLastPage}
          disabled={isLastPage}
        >
          {/* <PinLeftIcon className="size-8" /> */}
        </Button>
      </div>
      <div className="flex gap-10 items-center">
        <Button className="!p-0 !m-0" onClick={zoomOut} disabled={isMinZoom}>
          <ZoomOutIcon className="size-8" />
        </Button>
        <span>{(scale * 100).toFixed()}%</span>
        <Button className="!p-0 !m-0" onClick={zoomIn} disabled={isMaxZoom}>
          <ZoomInIcon className="size-8" />
        </Button>
      </div>
      <div className="mx-3">
        <a href={file} download={true} title="download">
          <Button className="!p-0 !m-0">
            <DownloadIcon className="size-8" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ControlPanel;
