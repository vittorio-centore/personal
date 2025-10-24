# Vittorio's Portfolio Website

A modern, interactive portfolio website built with Next.js 14, featuring beautiful animations, cursor-aware interactions, and a clean, responsive design.

## ✨ Features

- **Interactive Hero Section**: 3×3 animated cube grid that responds to mouse movement
- **Projects Showcase**: Parallax hover effects with tilt animations on project cards
- **Photo Gallery**: Lightbox gallery with smooth transitions
- **Interests Section**: Animated icons and interactive cards
- **Dark/Light Mode**: Smooth theme toggle with system preference detection
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth interactions
- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
personal_website/
├── app/                    # Next.js 14 App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page with hero section
│   ├── projects/          # Projects showcase page
│   ├── about/             # About & Photos page
│   └── interests/         # Interests & skills page
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Navigation bar with theme toggle
│   ├── HeroCube.tsx       # Interactive 3D cube grid
│   ├── ProjectCard.tsx    # Project card with hover effects
│   └── PhotoGallery.tsx   # Photo gallery with lightbox
├── context/               # React context providers
│   └── ThemeContext.tsx   # Theme management (dark/light)
├── data/                  # Static data files
│   ├── projects.ts        # Projects data
│   ├── interests.ts       # Interests data
│   └── photos.ts          # Photos data
└── public/                # Static assets (add your images here)
```

## 🎨 Customization

### Update Personal Information

1. **Projects**: Edit `data/projects.ts` to add/modify your projects
2. **Photos**: Update `data/photos.ts` with your photo URLs and captions
3. **Interests**: Customize `data/interests.ts` with your interests
4. **About Me**: Edit `app/about/page.tsx` to update your story and education

### Change Colors

The color scheme can be customized in `tailwind.config.ts`:
- Michigan Maize: `#FFCB05`
- Michigan Blue: `#00274C`
- Add custom gradients in the `backgroundImage` section

### Add Your Images

1. Place your images in the `public/` folder
2. Update image paths in the data files:
   - Projects: `data/projects.ts`
   - Photos: `data/photos.ts`
3. Or use external URLs (Unsplash, Imgur, etc.)

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

The 3×3 cube grid automatically adjusts spacing and size based on screen size.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Your site will be live at `your-project.vercel.app`

### Custom Domain

1. Go to your Vercel project settings
2. Add your custom domain (e.g., `vittorio.dev`)
3. Update DNS settings as instructed

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

- Email: vittorio@umich.edu
- GitHub: [@vittorioc](https://github.com/vittorioc)
- LinkedIn: [vittorioc](https://linkedin.com/in/vittorioc)

---

Built with ❤️ by Vittorio

