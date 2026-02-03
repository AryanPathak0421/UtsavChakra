import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useTheme } from '../../../hooks/useTheme';

const Signup = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock signup - simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay
      
      // Mock validation - accept any valid inputs for demo
      if (formData.name && formData.email && formData.password) {
        // Mock successful signup
        console.log('Signup successful:', formData);
        
        // Store mock user data (in real app, this would come from API)
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          isAuthenticated: true
        }));
        
        // Redirect to user home
        navigate('/user/home');
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      // In a real app, you'd show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      <Card className="w-full max-w-md">
        {/* Visual Signup Header */}
        <div className="relative h-32 overflow-hidden rounded-t-lg">
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=128&fit=crop&q=80"
            alt="Join Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="text-white font-medium">Join</span>
          </div>
        </div>

        <Card.Content className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p style={{ color: theme.semantic.text.secondary }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium hover:underline"
                style={{ 
                  color: theme.semantic.text.link,
                }}
                onMouseEnter={(e) => e.target.style.color = theme.semantic.text.linkHover}
                onMouseLeave={(e) => e.target.style.color = theme.semantic.text.link}
              >
                Sign in
              </Link>
            </p>
            
            <Link 
              to="/user/home" 
              className="block text-sm hover:underline"
              style={{ 
                color: theme.semantic.text.tertiary,
              }}
              onMouseEnter={(e) => e.target.style.color = theme.semantic.text.secondary}
              onMouseLeave={(e) => e.target.style.color = theme.semantic.text.tertiary}
            >
              Continue as guest
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Signup;