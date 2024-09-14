import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopper",
  description: "Aplicação WEB para leitura de medições de água e gás",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NextUIProvider>
          <div
            className={`
              mx-auto
              h-screen
              px-4
              pt-24
              sm:px-6
              md:px-12
              lg:max-w-screen-lg
              lg:pt-36
              xl:max-w-screen-xl
          `}
          >
            {children}
          </div>
        </NextUIProvider>
        <ToastContainer position="bottom-right" closeOnClick draggable />
      </body>
    </html>
  );
}
