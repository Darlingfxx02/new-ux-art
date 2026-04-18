export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string; // 4:5 портрет
};

// Портреты — placeholder с unsplash (заменить на реальную команду).
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1125&fit=crop&crop=faces&auto=format&q=80`;

export const team: TeamMember[] = [
  { id: "lead",   name: "Александр Холин", role: "CEO / Art Director",     photo: u("1500648767791-00dcc994a43e") },
  { id: "design", name: "Мария Лаврова",   role: "Lead Product Designer",  photo: u("1544005313-94ddf0286df2") },
  { id: "motion", name: "Илья Петров",     role: "Motion / 3D",            photo: u("1531427186611-ecfd6d936c79") },
  { id: "ux",     name: "Анна Кравцова",   role: "UX Researcher",          photo: u("1438761681033-6461ffad8d80") },
  { id: "front",  name: "Дмитрий Соколов", role: "Frontend",               photo: u("1506794778202-cad84cf45f1d") },
  { id: "brand",  name: "Юлия Орлова",     role: "Brand Designer",         photo: u("1487412720507-e7ab37603c6f") },
  { id: "pm",     name: "Никита Белов",    role: "Project Lead",           photo: u("1492562080023-ab3db95bfbce") },
];
