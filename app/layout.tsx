import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import { site } from "./data/site";
import "./css/style.css";
import "./css/wide.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/chrome.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Anish Panthi is a final-year Industrial Engineering student at Thapathali Campus, IOE, researching an omnidirectional wind turbine. He led SOIES Nepal and designed Industrial Vision Vol. 11.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Anish Panthi, Industrial Engineering student",
    template: "%s · Anish Panthi",
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: "Anish Panthi, Industrial Engineering student",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Panthi, Industrial Engineering student",
    description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
