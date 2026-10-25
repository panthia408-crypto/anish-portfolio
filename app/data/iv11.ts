// Industrial Vision Vol. 11.0 (2026): pieces by Anish Panthi, shown as the real printed pages.
// Page images live in public/files/iv11/ and are 1200 x 1698 pixels (A4).

export type MagazinePage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Piece = {
  id: "article" | "message";
  kind: string;
  title: string;
  subtitle?: string;
  summary: string;
  credit: string;
  pages: MagazinePage[];
};

export const magazine = {
  name: "Industrial Vision",
  volume: "Volume 11.0",
  year: "2026",
  issn: "2392-4330",
  publisher: "Society of Industrial Engineering Students (SOIES) Nepal",
  pdf: "/files/industrial-vision-vol11.pdf",
};

export const pieces: Piece[] = [
  {
    id: "article",
    kind: "Article",
    title: "Pilgrimage Tourism & Sustainable Value",
    subtitle: "Rethinking Nepal's Tourism Success",
    summary:
      "Arrivals in Nepal keep climbing, but the money is not following. Using Lumbini as the case, this article applies Industrial Engineering ideas such as throughput versus value, value chains and process improvement to ask how a pilgrimage visit can leave more behind for local people.",
    credit: "First published in Industrial Vision Vol. 11.0, 2026, pages 29 to 31",
    pages: [
      {
        src: "/files/iv11/article-1.jpg",
        alt: "Page 29 of Industrial Vision Vol. 11: the opening of the article Pilgrimage Tourism and Sustainable Value, with a photo of Lumbini",
        width: 1200,
        height: 1698,
      },
      {
        src: "/files/iv11/article-2.jpg",
        alt: "Page 30 of Industrial Vision Vol. 11: the article continues with sections on economic leakage, sustainable tourism and policy recommendations",
        width: 1200,
        height: 1698,
      },
      {
        src: "/files/iv11/article-3.jpg",
        alt: "Page 31 of Industrial Vision Vol. 11: references and an infographic comparing the high-traffic model with the high-value model of tourism",
        width: 1200,
        height: 1698,
      },
    ],
  },
  {
    id: "message",
    kind: "President's Message",
    title: "President's Message",
    subtitle: "Systemic Excellence: Designing Agile Industries",
    summary:
      "Why Volume 11 was built from the ground up, a thank you to everyone behind it, and a note on closing my term as President. The one instinct I hope the team carries forward: don't just name the system, go find it.",
    credit: "First published in Industrial Vision Vol. 11.0, 2026",
    pages: [
      {
        src: "/files/iv11/president-message.jpg",
        alt: "President's Message by Anish Panthi, President of SOIES Nepal, 18th executive committee, in Industrial Vision Vol. 11",
        width: 1200,
        height: 1698,
      },
    ],
  },
];
