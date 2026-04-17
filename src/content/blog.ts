export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  url: string;
  /* TODO placeholder: обложка статьи — пока без изображения */
  cover?: string;
}

export const posts: BlogPost[] = [
  {
    slug: "base",
    title: "Это БАЗА: чеклист перед любым редизайном",
    date: "2025 · 11",
    readTime: "7 мин",
    url: "#",
  },
  {
    slug: "once-a-year",
    title: "В год один раз: когда дизайн-систему пора ломать",
    date: "2025 · 09",
    readTime: "5 мин",
    url: "#",
  },
  {
    slug: "contrast",
    title: "Полный гайд по контрастности",
    date: "2025 · 06",
    readTime: "12 мин",
    url: "#",
  },
  {
    slug: "process",
    title: "Как мы ведём проект: от брифа до продакшена",
    date: "2025 · 03",
    readTime: "9 мин",
    url: "#",
  },
];
