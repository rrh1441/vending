import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salish Trading Co. | Passive Income From a Trading-Card Vending Machine",
  description:
    "Host a sealed trading-card vending machine in your Seattle bar, brewery, or shop. We own, stock, service, and insure it — you earn a cut of every sale. Zero cost, zero work.",
  icons: {
    icon: "/salishfav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
