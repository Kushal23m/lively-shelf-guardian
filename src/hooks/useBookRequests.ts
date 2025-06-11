
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BookRequest } from '@/types/database';

export const useBookRequests = () => {
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch book requests');
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: Omit<BookRequest, 'id' | 'created_at' | 'updated_at' | 'request_date' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('book_requests')
        .insert([requestData])
        .select()
        .single();

      if (error) throw error;
      setRequests(prev => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to create request' };
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, loading, error, createRequest, refetch: fetchRequests };
};
