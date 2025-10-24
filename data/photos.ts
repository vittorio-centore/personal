export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const photos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Mountain landscape",
    caption: "Hiking in the Rockies - Summer 2024",
    category: "Travel"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",
    alt: "Hackathon team",
    caption: "MHacks 2024 - Winner of Best AI Project",
    category: "Tech"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    alt: "University campus",
    caption: "University of Michigan - My Second Home",
    category: "Campus"
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&h=600&fit=crop",
    alt: "Speedcubing competition",
    caption: "Speedcubing Competition - 12.3s Personal Record",
    category: "Hobbies"
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    alt: "Team collaboration",
    caption: "Working with the Robotics Team",
    category: "Tech"
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Sunset hiking",
    caption: "Sunset at 14,000 feet",
    category: "Travel"
  }
];

