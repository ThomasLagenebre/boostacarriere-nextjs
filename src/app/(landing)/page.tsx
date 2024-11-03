import Coachings from "../_sections/Coachings";
import Ebooks from "../_sections/Ebooks";
import Hero from "../_sections/Hero";
import Reviews from "../_sections/Reviews";
import ToolsTuto from "../_sections/ToolsTuto";


export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto">
      <Hero />
      <Coachings />
      <ToolsTuto />
      <Ebooks />
      <Reviews />
    </main>
  );
}
