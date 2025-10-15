import React from 'react';
import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

interface WorkflowStageProps {
  stage: {
    id: string;
    name: string;
    status: 'completed' | 'active' | 'pending' | 'overdue';
    assignee: string;
    dueDate: string;
    slaHours: number;
    description: string;
  };
  isLast: boolean;
}

const WorkflowStage: React.FC<WorkflowStageProps> = ({ stage, isLast }) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'active':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusColor = () => {
    switch (stage.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'active':
        return 'bg-blue-50 border-blue-200';
      case 'overdue':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = () => {
    switch (stage.status) {
      case 'completed':
        return 'Completed';
      case 'active':
        return 'In Progress';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="relative">
      <div className={`rounded-lg border-2 p-4 ${getStatusColor()}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <h3 className="font-medium text-zinc-800">{stage.name}</h3>
              <p className="text-sm text-slate-600">{stage.description}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            stage.status === 'completed' ? 'bg-green-100 text-green-800' :
            stage.status === 'active' ? 'bg-blue-100 text-blue-800' :
            stage.status === 'overdue' ? 'bg-red-100 text-red-800' :
            'bg-slate-100 text-slate-800'
          }`}>
            {getStatusText()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Assignee:</span>
            <span className="font-medium">{stage.assignee}</span>
          </div>
          <div>
            <span className="text-slate-600">Due Date:</span>
            <span className="ml-2 font-medium">{stage.dueDate}</span>
          </div>
          <div>
            <span className="text-slate-600">SLA:</span>
            <span className="ml-2 font-medium">{stage.slaHours}h</span>
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="flex justify-center mt-4 mb-4">
          <div className="w-px h-8 bg-slate-300"></div>
        </div>
      )}
    </div>
  );
};

export default WorkflowStage;