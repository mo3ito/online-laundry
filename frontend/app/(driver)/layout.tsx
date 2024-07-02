import type { Metadata } from "next";
import "./../globals.css";
import Header from "@/components/headers/Header";
import BottomMenuDriver from "@/components/driver/BottomMenuDriver";
import DriverContexProvider from "@/context/driverContext";
import ToastifyContainer from "@/components/providers/TostifyContainer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthContextProvider from "@/context/authContext";

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
            <DriverContexProvider>
              <Header />
              <main className=" w-full h-screen">{children}</main>
              <BottomMenuDriver />
            </DriverContexProvider>
            <ToastifyContainer />
          </ReactQueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
