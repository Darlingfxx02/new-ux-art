export interface CaseItem {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  year: number;
  image: string;
}

export const cases: CaseItem[] = [
  {
    slug: "case-1",
    title: "Platform redesign",
    client: "Client A",
    tags: ["Product", "Web"],
    year: 2025,
    image: "/media/placeholders/addb64_1753982207-intelligent-experiences-fantasy.jpg",
  },
  {
    slug: "case-2",
    title: "Brand system",
    client: "Client B",
    tags: ["Brand", "Identity"],
    year: 2024,
    image: "/media/placeholders/e5f6cd_1774470947-sxsw-grill-panel-3.png",
  },
  {
    slug: "case-3",
    title: "Mobile app",
    client: "Client C",
    tags: ["Product", "Mobile"],
    year: 2024,
    image: "/media/placeholders/98e771_1751323275-ancestry-petdna-ux-design.png",
  },
];
