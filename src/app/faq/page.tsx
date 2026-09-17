import type { Metadata } from "next";
import { CtaBand, PageIntro } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about bicycle insurance, locks, e-bikes, and this PedalGuard sample site.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        kicker="FAQ"
        title="If you’re wondering whether homeowners already covers it — usually not enough."
        body="Short answers about locks, e-bikes, claims, and the fact that this site is a prototype. Nothing here is legal or insurance advice."
      />
      <div className="wrap pb-16">
        <FaqAccordion />
      </div>
      <CtaBand
        title="Still deciding? Requesting a quote doesn’t commit you."
        body="We’ll confirm the form arrived. A real partner would follow up with eligibility questions and a premium."
      />
    </>
  );
}
