import { Player } from '@/types/tactic';
import React from 'react';

interface PlayerEditModalProps {
  player: Player;
  onUpdate: (player: Player) => void;
  onClose: () => void;
}

const PlayerEditModal: React.FC<PlayerEditModalProps> = ({ player, onUpdate, onClose }) => {
  const [editData, setEditData] = React.useState<Player>(player);

  const handleSave = () => {
    onUpdate(editData);
    onClose();
  };

  const colors = ['#DC2626', '#2563EB', '#059669', '#D97706', '#7C3AED', '#DB2777'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-2xl font-bold text-white">Éditer le joueur</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Numéro</label>
            <input
              type="number"
              value={editData.number}
              onChange={(e) => setEditData({ ...editData, number: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Position</label>
            <select
              value={editData.position}
              onChange={(e) => setEditData({ ...editData, position: e.target.value as Player['position'] })}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="GK">Gardien (GK)</option>
              <option value="DF">Défenseur (DF)</option>
              <option value="MF">Milieu (MF)</option>
              <option value="FW">Attaquant (FW)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Couleur</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setEditData({ ...editData, color })}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    editData.color === color ? 'border-white scale-110' : 'border-slate-600'
                  } transition-all`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-slate-700 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerEditModal;