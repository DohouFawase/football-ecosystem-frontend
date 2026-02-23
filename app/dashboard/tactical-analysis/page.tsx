// app/tactical/page.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MousePointer2, 
  Pencil, 
  ArrowRight, 
  Circle, 
  Square, 
  Type, 
  Trash2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Save, 
  FolderOpen, 
  Download, 
  Share2, 
  Users, 
  Shield, 
  Target, 
  Zap, 
  Move, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Grid3X3, 
  Video, 
  Mic, 
  MessageSquare, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Plus,
  Minus,
  Copy,
  Scissors,
  Eraser,
  PenTool,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Settings,
  Palette
} from 'lucide-react';

// Types tactiques
interface Player {
  id: string;
  number: number;
  name: string;
  x: number;
  y: number;
  team: 'home' | 'away';
  position?: string;
  isSelected?: boolean;
}

interface DrawingElement {
  id: string;
  type: 'line' | 'arrow' | 'circle' | 'rectangle' | 'text' | 'freehand';
  points: { x: number; y: number }[];
  color: string;
  width: number;
  team?: 'home' | 'away' | 'neutral';
  text?: string;
  isAnimated?: boolean;
}

interface TacticalFrame {
  id: string;
  name: string;
  timestamp: number;
  players: Player[];
  drawings: DrawingElement[];
  ballPosition?: { x: number; y: number };
  description?: string;
}

interface Formation {
  id: string;
  name: string;
  structure: string;
  positions: { x: number; y: number; role: string }[];
}

// Formations prédéfinies
const FORMATIONS: Formation[] = [
  {
    id: '433',
    name: '4-3-3',
    structure: '4-3-3',
    positions: [
      { x: 50, y: 10, role: 'GK' },
      { x: 20, y: 30, role: 'LB' },
      { x: 40, y: 30, role: 'CB' },
      { x: 60, y: 30, role: 'CB' },
      { x: 80, y: 30, role: 'RB' },
      { x: 30, y: 50, role: 'CM' },
      { x: 50, y: 50, role: 'CM' },
      { x: 70, y: 50, role: 'CM' },
      { x: 20, y: 75, role: 'LW' },
      { x: 50, y: 80, role: 'ST' },
      { x: 80, y: 75, role: 'RW' },
    ]
  },
  {
    id: '442',
    name: '4-4-2',
    structure: '4-4-2',
    positions: [
      { x: 50, y: 10, role: 'GK' },
      { x: 20, y: 30, role: 'LB' },
      { x: 40, y: 30, role: 'CB' },
      { x: 60, y: 30, role: 'CB' },
      { x: 80, y: 30, role: 'RB' },
      { x: 20, y: 55, role: 'LM' },
      { x: 40, y: 55, role: 'CM' },
      { x: 60, y: 55, role: 'CM' },
      { x: 80, y: 55, role: 'RM' },
      { x: 40, y: 80, role: 'ST' },
      { x: 60, y: 80, role: 'ST' },
    ]
  },
  {
    id: '352',
    name: '3-5-2',
    structure: '3-5-2',
    positions: [
      { x: 50, y: 10, role: 'GK' },
      { x: 30, y: 30, role: 'CB' },
      { x: 50, y: 30, role: 'CB' },
      { x: 70, y: 30, role: 'CB' },
      { x: 15, y: 50, role: 'LWB' },
      { x: 35, y: 50, role: 'CM' },
      { x: 50, y: 50, role: 'CM' },
      { x: 65, y: 50, role: 'CM' },
      { x: 85, y: 50, role: 'RWB' },
      { x: 40, y: 80, role: 'ST' },
      { x: 60, y: 80, role: 'ST' },
    ]
  },
  {
    id: '4231',
    name: '4-2-3-1',
    structure: '4-2-3-1',
    positions: [
      { x: 50, y: 10, role: 'GK' },
      { x: 20, y: 30, role: 'LB' },
      { x: 40, y: 30, role: 'CB' },
      { x: 60, y: 30, role: 'CB' },
      { x: 80, y: 30, role: 'RB' },
      { x: 35, y: 50, role: 'CDM' },
      { x: 65, y: 50, role: 'CDM' },
      { x: 20, y: 70, role: 'LAM' },
      { x: 50, y: 65, role: 'CAM' },
      { x: 80, y: 70, role: 'RAM' },
      { x: 50, y: 85, role: 'ST' },
    ]
  }
];

// Composants UI
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  isActive = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isActive?: boolean;
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600',
    ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  };

  return (
    <button 
      className={`rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 
        ${variants[variant]} ${sizes[size]} 
        ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap z-50"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Composant Terrain de football interactif
const FootballPitch = ({
  players,
  setPlayers,
  drawings,
  setDrawings,
  selectedTool,
  currentColor,
  brushSize,
  isPlaying,
  currentFrame,
  onPitchClick,
  showGrid,
  showHeatmap,
  ballPosition,
  setBallPosition
}: {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  drawings: DrawingElement[];
  setDrawings: React.Dispatch<React.SetStateAction<DrawingElement[]>>;
  selectedTool: string;
  currentColor: string;
  brushSize: number;
  isPlaying: boolean;
  currentFrame: number;
  onPitchClick?: (e: React.MouseEvent) => void;
  showGrid: boolean;
  showHeatmap: boolean;
  ballPosition?: { x: number; y: number };
  setBallPosition?: (pos: { x: number; y: number }) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Dessiner le terrain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fond du terrain
    ctx.fillStyle = '#10B981';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Effet pelouse
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.fillRect(i, 0, 20, canvas.height);
    }

    // Lignes du terrain
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 3;

    // Contour
    ctx.strokeRect(50, 30, canvas.width - 100, canvas.height - 60);

    // Ligne médiane
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 30);
    ctx.lineTo(canvas.width / 2, canvas.height - 30);
    ctx.stroke();

    // Cercle central
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
    ctx.stroke();

    // Point central
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();

    // Surfaces de réparation
    const drawBox = (y: number, isTop: boolean) => {
      const boxHeight = 120;
      const boxWidth = 300;
      const x = (canvas.width - boxWidth) / 2;
      const yPos = isTop ? y : y - boxHeight;
      
      ctx.strokeRect(x, yPos, boxWidth, boxHeight);
      
      // Surface petit
      const smallBoxHeight = 50;
      const smallBoxWidth = 150;
      const smallX = (canvas.width - smallBoxWidth) / 2;
      const smallY = isTop ? y : y - smallBoxHeight;
      ctx.strokeRect(smallX, smallY, smallBoxWidth, smallBoxHeight);
      
      // Point de penalty
      const penaltyY = isTop ? y + 80 : y - 80;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, penaltyY, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Arc du penalty
      ctx.beginPath();
      ctx.arc(canvas.width / 2, penaltyY, 60, isTop ? 0 : Math.PI, isTop ? Math.PI : 0);
      ctx.stroke();
    };

    drawBox(30, true);
    drawBox(canvas.height - 30, false);

    // Corners
    const drawCorner = (x: number, y: number, startAngle: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 15, startAngle, startAngle + Math.PI / 2);
      ctx.stroke();
    };

    drawCorner(50, 30, 0);
    drawCorner(canvas.width - 50, 30, Math.PI / 2);
    drawCorner(50, canvas.height - 30, -Math.PI / 2);
    drawCorner(canvas.width - 50, canvas.height - 30, Math.PI);

    // Grille optionnelle
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Heatmap optionnelle
    if (showHeatmap) {
      players.forEach(player => {
        const gradient = ctx.createRadialGradient(
          (player.x / 100) * canvas.width,
          (player.y / 100) * canvas.height,
          0,
          (player.x / 100) * canvas.width,
          (player.y / 100) * canvas.height,
          60
        );
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
        gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          (player.x / 100) * canvas.width,
          (player.y / 100) * canvas.height,
          60, 0, Math.PI * 2
        );
        ctx.fill();
      });
    }

    // Dessiner les éléments de dessin
    drawings.forEach((drawing, idx) => {
      if (idx > currentFrame && isPlaying) return;
      
      ctx.strokeStyle = drawing.color;
      ctx.lineWidth = drawing.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (drawing.type === 'freehand' || drawing.type === 'line') {
        ctx.beginPath();
        drawing.points.forEach((point, i) => {
          const x = (point.x / 100) * canvas.width;
          const y = (point.y / 100) * canvas.height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      } else if (drawing.type === 'arrow') {
        const start = drawing.points[0];
        const end = drawing.points[drawing.points.length - 1];
        const x1 = (start.x / 100) * canvas.width;
        const y1 = (start.y / 100) * canvas.height;
        const x2 = (end.x / 100) * canvas.width;
        const y2 = (end.y / 100) * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Tête de flèche
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
          x2 - 15 * Math.cos(angle - Math.PI / 6),
          y2 - 15 * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x2, y2);
        ctx.lineTo(
          x2 - 15 * Math.cos(angle + Math.PI / 6),
          y2 - 15 * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
      } else if (drawing.type === 'circle') {
        const center = drawing.points[0];
        const radius = drawing.points[1] 
          ? Math.sqrt(
              Math.pow(drawing.points[1].x - center.x, 2) + 
              Math.pow(drawing.points[1].y - center.y, 2)
            )
          : 5;
        
        ctx.beginPath();
        ctx.arc(
          (center.x / 100) * canvas.width,
          (center.y / 100) * canvas.height,
          (radius / 100) * canvas.width,
          0, Math.PI * 2
        );
        ctx.stroke();
      } else if (drawing.type === 'text' && drawing.text) {
        ctx.fillStyle = drawing.color;
        ctx.font = `bold ${drawing.width * 3}px Arial`;
        ctx.fillText(
          drawing.text,
          (drawing.points[0].x / 100) * canvas.width,
          (drawing.points[0].y / 100) * canvas.height
        );
      }
    });

    // Dessiner le ballon
    if (ballPosition) {
      const bx = (ballPosition.x / 100) * canvas.width;
      const by = (ballPosition.y / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Motif du ballon
      ctx.beginPath();
      ctx.arc(bx - 3, by - 3, 2, 0, Math.PI * 2);
      ctx.arc(bx + 3, by - 3, 2, 0, Math.PI * 2);
      ctx.arc(bx, by + 4, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
    }
  }, [drawings, currentFrame, isPlaying, showGrid, showHeatmap, players, ballPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (selectedTool === 'select') {
      // Vérifier si on clique sur un joueur
      const clickedPlayer = players.find(p => {
        const px = (p.x / 100) * canvas.width;
        const py = (p.y / 100) * canvas.height;
        const cx = (x / 100) * canvas.width;
        const cy = (y / 100) * canvas.height;
        return Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)) < 20;
      });
      
      if (clickedPlayer) {
        setDraggedPlayer(clickedPlayer.id);
        setPlayers(players.map(p => ({
          ...p,
          isSelected: p.id === clickedPlayer.id
        })));
      } else if (setBallPosition) {
        setBallPosition({ x, y });
      }
    } else if (selectedTool === 'player-home' || selectedTool === 'player-away') {
      const newPlayer: Player = {
        id: Date.now().toString(),
        number: players.filter(p => p.team === selectedTool.split('-')[1]).length + 1,
        name: `Joueur ${players.filter(p => p.team === selectedTool.split('-')[1]).length + 1}`,
        x, y,
        team: selectedTool.split('-')[1] as 'home' | 'away'
      };
      setPlayers([...players, newPlayer]);
    } else if (['line', 'arrow', 'circle', 'freehand', 'text'].includes(selectedTool)) {
      setIsDrawing(true);
      setCurrentPath([{ x, y }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (draggedPlayer) {
      setPlayers(players.map(p => 
        p.id === draggedPlayer ? { ...p, x, y } : p
      ));
    } else if (isDrawing && selectedTool !== 'text') {
      setCurrentPath([...currentPath, { x, y }]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 0) {
      const newDrawing: DrawingElement = {
        id: Date.now().toString(),
        type: selectedTool as any,
        points: currentPath,
        color: currentColor,
        width: brushSize,
        team: 'neutral'
      };
      setDrawings([...drawings, newDrawing]);
      setIsDrawing(false);
      setCurrentPath([]);
    }
    setDraggedPlayer(null);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full rounded-2xl shadow-2xl cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Overlay joueurs */}
      <div className="absolute inset-0 pointer-events-none">
        {players.map(player => (
          <motion.div
            key={player.id}
            className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-sm font-bold shadow-lg pointer-events-auto cursor-move
              ${player.team === 'home' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}
              ${player.isSelected ? 'ring-4 ring-yellow-400 z-20' : 'z-10'}
            `}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`
            }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2 }}
          >
            {player.number}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Timeline des frames
const Timeline = ({
  frames,
  currentFrame,
  setCurrentFrame,
  isPlaying,
  setIsPlaying,
  onAddFrame,
  onDeleteFrame,
  onDuplicateFrame
}: {
  frames: TacticalFrame[];
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onAddFrame: () => void;
  onDeleteFrame: (id: string) => void;
  onDuplicateFrame: (frame: TacticalFrame) => void;
}) => {
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Clock size={18} />
          Timeline ({frames.length} frames)
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button variant="secondary" size="sm" onClick={onAddFrame}>
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {frames.map((frame, idx) => (
          <motion.div
            key={frame.id}
            className={`flex-shrink-0 w-32 p-3 rounded-lg border-2 cursor-pointer transition-all
              ${currentFrame === idx ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}
              ${selectedFrameId === frame.id ? 'ring-2 ring-yellow-400' : ''}
            `}
            onClick={() => {
              setCurrentFrame(idx);
              setSelectedFrameId(frame.id);
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video bg-slate-100 rounded mb-2 flex items-center justify-center text-xs text-slate-400">
              Frame {idx + 1}
            </div>
            <p className="text-xs font-medium text-slate-700 truncate">{frame.name}</p>
            <p className="text-xs text-slate-500">{frame.timestamp}s</p>
            
            {selectedFrameId === frame.id && (
              <div className="flex gap-1 mt-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDuplicateFrame(frame); }}
                  className="p-1 hover:bg-slate-200 rounded"
                >
                  <Copy size={12} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteFrame(frame.id); }}
                  className="p-1 hover:bg-red-100 text-red-600 rounded"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}>
          <SkipBack size={20} className="text-slate-600" />
        </button>
        <input
          type="range"
          min="0"
          max={frames.length - 1}
          value={currentFrame}
          onChange={(e) => setCurrentFrame(parseInt(e.target.value))}
          className="flex-1"
        />
        <button onClick={() => setCurrentFrame(Math.min(frames.length - 1, currentFrame + 1))}>
          <SkipForward size={20} className="text-slate-600" />
        </button>
        <span className="text-sm font-mono text-slate-600 w-16 text-right">
          {currentFrame + 1}/{frames.length}
        </span>
      </div>
    </div>
  );
};

// Panel de formation
const FormationPanel = ({
  onSelectFormation,
  onClearPlayers
}: {
  onSelectFormation: (formation: Formation, team: 'home' | 'away') => void;
  onClearPlayers: (team: 'home' | 'away') => void;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Shield size={18} />
        Formations
      </h3>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedTeam('home')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            selectedTeam === 'home' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Domicile
        </button>
        <button
          onClick={() => setSelectedTeam('away')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            selectedTeam === 'away' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Extérieur
        </button>
      </div>

      <div className="space-y-2">
        {FORMATIONS.map(formation => (
          <button
            key={formation.id}
            onClick={() => onSelectFormation(formation, selectedTeam)}
            className="w-full p-3 text-left rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{formation.name}</span>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <p className="text-xs text-slate-500 mt-1">{formation.structure}</p>
          </button>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4" 
        onClick={() => onClearPlayers(selectedTeam)}
      >
        <Trash2 size={16} />
        Effacer équipe {selectedTeam === 'home' ? 'domicile' : 'extérieur'}
      </Button>
    </div>
  );
};

// Outils de dessin
const DrawingTools = ({
  selectedTool,
  setSelectedTool,
  currentColor,
  setCurrentColor,
  brushSize,
  setBrushSize,
  onClearDrawings,
  onUndo
}: {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onClearDrawings: () => void;
  onUndo: () => void;
}) => {
  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Sélection' },
    { id: 'line', icon: Pencil, label: 'Ligne' },
    { id: 'arrow', icon: ArrowRight, label: 'Flèche' },
    { id: 'circle', icon: Circle, label: 'Cercle' },
    { id: 'freehand', icon: PenTool, label: 'Dessin libre' },
    { id: 'text', icon: Type, label: 'Texte' },
    { id: 'player-home', icon: Users, label: 'Joueur domicile' },
    { id: 'player-away', icon: Users, label: 'Joueur extérieur' },
  ];

  const colors = [
    '#FFFFFF', '#EF4444', '#F59E0B', '#10B981', 
    '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#000000'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Palette size={18} />
        Outils
      </h3>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <Tooltip key={tool.id} text={tool.label}>
              <button
                onClick={() => setSelectedTool(tool.id)}
                className={`p-3 rounded-lg transition-all ${
                  selectedTool === tool.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon size={20} />
              </button>
            </Tooltip>
          );
        })}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-slate-700 mb-2 block">Couleur</label>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                currentColor === color ? 'border-slate-900 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Épaisseur: {brushSize}px
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onUndo}>
          <RotateCcw size={16} />
          Annuler
        </Button>
        <Button variant="danger" size="sm" className="flex-1" onClick={onClearDrawings}>
          <Eraser size={16} />
          Effacer
        </Button>
      </div>
    </div>
  );
};

// Composant principal
export default function TacticalAnalyst() {
  // États
  const [players, setPlayers] = useState<Player[]>([]);
  const [drawings, setDrawings] = useState<DrawingElement[]>([]);
  const [frames, setFrames] = useState<TacticalFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTool, setSelectedTool] = useState('select');
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(3);
  const [showGrid, setShowGrid] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number } | undefined>();
  const [projectName, setProjectName] = useState('Nouveau projet tactique');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideoPanel, setShowVideoPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'draw' | 'animate' | 'analyze'>('draw');

  // Initialisation
  useEffect(() => {
    if (frames.length === 0) {
      const initialFrame: TacticalFrame = {
        id: '1',
        name: 'Frame 1',
        timestamp: 0,
        players: [],
        drawings: [],
        description: 'Position initiale'
      };
      setFrames([initialFrame]);
    }
  }, []);

  // Sauvegarder l'état actuel dans la frame courante
  const saveCurrentState = useCallback(() => {
    setFrames(frames.map((frame, idx) => 
      idx === currentFrame 
        ? { ...frame, players, drawings, ballPosition }
        : frame
    ));
  }, [frames, currentFrame, players, drawings, ballPosition]);

  // Changer de frame
  useEffect(() => {
    const frame = frames[currentFrame];
    if (frame) {
      setPlayers(frame.players);
      setDrawings(frame.drawings);
      setBallPosition(frame.ballPosition);
    }
  }, [currentFrame, frames]);

  // Lecture automatique
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  // Handlers
  const handleAddFrame = () => {
    saveCurrentState();
    const newFrame: TacticalFrame = {
      id: Date.now().toString(),
      name: `Frame ${frames.length + 1}`,
      timestamp: frames.length * 5,
      players: JSON.parse(JSON.stringify(players)),
      drawings: [],
      description: ''
    };
    setFrames([...frames, newFrame]);
    setCurrentFrame(frames.length);
  };

  const handleDeleteFrame = (id: string) => {
    if (frames.length <= 1) return;
    const newFrames = frames.filter(f => f.id !== id);
    setFrames(newFrames);
    setCurrentFrame(Math.min(currentFrame, newFrames.length - 1));
  };

  const handleDuplicateFrame = (frame: TacticalFrame) => {
    saveCurrentState();
    const newFrame: TacticalFrame = {
      ...frame,
      id: Date.now().toString(),
      name: `${frame.name} (copie)`,
      timestamp: frame.timestamp + 1
    };
    const insertIndex = currentFrame + 1;
    const newFrames = [
      ...frames.slice(0, insertIndex),
      newFrame,
      ...frames.slice(insertIndex)
    ];
    setFrames(newFrames);
    setCurrentFrame(insertIndex);
  };

  const handleSelectFormation = (formation: Formation, team: 'home' | 'away') => {
    const newPlayers = formation.positions.map((pos, idx) => ({
      id: `${team}-${Date.now()}-${idx}`,
      number: idx + 1,
      name: `${pos.role} ${idx + 1}`,
      x: pos.x,
      y: team === 'away' ? 100 - pos.y : pos.y, // Inverser pour l'équipe extérieure
      team,
      position: pos.role
    }));
    
    setPlayers(prev => [...prev.filter(p => p.team !== team), ...newPlayers]);
  };

  const handleClearPlayers = (team: 'home' | 'away') => {
    setPlayers(prev => prev.filter(p => p.team !== team));
  };

  const handleUndo = () => {
    setDrawings(prev => prev.slice(0, -1));
  };

  const handleClearDrawings = () => {
    setDrawings([]);
  };

  const handleExport = () => {
    const data = {
      projectName,
      frames,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}.tactical.json`;
    a.click();
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="text-white" size={28} />
            </div>
            <div>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-2xl font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 -ml-2"
              />
              <p className="text-sm text-slate-500">Analyse tactique avancée</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-lg p-1">
              {['draw', 'animate', 'analyze'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'draw' && 'Dessin'}
                  {tab === 'animate' && 'Animation'}
                  {tab === 'analyze' && 'Analyse'}
                </button>
              ))}
            </div>

            <Button variant="outline" onClick={() => setShowVideoPanel(!showVideoPanel)}>
              <Video size={18} />
              Vidéo
            </Button>

            <Button variant="outline" onClick={handleExport}>
              <Download size={18} />
              Exporter
            </Button>

            <Button variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar gauche */}
        <div className="w-80 bg-white border-r border-slate-200 p-4 overflow-y-auto space-y-4">
          <DrawingTools
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            onClearDrawings={handleClearDrawings}
            onUndo={handleUndo}
          />

          <FormationPanel
            onSelectFormation={handleSelectFormation}
            onClearPlayers={handleClearPlayers}
          />

          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers size={18} />
              Options d'affichage
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <Grid3X3 size={18} className="text-slate-600" />
                <span className="text-slate-700">Grille</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <Zap size={18} className="text-slate-600" />
                <span className="text-slate-700">Heatmap</span>
              </label>
            </div>
          </div>
        </div>

        {/* Zone principale */}
        <div className="flex-1 flex flex-col p-6 gap-6">
          {/* Terrain */}
          <div className="flex-1 bg-slate-200 rounded-2xl p-4 shadow-inner">
            <FootballPitch
              players={players}
              setPlayers={setPlayers}
              drawings={drawings}
              setDrawings={setDrawings}
              selectedTool={selectedTool}
              currentColor={currentColor}
              brushSize={brushSize}
              isPlaying={isPlaying}
              currentFrame={currentFrame}
              showGrid={showGrid}
              showHeatmap={showHeatmap}
              ballPosition={ballPosition}
              setBallPosition={setBallPosition}
            />
          </div>

          {/* Timeline */}
          <Timeline
            frames={frames}
            currentFrame={currentFrame}
            setCurrentFrame={setCurrentFrame}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onAddFrame={handleAddFrame}
            onDeleteFrame={handleDeleteFrame}
            onDuplicateFrame={handleDuplicateFrame}
          />
        </div>

        {/* Panel vidéo (optionnel) */}
        <AnimatePresence>
          {showVideoPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-l border-slate-200 overflow-hidden"
            >
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Video size={18} />
                    Analyse vidéo
                  </h3>
                  <button onClick={() => setShowVideoPanel(false)}>
                    <Trash2 size={18} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="aspect-video bg-slate-900 rounded-xl mb-4 flex items-center justify-center">
                  <Play size={48} className="text-white/50" />
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-xs font-mono text-slate-500">12:34</span>
                    </div>
                    <p className="text-sm text-slate-700">But de Mbappé - Contre-attaque rapide</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-xs font-mono text-slate-500">23:45</span>
                    </div>
                    <p className="text-sm text-slate-700">Occasion manquée - Positionnement défensif</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">Commentaire audio</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      Enregistrer
                    </button>
                    <button className="flex-1 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-sm font-medium">
                      Écouter
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}