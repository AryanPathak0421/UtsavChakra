import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useLenisContext } from '../../../providers/LenisProvider';
import Icon from '../../../components/ui/Icon';
import Card from '../../../components/ui/Card';

const VendorsMain = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Get global Lenis instance
  const lenis = useLenisContext();

  // Initialize scroll animations for vendor cards
  useEffect(() => {
    const initializeAnimations = async () => {
      if (!lenis) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      gsap.registerPlugin(ScrollTrigger);

      // Animate vendor category cards
      const vendorCards = document.querySelectorAll('.vendor-category-card');
      
      vendorCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 30,
          scale: 0.98
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: index * 0.05
            });
          }
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(initializeAnimations, 100);
  }, [lenis]);

  // Vendor categories with comprehensive Indian wedding details
  const vendorCategories = [
    {
      id: 'venues',
      title: 'Venues',
      subtitle: 'Banquet Halls, Marriage Gardens, Lawns, Resorts, Hotels',
      description: 'Find the perfect venue for your special day from luxury banquet halls to beautiful outdoor gardens',
      subcategories: ['Banquet Halls', 'Marriage Gardens', 'Farmhouses', 'Hotels & Resorts', 'Destination Venues', 'Community Halls'],
      priceRange: '₹50,000 - ₹10,00,000',
      avgBookings: '150+ venues',
      bgColor: '#fdf2f8', // Light pink
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=200&h=200&fit=crop&crop=center',
      features: ['AC Halls', 'Parking Space', 'Catering Kitchen', 'Bridal Room', 'Stage Setup']
    },
    {
      id: 'photographers',
      title: 'Photographers',
      subtitle: 'Wedding, Candid, Cinematic, Pre-Wedding, Traditional',
      description: 'Capture your precious moments with professional wedding photographers and videographers',
      subcategories: ['Wedding Photography', 'Candid Photography', 'Traditional Photography', 'Cinematic Videos', 'Pre-Wedding Shoots', 'Drone Photography'],
      priceRange: '₹25,000 - ₹2,00,000',
      avgBookings: '200+ photographers',
      bgColor: '#fff7ed', // Light orange
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200&h=200&fit=crop&crop=center',
      features: ['HD Videos', 'Same Day Edit', 'Photo Albums', 'Digital Gallery', 'Drone Shots']
    },
    {
      id: 'makeup',
      title: 'Makeup Artists',
      subtitle: 'Bridal Makeup, Hair Styling, Groom Makeup, Family Makeup',
      description: 'Professional makeup artists for bridal makeover, hair styling and complete beauty services',
      subcategories: ['Bridal Makeup', 'Hair Styling', 'Groom Makeup', 'Family Makeup', 'Mehendi Makeup', 'Reception Makeup'],
      priceRange: '₹8,000 - ₹75,000',
      avgBookings: '120+ artists',
      bgColor: '#fef3c7', // Light yellow
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
      features: ['HD Makeup', 'Hair Styling', 'Draping', 'Touch-ups', 'Trial Sessions']
    },
    {
      id: 'planning-decor',
      title: 'Planning & Decor',
      subtitle: 'Wedding Planners, Decorators, Theme Designers, Floral Arrangements',
      description: 'Complete wedding planning and decoration services to make your dream wedding come true',
      subcategories: ['Wedding Planners', 'Decorators', 'Floral Arrangements', 'Theme Designers', 'Stage Decoration', 'Mandap Decoration'],
      priceRange: '₹30,000 - ₹5,00,000',
      avgBookings: '80+ planners',
      bgColor: '#ecfdf5', // Light green
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=200&fit=crop&crop=center',
      features: ['Full Planning', 'Theme Design', 'Vendor Coordination', 'Timeline Management', 'Budget Planning']
    },
    {
      id: 'virtual-planning',
      title: 'Virtual Planning',
      subtitle: 'Online Consultation, Virtual Tours, Digital Planning Tools',
      description: 'Plan your wedding remotely with virtual consultations and digital planning services',
      subcategories: ['Online Consultation', 'Virtual Venue Tours', 'Digital Invitations', 'Live Streaming', 'Virtual Coordination'],
      priceRange: '₹5,000 - ₹50,000',
      avgBookings: '50+ services',
      bgColor: '#eff6ff', // Light blue
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=200&h=200&fit=crop&crop=center',
      features: ['Video Calls', 'Digital Tools', 'Online Booking', 'Virtual Reality', 'Live Support']
    },
    {
      id: 'mehndi',
      title: 'Mehndi Artists',
      subtitle: 'Bridal Mehndi, Arabic Designs, Traditional Patterns, Groom Mehndi',
      description: 'Beautiful mehndi designs for brides, family members and special occasions',
      subcategories: ['Bridal Mehndi', 'Arabic Mehndi', 'Traditional Mehndi', 'Groom Mehndi', 'Family Mehndi', 'Floral Designs'],
      priceRange: '₹2,000 - ₹25,000',
      avgBookings: '100+ artists',
      bgColor: '#f3e8ff', // Light purple
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&h=200&fit=crop&crop=center',
      features: ['Bridal Packages', 'Natural Henna', 'Quick Dry', 'Dark Color', 'Custom Designs']
    },
    {
      id: 'music-dance',
      title: 'Music & Dance',
      subtitle: 'DJs, Live Bands, Sangeet Choreographers, Sound Systems',
      description: 'Complete entertainment services including DJs, live music, dance choreography and sound systems',
      subcategories: ['Wedding DJs', 'Live Bands', 'Sangeet Choreography', 'Sound Systems', 'Lighting', 'Dhol Players'],
      priceRange: '₹10,000 - ₹1,50,000',
      avgBookings: '90+ services',
      bgColor: '#fef7f0', // Light peach
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
      features: ['Professional DJs', 'Live Music', 'Dance Training', 'Sound Equipment', 'Stage Lighting']
    },
    {
      id: 'invites-gifts',
      title: 'Invites & Gifts',
      subtitle: 'Wedding Invitations, Return Gifts, Trousseau Packing, Favors',
      description: 'Beautiful wedding invitations, return gifts and trousseau packing services',
      subcategories: ['Wedding Cards', 'Digital Invites', 'Return Gifts', 'Trousseau Packing', 'Wedding Favors', 'Gift Hampers'],
      priceRange: '₹5,000 - ₹1,00,000',
      avgBookings: '70+ services',
      bgColor: '#f0fdf4', // Light mint
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop&crop=center',
      features: ['Custom Design', 'Premium Paper', 'Digital Options', 'Bulk Orders', 'Fast Delivery']
    },
    {
      id: 'food',
      title: 'Food & Catering',
      subtitle: 'Wedding Catering, Live Counters, Cakes, Sweets, Beverages',
      description: 'Delicious food and catering services for all wedding functions and ceremonies',
      subcategories: ['Wedding Catering', 'Live Counters', 'Wedding Cakes', 'Sweets & Mithai', 'Beverages', 'Breakfast Catering'],
      priceRange: '₹200 - ₹2,000 per plate',
      avgBookings: '110+ caterers',
      bgColor: '#fefce8', // Light lime
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop&crop=center',
      features: ['Multi-Cuisine', 'Live Cooking', 'Custom Menus', 'Hygiene Standards', 'Service Staff']
    },
    {
      id: 'pre-wedding-shoot',
      title: 'Pre-Wedding Shoots',
      subtitle: 'Pre-Wedding Photography, Couple Shoots, Outdoor Locations',
      description: 'Romantic pre-wedding photography sessions at beautiful locations with professional photographers',
      subcategories: ['Outdoor Shoots', 'Studio Shoots', 'Destination Shoots', 'Themed Shoots', 'Couple Portraits', 'Engagement Shoots'],
      priceRange: '₹15,000 - ₹1,00,000',
      avgBookings: '60+ photographers',
      bgColor: '#fdf4ff', // Light magenta
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=200&h=200&fit=crop&crop=center',
      features: ['Beautiful Locations', 'Costume Changes', 'Props Included', 'Digital Gallery', 'Same Day Preview']
    },
    {
      id: 'bridal-wear',
      title: 'Bridal Wear',
      subtitle: 'Lehengas, Sarees, Designer Outfits, Bridal Accessories',
      description: 'Stunning bridal wear collection including lehengas, sarees and designer outfits for your special day',
      subcategories: ['Bridal Lehengas', 'Wedding Sarees', 'Designer Outfits', 'Reception Gowns', 'Mehendi Outfits', 'Bridal Accessories'],
      priceRange: '₹15,000 - ₹5,00,000',
      avgBookings: '85+ designers',
      bgColor: '#fff1f2', // Light rose
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop&crop=center',
      features: ['Custom Fitting', 'Designer Collection', 'Rental Options', 'Alteration Services', 'Matching Accessories']
    },
    {
      id: 'groom-wear',
      title: 'Groom Wear',
      subtitle: 'Sherwanis, Suits, Indo-Western, Traditional Wear, Accessories',
      description: 'Elegant groom wear collection including sherwanis, suits and traditional outfits',
      subcategories: ['Wedding Sherwanis', 'Designer Suits', 'Indo-Western', 'Traditional Kurtas', 'Reception Suits', 'Groom Accessories'],
      priceRange: '₹8,000 - ₹2,00,000',
      avgBookings: '65+ designers',
      bgColor: '#f8fafc', // Light gray
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=center',
      features: ['Perfect Fit', 'Premium Fabrics', 'Custom Tailoring', 'Rental Available', 'Complete Sets']
    },
    {
      id: 'jewellery',
      title: 'Jewellery & Accessories',
      subtitle: 'Bridal Jewelry, Gold Sets, Diamond Jewelry, Accessories',
      description: 'Exquisite bridal jewelry and accessories to complete your wedding look',
      subcategories: ['Bridal Sets', 'Gold Jewelry', 'Diamond Jewelry', 'Artificial Jewelry', 'Hair Accessories', 'Kalire & Chooda'],
      priceRange: '₹5,000 - ₹10,00,000',
      avgBookings: '40+ jewelers',
      bgColor: '#fffbeb', // Light amber
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop&crop=center',
      features: ['Certified Gold', 'Custom Design', 'Rental Options', 'Insurance', 'Matching Sets']
    },
    {
      id: 'pandits',
      title: 'Pandits & Priests',
      subtitle: 'Wedding Priests, Ceremony Conductors, Religious Rituals',
      description: 'Experienced pandits and priests for conducting traditional wedding ceremonies and rituals',
      subcategories: ['Wedding Pandits', 'Engagement Priests', 'Havan Specialists', 'Regional Priests', 'Multi-lingual Pandits', 'Ritual Consultants'],
      priceRange: '₹2,000 - ₹25,000',
      avgBookings: '30+ pandits',
      bgColor: '#fef3c7', // Light saffron
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
      features: ['Experienced Pandits', 'All Rituals', 'Regional Customs', 'Flexible Timing', 'Complete Guidance']
    },
    {
      id: 'transportation',
      title: 'Transportation',
      subtitle: 'Wedding Cars, Decorated Vehicles, Baraat Transportation',
      description: 'Luxury wedding transportation including decorated cars, vintage vehicles and baraat arrangements',
      subcategories: ['Luxury Cars', 'Vintage Cars', 'Decorated Vehicles', 'Baraat Transportation', 'Guest Transportation', 'Horse & Buggy'],
      priceRange: '₹5,000 - ₹50,000',
      avgBookings: '45+ services',
      bgColor: '#f0f9ff', // Light sky
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&crop=center',
      features: ['Luxury Fleet', 'Decoration Included', 'Professional Drivers', 'GPS Tracking', 'Insurance Covered']
    },
    {
      id: 'honeymoon',
      title: 'Honeymoon Packages',
      subtitle: 'Romantic Getaways, Destination Packages, Travel Planning',
      description: 'Perfect honeymoon packages and romantic destinations for newlyweds',
      subcategories: ['Domestic Packages', 'International Tours', 'Beach Destinations', 'Hill Stations', 'Adventure Tours', 'Luxury Resorts'],
      priceRange: '₹25,000 - ₹3,00,000',
      avgBookings: '25+ packages',
      bgColor: '#fef7f0', // Light coral
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop&crop=center',
      features: ['All-Inclusive', 'Romantic Settings', 'Custom Itinerary', 'Couple Activities', 'Luxury Stays']
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/user/vendors/${category.id}`, { 
      state: { 
        category: category.id,
        categoryTitle: category.title 
      } 
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Vendor Categories List - Full Screen */}
      <div className="pt-safe-area-top px-4 pb-24 space-y-4">
        {vendorCategories.map((category) => (
          <Card
            key={category.id}
            className="vendor-category-card relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex items-center p-5 pr-24">
              <div className="flex-1">
                <h3 
                  className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-all"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {category.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {category.subtitle}
                </p>
                <div className="flex items-center">
                  <Icon 
                    name="chevronDown" 
                    size="sm" 
                    className="rotate-[-90deg] group-hover:translate-x-1 transition-transform"
                    style={{ color: theme.semantic.text.secondary }} 
                  />
                  <span 
                    className="text-xs ml-2 font-medium"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    Browse
                  </span>
                </div>
              </div>
            </div>
            
            {/* Category Image */}
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full hidden items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary[100] }}
                >
                  <Icon name="sparkles" size="lg" style={{ color: theme.colors.primary[500] }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorsMain;