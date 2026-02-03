import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Icon from '../ui/Icon';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartState } = useCart();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  // Safely access cart items from cartState
  const cartItems = cartState?.items || [];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Get vendors from cart for chat functionality
  const cartVendors = cartItems.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    lastMessage: "Hi! I'm interested in your services for my wedding.",
    timestamp: "2 hours ago",
    unread: Math.random() > 0.5 // Random for demo
  }));

  const menuSections = [
    {
      id: 'planning',
      title: 'Wedding Planning Tools',
      icon: 'calendar',
      items: [
        { title: 'Budget Planner', path: '/user/budget-planner', icon: 'money' },
        { title: 'Wedding Checklist', path: '/user/checklist', icon: 'checkList' },
        { title: 'Guest List Manager', path: '/user/guest-list', icon: 'users' },
        { title: 'Wedding Timeline', path: '/user/timeline', icon: 'clock' },
        { title: 'Vendor Comparison', path: '/user/vendor-comparison', icon: 'compare' },
        { title: 'Digital E-Invites', path: '/user/e-invites', icon: 'mail' },
        { title: 'Saved Inspirations', path: '/user/inspirations', icon: 'heart' }
      ]
    },
    {
      id: 'addons',
      title: 'Premium Services',
      icon: 'star',
      items: [
        { title: 'Hire Wedding Planner', path: '/user/hire-planner', icon: 'user' },
        { title: 'Destination Wedding', path: '/user/destination-wedding', icon: 'location' },
        { title: 'Decor Consultation', path: '/user/decor-consultation', icon: 'palette' },
        { title: 'Makeup Trial Booking', path: '/user/makeup-trial', icon: 'makeup' },
        { title: 'Pre-Wedding Shoot', path: '/user/pre-wedding-shoot', icon: 'camera' }
      ]
    },
    {
      id: 'support',
      title: 'Support & Settings',
      icon: 'settings',
      items: [
        { title: 'Help & Support', path: '/user/help', icon: 'help' },
        { title: 'FAQs', path: '/user/faqs', icon: 'question' },
        { title: 'Contact Support', path: '/user/contact-support', icon: 'phone' },
        { title: 'Notifications', path: '/user/notifications', icon: 'bell' },
        { title: 'Language', path: '/user/language', icon: 'globe' },
        { title: 'Privacy & Terms', path: '/user/privacy', icon: 'shield' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Full Screen Menu Panel */}
      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out hamburger-menu-panel ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
        style={{
          backgroundColor: theme.semantic.background.primary,
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0
        }}
        onClick={(e) => {
          // Close menu if clicking on the background (not on content)
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 z-10 px-6 py-4 border-b safe-area-top"
          style={{
            backgroundColor: theme.semantic.background.primary,
            borderBottomColor: theme.semantic.border.light
          }}
        >
          <div className="flex items-center justify-between">
            <h2 
              className="text-lg font-bold"
              style={{ color: theme.semantic.text.primary }}
            >
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{
                color: theme.semantic.text.secondary,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.semantic.background.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <Icon name="close" size="md" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6 safe-area-pb hamburger-menu-content">
          {/* Section 1: User Info */}
          {isAuthenticated && (
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: theme.semantic.background.accent }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&face=center&q=80';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="font-semibold text-sm"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {user.name}
                  </h3>
                  <p 
                    className="text-xs"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {user.city || 'Indore'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation('/user/account')}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.primary[500],
                  color: 'white'
                }}
              >
                View Profile
              </button>
            </div>
          )}

          {/* Section 2: Chats */}
          <div>
            <div 
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
              style={{ backgroundColor: theme.semantic.background.accent }}
              onClick={() => handleNavigation('/user/chats')}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary[100] }}
                >
                  <Icon name="chat" size="sm" style={{ color: theme.colors.primary[600] }} />
                </div>
                <div>
                  <h3 
                    className="font-medium text-sm"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    My Chats
                  </h3>
                  <p 
                    className="text-xs"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {cartVendors.length} vendor conversations
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {cartVendors.filter(v => v.unread).length > 0 && (
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.accent[500] }}
                  >
                    <span className="text-xs font-bold text-white">
                      {cartVendors.filter(v => v.unread).length}
                    </span>
                  </div>
                )}
                <Icon name="chevronDown" size="sm" className="-rotate-90" style={{ color: theme.semantic.text.tertiary }} />
              </div>
            </div>
          </div>

          {/* Section 3: Quick Access */}
          <div>
            <h3 
              className="text-sm font-semibold mb-3"
              style={{ color: theme.semantic.text.primary }}
            >
              Quick Access
            </h3>
            <div className="space-y-2">
              {[
                { title: 'My Cart', path: '/user/cart', icon: 'cart', count: cartItems.length },
                { title: 'My Bookings', path: '/user/bookings', icon: 'calendar' },
                { title: 'Shortlisted Vendors', path: '/user/shortlist', icon: 'bookmark' },
                { title: 'Favourite Vendors', path: '/user/favourites', icon: 'heart' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.semantic.background.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item.icon} size="sm" style={{ color: theme.semantic.text.secondary }} />
                    <span 
                      className="text-sm"
                      style={{ color: theme.semantic.text.primary }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.count > 0 && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: theme.colors.primary[100],
                          color: theme.colors.primary[600]
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                    <Icon name="chevronDown" size="xs" className="-rotate-90" style={{ color: theme.semantic.text.tertiary }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Sections */}
          {menuSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left"
                style={{ backgroundColor: theme.semantic.background.accent }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={section.icon} size="sm" style={{ color: theme.colors.primary[600] }} />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {section.title}
                  </span>
                </div>
                <Icon 
                  name="chevronDown" 
                  size="sm" 
                  className={`transition-transform ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                  style={{ color: theme.semantic.text.tertiary }} 
                />
              </button>
              
              {expandedSections[section.id] && (
                <div className="mt-2 ml-4 space-y-1">
                  {section.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg transition-colors text-left"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.semantic.background.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon name={item.icon} size="xs" style={{ color: theme.semantic.text.secondary }} />
                      <span 
                        className="text-sm"
                        style={{ color: theme.semantic.text.primary }}
                      >
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Logout */}
          {isAuthenticated && (
            <div className="pt-4 border-t" style={{ borderTopColor: theme.semantic.border.light }}>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.accent[50];
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <Icon name="logout" size="sm" style={{ color: theme.colors.accent[500] }} />
                <span 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.accent[500] }}
                >
                  Logout
                </span>
              </button>
            </div>
          )}
          {/* Bottom spacing to avoid bottom navbar */}
          <div className="h-20 md:h-8"></div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;