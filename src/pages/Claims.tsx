import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClaimUpload from '../components/ClaimUpload';
import { Search, Filter, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';

const Claims: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [searchTerm, setSearchTerm] = useState('');

  const mockClaims = [
    {
      id: 'FRA-2025-001234',
      claimantName: 'Ramesh Kumar',
      village: 'Khandwa Village',
      district: 'Khandwa',
      state: 'Madhya Pradesh',
      claimType: 'IFR',
      status: 'Approved',
      submissionDate: '2025-01-15',
      coordinates: '22.7196° N, 76.3500° E'
    },
    {
      id: 'FRA-2025-001235',
      claimantName: 'Sunita Devi',
      village: 'Bastar Village',
      district: 'Bastar',
      state: 'Chhattisgarh',
      claimType: 'CFR',
      status: 'Pending',
      submissionDate: '2025-01-14',
      coordinates: '19.3156° N, 81.9661° E'
    },
    {
      id: 'FRA-2025-001236',
      claimantName: 'Arjun Singh',
      village: 'Dantewada',
      district: 'Dantewada',
      state: 'Chhattisgarh',
      claimType: 'CR',
      status: 'Under Review',
      submissionDate: '2025-01-13',
      coordinates: '18.8948° N, 81.3548° E'
    },
    {
      id: 'FRA-2025-001237',
      claimantName: 'Priya Sharma',
      village: 'Raipur Village',
      district: 'Raipur',
      state: 'Chhattisgarh',
      claimType: 'IFR',
      status: 'Approved',
      submissionDate: '2025-01-12',
      coordinates: '21.2787° N, 81.8661° E'
    },
    {
      id: 'FRA-2025-001238',
      claimantName: 'Vikram Singh',
      village: 'Ranchi Village',
      district: 'Ranchi',
      state: 'Jharkhand',
      claimType: 'CFR',
      status: 'Pending',
      submissionDate: '2025-01-11',
      coordinates: '23.3441° N, 85.3096° E'
    },
    {
      id: 'FRA-2025-001239',
      claimantName: 'Meera Patel',
      village: 'Bhopal Village',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      claimType: 'CR',
      status: 'Under Review',
      submissionDate: '2025-01-10',
      coordinates: '23.2599° N, 77.4126° E'
    },
    {
      id: 'FRA-2025-001240',
      claimantName: 'Rajesh Gupta',
      village: 'Indore Village',
      district: 'Indore',
      state: 'Madhya Pradesh',
      claimType: 'IFR',
      status: 'Approved',
      submissionDate: '2025-01-09',
      coordinates: '22.7196° N, 75.8577° E'
    },
    {
      id: 'FRA-2025-001241',
      claimantName: 'Anita Verma',
      village: 'Jabalpur Village',
      district: 'Jabalpur',
      state: 'Madhya Pradesh',
      claimType: 'CFR',
      status: 'Pending',
      submissionDate: '2025-01-08',
      coordinates: '23.1815° N, 79.9864° E'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredClaims = mockClaims.filter(claim =>
    claim.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">Claims Management</h1>
          <p className="text-slate-600">Upload, process, and manage FRA claims with AI-powered digitization</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Upload Claims
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'manage'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Manage Claims
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'upload' && <ClaimUpload />}
            
            {activeTab === 'manage' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search claims..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add Claim</span>
                    </button>
                  </div>
                </div>

                {/* Claims Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Claim ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Claimant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {filteredClaims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                            {claim.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-zinc-800">{claim.claimantName}</div>
                              <div className="text-sm text-slate-500">{claim.coordinates}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-zinc-800">{claim.village}</div>
                              <div className="text-sm text-slate-500">{claim.district}, {claim.state}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-full">
                              {claim.claimType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(claim.status)}`}>
                              {claim.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {claim.submissionDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-slate-600 hover:text-slate-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredClaims.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-slate-400 mb-2">No claims found</div>
                    <p className="text-sm text-slate-500">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Claims;