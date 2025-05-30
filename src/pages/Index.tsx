import { useState } from "react";
import LoginForm from "../components/LoginForm";
import AdminLoginForm from "../components/AdminLoginForm";
import CustomerRegistrationForm from "../components/CustomerRegistrationForm";
import PublicLibrary from "../components/PublicLibrary";
import AdminDashboard from "../components/AdminDashboard";

type UserRole = 'admin' | 'customer' | 'public' | null;

interface User {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
  phone?: string;
}

type ViewState = 'home' | 'admin-login' | 'customer-login' | 'customer-register';

// Mock customer database
const mockCustomers = [
  { id: "1", username: "john_doe", password: "password123", email: "john@email.com", phone: "+1234567890", name: "John Doe" },
  { id: "2", username: "jane_smith", password: "password456", email: "jane@email.com", phone: "+0987654321", name: "Jane Smith" }
];

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleAdminLogin = (username: string, password: string) => {
    if (username === "kushal" && password === "kush@23") {
      setCurrentUser({ id: "admin", username: "Kushal", role: "admin" });
      setCurrentView('home');
    } else {
      alert("Invalid admin credentials.");
    }
  };

  const handleCustomerLogin = (username: string, password: string) => {
    const customer = mockCustomers.find(c => c.username === username && c.password === password);
    if (customer) {
      setCurrentUser({ 
        id: customer.id, 
        username: customer.name, 
        role: "customer",
        email: customer.email,
        phone: customer.phone
      });
      setCurrentView('home');
    } else {
      alert("Invalid customer credentials. Try: john_doe/password123 or jane_smith/password456");
    }
  };

  const handleCustomerRegistration = (customerData: any) => {
    // In a real app, this would save to database
    const newCustomer = {
      ...customerData,
      id: Date.now().toString()
    };
    mockCustomers.push(newCustomer);
    setCurrentUser({
      id: newCustomer.id,
      username: newCustomer.name,
      role: "customer",
      email: newCustomer.email,
      phone: newCustomer.phone
    });
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  if (currentView === 'admin-login') {
    return <AdminLoginForm onLogin={handleAdminLogin} onCancel={() => setCurrentView('home')} />;
  }

  if (currentView === 'customer-login') {
    return <LoginForm onLogin={handleCustomerLogin} onCancel={() => setCurrentView('home')} onRegister={() => setCurrentView('customer-register')} />;
  }

  if (currentView === 'customer-register') {
    return <CustomerRegistrationForm onRegister={handleCustomerRegistration} onCancel={() => setCurrentView('home')} onLogin={() => setCurrentView('customer-login')} />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
                Digital Library
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover thousands of books, manage your collection, and explore the world of knowledge
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => setCurrentView('admin-login')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Admin Login
              </button>
              
              <button
                onClick={() => setCurrentView('customer-login')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Customer Login
              </button>
              
              <button
                onClick={() => setCurrentUser({ id: "guest", username: "Guest", role: "public" })}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                Browse as Guest
              </button>
            </div>

            <div className="mb-8">
              <button
                onClick={() => setCurrentView('customer-register')}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                New Customer? Register Here
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-2">10,000+ Books</h3>
                <p className="text-blue-100 text-sm">Extensive collection across all genres</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-2">Digital Access</h3>
                <p className="text-blue-100 text-sm">Read anywhere, anytime</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-2">Easy Management</h3>
                <p className="text-blue-100 text-sm">Streamlined library operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role === 'admin' ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <PublicLibrary user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
