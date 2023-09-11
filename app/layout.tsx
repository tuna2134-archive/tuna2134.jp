import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Header, Footer, Loading } from "./_components";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tuna2134",
  description: "なんかある",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className}`}>
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
