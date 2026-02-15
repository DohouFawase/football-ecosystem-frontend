import { Arrow, Formation } from '@/types/tactic';
import React from 'react';

interface FieldProps {
  formation: Formation;
  isMini?: boolean;
  onClick?: () => void;
  onFieldClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPlayerDrag?: (playerId: number, e: React.DragEvent<HTMLDivElement>) => void;
  onPlayerDoubleClick?: (playerId: number) => void;
  onPlayerDelete?: (playerId: number) => void;
  onArrowDelete?: (arrowId: number) => void;
  drawMode?: boolean;
  drawingArrow?: { startX: number; startY: number } | null;
  arrowType?: 'move' | 'pass' | 'run';
}

const Field: React.FC<FieldProps> = ({
  formation,
  isMini = false,
  onClick,
  onFieldClick,
  onPlayerDrag,
  onPlayerDoubleClick,
  onPlayerDelete,
  onArrowDelete,
  drawMode = false,
  drawingArrow = null,
  arrowType = 'move'
}) => {
  const getArrowColor = (type: string) => {
    switch (type) {
      case 'move': return '#FBBF24';
      case 'pass': return '#60A5FA';
      case 'run': return '#34D399';
      default: return '#FBBF24';
    }
  };

  return (
    <div
      className={`relative bg-green-700 rounded-lg overflow-hidden ${
        isMini 
          ? 'cursor-pointer hover:ring-4 hover:ring-blue-500 transition-all' 
          : drawMode 
          ? 'cursor-crosshair' 
          : 'cursor-crosshair shadow-2xl'
      }`}
      style={{
        aspectRatio: '2/3',
        backgroundImage: `
          linear-gradient(0deg, #15803d 0%, #166534 50%, #15803d 100%),
          repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.05) 49px, rgba(255,255,255,0.05) 50px)
        `
      }}
      onClick={isMini ? onClick : onFieldClick}
    >
      {/* Lignes du terrain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <rect x="2%" y="2%" width="96%" height="96%" fill="none" stroke="white" strokeWidth="2" />
        <line x1="2%" y1="50%" x2="98%" y2="50%" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="8%" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="1%" fill="white" />
        <rect x="22%" y="84%" width="56%" height="14%" fill="none" stroke="white" strokeWidth="2" />
        <rect x="35%" y="90%" width="30%" height="8%" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="92%" r="0.8%" fill="white" />
        <rect x="22%" y="2%" width="56%" height="14%" fill="none" stroke="white" strokeWidth="2" />
        <rect x="35%" y="2%" width="30%" height="8%" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="8%" r="0.8%" fill="white" />

        {/* Flèches tactiques */}
        {!isMini && formation.arrows && formation.arrows.map((arrow: Arrow) => (
          <g key={arrow.id}>
            <defs>
              <marker
                id={`arrowhead-${arrow.id}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill={arrow.color} />
              </marker>
            </defs>
            <line
              x1={`${arrow.startX}%`}
              y1={`${arrow.startY}%`}
              x2={`${arrow.endX}%`}
              y2={`${arrow.endY}%`}
              stroke={arrow.color}
              strokeWidth={arrow.type === 'pass' ? '2' : '3'}
              strokeDasharray={arrow.type === 'run' ? '5,5' : '0'}
              markerEnd={`url(#arrowhead-${arrow.id})`}
              className="cursor-pointer hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                if (!isMini && onArrowDelete) onArrowDelete(arrow.id);
              }}
            />
          </g>
        ))}

        {/* Flèche en cours de dessin */}
        {!isMini && drawingArrow && (
          <line
            x1={`${drawingArrow.startX}%`}
            y1={`${drawingArrow.startY}%`}
            x2={`${drawingArrow.startX}%`}
            y2={`${drawingArrow.startY}%`}
            stroke={getArrowColor(arrowType)}
            strokeWidth="3"
            strokeDasharray={arrowType === 'run' ? '5,5' : '0'}
          />
        )}
      </svg>

      {/* Joueurs */}
      {formation.players.map(player => (
        <div
          key={player.id}
          draggable={!isMini && !drawMode}
          onDrag={!isMini && !drawMode && onPlayerDrag ? (e) => onPlayerDrag(player.id, e) : undefined}
          style={{
            position: 'absolute',
            left: `${player.x}%`,
            top: `${player.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: isMini ? 'pointer' : drawMode ? 'crosshair' : 'move',
            pointerEvents: isMini ? 'none' : 'auto'
          }}
          onClick={(e) => !isMini && e.stopPropagation()}
          onDoubleClick={(e) => {
            if (!isMini && !drawMode && onPlayerDoubleClick) {
              e.stopPropagation();
              onPlayerDoubleClick(player.id);
            }
          }}
        >
          <div className="relative group">
            <div
              className={`border-4 border-white rounded-full shadow-lg flex items-center justify-center text-white font-bold ${
                isMini ? 'w-6 h-6 text-[8px]' : 'w-12 h-12 text-sm hover:scale-110 transition-transform'
              }`}
              style={{ backgroundColor: player.color }}
            >
              {player.number}
            </div>
            {!isMini && (
              <>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 bg-opacity-90 px-2 py-1 rounded text-xs font-semibold shadow-md whitespace-nowrap text-white">
                  <div>{player.name}</div>
                  <div className="text-[10px] text-gray-300">{player.position}</div>
                </div>
                {!drawMode && onPlayerDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayerDelete(player.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700 shadow-lg"
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Field;