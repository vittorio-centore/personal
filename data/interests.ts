export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const interests: Interest[] = [
  {
    id: "1",
    title: "Robotics & AI",
    description: "Building intelligent systems that interact with the physical world",
    icon: "🤖",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "2",
    title: "Medical Technology",
    description: "Applying CS to improve healthcare and surgical procedures",
    icon: "🏥",
    color: "from-red-500 to-pink-500"
  },
  {
    id: "3",
    title: "Speedcubing",
    description: "Solving Rubik's cubes competitively and teaching algorithms",
    icon: "🧩",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "4",
    title: "Hiking & Travel",
    description: "Exploring mountains and experiencing different cultures",
    icon: "⛰️",
    color: "from-orange-500 to-amber-500"
  },
  {
    id: "5",
    title: "Open Source",
    description: "Contributing to the global developer community",
    icon: "💻",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: "6",
    title: "Teaching & Mentoring",
    description: "Helping others learn programming and problem-solving",
    icon: "📚",
    color: "from-yellow-500 to-orange-500"
  }
];

