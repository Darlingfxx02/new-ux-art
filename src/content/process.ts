export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Опыт",
    description: "250+ проектов за 14 лет. B2B-SaaS, маркетплейсы, сложные интерфейсы.",
  },
  {
    index: "02",
    title: "Система",
    description: "Токены и атомарные компоненты. Переиспользуемо и задокументировано.",
  },
  {
    index: "03",
    title: "Данные",
    description: "Метрики и гипотезы до мудбордов. Обоснование под каждое решение.",
  },
  {
    index: "04",
    title: "Продакшен",
    description: "Дизайн, код, моушн — в одной команде. Доводим до релиза.",
  },
];
