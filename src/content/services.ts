import { asset } from "@/lib/asset";

export interface Service {
  slug: string;
  index: string;
  title: string;
  lead: string;
  body: string;
  deliverables: string[];
  media: string;
  poster?: string;
  mirror?: boolean;
}

export const services: Service[] = [
  {
    slug: "ux-ui",
    index: "01",
    title: "UX/UI",
    lead: "Сначала цифры. Потом формы.",
    body: "Аналитика и задачи бизнеса — до мудбордов. Прототип, сценарии, визуал. B2B-SaaS, маркетплейсы, сложные админки.",
    deliverables: ["Аудит и CJM", "Прототип", "UI-kit", "Макеты под девелопмент"],
    media: asset("/media/placeholders/ca51fd_1747445373-sizzle_may14.mp4"),
  },
  {
    slug: "design-system",
    index: "02",
    title: "Дизайн-система",
    lead: "Растёт вместе с продуктом.",
    body: "Атомарные компоненты и токены. Готовы к переиспользованию, кастомизации и развитию внутри команды. Figma, документация, версионирование.",
    deliverables: ["Токены", "Библиотека компонентов", "Документация", "Темизация"],
    media: asset("/media/placeholders/bbd2ab_1750263169-ai-strategy-tools.mp4"),
    mirror: true,
  },
  {
    slug: "motion",
    index: "03",
    title: "Моушн",
    lead: "Продукт в движении.",
    body: "Свой моушн-отдел. От раскадровки до финального рендера. Объясняем сложный продукт за 40 секунд — и готовим под любой экран.",
    deliverables: ["Скрипт и раскадровка", "2D/3D-моушн", "Саунд-дизайн", "Адаптации"],
    media: asset("/media/placeholders/ed34de_1749051298-lead-ai-travel-hero-video-01.mp4"),
  },
  {
    slug: "branding",
    index: "04",
    title: "Брендинг",
    lead: "Айдентика, которая работает в продукте.",
    body: "Бренд живёт на лендинге, в приложении, в соцсетях и в продакте. Финал — brandbook и рабочие файлы.",
    deliverables: ["Логотип и система", "Гайдлайны", "Носители", "Шаблоны"],
    media: asset("/media/placeholders/1b7b4b_1744201877-art-basel.mp4"),
  },
  {
    slug: "development",
    index: "05",
    title: "Разработка",
    lead: "От макета до продакшена.",
    body: "React, TypeScript, лендинги под ключ. Подключаем CMS, аналитику и эксперименты. Дизайн и код в одной команде — каждая деталь доходит до пользователя.",
    deliverables: ["Лендинги", "Web-приложения", "Интеграция CMS", "Аналитика"],
    media: asset("/media/placeholders/fd6a7b_1750188557-productinnovation-travel.mp4"),
    mirror: true,
  },
];
