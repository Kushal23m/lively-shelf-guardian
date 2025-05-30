
import { useState } from "react";
import { User, Mail, Phone, ArrowLeft, Send } from "lucide-react";

interface BookRequestFormProps {
  book: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  onBack: () => void;
}

const BookRequestForm = ({ book, onBack }: BookRequestFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    purpose: "",
    returnDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to database
    console.log("Book request:", { book, customer: formData });
    alert("Book request submitted successfully! We'll contact you soon.");
    onBack();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Request Book</h1>
          
          {/* Book Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm text-blue-600">You are requesting to borrow this book</p>
              </div>
            </div>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Return Date *
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your complete address"
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Reading
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select purpose (optional)</option>
                <option value="academic">Academic Research</option>
                <option value="personal">Personal Interest</option>
                <option value="professional">Professional Development</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Important Notes:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Books must be returned in good condition</li>
                <li>• Late returns may incur a fee</li>
                <li>• Maximum borrowing period is 30 days</li>
                <li>• You will be contacted within 24 hours to confirm availability</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRequestForm;
