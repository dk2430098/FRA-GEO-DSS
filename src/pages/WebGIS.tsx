import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebGISMap from '../components/WebGISMap';
import StatsCard from '../components/StatsCard';
import { MapPin, Layers, Satellite, TreePine } from 'lucide-react';

const WebGIS: React.FC = () => {
  const gisStats = [
    { title: 'Mapped Villages', value: '2,456', change: '+8.7% this month', changeType: 'positive' as const, icon: MapPin, color: 'blue' as const },
    { title: 'Active Layers', value: '12', change: '4 updated today', changeType: 'neutral' as const, icon: Layers, color: 'indigo' as const },
    { title: 'Satellite Images', value: '1,847', change: '+15.2% this month', changeType: 'positive' as const, icon: Satellite, color: 'green' as const },
    { title: 'Forest Cover', value: '68.4%', change: '-0.3% from last year', changeType: 'negative' as const, icon: TreePine, color: 'yellow' as const },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">WebGIS Interface</h1>
          <p className="text-slate-600">Interactive mapping and spatial analysis for FRA implementation monitoring</p>
        </div>

        {/* GIS Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {gisStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Map Interface */}
        <WebGISMap />

        {/* Additional Tools */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Spatial Analysis Tools</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Buffer Analysis</div>
                <div className="text-sm text-slate-600">Create buffer zones around claims</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Overlay Analysis</div>
                <div className="text-sm text-slate-600">Compare multiple data layers</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Proximity Analysis</div>
                <div className="text-sm text-slate-600">Find nearest features</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Data Export</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Export as Shapefile</div>
                <div className="text-sm text-slate-600">Download GIS data</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Generate Report</div>
                <div className="text-sm text-slate-600">Create PDF summary</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                <div className="font-medium text-zinc-800">Export to KML</div>
                <div className="text-sm text-slate-600">Google Earth format</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Recent Updates</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm font-medium text-blue-800">Satellite Data Updated</div>
                <div className="text-xs text-blue-600">Madhya Pradesh region - 2 hours ago</div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-sm font-medium text-green-800">New Claims Mapped</div>
                <div className="text-xs text-green-600">45 claims added to Tripura - 4 hours ago</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="text-sm font-medium text-yellow-800">Layer Maintenance</div>
                <div className="text-xs text-yellow-600">Forest cover layer updated - 1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebGIS;