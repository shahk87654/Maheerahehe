import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { authorPortrait, bookTitle, publicationUrl } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function AuthorSection() {
  return (
    <section className="author-section" id="the-author">
      <div className="section-index">
        <span>05</span>
        <span>THE AUTHOR</span>
      </div>
      <div className="author-grid">
        <Reveal className="author-photo-wrap">
          <div className="author-art">
            <Image
              className="author-portrait"
              src={authorPortrait}
              alt="Maheera Burhan, author of Unsent Unkind"
              fill
              sizes="(max-width: 760px) 84vw, (max-width: 1100px) 80vw, 40vw"
            />
            <span className="portrait-label">MAHEERA BURHAN · AUTHOR</span>
          </div>
          <span className="author-photo-caption">THE PERSON BEHIND THE PAGE.</span>
        </Reveal>
        <Reveal className="author-copy" delay={0.12}>
          <p className="eyebrow">A LIFE BEHIND THE LINES</p>
          <h2>THE PERSON<br />BEHIND THE<br /><em>WORDS.</em></h2>
          <h3>Maheera Burhan</h3>
          <p className="author-bio">
            Maheera Burhan is the author of <em>{bookTitle}</em>. A fuller introduction will be shared here soon.
          </p>
          <a
            className="button button-outline"
            href={publicationUrl}
            target="_blank"
            rel="noreferrer"
          >
            EXPLORE HER WRITING <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
