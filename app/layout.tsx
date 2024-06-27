import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ",
  description: "Mint BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ vibes on Base",
  openGraph: {
    images: [
      {
        url: 'https://basedsummer.vercel.app/summer.jpg',
        width: 800,
        height: 600,
        alt: 'BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ vibes'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: 'https://basedsummer.vercel.app/summer.jpg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
