
import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Book } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  borrowedBooks: number;
  status: 'active' | 'inactive';
}

// Global customers state
let globalCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@email.com",
    phone: "+1234567890",
    joinDate: "2024-01-15",
    borrowedBooks: 2,
    status: "active"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@email.com",
    phone: "+0987654321",
    joinDate: "2024-02-20",
    borrowedBooks: 1,
    status: "active"
  },
  {
    id: "3",
    name: "Mike Brown",
    email: "mike.brown@email.com",
    phone: "+1555666777",
    joinDate: "2024-03-10",
    borrowedBooks: 0,
    status: "inactive"
  }
];

// Function to add customer globally
export const addCustomerGlobally = (customer: any) => {
  const newCustomer: Customer = {
    id: customer.id || Date.now().toString(),
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    joinDate: new Date().toISOString().split('T')[0],
    borrowedBooks: 0,
    status: "active"
  };
  globalCustomers.push(newCustomer);
  console.log("Customer added globally:", newCustomer);
  console.log("Total customers:", globalCustomers.length);
};

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>(globalCustomers);

  // Listen for changes in global customers
  useEffect(() => {
    const interval = setInterval(() => {
      if (globalCustomers.length !== customers.length) {
        setCustomers([...globalCustomers]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [customers.length]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Management</h2>
        <p className="text-gray-600">Manage library members and their borrowing status ({customers.length} customers)</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Books Borrowed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Book className="w-4 h-4 mr-2 text-gray-400" />
                      {customer.borrowedBooks} book{customer.borrowedBooks !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
