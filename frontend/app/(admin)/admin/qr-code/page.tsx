import QRCodeLinkShower from "@/components/QRCodeLinkShower";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React from "react";

export default function page() {
  return (
    <main className=" mt-36 md:mt-64 pb-10">
      <ShowHeaderTitleFixed content="QR code" />
      <QRCodeLinkShower
        QRCodePath={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        content="لینک سایت"
        id="qrcode-site"
      />
      <QRCodeLinkShower
        QRCodePath={"https://mo3ito-pak.ir"}
        content="دانلود اپلیکیشن"
        id="qrcode-app"
      />
    </main>
  );
}
