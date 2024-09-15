import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import cn from "@/cn";

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
      <body
        className={cn(
          inter.className,
          "mx-auto flex flex-col px-2 md:max-w-lg lg:max-w-xl",
        )}
      >
        <NextUIProvider validationBehavior="native" locale="pt-br">
          {children}
        </NextUIProvider>
        <ToastContainer position="bottom-right" closeOnClick draggable />
      </body>
    </html>
  );
}
