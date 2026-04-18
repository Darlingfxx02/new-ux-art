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
    slug: "vidaq",
    title: "Vidaq — видеохостинг от экспертов",
    client: "Vidaq",
    tags: ["Product", "Video"],
    year: 2024,
    image: "/media/uxart/e9ccec_vidaq.svg",
  },
  {
    slug: "riv-gauche",
    title: "Корпоративный портал РИВ ГОШ",
    client: "РИВ ГОШ",
    tags: ["Intranet", "Portal"],
    year: 2022,
    image: "/media/uxart/4d057e__.svg",
  },
  {
    slug: "rosgosstrakh",
    title: "Корпоративный портал РОСГОССТРАХ",
    client: "РОСГОССТРАХ",
    tags: ["Intranet", "Enterprise"],
    year: 2023,
    image: "/media/uxart/9ef29c_photo.svg",
  },
  {
    slug: "peterburg-nedv",
    title: "Корпоративный портал «Петербургской Недвижимости»",
    client: "Setl Group",
    tags: ["Intranet", "Portal"],
    year: 2024,
    image: "/media/uxart/eff86f_photo.png",
  },
  {
    slug: "vsmpo-avisma",
    title: "Корпоративный портал ВСМПО-АВИСМА",
    client: "ВСМПО-АВИСМА",
    tags: ["Intranet", "Industry"],
    year: 2024,
    image: "/media/uxart/9dd23b_photo.png",
  },
  {
    slug: "club-first",
    title: "Клуб Первых — сообщество для бизнеса",
    client: "СБЕР",
    tags: ["Product", "Community"],
    year: 2023,
    image: "/media/uxart/9b73d2_vlcsnap-2025-08-22-0.png",
  },
  {
    slug: "tn-life",
    title: "TN LIFE — экосистема сотрудников",
    client: "ТЕХНОНИКОЛЬ",
    tags: ["Product", "HR"],
    year: 2024,
    image: "/media/uxart/a45ce7_life.svg",
  },
  {
    slug: "getblock",
    title: "GetBlock — blockchain explorer",
    client: "GetBlock",
    tags: ["Product", "Web3"],
    year: 2023,
    image: "/media/uxart/f250ad_Frame_1948755918.png",
  },
  {
    slug: "hihub",
    title: "HiHub — HR-сервис",
    client: "HiHub",
    tags: ["Product", "SaaS"],
    year: 2023,
    image: "/media/uxart/e29164_7_6.png",
  },
];
