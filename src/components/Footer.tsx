import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">FRA-GEO-DSS</h3>
                <p className="text-slate-400 text-sm">Governance Framework</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              AI-powered WebGIS and Decision Support System for monitoring and implementing 
              the Forest Rights Act across Indian states.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/claims" className="hover:text-white transition-colors">Claims Management</a></li>
              <li><a href="/webgis" className="hover:text-white transition-colors">WebGIS</a></li>
              <li><a href="/workflow" className="hover:text-white transition-colors">Workflow</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@fra-geo-dss.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-11-2345-6789</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 FRA-GEO-DSS Governance Framework. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm mt-2 sm:mt-0 font-semibold">
          Developed by TEAM MIRAI
        </p>



        </div>
      </div>
    </footer>
  );
};

export default Footer;