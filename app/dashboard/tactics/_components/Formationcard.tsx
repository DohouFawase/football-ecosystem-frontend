import React from 'react';
import { Edit2, Copy, Download, Trash2 } from 'lucide-react';
import Field from './Field';
import { Formation, FormationStats } from '@/types/tactic';

interface FormationCardProps {
  formation: Formation;
  stats: FormationStats;
  isEditing: boolean;
  editName: string;
  onEditStart: () => void;
  onEditChange: (name: string) => void;
  onEditSave: () => void;
  onDuplicate: () => void;
  onExport: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const FormationCard: React.FC<FormationCardProps> = ({
  formation,
  stats,
  isEditing,
  editName,
  onEditStart,
  onEditChange,
  onEditSave,
  onDuplicate,
  onExport,
  onDelete,
  onSelect
}) => {
  return (
    <div className="bg-white border-gray-200 hover:border-gray-400 transition-all shadow-sm rounded-lg overflow-hidden border ">
      <div className="p-4 bg-blue-600">
        <div className="flex justify-between items-start mb-2">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditChange(e.target.value)}
              onBlur={onEditSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onEditSave();
              }}
              className="text-white font-bold bg-blue-700 px-3 py-1 rounded flex-1 mr-2"
              autoFocus
            />
          ) : (
            <h3 className="text-white font-bold text-lg flex-1">{formation.name}</h3>
          )}
          <div className="flex gap-1">
            <button
              onClick={onEditStart}
              className="text-white hover:bg-blue-700 p-1.5 rounded transition-all"
              title="Renommer"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={onDuplicate}
              className="text-white hover:bg-blue-700 p-1.5 rounded transition-all"
              title="Dupliquer"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={onExport}
              className="text-white hover:bg-blue-700 p-1.5 rounded transition-all"
              title="Exporter"
            >
              <Download size={14} />
            </button>
            <button
              onClick={onDelete}
              className="text-white hover:bg-red-600 p-1.5 rounded transition-all"
              title="Supprimer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          <div className="text-center bg-red-600/30 rounded px-1 py-0.5">
            <div className="text-xs text-red-200">GK</div>
            <div className="text-sm font-bold text-white">{stats.gk}</div>
          </div>
          <div className="text-center bg-blue-600/30 rounded px-1 py-0.5">
            <div className="text-xs text-blue-200">DF</div>
            <div className="text-sm font-bold text-white">{stats.df}</div>
          </div>
          <div className="text-center bg-green-600/30 rounded px-1 py-0.5">
            <div className="text-xs text-green-200">MF</div>
            <div className="text-sm font-bold text-white">{stats.mf}</div>
          </div>
          <div className="text-center bg-yellow-600/30 rounded px-1 py-0.5">
            <div className="text-xs text-yellow-200">FW</div>
            <div className="text-sm font-bold text-white">{stats.fw}</div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <Field formation={formation} isMini={true} onClick={onSelect} />
      </div>
    </div>
  );
};

export default FormationCard;