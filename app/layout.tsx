import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar-server";
import localFont from "next/font/local";
import Footer from "@/components/navigation/footer-server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const twkLausanne = localFont({
  src: [
    {
      path: "../public/fonts/TWKLausanne-100.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-200.otf",
      weight: "200",
      style: "normal",
    },

    {
      path: "../public/fonts/TWKLausanne-250.otf",
      weight: "250",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-300.otf",
      weight: "300",
      style: "normal",
    },

    {
      path: "../public/fonts/TWKLausanne-400.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-500.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-600.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-700.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-800.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/TWKLausanne-900.otf",
      weight: "900",
      style: "normal",
    },
    /* Italic */
    {
      path: "../public/fonts/TWKLausanne-200Italic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/TWKLausanne-300Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/TWKLausanne-500Italic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-twklausanne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MGDK",
  description: "MGDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${twkLausanne.variable}`}>
      <body
        className={`${twkLausanne.className} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
