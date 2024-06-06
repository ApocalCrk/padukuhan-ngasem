import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/flaticon/css/flaticon.css";
import "@/styles/font-awesome/css/all.min.css";
import "@/styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Padukuhan Ngasem | Eksplorasi Padukuhan Ngasem",
  description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
