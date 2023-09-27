import { Providers } from "@/components/providers";

import { Navbar } from "@/components/navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Container } from "./ui/container";
import { Content } from "./ui/content";
import Script from "next/script";
import { FloatingEmailSubscriptionForm } from "./components/emailSubscriptionForms";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light text-foreground bg-background">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4754300691900449"
        crossOrigin="anonymous"
      />
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
            <Navbar />
            <Content>{children}</Content>
          </Container>
          <FloatingEmailSubscriptionForm />
        </Providers>
      </body>
    </html>
  );
}
