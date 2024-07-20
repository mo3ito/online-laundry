import type { Metadata } from "next";
import "./../globals.css";
import Header from "@/components/customerSite/header/Header";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import ToastifyContainer from "@/components/providers/TostifyContainer";

export const metadata: Metadata = {
  title: "خشکشویی آنلاین مسیتوپاک",
  description: "خشکشویی، رنگرزی",
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
          <footer className="w-full h-64 bg-gray-200 ">
          <a
      referrerPolicy='origin'
      target='_blank'
      href='https://trustseal.enamad.ir/?id=508337&Code=xxV2ueSAdCBxdpyxUACrkjgxipNUepn9'
    >
      <img
      className="size-44"
        referrerPolicy='origin'
        src='https://trustseal.enamad.ir/logo.aspx?id=508337&Code=xxV2ueSAdCBxdpyxUACrkjgxipNUepn9'
        alt=''
        style={{ cursor: 'pointer' }}
        data-code='xxV2ueSAdCBxdpyxUACrkjgxipNUepn9'
      />
    </a>
          </footer>
        </ReactQueryProvider>
        <ToastifyContainer />
      </body>
    </html>
  );
}
