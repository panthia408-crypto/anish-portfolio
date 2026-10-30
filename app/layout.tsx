import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./css/style.css";
import "./css/wide.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";

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

export const metadata: Metadata = {
  title: "Anish Panthi | Industrial Engineer",
  description:
    "Portfolio of Anish Panthi - Industrial Engineering at IOE Thapathali Campus & Web Development.",
  alternates: {
    canonical: "https://anishpanthi.com.np/",
  },
  openGraph: {
    type: "website",
    title: "Anish Panthi | Industrial Engineer",
    description:
      "Portfolio of Anish Panthi - Industrial Engineering at IOE Thapathali Campus & Web Development.",
    images: ["https://anishpanthi.com.np/assets/placeholder.jpg"],
    url: "https://anishpanthi.com.np",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Panthi | Industrial Engineer",
    description:
      "Portfolio of Anish Panthi - Industrial Engineering at IOE Thapathali Campus & Web Development.",
    images: ["https://anishpanthi.com.np/assets/placeholder.jpg"],
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
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
