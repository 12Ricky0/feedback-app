import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | FeedBack-App",
    default: "FeedBack-App",
  },
  description: "Project FeedBack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased bg-secondary-very-gray`}>
        {children}
      </body>
    </html>
  );
}
