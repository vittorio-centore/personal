export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Surgical AI Assistant",
    description: "Computer vision system for robotic surgery guidance",
    longDescription: "Developed a real-time computer vision system using deep learning to assist in robotic surgeries. Implemented object detection and tracking algorithms for surgical instruments.",
    tags: ["Python", "PyTorch", "Computer Vision", "ROS"],
    github: "https://github.com/vittorioc",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    title: "Campus Navigation AR",
    description: "Augmented reality app for U-Michigan campus navigation",
    longDescription: "Built an AR mobile application that helps students navigate the University of Michigan campus with real-time directions and building information overlay.",
    tags: ["Swift", "ARKit", "iOS", "Firebase"],
    github: "https://github.com/vittorioc",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
  },
  {
    id: "3",
    title: "Neural Network Visualizer",
    description: "Interactive tool for understanding deep learning architectures",
    longDescription: "Created an interactive web application that visualizes neural network architectures and training processes in real-time, making ML education more accessible.",
    tags: ["React", "Three.js", "TensorFlow.js", "TypeScript"],
    link: "https://example.com",
    github: "https://github.com/vittorioc",
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
  },
  {
    id: "4",
    title: "Autonomous Drone Swarm",
    description: "Coordinated multi-agent system for search and rescue",
    longDescription: "Designed and implemented a swarm intelligence algorithm for coordinating multiple autonomous drones in search and rescue operations.",
    tags: ["C++", "ROS2", "Python", "Computer Vision"],
    github: "https://github.com/vittorioc",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop"
  },
  {
    id: "5",
    title: "Smart Home Energy Optimizer",
    description: "ML-based system for reducing household energy consumption",
    longDescription: "Built a machine learning system that learns household patterns and optimizes energy usage, achieving 30% reduction in energy costs.",
    tags: ["Python", "TensorFlow", "IoT", "React"],
    link: "https://example.com",
    color: "from-yellow-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop"
  },
  {
    id: "6",
    title: "Competitive Programming Platform",
    description: "Real-time coding competition and learning platform",
    longDescription: "Developed a full-stack platform for hosting coding competitions with real-time judging, leaderboards, and educational resources.",
    tags: ["Next.js", "Node.js", "Docker", "PostgreSQL"],
    github: "https://github.com/vittorioc",
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
  }
];

