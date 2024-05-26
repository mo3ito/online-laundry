import type { Metadata } from "next";
import "./../globals.css";
import Header from "@/components/customerApp/Header";
import BottomMenu from "@/components/customerApp/BottomMenu";
import OrderCardProvider from "@/context/order-card";

export const metadata: Metadata = {
  title: "خشکشویی آنلاین",
  description: "اتو، خشکشویی، رنگرزی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl">
      <body className="bg-slate-100 h-screen  text-zinc-600 container mx-auto overflow-hidden ">
        <OrderCardProvider>
          <Header />
          <main className=" w-full h-screen">{children}</main>
          <BottomMenu />
        </OrderCardProvider>
      </body>
    </html>
  );
}
