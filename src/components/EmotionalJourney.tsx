import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { journey } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function EmotionalJourney() {
  return (
    <section className="journey-section" aria-labelledby="journey-title">
      <div className="journey-heading">
        <div className="section-index light-index">
          <span>03</span>
          <span>THE EMOTIONAL JOURNEY</span>
        </div>
        <Reveal>
          <h2 id="journey-title">THROUGH IT.<br /><em>THROUGH TO.</em></h2>
          <p className="journey-disclaimer">An emotional arc, not official chapter titles.</p>
        </Reveal>
      </div>

      <div className="journey-cards">
        {journey.map((chapter, index) => (
          <Reveal className={`journey-card journey-${chapter.tone}`} delay={index * 0.09} key={chapter.number}>
            <Image
              src={chapter.image}
              alt={chapter.alt}
              fill
              sizes="(max-width: 760px) 100vw, 33vw"
              quality={80}
            />
            <div className="journey-card-shade" />
            <div className="journey-card-top">
              <span>{chapter.number} / 03</span>
              <ArrowDownRight size={18} strokeWidth={1.3} />
            </div>
            <div className="journey-card-copy">
              <span className="eyebrow">AN ACT OF THE HEART</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="journey-footnote">FROM WHAT HURT, TOWARD WHAT HEALS.</div>
    </section>
  );
}
