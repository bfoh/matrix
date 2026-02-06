import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import PremiumServices from "@/components/PremiumServices";
import WhoWeAre from "@/components/WhoWeAre";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WorkWithUs from "@/components/WorkWithUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black"> {/* Set black background for seamless scroll */}
      <Header />
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <PremiumServices />
      <Testimonials />
      <WorkWithUs />
      <Footer />
    </main>
  );
}
