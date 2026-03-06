'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  Activity, 
  MapPin, 
  Zap, 
  Target, 
  TrendingUp, 
  Users,
  Settings,
  Download,
  RefreshCw,
  MousePointer2,
  Flame,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Brain,
  Layers,
  Clock,
  Trophy,
  Shield,
  Swords,
  ChevronRight,
  ChevronLeft,
  Radio,
  Wifi,
  AlertCircle,
  Crosshair,
  Share2,
  History,
  Sparkles,
  Box,
  Network,
  GitGraph,
  Timer,
  Eye,
  EyeOff,
  Aperture,
  Scan,
  ZapOff,
  Focus,
  Move3d,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Pentagon
} from 'lucide-react';

// Types ultra-avancés
type HeatPointType = 'movement' | 'pass' | 'shot' | 'tackle' | 'sprint' | 'pressure' | 'dribble' | 'cross' | 'interception';
type MatchPhase = 'warmup' | 'first_half' | 'halftime' | 'second_half' | 'finished';
type TacticalZone = 'defensive_third' | 'middle_third' | 'final_third' | 'box' | 'wing' | 'halfspace';
type ViewMode = '2d' | '3d' | 'network' | 'temporal' | 'cluster';
type ParticleEffect = 'none' | 'trail' | 'explosion' | 'pulse' | 'orbit';

interface HeatPoint {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
  type: HeatPointType;
  phase: MatchPhase;
  speed?: number;
  direction?: number;
  connectedTo?: string; // ID du joueur pour passes
}

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  color: string;
  heatPoints: HeatPoint[];
  stats: {
    distance: number;
    sprints: number;
    maxSpeed: number;
    passes: number;
    shots: number;
    tackles: number;
    xG: number;
    xA: number;
    interceptions: number;
    duelsWon: number;
  };
  fatigue: number;
  form: number;
  temperature: number; // 0-100, chaud/froid
}

interface Cluster {
  id: string;
  x: number;
  y: number;
  radius: number;
  intensity: number;
  type: HeatPointType;
  points: HeatPoint[];
}

interface PassNetwork {
  from: string;
  to: string;
  count: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  success: number;
}

interface TemporalSlice {
  time: number;
  points: HeatPoint[];
  intensity: number;
}

// Schémas de couleurs étendus avec gradients animés
const colorSchemes = {
  fire: ['#fee2e2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#991b1b', '#450a0a'],
  blue: ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1e40af'],
  green: ['#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#166534'],
  purple: ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#581c87'],
  gold: ['#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#92400e'],
  neon: ['#ccff00', '#9eff00', '#76ff03', '#64dd17', '#00e676', '#00c853', '#00b248'],
  heat: ['#ffffff', '#ffecd2', '#fcb69f', '#ff6b6b', '#ee5a6f', '#d63031', '#6c5ce7'],
  cyber: ['#00f5ff', '#00d9f5', '#00bbf9', '#0096c7', '#0077b6', '#023e8a', '#03045e']
};

// Zones tactiques étendues
const tacticalZones = [
  { id: 'defensive_third', name: 'Tiers Défensif', x: 0, y: 0, width: 266, height: 500, color: '#3b82f6', risk: 20 },
  { id: 'middle_third', name: 'Tiers Central', x: 266, y: 0, width: 268, height: 500, color: '#f59e0b', risk: 50 },
  { id: 'final_third', name: 'Tiers Offensif', x: 534, y: 0, width: 266, height: 500, color: '#ef4444', risk: 80 },
  { id: 'box', name: 'Surface', x: 534, y: 150, width: 266, height: 200, color: '#dc2626', risk: 95 },
  { id: 'left_halfspace', name: 'Demi-espace G', x: 200, y: 0, width: 150, height: 500, color: '#8b5cf6', risk: 60 },
  { id: 'right_halfspace', name: 'Demi-espace D', x: 450, y: 0, width: 150, height: 500, color: '#8b5cf6', risk: 60 }
];

// Composant principal sans header
export default function UltraAdvancedFootballHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('player1');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [matchTime, setMatchTime] = useState(0);
  const [matchPhase, setMatchPhase] = useState<MatchPhase>('warmup');
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('2d');
  const [selectedZone, setSelectedZone] = useState<TacticalZone | null>(null);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [passNetworks, setPassNetworks] = useState<PassNetwork[]>([]);
  const [temporalData, setTemporalData] = useState<TemporalSlice[]>([]);
  const [currentTimeSlice, setCurrentTimeSlice] = useState(0);
  const [particleEffect, setParticleEffect] = useState<ParticleEffect>('trail');
  const [showAR, setShowAR] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'pointer' | 'draw' | 'measure' | 'zone'>('pointer');

  const [config, setConfig] = useState({
    radius: 25,
    maxIntensity: 100,
    colorScheme: 'fire' as keyof typeof colorSchemes,
    showGrid: true,
    showZones: true,
    showHeatmap: true,
    showClusters: false,
    showNetwork: false,
    showTemporal: false,
    particleMode: false,
    arMode: false,
    autoRotate: false,
    zoom: 1,
    rotation: 0
  });

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'player1',
      name: 'Kylian Mbappé',
      number: 7,
      position: 'Attaquant',
      color: '#ef4444',
      heatPoints: [],
      stats: { distance: 0, sprints: 0, maxSpeed: 0, passes: 0, shots: 0, tackles: 0, xG: 0, xA: 0, interceptions: 0, duelsWon: 0 },
      fatigue: 15,
      form: 95,
      temperature: 85
    },
    {
      id: 'player2',
      name: 'N\'Golo Kanté',
      number: 13,
      position: 'Milieu',
      color: '#3b82f6',
      heatPoints: [],
      stats: { distance: 0, sprints: 0, maxSpeed: 0, passes: 0, shots: 0, tackles: 0, xG: 0, xA: 0, interceptions: 0, duelsWon: 0 },
      fatigue: 25,
      form: 88,
      temperature: 72
    },
    {
      id: 'player3',
      name: 'Virgil van Dijk',
      number: 4,
      position: 'Défenseur',
      color: '#22c55e',
      heatPoints: [],
      stats: { distance: 0, sprints: 0, maxSpeed: 0, passes: 0, shots: 0, tackles: 0, xG: 0, xA: 0, interceptions: 0, duelsWon: 0 },
      fatigue: 20,
      form: 92,
      temperature: 68
    },
    {
      id: 'player4',
      name: 'Kevin De Bruyne',
      number: 17,
      position: 'Milieu Offensif',
      color: '#f59e0b',
      heatPoints: [],
      stats: { distance: 0, sprints: 0, maxSpeed: 0, passes: 0, shots: 0, tackles: 0, xG: 0, xA: 0, interceptions: 0, duelsWon: 0 },
      fatigue: 30,
      form: 90,
      temperature: 78
    },
    {
      id: 'player5',
      name: 'Erling Haaland',
      number: 9,
      position: 'Attaquant',
      color: '#a855f7',
      heatPoints: [],
      stats: { distance: 0, sprints: 0, maxSpeed: 0, passes: 0, shots: 0, tackles: 0, xG: 0, xA: 0, interceptions: 0, duelsWon: 0 },
      fatigue: 18,
      form: 96,
      temperature: 92
    }
  ]);

  // Algorithmes avancés de clustering DBSCAN-like
  const calculateClusters = useCallback((points: HeatPoint[]): Cluster[] => {
    if (points.length < 5) return [];
    
    const clusters: Cluster[] = [];
    const visited = new Set<number>();
    const eps = 40; // distance max
    const minPoints = 3;

    for (let i = 0; i < points.length; i++) {
      if (visited.has(i)) continue;
      
      const neighbors = points.filter((p, idx) => 
        idx !== i && Math.hypot(p.x - points[i].x, p.y - points[i].y) < eps
      );

      if (neighbors.length >= minPoints) {
        const clusterPoints = [points[i], ...neighbors];
        const centerX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const centerY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        const radius = Math.max(...clusterPoints.map(p => 
          Math.hypot(p.x - centerX, p.y - centerY)
        )) + 20;

        clusters.push({
          id: `cluster-${clusters.length}`,
          x: centerX,
          y: centerY,
          radius,
          intensity: clusterPoints.reduce((sum, p) => sum + p.intensity, 0) / clusterPoints.length,
          type: clusterPoints[0].type,
          points: clusterPoints
        });

        clusterPoints.forEach(p => visited.add(points.indexOf(p)));
      }
    }

    return clusters;
  }, []);

  // Réseau de passes entre joueurs
  const calculatePassNetwork = useCallback((): PassNetwork[] => {
    const networks: PassNetwork[] = [];
    
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const p1 = players[i];
        const p2 = players[j];
        
        // Simuler des passes basées sur la proximité des heatmaps
        const connections = Math.floor(Math.random() * 15) + 5;
        
        if (connections > 0) {
          const avgX1 = p1.heatPoints.length > 0 ? 
            p1.heatPoints.reduce((sum, p) => sum + p.x, 0) / p1.heatPoints.length : 400;
          const avgY1 = p1.heatPoints.length > 0 ? 
            p1.heatPoints.reduce((sum, p) => sum + p.y, 0) / p1.heatPoints.length : 250;
          const avgX2 = p2.heatPoints.length > 0 ? 
            p2.heatPoints.reduce((sum, p) => sum + p.x, 0) / p2.heatPoints.length : 400;
          const avgY2 = p2.heatPoints.length > 0 ? 
            p2.heatPoints.reduce((sum, p) => sum + p.y, 0) / p2.heatPoints.length : 250;

          networks.push({
            from: p1.id,
            to: p2.id,
            count: connections,
            x1: avgX1,
            y1: avgY1,
            x2: avgX2,
            y2: avgY2,
            success: Math.random() * 30 + 70
          });
        }
      }
    }
    
    return networks;
  }, [players]);

  // Génération de données temporelles
  const generateTemporalData = useCallback(() => {
    const slices: TemporalSlice[] = [];
    for (let t = 0; t < 90; t += 5) { // tranches de 5 minutes
      const points: HeatPoint[] = [];
      const intensity = Math.sin(t / 15) * 50 + 50; // vague d'intensité
      
      for (let i = 0; i < 20; i++) {
        points.push({
          x: 200 + Math.random() * 400,
          y: 100 + Math.random() * 300,
          intensity: Math.random() * intensity,
          timestamp: t * 60000,
          type: Math.random() > 0.5 ? 'movement' : 'pass',
          phase: t < 45 ? 'first_half' : 'second_half'
        });
      }
      
      slices.push({ time: t, points, intensity });
    }
    setTemporalData(slices);
  }, []);

  // Génération avancée avec patterns réalistes
  const generateAdvancedData = useCallback((playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const newPoints: HeatPoint[] = [];
    
    // Patterns selon le poste avec variation temporelle
    const timeFactor = Math.sin(matchTime / 300) * 0.5 + 0.5; // 0-1 selon le temps
    
    if (player.position === 'Attaquant') {
      // Plus actif en fin de match si gagnant
      const activityMultiplier = timeFactor > 0.7 ? 1.5 : 1;
      
      for (let i = 0; i < 30 * activityMultiplier; i++) {
        const angle = Math.random() * Math.PI - Math.PI / 2; // Vers l'avant
        const dist = Math.random() * 100;
        newPoints.push({
          x: 600 + Math.cos(angle) * dist,
          y: 250 + Math.sin(angle) * dist * 2,
          intensity: Math.random() * 80 + 20,
          timestamp: Date.now(),
          type: Math.random() > 0.7 ? 'shot' : 'movement',
          phase: matchPhase,
          speed: 20 + Math.random() * 15,
          direction: angle * 180 / Math.PI
        });
      }
    } else if (player.position === 'Milieu') {
      // Couverture totale avec préférence centrale
      for (let i = 0; i < 40; i++) {
        const x = 300 + Math.random() * 200;
        const y = 150 + Math.random() * 200;
        newPoints.push({
          x, y,
          intensity: Math.random() * 70 + 30,
          timestamp: Date.now(),
          type: Math.random() > 0.6 ? 'pass' : 'pressure',
          phase: matchPhase,
          speed: 10 + Math.random() * 10
        });
      }
    }

    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { 
        ...p, 
        heatPoints: [...p.heatPoints.slice(-300), ...newPoints],
        stats: {
          ...p.stats,
          distance: p.stats.distance + newPoints.length * 0.05,
          sprints: p.stats.sprints + newPoints.filter(pt => pt.speed && pt.speed > 25).length,
          temperature: Math.min(100, p.temperature + newPoints.length * 0.1)
        }
      } : p
    ));

    // Recalculer clusters et réseau
    const currentPlayer = players.find(p => p.id === playerId);
    if (currentPlayer) {
      const newClusters = calculateClusters([...currentPlayer.heatPoints, ...newPoints]);
      setClusters(newClusters);
    }
    setPassNetworks(calculatePassNetwork());
  }, [players, matchTime, matchPhase, calculateClusters, calculatePassNetwork]);

  // Chronomètre et simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && matchPhase !== 'finished') {
      interval = setInterval(() => {
        setMatchTime(prev => {
          const newTime = prev + 1;
          if (newTime === 2700) setMatchPhase('halftime');
          if (newTime === 5400) setMatchPhase('finished');
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, matchPhase]);

  // Auto-génération
  useEffect(() => {
    if (isPlaying && matchPhase !== 'halftime' && matchPhase !== 'finished') {
      const interval = setInterval(() => {
        players.forEach(p => {
          if (Math.random() > 0.6) generateAdvancedData(p.id);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, matchPhase, players, generateAdvancedData]);

  // Rotation automatique en mode 3D
  useEffect(() => {
    if (config.autoRotate && viewMode === '3d') {
      const interval = setInterval(() => {
        setConfig(prev => ({ ...prev, rotation: (prev.rotation + 0.5) % 360 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [config.autoRotate, viewMode]);

  // Rendu Canvas ultra-avancé
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear avec effet de fade pour trails
    if (particleEffect === 'trail') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Sauvegarder contexte pour transformations
    ctx.save();

    // Zoom et rotation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(config.zoom, config.zoom);
    ctx.rotate((config.rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Fond selon le mode
    if (viewMode === '3d') {
      // Perspective isométrique simulée
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(0.5, '#e2e8f0');
      gradient.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Dessiner le terrain avec effets
    drawAdvancedPitch(ctx, canvas.width, canvas.height);

    // Mode réseau de passes
    if (config.showNetwork || viewMode === 'network') {
      drawPassNetwork(ctx);
    }

    // Mode temporel
    if (config.showTemporal || viewMode === 'temporal') {
      drawTemporalVisualization(ctx);
    }

    // Heatmap principale
    if (config.showHeatmap) {
      const player = players.find(p => p.id === selectedPlayer);
      if (player) {
        if (viewMode === '3d') {
          draw3DHeatmap(ctx, player);
        } else {
          drawAdvancedHeatmap(ctx, player);
        }
      }
    }

    // Clusters
    if (config.showClusters || viewMode === 'cluster') {
      drawClusters(ctx);
    }

    // Mode AR - Overlay d'informations
    if (config.arMode) {
      drawAROverlay(ctx);
    }

    // Particules
    if (config.particleMode) {
      drawParticles(ctx);
    }

    ctx.restore();

    animationRef.current = requestAnimationFrame(renderCanvas);
  }, [config, viewMode, players, selectedPlayer, clusters, passNetworks, temporalData, particleEffect]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(renderCanvas);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [renderCanvas]);

  // Dessin du terrain avancé
  const drawAdvancedPitch = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Effet de profondeur en 3D
    if (viewMode === '3d') {
      ctx.save();
      ctx.transform(1, 0.3, 0, 1, 0, -50);
    }

    // Zones tactiques avec glow
    if (config.showZones) {
      tacticalZones.forEach(zone => {
        const gradient = ctx.createLinearGradient(zone.x, 0, zone.x + zone.width, 0);
        gradient.addColorStop(0, zone.color + '15');
        gradient.addColorStop(0.5, zone.color + '25');
        gradient.addColorStop(1, zone.color + '15');
        ctx.fillStyle = gradient;
        ctx.fillRect(zone.x, 50, zone.width, height - 100);
        
        if (selectedZone === zone.id) {
          ctx.strokeStyle = zone.color;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 10;
          ctx.shadowColor = zone.color;
          ctx.strokeRect(zone.x, 50, zone.width, height - 100);
          ctx.shadowBlur = 0;
        }
      });
    }

    // Lignes du terrain avec style selon le thème
    ctx.strokeStyle = config.colorScheme === 'neon' || config.colorScheme === 'cyber' ? '#00ff88' : '#334155';
    ctx.lineWidth = viewMode === '3d' ? 3 : 2;
    ctx.shadowBlur = config.colorScheme === 'neon' ? 15 : 0;
    ctx.shadowColor = '#00ff88';

    // Contour
    ctx.strokeRect(50, 50, width - 100, height - 100);

    // Ligne médiane avec effet
    ctx.beginPath();
    ctx.moveTo(width / 2, 50);
    ctx.lineTo(width / 2, height - 50);
    ctx.stroke();

    // Cercle central avec glow
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 70, 0, Math.PI * 2);
    ctx.stroke();

    // Surfaces
    ctx.strokeRect(50, height / 2 - 110, 110, 220);
    ctx.strokeRect(50, height / 2 - 55, 37, 110);
    ctx.strokeRect(width - 160, height / 2 - 110, 110, 220);
    ctx.strokeRect(width - 87, height / 2 - 55, 37, 110);

    // Grille tactique animée
    if (config.showGrid) {
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 5]);
      const offset = (Date.now() / 50) % 15;
      
      for (let x = 50; x <= width - 50; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, height - 50);
        ctx.stroke();
      }
      for (let y = 50 + offset; y <= height - 50; y += 50) {
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(width - 50, y);
        ctx.stroke();
      }
    }

    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
    
    if (viewMode === '3d') {
      ctx.restore();
    }
  };

  // Heatmap 2D avancée avec effets de lumière
  const drawAdvancedHeatmap = (ctx: CanvasRenderingContext2D, player: Player) => {
    if (player.heatPoints.length === 0) return;

    const colors = colorSchemes[config.colorScheme];
    const timeNow = Date.now();

    // Trier par intensité pour dessiner les moins intenses d'abord
    const sortedPoints = [...player.heatPoints].sort((a, b) => a.intensity - b.intensity);

    sortedPoints.forEach((point, index) => {
      const age = (timeNow - point.timestamp) / 1000;
      const fade = Math.max(0.3, 1 - age / 600);
      
      // Effet de pulsation pour les points récents
      const pulse = age < 5 ? Math.sin(Date.now() / 200) * 0.3 + 0.7 : 1;
      
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, config.radius * 2 * fade
      );

      const intensity = (point.intensity / config.maxIntensity) * fade * pulse;
      const colorIndex = Math.min(Math.floor(intensity * (colors.length - 1)), colors.length - 1);
      const color = colors[colorIndex] || colors[0];

      // Ajouter de la transparence hex
      const alpha = Math.floor(intensity * 200).toString(16).padStart(2, '0');
      
      gradient.addColorStop(0, color + alpha);
      gradient.addColorStop(0.4, color + '40');
      gradient.addColorStop(1, color + '00');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, config.radius * fade * (1 + pulse * 0.2), 0, Math.PI * 2);
      ctx.fill();

      // Effet de brillance pour points à haute intensité
      if (point.intensity > 80 && age < 10) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fillStyle = color + '80';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  };

  // Heatmap 3D isométrique
  const draw3DHeatmap = (ctx: CanvasRenderingContext2D, player: Player) => {
    if (player.heatPoints.length === 0) return;

    const colors = colorSchemes[config.colorScheme];
    
    // Trier par Y pour effet de profondeur
    const sortedPoints = [...player.heatPoints].sort((a, b) => a.y - b.y);

    sortedPoints.forEach(point => {
      const height = (point.intensity / 100) * 50; // Hauteur 3D
      const colorIndex = Math.min(Math.floor((point.intensity / config.maxIntensity) * (colors.length - 1)), colors.length - 1);
      const color = colors[colorIndex];

      // Dessiner colonne 3D
      ctx.fillStyle = color + '60';
      ctx.beginPath();
      ctx.ellipse(point.x, point.y - height, config.radius, config.radius * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dessiner le dessus
      ctx.fillStyle = color + '90';
      ctx.beginPath();
      ctx.ellipse(point.x, point.y - height, config.radius * 0.8, config.radius * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Dessiner le réseau de passes
  const drawPassNetwork = (ctx: CanvasRenderingContext2D) => {
    passNetworks.forEach(network => {
      const opacity = network.count / 20;
      
      // Ligne de passe avec épaisseur variable
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.lineWidth = network.count / 3;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(network.x1, network.y1);
      
      // Courbe de Bézier pour les passes
      const midX = (network.x1 + network.x2) / 2;
      const midY = (network.y1 + network.y2) / 2 - 50; // Courbure vers le haut
      
      ctx.quadraticCurveTo(midX, midY, network.x2, network.y2);
      ctx.stroke();

      // Point de départ
      ctx.fillStyle = players.find(p => p.id === network.from)?.color || '#3b82f6';
      ctx.beginPath();
      ctx.arc(network.x1, network.y1, 8, 0, Math.PI * 2);
      ctx.fill();

      // Point d'arrivée
      ctx.fillStyle = players.find(p => p.id === network.to)?.color || '#3b82f6';
      ctx.beginPath();
      ctx.arc(network.x2, network.y2, 8, 0, Math.PI * 2);
      ctx.fill();

      // Label du nombre de passes
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${network.count}`, midX, midY - 10);
    });
  };

  // Visualisation temporelle
  const drawTemporalVisualization = (ctx: CanvasRenderingContext2D) => {
    const slice = temporalData[currentTimeSlice];
    if (!slice) return;

    // Timeline en bas
    const timelineY = 480;
    const segmentWidth = 700 / temporalData.length;

    temporalData.forEach((s, i) => {
      const x = 50 + i * segmentWidth;
      const height = (s.intensity / 100) * 30;
      
      ctx.fillStyle = i === currentTimeSlice ? '#ef4444' : '#cbd5e1';
      ctx.fillRect(x, timelineY - height, segmentWidth - 2, height);
    });

    // Points de la tranche actuelle
    slice.points.forEach(point => {
      ctx.fillStyle = `rgba(245, 158, 11, ${point.intensity / 100})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Dessiner les clusters
  const drawClusters = (ctx: CanvasRenderingContext2D) => {
    clusters.forEach((cluster, i) => {
      // Cercle de cluster avec animation
      const pulse = Math.sin(Date.now() / 500 + i) * 5;
      
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(cluster.x, cluster.y, cluster.radius + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Remplissage semi-transparent
      const gradient = ctx.createRadialGradient(
        cluster.x, cluster.y, 0,
        cluster.x, cluster.y, cluster.radius
      );
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cluster.x, cluster.y, cluster.radius, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${cluster.type.toUpperCase()} ${cluster.points.length}`, 
        cluster.x, 
        cluster.y - cluster.radius - 10
      );
    });
  };

  // Overlay AR
  const drawAROverlay = (ctx: CanvasRenderingContext2D) => {
    const player = players.find(p => p.id === selectedPlayer);
    if (!player) return;

    // Stats flottantes près des zones chaudes
    const hotZones = player.heatPoints.slice(-10);
    
    hotZones.forEach((point, i) => {
      if (i % 3 === 0) { // Pas trop d'overlays
        const x = point.x + 20;
        const y = point.y - 20;
        
        // Fond de l'overlay
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.beginPath();
        ctx.roundRect(x, y, 80, 40, 8);
        ctx.fill();
        
        // Ligne de connexion
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(x, y + 20);
        ctx.stroke();
        
        // Texte
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`⚡ ${Math.round(point.speed || 0)} km/h`, x + 8, y + 16);
        ctx.fillText(`🔥 ${Math.round(point.intensity)}%`, x + 8, y + 30);
      }
    });
  };

  // Système de particules avancé
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    const time = Date.now() / 1000;
    
    for (let i = 0; i < 30; i++) {
      const angle = (time + i * 0.2) * 2;
      const radius = 100 + Math.sin(time + i) * 50;
      const x = 400 + Math.cos(angle) * radius;
      const y = 250 + Math.sin(angle) * radius * 0.6;
      
      const alpha = (Math.sin(time * 2 + i) + 1) / 2;
      
      ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Gestion souris avancée
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    setMousePos({ x: Math.round(x), y: Math.round(y) });

    // Détection de zone
    const zone = tacticalZones.find(z => 
      x >= z.x && x <= z.x + z.width && y >= 50 && y <= 450
    );
    setSelectedZone(zone?.id as TacticalZone || null);

    if (isRecording && selectedTool === 'draw') {
      const newPoint: HeatPoint = {
        x, y,
        intensity: 60 + Math.random() * 40,
        timestamp: Date.now(),
        type: Math.random() > 0.8 ? 'sprint' : 'movement',
        phase: matchPhase,
        speed: 15 + Math.random() * 20,
        direction: Math.atan2(y - 250, x - 400) * 180 / Math.PI
      };

      setPlayers(prev => prev.map(p => 
        p.id === selectedPlayer 
          ? { ...p, heatPoints: [...p.heatPoints.slice(-400), newPoint] }
          : p
      ));
    }
  }, [isRecording, selectedPlayer, matchPhase, selectedTool]);

  // Formatage temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPlayer = players.find(p => p.id === selectedPlayer);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white p-4">
      
      {/* Layout sans header - Controls flottants */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-2rem)]">
        
        {/* Sidebar Gauche - Ultra compacte */}
        <div className="col-span-2 space-y-3 overflow-y-auto pr-1">
          
          {/* Joueurs - Cards compactes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Users className="w-3 h-3 text-orange-500" />
                ÉQUIPE
              </h3>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {players.length} JOUEURS
              </span>
            </div>
            
            <div className="space-y-1.5">
              {players.map(player => (
                <button
                  key={player.id}
                  onClick={() => setSelectedPlayer(player.id)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-left ${
                    selectedPlayer === player.id 
                      ? 'bg-orange-50 border border-orange-200 shadow-sm' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: player.color }}
                  >
                    {player.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{player.name}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Activity className="w-2.5 h-2.5" />
                      {player.temperature.toFixed(0)}°
                    </div>
                  </div>
                  {selectedPlayer === player.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Modes de Vue - Innovant */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-purple-500" />
              MODE VISUEL
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: '2d', icon: Square, label: '2D Standard' },
                { id: '3d', icon: Box, label: '3D Iso' },
                { id: 'network', icon: Network, label: 'Réseau' },
                { id: 'temporal', icon: Timer, label: 'Temps' },
                { id: 'cluster', icon: Hexagon, label: 'Clusters' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as ViewMode)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                    viewMode === mode.id 
                      ? 'bg-purple-50 border border-purple-200 text-purple-700' 
                      : 'bg-slate-50 border border-transparent hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  <span className="text-[9px] font-bold">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Outils de dessin */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
              <MousePointer2 className="w-3 h-3 text-blue-500" />
              OUTILS
            </h3>
            <div className="flex gap-1">
              {[
                { id: 'pointer', icon: MousePointer2 },
                { id: 'draw', icon: PencilIcon },
                { id: 'measure', icon: Crosshair },
                { id: 'zone', icon: Scan }
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={`flex-1 p-2 rounded-lg transition-all ${
                    selectedTool === tool.id 
                      ? 'bg-blue-50 border border-blue-200 text-blue-600' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <tool.icon className="w-4 h-4 mx-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Configuration rapide */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Settings className="w-3 h-3 text-slate-500" />
              RÉGLAGES
            </h3>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-600">Rayon</span>
                <span className="text-[10px] font-bold text-slate-900">{config.radius}px</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                value={config.radius}
                onChange={(e) => setConfig(prev => ({ ...prev, radius: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 rounded-full accent-orange-500"
              />
            </div>

            <div className="grid grid-cols-4 gap-1 pt-1">
              {(['fire', 'blue', 'purple', 'neon'] as const).map(scheme => (
                <button
                  key={scheme}
                  onClick={() => setConfig(prev => ({ ...prev, colorScheme: scheme }))}
                  className={`h-6 rounded border-2 transition-all ${
                    config.colorScheme === scheme ? 'border-slate-900' : 'border-transparent'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${colorSchemes[scheme][0]}, ${colorSchemes[scheme][3]})` 
                  }}
                />
              ))}
            </div>
          </div>

          {/* Toggles avancés */}
          <div className="bg-slate-900 rounded-xl shadow-sm p-3 space-y-2">
            {[
              { key: 'showZones', label: 'Zones', icon: Target },
              { key: 'showNetwork', label: 'Passes', icon: Share2 },
              { key: 'showClusters', label: 'Clusters', icon: Hexagon },
              { key: 'arMode', label: 'Mode AR', icon: Eye },
              { key: 'particleMode', label: 'Particules', icon: Sparkles },
              { key: 'autoRotate', label: 'Rotation', icon: RotateCcw }
            ].map(({ key, label, icon: Icon }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-[10px] text-slate-300 group-hover:text-white">
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
                <div className={`w-7 h-4 rounded-full transition-colors relative ${
                  config[key as keyof typeof config] ? 'bg-orange-500' : 'bg-slate-700'
                }`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                    config[key as keyof typeof config] ? 'left-3.5' : 'left-0.5'
                  }`} />
                </div>
                <input 
                  type="checkbox" 
                  checked={config[key as keyof typeof config] as boolean}
                  onChange={(e) => setConfig(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Zone Centrale - Canvas Principal */}
        <div className="col-span-7 relative">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full relative">
            
            {/* Overlay HUD */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <div className="bg-slate-900/90 backdrop-blur text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono">
                <MapPin className="w-3 h-3 text-orange-400" />
                X:{mousePos.x} Y:{mousePos.y}
              </div>
              
              {selectedZone && (
                <div className="bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold animate-in slide-in-from-left-2">
                  <Crosshair className="w-3 h-3" />
                  {tacticalZones.find(z => z.id === selectedZone)?.name}
                </div>
              )}
            </div>

            {/* Contrôles temps */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
              <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-mono font-bold">{formatTime(matchTime)}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {matchPhase.replace('_', ' ')}
                  </div>
                </div>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2 rounded-lg ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => generateAdvancedData(selectedPlayer)}
                  className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                </button>
                <button 
                  onClick={() => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const link = document.createElement('a');
                      link.download = `heatmap-${Date.now()}.png`;
                      link.href = canvas.toDataURL();
                      link.click();
                    }
                  }}
                  className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-white transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Timeline pour mode temporel */}
            {viewMode === 'temporal' && (
              <div className="absolute bottom-20 left-4 right-4 z-20 bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">TIMELINE</span>
                  <input 
                    type="range" 
                    min="0" 
                    max={temporalData.length - 1} 
                    value={currentTimeSlice}
                    onChange={(e) => setCurrentTimeSlice(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-200 rounded-full accent-orange-500"
                  />
                  <span className="text-xs font-mono text-slate-600">
                    {temporalData[currentTimeSlice]?.time || 0}min
                  </span>
                </div>
              </div>
            )}

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseMove={handleMouseMove}
              className="w-full h-full cursor-crosshair touch-none"
              style={{ imageRendering: 'crisp-edges' }}
            />

            {/* Légende flottante */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
              <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Intensité</span>
                <div className="flex items-center gap-0.5">
                  {colorSchemes[config.colorScheme].slice(0, 5).map((color, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-2 first:rounded-l-sm last:rounded-r-sm" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex gap-2 text-[10px] font-bold text-slate-600">
                  <span>MIN</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>MAX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Droite - Analytics temps réel */}
        <div className="col-span-3 space-y-3 overflow-y-auto pl-1">
          
          {/* Stats principales */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Activity className="w-3 h-3 text-green-500" />
                PERFORMANCE
              </h3>
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Distance', value: `${currentPlayer?.stats.distance.toFixed(2)}km`, color: 'blue' },
                { label: 'Vitesse Max', value: `${currentPlayer?.stats.maxSpeed.toFixed(1)}km/h`, color: 'orange' },
                { label: 'xG', value: currentPlayer?.stats.xG.toFixed(2), color: 'green' },
                { label: 'Passes', value: currentPlayer?.stats.passes, color: 'purple' },
                { label: 'Tirs', value: currentPlayer?.stats.shots, color: 'red' },
                { label: 'Duels', value: currentPlayer?.stats.duelsWon, color: 'yellow' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">{stat.label}</div>
                  <div className="text-sm font-black text-slate-900">{stat.value || '0.00'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Temperature */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-3 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                TEMPÉRATURE
              </h3>
              <span className="text-lg font-black">{currentPlayer?.temperature.toFixed(0)}°</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${currentPlayer?.temperature || 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] mt-1 opacity-80">
              <span>Froid</span>
              <span>Brûlant</span>
            </div>
          </div>

          {/* Clusters détectés */}
          {clusters.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                <GitGraph className="w-3 h-3 text-purple-500" />
                ZONES DENSITÉ ({clusters.length})
              </h3>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {clusters.map((cluster, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      cluster.type === 'shot' ? 'bg-red-500' :
                      cluster.type === 'pass' ? 'bg-blue-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-slate-900 truncate capitalize">{cluster.type}</div>
                      <div className="text-[9px] text-slate-500">{cluster.points.length} points</div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-700">
                      {Math.round(cluster.intensity)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights IA générés */}
          <div className="bg-slate-900 rounded-xl shadow-lg p-3 text-white">
            <h3 className="text-xs font-bold mb-2 flex items-center gap-1 text-purple-400">
              <Brain className="w-3 h-3" />
              IA ANALYTICS
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-white/10 rounded-lg border border-white/10">
                <div className="text-[9px] text-purple-300 font-bold mb-0.5">PATTERN DÉTECTÉ</div>
                <div className="text-[10px] leading-tight">
                  Forte activité dans les demi-espaces. Conseil: Exploiter les triangles de passe.
                </div>
              </div>
              <div className="p-2 bg-white/10 rounded-lg border border-white/10">
                <div className="text-[9px] text-green-300 font-bold mb-0.5">OPPORTUNITÉ</div>
                <div className="text-[10px] leading-tight">
                  Espace disponible entre les lignes. Risque de contre-attaque élevé.
                </div>
              </div>
            </div>
          </div>

          {/* Actions récentes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
              <History className="w-3 h-3 text-slate-500" />
              ACTIONS RÉCENTES
            </h3>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {currentPlayer?.heatPoints.slice(-5).reverse().map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    point.type === 'shot' ? 'bg-red-500' :
                    point.type === 'pass' ? 'bg-blue-500' :
                    point.type === 'sprint' ? 'bg-yellow-500' :
                    'bg-slate-400'
                  }`} />
                  <span className="font-medium text-slate-700 capitalize w-16">{point.type}</span>
                  <span className="text-slate-400 font-mono">{Math.round(point.x)},{Math.round(point.y)}</span>
                  <span className="ml-auto font-bold text-slate-900">{Math.round(point.intensity)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contrôles Zoom/Rotate */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
            <h3 className="text-xs font-bold text-slate-900 mb-2">NAVIGATION</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, zoom: Math.max(0.5, prev.zoom - 0.1) }))}
                className="flex-1 p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mx-auto text-slate-600" />
              </button>
              <div className="flex-1 flex items-center justify-center text-xs font-bold text-slate-900">
                {Math.round(config.zoom * 100)}%
              </div>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, zoom: Math.min(2, prev.zoom + 0.1) }))}
                className="flex-1 p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4 mx-auto text-slate-600" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Icône manquante
function PencilIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}