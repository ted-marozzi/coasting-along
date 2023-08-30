import { Providers } from "@/components/providers";
import { Icon } from "@/ui/icons";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "./ui/container";
import { Content } from "./ui/content";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log(children);
  return (
    <html lang="en" className="light text-foreground bg-background">
      <body className={font.className}>
        <Providers>
          <Container>
            <Navbar maxWidth="full" shouldHideOnScroll className="justify-between">
              <Link href={"/"} underline="hover">
                <NavbarBrand>
                  <Icon className="p-3" />
                  <h3 className="text-primary">Coasting Along</h3>
                </NavbarBrand>
              </Link>
              <NavbarContent justify="end">
                <Link href="/authors" color="secondary" underline="hover">
                  <NavbarItem>Meet the authors</NavbarItem>
                </Link>
              </NavbarContent>
            </Navbar>
            <Content>{children}</Content>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
