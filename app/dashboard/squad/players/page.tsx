"use client"
import React, { useState, useMemo, useRef } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Shield, 
  Swords, 
  UserX, 
  ArrowRightLeft, 
  Clock, 
  MapPin, 
  Calendar,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  Filter,
  Search,
  X,
  HeartPulse,
  DollarSign,
  BarChart3,
  Users,
  GitCompare,
  AlertTriangle,
  History,
  Star,
  Shirt,
  Footprints,
  TrendingDown,
  CheckCircle2,
  Phone,
  FileText,
  Send,
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  UserCheck,
  Ban,
  MessageSquare,
  Plus,
  Minus,
  RefreshCw,
  Download,
  Printer,
  Eye,
  FilePlus,
  FileSignature,
  Stethoscope,
  GraduationCap,
  Plane,
  Home,
  Wallet,
  Percent,
  ShieldCheck,
  FileSearch,
  PenTool,
  Save,
  Share2,
  CheckSquare,
  XSquare,
  AlertCircle
} from 'lucide-react';

type DocumentType = 
  | 'player_card' 
  | 'transfer_proposal' 
  | 'contract_draft' 
  | 'medical_certificate' 
  | 'financial_agreement'
  | 'agent_mandate'
  | 'transfer_agreement'
  | 'loan_agreement'
  | 'termination_letter'
  | 'renewal_offer';

  interface Document {
  id: string;
  type: DocumentType;
  title: string;
  generatedAt: string;
  status: 'draft' | 'sent' | 'signed' | 'archived';
  content?: string;
  attachments: string[];
  signatures: { role: string; signed: boolean; date?: string }[];
}
interface Player {
  id: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  positionLabel: string;
  jerseyNumber: number;
  isInjured: boolean;
  injuryDetails?: string;
  injuryDuration?: number;
  country: string;
  flag: string;
  age: number;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  cleanSheets?: number;
  marketValue: number;
  form: 'excellent' | 'good' | 'average' | 'poor';
  transferStatus: 'available' | 'unavailable' | 'loan' | 'wanted';
  contractEnd: string;
  height: number;
  weight: number;
  preferredFoot: 'left' | 'right' | 'both';
  // NEW: Performance history for charts
  formHistory: number[];
  // NEW: Physical stats
  speed: number;
  stamina: number;
  strength: number;
  // NEW: Contract alerts
  contractMonthsLeft: number;
  // NEW: Recent matches
  lastMatches: { opponent: string; result: string; rating: number; date: string }[];
   currentSalary?: number;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  releaseClause?: number;
  offers: TransferOffer[];
  contractNegotiations: ContractNegotiation[];
   documents: Document[];
  medicalHistory: { date: string; type: string; result: string; doctor: string }[];
  insuranceStatus: 'valid' | 'expired' | 'pending';
  workPermit?: { country: string; expiry: string; status: string };
}

interface TransferOffer {
  id: string;
  fromClub: string;
  amount: number;
  type: 'transfer' | 'loan';
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  date: string;
  notes?: string;
}
type TransferStage = 'idle' | 'contacting_agent' | 'negotiating' | 'medical_pending' | 'contract_signing' | 'completed' | 'rejected';

interface ContractNegotiation {
  id: string;
  playerId: number;
  type: ContractAction;
  proposedSalary: number;
  proposedDuration: number;
  status: 'draft' | 'sent' | 'under_review' | 'accepted' | 'rejected';
  agentContacted: boolean;
  documentsSent: boolean;
  lastUpdate: string;
  history: { date: string; action: string; note: string }[];
}
type ContractAction = 'renew' | 'extend' | 'terminate' | 'renegotiate';


type ViewMode = 'grid' | 'list' | 'tactical';
type FilterPosition = 'all' | 'GK' | 'DEF' | 'MID' | 'FWD';
type SortOption = 'rating' | 'goals' | 'assists' | 'value' | 'age';

const getFormColor = (form: string) => {
  switch (form) {
    case 'excellent': return 'bg-emerald-500';
    case 'good': return 'bg-blue-500';
    case 'average': return 'bg-yellow-500';
    case 'poor': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getFormLabel = (form: string) => {
  switch (form) {
    case 'excellent': return 'Exceptionnelle';
    case 'good': return 'Bonne';
    case 'average': return 'Moyenne';
    case 'poor': return 'Faible';
    default: return 'Inconnue';
  }
};

const formatValue = (value: number) => {
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
  return `€${value}`;
};

// NEW: Radar Chart Component for Player Comparison
const RadarChart = ({ player }: { player: Player }) => {
  const stats = [
    { label: 'Vitesse', value: player.speed, max: 100 },
    { label: 'Endurance', value: player.stamina, max: 100 },
    { label: 'Force', value: player.strength, max: 100 },
    { label: 'Technique', value: player.rating * 10, max: 100 },
    { label: 'Tactique', value: player.assists * 5 + 50, max: 100 },
    { label: 'Mental', value: player.matches > 20 ? 85 : 70, max: 100 },
  ];

  const points = stats.map((stat, i) => {
    const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
    const radius = (stat.value / stat.max) * 80;
    return {
      x: 100 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle),
    };
  });

  const pathData = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 200 200" className="w-full h-64">
      {[20, 40, 60, 80].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {stats.map((_, i) => {
        const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
        const x2 = 100 + 80 * Math.cos(angle);
        const y2 = 100 + 80 * Math.sin(angle);
        return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <path d={pathData} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />)}
      {stats.map((stat, i) => {
        const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
        const x = 100 + 95 * Math.cos(angle);
        const y = 100 + 95 * Math.sin(angle);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-xs fill-slate-600 font-medium">
            {stat.label}
          </text>
        );
      })}
    </svg>
  );
};

// NEW: Mini Sparkline Chart
const Sparkline = ({ data }: { data: number[] }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        points={points}
      />
      <circle cx="100" cy={100 - ((data[data.length - 1] - min) / range) * 80 - 10} r="3" fill="#3b82f6" />
    </svg>
  );
};
// NEW: Document Generator Component
const DocumentGenerator = ({ 
  player, 
  onClose, 
  onGenerate 
}: { 
  player: Player; 
  onClose: () => void;
  onGenerate: (doc: Document) => void;
}) => {
  const [selectedType, setSelectedType] = useState<DocumentType>('player_card');
  const [previewMode, setPreviewMode] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const documentTemplates = {
    player_card: {
      title: 'Fiche Joueur Professionnelle',
      icon: FileText,
      description: 'Document complet avec stats, historique et évaluation',
      required: ['stats', 'photos', 'medical'],
      color: 'blue'
    },
    transfer_proposal: {
      title: 'Proposition de Transfert',
      icon: ArrowRightLeft,
      description: 'Offre officielle envoyée à un club',
      required: ['offer_details', 'player_consent', 'financial_terms'],
      color: 'emerald'
    },
    contract_draft: {
      title: 'Contrat de Travail (Brouillon)',
      icon: FileSignature,
      description: 'Contrat avec salaire, durée et clauses',
      required: ['salary', 'duration', 'bonuses', 'image_rights'],
      color: 'amber'
    },
    medical_certificate: {
      title: 'Certificat Médical',
      icon: Stethoscope,
      description: 'Attestation de visite médicale et aptitude',
      required: ['exam_date', 'doctor', 'results', 'fitness_status'],
      color: 'rose'
    },
    financial_agreement: {
      title: 'Accord Financier',
      icon: Wallet,
      description: 'Détails du transfert, montants et échéances',
      required: ['transfer_fee', 'installments', 'bonuses', 'sell_on_clause'],
      color: 'purple'
    },
    agent_mandate: {
      title: 'Mandat d\'Agent',
      icon: Briefcase,
      description: 'Autorisation de représentation par l\'agent',
      required: ['agent_details', 'commission_rate', 'duration', 'exclusivity'],
      color: 'orange'
    },
    transfer_agreement: {
      title: 'Accord de Transfert',
      icon: CheckCircle2,
      description: 'Contrat final entre les deux clubs',
      required: ['clubs', 'player', 'fee', 'payment_terms', 'conditions'],
      color: 'green'
    },
    loan_agreement: {
      title: 'Contrat de Prêt',
      icon: Clock,
      description: 'Accord de prêt avec option d\'achat',
      required: ['duration', 'loan_fee', 'salary_split', 'oa_amount'],
      color: 'cyan'
    },
    termination_letter: {
      title: 'Lettre de Résiliation',
      icon: XSquare,
      description: 'Rupture conventionnelle de contrat',
      required: ['reason', 'compensation', 'notice_period', 'mutual_consent'],
      color: 'red'
    },
    renewal_offer: {
      title: 'Proposition de Renouvellement',
      icon: RefreshCw,
      description: 'Offre de prolongation de contrat',
      required: ['new_duration', 'new_salary', 'bonuses', 'release_clause'],
      color: 'teal'
    }
  };

  const generateDocumentContent = (type: DocumentType) => {
    const date = new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const templates = {
      player_card: `
FC ÉTOILE DORÉE - FICHE JOUEUR PROFESSIONNELLE
================================================

RÉFÉRENCE: FCED-${player.id}-${new Date().getFullYear()}
DATE D'ÉMISSION: ${date}

IDENTITÉ
--------
Nom complet: ${player.name}
Nationalité: ${player.country} ${player.flag}
Date de naissance: ${player.age} ans
Poste: ${player.positionLabel}
Numéro: ${player.jerseyNumber}
Pied fort: ${player.preferredFoot === 'left' ? 'Gauche' : player.preferredFoot === 'right' ? 'Droit' : 'Ambidextre'}

PHYSIQUE
--------
Taille: ${player.height} cm
Poids: ${player.weight} kg
IMC: ${(player.weight / ((player.height/100) ** 2)).toFixed(1)}

PERFORMANCES 2024/2025
----------------------
Matchs joués: ${player.matches}
Minutes: ${player.minutesPlayed}
Buts: ${player.goals}
Passes décisives: ${player.assists}
Cartons jaunes: ${player.yellowCards}
Cartons rouges: ${player.redCards}
Note moyenne: ${player.rating}/10

VALEUR & CONTRAT
----------------
Valeur marchande: ${formatValue(player.marketValue)}
Salaire mensuel: ${player.currentSalary?.toLocaleString() || 'N/A'} €
Fin du contrat: ${new Date(player.contractEnd).toLocaleDateString('fr-FR')}
Mois restants: ${player.contractMonthsLeft}

STATUT
------
Forme: ${getFormLabel(player.form)}
Blessé: ${player.isInjured ? 'OUI - ' + player.injuryDetails : 'Non'}
Transférable: ${player.transferStatus === 'available' ? 'OUI' : player.transferStatus === 'wanted' ? 'VISÉ' : 'NON'}

AGENT
-----
${player.agentName ? `Nom: ${player.agentName}
Tél: ${player.agentPhone}
Email: ${player.agentEmail}` : 'Pas d\'agent déclaré'}

FC Étoile Dorée - Direction Sportive
Document confidentiel
      `,
      transfer_proposal: `
PROPOSITION DE TRANSFERT OFFICIELLE
====================================

De: FC Étoile Dorée
À: [NOM DU CLUB]
Date: ${date}
Référence: TRANSF-${player.id}-${Date.now()}

OBJET: Proposition de transfert pour ${player.name}

MONTANT DE L'OFFRE
------------------
Transfert sec: [À COMPLÉTER] €
Ou prêt avec option d'achat: [À COMPLÉTER] €
Modalités de paiement: [À COMPLÉTER]

DÉTAILS DU JOUEUR
-----------------
${player.name}, ${player.age} ans, ${player.positionLabel}
Valeur marchande actuelle: ${formatValue(player.marketValue)}
Contrat jusqu'au: ${new Date(player.contractEnd).toLocaleDateString('fr-FR')}

CONDITIONS SPÉCIALES
--------------------
[À COMPLÉTER: Bonus, clauses de revente, etc.]

DÉLAI DE RÉPONSE
----------------
Cette offre est valable jusqu'au: [DATE]

CONTACT
-------
Directeur Sportif: [NOM]
Téléphone: [NUMÉRO]
Email: [EMAIL]

Cordialement,

FC Étoile Dorée
      `,
      contract_draft: `
CONTRAT DE TRAVAIL PROFESSIONNEL - BROUILLON
=============================================

ENTRE:
FC Étoile Dorée (Employeur)
ET
${player.name} (Salarié)

FONCTION
--------
Joueur professionnel de football au poste de ${player.positionLabel}

DURÉE
-----
Type: [CDD/CDI/Prolongation]
Début: [DATE]
Fin: [DATE]
Durée: [X] années

RÉMUNÉRATION
------------
Salaire brut mensuel: [MONTANT] €
Primes de match: [MONTANT] €
Primes de but: [MONTANT] €
Droits à l'image: [POURCENTAGE] %

AVANTAGES
---------
Logement: [OUI/NON - Détails]
Véhicule: [OUI/NON - Détails]
Assurance santé: [OUI/NON]
Mutuelle: [OUI/NON]

CLAUSES SPÉCIALES
-----------------
Clause libératoire: [MONTANT] €
Clause de non-concurrence: [DÉTAILS]
Reprise en cas de blessure: [CONDITIONS]

SIGNATURES
----------
Pour le club: _________________ Date: _______
Pour le joueur: _________________ Date: _______
Témoin (agent): _________________ Date: _______
      `,
      medical_certificate: `
CERTIFICAT MÉDICAL D'APTITUDE
==============================

CENTRE MÉDICAL: [NOM DU CENTRE]
MÉDECIN: Dr. [NOM]
DATE DE L'EXAMEN: ${date}
RÉFÉRENCE: MED-${player.id}-${Date.now()}

JOUEUR: ${player.name}
Date de naissance: [DATE]
Poste: ${player.positionLabel}

RÉSULTATS DES EXAMENS
---------------------
État général: [EXCELLENT/BON/MOYEN]
Tests cardiaques: [RÉSULTAT]
Tests musculaires: [RÉSULTAT]
Tests articulaires: [RÉSULTAT]
Vision: [RÉSULTAT]
Hearing: [RÉSULTAT]

CAPACITÉS PHYSIQUES
-------------------
Vitesse: ${player.speed}/100
Endurance: ${player.stamina}/100
Force: ${player.strength}/100
Souplesse: [À ÉVALUER]/100

APTITUDE
--------
Le joueur est déclaré:
[ ] APTE à la pratique professionnelle sans restriction
[ ] APTE avec restrictions suivantes: [DÉTAILS]
[ ] INAPTE temporairement pour cause de: [DÉTAILS]

PROCHAIN CONTRÔLE: [DATE]

Cachet et signature du médecin:
_________________
Dr. [NOM]
Numéro d'ordre: [NUMÉRO]
      `,
      financial_agreement: `
ACCORD FINANCIER DE TRANSFERT
==============================

ACCORD ENTRE:
FC Étoile Dorée (Club vendeur)
ET
[NOM DU CLUB ACHETEUR]

JOUEUR CONCERNÉ: ${player.name}
DATE: ${date}
VALEUR MARCHANDE: ${formatValue(player.marketValue)}

MONTANT DU TRANSFERT
--------------------
Prix de base: [MONTANT] €
Bonus de performance: [MONTANT] €
Total potentiel: [MONTANT] €

MODALITÉS DE PAIEMENT
---------------------
À la signature: [POURCENTAGE] %
Après 6 mois: [POURCENTAGE] %
Après 12 mois: [POURCENTAGE] %
[OU]
Paiement comptant: [OUI/NON]

CLAUSES FINANCIÈRES
-------------------
Pourcentage à la revente: [POURCENTAGE] %
Bonus si sélection nationale: [MONTANT] €
Bonus si trophée individuel: [MONTANT] €

GARANTIES
---------
Lettre de garantie bancaire: [OUI/NON]
Assurance transfert: [OUI/NON]

SIGNATURES DES PRÉSIDENTS
-------------------------
FC Étoile Dorée: _________________
[NOM CLUB]: _________________

Date: ${date}
      `,
      agent_mandate: `
MANDAT DE REPRÉSENTATION
=========================

Je soussigné, ${player.name}, né le [DATE] à [LIEU],
Joueur professionnel licencié au FC Étoile Dorée,

Désigne par la présente:
${player.agentName || '[NOM AGENT]'}
Agence: [NOM AGENCE]
Adresse: [ADRESSE]
Téléphone: ${player.agentPhone || '[NUMÉRO]'}
Email: ${player.agentEmail || '[EMAIL]'}

POUR:
[ ] La négociation de mon contrat de travail
[ ] La négociation de mon transfert
[ ] La gestion de mes droits à l'image
[ ] La gestion de mes relations publiques

DURÉE DU MANDAT
---------------
Du: ${date}
Au: [DATE]
Durée: [X] années renouvelables

RÉMUNÉRATION DE L'AGENT
-----------------------
Commission sur salaire: [POURCENTAGE] %
Commission sur transfert: [POURCENTAGE] %
Commission sur droits d'image: [POURCENTAGE] %

EXCLUSIVITÉ
-----------
[ ] Mandat exclusif
[ ] Mandat non-exclusif

SIGNATURES
----------
Joueur: _________________ Date: _______
Agent: _________________ Date: _______
Témoin: _________________ Date: _______
      `,
      transfer_agreement: `
ACCORD DE TRANSFERT DÉFINITIF
=============================

ENTRE:
FC Étoile Dorée, club professionnel affilié à la FFF,
Représenté par [NOM DU PRÉSIDENT],
Ci-après dénommé "le Club cédant",

ET
[NOM DU CLUB], club professionnel affilié à [FÉDÉRATION],
Représenté par [NOM DU PRÉSIDENT],
Ci-après dénommé "le Club cessionnaire",

IL A ÉTÉ CONVENU CE QUI SUIT:

ARTICLE 1 - OBJET
-----------------
Le Club cédant transfère définitivement le joueur ${player.name}
au Club cessionnaire à compter du [DATE].

ARTICLE 2 - INDEMNITÉ DE TRANSFERT
----------------------------------
Montant total: [MONTANT] € ([MONTANT EN LETTRES] euros)
Modalités: [DÉTAILS DES PAIEMENTS]

ARTICLE 3 - OBLIGATIONS DU JOUEUR
---------------------------------
Le joueur s'engage à respecter le règlement intérieur du Club cessionnaire
et à se présenter aux entraînements dans les 48h suivant la signature.

ARTICLE 4 - CLAUSES SPÉCIALES
-----------------------------
[À COMPLÉTER: Pourcentage à la revente, matchs amicaux, etc.]

ARTICLE 5 - JURIDICTION
-----------------------
Tout litige relatif au présent accord sera soumis à la juridiction
de la FIFA et du TAS.

Fait en deux exemplaires originaux à [LIEU], le ${date}

SIGNATURES:
-----------
Pour FC Étoile Dorée: _________________
Pour [NOM CLUB]: _________________
Le joueur (prise d'acte): _________________
      `,
      loan_agreement: `
CONTRAT DE PRÊT AVEC OPTION D'ACHAT
===================================

ENTRE:
FC Étoile Dorée (Club prêteur)
ET
[NOM DU CLUB] (Club emprunteur)

CONCERNANT:
Le joueur ${player.name}, ${player.age} ans, ${player.positionLabel}

DURÉE DU PRÊT
-------------
Du: [DATE]
Au: [DATE]
Durée: [X] mois

CONDITIONS FINANCIÈRES
----------------------
Frais de prêt: [MONTANT] €
Prise en charge du salaire: [POURCENTAGE] % par le Club emprunteur
Salaire mensuel total: ${player.currentSalary?.toLocaleString() || '[MONTANT]'} €

OPTION D'ACHAT (OA)
-------------------
Montant de l'OA: [MONTANT] €
Date limite d'exercice: [DATE]
Conditions de déclenchement: [DÉTAILS]

OBLIGATIONS
-----------
- Le joueur doit jouer au minimum [X] % des matchs
- Interdiction de prêt à un tiers sans accord
- Retour anticipé possible en cas de: [CONDITIONS]

SIGNATURES
----------
FC Étoile Dorée: _________________ Date: _______
[NOM CLUB]: _________________ Date: _______
Le joueur: _________________ Date: _______
L'agent: _________________ Date: _______
      `,
      termination_letter: `
LETTRE DE RÉSILIATION MUTUELLE
===============================

[DATE]

À l'attention de: ${player.name}

OBJET: Résiliation de votre contrat de travail

Cher ${player.name},

Par la présente, le FC Étoile Dorée vous informe de sa décision de mettre 
fin au contrat qui vous lie au club, par accord mutuel, aux conditions suivantes:

MOTIF DE LA RÉSILIATION
------------------------
[ ] Commun accord des parties
[ ] Fin de carrière professionnelle
[ ] Mutation professionnelle du conjoint
[ ] Autre motif: [PRÉCISER]

CONDITIONS FINANCIÈRES
------------------------
Indemnité de résiliation: [MONTANT] €
Modalités de paiement: [DÉTAILS]
Maintien des avantages jusqu'au: [DATE]

OBLIGATIONS RÉSIDUELLES
-----------------------
- Confidentialité sur les termes de la rupture
- Restitution du matériel du club avant le: [DATE]
- Non-concurrence pendant [X] mois

DATE DE FIN DU CONTRAT
----------------------
La présente résiliation prendra effet le: [DATE]

Nous vous remercions pour votre contribution au club et vous souhaitons 
le meilleur pour la suite de votre carrière.

Cordialement,

Le Président du FC Étoile Dorée
[NOM DU PRÉSIDENT]

SIGNATURE DU CLUB: _________________
SIGNATURE DU JOUEUR: _________________ (précédée de la mention "Lu et approuvé")
SIGNATURE DE L'AGENT: _________________ (témoin)
      `,
      renewal_offer: `
PROPOSITION DE RENOUVELLEMENT DE CONTRAT
=========================================

[DATE]

À l'attention de: ${player.name}
Par l'intermédiaire de: ${player.agentName || 'votre représentant'}

OBJET: Proposition de prolongation de contrat

Cher ${player.name},

Le FC Étoile Dorée est heureux de vous proposer la prolongation de votre 
contrat de travail professionnel aux conditions suivantes:

NOUVELLES CONDITIONS
--------------------
Durée: [X] années (jusqu'au [DATE])
Salaire brut mensuel: [MONTANT] € (actuel: ${player.currentSalary?.toLocaleString() || 'N/A'} €)
Augmentation: [POURCENTAGE] %

PRIMES ET AVANTAGES
-------------------
Prime de match: [MONTANT] €
Prime de but/passe: [MONTANT] €
Droits à l'image: [POURCENTAGE] %
Bonus annuel si objectifs atteints: [MONTANT] €

ÉVOLUTION DE CARRIÈRE
---------------------
[ ] Garantie de temps de jeu minimum
[ ] Engagement sur le poste de titulaire
[ ] Clause d'ambition sportive (recrutement)

CLAUSES PROTECTRICES
--------------------
Clause libératoire fixée à: [MONTANT] €
Augmentation automatique si sélection: [OUI/NON]

DÉLAI DE RÉPONSE
----------------
Cette offre est valable jusqu'au: [DATE]

Nous espérons que ces conditions vous conviendront et que vous poursuivrez 
votre brillante carrière au sein de notre club.

Cordialement,

La Direction Sportive
FC Étoile Dorée

SIGNATURE: _________________
      `
    };

    return templates[type] || '';
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const content = generateDocumentContent(selectedType);
      setDocumentContent(content);
      setPreviewMode(true);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSave = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      type: selectedType,
      title: documentTemplates[selectedType].title,
      generatedAt: new Date().toISOString(),
      status: 'draft',
      content: documentContent,
      attachments: [],
      signatures: [
        { role: 'Club', signed: false },
        { role: 'Joueur', signed: false },
        { role: 'Agent', signed: false }
      ]
    };
    onGenerate(newDoc);
    onClose();
  };

  const template = documentTemplates[selectedType];

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FilePlus className="w-6 h-6 text-blue-500" />
              Générateur de Documents
            </h2>
            <p className="text-slate-500">{player.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Document Types */}
          {!previewMode && (
            <div className="w-80 border-r border-slate-200 overflow-y-auto p-4 space-y-3">
              <h3 className="font-bold text-slate-900 mb-4">Type de document</h3>
              {Object.entries(documentTemplates).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key as DocumentType)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedType === key 
                      ? `border-${value.color}-500 bg-${value.color}-50` 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-${value.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <value.icon className={`w-5 h-5 text-${value.color}-600`} />
                    </div>
                    <div>
                      <div className={`font-bold ${selectedType === key ? `text-${value.color}-700` : 'text-slate-900'}`}>
                        {value.title}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{value.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {previewMode ? (
              <>
                {/* Preview Mode */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-100">
                  <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto font-mono text-sm whitespace-pre-wrap">
                    {documentContent}
                  </div>
                </div>
                <div className="p-6 border-t border-slate-200 bg-white flex gap-4">
                  <button 
                    onClick={() => setPreviewMode(false)}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200"
                  >
                    Retour
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Sauvegarder le document
                  </button>
                  <button className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-xl font-medium hover:bg-emerald-200 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    PDF
                  </button>
                  <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                    Imprimer
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Configuration Mode */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className={`bg-${template.color}-50 rounded-2xl p-6 border-2 border-${template.color}-200 mb-6`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-${template.color}-100 flex items-center justify-center`}>
                        <template.icon className={`w-8 h-8 text-${template.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{template.title}</h3>
                        <p className="text-slate-600">{template.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Éléments requis:</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.required.map((req) => (
                          <span key={req} className={`px-3 py-1 rounded-full text-xs font-medium bg-${template.color}-100 text-${template.color}-700`}>
                            {req.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-slate-900">Informations pré-remplies</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Joueur</div>
                        <div className="font-semibold text-slate-900">{player.name}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Poste</div>
                        <div className="font-semibold text-slate-900">{player.positionLabel}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Valeur marchande</div>
                        <div className="font-semibold text-emerald-600">{formatValue(player.marketValue)}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Fin de contrat</div>
                        <div className={`font-semibold ${player.contractMonthsLeft <= 6 ? 'text-amber-600' : 'text-slate-900'}`}>
                          {player.contractMonthsLeft} mois
                        </div>
                      </div>
                    </div>

                    {player.agentName && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">Agent: {player.agentName}</span>
                        </div>
                        <div className="text-sm text-blue-700">
                          {player.agentPhone} • {player.agentEmail}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 border-t border-slate-200 bg-white">
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        Générer le document
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [comparePlayer, setComparePlayer] = useState<Player | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterPosition, setFilterPosition] = useState<FilterPosition>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInjuredOnly, setShowInjuredOnly] = useState(false);
  const [showTransferableOnly, setShowTransferableOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'physical' | 'history' | 'contract' | 'transfer'>('overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [transferStage, setTransferStage] = useState<TransferStage>('idle');
  const [contractAction, setContractAction] = useState<ContractAction>('renew');
  const [negotiationNotes, setNegotiationNotes] = useState('');
  const [proposedAmount, setProposedAmount] = useState(0);
  const [showAgentContact, setShowAgentContact] = useState(false);
  const [showDocumentSender, setShowDocumentSender] = useState(false);
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<Document[]>([]);

  const [players, setPlayers] = useState<Player[]>([
  // ==========================================
  // GARDIENS (3)
  // ==========================================
  { 
    id: 1, 
    name: 'Luc Bernardin', 
    position: 'GK', 
    positionLabel: 'Gardien',
    jerseyNumber: 1, 
    isInjured: false, 
    country: 'France', 
    flag: '🇫🇷', 
    age: 32, 
    goals: 0, 
    assists: 1, 
    matches: 30, 
    rating: 8.2,
    minutesPlayed: 2700,
    yellowCards: 1,
    redCards: 0,
    cleanSheets: 12,
    marketValue: 4500000,
    form: 'excellent',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 189,
    weight: 82,
    preferredFoot: 'right',
    formHistory: [7.5, 7.8, 8.0, 7.9, 8.2, 8.1, 8.3, 8.2, 8.0, 8.2],
    speed: 65,
    stamina: 70,
    strength: 75,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.5, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.8, date: '2024-02-08' },
      { opponent: 'OL', result: 'V 3-0', rating: 8.2, date: '2024-02-01' },
    ],
    currentSalary: 45000,
    agentName: 'Jean-Marc Dubois',
    agentPhone: '+33 6 12 34 56 78',
    agentEmail: 'jmdubois@agency.com',
    releaseClause: 8000000,
    offers: [
      { id: '1', fromClub: 'Olympique Lyonnais', amount: 3500000, type: 'transfer', status: 'pending', date: '2024-02-10', notes: 'Intéressé par un transfert sec' },
      { id: '2', fromClub: 'AS Monaco', amount: 2000000, type: 'loan', status: 'countered', date: '2024-02-08', notes: 'Proposition de prêt avec OA' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-15', type: 'Bilan cardiaque', result: 'Normal', doctor: 'Dr. Martin' },
      { date: '2023-08-20', type: 'Bilan musculaire', result: 'Bon état', doctor: 'Dr. Petit' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 2, 
    name: 'Samuel Koffi', 
    position: 'GK', 
    positionLabel: 'Gardien',
    jerseyNumber: 16, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 28, 
    goals: 0, 
    assists: 0, 
    matches: 8, 
    rating: 7.1,
    minutesPlayed: 720,
    yellowCards: 0,
    redCards: 0,
    cleanSheets: 2,
    marketValue: 800000,
    form: 'good',
    transferStatus: 'available',
    contractEnd: '2026-06-30',
    height: 186,
    weight: 79,
    preferredFoot: 'right',
    formHistory: [7.0, 7.2, 6.8, 7.1, 7.0, 7.3, 7.1, 7.2, 7.1, 7.1],
    speed: 60,
    stamina: 65,
    strength: 70,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'Lille', result: 'D 0-1', rating: 6.5, date: '2024-02-10' },
      { opponent: 'Rennes', result: 'V 2-0', rating: 7.5, date: '2024-02-03' },
    ],
    currentSalary: 18000,
    agentName: 'Koffi Mensah',
    agentPhone: '+229 90 12 34 56',
    agentEmail: 'kmensah@beninfoot.com',
    releaseClause: 1500000,
    offers: [
      { id: '3', fromClub: 'Metz', amount: 600000, type: 'transfer', status: 'pending', date: '2024-02-12', notes: 'Offre intéressante pour le joueur' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-10', type: 'Examen général', result: 'Apte', doctor: 'Dr. Leroy' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 3, 
    name: 'Mohamed Traoré', 
    position: 'GK', 
    positionLabel: 'Gardien',
    jerseyNumber: 23, 
    isInjured: true, 
    injuryDetails: 'Fracture du métacarpe - opération réussie',
    injuryDuration: 6,
    country: 'Mali', 
    flag: '🇲🇱', 
    age: 25, 
    goals: 0, 
    assists: 0, 
    matches: 5, 
    rating: 6.8,
    minutesPlayed: 450,
    yellowCards: 0,
    redCards: 0,
    cleanSheets: 1,
    marketValue: 600000,
    form: 'poor',
    transferStatus: 'available',
    contractEnd: '2026-06-30',
    height: 191,
    weight: 85,
    preferredFoot: 'left',
    formHistory: [7.0, 6.8, 6.5, 6.8, 6.9, 6.7, 6.8, 6.8, 6.8, 6.8],
    speed: 55,
    stamina: 60,
    strength: 80,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'Nice', result: 'D 1-2', rating: 6.0, date: '2024-01-20' },
    ],
    currentSalary: 15000,
    agentName: 'Amadou Diallo',
    agentPhone: '+223 76 54 32 10',
    agentEmail: 'adiallo@malisport.com',
    releaseClause: 1000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-01', type: 'Opération main', result: 'Réussie - Rééducation 6 semaines', doctor: 'Dr. Chirurgien Martin' },
      { date: '2023-09-15', type: 'Bilan complet', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },

  // ==========================================
  // DÉFENSEURS (7)
  // ==========================================
  { 
    id: 4, 
    name: 'Paul Martin', 
    position: 'DEF', 
    positionLabel: 'Défenseur Central',
    jerseyNumber: 5, 
    isInjured: false, 
    country: 'Belgique', 
    flag: '🇧🇪', 
    age: 29, 
    goals: 2, 
    assists: 3, 
    matches: 30, 
    rating: 7.9,
    minutesPlayed: 2650,
    yellowCards: 6,
    redCards: 0,
    cleanSheets: 10,
    marketValue: 8500000,
    form: 'excellent',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 188,
    weight: 84,
    preferredFoot: 'right',
    formHistory: [7.5, 7.8, 7.9, 8.0, 7.8, 7.9, 8.1, 7.9, 8.0, 7.9],
    speed: 72,
    stamina: 85,
    strength: 88,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.0, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.5, date: '2024-02-08' },
      { opponent: 'OL', result: 'V 3-0', rating: 8.2, date: '2024-02-01' },
    ],
    currentSalary: 75000,
    agentName: 'Pieter De Vries',
    agentPhone: '+32 478 12 34 56',
    agentEmail: 'pdevries@belgianfootball.be',
    releaseClause: 12000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Bilan complet', result: 'Excellent état', doctor: 'Dr. Dupont' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 5, 
    name: 'Yves Dossou', 
    position: 'DEF', 
    positionLabel: 'Défenseur Central',
    jerseyNumber: 4, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 28, 
    goals: 1, 
    assists: 2, 
    matches: 29, 
    rating: 7.6,
    minutesPlayed: 2520,
    yellowCards: 8,
    redCards: 1,
    cleanSheets: 9,
    marketValue: 3200000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 185,
    weight: 80,
    preferredFoot: 'right',
    formHistory: [7.4, 7.5, 7.6, 7.5, 7.7, 7.6, 7.8, 7.6, 7.5, 7.6],
    speed: 70,
    stamina: 80,
    strength: 85,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.8, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.2, date: '2024-02-08' },
    ],
    currentSalary: 35000,
    agentName: 'Patrice Dossou',
    agentPhone: '+229 97 89 45 12',
    agentEmail: 'pdossou.family@gmail.com',
    releaseClause: 5000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-18', type: 'Contrôle routine', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 6, 
    name: 'Rodrigo Santos', 
    position: 'DEF', 
    positionLabel: 'Latéral Droit',
    jerseyNumber: 2, 
    isInjured: false, 
    country: 'Portugal', 
    flag: '🇵🇹', 
    age: 26, 
    goals: 3, 
    assists: 8, 
    matches: 28, 
    rating: 8.0,
    minutesPlayed: 2380,
    yellowCards: 4,
    redCards: 0,
    cleanSheets: 8,
    marketValue: 12000000,
    form: 'excellent',
    transferStatus: 'wanted',
    contractEnd: '2027-06-30',
    height: 182,
    weight: 76,
    preferredFoot: 'right',
    formHistory: [7.8, 8.0, 7.9, 8.1, 8.0, 8.2, 8.0, 7.9, 8.1, 8.0],
    speed: 88,
    stamina: 90,
    strength: 75,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.5, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.8, date: '2024-02-08' },
      { opponent: 'OL', result: 'V 3-0', rating: 8.0, date: '2024-02-01' },
    ],
    currentSalary: 95000,
    agentName: 'Jorge Mendes',
    agentPhone: '+351 91 234 56 78',
    agentEmail: 'j.mendes@gestifute.com',
    releaseClause: 20000000,
    offers: [
      { id: '4', fromClub: 'Manchester United', amount: 15000000, type: 'transfer', status: 'pending', date: '2024-02-14', notes: 'Offre initiale, négociations avancées' },
      { id: '5', fromClub: 'Atlético Madrid', amount: 12000000, type: 'transfer', status: 'pending', date: '2024-02-10', notes: 'Intérêt confirmé, attente proposition' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Bilan complet', result: 'Excellent', doctor: 'Dr. Silva' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 7, 
    name: 'Ibrahim Sanogo', 
    position: 'DEF', 
    positionLabel: 'Latéral Gauche',
    jerseyNumber: 3, 
    isInjured: false, 
    country: 'Côte d\'Ivoire', 
    flag: '🇨🇮', 
    age: 30, 
    goals: 1, 
    assists: 5, 
    matches: 27, 
    rating: 7.7,
    minutesPlayed: 2295,
    yellowCards: 5,
    redCards: 0,
    cleanSheets: 7,
    marketValue: 2800000,
    form: 'good',
    transferStatus: 'loan',
    contractEnd: '2026-06-30',
    height: 178,
    weight: 74,
    preferredFoot: 'left',
    formHistory: [7.5, 7.6, 7.7, 7.8, 7.6, 7.7, 7.9, 7.7, 7.6, 7.7],
    speed: 82,
    stamina: 78,
    strength: 70,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.8, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.5, date: '2024-02-08' },
    ],
    currentSalary: 32000,
    agentName: 'Kouamé Aka',
    agentPhone: '+225 07 12 34 56',
    agentEmail: 'kaka@ivoirepro.com',
    releaseClause: 4000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-22', type: 'Examen général', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 8, 
    name: 'Antoine Dubois', 
    position: 'DEF', 
    positionLabel: 'Défenseur Central',
    jerseyNumber: 15, 
    isInjured: true, 
    injuryDetails: 'Déchirure ischio-jambiers grade 2',
    injuryDuration: 4,
    country: 'France', 
    flag: '🇫🇷', 
    age: 27, 
    goals: 2, 
    assists: 2, 
    matches: 20, 
    rating: 7.5,
    minutesPlayed: 1650,
    yellowCards: 3,
    redCards: 0,
    cleanSheets: 6,
    marketValue: 5500000,
    form: 'average',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 190,
    weight: 86,
    preferredFoot: 'right',
    formHistory: [7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.5, 7.5],
    speed: 70,
    stamina: 75,
    strength: 90,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'Monaco', result: 'D 0-2', rating: 6.8, date: '2024-01-28' },
    ],
    currentSalary: 48000,
    agentName: 'François Legrand',
    agentPhone: '+33 6 45 67 89 01',
    agentEmail: 'flegrand@agence-foot.fr',
    releaseClause: 8000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-05', type: 'IRM ischio', result: 'Déchirure grade 2 - 4 semaines', doctor: 'Dr. Sportif Martin' },
      { date: '2024-01-15', type: 'Bilan général', result: 'Bon état général', doctor: 'Dr. Petit' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 9, 
    name: 'Kwame Mensah', 
    position: 'DEF', 
    positionLabel: 'Défenseur Central',
    jerseyNumber: 13, 
    isInjured: false, 
    country: 'Ghana', 
    flag: '🇬🇭', 
    age: 24, 
    goals: 0, 
    assists: 3, 
    matches: 25, 
    rating: 7.4,
    minutesPlayed: 1980,
    yellowCards: 7,
    redCards: 0,
    cleanSheets: 8,
    marketValue: 4200000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 192,
    weight: 88,
    preferredFoot: 'right',
    formHistory: [7.2, 7.3, 7.4, 7.5, 7.4, 7.5, 7.6, 7.4, 7.5, 7.4],
    speed: 68,
    stamina: 82,
    strength: 92,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.6, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.3, date: '2024-02-08' },
    ],
    currentSalary: 38000,
    agentName: 'Kwesi Asante',
    agentPhone: '+233 24 567 8901',
    agentEmail: 'kasante@ghanasoccer.com',
    releaseClause: 7000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Bilan complet', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 10, 
    name: 'Lucas Ferreira', 
    position: 'DEF', 
    positionLabel: 'Latéral Droit',
    jerseyNumber: 22, 
    isInjured: false, 
    country: 'Brésil', 
    flag: '🇧🇷', 
    age: 23, 
    goals: 1, 
    assists: 4, 
    matches: 18, 
    rating: 7.2,
    minutesPlayed: 1350,
    yellowCards: 2,
    redCards: 0,
    cleanSheets: 5,
    marketValue: 3500000,
    form: 'average',
    transferStatus: 'loan',
    contractEnd: '2026-06-30',
    height: 176,
    weight: 72,
    preferredFoot: 'right',
    formHistory: [7.0, 7.1, 7.2, 7.1, 7.3, 7.2, 7.1, 7.2, 7.3, 7.2],
    speed: 85,
    stamina: 80,
    strength: 68,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'Nantes', result: 'V 1-0', rating: 7.4, date: '2024-02-12' },
    ],
    currentSalary: 28000,
    agentName: 'Carlos Eduardo',
    agentPhone: '+55 11 98765 4321',
    agentEmail: 'ceduardo@brazilfootball.com.br',
    releaseClause: 5000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Examen général', result: 'Apte', doctor: 'Dr. Silva' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 11, 
    name: 'David Adjovi', 
    position: 'DEF', 
    positionLabel: 'Défenseur Central',
    jerseyNumber: 26, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 22, 
    goals: 0, 
    assists: 1, 
    matches: 12, 
    rating: 6.9,
    minutesPlayed: 890,
    yellowCards: 3,
    redCards: 0,
    cleanSheets: 3,
    marketValue: 1200000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 184,
    weight: 78,
    preferredFoot: 'right',
    formHistory: [6.8, 6.9, 7.0, 6.9, 7.0, 6.9, 6.8, 6.9, 7.0, 6.9],
    speed: 74,
    stamina: 76,
    strength: 78,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'Reims', result: 'N 0-0', rating: 7.0, date: '2024-02-05' },
    ],
    currentSalary: 15000,
    agentName: 'Famille Adjovi',
    agentPhone: '+229 96 78 45 12',
    agentEmail: 'adjovi.family@yahoo.fr',
    releaseClause: 2500000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-30', type: 'Bilan jeune joueur', result: 'Apte - Potentiel haut', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },

  // ==========================================
  // MILIEUX (8)
  // ==========================================
  { 
    id: 12, 
    name: 'Marc Silva', 
    position: 'MID', 
    positionLabel: 'Milieu Défensif',
    jerseyNumber: 8, 
    isInjured: true, 
    injuryDetails: 'Entorse du genou avec lésion ligamentaire',
    injuryDuration: 8,
    country: 'Brésil', 
    flag: '🇧🇷', 
    age: 27, 
    goals: 5, 
    assists: 12, 
    matches: 22, 
    rating: 7.8,
    minutesPlayed: 1760,
    yellowCards: 6,
    redCards: 1,
    marketValue: 15000000,
    form: 'poor',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 180,
    weight: 78,
    preferredFoot: 'right',
    formHistory: [7.9, 7.8, 7.7, 7.6, 7.5, 7.4, 7.3, 7.2, 7.8, 7.8],
    speed: 75,
    stamina: 80,
    strength: 82,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'Lens', result: 'D 1-3', rating: 6.5, date: '2024-01-15' },
    ],
    currentSalary: 85000,
    agentName: 'André Ribeiro',
    agentPhone: '+55 11 91234 5678',
    agentEmail: 'aribeiro@br-agency.com',
    releaseClause: 25000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Arthroscopie genou', result: 'Lésion ligamentaire - 8 semaines', doctor: 'Dr. Chirurgien Bernard' },
      { date: '2023-08-15', type: 'Bilan complet', result: 'Excellent', doctor: 'Dr. Silva' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 13, 
    name: 'Thomas Kouassi', 
    position: 'MID', 
    positionLabel: 'Milieu Central',
    jerseyNumber: 6, 
    isInjured: true, 
    injuryDetails: 'Entorse de la cheville gauche',
    injuryDuration: 2,
    country: 'Côte d\'Ivoire', 
    flag: '🇨🇮', 
    age: 24, 
    goals: 8, 
    assists: 10, 
    matches: 25, 
    rating: 8.1,
    minutesPlayed: 2100,
    yellowCards: 4,
    redCards: 0,
    marketValue: 22000000,
    form: 'excellent',
    transferStatus: 'wanted',
    contractEnd: '2027-06-30',
    height: 183,
    weight: 79,
    preferredFoot: 'both',
    formHistory: [7.9, 8.0, 8.1, 8.0, 8.2, 8.1, 8.3, 8.1, 8.0, 8.1],
    speed: 85,
    stamina: 92,
    strength: 78,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.5, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 8.0, date: '2024-02-08' },
    ],
    currentSalary: 110000,
    agentName: 'Didier Drogba Jr',
    agentPhone: '+225 05 12 34 56',
    agentEmail: 'ddrogba@ivorymanagement.com',
    releaseClause: 35000000,
    offers: [
      { id: '6', fromClub: 'Chelsea', amount: 28000000, type: 'transfer', status: 'pending', date: '2024-02-13', notes: 'Gros intérêt, prêt à négocier' },
      { id: '7', fromClub: 'Arsenal', amount: 25000000, type: 'transfer', status: 'pending', date: '2024-02-11', notes: 'Offre concurrente' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-10', type: 'Entorse cheville', result: '2 semaines d\'indisponibilité', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 14, 
    name: 'André Hounkpatin', 
    position: 'MID', 
    positionLabel: 'Milieu Offensif',
    jerseyNumber: 7, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 26, 
    goals: 6, 
    assists: 14, 
    matches: 28, 
    rating: 7.7,
    minutesPlayed: 2240,
    yellowCards: 3,
    redCards: 0,
    marketValue: 6800000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 175,
    weight: 70,
    preferredFoot: 'left',
    formHistory: [7.5, 7.6, 7.8, 7.7, 7.9, 7.8, 7.6, 7.7, 7.8, 7.7],
    speed: 78,
    stamina: 85,
    strength: 65,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.0, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.5, date: '2024-02-08' },
    ],
    currentSalary: 52000,
    agentName: 'Romuald Hounkpatin',
    agentPhone: '+229 94 56 78 90',
    agentEmail: 'rhounkpatin@beninfoot.net',
    releaseClause: 10000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-22', type: 'Bilan général', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 15, 
    name: 'Maxime Leroy', 
    position: 'MID', 
    positionLabel: 'Milieu Central',
    jerseyNumber: 11, 
    isInjured: false, 
    country: 'France', 
    flag: '🇫🇷', 
    age: 25, 
    goals: 7, 
    assists: 11, 
    matches: 29, 
    rating: 8.0,
    minutesPlayed: 2450,
    yellowCards: 5,
    redCards: 0,
    marketValue: 18000000,
    form: 'excellent',
    transferStatus: 'unavailable',
    contractEnd: '2029-06-30',
    height: 181,
    weight: 77,
    preferredFoot: 'right',
    formHistory: [7.8, 7.9, 8.0, 8.1, 8.0, 8.2, 8.1, 8.0, 8.1, 8.0],
    speed: 80,
    stamina: 90,
    strength: 75,
    contractMonthsLeft: 42,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.3, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.9, date: '2024-02-08' },
    ],
    currentSalary: 95000,
    agentName: 'Philippe Lamboley',
    agentPhone: '+33 6 78 90 12 34',
    agentEmail: 'p.lamboley@ultrafoot.fr',
    releaseClause: 30000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-18', type: 'Bilan complet', result: 'Excellent état', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 16, 
    name: 'Amadou Diallo', 
    position: 'MID', 
    positionLabel: 'Milieu Défensif',
    jerseyNumber: 14, 
    isInjured: false, 
    country: 'Sénégal', 
    flag: '🇸🇳', 
    age: 28, 
    goals: 4, 
    assists: 8, 
    matches: 27, 
    rating: 7.6,
    minutesPlayed: 2160,
    yellowCards: 9,
    redCards: 0,
    marketValue: 9000000,
    form: 'good',
    transferStatus: 'available',
    contractEnd: '2026-06-30',
    height: 188,
    weight: 82,
    preferredFoot: 'right',
    formHistory: [7.4, 7.5, 7.6, 7.7, 7.6, 7.5, 7.7, 7.6, 7.5, 7.6],
    speed: 76,
    stamina: 88,
    strength: 86,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.7, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.4, date: '2024-02-08' },
    ],
    currentSalary: 58000,
    agentName: 'Papa Diallo',
    agentPhone: '+221 77 123 45 67',
    agentEmail: 'pdiallo@senegalfoot.sn',
    releaseClause: 12000000,
    offers: [
      { id: '8', fromClub: 'Galatasaray', amount: 7500000, type: 'transfer', status: 'pending', date: '2024-02-09', notes: 'Intérêt pour transfert sec' },
      { id: '9', fromClub: 'Fenerbahçe', amount: 7000000, type: 'transfer', status: 'pending', date: '2024-02-07', notes: 'Proposition alternative' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Examen général', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 17, 
    name: 'José Martinez', 
    position: 'MID', 
    positionLabel: 'Milieu Offensif',
    jerseyNumber: 18, 
    isInjured: false, 
    country: 'Espagne', 
    flag: '🇪🇸', 
    age: 29, 
    goals: 3, 
    assists: 15, 
    matches: 26, 
    rating: 7.5,
    minutesPlayed: 1950,
    yellowCards: 2,
    redCards: 0,
    marketValue: 7500000,
    form: 'average',
    transferStatus: 'loan',
    contractEnd: '2026-06-30',
    height: 172,
    weight: 68,
    preferredFoot: 'left',
    formHistory: [7.3, 7.4, 7.5, 7.4, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5],
    speed: 82,
    stamina: 78,
    strength: 62,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.6, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.3, date: '2024-02-08' },
    ],
    currentSalary: 45000,
    agentName: 'Miguel Angel Sanchez',
    agentPhone: '+34 612 345 678',
    agentEmail: 'masanchez@laliga-agency.es',
    releaseClause: 10000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Bilan général', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 18, 
    name: 'Fabrice Gbaguidi', 
    position: 'MID', 
    positionLabel: 'Milieu Central',
    jerseyNumber: 20, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 23, 
    goals: 5, 
    assists: 6, 
    matches: 24, 
    rating: 7.3,
    minutesPlayed: 1680,
    yellowCards: 4,
    redCards: 0,
    marketValue: 4500000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 179,
    weight: 75,
    preferredFoot: 'right',
    formHistory: [7.1, 7.2, 7.3, 7.4, 7.3, 7.2, 7.4, 7.3, 7.2, 7.3],
    speed: 77,
    stamina: 82,
    strength: 72,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.5, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.1, date: '2024-02-08' },
    ],
    currentSalary: 32000,
    agentName: 'Gilles Gbaguidi',
    agentPhone: '+229 95 67 89 01',
    agentEmail: 'ggbaguidi@yahoo.fr',
    releaseClause: 8000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-28', type: 'Bilan jeune joueur', result: 'Apte - Bon potentiel', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 19, 
    name: 'Ahmed Ouattara', 
    position: 'MID', 
    positionLabel: 'Milieu Offensif',
    jerseyNumber: 21, 
    isInjured: true, 
    injuryDetails: 'Élongation du mollet droit',
    injuryDuration: 2,
    country: 'Burkina Faso', 
    flag: '🇧🇫', 
    age: 22, 
    goals: 2, 
    assists: 4, 
    matches: 15, 
    rating: 7.0,
    minutesPlayed: 890,
    yellowCards: 1,
    redCards: 0,
    marketValue: 2800000,
    form: 'average',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 177,
    weight: 71,
    preferredFoot: 'left',
    formHistory: [6.9, 7.0, 7.1, 7.0, 6.9, 7.0, 6.8, 7.0, 7.1, 7.0],
    speed: 79,
    stamina: 76,
    strength: 68,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'Toulouse', result: 'D 1-2', rating: 6.5, date: '2024-02-01' },
    ],
    currentSalary: 22000,
    agentName: 'Boubacar Ouattara',
    agentPhone: '+226 70 12 34 56',
    agentEmail: 'boubacar.ouattara@bf-foot.com',
    releaseClause: 5000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-08', type: 'Échographie mollet', result: 'Élongation - 2 semaines', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 20, 
    name: 'Kevin Assogba', 
    position: 'MID', 
    positionLabel: 'Milieu Central',
    jerseyNumber: 25, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 21, 
    goals: 1, 
    assists: 3, 
    matches: 10, 
    rating: 6.7,
    minutesPlayed: 540,
    yellowCards: 2,
    redCards: 0,
    marketValue: 1500000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 176,
    weight: 72,
    preferredFoot: 'right',
    formHistory: [6.5, 6.6, 6.7, 6.8, 6.7, 6.6, 6.7, 6.8, 6.7, 6.7],
    speed: 74,
    stamina: 78,
    strength: 70,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'Clermont', result: 'V 2-0', rating: 7.0, date: '2024-02-03' },
    ],
    currentSalary: 12000,
    agentName: 'Centre de Formation',
    agentPhone: '+229 21 45 67 89',
    agentEmail: 'formation@etoileeoree.bj',
    releaseClause: 3000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Bilan jeune joueur', result: 'Apte', doctor: 'Dr. Petit' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },

  // ==========================================
  // ATTAQUANTS (9)
  // ==========================================
  { 
    id: 21, 
    name: 'Jean Dupont', 
    position: 'FWD', 
    positionLabel: 'Avant-Centre',
    jerseyNumber: 10, 
    isInjured: false, 
    country: 'France', 
    flag: '🇫🇷', 
    age: 25, 
    goals: 22, 
    assists: 7, 
    matches: 28, 
    rating: 8.5,
    minutesPlayed: 2380,
    yellowCards: 2,
    redCards: 0,
    marketValue: 45000000,
    form: 'excellent',
    transferStatus: 'wanted',
    contractEnd: '2028-06-30',
    height: 185,
    weight: 80,
    preferredFoot: 'right',
    formHistory: [8.2, 8.3, 8.4, 8.5, 8.4, 8.6, 8.5, 8.4, 8.5, 8.5],
    speed: 92,
    stamina: 88,
    strength: 85,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 9.0, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 8.5, date: '2024-02-08' },
      { opponent: 'OL', result: 'V 3-0', rating: 8.8, date: '2024-02-01' },
    ],
    currentSalary: 180000,
    agentName: 'Jean-Pierre Bernès',
    agentPhone: '+33 6 12 34 56 78',
    agentEmail: 'jp.bernes@bernes-conseil.fr',
    releaseClause: 70000000,
    offers: [
      { id: '10', fromClub: 'Real Madrid', amount: 60000000, type: 'transfer', status: 'pending', date: '2024-02-14', notes: 'Offre massive, joueur tenté' },
      { id: '11', fromClub: 'Bayern Munich', amount: 55000000, type: 'transfer', status: 'pending', date: '2024-02-12', notes: 'Alternative intéressante' },
      { id: '12', fromClub: 'Manchester City', amount: 65000000, type: 'transfer', status: 'pending', date: '2024-02-10', notes: 'Projet sportif ambitieux' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Bilan complet haut niveau', result: 'Excellent - Athlète elite', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Citoyen UE' }
  },
  { 
    id: 22, 
    name: 'Pierre Agbodjan', 
    position: 'FWD', 
    positionLabel: 'Ailier Gauche',
    jerseyNumber: 9, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 23, 
    goals: 15, 
    assists: 9, 
    matches: 27, 
    rating: 8.3,
    minutesPlayed: 2295,
    yellowCards: 3,
    redCards: 0,
    marketValue: 28000000,
    form: 'excellent',
    transferStatus: 'available',
    contractEnd: '2027-06-30',
    height: 178,
    weight: 73,
    preferredFoot: 'right',
    formHistory: [8.0, 8.1, 8.2, 8.3, 8.2, 8.4, 8.3, 8.2, 8.3, 8.3],
    speed: 95,
    stamina: 85,
    strength: 70,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.8, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 8.0, date: '2024-02-08' },
    ],
    currentSalary: 120000,
    agentName: 'Moussa Konaté',
    agentPhone: '+229 97 45 12 34',
    agentEmail: 'mkonate@africanstars.com',
    releaseClause: 35000000,
    offers: [
      { id: '13', fromClub: 'Marseille', amount: 25000000, type: 'transfer', status: 'pending', date: '2024-02-14', notes: 'Offre initiale, négociations en cours' },
      { id: '14', fromClub: 'Rennes', amount: 22000000, type: 'transfer', status: 'pending', date: '2024-02-12', notes: 'Proposition intéressante' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-22', type: 'Bilan complet', result: 'Excellent état', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 23, 
    name: 'Carlos Mendes', 
    position: 'FWD', 
    positionLabel: 'Ailier Droit',
    jerseyNumber: 19, 
    isInjured: false, 
    country: 'Cap-Vert', 
    flag: '🇨🇻', 
    age: 26, 
    goals: 12, 
    assists: 11, 
    matches: 26, 
    rating: 7.9,
    minutesPlayed: 2080,
    yellowCards: 4,
    redCards: 0,
    marketValue: 16000000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 180,
    weight: 75,
    preferredFoot: 'left',
    formHistory: [7.7, 7.8, 7.9, 7.8, 8.0, 7.9, 7.8, 7.9, 8.0, 7.9],
    speed: 90,
    stamina: 82,
    strength: 75,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.2, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.8, date: '2024-02-08' },
    ],
    currentSalary: 78000,
    agentName: 'José António',
    agentPhone: '+238 991 23 45',
    agentEmail: 'jantonio@cabofoot.cv',
    releaseClause: 22000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Bilan général', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 24, 
    name: 'Moussa Sissoko', 
    position: 'FWD', 
    positionLabel: 'Avant-Centre',
    jerseyNumber: 17, 
    isInjured: false, 
    country: 'Mali', 
    flag: '🇲🇱', 
    age: 24, 
    goals: 10, 
    assists: 6, 
    matches: 25, 
    rating: 7.8,
    minutesPlayed: 1850,
    yellowCards: 5,
    redCards: 0,
    marketValue: 14000000,
    form: 'good',
    transferStatus: 'loan',
    contractEnd: '2026-06-30',
    height: 188,
    weight: 85,
    preferredFoot: 'right',
    formHistory: [7.6, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.9, 7.8, 7.8],
    speed: 87,
    stamina: 80,
    strength: 88,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 8.0, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.6, date: '2024-02-08' },
    ],
    currentSalary: 65000,
    agentName: 'Seydou Keita',
    agentPhone: '+223 76 54 32 10',
    agentEmail: 'skeita@mali-foot.com',
    releaseClause: 20000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-20', type: 'Examen général', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 25, 
    name: 'Emmanuel Zohoré', 
    position: 'FWD', 
    positionLabel: 'Avant-Centre',
    jerseyNumber: 27, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 22, 
    goals: 8, 
    assists: 3, 
    matches: 20, 
    rating: 7.4,
    minutesPlayed: 1420,
    yellowCards: 3,
    redCards: 0,
    marketValue: 8500000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2028-06-30',
    height: 183,
    weight: 79,
    preferredFoot: 'right',
    formHistory: [7.2, 7.3, 7.4, 7.5, 7.4, 7.3, 7.4, 7.5, 7.4, 7.4],
    speed: 84,
    stamina: 78,
    strength: 82,
    contractMonthsLeft: 30,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.6, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.2, date: '2024-02-08' },
    ],
    currentSalary: 42000,
    agentName: 'Zohoré Family',
    agentPhone: '+229 96 54 32 10',
    agentEmail: 'zohoré.famille@gmail.com',
    releaseClause: 12000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-28', type: 'Bilan jeune joueur', result: 'Apte - Potentiel confirmé', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2028-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 26, 
    name: 'Didier Ahouansou', 
    position: 'FWD', 
    positionLabel: 'Ailier Droit',
    jerseyNumber: 29, 
    isInjured: true, 
    injuryDetails: 'Pubalgie chronique - rééducation en cours',
    injuryDuration: 5,
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 27, 
    goals: 6, 
    assists: 4, 
    matches: 16, 
    rating: 7.2,
    minutesPlayed: 1050,
    yellowCards: 2,
    redCards: 0,
    marketValue: 5500000,
    form: 'poor',
    transferStatus: 'available',
    contractEnd: '2026-06-30',
    height: 176,
    weight: 72,
    preferredFoot: 'left',
    formHistory: [7.5, 7.3, 7.2, 7.0, 7.1, 7.0, 7.2, 7.2, 7.1, 7.2],
    speed: 85,
    stamina: 70,
    strength: 68,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'Nantes', result: 'D 0-1', rating: 6.5, date: '2024-01-25' },
    ],
    currentSalary: 35000,
    agentName: 'Ahouansou Management',
    agentPhone: '+229 94 32 10 98',
    agentEmail: 'ahouansou.mgmt@yahoo.fr',
    releaseClause: 8000000,
    offers: [
      { id: '15', fromClub: 'Angers', amount: 4000000, type: 'transfer', status: 'pending', date: '2024-02-08', notes: 'Intérêt malgré la blessure' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-01', type: 'IRM pelvien', result: 'Pubalgie - Rééducation 5 semaines', doctor: 'Dr. Chirurgien Petit' },
      { date: '2023-09-10', type: 'Bilan général', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 27, 
    name: 'Victor Hounkanrin', 
    position: 'FWD', 
    positionLabel: 'Avant-Centre',
    jerseyNumber: 30, 
    isInjured: false, 
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 20, 
    goals: 3, 
    assists: 1, 
    matches: 8, 
    rating: 6.8,
    minutesPlayed: 420,
    yellowCards: 1,
    redCards: 0,
    marketValue: 2500000,
    form: 'good',
    transferStatus: 'unavailable',
    contractEnd: '2029-06-30',
    height: 181,
    weight: 76,
    preferredFoot: 'right',
    formHistory: [6.6, 6.7, 6.8, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8, 6.8],
    speed: 88,
    stamina: 75,
    strength: 74,
    contractMonthsLeft: 42,
    lastMatches: [
      { opponent: 'Lorient', result: 'V 2-1', rating: 7.2, date: '2024-02-10' },
    ],
    currentSalary: 10000,
    agentName: 'Centre de Formation',
    agentPhone: '+229 21 45 67 89',
    agentEmail: 'formation@etoileeoree.bj',
    releaseClause: 5000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-30', type: 'Bilan jeune joueur', result: 'Apte - Très bon potentiel', doctor: 'Dr. Petit' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2029-06-30', status: 'Titre de séjour sportif' }
  },
  { 
    id: 28, 
    name: 'Sami Ben Ali', 
    position: 'FWD', 
    positionLabel: 'Avant-Centre',
    jerseyNumber: 28, 
    isInjured: false, 
    country: 'Tunisie', 
    flag: '🇹🇳', 
    age: 25, 
    goals: 9, 
    assists: 5, 
    matches: 22, 
    rating: 7.5,
    minutesPlayed: 1540,
    yellowCards: 6,
    redCards: 1,
    marketValue: 9800000,
    form: 'good',
    transferStatus: 'available',
    contractEnd: '2027-06-30',
    height: 183,
    weight: 78,
    preferredFoot: 'right',
    formHistory: [7.3, 7.4, 7.5, 7.6, 7.5, 7.4, 7.5, 7.6, 7.5, 7.5],
    speed: 83,
    stamina: 80,
    strength: 84,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'PSG', result: 'V 2-1', rating: 7.8, date: '2024-02-15' },
      { opponent: 'OM', result: 'N 1-1', rating: 7.2, date: '2024-02-08' },
    ],
    currentSalary: 48000,
    agentName: 'Mehdi Ben Ali',
    agentPhone: '+216 20 123 456',
    agentEmail: 'mbenali@tunisport.tn',
    releaseClause: 13000000,
    offers: [
      { id: '16', fromClub: 'Al Ahly', amount: 8000000, type: 'transfer', status: 'pending', date: '2024-02-06', notes: 'Retour en Afrique envisagé' }
    ],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-25', type: 'Examen général', result: 'Apte', doctor: 'Dr. Martin' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 29, 
    name: 'Junior Akambi', 
    position: 'FWD', 
    positionLabel: 'Ailier Gauche',
    jerseyNumber: 24, 
    isInjured: false, 
    country: 'Cameroun', 
    flag: '🇨🇲', 
    age: 23, 
    goals: 5, 
    assists: 2, 
    matches: 14, 
    rating: 7.1,
    minutesPlayed: 780,
    yellowCards: 2,
    redCards: 0,
    marketValue: 4200000,
    form: 'average',
    transferStatus: 'unavailable',
    contractEnd: '2027-06-30',
    height: 179,
    weight: 74,
    preferredFoot: 'right',
    formHistory: [6.9, 7.0, 7.1, 7.0, 7.2, 7.1, 7.0, 7.1, 7.2, 7.1],
    speed: 91,
    stamina: 77,
    strength: 72,
    contractMonthsLeft: 18,
    lastMatches: [
      { opponent: 'Strasbourg', result: 'V 1-0', rating: 7.3, date: '2024-02-05' },
    ],
    currentSalary: 28000,
    agentName: 'Roger Milla Jr',
    agentPhone: '+237 677 12 34 56',
    agentEmail: 'rmilla@camfoot.cm',
    releaseClause: 7000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-01-28', type: 'Bilan général', result: 'Apte', doctor: 'Dr. Bernard' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2027-12-31', status: 'Titre de séjour sportif' }
  },
  { 
    id: 30, 
    name: 'Rachid Kagnon', 
    position: 'FWD', 
    positionLabel: 'Ailier Droit',
    jerseyNumber: 31, 
    isInjured: true, 
    injuryDetails: 'Commotion cérébrale - protocole commotion',
    injuryDuration: 1,
    country: 'Bénin', 
    flag: '🇧🇯', 
    age: 21, 
    goals: 2, 
    assists: 1, 
    matches: 9, 
    rating: 6.6,
    minutesPlayed: 380,
    yellowCards: 0,
    redCards: 0,
    marketValue: 1800000,
    form: 'poor',
    transferStatus: 'loan',
    contractEnd: '2026-06-30',
    height: 177,
    weight: 71,
    preferredFoot: 'left',
    formHistory: [6.5, 6.6, 6.7, 6.6, 6.5, 6.4, 6.5, 6.6, 6.6, 6.6],
    speed: 86,
    stamina: 74,
    strength: 69,
    contractMonthsLeft: 6,
    lastMatches: [
      { opponent: 'Brest', result: 'D 0-2', rating: 6.0, date: '2024-02-02' },
    ],
    currentSalary: 14000,
    agentName: 'Kagnon Family',
    agentPhone: '+229 93 21 45 67',
    agentEmail: 'kagnon.family@yahoo.fr',
    releaseClause: 3000000,
    offers: [],
    contractNegotiations: [],
    documents: [],
    medicalHistory: [
      { date: '2024-02-12', type: 'Protocole commotion', result: '1 semaine d\'arrêt - Suivi neurologique', doctor: 'Dr. Neuro Martin' },
      { date: '2024-01-20', type: 'Bilan jeune joueur', result: 'Apte', doctor: 'Dr. Petit' }
    ],
    insuranceStatus: 'valid',
    workPermit: { country: 'France', expiry: '2026-12-31', status: 'Titre de séjour sportif' }
  }
]);

  const filteredPlayers = useMemo(() => {
    let result = [...players];
    
    if (filterPosition !== 'all') {
      result = result.filter(p => p.position === filterPosition);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (showInjuredOnly) {
      result = result.filter(p => p.isInjured);
    }
    
    if (showTransferableOnly) {
      result = result.filter(p => p.transferStatus === 'available' || p.transferStatus === 'wanted');
    }
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'goals': return b.goals - a.goals;
        case 'assists': return b.assists - a.assists;
        case 'value': return b.marketValue - a.marketValue;
        case 'age': return a.age - b.age;
        default: return 0;
      }
    });
    
    return result;
  }, [players, filterPosition, searchQuery, sortBy, showInjuredOnly, showTransferableOnly]);

  const stats = useMemo(() => ({
    total: players.length,
    available: players.filter(p => !p.isInjured).length,
    injured: players.filter(p => p.isInjured).length,
    onMarket: players.filter(p => p.transferStatus === 'available').length,
    loan: players.filter(p => p.transferStatus === 'loan').length,
    wanted: players.filter(p => p.transferStatus === 'wanted').length,
    totalValue: players.reduce((acc, p) => acc + p.marketValue, 0),
    avgAge: (players.reduce((acc, p) => acc + p.age, 0) / players.length).toFixed(1),
    contractAlerts: players.filter(p => p.contractMonthsLeft <= 6).length
  }), [players]);

  const getPositionColor = (pos: string) => {
    switch (pos) {
      case 'GK': return 'bg-amber-500';
      case 'DEF': return 'bg-blue-500';
      case 'MID': return 'bg-emerald-500';
      case 'FWD': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

   const handleContactAgent = () => {
    setTransferStage('contacting_agent');
    setShowAgentContact(true);
    setTimeout(() => {
      setShowAgentContact(false);
      setTransferStage('negotiating');
    }, 2000);
  };

  const handleSendDocuments = () => {
    setShowDocumentSender(true);
    setTimeout(() => {
      setShowDocumentSender(false);
      if (selectedPlayer) {
        const updated = players.map(p => 
          p.id === selectedPlayer.id 
            ? { ...p, contractNegotiations: [...p.contractNegotiations, {
                id: Date.now().toString(),
                playerId: p.id,
                type: contractAction,
                proposedSalary: proposedAmount,
                proposedDuration: 3,
                status: 'sent',
                agentContacted: true,
                documentsSent: true,
                lastUpdate: new Date().toISOString(),
                history: [{ date: new Date().toISOString(), action: 'Documents envoyés', note: 'Contrat proposé à l\'agent' }]
              }]}
            : p
        );
        setPlayers(updated);
        setSelectedPlayer(updated.find(p => p.id === selectedPlayer.id) || null);
      }
    }, 1500);
  };

  const handleAcceptOffer = (offerId: string) => {
    if (selectedPlayer) {
      const updated = players.map(p => 
        p.id === selectedPlayer.id 
          ? { ...p, offers: p.offers.map(o => o.id === offerId ? { ...o, status: 'accepted' as const } : o) }
          : p
      );
      setPlayers(updated);
      setSelectedPlayer(updated.find(p => p.id === selectedPlayer.id) || null);
      setTransferStage('completed');
    }
  };

  const handleRejectOffer = (offerId: string) => {
    if (selectedPlayer) {
      const updated = players.map(p => 
        p.id === selectedPlayer.id 
          ? { ...p, offers: p.offers.map(o => o.id === offerId ? { ...o, status: 'rejected' as const } : o) }
          : p
      );
      setPlayers(updated);
      setSelectedPlayer(updated.find(p => p.id === selectedPlayer.id) || null);
    }
  };

  const handleCounterOffer = (offerId: string, newAmount: number) => {
    if (selectedPlayer) {
      const updated = players.map(p => 
        p.id === selectedPlayer.id 
          ? { ...p, offers: p.offers.map(o => o.id === offerId ? { ...o, status: 'countered' as const, amount: newAmount } : o) }
          : p
      );
      setPlayers(updated);
      setSelectedPlayer(updated.find(p => p.id === selectedPlayer.id) || null);
    }
  };

  const handleGenerateDocument = (doc: Document) => {
    setGeneratedDocuments(prev => [...prev, doc]);
    if (selectedPlayer) {
      const updated = players.map(p => 
        p.id === selectedPlayer.id 
          ? { ...p, documents: [...p.documents, doc] }
          : p
      );
      setPlayers(updated);
      setSelectedPlayer(updated.find(p => p.id === selectedPlayer.id) || null);
    }
  };

  // NEW: Transfer Modal Component
  const TransferModal = () => {
    if (!selectedPlayer) return null;
    
    return (
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-6 h-6 text-blue-500" />
                Gestion du Transfert
              </h2>
              <p className="text-slate-500">{selectedPlayer.name} • {selectedPlayer.positionLabel}</p>
            </div>
            <button onClick={() => setShowTransferModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Workflow Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { id: 'idle', label: 'Disponible', icon: UserCheck },
                { id: 'contacting_agent', label: 'Contact Agent', icon: Phone },
                { id: 'negotiating', label: 'Négociation', icon: MessageSquare },
                { id: 'medical_pending', label: 'Visite Médicale', icon: HeartPulse },
                { id: 'contract_signing', label: 'Signature', icon: FileText },
                { id: 'completed', label: 'Transféré', icon: CheckCircle2 },
              ].map((step, idx) => {
                const isActive = transferStage === step.id;
                const isPast = ['idle', 'contacting_agent', 'negotiating', 'medical_pending', 'contract_signing', 'completed'].indexOf(transferStage) > 
                              ['idle', 'contacting_agent', 'negotiating', 'medical_pending', 'contract_signing', 'completed'].indexOf(step.id);
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex flex-col items-center gap-2 ${isActive ? 'text-blue-600' : isPast ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isActive ? 'border-blue-500 bg-blue-50' : 
                        isPast ? 'border-emerald-500 bg-emerald-50' : 
                        'border-slate-300 bg-slate-50'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium">{step.label}</span>
                    </div>
                    {idx < 5 && <div className={`w-12 h-0.5 mx-2 ${isPast ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
                  </div>
                );
              })}
            </div>

            {/* Agent Contact Card */}
            {selectedPlayer.agentName && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  Informations Agent
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-500 mb-1">Nom</div>
                    <div className="font-semibold text-slate-900">{selectedPlayer.agentName}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-500 mb-1">Téléphone</div>
                    <div className="font-semibold text-slate-900">{selectedPlayer.agentPhone}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-500 mb-1">Email</div>
                    <div className="font-semibold text-slate-900">{selectedPlayer.agentEmail}</div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={handleContactAgent}
                    disabled={transferStage !== 'idle'}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler l'agent
                  </button>
                  <button 
                    onClick={() => setShowDocumentSender(true)}
                    disabled={transferStage === 'idle'}
                    className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer dossier
                  </button>
                </div>
              </div>
            )}

            {/* Offers List */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Offres Reçues ({selectedPlayer.offers.length})
              </h3>
              
              {selectedPlayer.offers.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500">Aucune offre pour le moment</p>
                </div>
              ) : (
                selectedPlayer.offers.map((offer) => (
                  <div key={offer.id} className={`bg-white rounded-2xl p-6 border-2 ${
                    offer.status === 'accepted' ? 'border-emerald-500 bg-emerald-50/30' :
                    offer.status === 'rejected' ? 'border-rose-500 bg-rose-50/30' :
                    offer.status === 'countered' ? 'border-amber-500 bg-amber-50/30' :
                    'border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {offer.fromClub.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{offer.fromClub}</h4>
                            <p className="text-sm text-slate-500">Reçue le {new Date(offer.date).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="bg-slate-100 px-4 py-2 rounded-lg">
                            <span className="text-2xl font-bold text-slate-900">{formatValue(offer.amount)}</span>
                            <span className="text-sm text-slate-500 ml-2">{offer.type === 'loan' ? '(prêt)' : ''}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            offer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            offer.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                            offer.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {offer.status === 'pending' ? 'En attente' :
                             offer.status === 'accepted' ? 'Acceptée' :
                             offer.status === 'rejected' ? 'Refusée' : 'Contre-proposition'}
                          </span>
                        </div>
                        {offer.notes && (
                          <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-3 rounded-lg">{offer.notes}</p>
                        )}
                      </div>
                      
                      {offer.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Accepter
                          </button>
                          <button 
                            onClick={() => handleRejectOffer(offer.id)}
                            className="bg-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-rose-700 flex items-center gap-2"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            Refuser
                          </button>
                          <button 
                            onClick={() => handleCounterOffer(offer.id, Math.round(offer.amount * 1.2))}
                            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 flex items-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Contre-offre (+20%)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Actions Rapides</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Fiche joueur
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <Printer className="w-4 h-4" />
                  Imprimer offres
                </button>
                <button 
                  onClick={() => { setShowTransferModal(false); setShowContractModal(true); }}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Renouveler contrat
                </button>
                <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <Ban className="w-4 h-4" />
                  Retirer du marché
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Contract Modal Component
  const ContractModal = () => {
    if (!selectedPlayer) return null;

    return (
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-500" />
                Gestion Contractuelle
              </h2>
              <p className="text-slate-500">{selectedPlayer.name}</p>
            </div>
            <button onClick={() => setShowContractModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Contract Status */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Situation Actuelle</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500">Salaire mensuel</div>
                  <div className="text-2xl font-bold text-slate-900">{selectedPlayer.currentSalary?.toLocaleString()} €</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Fin du contrat</div>
                  <div className={`text-2xl font-bold ${selectedPlayer.contractMonthsLeft <= 6 ? 'text-amber-600' : 'text-slate-900'}`}>
                    {selectedPlayer.contractMonthsLeft} mois
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Clause libératoire</div>
                  <div className="text-2xl font-bold text-slate-900">{formatValue(selectedPlayer.releaseClause || 0)}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Valeur marchande</div>
                  <div className="text-2xl font-bold text-emerald-600">{formatValue(selectedPlayer.marketValue)}</div>
                </div>
              </div>
            </div>

            {/* Action Selection */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Action à entreprendre</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'renew', label: 'Renouveler', desc: 'Prolongation du contrat actuel', color: 'blue' },
                  { id: 'extend', label: 'Extension', desc: 'Ajouter des années au contrat', color: 'emerald' },
                  { id: 'renegotiate', label: 'Renégocier', desc: 'Modifier salaire et durée', color: 'amber' },
                  { id: 'terminate', label: 'Résilier', desc: 'Rompre le contrat', color: 'rose' },
                ].map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setContractAction(action.id as ContractAction)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      contractAction === action.id 
                        ? `border-${action.color}-500 bg-${action.color}-50` 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`font-bold ${contractAction === action.id ? `text-${action.color}-700` : 'text-slate-900'}`}>
                      {action.label}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{action.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Negotiation Form */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">Proposition</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nouveau salaire mensuel (€)</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setProposedAmount(Math.max(0, proposedAmount - 5000))}
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    value={proposedAmount}
                    onChange={(e) => setProposedAmount(Number(e.target.value))}
                    className="flex-1 text-center text-2xl font-bold border-2 border-slate-200 rounded-lg py-2"
                  />
                  <button 
                    onClick={() => setProposedAmount(proposedAmount + 5000)}
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center text-sm text-slate-500 mt-2">
                  {((proposedAmount / (selectedPlayer.currentSalary || 1) - 1) * 100).toFixed(0)}% d'augmentation
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes pour l'agent</label>
                <textarea 
                  value={negotiationNotes}
                  onChange={(e) => setNegotiationNotes(e.target.value)}
                  placeholder="Conditions particulières, bonus, clauses..."
                  className="w-full border-2 border-slate-200 rounded-xl p-3 h-24 resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setShowContractModal(false)}
                className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-200"
              >
                Annuler
              </button>
              <button 
                onClick={handleSendDocuments}
                disabled={proposedAmount === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Envoyer à l'agent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // NEW: Tactical Formation View
  const TacticalView = () => {
    const formation = {
      GK: players.filter(p => p.position === 'GK' && !p.isInjured).slice(0, 1),
      DEF: players.filter(p => p.position === 'DEF' && !p.isInjured).slice(0, 4),
      MID: players.filter(p => p.position === 'MID' && !p.isInjured).slice(0, 3),
      FWD: players.filter(p => p.position === 'FWD' && !p.isInjured).slice(0, 3),
    };

    return (
      <div className="bg-emerald-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        {/* Pitch markings */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30 border-t-0" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30 border-b-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/20" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between h-[600px] py-4">
          {/* GK */}
          <div className="flex justify-center">
            {formation.GK.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedPlayer(p)}
                className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform border-4 border-white"
              >
                {p.jerseyNumber}
              </button>
            ))}
          </div>
          
          {/* DEF */}
          <div className="flex justify-center gap-8">
            {formation.DEF.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedPlayer(p)}
                className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform border-4 border-white"
              >
                {p.jerseyNumber}
              </button>
            ))}
          </div>
          
          {/* MID */}
          <div className="flex justify-center gap-12">
            {formation.MID.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedPlayer(p)}
                className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform border-4 border-white"
              >
                {p.jerseyNumber}
              </button>
            ))}
          </div>
          
          {/* FWD */}
          <div className="flex justify-center gap-8">
            {formation.FWD.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedPlayer(p)}
                className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform border-4 border-white"
              >
                {p.jerseyNumber}
              </button>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur rounded-lg p-3 text-white text-sm">
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-amber-500" /> GK</div>
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-blue-500" /> DEF</div>
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /> MID</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500" /> FWD</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Premium - UNCHANGED */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">FC Étoile Dorée</h1>
                <p className="text-slate-400 text-sm">Saison 2025/2026 • Effectif Pro</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{stats.total} Joueurs</span>
              </div>
              <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">{stats.available} Disponibles</span>
              </div>
              <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium">{stats.injured} Blessés</span>
              </div>
              <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">{formatValue(stats.totalValue)}</span>
              </div>
              {/* NEW: Contract Alerts */}
              {stats.contractAlerts > 0 && (
                <div className="bg-amber-900/50 border border-amber-500/50 rounded-lg px-4 py-2 flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-200">{stats.contractAlerts} Contrats à renouveler</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Controls Bar - ENHANCED with Tactical Mode */}
      <div className="bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un joueur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="flex bg-slate-100 rounded-lg p-1">
                {(['all', 'GK', 'DEF', 'MID', 'FWD'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => { setFilterPosition(pos); setViewMode('grid'); }}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filterPosition === pos && viewMode !== 'tactical'
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {pos === 'all' ? 'Tous' : pos}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Note</option>
                <option value="value">Valeur</option>
                <option value="goals">Buts</option>
                <option value="assists">Passes</option>
                <option value="age">Âge</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowInjuredOnly(!showInjuredOnly)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    showInjuredOnly ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                  Blessés
                </button>
                <button
                  onClick={() => setShowTransferableOnly(!showTransferableOnly)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    showTransferableOnly ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Transferts
                </button>
                {/* NEW: Tactical View Button */}
                <button
                  onClick={() => setViewMode(viewMode === 'tactical' ? 'grid' : 'tactical')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'tactical' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  Tactique
                </button>
              </div>

              <div className="flex bg-slate-100 rounded-lg p-1 ml-auto">
                {(['grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    disabled={viewMode === 'tactical'}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === mode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
                    } ${viewMode === 'tactical' ? 'opacity-50' : ''}`}
                  >
                    {mode === 'grid' ? (
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                        <div className="bg-current rounded-sm" />
                        <div className="bg-current rounded-sm" />
                        <div className="bg-current rounded-sm" />
                        <div className="bg-current rounded-sm" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 flex flex-col gap-1">
                        <div className="h-1 bg-current rounded-full" />
                        <div className="h-1 bg-current rounded-full" />
                        <div className="h-1 bg-current rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === 'tactical' ? (
          <TacticalView />
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Aucun joueur trouvé</h3>
            <p className="text-slate-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200 hover:border-blue-300"
              >
                {/* Card Header - UNCHANGED */}
                <div className="relative h-32 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                  <div className="absolute top-4 right-4 flex gap-2">
                    {player.isInjured && (
                      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                        <HeartPulse className="w-3 h-3" />
                        {player.injuryDuration}sem
                      </span>
                    )}
                    {player.transferStatus === 'wanted' && (
                      <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        <Zap className="w-3 h-3 inline" /> Visé
                      </span>
                    )}
                    {player.transferStatus === 'available' && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        <ArrowRightLeft className="w-3 h-3 inline" />
                      </span>
                    )}
                    {/* NEW: Contract Alert Badge */}
                    {player.contractMonthsLeft <= 6 && (
                      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        <Clock className="w-3 h-3 inline" /> {player.contractMonthsLeft}m
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute -bottom-8 left-4">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                      <span className="text-3xl font-black text-slate-900">
                        {player.jerseyNumber}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="text-3xl filter drop-shadow-lg">{player.flag}</span>
                  </div>
                </div>

                {/* Card Body - ENHANCED with Sparkline */}
                <div className="pt-10 pb-4 px-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getPositionColor(player.position)}`} />
                        {player.positionLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Note</div>
                      <div className="text-2xl font-black text-slate-900">{player.rating}</div>
                    </div>
                  </div>

                  {/* NEW: Mini Sparkline */}
                  <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkline data={player.formHistory} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-slate-900">{player.goals}</div>
                      <div className="text-xs text-slate-500">Buts</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-slate-900">{player.assists}</div>
                      <div className="text-xs text-slate-500">Passes</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-slate-900">{player.matches}</div>
                      <div className="text-xs text-slate-500">Matchs</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getFormColor(player.form)}`} />
                      <span className="text-xs text-slate-600 capitalize">{getFormLabel(player.form)}</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-600">
                      {formatValue(player.marketValue)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Joueur</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Position</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Stats</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Forme</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlayers.map((player) => (
                  <tr 
                    key={player.id} 
                    onClick={() => setSelectedPlayer(player)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                          {player.jerseyNumber}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {player.name}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            <span>{player.flag}</span>
                            <span>{player.age} ans</span>
                            {player.isInjured && <HeartPulse className="w-4 h-4 text-rose-500 ml-1" />}
                            {player.contractMonthsLeft <= 6 && <Clock className="w-4 h-4 text-amber-500 ml-1" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getPositionColor(player.position)}`} />
                        {player.positionLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{player.goals}</div>
                          <div className="text-xs text-slate-500">Buts</div>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{player.assists}</div>
                          <div className="text-xs text-slate-500">Passes</div>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{player.rating}</div>
                          <div className="text-xs text-slate-500">Note</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getFormColor(player.form)} bg-opacity-10 text-slate-700`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${getFormColor(player.form)}`} />
                        {getFormLabel(player.form)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold text-emerald-600">{formatValue(player.marketValue)}</div>
                      <div className="text-xs text-slate-400">Valeur marchande</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Player Detail Modal - ENHANCED */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => { setSelectedPlayer(null); setComparePlayer(null); setActiveTab('overview'); }}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - UNCHANGED */}
            <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>
               <button
                  onClick={() => setShowTransferModal(true)}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                  title="Gérer le transfert"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowContractModal(true)}
                  className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                  title="Gérer le contrat"
                >
                  <FileText className="w-5 h-5" />
                </button>
<button
                  onClick={() => setShowDocumentGenerator(true)}
                  className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                  title="Générer documents"
                >
                  <FilePlus className="w-5 h-5" />
                </button>
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* NEW: Compare Button */}
              <button
                onClick={() => setComparePlayer(comparePlayer ? null : players.find(p => p.id !== selectedPlayer.id && p.position === selectedPlayer.position) || null)}
                className="absolute top-4 right-16 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
                title="Comparer"
              >
                <GitCompare className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white transform translate-y-8">
                  <span className="text-6xl font-black text-slate-900">
                    {selectedPlayer.jerseyNumber}
                  </span>
                </div>
                
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{selectedPlayer.flag}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getPositionColor(selectedPlayer.position)}`}>
                      {selectedPlayer.positionLabel}
                    </span>
                    {selectedPlayer.isInjured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white flex items-center gap-1">
                        <HeartPulse className="w-3 h-3" /> Blessé
                      </span>
                    )}
                    {selectedPlayer.contractMonthsLeft <= 6 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Contrat &lt; 6 mois
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-1">{selectedPlayer.name}</h2>
                  <p className="text-slate-300 flex items-center gap-4">
                    <span>{selectedPlayer.country}</span>
                    <span>•</span>
                    <span>{selectedPlayer.age} ans</span>
                    <span>•</span>
                    <span>{selectedPlayer.height}cm</span>
                    <span>•</span>
                    <span>{selectedPlayer.weight}kg</span>
                  </p>
                </div>

                <div className="text-right pb-2">
                  <div className="text-5xl font-black text-white mb-1">{selectedPlayer.rating}</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">Note Moyenne</div>
                </div>
              </div>
            </div>
{/* NEW: Transfer/Contract Alert Banner */}
            {(selectedPlayer.transferStatus === 'available' || selectedPlayer.transferStatus === 'wanted') && (
              <div className="mx-8 mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">Sur le marché des transferts</div>
                    <div className="text-sm text-blue-700">{selectedPlayer.offers.length} offre(s) en attente</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTransferModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Gérer les offres
                </button>
              </div>
            )}

            {selectedPlayer.contractMonthsLeft <= 6 && (
              <div className="mx-8 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-amber-900">Contrat à renouveler</div>
                    <div className="text-sm text-amber-700">Expire dans {selectedPlayer.contractMonthsLeft} mois</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContractModal(true)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700"
                >
                  Renouveler
                </button>
              </div>
            )}


            {/* NEW: Navigation Tabs */}
            <div className="pt-12 px-8 border-b border-slate-200">
              <div className="flex gap-6">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                  { id: 'physical', label: 'Profil Physique', icon: Activity },
                  { id: 'history', label: 'Historique', icon: History },
                  { id: 'contract', label: 'Contrat', icon: Calendar },
                                   { id: 'transfer', label: 'Transfert', icon: ArrowRightLeft }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body with Tabs */}
            <div className="p-8">
              {/* Transfer Status Banner - UNCHANGED */}
              <div className="mb-8">
                {selectedPlayer.transferStatus === 'available' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <ArrowRightLeft className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900">Disponible au transfert</h4>
                        <p className="text-blue-700 text-sm">Le joueur est sur le marché des transferts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">{formatValue(selectedPlayer.marketValue)}</div>
                      <div className="text-sm text-blue-600">Prix demandé</div>
                    </div>
                  </div>
                )}
                {selectedPlayer.transferStatus === 'wanted' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900">Intérêt des grands clubs</h4>
                        <p className="text-amber-700 text-sm">Plusieurs offres en cours d'étude</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-900">{formatValue(selectedPlayer.marketValue * 1.2)}</div>
                      <div className="text-sm text-amber-600">Clause libératoire</div>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB: Overview */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Statistiques de la saison</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                          <div className="text-3xl font-black text-slate-900 mb-1">{selectedPlayer.goals}</div>
                          <div className="text-sm text-slate-500">Buts marqués</div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                          <div className="text-3xl font-black text-slate-900 mb-1">{selectedPlayer.assists}</div>
                          <div className="text-sm text-slate-500">Passes décisives</div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                          <div className="text-3xl font-black text-slate-900 mb-1">{selectedPlayer.matches}</div>
                          <div className="text-sm text-slate-500">Matchs joués</div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                          <div className="text-3xl font-black text-slate-900 mb-1">{selectedPlayer.minutesPlayed}</div>
                          <div className="text-sm text-slate-500">Minutes</div>
                        </div>
                      </div>
                    </div>

                    {/* NEW: Recent Matches */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-500" />
                        Derniers matchs
                      </h3>
                      <div className="space-y-2">
                        {selectedPlayer.lastMatches.map((match, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                                match.result.startsWith('V') ? 'bg-emerald-100 text-emerald-700' :
                                match.result.startsWith('D') ? 'bg-rose-100 text-rose-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {match.result.split(' ')[0]}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">vs {match.opponent}</div>
                                <div className="text-xs text-slate-500">{match.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-slate-900">{match.rating}</div>
                              <div className="text-xs text-slate-500">Note</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* NEW: Radar Chart */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-4">Profil des capacités</h4>
                      <RadarChart player={selectedPlayer} />
                    </div>

                    {/* NEW: Form History Chart */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-4">Évolution des notes (10 derniers matchs)</h4>
                      <div className="h-32 flex items-end gap-1">
                        {selectedPlayer.formHistory.map((rating, i) => {
                          const height = (rating / 10) * 100;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600 relative group" style={{ height: `${height}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  {rating}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Physical */}
              {activeTab === 'physical' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-2">{selectedPlayer.speed}</div>
                    <div className="text-slate-600 font-medium">Vitesse</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedPlayer.speed}%` }} />
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-2">{selectedPlayer.stamina}</div>
                    <div className="text-slate-600 font-medium">Endurance</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${selectedPlayer.stamina}%` }} />
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Swords className="w-8 h-8 text-rose-600" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-2">{selectedPlayer.strength}</div>
                    <div className="text-slate-600 font-medium">Force</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${selectedPlayer.strength}%` }} />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">Caractéristiques physiques détaillées</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <Footprints className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-sm text-slate-500">Pied fort</div>
                          <div className="font-semibold text-slate-900 capitalize">
                            {selectedPlayer.preferredFoot === 'left' ? 'Gauche' : 
                             selectedPlayer.preferredFoot === 'right' ? 'Droit' : 'Ambidextre'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-sm text-slate-500">Taille</div>
                          <div className="font-semibold text-slate-900">{selectedPlayer.height} cm</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-sm text-slate-500">Poids</div>
                          <div className="font-semibold text-slate-900">{selectedPlayer.weight} kg</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-sm text-slate-500">IMC</div>
                          <div className="font-semibold text-slate-900">
                            {(selectedPlayer.weight / ((selectedPlayer.height/100) ** 2)).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: History */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">Historique des blessures</h4>
                    {selectedPlayer.isInjured ? (
                      <div className="flex items-start gap-4 bg-rose-50 rounded-xl p-4 border border-rose-200">
                        <HeartPulse className="w-6 h-6 text-rose-500 mt-1" />
                        <div>
                          <div className="font-semibold text-rose-900">Blessure actuelle</div>
                          <div className="text-rose-700">{selectedPlayer.injuryDetails}</div>
                          <div className="text-sm text-rose-600 mt-1">Durée estimée: {selectedPlayer.injuryDuration} semaines</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="font-medium">Aucune blessure récente - Joueur disponible</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">Évolution de la valeur marchande</h4>
                    <div className="h-40 flex items-end gap-2">
                      {[0.8, 0.9, 1.0, 1.1, 1.2, 1.15, 1.3, 1.25, 1.4, 1.0].map((mult, i) => (
                        <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm transition-all"
                            style={{ height: `${mult * 60}%` }}
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {formatValue(selectedPlayer.marketValue * mult)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>Il y a 1 an</span>
                      <span>Aujourd'hui</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Contract */}
              {activeTab === 'contract' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">Informations contractuelles</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                        <span className="text-slate-600">Date de fin</span>
                        <span className="font-semibold text-slate-900">{new Date(selectedPlayer.contractEnd).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                        <span className="text-slate-600">Mois restants</span>
                        <span className={`font-semibold ${selectedPlayer.contractMonthsLeft <= 6 ? 'text-amber-600' : 'text-slate-900'}`}>
                          {selectedPlayer.contractMonthsLeft} mois
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                        <span className="text-slate-600">Statut</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedPlayer.transferStatus === 'available' ? 'bg-blue-100 text-blue-700' :
                          selectedPlayer.transferStatus === 'wanted' ? 'bg-amber-100 text-amber-700' :
                          selectedPlayer.transferStatus === 'loan' ? 'bg-purple-100 text-purple-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {selectedPlayer.transferStatus === 'available' ? 'Transférable' :
                           selectedPlayer.transferStatus === 'wanted' ? 'Visé' :
                           selectedPlayer.transferStatus === 'loan' ? 'En prêt' : 'Sous contrat'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-slate-600">Valeur actuelle</span>
                        <span className="font-bold text-emerald-600 text-lg">{formatValue(selectedPlayer.marketValue)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">Recommandations</h4>
                    <div className="space-y-3">
                      {selectedPlayer.contractMonthsLeft <= 6 && (
                        <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4 border border-amber-200">
                          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-amber-900">Renouvellement urgent</div>
                            <div className="text-sm text-amber-700">Le contrat expire dans moins de 6 mois. Négociations recommandées.</div>
                          </div>
                        </div>
                      )}
                      {selectedPlayer.transferStatus === 'wanted' && (
                        <div className="flex items-start gap-3 bg-rose-50 rounded-xl p-4 border border-rose-200">
                          <TrendingUp className="w-5 h-5 text-rose-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-rose-900">Risque de départ</div>
                            <div className="text-sm text-rose-700">Intérêt confirmé d'autres clubs. Proposition de prolongation ou vente conseillée.</div>
                          </div>
                        </div>
                      )}
                      {selectedPlayer.form === 'excellent' && selectedPlayer.transferStatus === 'unavailable' && (
                        <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                          <Star className="w-5 h-5 text-emerald-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-emerald-900">Pilier de l'équipe</div>
                            <div className="text-sm text-emerald-700">Performance exceptionnelle. Envisager une revalorisation salariale.</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* NEW: Transfer Tab */}
              {activeTab === 'transfer' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">{selectedPlayer.offers.length}</div>
                      <div className="text-sm text-slate-500">Offres reçues</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">
                        {formatValue(selectedPlayer.offers.filter(o => o.status === 'accepted').reduce((acc, o) => acc + o.amount, 0))}
                      </div>
                      <div className="text-sm text-slate-500">Valeur totale acceptée</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {formatValue(Math.max(...selectedPlayer.offers.map(o => o.amount), 0))}
                      </div>
                      <div className="text-sm text-slate-500">Meilleure offre</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900">Offres en cours</h3>
                    {selectedPlayer.offers.map((offer) => (
                      <div key={offer.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{offer.fromClub}</div>
                          <div className="text-sm text-slate-500">{formatValue(offer.amount)} • {offer.type === 'loan' ? 'Prêt' : 'Transfert'}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          offer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          offer.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                          offer.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {offer.status === 'pending' ? 'En attente' :
                           offer.status === 'accepted' ? 'Acceptée' :
                           offer.status === 'rejected' ? 'Refusée' : 'Contre-proposition'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowTransferModal(true)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                    Ouvrir le centre de négociation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
{showTransferModal && <TransferModal />}
      {showContractModal && <ContractModal />}

       {showAgentContact && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[80] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Phone className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <div className="font-bold">Appel en cours...</div>
            <div className="text-sm text-slate-400">Contact avec {selectedPlayer?.agentName}</div>
          </div>
        </div>
      )}

      {/* Document Sender Toast */}
      {showDocumentSender && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[80] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Send className="w-5 h-5 text-blue-400 animate-bounce" />
          <div>
            <div className="font-bold">Envoi en cours...</div>
            <div className="text-sm text-slate-400">Transmission des documents</div>
          </div>
        </div>
      )}

       {/* Document Generator Modal */}
      {showDocumentGenerator && selectedPlayer && (
        <DocumentGenerator 
          player={selectedPlayer}
          onClose={() => setShowDocumentGenerator(false)}
          onGenerate={handleGenerateDocument}
        />
      )}

      {/* NEW: Comparison Modal */}
      {comparePlayer && selectedPlayer && (
        <div 
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setComparePlayer(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <GitCompare className="w-6 h-6 text-blue-500" />
                Comparaison
              </h2>
              <button onClick={() => setComparePlayer(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Player 1 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {selectedPlayer.jerseyNumber}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedPlayer.name}</h3>
                <p className="text-slate-500">{selectedPlayer.positionLabel}</p>
              </div>

              {/* Stats Comparison */}
              <div className="space-y-4">
                <div className="text-center text-sm font-medium text-slate-400 uppercase">VS</div>
                {[
                  { label: 'Note', p1: selectedPlayer.rating, p2: comparePlayer.rating, max: 10 },
                  { label: 'Buts', p1: selectedPlayer.goals, p2: comparePlayer.goals, max: 30 },
                  { label: 'Passes', p1: selectedPlayer.assists, p2: comparePlayer.assists, max: 20 },
                  { label: 'Valeur', p1: selectedPlayer.marketValue/1000000, p2: comparePlayer.marketValue/1000000, max: 50, suffix: 'M€' },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span className={stat.p1 > stat.p2 ? 'text-blue-600' : 'text-slate-600'}>{stat.p1}{stat.suffix || ''}</span>
                      <span className="text-slate-400">{stat.label}</span>
                      <span className={stat.p2 > stat.p1 ? 'text-blue-600' : 'text-slate-600'}>{stat.p2}{stat.suffix || ''}</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="flex-1 bg-slate-100 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${(stat.p1 / stat.max) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${(stat.p2 / stat.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {comparePlayer.jerseyNumber}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{comparePlayer.name}</h3>
                <p className="text-slate-500">{comparePlayer.positionLabel}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => { setSelectedPlayer(comparePlayer); setComparePlayer(null); }}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
              >
                Voir profil complet de {comparePlayer.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;