export interface Player {
  id: number;
  x: number;
  y: number;
  number: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  color: string;
}

export interface Arrow {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'move' | 'pass' | 'run';
  color: string;
}

export interface Formation {
  id: number;
  name: string;
  players: Player[];
  arrows: Arrow[];
  notes: string;
  createdAt: string;
}

export interface FormationTemplate {
  players: Player[];
  description: string;
}

export interface FormationStats {
  total: number;
  gk: number;
  df: number;
  mf: number;
  fw: number;
}