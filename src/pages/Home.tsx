import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/StatsCard';
import { FileText, MapPin, Users, TrendingUp, CheckCircle, Clock, AlertTriangle, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Home: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const statsData = [
    { title: 'Total Claims', value: '12,847', change: '+5.2% from last month', changeType: 'positive' as const, icon: FileText, color: 'indigo' as const },
    { title: 'Claims Processed', value: '8,923', change: '+12.1% from last month', changeType: 'positive' as const, icon: CheckCircle, color: 'green' as const },
    { title: 'Active Workflows', value: '1,234', change: '23 overdue', changeType: 'negative' as const, icon: Clock, color: 'yellow' as const },
    { title: 'Villages Mapped', value: '2,456', change: '+8.7% from last month', changeType: 'positive' as const, icon: MapPin, color: 'blue' as const },
  ];

  const stateData = [
    { state: 'Madhya Pradesh', claims: 4200, processed: 3100 },
    { state: 'Tripura', claims: 2800, processed: 2200 },
    { state: 'Odisha', claims: 3500, processed: 2800 },
    { state: 'Telangana', claims: 2347, processed: 1823 },
  ];

  const claimTypeData = [
    { name: 'Individual Forest Rights (IFR)', value: 45, color: '#4F46E5' },
    { name: 'Community Forest Rights (CFR)', value: 30, color: '#3B82F6' },
    { name: 'Community Rights (CR)', value: 25, color: '#94A3B8' },
  ];

  const filteredStateData = selectedState === 'all' ? stateData : stateData.filter(item => item.state.toLowerCase().replace(' ', '-') === selectedState);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg text-white p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              FRA-GEO-DSS Governance Framework
            </h1>
            <p className="text-xl text-indigo-100 mb-6">
              AI-powered WebGIS dashboard for monitoring and managing Forest Rights Act (FRA) implementation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                Upload Claims
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition-colors">
                View WebGIS
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-zinc-800 mb-4">Dashboard Filters</h3>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All States</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="tripura">Tripura</option>
                <option value="odisha">Odisha</option>
                <option value="telangana">Telangana</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Districts</option>
                <option value="khandwa">Khandwa</option>
                <option value="bastar">Bastar</option>
                <option value="dantewada">Dantewada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* State-wise Claims Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">State-wise Claims Processing</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredStateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="claims" fill="#4F46E5" name="Total Claims" />
                <Bar dataKey="processed" fill="#3B82F6" name="Processed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Claim Types Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Claim Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={claimTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {claimTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {claimTypeData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Modules */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-zinc-800 mb-6">System Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-indigo-50 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-zinc-800 mb-2">AI Claim Digitization</h4>
              <p className="text-sm text-slate-600">OCR + NER for automated claim processing</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-zinc-800 mb-2">Workflow Management</h4>
              <p className="text-sm text-slate-600">Role-based access and SLA tracking</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-zinc-800 mb-2">Asset Mapping</h4>
              <p className="text-sm text-slate-600">Satellite imagery and computer vision</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-zinc-800 mb-2">Decision Support</h4>
              <p className="text-sm text-slate-600">AI-driven scheme recommendations</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-zinc-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-800">Claim #FRA-2025-001234 approved</p>
                <p className="text-xs text-slate-600">Khandwa Village, Madhya Pradesh • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-800">New claim uploaded for processing</p>
                <p className="text-xs text-slate-600">Bastar District, Chhattisgarh • 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-800">SLA deadline approaching for 15 claims</p>
                <p className="text-xs text-slate-600">Multiple districts • 6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;