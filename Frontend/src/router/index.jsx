import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Welcome from '../components/welcome/Welcome';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Signup from '../modules/user/auth/Signup';
import Login from '../modules/user/auth/Login';
import UserHome from '../modules/user/home/UserHome';
import AuthHome from '../modules/user/home/AuthHome';
import RequirementsForm from '../modules/user/requirements/RequirementsForm';
import PlanningDetails from '../modules/user/requirements/PlanningDetails';
import VendorsMain from '../modules/user/vendors/VendorsMain';
import VendorsList from '../modules/user/vendors/VendorsList';
import VendorDetail from '../modules/user/vendors/VendorDetail';
import Cart from '../modules/user/cart/Cart';
import Checkout from '../modules/user/cart/Checkout';
import Account from '../modules/user/account/Account';
import ChatsList from '../modules/user/chats/ChatsList';
import VendorChat from '../modules/user/chats/VendorChat';
import Search from '../modules/user/search/Search';
import News from '../modules/user/news/News';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import PlaceholderPage from '../components/common/PlaceholderPage';
import ThemeSystemTest from '../components/demo/ThemeSystemTest';

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-theme-card">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes - No Header/BottomNav */}
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/user/home" replace /> : <Welcome />
      } />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/user/home" replace /> : <Login />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/user/home" replace /> : <Signup />
      } />

      {/* Protected Routes - With Header/BottomNav */}
      <Route path="/user/*" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-theme-card">
            <Header />
            <main className="pb-16 md:pb-0">
              <Routes>
                <Route path="home" element={<UserHome />} />
                <Route path="search" element={<Search />} />
                <Route path="news" element={<News />} />
                <Route path="requirements" element={<RequirementsForm />} />
                <Route path="requirements/planning-details" element={<PlanningDetails />} />
                <Route path="vendors" element={<VendorsMain />} />
                <Route path="vendors/:category" element={<VendorsList />} />
                <Route path="vendor/:vendorId" element={<VendorDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="chats" element={<ChatsList />} />
                <Route path="chats/:vendorId" element={<VendorChat />} />
                <Route path="account" element={<Account />} />
                
                {/* Quick Access Routes */}
                <Route path="bookings" element={
                  <PlaceholderPage 
                    title="My Bookings" 
                    description="View and manage all your wedding service bookings in one place."
                    icon="calendar"
                  />
                } />
                <Route path="shortlist" element={
                  <PlaceholderPage 
                    title="Shortlisted Vendors" 
                    description="Keep track of your favorite vendors and compare their services."
                    icon="bookmark"
                  />
                } />
                <Route path="favourites" element={
                  <PlaceholderPage 
                    title="Favourite Vendors" 
                    description="Your most loved vendors for easy access and quick booking."
                    icon="heart"
                  />
                } />
                
                {/* Wedding Planning Tools */}
                <Route path="budget-planner" element={
                  <PlaceholderPage 
                    title="Budget Planner" 
                    description="Plan and track your wedding expenses with our smart budget management tool."
                    icon="money"
                  />
                } />
                <Route path="checklist" element={
                  <PlaceholderPage 
                    title="Wedding Checklist" 
                    description="Never miss a detail with our comprehensive wedding planning checklist."
                    icon="checkList"
                  />
                } />
                <Route path="guest-list" element={
                  <PlaceholderPage 
                    title="Guest List Manager" 
                    description="Organize your guest list, track RSVPs, and manage invitations effortlessly."
                    icon="users"
                  />
                } />
                <Route path="timeline" element={
                  <PlaceholderPage 
                    title="Wedding Timeline" 
                    description="Create and manage your wedding day timeline to ensure everything runs smoothly."
                    icon="clock"
                  />
                } />
                <Route path="vendor-comparison" element={
                  <PlaceholderPage 
                    title="Vendor Comparison" 
                    description="Compare vendors side by side to make the best choice for your wedding."
                    icon="compare"
                  />
                } />
                <Route path="e-invites" element={
                  <PlaceholderPage 
                    title="Digital E-Invites" 
                    description="Create beautiful digital wedding invitations and track responses."
                    icon="mail"
                  />
                } />
                <Route path="inspirations" element={
                  <PlaceholderPage 
                    title="Saved Inspirations" 
                    description="Collect and organize all your wedding inspiration ideas in one place."
                    icon="heart"
                  />
                } />
                
                {/* Premium Services */}
                <Route path="hire-planner" element={
                  <PlaceholderPage 
                    title="Hire Wedding Planner" 
                    description="Connect with professional wedding planners to make your dream wedding come true."
                    icon="user"
                  />
                } />
                <Route path="destination-wedding" element={
                  <PlaceholderPage 
                    title="Destination Wedding" 
                    description="Plan your perfect destination wedding with our specialized services."
                    icon="location"
                  />
                } />
                <Route path="decor-consultation" element={
                  <PlaceholderPage 
                    title="Decor Consultation" 
                    description="Get expert advice on wedding decorations and themes from our specialists."
                    icon="palette"
                  />
                } />
                <Route path="makeup-trial" element={
                  <PlaceholderPage 
                    title="Makeup Trial Booking" 
                    description="Book makeup trials with top artists to find your perfect bridal look."
                    icon="makeup"
                  />
                } />
                <Route path="pre-wedding-shoot" element={
                  <PlaceholderPage 
                    title="Pre-Wedding Shoot" 
                    description="Capture your love story with professional pre-wedding photography sessions."
                    icon="camera"
                  />
                } />
                
                {/* Support & Settings */}
                <Route path="help" element={
                  <PlaceholderPage 
                    title="Help & Support" 
                    description="Get assistance with any questions or issues you may have."
                    icon="help"
                  />
                } />
                <Route path="faqs" element={
                  <PlaceholderPage 
                    title="Frequently Asked Questions" 
                    description="Find answers to common questions about our wedding planning services."
                    icon="question"
                  />
                } />
                <Route path="contact-support" element={
                  <PlaceholderPage 
                    title="Contact Support" 
                    description="Reach out to our support team for personalized assistance."
                    icon="phone"
                  />
                } />
                <Route path="notifications" element={
                  <PlaceholderPage 
                    title="Notification Settings" 
                    description="Manage your notification preferences and stay updated on important events."
                    icon="bell"
                  />
                } />
                <Route path="language" element={
                  <PlaceholderPage 
                    title="Language Settings" 
                    description="Choose your preferred language for the best user experience."
                    icon="globe"
                  />
                } />
                <Route path="privacy" element={
                  <PlaceholderPage 
                    title="Privacy & Terms" 
                    description="Review our privacy policy and terms of service."
                    icon="shield"
                  />
                } />
                
                {/* Redirect unknown user routes to home */}
                <Route path="*" element={<Navigate to="/user/home" replace />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </ProtectedRoute>
      } />

      {/* Auth Routes - Legacy support */}
      <Route path="/auth/home" element={
        <ProtectedRoute>
          <Navigate to="/user/home" replace />
        </ProtectedRoute>
      } />
      
      {/* Theme System Test Route */}
      <Route path="/theme-test" element={<ThemeSystemTest />} />
      
      {/* Catch all - redirect to welcome or user home based on auth */}
      <Route path="*" element={
        <Navigate to={isAuthenticated ? "/user/home" : "/"} replace />
      } />
    </Routes>
  );
};

export default AppRouter;