import { Hero } from "./sections/Hero";
import { ShowcaseGrid } from "./sections/ShowcaseGrid";
import { HowItWorks } from "./sections/HowItWorks";
import { Philosophy } from "./sections/Philosophy";
import { Compatibility } from "./sections/Compatibility";
import { Community } from "./sections/Community";
import { FinalCTA } from "./sections/FinalCTA";

export default function HomePage() {
  return (
    <div className="landing-root flex flex-col bg-[#070709]">
      <Hero />
      <ShowcaseGrid />
      <HowItWorks />
      <Philosophy />
      <Compatibility />
      <Community />
      <FinalCTA />
    </div>
  );
}
