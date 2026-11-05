import { ArrowUpRight } from "lucide-react";
import { bookTitle, instagramUrl, publicationUrl } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <span>AN INDEPENDENT POETRY COLLECTION</span>
        <span>UNSENT WORDS. HELD WITH CARE.</span>
      </div>
      <div className="footer-main">
        <a className="footer-title" href="#home">
          {bookTitle.split(" ")[0]}<br />
          <em>{bookTitle.split(" ").slice(1).join(" ").toUpperCase()}.</em>
        </a>
        <div className="footer-details">
          <span className="footer-label">THE AUTHOR</span>
          <p>Written by Maheera Burhan</p>
          <a href={publicationUrl} target="_blank" rel="noreferrer">
            READ HER WRITING <ArrowUpRight size={13} />
          </a>
        </div>
        <nav className="footer-links" aria-label="Connect with the author">
          <span className="footer-label">ELSEWHERE</span>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            INSTAGRAM
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href={publicationUrl} target="_blank" rel="noreferrer">
            SUBSTACK
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <span className="footer-contact">CONTACT <small>COMING SOON</small></span>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MAHEERA BURHAN</span>
        <span>AN INDEPENDENT COLLECTION</span>
        <a href="#home">BACK TO THE BEGINNING <ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
