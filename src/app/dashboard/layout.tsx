import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "./_components/Sidebar";


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
    <main className="lg:flex items-start gap-2 lg:max-w-screen-xl lg:mx-auto">
        <Sidebar />
        <main className="max-lg:mt-20 lg:w-5/6">
          {children}
        </main>
        
    </main>
  );
}
