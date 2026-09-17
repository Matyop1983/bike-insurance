import type { Metadata } from "next";
import { CtaBand, PageIntro } from "@/components/CtaBand";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.mission} Independent insurance advisors in Edinburg, Texas.`,
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="About"
        title={brand.mission}
        body="We are independent advisors — not a call center and not an app that replaces a conversation. Service with integrity is how we work in the Rio Grande Valley."
      />

      <div className="wrap grid gap-8 pb-16 lg:grid-cols-2">
        <article className="rounded-sm border border-line bg-paper p-7">
          <h2 className="text-xl font-semibold text-ink">Service with integrity</h2>
          <p className="mt-4 leading-relaxed text-muted">{brand.integrity}</p>
          <p className="mt-4 leading-relaxed text-muted">
            That means explaining what a policy does and does not do, matching
            commercial and individual coverage to how you actually operate, and
            staying reachable after the binder goes out.
          </p>
        </article>
        <article className="rounded-sm border border-line bg-paper p-7">
          <h2 className="text-xl font-semibold text-ink">A relationship first</h2>
          <p className="mt-4 leading-relaxed text-muted">
            The mission is deliberate: help secure your future, and build a
            relationship no digit can compare to. Quotes, documents, and this
            website are tools. The advisor is the product.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We work Monday–Friday, 8AM–5PM, from Fountain Plaza in Edinburg. Call{" "}
            {brand.phone} or email {brand.email}.
          </p>
        </article>
      </div>

      <CtaBand
        title="Talk with Rhino."
        body="Commercial, personal, or bicycle — start with a quote request and we’ll follow up."
      />
    </>
  );
}
