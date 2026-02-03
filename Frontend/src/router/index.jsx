import { Routes, Route } from 'react-router-dom';
import Signup from '../modules/user/auth/Signup';
import UserHome from '../modules/user/home/UserHome';
import AuthHome from '../modules/user/home/AuthHome';
import RequirementsForm from '../modules/user/requirements/RequirementsForm';
import PlanningDetails from '../modules/user/requirements/PlanningDetails';
import VendorsMain from '../modules/user/vendors/VendorsMain';
import VendorsList from '../modules/user/vendors/VendorsList';
import Cart from '../modules/user/cart/Cart';
import Checkout from '../modules/user/cart/Checkout';
import Account from '../modules/user/account/Account';
import ChatsList from '../modules/user/chats/ChatsList';
import VendorChat from '../modules/user/chats/VendorChat';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import PlaceholderPage from '../components/common/PlaceholderPage';
import ThemeSystemTest from '../components/demo/ThemeSystemTest';

const AppRouter = () => {
  return (
    <div className="min-h-screen bg-theme-card">
      <Header />
      <main className="pb-16 md:pb-0">
        <Routes>
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/home" element={<AuthHome />} />
          
          {/* User Routes */}
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/requirements" element={<RequirementsForm />} />
          <Route path="/user/requirements/planning-details" element={<PlanningDetails />} />
          <Route path="/user/vendors" element={<VendorsMain />} />
          <Route path="/user/vendors/:category" element={<VendorsList />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/checkout" element={<Checkout />} />
          <Route path="/user/chats" element={<ChatsList />} />
          <Route path="/user/chats/:vendorId" element={<VendorChat />} />
          <Route path="/user/account" element={<Account />} />
          
          {/* Redirect /login to /user/account */}
          <Route path="/login" element={<Account />} />
          
          {/* Quick Access Routes */}
          <Route path="/user/bookings" element={
            <PlaceholderPage 
              title="My Bookings" 
              description="View and manage all your wedding service bookings in one place."
              icon="calendar"
            />
          } />
          <Route path="/user/shortlist" element={
            <PlaceholderPage 
              title="Shortlisted Vendors" 
              description="Keep track of your favorite vendors and compare their services."
              icon="bookmark"
            />
          } />
          <Route path="/user/favourites" element={
            <PlaceholderPage 
              title="Favourite Vendors" 
              description="Your most loved vendors for easy access and quick booking."
              icon="heart"
            />
          } />
          
          {/* Wedding Planning Tools */}
          <Route path="/user/budget-planner" element={
            <PlaceholderPage 
              title="Budget Planner" 
              description="Plan and track your wedding expenses with our smart budget management tool."
              icon="money"
            />
          } />
          <Route path="/user/checklist" element={
            <PlaceholderPage 
              title="Wedding Checklist" 
              description="Never miss a detail with our comprehensive wedding planning checklist."
              icon="checkList"
            />
          } />
          <Route path="/user/guest-list" element={
            <PlaceholderPage 
              title="Guest List Manager" 
              description="Organize your guest list, track RSVPs, and manage invitations effortlessly."
              icon="users"
            />
          } />
          <Route path="/user/timeline" element={
            <PlaceholderPage 
              title="Wedding Timeline" 
              description="Create and manage your wedding day timeline to ensure everything runs smoothly."
              icon="clock"
            />
          } />
          <Route path="/user/vendor-comparison" element={
            <PlaceholderPage 
              title="Vendor Comparison" 
              description="Compare vendors side by side to make the best choice for your wedding."
              icon="compare"
            />
          } />
          <Route path="/user/e-invites" element={
            <PlaceholderPage 
              title="Digital E-Invites" 
              description="Create beautiful digital wedding invitations and track responses."
              icon="mail"
            />
          } />
          <Route path="/user/inspirations" element={
            <PlaceholderPage 
              title="Saved Inspirations" 
              description="Collect and organize all your wedding inspiration ideas in one place."
              icon="heart"
            />
          } />
          
          {/* Premium Services */}
          <Route path="/user/hire-planner" element={
            <PlaceholderPage 
              title="Hire Wedding Planner" 
              description="Connect with professional wedding planners to make your dream wedding come true."
              icon="user"
            />
          } />
          <Route path="/user/destination-wedding" element={
            <PlaceholderPage 
              title="Destination Wedding" 
              description="Plan your perfect destination wedding with our specialized services."
              icon="location"
            />
          } />
          <Route path="/user/decor-consultation" element={
            <PlaceholderPage 
              title="Decor Consultation" 
              description="Get expert advice on wedding decorations and themes from our specialists."
              icon="palette"
            />
          } />
          <Route path="/user/makeup-trial" element={
            <PlaceholderPage 
              title="Makeup Trial Booking" 
              description="Book makeup trials with top artists to find your perfect bridal look."
              icon="makeup"
            />
          } />
          <Route path="/user/pre-wedding-shoot" element={
            <PlaceholderPage 
              title="Pre-Wedding Shoot" 
              description="Capture your love story with professional pre-wedding photography sessions."
              icon="camera"
            />
          } />
          
          {/* Support & Settings */}
          <Route path="/user/help" element={
            <PlaceholderPage 
              title="Help & Support" 
              description="Get assistance with any questions or issues you may have."
              icon="help"
            />
          } />
          <Route path="/user/faqs" element={
            <PlaceholderPage 
              title="Frequently Asked Questions" 
              description="Find answers to common questions about our wedding planning services."
              icon="question"
            />
          } />
          <Route path="/user/contact-support" element={
            <PlaceholderPage 
              title="Contact Support" 
              description="Reach out to our support team for personalized assistance."
              icon="phone"
            />
          } />
          <Route path="/user/notifications" element={
            <PlaceholderPage 
              title="Notification Settings" 
              description="Manage your notification preferences and stay updated on important events."
              icon="bell"
            />
          } />
          <Route path="/user/language" element={
            <PlaceholderPage 
              title="Language Settings" 
              description="Choose your preferred language for the best user experience."
              icon="globe"
            />
          } />
          <Route path="/user/privacy" element={
            <PlaceholderPage 
              title="Privacy & Terms" 
              description="Review our privacy policy and terms of service."
              icon="shield"
            />
          } />
          
          {/* Theme System Test Route */}
          <Route path="/theme-test" element={<ThemeSystemTest />} />
          
          {/* Default route redirects to user home */}
          <Route path="/" element={<UserHome />} />
          
          {/* Future routes for admin and vendor modules */}
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
          {/* <Route path="/vendor/*" element={<VendorRoutes />} /> */}
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
};

export default AppRouter;