export interface SocialChannel {
  platform: string;
  handle: string;
  url: string;
  followers?: string;
}

export interface SocialProfile {
  name: string;
  role: string;
  channels: SocialChannel[];
}

export interface StoryItem {
  title: string;
  /* TODO placeholder: превью истории (9:16) */
  cover?: string;
}

export const stories: StoryItem[] = [
  { title: "Кейс" },
  { title: "Процесс" },
  { title: "Команда" },
  { title: "Награды" },
  { title: "Доклад" },
  { title: "Бэкстейдж" },
  { title: "Стек" },
  { title: "Вакансии" },
];

export const ceoProfile: SocialProfile = {
  name: "Артём Конаков",
  role: "CEO UXART",
  channels: [
    { platform: "Telegram", handle: "@konakovart", url: "https://t.me/konakovart", followers: "7 000" },
    { platform: "Instagram", handle: "@konakov.art", url: "#" },
    { platform: "VC.RU", handle: "/konakov", url: "#" },
  ],
};

export const studioProfile: SocialProfile = {
  name: "UXART Studio",
  role: "Дизайн-студия",
  channels: [
    { platform: "Telegram", handle: "@uxart", url: "#" },
    { platform: "Instagram", handle: "@uxart.studio", url: "#" },
    { platform: "Behance", handle: "/uxart", url: "#" },
    { platform: "Dribbble", handle: "/uxart", url: "#" },
  ],
};
