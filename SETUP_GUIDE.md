# Setup Guide

Follow these steps to get your portfolio website up and running!

## Step 1: Install Dependencies

First, install all required packages:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)

## Step 2: Customize Your Content

### Update Personal Information

1. **Home Page** (`app/page.tsx`)
   - Change name, title, and description
   - Update social media links (GitHub, LinkedIn, Email)
   - Replace Michigan colors if desired

2. **Projects** (`data/projects.ts`)
   - Add your own projects
   - Update titles, descriptions, tags
   - Add your GitHub/demo links
   - Replace demo images with your own

3. **About Page** (`app/about/page.tsx`)
   - Write your story
   - Update education details
   - Change stats (projects, hackathons, etc.)
   - Update university information

4. **Interests** (`data/interests.ts`)
   - Add your personal interests
   - Update tech stack
   - Modify fun facts

5. **Photos** (`data/photos.ts`)
   - Add your own photo URLs
   - Update captions and categories

### Color Customization

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  'michigan-maize': '#FFCB05',  // Change to your primary color
  'michigan-blue': '#00274C',    // Change to your secondary color
}
```

Gradient colors are used throughout. Search for `from-purple-600` and similar classes to customize.

## Step 3: Add Your Images

### Option 1: Use Local Images
1. Place images in `public/images/` folder
2. Reference them as `/images/your-image.jpg`

### Option 2: Use External URLs
- Currently using Unsplash demo images
- Replace with your own hosted images (Imgur, Cloudinary, etc.)
- Update `next.config.mjs` domains if needed

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## Step 5: Test Features

Check that everything works:
- ✅ Navigation between pages
- ✅ Dark/Light mode toggle
- ✅ Interactive cube responds to mouse
- ✅ Project cards tilt on hover
- ✅ Photo gallery lightbox
- ✅ Mobile responsive (test on phone/resize browser)
- ✅ Custom cursor (desktop only)

## Step 6: Build for Production

When ready to deploy:

```bash
npm run build
npm start
```

This creates an optimized production build.

## Step 7: Deploy to Vercel

### Quick Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (Vercel auto-detects Next.js)

### Custom Domain
1. In Vercel project settings → Domains
2. Add your domain (e.g., `vittorio.dev`)
3. Update DNS as instructed
4. SSL automatically configured

## Troubleshooting

### Issue: Images not loading
**Solution**: Check `next.config.mjs` domains list, add your image host

### Issue: Build errors
**Solution**: Run `npm install` again, delete `.next` folder and rebuild

### Issue: Theme toggle not working
**Solution**: Clear browser cache, check localStorage in DevTools

### Issue: Custom cursor not showing on mobile
**Expected**: Custom cursor is desktop-only (intentional)

## Optional Enhancements

### Add Google Analytics
1. Get GA4 tracking ID
2. Add to `app/layout.tsx`

### Add Contact Form
1. Use Formspree, Netlify Forms, or EmailJS
2. Create `app/contact/page.tsx`

### Add Blog
1. Use MDX or Contentlayer
2. Create `app/blog/` directory

### Add Resume Download
1. Add PDF to `public/resume.pdf`
2. Link from About page

## Need Help?

- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Framer Motion Docs](https://www.framer.com/motion/)
- Check [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Project Structure Reference

```
personal_website/
├── app/                    # Pages (App Router)
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   ├── about/             # About & Photos page
│   ├── interests/         # Interests page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
├── context/               # React contexts (Theme)
├── data/                  # Static data
├── public/                # Static files
└── README.md              # Main documentation
```

---

**Ready to deploy?** Push to GitHub and connect to Vercel!

**Want to customize more?** All components are fully editable. Make it yours! 🚀

