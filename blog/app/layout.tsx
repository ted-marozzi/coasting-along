import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";
import { Icon } from "@/ui/icons";
import Link from "next/link";
import { Container } from "./ui/container";
import { Content } from "./ui/content";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
      <body className={font.className}>
        <Providers>
          <Container>
            <Navbar shouldHideOnScroll className="justify-start">
              <Link href={"/"}>
                <NavbarBrand>
                  <Icon className="p-3" />
                  <h3 className="text-primary">Coasting Along</h3>
                </NavbarBrand>
              </Link>
            </Navbar>
            <Content>{children}</Content>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
