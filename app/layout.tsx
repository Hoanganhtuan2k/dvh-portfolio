import type { Metadata } from "next";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import AuroraBackground from "@/components/AuroraBackground";
import VideoBackground from "@/components/VideoBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import SplashScreen from "@/components/SplashScreen";
import ResumeProvider from "@/components/ResumeProvider";
import PageTransition from "@/components/PageTransition";
import { LocaleProvider } from "@/lib/i18n";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-comfortaa",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Dao Viet Hoang — Backend & Integration Engineer",
  description:
    "Backend & integration engineer with 4+ years building reliable enterprise systems for banking and finance; AI as a growing skill area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Default `lang="vi"` matches LocaleProvider's default. The provider
    // will keep <html lang> in sync if the user toggles to EN.
    <html lang="vi" className={`${comfortaa.variable} ${jetbrains.variable}`}>
      <body className="font-sans text-white">
        <LocaleProvider>
          <VideoBackground />
          <AuroraBackground />
          <SplashScreen />
          <CursorGlow />
          <ScrollProgress />
          <ResumeProvider>
            <LenisProvider>
              <Navbar />
              <main>
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </LenisProvider>
          </ResumeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
