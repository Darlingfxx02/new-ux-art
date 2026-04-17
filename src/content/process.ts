export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Аналитика",
    description: "Изучаем продукт, метрики и пользователей.",
  },
  {
    index: "02",
    title: "Гипотеза",
    description: "Обосновываем каждое решение данными.",
  },
  {
    index: "03",
    title: "Прототип",
    description: "Атомарно, на токенах. Готов к переиспользованию.",
  },
  {
    index: "04",
    title: "Передача",
    description: "Отдаём инструмент, который развивается дальше.",
  },
];
