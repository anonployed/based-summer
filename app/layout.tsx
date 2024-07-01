import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ᗷᗩᔑEᗪ ᔑᑌᗰᗰEᖇ",
  description: "Celebrate ☀️OᑎᑕᕼᗩIᑎ ᔑᑌᗰᗰEᖇ with vibrant, playful NFTs capturing the joy and warmth of summer. Enjoy the season's magic on the blockchain!",
  openGraph: {
    images: [
      {
        url: "https://basedsummer.vercel.app/img/summer.jpg",
        width: 800,
        height: 600,
        alt: "BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ vibes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ᗷᗩᔑEᗪ ᔑᑌᗰᗰEᖇ",
    description: "Celebrate ☀️OᑎᑕᕼᗩIᑎ ᔑᑌᗰᗰEᖇ with vibrant, playful NFTs capturing the joy and warmth of summer. Enjoy the season's magic on the blockchain!",
    image: {
      url: "https://basedsummer.vercel.app/img/summer.jpg",
      alt: "BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ vibes",
    },
  },
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
