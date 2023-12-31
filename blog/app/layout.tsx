import { Providers } from "@/components/providers";

import { Navbar } from "@/components/navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "@/ui/container";
import { Content } from "@/ui/content";
import Script from "next/script";
import { FloatingEmailSubscriptionForm } from "@/components/emailSubscriptionForms";
import { Footer } from "@/components/footer";
import "@/firebase";
import { Metadata } from "next";
import { baseUrl } from "./base";

export const metadata: Metadata = {
  title: "Coasting Along",
  description:
    "Join Ruby and Ted on Coasting Along as they explore Australia from coast to coaster. Discover travel adventures, remote work tips, surfing spots, and mouth-watering food experiences.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    shortcut: `${baseUrl}/image-icon.png`,
    apple: `${baseUrl}/image-icon-background.png`,
    icon: `${baseUrl}/image-icon.png`,
  },
};

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HW25J4MSG6" />
      {process.env.NODE_ENV === "production" && (
        <>
          <Script id="google-analytics-script">
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HW25J4MSG6');
            `}
          </Script>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4754300691900449"
            crossOrigin="anonymous"
          />
        </>
      )}
      <Script id="mailer-lite-script">
        {`
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '616096');
`}
      </Script>

      <body className={font.className}>
        <Providers>
          <Container>
            <header>
              <Navbar />
            </header>
            <Content>
              {children}
              <Footer />
            </Content>
          </Container>
          <FloatingEmailSubscriptionForm />
        </Providers>
      </body>
    </html>
  );
}
