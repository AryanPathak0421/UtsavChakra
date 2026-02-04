import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useLenisContext } from '../../../providers/LenisProvider';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/Icon';
import VendorCard from './VendorCardFixed';
import { vendors } from '../../../data/vendors';
import { useTheme } from '../../../hooks/useTheme';

const VendorsList = () => {
  const location = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Get global Lenis instance
  const lenis = useLenisContext();
  
  const categoryTitle = location.state?.categoryTitle || category || 'Vendors';
  const [sortBy, setSortBy] = useState('rating');

  // Initialize scroll animations for vendor cards
  useEffect(() => {
    const initializeAnimations = async () => {
      if (!lenis) return;

      // Temporarily disable animations to test click functionality
      console.log('Animations disabled for testing');
      return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      gsap.registerPlugin(ScrollTrigger);

      // Animate vendor cards
      const vendorCards = document.querySelectorAll('.vendor-list-card');
      
      vendorCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 20,
          scale: 0.98
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power1.out',
              delay: index * 0.03
            });
          }
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(initializeAnimations, 100);
  }, [lenis, sortBy]); // Re-run when sort changes

  const filteredVendors = vendors.filter(vendor => 
    category === 'all' || vendor.category === category
  );

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.semantic.background.primary }}
    >
      {/* Responsive Top Bar */}
      <div 
        className="pt-safe-area-top px-3 sm:px-4 py-2 sm:py-3 border-b"
        style={{ 
          backgroundColor: theme.semantic.background.primary,
          borderBottomColor: theme.semantic.border.light,
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/user/vendors')}
            className="flex items-center space-x-2 text-sm font-medium py-1 px-2 rounded-lg hover:bg-opacity-10 hover:bg-black transition-colors"
            style={{ color: theme.semantic.text.secondary }}
          >
            <Icon name="chevronLeft" size="sm" />
            <span className="hidden xs:inline">Back</span>
          </button>
          
          <h1 
            className="text-base sm:text-lg font-bold text-center flex-1 mx-4"
            style={{ color: theme.semantic.text.primary }}
          >
            {categoryTitle}
          </h1>
          
          <div className="w-12 sm:w-16"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="px-3 sm:px-4 py-3 max-w-7xl mx-auto">
        {/* Responsive Filter Bar */}
        <div 
          className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0 mb-4 p-3 sm:p-4 rounded-lg"
          style={{
            backgroundColor: theme.semantic.card.background,
            borderColor: theme.semantic.card.border,
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <div className="flex items-center justify-between xs:justify-start">
            <span 
              className="text-sm font-medium"
              style={{ color: theme.semantic.text.primary }}
            >
              {sortedVendors.length} vendor{sortedVendors.length !== 1 ? 's' : ''} found
            </span>
            <span 
              className="text-xs xs:hidden ml-2"
              style={{ color: theme.semantic.text.secondary }}
            >
              in {categoryTitle}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-medium hidden xs:inline"
              style={{ color: theme.semantic.text.secondary }}
            >
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm bg-transparent min-w-0 flex-1 xs:flex-none xs:w-auto"
              style={{
                color: theme.semantic.text.primary,
                borderColor: theme.semantic.border.primary,
                '--tw-ring-color': theme.colors.primary[500]
              }}
            >
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Responsive Vendors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-24">
          {sortedVendors.map((vendor) => {
            console.log('Rendering vendor:', vendor.id, vendor.name, vendor.category);
            return (
              <div key={vendor.id} className="vendor-list-card">
                <VendorCard vendor={vendor} layout="responsive" />
              </div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {sortedVendors.length === 0 && (
          <div 
            className="text-center py-12 sm:py-16 mb-24 rounded-lg mx-auto max-w-md"
            style={{
              backgroundColor: theme.semantic.card.background,
              borderColor: theme.semantic.card.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="mb-6 flex justify-center">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary[50] }}
              >
                <Icon name="noResults" size="2xl" color="muted" />
              </div>
            </div>
            <h3 
              className="text-lg sm:text-xl font-semibold mb-2"
              style={{ color: theme.semantic.text.primary }}
            >
              No vendors found
            </h3>
            <p 
              className="text-sm sm:text-base mb-6 px-4"
              style={{ color: theme.semantic.text.secondary }}
            >
              We couldn't find any {categoryTitle.toLowerCase()} in your area. Try browsing other categories.
            </p>
            <Button 
              onClick={() => navigate('/user/vendors')}
              variant="primary"
              className="px-6 py-2"
            >
              Browse All Categories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsList;