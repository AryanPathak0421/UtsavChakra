import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../contexts/AuthContext';

const Login = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to Account page after successful login
        navigate('/user/account');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
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
        {/* Visual Login Header */}
        <div className="relative h-32 overflow-hidden rounded-t-lg">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=128&fit=crop&q=80"
            alt="Welcome"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="text-white font-medium">Welcome</span>
          </div>
        </div>

        <Card.Content className="pt-6">
          {error && (
            <div 
              className="mb-4 p-3 rounded-lg text-sm"
              style={{ 
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              required
            />

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p style={{ color: theme.semantic.text.secondary }}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium hover:underline"
                style={{ 
                  color: theme.semantic.text.link,
                }}
                onMouseEnter={(e) => e.target.style.color = theme.semantic.text.linkHover}
                onMouseLeave={(e) => e.target.style.color = theme.semantic.text.link}
              >
                Sign up
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

export default Login;