import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartQuizzer",
  description: "An AI-enabled quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(roboto.className, "h-screen")}>
        <main>{children}</main>
      </body>
    </html>
  );
}
