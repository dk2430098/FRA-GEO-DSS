import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkflowStage from '../components/WorkflowStage';
import { Users, Clock, CheckCircle, AlertTriangle, Filter, Search } from 'lucide-react';

const Workflow: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState('FRA-2025-001234');

  const workflowStages = [
    {
      id: '1',
      name: 'Gram Sabha Review',
      status: 'completed' as const,
      assignee: 'Gram Sabha Secretary',
      dueDate: '2025-01-10',
      slaHours: 72,
      description: 'Initial review and verification by Gram Sabha'
    },
    {
      id: '2',
      name: 'SDLC Verification',
      status: 'completed' as const,
      assignee: 'SDLC Officer - Khandwa',
      dueDate: '2025-01-15',
      slaHours: 120,
      description: 'Sub-Divisional Level Committee verification'
    },
    {
      id: '3',
      name: 'Field Verification',
      status: 'active' as const,
      assignee: 'Field Officer - Rajesh Kumar',
      dueDate: '2025-01-20',
      slaHours: 168,
      description: 'Physical verification of claimed land and assets'
    },
    {
      id: '4',
      name: 'DLC Final Review',
      status: 'pending' as const,
      assignee: 'DLC Chairman',
      dueDate: '2025-01-25',
      slaHours: 96,
      description: 'District Level Committee final review and decision'
    },
    {
      id: '5',
      name: 'Title Generation',
      status: 'pending' as const,
      assignee: 'Revenue Department',
      dueDate: '2025-01-30',
      slaHours: 72,
      description: 'Generate and issue forest rights title'
    }
  ];

  const activeClaims = [
    { id: 'FRA-2025-001234', claimant: 'Ramesh Kumar', village: 'Khandwa Village', stage: 'Field Verification', priority: 'High' },
    { id: 'FRA-2025-001235', claimant: 'Sunita Devi', village: 'Bastar Village', stage: 'SDLC Verification', priority: 'Medium' },
    { id: 'FRA-2025-001236', claimant: 'Arjun Singh', village: 'Dantewada', stage: 'Gram Sabha Review', priority: 'Low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">Workflow Management</h1>
          <p className="text-slate-600">Track and manage FRA claim processing workflows with SLA monitoring</p>
        </div>

        {/* Workflow Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Workflows</p>
                <p className="text-2xl font-bold text-zinc-800 mt-1">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed Today</p>
                <p className="text-2xl font-bold text-zinc-800 mt-1">89</p>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overdue</p>
                <p className="text-2xl font-bold text-zinc-800 mt-1">23</p>
              </div>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-zinc-800 mt-1">12.5</p>
                <p className="text-xs text-slate-500">days</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Claims List */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-800">Active Claims</h3>
                <button className="flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filter</span>
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activeClaims.map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim.id)}
                  className={`p-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedClaim === claim.id ? 'bg-indigo-50 border-indigo-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-indigo-600">{claim.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(claim.priority)}`}>
                      {claim.priority}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-800 font-medium">{claim.claimant}</div>
                  <div className="text-sm text-slate-600">{claim.village}</div>
                  <div className="text-xs text-slate-500 mt-1">Current: {claim.stage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Stages */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-zinc-800 mb-2">
                Workflow Progress - {selectedClaim}
              </h3>
              <p className="text-slate-600">Track the current status and progress of the selected claim</p>
            </div>

            <div className="space-y-6">
              {workflowStages.map((stage, index) => (
                <WorkflowStage
                  key={stage.id}
                  stage={stage}
                  isLast={index === workflowStages.length - 1}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Update Status
                </button>
                <button className="flex-1 bg-slate-100 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors">
                  Add Comment
                </button>
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Workflow;