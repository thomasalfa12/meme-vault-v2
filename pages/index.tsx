import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import TopCampaign from "../components/sections/TopCampaign";
import ProblemSolution from "../components/sections/ProblemSolution";
import HowItWorks from "../components/sections/HowItWorks";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopCampaign />
      <ProblemSolution />
      <HowItWorks />
      <Footer /> {/* <<< Tambahkan Footer */}
    </div>
  );
}
