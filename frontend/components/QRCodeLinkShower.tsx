"use client";
import { useState, useEffect, useContext } from "react";
import QRCode from "qrcode.react";
import LoadingPage from "@/components/Loading/LoadingPage";
import handleCopyToClipboard from "@/utils/handleCopyToclipboard";
import useAuthContext from "@/hooks/useAuthContext";

export default function QRCodeLinkShower({
  QRCodePath,
  content,
  id
}: {
  QRCodePath: string;
  content: string;
  id:string
}) {
  const [qrCodeData, setQRCodeData] = useState("");
  const { infos } = useAuthContext();

  useEffect(() => {
    if (infos?._id && QRCodePath) {
      const path = QRCodePath;
      setQRCodeData(path);
    }
  }, [infos, QRCodePath]);

  const handleDownload = () => {
    const canvas = document
      .getElementById(id)
      ?.getElementsByTagName("canvas")[0];
    canvas?.toBlob((blob) => {
      if (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        link.click();
      }
    });
  };

  if (!qrCodeData) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto">
      <div className="mt-20 px-6 mx-auto border flex items-center justify-center flex-col gap-y-3 py-12 shadow-lg rounded-lg border-sky-400 w-11/12 sm:w-8/12 md:w-8/12 lg:w-7/12   xl:w-6/12 2xl:w-5/12">
        {qrCodeData && (
          <>
            <p className=" text-base md:text-xl">{content}</p>
            <div className=" max-xs:!w-28  !w-36  md:!w-40  lg:!w-44  xl:!w-48  2xl:!w-52 ">
              <div id={id}>
                <QRCode
                  className="  max-xs:!h-28 !w-full !h-36  md:!h-40  lg:!h-44  xl:!h-48  2xl:!h-52"
                  size={300}
                  value={qrCodeData}
                  imageSettings={{
                    src: "/images/logo512.png",
                    height: 50,
                    width: 50,
                    excavate: true,
                  }}
                />
              </div>
              <button
                className="border bg-sky-400 border-sky-500-400 py-1 rounded-lg cursor-pointer w-full text-[10px] sm:text-sm md:text-base mt-2 sm:mt-4"
                onClick={handleDownload}
              >
                دانلود QR code
              </button>
            </div>
          </>
        )}
        <div className="mt-4">
          <p className="text-center text-xs  sm:text-sm md:text-base font-semibold mb-2">
            لینک شما
          </p>
          <button
            title="click to copy"
            onClick={() => handleCopyToClipboard(qrCodeData)}
            className="border bg-sky-400 border-sky-400 py-1 px-2 rounded-lg cursor-pointer text-[10px] sm:text-sm md:text-base "
          >
            {QRCodePath}
          </button>
        </div>
      </div>
    </div>
  );
}
