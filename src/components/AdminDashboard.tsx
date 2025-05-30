import { useState } from "react";
import { Book, Plus, User, LogOut, Eye } from "lucide-react";
import AddBookForm from "./AddBookForm";
import BookList from "./BookList";
import CustomerList from "./CustomerList";

interface User {
  id: string;
  username: string;
  role: 'admin' | 'customer' | 'public' | null;
  email?: string;
  phone?: string;
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'books' | 'add-book' | 'customers';

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('books');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Library Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'books'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              Manage Books
            </button>
            <button
              onClick={() => setActiveTab('add-book')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'add-book'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Book
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'customers'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              Customers
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'books' && <BookList isAdmin={true} />}
          {activeTab === 'add-book' && <AddBookForm />}
          {activeTab === 'customers' && <CustomerList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
