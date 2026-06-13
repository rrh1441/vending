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
  title: "Salish Trading Co. | Turnkey Trading-Card Vending for High-Traffic Properties",
  description:
    "Salish places sealed trading-card vending machines in Seattle-area malls, markets, and event venues — owned, stocked, serviced, and fully insured by us. Incremental revenue from a few square feet, with flexible specialty-leasing terms. Independent venues can host for a revenue share.",
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
