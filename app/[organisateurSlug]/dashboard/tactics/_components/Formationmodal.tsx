import React from 'react';
import { X, Settings, Plus } from 'lucide-react';
import { formationTemplates } from '@/mock/formationTemplates';

interface FormationModalProps {
  onClose: () => void;
  onSelectTemplate: (templateName: string) => void;
  onCreateManual: () => void;
}

const FormationModal: React.FC<FormationModalProps> = ({
  onClose,
  onSelectTemplate,
  onCreateManual
}) => {
  return (
    <div className="fixed inset-0  bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Settings className="text-blue-500" />
                Créer une formation
              </h2>
              <p className="text-gray-400 mt-1">Choisissez un système ou créez manuellement</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-all"
            >
              <X size={32} />
            </button>
          </div>
        </div>

        {/* Option formation manuelle */}
        <div className="p-6 border-b border-slate-700">
          <button
            onClick={onCreateManual}
            className="w-full p-6 border-2 border-dashed border-blue-500 rounded-lg hover:bg-blue-900/20 transition-all group"
          >
            <div className="flex items-center justify-center gap-4">
              <Plus size={48} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Créer une formation manuelle
                </div>
                <div className="text-gray-400">
                  Commencez avec un gardien et ajoutez vos joueurs librement
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Ou choisir une formation prédéfinie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(formationTemplates).map(([templateName, template]) => (
              <button
                key={templateName}
                onClick={() => onSelectTemplate(templateName)}
                className="p-5 border-2 border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-700 transition-all text-left group"
              >
                <div className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {templateName}
                </div>
                <div className="text-sm text-gray-400 mb-3">{template.description}</div>
                <div className="flex gap-2 text-xs flex-wrap">
                  <span className="px-2 py-1 bg-red-600/30 text-red-200 rounded">
                    GK: {template.players.filter(p => p.position === 'GK').length}
                  </span>
                  <span className="px-2 py-1 bg-blue-600/30 text-blue-200 rounded">
                    DF: {template.players.filter(p => p.position === 'DF').length}
                  </span>
                  <span className="px-2 py-1 bg-green-600/30 text-green-200 rounded">
                    MF: {template.players.filter(p => p.position === 'MF').length}
                  </span>
                  <span className="px-2 py-1 bg-yellow-600/30 text-yellow-200 rounded">
                    FW: {template.players.filter(p => p.position === 'FW').length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationModal;