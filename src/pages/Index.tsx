
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import PublicLibrary from "../components/PublicLibrary";
import AdminDashboard from "../components/AdminDashboard";

type UserRole = 'admin' | 'public' | null;

interface User {
  id: string;
  username: string;
  role: UserRole;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication - in real app, this would connect to database
    if (username === "admin" && password === "admin123") {
      setCurrentUser({ id: "1", username: "Administrator", role: "admin" });
      setShowLogin(false);
    } else if (username === "user" && password === "user123") {
      setCurrentUser({ id: "2", username: username, role: "public" });
      setShowLogin(false);
    } else {
      alert("Invalid credentials. Try: admin/admin123 or user/user123");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(false);
  };

  if (showLogin) {
    return <LoginForm onLogin={handleLogin} onCancel={() => setShowLogin(false)} />;
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enter Library
              </button>
              
              <button
                onClick={() => setCurrentUser({ id: "guest", username: "Guest", role: "public" })}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                Browse as Guest
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
