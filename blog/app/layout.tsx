import { Providers } from "@/components/providers";

import { Navbar } from "@/components/navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "./ui/container";
import { Content } from "./ui/content";
import Script from "next/script";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4754300691900449"
        crossOrigin="anonymous"
      />
      <body className={font.className}>
        <Providers>
          <Container>
            <Navbar />
            <Content>{children}</Content>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
