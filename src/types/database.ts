
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  description: string;
  cover_image: string | null;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  join_date: string;
  borrowed_books: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface BookRequest {
  id: string;
  book_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  purpose: string | null;
  return_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'returned';
  request_date: string;
  created_at: string;
  updated_at: string;
}
