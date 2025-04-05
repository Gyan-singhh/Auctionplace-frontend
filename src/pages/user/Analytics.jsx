import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDollarSign, FiPackage, FiAward, FiLoader } from 'react-icons/fi';
const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
  const [stats, setStats] = useState({
    balance: 0,
    productsCreated: 0,
    itemsWon: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/users/stats`, {
          withCredentials: true,
        });
        setStats({
          balance: response.data.data.balance,
          productsCreated: response.data.data.productsCreated,
          itemsWon: response.data.data.itemsWon,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <FiLoader className="animate-spin text-4xl text-emerald-700" />
        </div>
      );
    }

  return (
    <div className="grid grid-cols-1 mt-7 md:grid-cols-3 gap-4">
      <StatCard
        icon={<FiDollarSign />}
        title="Balance"
        value={`$${(stats.balance || 0).toFixed(2)}`}
      />
      <StatCard 
        icon={<FiPackage />}
        title="Products Created"
        value={stats.productsCreated}
      />
      <StatCard 
        icon={<FiAward />}
        title="Items Won"
        value={stats.itemsWon}
      />
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 h-40 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 mr-4 rounded-full bg-emerald-100 text-emerald-600 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

export default Analytics;