import type { Metadata } from "next";
import "./css/style.css";
import "./css/wide.css";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
