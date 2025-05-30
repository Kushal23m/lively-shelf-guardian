
import { useState } from "react";
import { Book, Calendar, User, BookOpen, Trash2 } from "lucide-react";

interface BookData {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  description: string;
  coverImage: string;
  available: boolean;
}

interface BookListProps {
  isAdmin: boolean;
  searchTerm?: string;
  selectedCategory?: string;
  onBookRequest?: (book: BookData) => void;
}

const BookList = ({ isAdmin, searchTerm = "", selectedCategory = "", onBookRequest }: BookListProps) => {
  const [books, setBooks] = useState<BookData[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      category: "Fiction",
      description: "A classic American novel about the Jazz Age and the American Dream.",
      coverImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=400&fit=crop",
      available: true
    },
    {
      id: "2",
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      year: 1988,
      category: "Science",
      description: "A landmark volume in science writing exploring the nature of time and the universe.",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      available: true
    },
    {
      id: "3",
      title: "Steve Jobs",
      author: "Walter Isaacson",
      year: 2011,
      category: "Biography",
      description: "The exclusive biography of Steve Jobs, based on extensive interviews.",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      available: false
    },
    {
      id: "4",
      title: "Clean Code",
      author: "Robert C. Martin",
      year: 2008,
      category: "Technology",
      description: "A handbook of agile software craftsmanship for better programming practices.",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop",
      available: true
    },
    {
      id: "5",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      category: "Fantasy",
      description: "A timeless classic about Bilbo Baggins and his unexpected adventure.",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      available: true
    },
    {
      id: "6",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      year: 2011,
      category: "History",
      description: "A brief history of humankind and how we came to dominate Earth.",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      available: true
    }
  ]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isAdmin ? "Library Collection" : "Available Books"}
        </h2>
        <p className="text-gray-600">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                book.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.available ? 'Available' : 'Borrowed'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{book.title}</h3>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <User className="w-4 h-4 mr-1" />
                <span>{book.author}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{book.year}</span>
              </div>
              
              <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                {book.category}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {book.description}
              </p>
              
              <div className="flex gap-2">
                {isAdmin ? (
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="flex items-center gap-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => onBookRequest?.(book)}
                    disabled={!book.available}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      book.available
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    {book.available ? 'Request Book' : 'Not Available'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
