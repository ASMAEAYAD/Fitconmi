import type { Metadata } from "next";
import { SiteFooter, SiteNavbar } from "../components/site-chrome";
import GenderPrograms from "../components/gender-programs";

export const metadata: Metadata = {
  title: "Programs | FitConMi Science-Based Training",
  description:
    "Explore science-based training programs personalised for women and men — weight loss, muscle building, strength, endurance, mobility, and body recomposition.",
  openGraph: {
    title: "Programs | FitConMi Science-Based Training",
    description:
      "Find your ideal fitness plan with FitConMi's evidence-based, gender-personalised programs.",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"],
  },
};

export default function ProgramsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ffffff" }}>
      <SiteNavbar />
      <main>
        <GenderPrograms />
      </main>
      <SiteFooter />
    </div>
  );
}
