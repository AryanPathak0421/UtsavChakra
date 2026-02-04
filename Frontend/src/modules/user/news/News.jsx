import { useState, useMemo } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Card from '../../../components/ui/Card';
import { newsData, newsCategories, getNewsByCategory, getCategoryColor } from '../../../data/news';

const News = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState(null);

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    return getNewsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const CategoryButton = ({ category, isActive, onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
      style={{
        backgroundColor: isActive ? category.color : 'transparent',
        color: isActive ? 'white' : theme.semantic.text.secondary,
        border: `1px solid ${isActive ? category.color : theme.semantic.border.accent}`,
      }}
    >
      {category.name}
    </button>
  );

  const NewsCard = ({ news }) => (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => handleNewsClick(news)}
    >
      <div className="relative">
        {/* News Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop&crop=center';
            }}
          />
        </div>
        
        {/* Category Badge */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-full"
          style={{ backgroundColor: getCategoryColor(news.category) }}
        >
          <span className="text-xs font-medium text-white">
            {news.categoryName}
          </span>
        </div>
      </div>

      {/* News Content */}
      <div className="p-4">
        <h3 
          className="font-semibold text-base mb-2 line-clamp-2 leading-tight"
          style={{ color: theme.semantic.text.primary }}
        >
          {news.title}
        </h3>
        
        <p 
          className="text-sm mb-3 line-clamp-2 leading-relaxed"
          style={{ color: theme.semantic.text.secondary }}
        >
          {news.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span style={{ color: theme.semantic.text.tertiary }}>
              {news.timeAgo}
            </span>
            <span style={{ color: theme.semantic.text.tertiary }}>
              •
            </span>
            <span style={{ color: theme.semantic.text.tertiary }}>
              {news.readTime}
            </span>
          </div>
          <Icon name="chevronRight" size="xs" style={{ color: theme.semantic.text.tertiary }} />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header */}
      <div className="sticky top-16 z-20 px-4 py-4 border-b" style={{ 
        backgroundColor: theme.semantic.background.primary,
        borderBottomColor: theme.semantic.border.light 
      }}>
        <div className="flex items-center space-x-3 mb-4">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary[100] }}
          >
            <Icon name="envelope" size="sm" style={{ color: theme.colors.primary[600] }} />
          </div>
          <h1 
            className="text-xl font-bold"
            style={{ color: theme.semantic.text.primary }}
          >
            News & Updates
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {newsCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Icon name="envelope" size="xl" style={{ color: theme.semantic.text.tertiary }} className="mx-auto mb-4" />
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: theme.semantic.text.primary }}
            >
              No news found
            </h3>
            <p 
              className="text-sm"
              style={{ color: theme.semantic.text.secondary }}
            >
              Check back later for updates in this category.
            </p>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div 
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b" style={{ 
              backgroundColor: theme.semantic.background.primary,
              borderBottomColor: theme.semantic.border.light 
            }}>
              <div 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: getCategoryColor(selectedNews.category) }}
              >
                <span className="text-xs font-medium text-white">
                  {selectedNews.categoryName}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-full transition-colors"
                style={{ color: theme.semantic.text.secondary }}
              >
                <Icon name="close" size="sm" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* News Image */}
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* News Title */}
              <h2 
                className="text-xl font-bold mb-3 leading-tight"
                style={{ color: theme.semantic.text.primary }}
              >
                {selectedNews.title}
              </h2>

              {/* Meta Info */}
              <div className="flex items-center space-x-4 mb-4 text-sm">
                <span style={{ color: theme.semantic.text.tertiary }}>
                  {selectedNews.timeAgo}
                </span>
                <span style={{ color: theme.semantic.text.tertiary }}>•</span>
                <span style={{ color: theme.semantic.text.tertiary }}>
                  {selectedNews.readTime}
                </span>
              </div>

              {/* News Description */}
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ color: theme.semantic.text.secondary }}
              >
                {selectedNews.description}
              </p>

              {/* Placeholder for full content */}
              <div className="space-y-4">
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  This is where the full news article content would appear. The detailed information, 
                  images, and comprehensive coverage of the topic would be displayed here.
                </p>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  Additional paragraphs, quotes, and media content would follow to provide 
                  complete coverage of the news story.
                </p>
              </div>

              {/* Bottom spacing */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;