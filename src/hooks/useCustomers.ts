
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/database';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData: any) => {
    try {
      // Exclude confirmPassword field and only send fields that exist in the database
      const { confirmPassword, ...dataToSend } = customerData;
      
      const { data, error } = await supabase
        .from('customers')
        .insert([dataToSend])
        .select()
        .single();

      if (error) throw error;
      setCustomers(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add customer' };
    }
  };

  const authenticateCustomer = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;
      return { success: true, customer: data };
    } catch (err) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, error, addCustomer, authenticateCustomer, refetch: fetchCustomers };
};
