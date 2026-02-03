import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useLenisContext } from '../../../providers/LenisProvider';
import useScrollAnimations from '../../../hooks/useScrollAnimations';
import Icon from '../../../components/ui/Icon';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import SmartSlider from '../../../components/ui/SmartSlider';
import FeedbackSection from '../../../components/ui/FeedbackSection';
import { smartSliderCategories } from '../../../data/smartSliderData';

const UserHome = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedCity] = useState('Indore');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get global Lenis instance
  const lenis = useLenisContext();

  // Initialize scroll animations
  const { refreshAnimations } = useScrollAnimations();

  // Wedding categories with circular images
  const weddingCategories = [
    {
      id: 'venues',
      name: 'Wedding Venues',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/venues'
    },
    {
      id: 'photographers',
      name: 'Wedding Photographers',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/photographers'
    },
    {
      id: 'makeup',
      name: 'Bridal Makeup Artists',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/makeup-artists'
    },
    {
      id: 'decorators',
      name: 'Wedding Decorators',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/decorators'
    }
  ];

  // Fix Issue 1: Proper loading state - only run once on mount
  useEffect(() => {
    const initializePage = async () => {
      // Simulate data loading (replace with actual API calls)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      // Refresh animations after content loads
      setTimeout(() => {
        refreshAnimations();
      }, 100);
    };

    initializePage();
  }, [refreshAnimations]); // Include refreshAnimations in dependency array

  // Fix Issue 1: Optimize scroll handler with proper cleanup - Use Lenis scroll events
  useEffect(() => {
    if (!lenis) return;

    let lastScrollY = 0;
    
    const handleScroll = (e) => {
      const currentScrollY = e.scroll;
      
      // Show sticky header when scrolling down past 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowStickyHeader(true);
      }
      // Hide sticky header when scrolling up or at the top
      else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setShowStickyHeader(false);
      }
      
      lastScrollY = currentScrollY;
    };

    lenis.on('scroll', handleScroll);
    
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]); // Depend on lenis instance

  const handleCategoryClick = (category) => {
    navigate(category.route);
  };

  const handleSliderItemClick = (item, index) => {
    console.log('Clicked item:', item, 'at index:', index);
    // Navigate to vendor details or category page
    // You can implement navigation logic here
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* SECTION 1 - TOP HEADER */}
      <div 
        className="sticky top-16 z-30 px-4 py-3 border-b"
        style={{ 
          backgroundColor: theme.semantic.background.primary,
          borderBottomColor: theme.semantic.border.light,
        }}
      >
        <div className="flex justify-between items-center">
          {/* Left - City Selector */}
          <div className="flex items-center space-x-2">
            <span style={{ color: theme.semantic.text.primary }} className="font-medium">
              {selectedCity}
            </span>
            <Icon name="chevronDown" size="sm" style={{ color: theme.semantic.text.secondary }} />
          </div>

          {/* Right - Action Icons */}
          <div className="flex items-center space-x-4">
            <Icon name="search" size="md" style={{ color: theme.semantic.text.secondary }} />
            <Icon name="chat" size="md" style={{ color: theme.semantic.text.secondary }} />
            <Icon name="account" size="md" style={{ color: theme.semantic.text.secondary }} />
          </div>
        </div>
      </div>

      {/* VISUAL WEDDING CATEGORIES SECTION */}
      <div className="px-4 py-6 scroll-animate-section">
        <div className="categories-container flex justify-between items-center space-x-4">
          {weddingCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="category-item flex-1 cursor-pointer text-center transition-all duration-200 hover:scale-105"
              style={{ maxWidth: '90px' }}
            >
              {/* Circular Image */}
              <div 
                className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden shadow-lg"
                style={{
                  boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40`
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop&q=80';
                  }}
                />
              </div>
              
              {/* Category Name */}
              <p 
                className="text-xs font-medium line-clamp-2 leading-tight"
                style={{ color: theme.semantic.text.primary }}
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SMART SLIDER SECTIONS - NO AUTO-SLIDE, MANUAL NAVIGATION ONLY */}
      <div className="space-y-2 overflow-x-hidden">
        {/* Trending Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.trending.title}
            items={smartSliderCategories.trending.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Budget Friendly Picks */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.budget.title}
            items={smartSliderCategories.budget.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Luxury Wedding Specialists */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.luxury.title}
            items={smartSliderCategories.luxury.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Top Rated Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.topRated.title}
            items={smartSliderCategories.topRated.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Value for Money Deals */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.valueForMoney.title}
            items={smartSliderCategories.valueForMoney.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Most Booked This Month */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.mostBooked.title}
            items={smartSliderCategories.mostBooked.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Newly Added Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.newVendors.title}
            items={smartSliderCategories.newVendors.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Best for Pre-Wedding Shoots */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.preWeddingShoot.title}
            items={smartSliderCategories.preWeddingShoot.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Best for Sangeet & Entertainment */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.sangeetEntertainment.title}
            items={smartSliderCategories.sangeetEntertainment.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Bridal Favorites */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.bridalFavorites.title}
            items={smartSliderCategories.bridalFavorites.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Editor's Choice */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.editorsChoice.title}
            items={smartSliderCategories.editorsChoice.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Near Your Location */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.nearLocation.title}
            items={smartSliderCategories.nearLocation.items}
            onItemClick={handleSliderItemClick}
          />
        </div>
      </div>

      {/* FEEDBACK SECTION - Appears at the bottom */}
      <FeedbackSection />

      {/* SECTION 5 - FLOATING ACTION BUTTON */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6">
        <button 
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          style={{ 
            backgroundColor: theme.colors.primary[500],
            boxShadow: `0 4px 12px ${theme.colors.primary[500]}40`,
          }}
        >
          <Icon name="genie" size="lg" style={{ color: 'white' }} />
        </button>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
};

export default UserHome;