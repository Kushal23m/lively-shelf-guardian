
-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  borrowed_books INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book requests table
CREATE TABLE public.book_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  purpose TEXT,
  return_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'returned')),
  request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_books_category ON public.books(category);
CREATE INDEX idx_books_available ON public.books(available);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_username ON public.customers(username);
CREATE INDEX idx_book_requests_book_id ON public.book_requests(book_id);
CREATE INDEX idx_book_requests_status ON public.book_requests(status);

-- Insert sample books data
INSERT INTO public.books (title, author, year, category, description, cover_image, available) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Fiction', 'A classic American novel about the Jazz Age and the American Dream.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=400&fit=crop', true),
('A Brief History of Time', 'Stephen Hawking', 1988, 'Science', 'A landmark volume in science writing exploring the nature of time and the universe.', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop', true),
('Steve Jobs', 'Walter Isaacson', 2011, 'Biography', 'The exclusive biography of Steve Jobs, based on extensive interviews.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', false),
('Clean Code', 'Robert C. Martin', 2008, 'Technology', 'A handbook of agile software craftsmanship for better programming practices.', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop', true),
('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'A timeless classic about Bilbo Baggins and his unexpected adventure.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', true),
('Sapiens', 'Yuval Noah Harari', 2011, 'History', 'A brief history of humankind and how we came to dominate Earth.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', true);

-- Insert sample customers data
INSERT INTO public.customers (name, email, phone, username, password) VALUES
('John Doe', 'john@email.com', '+1234567890', 'john_doe', 'password123'),
('Jane Smith', 'jane@email.com', '+0987654321', 'jane_smith', 'password456'),
('Mike Brown', 'mike.brown@email.com', '+1555666777', 'mike_brown', 'password789');
