import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner";

const outfit = Poppins({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800'] });

export const metadata = {
  title: "Stock Watch",
  description: "Your ultimate companion for navigating the dynamic world of stocks."
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
      <Toaster />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
