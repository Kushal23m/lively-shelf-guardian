
import { useState } from "react";
import { Book, Calendar, User, BookOpen, Trash2, Loader2 } from "lucide-react";
import { useBooks } from "@/hooks/useBooks";
import { Book as BookType } from "@/types/database";

interface BookListProps {
  isAdmin: boolean;
  searchTerm?: string;
  selectedCategory?: string;
  onBookRequest?: (book: BookType) => void;
}

const BookList = ({ isAdmin, searchTerm = "", selectedCategory = "", onBookRequest }: BookListProps) => {
  const { books, loading, error, deleteBook } = useBooks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteBook = async (bookId: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setDeletingId(bookId);
      const result = await deleteBook(bookId);
      if (!result.success) {
        alert(result.error);
      }
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Error loading books: {error}</p>
      </div>
    );
  }

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
                src={book.cover_image || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'}
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
                    disabled={deletingId === book.id}
                    className="flex items-center gap-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm disabled:opacity-50"
                  >
                    {deletingId === book.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
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
