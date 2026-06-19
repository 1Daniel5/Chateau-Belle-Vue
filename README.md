# Chateau Belle Vue - React Edition

A complete beginner-friendly recreation of the Chateau Belle Vue luxury vineyard website using React, Tailwind CSS, and modern JavaScript.

---

## Project Structure

```
chateau-belle-vue-react/
├── index.html              # Main HTML file (entry point)
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build tool configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main App component (ALL the code!)
│   └── index.css           # Global styles + Tailwind directives
```

---

## How to Run This Project

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org). This gives you `npm` (Node Package Manager).

### Step 2: Install Dependencies
Open your terminal in this folder and run:
```bash
npm install
```
This reads `package.json` and downloads all the libraries we need.

### Step 3: Start the Development Server
```bash
npm run dev
```
This starts Vite (our build tool) and opens the website at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```
This creates an optimized `dist/` folder ready for uploading to a web server.

---

## External Libraries Used

| Library | Purpose | Why We Use It |
|---------|---------|---------------|
| **React** | UI Framework | Component-based architecture, state management |
| **Tailwind CSS** | Styling | Utility-first CSS, no writing custom CSS files |
| **Framer Motion** | Animations | Easy scroll animations, page transitions, preloader |
| **Swiper** | Carousel | Touch-friendly image slider with autoplay |
| **Lucide React** | Icons | Beautiful, consistent icon set |
| **Vite** | Build Tool | Fast development server and optimized builds |

---

## Key React Concepts Explained

### 1. useState - Remembering Things That Change
```javascript
const [activeWine, setActiveWine] = useState('cabernet');
```
- `activeWine` is the current value ('cabernet')
- `setActiveWine` is the function to change it
- When you call `setActiveWine('chardonnay')`, React automatically redraws the page

### 2. useEffect - Running Code at Specific Times
```javascript
useEffect(() => {
  const timer = setTimeout(() => setPreloaderDone(true), 2500);
  return () => clearTimeout(timer);
}, []);
```
- Runs after the component renders
- The `[]` means "run only once" (like componentDidMount)
- The return function is cleanup (like componentWillUnmount)

### 3. useRef - Remembering Without Redrawing
```javascript
const statsAnimated = useRef(false);
```
- Like useState but changing it does NOT trigger a re-render
- Perfect for flags, timers, or DOM references

### 4. Props - Passing Data to Components
```javascript
function SectionHeader({ scriptLabel, subtitle, title }) {
  return <h2>{title}</h2>;
}
// Usage: <SectionHeader title="My Title" />
```

### 5. Conditional Rendering - Showing/Hiding Elements
```javascript
{mobileMenuOpen && (
  <div className="mobile-menu">...</div>
)}
```
- If `mobileMenuOpen` is true, show the menu
- If false, show nothing

### 6. Mapping Arrays to JSX
```javascript
{winesData.map((wine) => (
  <button key={wine.id}>{wine.name}</button>
))}
```
- Takes an array and returns JSX for each item
- Always include a unique `key` prop!

---

## How the Code is Organized

### Data Section (Top of App.jsx)
All content is stored in JavaScript arrays/objects:
- `winesData` - Information about each wine
- `carouselData` - Estate carousel slides
- `timelineData` - Historical milestones
- `heritageTabsData` - Tab content for Story/Craft/Awards
- `newsData` - News articles
- `testimonialsData` - Visitor reviews

### Helper Components
- `SectionHeader` - Reusable title block used 6 times

### Main App Component
Contains all the sections:
1. **Preloader** - Loading screen with animation
2. **Navigation** - Fixed header with mobile menu
3. **Hero** - Full-screen banner with stats
4. **Wines** - Tabbed wine showcase
5. **Estate** - Image carousel (Swiper)
6. **Heritage** - Timeline and tabs
7. **News** - Articles, testimonials, story
8. **Contact** - Form and visit info
9. **Footer** - Links and newsletter
10. **BackToTop** - Floating scroll button

---

## Styling with Tailwind CSS

Instead of writing CSS like:
```css
.button {
  background-color: #c9a962;
  padding: 16px 40px;
  border-radius: 4px;
}
```

We use Tailwind utility classes:
```jsx
<button className="px-10 py-4 bg-[#c9a962] rounded hover:bg-[#d4bc7e]">
```

**Benefits:**
- No switching between CSS and JS files
- Consistent design system
- Smaller file sizes (only used classes are included)
- Responsive design with prefixes: `md:`, `lg:`, `sm:`

---

## Animations with Framer Motion

### Scroll Animations
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content fades in when scrolled into view
</motion.div>
```

### Page Transitions
```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div exit={{ opacity: 0 }}>
      This animates out when removed
    </motion.div>
  )}
</AnimatePresence>
```

### Hover Effects
```jsx
<motion.div whileHover={{ scale: 1.02 }}>
  Scales up on hover
</motion.div>
```

---

## Image Sources

All images are from Unsplash (free stock photos):
- Vineyard: `images.unsplash.com/photo-1506377247377-2a5b3b417ebb`
- Chateau: `images.unsplash.com/photo-1560493676-04071c5f467b`
- Cellars: `images.unsplash.com/photo-1510812431401-41d2bd2722f3`
- Red Wine: `images.unsplash.com/photo-1584916201218-f4242ceb4809`
- White Wine: `images.unsplash.com/photo-1586370434639-0fe43b2d32e6`
- Rose: `images.unsplash.com/photo-1553361371-9b22f78e8b1d`

---

## Troubleshooting

### "npm install" fails?
Make sure you have Node.js 18+ installed:
```bash
node --version
```

### Images not loading?
The images use Unsplash URLs and require an internet connection. If offline, replace with local images in the `public/images/` folder.

### Styles look wrong?
Make sure Tailwind CSS is properly configured. Check that `postcss.config.js` and `tailwind.config.js` exist.

---

## Learning Resources

- **React Official Docs**: [react.dev](https://react.dev)
- **Tailwind CSS Docs**: [tailwindcss.com](https://tailwindcss.com)
- **Framer Motion Docs**: [framer.com/motion](https://www.framer.com/motion/)
- **Swiper Docs**: [swiperjs.com](https://swiperjs.com)
- **Lucide Icons**: [lucide.dev](https://lucide.dev)

---

## License

This is a learning project. Feel free to use, modify, and learn from it!
