import type { Metadata } from "next";
import "../globals.css";
import Header from "../_global_sections/Header";
import Footer from "../_global_sections/Footer";


export const metadata: Metadata = {
  title: "Boostacarriere",
  description: "Propulser sa carrière grâce à des coachings créer sur mesure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <a href="/dashboard">Go to dashboard</a>
        {children}
        <Footer />
    </>
  );
}
