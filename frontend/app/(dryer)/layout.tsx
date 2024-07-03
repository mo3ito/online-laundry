import type { Metadata } from "next";
import "./../globals.css";
import BottomMenuDryer from "@/components/dryer/BottomMenuDryer";
import OrderCardProvider from "@/context/order-card";
import ToastifyContainer from "@/components/providers/TostifyContainer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthContextProvider from "@/context/authContext";
import DryerHeader from "@/components/headers/DryerHeader";

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
        <AuthContextProvider>
          <ReactQueryProvider>
            <DryerHeader />
            <main className=" w-full h-screen">{children}</main>
            <BottomMenuDryer />
            <ToastifyContainer />
          </ReactQueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
