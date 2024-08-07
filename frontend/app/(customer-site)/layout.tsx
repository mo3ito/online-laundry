import type { Metadata } from "next";
import "./../globals.css";
import Header from "@/components/customerSite/header/Header";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import ToastifyContainer from "@/components/providers/TostifyContainer";
import Footer from "@/components/customerSite/Footer";

export const metadata: Metadata = {
  title: "خشکشویی آنلاین مسیتوپاک",
  description: "خشکشویی، رنگرزی, خشکشویی آنلاین اراک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="en">
      <body className="bg-slate-100 text-zinc-600 flex flex-col min-h-screen">
        <ReactQueryProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer/>
        </ReactQueryProvider>
        <ToastifyContainer />
      </body>
    </html>
  );
}
