import type { Metadata } from "next";
import { Press_Start_2P, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/contexts/WalletContextProvider";
import Header from "@/components/Header";
import SecurityBadge from "@/components/SecurityBadge";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: ["400"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pro Nuke League - PNL",
  description: "Pro Nuke League (PNL) - The ultimate Solana trading competition at pnl.best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${pixelifySans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-press-start)' }}
      >
        <WalletContextProvider>
          <Header />
          {children}
          <SecurityBadge />
        </WalletContextProvider>
      </body>
    </html>
  );
}
