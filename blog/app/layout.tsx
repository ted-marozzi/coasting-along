import { Providers } from "@/components/providers";

import { Navbar } from "@/components/navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "./ui/container";
import { Content } from "./ui/content";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
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
