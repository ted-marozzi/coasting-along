import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";
import { Icon, TitleIcon } from "@/ui/icon";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
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
