import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";
import { Icon } from "@/ui/icons";
import Link from "next/link";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
      <body className={font.className}>
        <Providers>
          <Navbar shouldHideOnScroll>
            <Link href={"/"}>
              <NavbarBrand>
                <Icon className="p-3" />
                <h2 className="font-bold text-inherit">Coasting Along</h2>
              </NavbarBrand>
            </Link>
          </Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
