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
    <main className="flex items-start gap-2 max-w-screen-xl mx-auto">
        <Sidebar />
        {children}
    </main>
  );
}
