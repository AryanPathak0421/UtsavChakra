import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../contexts/CartContext';
import Icon from './Icon';

const SmartSlider = ({ 
  title, 
  items, 
  onItemClick, 
  className = '' 
}) => {
  const { theme } = useTheme();
  const { addToCart, isInCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(new Set());

  // Calculate how many cards to show based on screen size
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 2; // Mobile: MINIMUM 2 cards per row
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      return 3; // Desktop: 3 cards
    }
    return 2;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  // Handle window resize - Debounced to prevent excessive re-renders
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newVisibleCards = getVisibleCards();
        setVisibleCards(prevVisible => {
          // Only update if actually changed
          return prevVisible !== newVisibleCards ? newVisibleCards : prevVisible;
        });
      }, 150); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - runs only once

  // Manual navigation functions - NO AUTO-SLIDE, NO FLICKERING
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleCards;
      return newIndex < 0 ? Math.max(0, items.length - visibleCards) : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + visibleCards;
      return newIndex >= items.length ? 0 : newIndex;
    });
  };

  const handleItemClick = (item, index) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  const handleAddToCart = async (e, item) => {
    e.stopPropagation(); // Prevent item click
    
    if (isInCart(item.id)) {
      return; // Already in cart
    }

    setAddingToCart(prev => new Set([...prev, item.id]));
    
    // Add small delay for visual feedback
    setTimeout(() => {
      addToCart(item);
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 500);
  };

  const handleWhatsAppContact = (e, item) => {
    e.stopPropagation(); // Prevent item click
    
    const message = encodeURIComponent(
      `Hi! I found your ${item.category.toLowerCase()} service "${item.name}" on UtsavChakra and I'm interested in learning more about it for my wedding. Could you please share more details?`
    );
    const whatsappNumber = item.whatsappNumber || '+919876543210';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get visible items for current page
  const getVisibleItems = () => {
    return items.slice(currentIndex, currentIndex + visibleCards);
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + visibleCards < items.length;
  const visibleItems = getVisibleItems();

  return (
    <div className={`py-6 ${className}`}>
      {/* Section Title with Arrow Navigation */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 
          className="text-xl font-bold"
          style={{ color: theme.semantic.text.primary }}
        >
          {title}
        </h2>
        
        {/* Arrow Navigation Buttons - Always Visible */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 touch-friendly slider-arrow-button"
            style={{
              backgroundColor: canGoPrevious 
                ? theme.colors.primary[100] 
                : theme.semantic.background.accent,
              color: canGoPrevious 
                ? theme.colors.primary[600] 
                : theme.semantic.text.tertiary,
              opacity: canGoPrevious ? 1 : 0.5,
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 touch-friendly slider-arrow-button"
            style={{
              backgroundColor: canGoNext 
                ? theme.colors.primary[100] 
                : theme.semantic.background.accent,
              color: canGoNext 
                ? theme.colors.primary[600] 
                : theme.semantic.text.tertiary,
              opacity: canGoNext ? 1 : 0.5,
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            <Icon name="chevronDown" size="sm" className="-rotate-90" />
          </button>
        </div>
      </div>

      {/* Cards Container - NO HORIZONTAL SCROLL */}
      <div className="px-4 overflow-x-hidden">
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: visibleCards === 2 
              ? 'repeat(2, 1fr)' 
              : 'repeat(3, 1fr)'
          }}
        >
          {visibleItems.map((item, index) => (
            <VendorCard
              key={`${item.id}-${currentIndex}-${index}`}
              item={item}
              index={currentIndex + index}
              theme={theme}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCart}
              onWhatsAppContact={handleWhatsAppContact}
              addingToCart={addingToCart}
              isInCart={isInCart}
            />
          ))}
        </div>
        
        {/* Page Indicator */}
        {items.length > visibleCards && (
          <div className="flex justify-center mt-4">
            <span 
              className="text-xs px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: theme.colors.primary[100],
                color: theme.colors.primary[600]
              }}
            >
              {Math.floor(currentIndex / visibleCards) + 1} of {Math.ceil(items.length / visibleCards)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// VendorCard component - FIXED BUTTON ALIGNMENT
const VendorCard = ({ 
  item, 
  index, 
  theme, 
  onItemClick, 
  onAddToCart, 
  onWhatsAppContact, 
  addingToCart, 
  isInCart 
}) => {
  return (
    <div
      className="cursor-pointer mobile-static-card"
      onClick={() => onItemClick(item, index)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg vendor-card-fixed-height"
        style={{
          backgroundColor: theme.semantic.card.background,
          boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40`,
          height: '300px', // Fixed height for consistency
          overflow: 'visible' // Ensure buttons are not cut
        }}
      >
        {/* 1. Image - Fixed Height (128px) */}
        <div className="h-32 overflow-hidden relative flex-shrink-0 rounded-t-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80';
            }}
          />
          {/* Tag */}
          {item.tag && (
            <div 
              className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: item.tag === 'Trending' ? '#ef4444' :
                               item.tag === 'Best Seller' ? '#f59e0b' :
                               item.tag === 'Budget Pick' ? '#10b981' :
                               item.tag === 'Luxury' ? '#8b5cf6' :
                               theme.colors.primary[500],
                color: 'white'
              }}
            >
              {item.tag}
            </div>
          )}
          {/* Rating Badge */}
          <div 
            className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }}
          >
            <Icon name="star" size="xs" style={{ color: '#fbbf24' }} />
            {item.rating}
          </div>
        </div>

        {/* 2. Content Area - Flexible Height (fills remaining space) */}
        <div className="vendor-card-content">
          {/* Vendor Details - Flexible */}
          <div className="vendor-card-details">
            <h3 
              className="font-bold text-sm mb-1 line-clamp-1"
              style={{ color: theme.semantic.text.primary }}
            >
              {item.name}
            </h3>
            <p 
              className="text-xs mb-2 line-clamp-1"
              style={{ color: theme.semantic.text.secondary }}
            >
              {item.category}
            </p>
            <p 
              className="text-xs mb-1 flex items-center line-clamp-1"
              style={{ color: theme.semantic.text.secondary }}
            >
              <Icon name="location" size="xs" className="mr-1 flex-shrink-0" />
              {item.location}
            </p>
          </div>

          {/* 3. Price - Fixed Position Above Buttons */}
          <div 
            className="font-bold text-sm"
            style={{ 
              color: theme.colors.primary[600],
              marginBottom: '12px', // Fixed margin
              marginTop: 'auto' // Push to bottom of details area
            }}
          >
            {item.price}
          </div>

          {/* 4. Action Buttons - Fixed at Bottom */}
          <div className="vendor-card-buttons">
            {/* Add to Cart Button */}
            <button
              onClick={(e) => onAddToCart(e, item)}
              disabled={addingToCart.has(item.id)}
              className={`vendor-card-button flex-1 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center ${
                isInCart(item.id) 
                  ? 'opacity-60' 
                  : addingToCart.has(item.id) 
                    ? 'opacity-80' 
                    : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: isInCart(item.id) 
                  ? theme.colors.accent[500] 
                  : theme.colors.primary[500],
                color: 'white'
              }}
            >
              {addingToCart.has(item.id) ? (
                <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
              ) : isInCart(item.id) ? (
                <>
                  <Icon name="check" size="xs" className="mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Icon name="cart" size="xs" className="mr-1" />
                  Add
                </>
              )}
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={(e) => onWhatsAppContact(e, item)}
              className="vendor-card-whatsapp-button rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#25D366',
                color: 'white'
              }}
            >
              <Icon name="whatsapp" size="xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSlider;