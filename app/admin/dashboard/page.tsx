// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfitReport } from '@/types';
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('');

  const adminActions = [
    {
      title: 'Customer Records',
      description: 'View all customer records',
      action: () => setActiveTab('customers'),
    },
    {
      title: 'Transaction Search',
      description: 'Search transactions by phone number',
      action: () => setActiveTab('transactions'),
    },
    {
      title: 'Registered Users',
      description: 'View all registered Google users',
      action: () => setActiveTab('users'),
    },
    {
      title: 'Daily Records & Profit',
      description: 'Calculate daily sales and profit',
      action: () => setActiveTab('profit'),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      {!activeTab ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={action.action}>Open</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button onClick={() => setActiveTab('')} className="mb-4">
            Back to Dashboard
          </Button>
          
          {activeTab === 'customers' && <CustomerRecords />}
          {activeTab === 'transactions' && <TransactionSearch />}
          {activeTab === 'users' && <RegisteredUsers />}
          {activeTab === 'profit' && <DailyProfit />}
        </div>
      )}
    </div>
  );
}

// Placeholder components for each admin feature
function CustomerRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);

  const searchCustomers = async () => {
    // Implement API call to search customers
    console.log('Searching customers:', searchTerm);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Records</CardTitle>
        <CardDescription>Search for customer records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by phone, name, or CNIC"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <Button onClick={searchCustomers}>Search</Button>
        </div>
        {/* Display search results here */}
      </CardContent>
    </Card>
  );
}

function TransactionSearch() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactions, setTransactions] = useState([]);

  const searchTransactions = async () => {
    // Implement API call to search transactions
    console.log('Searching transactions for:', phoneNumber);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Search</CardTitle>
        <CardDescription>Search transactions by phone number</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <Button onClick={searchTransactions}>Search</Button>
        </div>
        {/* Display transaction results here */}
      </CardContent>
    </Card>
  );
}

function RegisteredUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    // Implement API call to get registered users
    console.log('Fetching registered users');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>All users registered via Google</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchUsers} className="mb-4">
          Load Users
        </Button>
        {/* Display users list here */}
      </CardContent>
    </Card>
  );
}

function DailyProfit() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
//   const [report, setReport] = useState(null);
const [report, setReport] = useState<ProfitReport | null>(null);

  const generateReport = async () => {
    // Implement API call to generate profit report
    console.log('Generating report from', startDate, 'to', endDate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Profit Calculation</CardTitle>
        <CardDescription>Calculate daily sales and profit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <Button onClick={generateReport}>Generate Report</Button>
        
        {report && (
          <div className="mt-6 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">Profit Report</h3>
            <p>Total Sending Amount: ${report.totalSending}</p>
            <p>Total Receiving Amount: ${report.totalReceiving}</p>
            <p>Daily Profit: ${report.profit}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}