import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import clsx from "clsx";
const sourceCodePro = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "text-slate-300 bg-[#1d1d1d] font-extrabold tracking-widest",
          sourceCodePro.className,
          "max-w-7xl mx-auto dark"
        )}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
