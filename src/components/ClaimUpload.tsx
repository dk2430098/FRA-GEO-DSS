import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader, Eye, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { createWorker } from 'tesseract.js';

interface UploadedClaim {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'error';
  extractedData?: {
    claimantName: string;
    village: string;
    claimType: string;
    coordinates: string;
  };
  previewUrl?: string;
}

const ClaimUpload: React.FC = () => {
  const [uploadedClaims, setUploadedClaims] = useState<UploadedClaim[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [editingClaim, setEditingClaim] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    claimantName: '',
    village: '',
    claimType: '',
    coordinates: ''
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(async (file) => {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        const newClaim: UploadedClaim = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          filename: file.name,
          status: 'processing',
          previewUrl: URL.createObjectURL(file)
        };

        setUploadedClaims(prev => [...prev, newClaim]);

        try {
          // OCR Processing
          const worker = await createWorker('eng');
          const { data: { text } } = await worker.recognize(file);
          await worker.terminate();

          // Parse extracted text (simple regex-based parsing for demo)
          const claimantMatch = text.match(/claimant[:\s]*([^\n\r]+)/i);
          const villageMatch = text.match(/village[:\s]*([^\n\r]+)/i);
          const typeMatch = text.match(/type[:\s]*(IFR|CFR|CR)/i);
          const coordMatch = text.match(/coordinates?[:\s]*([^\n\r]+)/i);

          const extractedData = {
            claimantName: claimantMatch ? claimantMatch[1].trim() : 'Not found',
            village: villageMatch ? villageMatch[1].trim() : 'Not found',
            claimType: typeMatch ? typeMatch[1].trim() : 'Not found',
            coordinates: coordMatch ? coordMatch[1].trim() : 'Not found'
          };

          setUploadedClaims(prev => prev.map(claim => 
            claim.id === newClaim.id 
              ? {
                  ...claim,
                  status: 'completed',
                  extractedData
                }
              : claim
          ));
          toast.success('Claim processed successfully!');
        } catch (error) {
          setUploadedClaims(prev => prev.map(claim => 
            claim.id === newClaim.id 
              ? { ...claim, status: 'error' }
              : claim
          ));
          toast.error('OCR processing failed');
        }
      } else {
        toast.error('Please upload PDF or image files only');
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const startEditing = (claim: UploadedClaim) => {
    if (claim.extractedData) {
      setEditingClaim(claim.id);
      setEditData(claim.extractedData);
    }
  };

  const saveEdit = () => {
    setUploadedClaims(prev => prev.map(claim => 
      claim.id === editingClaim 
        ? { ...claim, extractedData: editData }
        : claim
    ));
    setEditingClaim(null);
    toast.success('Claim data updated!');
  };

  const submitClaim = (claimId: string) => {
    // Mock API call to submit claim
    toast.success('Claim submitted for processing!');
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-800 mb-2">
          Upload FRA Claim Documents
        </h3>
        <p className="text-slate-600 mb-4">
          Drag and drop PDF or image files here, or click to browse. AI-powered OCR will extract key information.
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,image/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </label>
      </div>

      {/* Uploaded Claims */}
      {uploadedClaims.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-zinc-800">Processing Status</h4>
          {uploadedClaims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span className="font-medium text-zinc-800">{claim.filename}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {claim.status === 'processing' && (
                    <>
                      <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                      <span className="text-sm text-blue-500">Processing...</span>
                    </>
                  )}
                  {claim.status === 'completed' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Completed</span>
                    </>
                  )}
                  {claim.status === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">Error</span>
                    </>
                  )}
                </div>
              </div>

              {claim.extractedData && (
                <div className="bg-slate-50 rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-zinc-800">Extracted Information:</h5>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(claim)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {claim.previewUrl && (
                        <a
                          href={claim.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-800"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {editingClaim === claim.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Claimant Name"
                          value={editData.claimantName}
                          onChange={(e) => setEditData(prev => ({ ...prev, claimantName: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="Village"
                          value={editData.village}
                          onChange={(e) => setEditData(prev => ({ ...prev, village: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select
                          value={editData.claimType}
                          onChange={(e) => setEditData(prev => ({ ...prev, claimType: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Type</option>
                          <option value="IFR">Individual Forest Rights (IFR)</option>
                          <option value="CFR">Community Forest Rights (CFR)</option>
                          <option value="CR">Community Rights (CR)</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Coordinates"
                          value={editData.coordinates}
                          onChange={(e) => setEditData(prev => ({ ...prev, coordinates: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingClaim(null)}
                          className="px-4 py-2 bg-slate-300 text-slate-700 rounded-md hover:bg-slate-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-600">Claimant:</span>
                        <span className="ml-2 font-medium">{claim.extractedData.claimantName}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Village:</span>
                        <span className="ml-2 font-medium">{claim.extractedData.village}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Type:</span>
                        <span className="ml-2 font-medium">{claim.extractedData.claimType}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Coordinates:</span>
                        <span className="ml-2 font-medium">{claim.extractedData.coordinates}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200">
                    <button
                      onClick={() => submitClaim(claim.id)}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Submit Claim for Processing
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimUpload;