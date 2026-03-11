import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Jung",
  description: "ECE + Applied Physics student at Princeton. Finance + tech.",
  openGraph: {
    title: "Daniel Jung",
    description: "ECE + Applied Physics student at Princeton. Finance + tech.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
