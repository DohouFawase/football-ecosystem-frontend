import { FormationTemplate } from "@/types/tactic";

export const formationTemplates: Record<string, FormationTemplate> = {
  '4-3-3': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 20, y: 75, number: 2, name: 'Latéral G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 40, y: 78, number: 3, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 4, x: 60, y: 78, number: 4, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 5, x: 80, y: 75, number: 5, name: 'Latéral D', position: 'DF', color: '#2563EB' },
      { id: 6, x: 35, y: 58, number: 6, name: 'Milieu G', position: 'MF', color: '#059669' },
      { id: 7, x: 50, y: 50, number: 7, name: 'Milieu C', position: 'MF', color: '#059669' },
      { id: 8, x: 65, y: 58, number: 8, name: 'Milieu D', position: 'MF', color: '#059669' },
      { id: 9, x: 20, y: 25, number: 9, name: 'Ailier G', position: 'FW', color: '#D97706' },
      { id: 10, x: 50, y: 18, number: 10, name: 'Attaquant', position: 'FW', color: '#D97706' },
      { id: 11, x: 80, y: 25, number: 11, name: 'Ailier D', position: 'FW', color: '#D97706' }
    ],
    description: 'Formation offensive avec 3 attaquants'
  },
  '4-4-2': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 20, y: 75, number: 2, name: 'Latéral G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 40, y: 78, number: 3, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 4, x: 60, y: 78, number: 4, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 5, x: 80, y: 75, number: 5, name: 'Latéral D', position: 'DF', color: '#2563EB' },
      { id: 6, x: 20, y: 52, number: 6, name: 'Milieu G', position: 'MF', color: '#059669' },
      { id: 7, x: 40, y: 50, number: 7, name: 'Milieu CG', position: 'MF', color: '#059669' },
      { id: 8, x: 60, y: 50, number: 8, name: 'Milieu CD', position: 'MF', color: '#059669' },
      { id: 9, x: 80, y: 52, number: 9, name: 'Milieu D', position: 'MF', color: '#059669' },
      { id: 10, x: 38, y: 22, number: 10, name: 'Attaquant G', position: 'FW', color: '#D97706' },
      { id: 11, x: 62, y: 22, number: 11, name: 'Attaquant D', position: 'FW', color: '#D97706' }
    ],
    description: 'Formation classique équilibrée'
  },
  '3-5-2': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 30, y: 75, number: 2, name: 'Défenseur G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 50, y: 78, number: 3, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 4, x: 70, y: 75, number: 4, name: 'Défenseur D', position: 'DF', color: '#2563EB' },
      { id: 5, x: 15, y: 52, number: 5, name: 'Piston G', position: 'MF', color: '#059669' },
      { id: 6, x: 35, y: 53, number: 6, name: 'Milieu G', position: 'MF', color: '#059669' },
      { id: 7, x: 50, y: 48, number: 7, name: 'Milieu C', position: 'MF', color: '#059669' },
      { id: 8, x: 65, y: 53, number: 8, name: 'Milieu D', position: 'MF', color: '#059669' },
      { id: 9, x: 85, y: 52, number: 9, name: 'Piston D', position: 'MF', color: '#059669' },
      { id: 10, x: 40, y: 22, number: 10, name: 'Attaquant G', position: 'FW', color: '#D97706' },
      { id: 11, x: 60, y: 22, number: 11, name: 'Attaquant D', position: 'FW', color: '#D97706' }
    ],
    description: 'Contrôle du milieu avec pistons'
  },
  '4-2-3-1': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 20, y: 75, number: 2, name: 'Latéral G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 40, y: 78, number: 3, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 4, x: 60, y: 78, number: 4, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 5, x: 80, y: 75, number: 5, name: 'Latéral D', position: 'DF', color: '#2563EB' },
      { id: 6, x: 38, y: 62, number: 6, name: 'Sentinelle G', position: 'MF', color: '#059669' },
      { id: 7, x: 62, y: 62, number: 7, name: 'Sentinelle D', position: 'MF', color: '#059669' },
      { id: 8, x: 22, y: 40, number: 8, name: 'Ailier G', position: 'MF', color: '#059669' },
      { id: 9, x: 50, y: 38, number: 9, name: 'Meneur', position: 'MF', color: '#059669' },
      { id: 10, x: 78, y: 40, number: 10, name: 'Ailier D', position: 'MF', color: '#059669' },
      { id: 11, x: 50, y: 18, number: 11, name: 'Avant-centre', position: 'FW', color: '#D97706' }
    ],
    description: 'Moderne avec double pivot'
  },
  '3-4-3': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 30, y: 75, number: 2, name: 'Défenseur G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 50, y: 78, number: 3, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 4, x: 70, y: 75, number: 4, name: 'Défenseur D', position: 'DF', color: '#2563EB' },
      { id: 5, x: 25, y: 55, number: 5, name: 'Milieu G', position: 'MF', color: '#059669' },
      { id: 6, x: 42, y: 52, number: 6, name: 'Milieu CG', position: 'MF', color: '#059669' },
      { id: 7, x: 58, y: 52, number: 7, name: 'Milieu CD', position: 'MF', color: '#059669' },
      { id: 8, x: 75, y: 55, number: 8, name: 'Milieu D', position: 'MF', color: '#059669' },
      { id: 9, x: 22, y: 22, number: 9, name: 'Ailier G', position: 'FW', color: '#D97706' },
      { id: 10, x: 50, y: 18, number: 10, name: 'Avant-centre', position: 'FW', color: '#D97706' },
      { id: 11, x: 78, y: 22, number: 11, name: 'Ailier D', position: 'FW', color: '#D97706' }
    ],
    description: 'Attaque puissante, défense à 3'
  },
  '5-3-2': {
    players: [
      { id: 1, x: 50, y: 90, number: 1, name: 'Gardien', position: 'GK', color: '#DC2626' },
      { id: 2, x: 15, y: 75, number: 2, name: 'Latéral G', position: 'DF', color: '#2563EB' },
      { id: 3, x: 32, y: 78, number: 3, name: 'Défenseur CG', position: 'DF', color: '#2563EB' },
      { id: 4, x: 50, y: 80, number: 4, name: 'Défenseur C', position: 'DF', color: '#2563EB' },
      { id: 5, x: 68, y: 78, number: 5, name: 'Défenseur CD', position: 'DF', color: '#2563EB' },
      { id: 6, x: 85, y: 75, number: 6, name: 'Latéral D', position: 'DF', color: '#2563EB' },
      { id: 7, x: 35, y: 52, number: 7, name: 'Milieu G', position: 'MF', color: '#059669' },
      { id: 8, x: 50, y: 48, number: 8, name: 'Milieu C', position: 'MF', color: '#059669' },
      { id: 9, x: 65, y: 52, number: 9, name: 'Milieu D', position: 'MF', color: '#059669' },
      { id: 10, x: 40, y: 22, number: 10, name: 'Attaquant G', position: 'FW', color: '#D97706' },
      { id: 11, x: 60, y: 22, number: 11, name: 'Attaquant D', position: 'FW', color: '#D97706' }
    ],
    description: 'Défensive avec 5 défenseurs'
  }
};