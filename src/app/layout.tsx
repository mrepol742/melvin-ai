import type { Metadata } from "next";
import { Source_Code_Pro, Maven_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Melvin AI",
  description: "Melvin AI - Your AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${mavenPro.variable}`}
    >
      <head>
        <meta name="hostname" content="ai.melvinjonesrepol.com" />
        <link rel="canonical" href="https://ai.melvinjonesrepol.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
