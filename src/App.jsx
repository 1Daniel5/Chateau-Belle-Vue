import React, { useState, useEffect, useRef } from 'react';
import { 
  Wine, MapPin, Thermometer, Clock, Star, BookOpen, Trophy,
  Instagram, Facebook, Twitter, Youtube, ChevronUp, Menu, X,
  Phone, Mail, Clock as ClockIcon, MapPin as MapPinIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


// WINE DATA: Information about each wine we sell
// This is an array (list) of objects (dictionaries)
const winesData = [
  {
    id: 'cabernet',
    name: 'Cabernet Sauvignon',
    year: '2019',
    subtitle: 'Grand Reserve',
    description: 'Our flagship Cabernet Sauvignon showcases the perfect balance of power and elegance. Aged in French oak barrels for 24 months, this wine reveals layers of blackcurrant, cedar, and dark chocolate.',
    notes: 'Full-bodied with firm tannins and a long, velvety finish.',
    alcohol: '14.5%',
    temperature: '16-18°C',
    aging: '24 months',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&h=600&fit=crop'
  },
  {
    id: 'chardonnay',
    name: 'Chardonnay',
    year: '2021',
    subtitle: 'Estate Collection',
    description: 'A beautifully expressive Chardonnay that captures the essence of our cool-climate vineyards. Fermented and aged in oak, it offers a harmonious blend of citrus, vanilla, and toasted almonds.',
    notes: 'Rich and creamy with bright acidity and a lingering finish.',
    alcohol: '13.5%',
    temperature: '10-12°C',
    aging: '12 months',
    image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=400&h=600&fit=crop'
  },
  {
    id: 'rose',
    name: 'Rose',
    year: '2022',
    subtitle: 'Summer Blend',
    description: 'Our elegant Rose is crafted from hand-picked Grenache and Syrah grapes. With its delicate salmon hue and refreshing character, it is the perfect companion for warm summer afternoons.',
    notes: 'Dry and crisp with notes of strawberry, peach, and rose petals.',
    alcohol: '12.5%',
    temperature: '8-10°C',
    aging: '3 months',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=600&fit=crop'
  }
];

// CAROUSEL DATA: Images and text for the estate slideshow
const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&h=600&fit=crop',
    subtitle: 'Where It All Begins',
    title: 'Rolling Vineyards',
    stat: '250',
    unit: 'hectares',
    description: 'Our vineyards stretch across sun-drenched hills, where each grape variety finds its perfect terroir.'
  },
  {
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=600&fit=crop',
    subtitle: 'Historic Elegance',
    title: 'The Chateau',
    stat: '1887',
    unit: 'established',
    description: 'Our 19th-century chateau stands as a testament to timeless elegance and welcomes guests for tastings.'
  },
  {
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=600&fit=crop',
    subtitle: 'Where Magic Happens',
    title: 'Ancient Cellars',
    stat: '5000',
    unit: 'barrels',
    description: 'Beneath the chateau lie our historic cellars, where wines age gracefully in French oak barrels.'
  }
];

// TIMELINE DATA: Our history milestones
const timelineData = [
  { year: '1887', event: 'Pierre Dupont establishes the vineyard' },
  { year: '1923', event: 'First international gold medal' },
  { year: '1956', event: 'Expansion to 250 hectares' },
  { year: '1989', event: 'Chateau restoration completed' },
  { year: '2015', event: 'Sustainable certification achieved' },
  { year: '2023', event: 'Named Best Vineyard in France' }
];

// HERITAGE TABS DATA: Content for the story/craft/awards tabs
const heritageTabsData = [
  {
    id: 'story',
    label: 'Our Story',
    icon: Clock,
    title: 'From Humble Beginnings',
    text: 'What began as a small family plot has grown into one of France most respected vineyards. Through wars, economic crises, and changing tastes, we have remained steadfast in our commitment to quality.',
    highlight: 'Six generations of uninterrupted family ownership',
    image: './images/founder.png'
  },
  {
    id: 'craft',
    label: 'The Craft',
    icon: BookOpen,
    title: 'Artistry in Every Bottle',
    text: 'Our winemaking philosophy combines time-honored traditions with careful innovation. Each vintage is a unique expression of our terroir, crafted by hands that have learned from generations of expertise.',
    highlight: 'Hand-harvested grapes from select vineyard blocks',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=400&fit=crop'
  },
  {
    id: 'awards',
    label: 'Recognition',
    icon: Trophy,
    title: 'Celebrated Worldwide',
    text: 'Our dedication to excellence has earned us recognition from the world most prestigious wine competitions. But our greatest reward is the satisfaction of wine lovers who choose Chateau Belle Vue.',
    highlight: 'Over 100 international awards and counting',
    image: './images/museum-awards.jpg'
  }
];

// NEWS DATA: Latest articles
const newsData = [
  {
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=250&fit=crop',
    category: 'Harvest',
    date: 'September 15, 2024',
    title: '2024 Harvest Begins',
    excerpt: 'Our team has begun harvesting the first grapes of the season. Early indicators suggest this will be an exceptional vintage.'
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop',
    category: 'Awards',
    date: 'August 28, 2024',
    title: 'Double Gold at Paris Competition',
    excerpt: 'Our 2019 Cabernet Sauvignon and 2021 Chardonnay both received gold medals at the prestigious Paris Wine Competition.'
  },
  {
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=250&fit=crop',
    category: 'Events',
    date: 'August 10, 2024',
    title: 'Autumn Wine Festival',
    excerpt: 'Join us for our annual Autumn Wine Festival featuring live music, food pairings, and exclusive tastings.'
  },
  {
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=250&fit=crop',
    category: 'Sustainability',
    date: 'July 22, 2024',
    title: 'Organic Certification Renewed',
    excerpt: 'We are proud to announce the renewal of our organic certification, reflecting our commitment to sustainable viticulture.'
  }
];

// TESTIMONIALS DATA: What guests say
const testimonialsData = [
  {
    text: '"The tour of Chateau Belle Vue was absolutely magical. The passion of the staff and the quality of the wines exceeded all expectations."',
    name: 'Sarah Mitchell',
    role: 'Wine Enthusiast'
  },
  {
    text: '"As a professional, I am always seeking exceptional wines. The Cabernet Sauvignon here is world-class and a staple in my recommendations."',
    name: 'James Crawford',
    role: 'Sommelier'
  },
  {
    text: '"From the stunning chateau to the exquisite tastings, every moment was perfect. This is a must-visit destination for any wine lover."',
    name: 'Emma Laurent',
    role: 'Food & Travel Blogger'
  }
];

/*
  HELPER COMPONENTS (SMALL REUSABLE PIECES)

  These are like our mini-components that we use multiple times.
  Think of them as custom LEGO pieces that we invented.
*/

// SECTION HEADER: The title block that appears above every section
// We use this 6 times, so making it a component saves us from repeating code
function SectionHeader({ scriptLabel, subtitle, title }) {
  return (
    <div className="text-center mb-16">
      {/* 
        motion.p is from Framer Motion (our animation library).
        Instead of just <p>, we use <motion.p> to add animations.
        initial={{ opacity: 0, y: 30 }} means: start invisible and 30px down
        whileInView={{ opacity: 1, y: 0 }} means: when scrolled into view, 
        become visible and move to normal position
        viewport={{ once: true }} means: only animate once (do not repeat)
      */}
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-lg italic text-[#c9a962] mb-2"
      >
        {scriptLabel}
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-serif text-4xl md:text-5xl font-semibold text-[#2d0a1f]"
      >
        {title}
      </motion.h2>
    </div>
  );
}

/*
  MAIN APP COMPONENT 

  This is our main component that contains everything.
  In React, we build our app by nesting components inside each other.
*/
function App() {
  
  // Which wine tab is currently selected? (cabernet/chardonnay/rose)
  const [activeWine, setActiveWine] = useState('cabernet');

  // Which heritage tab is active? (story/craft/awards)
  const [activeTab, setActiveTab] = useState('story');

  // Is the mobile menu open? (true/false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Should we show the "back to top" button? (true/false)
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Has the preloader finished? (true/false)
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Counter animation values for hero stats
  const [yearsCount, setYearsCount] = useState(0);
  const [hectaresCount, setHectaresCount] = useState(0);
  const [winesCount, setWinesCount] = useState(0);

  const statsAnimated = useRef(false);

  
  // EFFECT 1: Preloader timer
  // When the site loads, wait 2.5 seconds then hide the preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 2500);

    // Cleanup function: if this component unmounts, cancel the timer
    // This prevents memory leaks (like forgetting to turn off a faucet)
    return () => clearTimeout(timer);
  }, []); // Empty array [] means "run only once when component mounts"

  // EFFECT 2: Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY tells us how far down we have scrolled
      // If we have scrolled more than 500px, show the button
      setShowBackToTop(window.scrollY > 500);

      // Also animate stats when hero section is visible
      if (!statsAnimated.current && window.scrollY < window.innerHeight) {
        statsAnimated.current = true;
        animateCounters();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNCTION: Animate the number counters in the hero section
  const animateCounters = () => {
    // Animate years (0 to 137)
    let years = 0;
    const yearsInterval = setInterval(() => {
      years += 2; // Add 2 each time for speed
      if (years >= 137) {
        years = 137;
        clearInterval(yearsInterval);
      }
      setYearsCount(years);
    }, 30);

    // Animate hectares (0 to 250)
    let hectares = 0;
    const hectaresInterval = setInterval(() => {
      hectares += 4;
      if (hectares >= 250) {
        hectares = 250;
        clearInterval(hectaresInterval);
      }
      setHectaresCount(hectares);
    }, 30);

    // Animate wines (0 to 48)
    let wines = 0;
    const winesInterval = setInterval(() => {
      wines += 1;
      if (wines >= 48) {
        wines = 48;
        clearInterval(winesInterval);
      }
      setWinesCount(wines);
    }, 40);
  };

  // FUNCTION: Smooth scroll to section when nav link is clicked
  const scrollToSection = (id) => {
    // Find the element with that ID
    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView is a built-in browser function
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  // FUNCTION: Handle contact form submission
  const handleContactSubmit = (e) => {
    /*
      e.preventDefault() stops the browser from doing its default action.
      For forms, the default is to reload the page, which we do not want.
    */
    e.preventDefault();
    alert('Thank you for your request! We will contact you soon to confirm your visit.');
    e.target.reset();
  };

  // FUNCTION: Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <div className="font-sans text-[#1a1a1a] bg-[#f5f0e8] overflow-x-hidden">

      <section id="estate" className="py-24 bg-[#f5f0e8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader 
            scriptLabel="The Estate" 
            subtitle="DISCOVER OUR HOME" 
            title="A Place of Beauty" 
          />

          {/* Location Tag */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-12"
          >
            <MapPin size={16} className="text-[#c9a962]" />
            Bordeaux Region, France
          </motion.div>

          {/* Swiper Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              {carouselData.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[400px] md:h-[500px]">
                    {/* Slide Image */}
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Slide Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-[#2d0a1f]/90 to-transparent text-white">
                      <p className="font-serif text-base italic text-[#d4bc7e] mb-2">{slide.subtitle}</p>
                      <h3 className="font-serif text-3xl font-semibold mb-4">{slide.title}</h3>
                      <div className="mb-3">
                        <span className="font-serif text-4xl font-semibold text-[#c9a962]">{slide.stat}</span>
                        <span className="text-sm text-white/70 ml-2">{slide.unit}</span>
                      </div>
                      <p className="text-sm text-white/80 max-w-[500px]">{slide.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/*
        History, timeline, and tabs
      */}
      <section id="heritage" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader 
            scriptLabel="Our Heritage" 
            subtitle="A RICH HISTORY" 
            title="Six Generations of Winemaking" 
          />

          {/* Intro Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-[700px] mx-auto text-gray-500 mb-16 leading-relaxed"
          >
            Since 1887, the Dupont family has been crafting exceptional wines on this very estate. 
            Our story is one of passion, perseverance, and an unwavering commitment to excellence.
          </motion.p>

          {/* Timeline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-between gap-4 mb-16 overflow-x-auto pb-4"
          >
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center min-w-[120px]"
              >
                <span className="block font-serif text-2xl font-semibold text-[#c9a962] mb-2">{item.year}</span>
                <p className="text-sm text-gray-500">{item.event}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Heritage Tabs */}
          <div className="mb-16">
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {heritageTabsData.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-7 py-3.5 text-sm rounded border transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#2d0a1f] border-[#2d0a1f] text-white'
                        : 'bg-transparent border-gray-400 text-gray-500 hover:border-[#6b1f3a] hover:text-[#6b1f3a]'
                    }`}
                  >
                    <IconComponent size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content - Only shows the active tab */}
            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                {heritageTabsData.map((tab) => (
                  tab.id === activeTab && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="grid md:grid-cols-2 gap-12 items-center"
                    >
                      <img 
                        src={tab.image} 
                        alt={tab.title}
                        className="w-full h-[350px] object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-serif text-3xl font-semibold text-[#2d0a1f] mb-4">{tab.title}</h3>
                        <p className="text-base text-gray-500 leading-relaxed mb-4">{tab.text}</p>
                        <p className="font-serif text-lg italic text-[#c9a962] pl-4 border-l-2 border-[#c9a962]">
                          {tab.highlight}
                        </p>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Founder Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center pt-16 border-t border-black/10"
          >
            {/* Founder Image */}
            <div className="relative flex justify-center">
              <img 
                src="./images/founder.png" 
                alt="Henri Dupont, Founder"
                className="max-h-[400px] sepia-[0.3] rounded-lg"
              />
              {/* Year Badge */}
              <div className="absolute -bottom-5 right-16 bg-[#2d0a1f] text-white px-6 py-4 rounded-lg text-center">
                <span className="block font-serif text-3xl font-semibold text-[#c9a962]">1887</span>
                <span className="text-[11px] uppercase tracking-[0.1em]">Founded</span>
              </div>
            </div>

            {/* Founder Quote */}
            <div>
              <p className="font-serif text-base italic text-[#c9a962] mb-3">Legacy</p>
              <blockquote className="font-serif text-2xl italic text-[#2d0a1f] mb-3 leading-relaxed">
                "Great wine is not made. It is grown, nurtured, and patiently guided to express the truth of its origin."
              </blockquote>
              <cite className="text-sm text-gray-500 not-italic">- Henri Dupont, Founder</cite>

              {/* Opening Hours */}
              <div className="flex items-center gap-3 my-8 p-4 bg-[#c9a962]/10 rounded-lg">
                <ClockIcon size={24} className="text-[#c9a962]" />
                <div>
                  <span className="block text-[11px] uppercase tracking-[0.1em] text-gray-400">Opening Hours</span>
                  <span className="font-medium text-[#2d0a1f]">Daily 9:00 AM - 6:00 PM</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 bg-[#c9a962] text-[#2d0a1f] font-medium rounded hover:bg-[#d4bc7e] hover:-translate-y-0.5 transition-all"
              >
                Plan Your Visit
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/*
        Showcasing our wine collection
        
        CONCEPT: CONDITIONAL RENDERING
        We only show the wine panel that matches activeWine.
        The others are hidden. This is like changing TV channels.
      */}
      <section id="wines" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader 
            scriptLabel="Our Collection" 
            subtitle="AWARD-WINNING WINES" 
            title="Crafted with Passion" 
          />

          {/* Wine Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {winesData.map((wine) => (
              <button
                key={wine.id}
                onClick={() => setActiveWine(wine.id)}
                className={`px-6 py-3 text-sm rounded border transition-all ${
                  activeWine === wine.id
                    ? 'bg-[#2d0a1f] border-[#2d0a1f] text-white'
                    : 'bg-transparent border-gray-400 text-gray-500 hover:border-[#6b1f3a] hover:text-[#6b1f3a]'
                }`}
              >
                {wine.name}
              </button>
            ))}
          </div>

          {/* Wine Display Area - shows the selected wine */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {winesData.map((wine) => (
                wine.id === activeWine && (
                  <motion.div
                    key={wine.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-16 items-center"
                  >
                    {/* Wine Image */}
                    <motion.div 
                      className="flex justify-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img 
                        src={wine.image} 
                        alt={wine.name}
                        className="max-h-[450px] drop-shadow-2xl"
                      />
                    </motion.div>

                    {/* Wine Info */}
                    <div>
                      <p className="font-serif text-base italic text-[#c9a962] mb-2">{wine.subtitle}</p>
                      <h3 className="font-serif text-3xl font-semibold text-[#2d0a1f] mb-4">
                        {wine.name} <span className="font-normal text-gray-500">{wine.year}</span>
                      </h3>
                      <p className="text-base text-gray-500 mb-4 leading-relaxed">{wine.description}</p>
                      <p className="italic text-[#6b1f3a] mb-6 pl-4 border-l-2 border-[#c9a962]">{wine.notes}</p>

                      {/* Wine Specs */}
                      <div className="flex gap-8">
                        <div className="text-center">
                          <span className="block text-[11px] uppercase tracking-[0.1em] text-gray-400 mb-1">Alcohol</span>
                          <span className="font-serif text-xl font-semibold text-[#2d0a1f]">{wine.alcohol}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-[11px] uppercase tracking-[0.1em] text-gray-400 mb-1">Temperature</span>
                          <span className="font-serif text-xl font-semibold text-[#2d0a1f]">{wine.temperature}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-[11px] uppercase tracking-[0.1em] text-gray-400 mb-1">Aging</span>
                          <span className="font-serif text-xl font-semibold text-[#2d0a1f]">{wine.aging}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Wine Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-black/10">
            {[
              { icon: Wine, title: 'Estate Grown', desc: 'All our grapes are cultivated on our 250-hectare estate using sustainable farming practices.' },
              { icon: Thermometer, title: 'Optimal Conditions', desc: 'Our cellars maintain perfect temperature and humidity for wine aging and storage.' },
              { icon: Clock, title: 'Time-Honored Methods', desc: 'We combine traditional winemaking techniques with modern innovation for exceptional quality.' },
              { icon: Star, title: 'Award Winning', desc: 'Our wines have earned over 100 international awards and accolades.' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#c9a962]/10 rounded-full">
                  <feature.icon size={28} className="text-[#c9a962]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#2d0a1f] mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Wine Quote Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-12 bg-gradient-to-br from-[#2d0a1f] to-[#4a1528] rounded-lg text-center text-white"
          >
            <p className="font-serif text-base italic text-[#d4bc7e] mb-4">Philosophy</p>
            <blockquote className="font-serif text-2xl italic max-w-[700px] mx-auto mb-4 leading-relaxed">
              "Wine is the poetry of the earth, written in sunlight and aged in silence."
            </blockquote>
            <cite className="text-sm text-white/70">- Marcel Dupont, Master Winemaker</cite>
          </motion.div>
        </div>
      </section>

      {/*
        PRELOADER
        
        AnimatePresence is from Framer Motion. It handles entering and
        leaving animations. When preloaderDone becomes true, this component
        animates out (fades away).
      */}
      <AnimatePresence>
        {!preloaderDone && (
          <motion.div
            exit={{ opacity: 0, visibility: 'hidden' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#2d0a1f] flex items-center justify-center z-[9999]"
          >
            <div className="text-center text-white">
              {/* Wine icon from Lucide - just use it like a component! */}
              <motion.div
                animate={{ scale: [1, 0.95, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wine size={48} className="mx-auto mb-4 text-[#c9a962]" />
              </motion.div>
              <h1 className="font-serif text-2xl font-semibold tracking-[0.1em] uppercase">Chateau</h1>
              <p className="font-serif text-2xl italic text-[#c9a962] mb-2">Belle Vue</p>
              <p className="text-xs tracking-[0.2em] text-[#d4bc7e] mb-6">Est. 1887</p>
              {/* Loading bar animation */}
              <div className="w-[200px] h-[2px] bg-white/20 mx-auto rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-[#c9a962]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        NAVIGATION BAR: Fixed at top, changes style on scroll
      */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          showBackToTop ? 'bg-[#2d0a1f]/95 backdrop-blur-md py-3' : 'py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo: Clicking it scrolls to top */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-3">
            <Wine size={32} className="text-[#c9a962]" />
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-semibold text-white tracking-wide">Chateau</span>
              <span className="text-[10px] text-[#d4bc7e] tracking-[0.15em] uppercase">Est. 1887</span>
            </div>
          </button>

          {/* Desktop Navigation Links - hidden on mobile */}
          <ul className="hidden md:flex items-center gap-8">
            {['Home', 'Our Wines', 'The Estate', 'Heritage', 'News', 'Contact'].map((item, index) => {
              // Map the label to the correct section ID
              const idMap = {
                'Home': 'hero',
                'Our Wines': 'wines',
                'The Estate': 'estate',
                'Heritage': 'heritage',
                'News': 'news',
                'Contact': 'contact'
              };
              return (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(idMap[item])}
                    className="text-sm text-white/80 hover:text-[#c9a962] transition-colors relative group"
                  >
                    {item}
                    {/* Underline animation on hover */}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#c9a962] transition-all group-hover:w-full" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Book Tour Button - desktop only */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-6 py-3 bg-[#c9a962] text-[#2d0a1f] text-sm font-medium rounded hover:bg-[#d4bc7e] hover:-translate-y-0.5 transition-all"
          >
            Book a Tour
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#2d0a1f] px-6 pb-6"
            >
              <ul className="flex flex-col gap-6 pt-4">
                {['hero', 'wines', 'estate', 'heritage', 'news', 'contact'].map((id, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(id)}
                      className="font-serif text-2xl text-white hover:text-[#c9a962] transition-colors"
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/*
        HERO SECTION
      */}
      <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <div className="absolute inset-0 z-[-2]">
          <motion.img
            src="./images/winery-vineyards.jpg"
            alt="Chateau Belle Vue Vineyard"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a1f]/40 to-[#2d0a1f]/70 z-[-1]" />

        {/* Hero Content */}
        <div className="text-center text-white px-6 max-w-[900px]">
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.8 }}
            className="font-serif text-xl italic text-[#d4bc7e] mb-4"
          >
            A Legacy of Excellence
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-8"
          >
            Where Tradition<br />Meets Taste
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.8 }}
            onClick={() => scrollToSection('wines')}
            className="px-10 py-4 bg-[#c9a962] text-[#2d0a1f] font-medium rounded hover:bg-[#d4bc7e] hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Explore Our Wines
          </motion.button>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mt-16"
          >
            <div className="text-center">
              <span className="font-serif text-4xl font-semibold text-[#c9a962]">{yearsCount}+</span>
              <span className="block text-xs uppercase tracking-[0.1em] text-white/70 mt-1">Years of Heritage</span>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl font-semibold text-[#c9a962]">{hectaresCount}ha</span>
              <span className="block text-xs uppercase tracking-[0.1em] text-white/70 mt-1">Vineyard Estate</span>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl font-semibold text-[#c9a962]">{winesCount}</span>
              <span className="block text-xs uppercase tracking-[0.1em] text-white/70 mt-1">Award-Winning Wines</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative vertical text (hidden on mobile) */}
        <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-[0.3em] uppercase text-white/40 whitespace-nowrap">
          ESTATE WINERY
        </div>
      </section>

      {/*
        CONTACT SECTION
        
        CONCEPT
        Here we use uncontrolled inputs (no useState for each field).
        We just let the browser handle the form, then read values on submit.
        This is simpler for beginners. Advanced apps often use controlled inputs.
      */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader 
            scriptLabel="Get in Touch" 
            subtitle="PLAN YOUR VISIT" 
            title="Contact Us" 
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-[700px] mx-auto text-gray-500 mb-16 leading-relaxed"
          >
            We would love to welcome you to Chateau Belle Vue. Whether you are planning a visit, 
            interested in our wines, or simply want to learn more, we are here to help.
          </motion.p>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl font-semibold text-[#2d0a1f] mb-8">Visit Information</h3>
              <div className="flex flex-col gap-6">
                {[
                  { icon: MapPinIcon, label: 'Address', value: 'Route des Vins, 33330\nSaint-Emilion, France' },
                  { icon: Phone, label: 'Phone', value: '+33 5 57 55 55 55\nMon-Fri, 9am - 6pm CET' },
                  { icon: Mail, label: 'Email', value: 'contact@chateaubellevue.com\nWe reply within 24 hours' },
                  { icon: ClockIcon, label: 'Hours', value: 'Daily 9:00 AM - 6:00 PM\nTours by appointment' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <item.icon size={24} className="text-[#c9a962] flex-shrink-0 mt-1" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.1em] text-gray-400 mb-1">{item.label}</span>
                      <span className="text-sm text-[#2d0a1f] whitespace-pre-line leading-relaxed">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleContactSubmit}
              className="bg-[#f5f0e8] p-10 rounded-lg"
            >
              {/* Name and Email Row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
              </div>

              {/* Phone and Date Row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Preferred Visit Date</label>
                  <input 
                    type="date" 
                    name="date"
                    className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors"
                  />
                </div>
              </div>

              {/* Visitors Select */}
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Number of Visitors</label>
                <select 
                  name="visitors"
                  className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3-5">3-5</option>
                  <option value="6-10">6-10</option>
                  <option value="10+">10+</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-[#2d0a1f] mb-1.5">Message</label>
                <textarea 
                  name="message"
                  rows="4"
                  placeholder="Tell us about your visit preferences or any questions..."
                  className="w-full px-4 py-3 text-sm border border-black/10 rounded bg-white focus:outline-none focus:border-[#c9a962] transition-colors resize-y min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 bg-[#c9a962] text-[#2d0a1f] font-medium rounded hover:bg-[#d4bc7e] transition-colors"
              >
                Send Request
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                By submitting this form, you agree to our privacy policy. 
                We respect your data and will never share it with third parties.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/*
        FOOTER
      */}
      <footer className="bg-[#2d0a1f] text-white pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <h3 className="font-serif text-2xl font-semibold mb-1">Chateau Belle Vue</h3>
              <p className="text-xs text-[#d4bc7e] tracking-[0.1em] mb-4">Est. 1887</p>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                A family-owned vineyard estate crafting exceptional wines since 1887. 
                Experience the art of winemaking in the heart of Bordeaux.
              </p>
              {/* Social Icons */}
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#c9a962] transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-5">Explore</h4>
              <ul className="flex flex-col gap-3">
                {['Our Wines', 'The Estate', 'Heritage', 'News'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                      className="text-sm text-white/70 hover:text-[#c9a962] transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-5">Visit</h4>
              <ul className="flex flex-col gap-3">
                {['Book a Tour', 'Tasting Experiences', 'Events', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="text-sm text-white/70 hover:text-[#c9a962] transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-5">Subscribe to Our Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 rounded text-white placeholder:text-white/50 focus:outline-none focus:border-[#c9a962] transition-colors"
                />
                <button 
                  type="submit"
                  className="px-5 py-3 bg-[#c9a962] text-[#2d0a1f] text-sm font-medium rounded hover:bg-[#d4bc7e] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-white/60 mb-3">&copy; 2024 Chateau Belle Vue. All rights reserved.</p>
            <div className="flex justify-center gap-6 mb-4">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-xs text-white/50 hover:text-[#c9a962] transition-colors">{item}</a>
              ))}
            </div>
            <p className="text-[11px] text-white/40">
              Please drink responsibly. You must be of legal drinking age to visit our website.
            </p>
          </div>
        </div>
      </footer>

      {/*
        BACK TO TOP BUTTON
        
        This button appears when you scroll down 500px.
        Clicking it smoothly scrolls back to the top.

        AnimatePresence handles the enter/exit animation.
      */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#c9a962] rounded-full flex items-center justify-center z-[999] hover:bg-[#d4bc7e] hover:-translate-y-1 transition-all shadow-lg"
            aria-label="Back to top"
          >
            <ChevronUp size={20} className="text-[#2d0a1f]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export the App component so it can be used in main.jsx
export default App;

      {/*
        NEWS SECTION
      */}
      <section id="news" className="py-24 bg-[#f5f0e8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader 
            scriptLabel="Latest News" 
            subtitle="FROM THE ESTATE" 
            title="Stories & Updates" 
          />

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {newsData.map((article, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all group"
              >
                {/* Article Image */}
                <div className="relative h-[180px] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#c9a962] text-[#2d0a1f] text-[11px] font-medium uppercase tracking-wide rounded">
                    {article.category}
                  </span>
                </div>
                {/* Article Content */}
                <div className="p-5">
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <h3 className="font-serif text-lg font-semibold text-[#2d0a1f] mt-2 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{article.excerpt}</p>
                  <button className="text-sm font-medium text-[#c9a962] hover:text-[#6b1f3a] transition-colors">
                    Read More &rarr;
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-24">
            <SectionHeader 
              scriptLabel="Testimonials" 
              subtitle="VISITOR EXPERIENCES" 
              title="What Our Guests Say" 
            />
            <div className="grid md:grid-cols-3 gap-6">
              {testimonialsData.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg text-center"
                >
                  {/* Star Rating */}
                  <div className="text-[#c9a962] text-xl mb-4 tracking-widest">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 italic">{testimonial.text}</p>
                  <div>
                    <strong className="block font-serif text-base font-semibold text-[#2d0a1f]">{testimonial.name}</strong>
                    <span className="text-xs text-gray-400">{testimonial.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Story Text */}
            <div>
              <p className="font-serif text-lg italic text-[#c9a962] mb-2">Our Journey</p>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">THE BELLE VUE STORY</p>
              <h2 className="font-serif text-3xl font-semibold text-[#2d0a1f] mb-5">A Legacy of Passion</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                What started as a dream in 1887 has blossomed into one of France most celebrated 
                wine estates. Through six generations, the Dupont family has nurtured this land 
                with unwavering dedication.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mb-6">
                Today, Chateau Belle Vue stands as a testament to the power of tradition, 
                innovation, and an unrelenting pursuit of excellence.
              </p>

              {/* Story Stats */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <span className="block font-serif text-3xl font-semibold text-[#c9a962]">137</span>
                  <span className="text-xs uppercase tracking-[0.1em] text-gray-500">Years of Heritage</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-3xl font-semibold text-[#c9a962]">6</span>
                  <span className="text-xs uppercase tracking-[0.1em] text-gray-500">Generations</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-3xl font-semibold text-[#c9a962]">48</span>
                  <span className="text-xs uppercase tracking-[0.1em] text-gray-500">Wine Varieties</span>
                </div>
              </div>

              {/* Story Quote */}
              <div className="p-6 bg-[#2d0a1f] rounded-lg text-white">
                <p className="font-serif text-sm italic text-[#d4bc7e] mb-2">Vision</p>
                <blockquote className="font-serif text-lg italic mb-2 leading-relaxed">
                  "To create wines that capture the soul of our land and bring joy to tables around the world."
                </blockquote>
                <cite className="text-xs text-white/70">- The Dupont Family</cite>
              </div>
            </div>

            {/* Story Image */}
            <img 
              src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=500&fit=crop" 
              alt="Sunset over our estate vineyards"
              className="w-full h-[450px] object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </section>
