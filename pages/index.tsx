import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import HowItWorks from "../components/HowItWorks";
import TopCampaign from "../components/TopCampaign";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <TopCampaign />
      <Footer /> {/* <<< Tambahkan Footer */}
    </div>
  );
}
