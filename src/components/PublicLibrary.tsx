
import { useState } from "react";
import { Book, LogOut, Search, Filter } from "lucide-react";
import BookList from "./BookList";
import BookRequestForm from "./BookRequestForm";

interface User {
  id: string;
  username: string;
  role: 'admin' | 'public' | null;
}

interface PublicLibraryProps {
  user: User;
  onLogout: () => void;
}

const PublicLibrary = ({ user, onLogout }: PublicLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const categories = [
    "Fiction", "Non-Fiction", "Science", "History", "Biography", 
    "Technology", "Philosophy", "Romance", "Mystery", "Fantasy"
  ];

  const handleBookRequest = (book: any) => {
    setSelectedBook(book);
    setShowRequestForm(true);
  };

  if (showRequestForm && selectedBook) {
    return (
      <BookRequestForm
        book={selectedBook}
        onBack={() => {
          setShowRequestForm(false);
          setSelectedBook(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              {user.role !== null && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Book List */}
        <BookList 
          isAdmin={false} 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onBookRequest={handleBookRequest}
        />
      </div>
    </div>
  );
};

export default PublicLibrary;
