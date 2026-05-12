import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import GlobalHeader from "@/components/navigation/global-header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CamperCat | Lloguer de furgonetes camper",
  description: "Landing corporativa per lloguer de campers amb cataleg, comentaris i contacte.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <GlobalHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
