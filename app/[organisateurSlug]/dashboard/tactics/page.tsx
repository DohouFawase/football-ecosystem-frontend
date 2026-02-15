"use client";
import React, { useState } from "react";
import {
  Plus,
  X,
  Download,
  Activity,
  Users,
  Target,
  Pencil,
} from "lucide-react";
import { Arrow, Formation, FormationStats, Player } from "@/types/tactic";
import { formationTemplates } from "@/mock/formationTemplates";
import FormationCard from "./_components/Formationcard";
import FormationModal from "./_components/Formationmodal";
import PlayerEditModal from "./_components/Playereditmodal";
import Field from "./_components/Field";
const Page: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(
    null,
  );
  const [nextFormationId, setNextFormationId] = useState(1);
  const [editingName, setEditingName] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPlayerEdit, setShowPlayerEdit] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const [drawingArrow, setDrawingArrow] = useState<{
    startX: number;
    startY: number;
  } | null>(null);
  const [arrowType, setArrowType] = useState<"move" | "pass" | "run">("move");

  const addFormation = (templateName: string) => {
    const template = formationTemplates[templateName];
    const newFormation: Formation = {
      id: nextFormationId,
      name: templateName,
      players: JSON.parse(JSON.stringify(template.players)),
      arrows: [],
      notes: "",
      createdAt: new Date().toISOString(),
    };
    setFormations([...formations, newFormation]);
    setNextFormationId(nextFormationId + 1);
    setShowModal(false);
  };

  const createManualFormation = () => {
    const newFormation: Formation = {
      id: nextFormationId,
      name: `Formation Manuelle ${nextFormationId}`,
      players: [
        {
          id: 1,
          x: 50,
          y: 90,
          number: 1,
          name: "Gardien",
          position: "GK",
          color: "#DC2626",
        },
      ],
      arrows: [],
      notes: "",
      createdAt: new Date().toISOString(),
    };
    setFormations([...formations, newFormation]);
    setNextFormationId(nextFormationId + 1);
    setShowModal(false);
    setSelectedFormation(newFormation);
  };

  const duplicateFormation = (formation: Formation) => {
    const newFormation: Formation = {
      ...JSON.parse(JSON.stringify(formation)),
      id: nextFormationId,
      name: `${formation.name} (Copie)`,
      createdAt: new Date().toISOString(),
    };
    setFormations([...formations, newFormation]);
    setNextFormationId(nextFormationId + 1);
  };

  const deleteFormation = (id: number) => {
    setFormations(formations.filter((f) => f.id !== id));
    if (selectedFormation?.id === id) {
      setSelectedFormation(null);
    }
  };

  const updateFormation = (id: number, updates: Partial<Formation>) => {
    setFormations(
      formations.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    );
    if (selectedFormation?.id === id) {
      setSelectedFormation({ ...selectedFormation, ...updates });
    }
  };

  const renameFormation = (id: number, newName: string) => {
    updateFormation(id, { name: newName });
  };

  const addPlayer = (formationId: number, x: number, y: number) => {
    if (drawMode) return;
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;

    const newPlayerId = Math.max(0, ...formation.players.map((p) => p.id)) + 1;
    const newPlayer: Player = {
      id: newPlayerId,
      x,
      y,
      number: newPlayerId,
      name: "Joueur",
      position: "MF",
      color: "#059669",
    };
    updateFormation(formationId, {
      players: [...formation.players, newPlayer],
    });
  };

  const movePlayer = (
    formationId: number,
    playerId: number,
    x: number,
    y: number,
  ) => {
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;

    const updatedPlayers = formation.players.map((p) =>
      p.id === playerId ? { ...p, x, y } : p,
    );
    updateFormation(formationId, { players: updatedPlayers });
  };

  const deletePlayer = (formationId: number, playerId: number) => {
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;

    updateFormation(formationId, {
      players: formation.players.filter((p) => p.id !== playerId),
    });
  };

  const updatePlayer = (
    formationId: number,
    playerId: number,
    updates: Partial<Player>,
  ) => {
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;

    const updatedPlayers = formation.players.map((p) =>
      p.id === playerId ? { ...p, ...updates } : p,
    );
    updateFormation(formationId, { players: updatedPlayers });
  };

  const handleFieldClick = (
    e: React.MouseEvent<HTMLDivElement>,
    formationId: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (drawMode && drawingArrow) {
      const formation = formations.find((f) => f.id === formationId);
      if (!formation) return;

      const newArrow: Arrow = {
        id: Date.now(),
        startX: drawingArrow.startX,
        startY: drawingArrow.startY,
        endX: x,
        endY: y,
        type: arrowType,
        color:
          arrowType === "move"
            ? "#FBBF24"
            : arrowType === "pass"
              ? "#60A5FA"
              : "#34D399",
      };
      updateFormation(formationId, {
        arrows: [...(formation.arrows || []), newArrow],
      });
      setDrawingArrow(null);
    } else if (drawMode && !drawingArrow) {
      setDrawingArrow({ startX: x, startY: y });
    } else {
      addPlayer(formationId, x, y);
    }
  };

  const handlePlayerDrag = (
    formationId: number,
    playerId: number,
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    if (e.clientX === 0 || drawMode) return;
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100),
    );
    movePlayer(formationId, playerId, x, y);
  };

  const deleteArrow = (formationId: number, arrowId: number) => {
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;

    updateFormation(formationId, {
      arrows: formation.arrows.filter((a) => a.id !== arrowId),
    });
  };

  const clearAllArrows = (formationId: number) => {
    updateFormation(formationId, { arrows: [] });
  };

  const exportFormation = (formation: Formation) => {
    const dataStr = JSON.stringify(formation, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formation.name}.json`;
    link.click();
  };

  const getFormationStats = (formation: Formation): FormationStats => {
    const positions = formation.players.reduce(
      (acc, p) => {
        acc[p.position] = (acc[p.position] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total: formation.players.length,
      gk: positions.GK || 0,
      df: positions.DF || 0,
      mf: positions.MF || 0,
      fw: positions.FW || 0,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans">
      <div className="">
        {/* Header */}
        <div className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Gestion Tactique
          </h1>
          <p className="text-gray-500 mt-2">
            Optimisez le positionnement de votre équipe.
          </p>
        </div>

        {!selectedFormation ? (
          <div>
            {/* Panneau de contrôle */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Users className="text-gray-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Mes Formations
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {formations.length} schémas enregistrés
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus size={20} />
                  Nouvelle Formation
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <Target size={16} className="text-gray-400" />
                  Double-cliquez pour éditer • Glissez pour déplacer • Cliquez
                  pour ouvrir
                </p>
              </div>
            </div>

            {formations.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-20 text-center border border-gray-200">
                <div className="text-6xl mb-4 opacity-20">⚽</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Aucune formation
                </h3>
                <p className="text-gray-500 mb-8">
                  Commencez par créer votre première disposition tactique.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Créer maintenant
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {formations.map((formation) => (
                  <FormationCard
                    key={formation.id}
                    formation={formation}
                    stats={getFormationStats(formation)}
                    isEditing={editingName === formation.id}
                    editName={newName}
                    onEditStart={() => {
                      setEditingName(formation.id);
                      setNewName(formation.name);
                    }}
                    onEditChange={setNewName}
                    onEditSave={() => {
                      renameFormation(formation.id, newName);
                      setEditingName(null);
                    }}
                    onDuplicate={() => duplicateFormation(formation)}
                    onExport={() => exportFormation(formation)}
                    onDelete={() => deleteFormation(formation.id)}
                    onSelect={() => setSelectedFormation(formation)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Barre d'outils de la formation */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedFormation.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {selectedFormation.players.length} joueur(s) •{" "}
                    {selectedFormation.arrows?.length || 0} flèche(s)
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Activity size={20} />
                    Stats
                  </button>
                  <button
                    onClick={() => exportFormation(selectedFormation)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Download size={20} />
                    Exporter
                  </button>
                  <button
                    onClick={() => setSelectedFormation(null)}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all flex items-center gap-2"
                  >
                    <X size={20} />
                    Retour
                  </button>
                </div>
              </div>

              {/* Outils de dessin */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setDrawMode(!drawMode);
                      setDrawingArrow(null);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      drawMode
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Pencil size={18} />
                    {drawMode ? "Mode Dessin ON" : "Mode Dessin OFF"}
                  </button>

                  {drawMode && (
                    <>
                      <div className="h-6 w-px bg-purple-500"></div>
                      <button
                        onClick={() => setArrowType("move")}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                          arrowType === "move"
                            ? "bg-yellow-600 text-white"
                            : "bg-yellow-600/30 text-yellow-200 hover:bg-yellow-600/50"
                        }`}
                      >
                        🏃 Déplacement
                      </button>
                      <button
                        onClick={() => setArrowType("pass")}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                          arrowType === "pass"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-600/30 text-blue-200 hover:bg-blue-600/50"
                        }`}
                      >
                        ⚽ Passe
                      </button>
                      <button
                        onClick={() => setArrowType("run")}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                          arrowType === "run"
                            ? "bg-green-600 text-white"
                            : "bg-green-600/30 text-green-200 hover:bg-green-600/50"
                        }`}
                      >
                        💨 Course
                      </button>
                      <div className="h-6 w-px bg-purple-500"></div>
                      <button
                        onClick={() => clearAllArrows(selectedFormation.id)}
                        className="px-3 py-2 bg-red-600/30 text-red-200 hover:bg-red-600 hover:text-white rounded-lg font-semibold transition-all"
                      >
                        🗑️ Effacer toutes les flèches
                      </button>
                    </>
                  )}
                </div>
              </div>

              {showStats && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900 rounded-lg">
                  {Object.entries(getFormationStats(selectedFormation)).map(
                    ([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {value}
                        </div>
                        <div className="text-sm text-gray-400 uppercase">
                          {key}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-4">
                <p className="text-blue-300 text-sm flex items-center gap-2">
                  <Target size={16} />
                  {drawMode
                    ? "🎨 Mode Dessin : Cliquez 2 fois pour tracer une flèche (début → fin)"
                    : "Cliquez pour ajouter • Double-cliquez sur un joueur pour éditer • Glissez pour déplacer"}
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Field
                formation={selectedFormation}
                isMini={false}
                onFieldClick={(e) => handleFieldClick(e, selectedFormation.id)}
                onPlayerDrag={(playerId, e) =>
                  handlePlayerDrag(selectedFormation.id, playerId, e)
                }
                onPlayerDoubleClick={(playerId) => setShowPlayerEdit(playerId)}
                onPlayerDelete={(playerId) =>
                  deletePlayer(selectedFormation.id, playerId)
                }
                onArrowDelete={(arrowId) =>
                  deleteArrow(selectedFormation.id, arrowId)
                }
                drawMode={drawMode}
                drawingArrow={drawingArrow}
                arrowType={arrowType}
              />
            </div>
          </div>
        )}

        {/* Modals */}
        {showModal && (
          <FormationModal
            onClose={() => setShowModal(false)}
            onSelectTemplate={addFormation}
            onCreateManual={createManualFormation}
          />
        )}

        {showPlayerEdit !== null && selectedFormation && (
          <PlayerEditModal
            player={
              selectedFormation.players.find((p) => p.id === showPlayerEdit)!
            }
            onUpdate={(player) =>
              updatePlayer(selectedFormation.id, player.id, player)
            }
            onClose={() => setShowPlayerEdit(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
