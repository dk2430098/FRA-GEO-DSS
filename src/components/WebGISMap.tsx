import React, { useState, useEffect, useMemo } from 'react';
import { Layers, Filter, Download, Maximize2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WebGISMap: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState({
    claims: true,
    villages: true,
    forests: false,
    assets: false,
  });

  const [selectedState, setSelectedState] = useState('madhya-pradesh');
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.9734, 78.6569]);

  const claimMarkers = useMemo(
    () => [
      { id: '1', position: [22.7196, 76.35], claimant: 'Ramesh Kumar', village: 'Khandwa Village', status: 'Approved' },
      { id: '2', position: [19.3156, 81.9661], claimant: 'Sunita Devi', village: 'Bastar Village', status: 'Pending' },
      { id: '3', position: [18.8948, 81.3548], claimant: 'Arjun Singh', village: 'Dantewada', status: 'Under Review' },
      { id: '4', position: [21.2787, 81.8661], claimant: 'Priya Sharma', village: 'Raipur Village', status: 'Approved' },
      { id: '5', position: [23.3441, 85.3096], claimant: 'Vikram Singh', village: 'Ranchi Village', status: 'Pending' },
    ],
    []
  );

  const villageBoundaries = useMemo(
    () => [
      {
        id: 'v1',
        name: 'Khandwa Village',
        coordinates: [
          [22.7, 76.3],
          [22.75, 76.3],
          [22.75, 76.4],
          [22.7, 76.4],
        ],
      },
      {
        id: 'v2',
        name: 'Bastar Village',
        coordinates: [
          [19.3, 81.9],
          [19.35, 81.9],
          [19.35, 82.0],
          [19.3, 82.0],
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const stateCenters: Record<string, [number, number]> = {
      'madhya-pradesh': [22.9734, 78.6569],
      'tripura': [23.9408, 91.9882],
      'odisha': [20.9517, 85.0985],
      'telangana': [18.1124, 79.0193],
    };
    setMapCenter(stateCenters[selectedState] || [22.9734, 78.6569]);
  }, [selectedState]);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Under Review':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* Map Controls */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="madhya-pradesh">Madhya Pradesh</option>
            <option value="tripura">Tripura</option>
            <option value="odisha">Odisha</option>
            <option value="telangana">Telangana</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            <Filter className="w-4 h-4" /> <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" /> <span className="text-sm">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors">
            <Maximize2 className="w-4 h-4" /> <span className="text-sm">Fullscreen</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Layer Panel */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Layers className="w-5 h-5 text-slate-600" />
            <h3 className="font-medium text-zinc-800">Map Layers</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(activeLayers).map(([layer, isActive]) => (
              <label key={layer} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => toggleLayer(layer as keyof typeof activeLayers)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700 capitalize">
                  {layer === 'claims' && 'FRA Claims'}
                  {layer === 'villages' && 'Village Boundaries'}
                  {layer === 'forests' && 'Forest Cover'}
                  {layer === 'assets' && 'Asset Mapping'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer center={mapCenter} zoom={7} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Claims */}
            {activeLayers.claims &&
              claimMarkers.map(marker => (
                <Marker key={marker.id} position={marker.position as [number, number]} icon={L.divIcon({ className: `bg-${getStatusColor(marker.status)}-500 w-4 h-4 rounded-full` })}>
                  
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-medium text-zinc-800">{marker.claimant}</h4>
                      <p className="text-sm text-slate-600">{marker.village}</p>
                      <p className="text-xs text-slate-500">Status: {marker.status}</p>
                      <p className="text-xs text-slate-500">Coordinates: {marker.position[0]}, {marker.position[1]}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Villages */}
            {activeLayers.villages &&
              villageBoundaries.map(boundary => (
                <Polygon
                  key={boundary.id}
                  positions={boundary.coordinates as [number, number][]}
                  pathOptions={{ color: '#4B5563', weight: 2, fillOpacity: 0.1 }}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-medium text-zinc-800">{boundary.name}</h4>
                    </div>
                  </Popup>
                </Polygon>
              ))}
          </MapContainer>

          {/* Info Panel */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-xs">
            <h4 className="font-medium text-zinc-800 mb-2">Selected Area Info</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Claims:</span>
                <span className="font-medium">{claimMarkers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Approved:</span>
                <span className="font-medium text-green-600">{claimMarkers.filter(c => c.status === 'Approved').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pending:</span>
                <span className="font-medium text-yellow-600">{claimMarkers.filter(c => c.status === 'Pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Under Review:</span>
                <span className="font-medium text-blue-600">{claimMarkers.filter(c => c.status === 'Under Review').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebGISMap;
