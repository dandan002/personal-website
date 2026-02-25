import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJUNG <GO> — Bloomberg Terminal",
  description: "Daniel Jung — Personal Terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
