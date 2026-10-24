import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nilora — Egypt, closer than you imagine",
  description: "A cinematic way to discover Egypt's timeless places and new stories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
