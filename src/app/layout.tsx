import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Noto_Sans_JP, Fraunces } from "next/font/google";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-num",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "イベント枠カレンダー | 2BASE",
  description:
    "横須賀BASE・港南台BASEの定例イベントと商店主セミナーを一覧し、残り枠を可視化するカレンダー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${mPlusRounded.variable} ${notoSansJp.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
