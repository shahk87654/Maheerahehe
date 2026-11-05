export const bookTitle = "Unsent Unkind";
export const publicationUrl = "https://maheeraburhan.substack.com/";
export const instagramUrl = "https://www.instagram.com/maheerahehe/";
export const authorPortrait = "/images/maheera-burhan.jpg";

export const previewPages = [
  {
    label: "01 / LETTER TO THE READER",
    title: "Dear reader,",
    paragraphs: [
      "Infinity. It’s a joke writers fed us between the margins. Writers, these horrific, delusional creatures that think something is possible other than the reality they inhabit. A reality so outrageous it became a byproduct of stupidity.",
      "After everything, I owe you nothing, except the cold indifference you are building inside me, and the refusal and acceptance of understanding that you are now, for the love of god, gone. The ink of red blood you left as footprints over my heart is still fresh, but as I dip my own pen in the water while writing this, I wipe the marks away, trying to at least—for my hands are bloodied too.",
    ],
  },
  {
    label: "02 / THE LETTER CONTINUES",
    title: "A heart returned.",
    paragraphs: [
      "For the time being, I owe my heart to you. How delusional was I to think it would take refuge in your warmth, even though I was shivering from the cold outside. I did that to fancy myself, and now I am writing this to act mundane. It’s enough to steal my heart back from you, to cover it in bubble wrap, to nourish it with warm liquids, and to refuse to abandon me for you.",
      "There is a restless energy in my body as I write this shimmery horrific word—abandonment. It shines bright; sometimes like glitter, sometimes like a white piercing headlight that scratches your cornea. And sometimes, like a combination of orange and yellow, resembling the fireworks I gazed at while waiting for you.",
    ],
  },
  {
    label: "03 / THE DRUG OF INDIFFERENCE",
    title: "Indifference.",
    paragraphs: [
      "I feel pathetic. Speaking like this as if I care. Because the drapes are shut now, keeping me safe from the blazing hot sun, cocooning me in the cool air of indifference. Indifference. What a poetic word it is. It’s a weapon we use to disguise our love and disgust. Meanwhile, poets use it as a drug.",
    ],
  },
  {
    label: "04 / THE TRANSACTION",
    title: "A drug-rich poet.",
    paragraphs: [
      "One of such poets is now standing in an abandoned parking lot. You are being seen, pulling off the transaction of the same drug you write about. After finalizing the quantity and negotiating the price of it, you shook hands with the dealer, pocketed your drugs, and left. You skip and dance your way back home, now a drug-rich, passing a few couples standing hand in hand.",
    ],
  },
  {
    label: "05 / A LEMON FLAVOR",
    title: "Delusion.",
    paragraphs: [
      "You can see a drug addict throwing daggers at them with his eyes on the other side of the road. Ignoring him, you stop by a grocery store to gather snacks for the movie night because being the owner of such a prestigious drug deserves a celebration. Roaming around different aisles, you start going through the beverages section when a sparkling drink catches your eye. Carefully reading the name of it—“Delusion”—you get to know that it promised a lemon flavor",
    ],
  },
] as const;

export const images = {
  hero: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=85",
  darkness:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
  becoming:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
  healing:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
};

export const journey = [
  {
    number: "01",
    title: "THE DARKNESS",
    description:
      "The feelings we couldn't explain. The pain we couldn't put into words.",
    image: images.darkness,
    alt: "A mountain beneath a quiet, star-filled night sky",
    tone: "dark",
  },
  {
    number: "02",
    title: "THE BECOMING",
    description:
      "Confronting the past, understanding ourselves and finding our voice.",
    image: images.becoming,
    alt: "The first warm light of morning over a distant landscape",
    tone: "middle",
  },
  {
    number: "03",
    title: "THE HEALING",
    description:
      "Discovering that even after everything, there is still a reason to hope.",
    image: images.healing,
    alt: "Soft golden light resting over a peaceful mountain valley",
    tone: "light",
  },
] as const;
