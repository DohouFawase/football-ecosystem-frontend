'use client';

import React, { useState } from "react";
import { 
  Bell, MessageSquare, AlertTriangle, CheckCircle, 
  X, User, Settings, LogOut, ChevronDown, Search,
  Crown, Shield, Building2, Users, Wallet, 
  Target, Star, Zap, Activity, TrendingUp, Command
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";


type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'ORGANIZATION_OWNER' 
  | 'TEAM_MANAGER' 
  | 'COACH' 
  | 'PLAYER' 
  | 'BETTOR' 
  | 'MATCH_OPERATOR' 
  | 'AGENT' 
  | 'SCOUT' 
  | 'ANALYST' 
  | 'SUPPORT_AGENT';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    path: string;
  };
}

interface NotificationConfig {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  label: string;
}

const roleConfig: Record<UserRole, NotificationConfig> = {
  SUPER_ADMIN: { icon: Crown, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "Admin" },
  ADMIN: { icon: Shield, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", label: "Admin" },
  ORGANIZATION_OWNER: { icon: Building2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "Organisateur" },
  TEAM_MANAGER: { icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "Manager" },
  COACH: { icon: Target, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200", label: "Coach" },
  PLAYER: { icon: Star, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", label: "Joueur" },
  BETTOR: { icon: Wallet, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "Parieur" },
  MATCH_OPERATOR: { icon: Activity, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Opérateur" },
  AGENT: { icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200", label: "Agent" },
  SCOUT: { icon: Zap, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", label: "Scout" },
  ANALYST: { icon: Activity, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200", label: "Analyste" },
  SUPPORT_AGENT: { icon: MessageSquare, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200", label: "Support" },
};

const mockNotifications: Record<UserRole, Notification[]> = {
  MATCH_OPERATOR: [
    { 
      id: '1', 
      type: 'urgent', 
      title: 'Match Live #456', 
      message: 'Paris SG vs Marseille - 78ème minute, score 2-1. Action requise sur carton rouge.', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Contrôler', path: '/dashboard/live-match/456' } 
    },
    { 
      id: '2', 
      type: 'warning', 
      title: 'VAR En cours', 
      message: 'Révision de hors-jeu sur l\'action du 75ème minute. Attente décision.', 
      timestamp: new Date(Date.now() - 180000), 
      read: false,
      action: { label: 'Voir VAR', path: '/dashboard/var/456' }
    },
    { 
      id: '3', 
      type: 'error', 
      title: 'Connexion caméra 3', 
      message: 'Perte de signal sur la caméra angle but nord. Technicien alerté.', 
      timestamp: new Date(Date.now() - 600000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'info', 
      title: 'Mi-temps imminente', 
      message: 'Match #455 entrera en mi-temps dans 2 minutes. Préparer stats.', 
      timestamp: new Date(Date.now() - 900000), 
      read: true 
    },
    { 
      id: '5', 
      type: 'success', 
      title: 'Match terminé #454', 
      message: 'Lyon 3-0 Nice - Rapport complet généré et validé.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: true,
      action: { label: 'Rapport', path: '/dashboard/reports/454' }
    },
  ],

  SUPER_ADMIN: [
    { 
      id: '1', 
      type: 'urgent', 
      title: 'Alerte Sécurité Critique', 
      message: 'Tentative de connexion suspecte détectée depuis IP 192.168.x.x (Russie). Accès bloqué.', 
      timestamp: new Date(), 
      read: false,
      action: { label: 'Investiguer', path: '/admin/security/alerts' }
    },
    { 
      id: '2', 
      type: 'urgent', 
      title: 'Backup Échoué', 
      message: 'La sauvegarde automatique de 03h00 a échoué. Espace disque insuffisant.', 
      timestamp: new Date(Date.now() - 1800000), 
      read: false,
      action: { label: 'Résoudre', path: '/admin/system/backup' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: '3 Organisations en attente', 
      message: 'FC Lorient, Racing Club Lens et AS Monaco demandent la validation de leur compte pro.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: false,
      action: { label: 'Approuver', path: '/admin/organizations/pending' }
    },
    { 
      id: '4', 
      type: 'warning', 
      title: 'Performance Serveur', 
      message: 'CPU à 87% sur le serveur principal. Envisager scaling vertical.', 
      timestamp: new Date(Date.now() - 14400000), 
      read: false 
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Mise à jour système', 
      message: 'Version 2.4.1 déployée avec succès. Aucune anomalie détectée.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true 
    },
    { 
      id: '6', 
      type: 'success', 
      title: 'Audit de sécurité', 
      message: 'Rapport trimestriel : 0 vulnérabilité critique. Certification ISO maintenue.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true,
      action: { label: 'Voir rapport', path: '/admin/audit/q3-2024' }
    },
  ],

  ORGANIZATION_OWNER: [
    { 
      id: '1', 
      type: 'warning', 
      title: '2 Équipes en attente', 
      message: 'Les équipes U19 Féminines et B seniors n\'ont pas complété leur inscription.', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Finaliser', path: '/dashboard/teams/pending' } 
    },
    { 
      id: '2', 
      type: 'warning', 
      title: 'Document manquant', 
      message: 'Attestation d\'assurance requise pour le tournoi régional du 15/03.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: false,
      action: { label: 'Uploader', path: '/dashboard/documents' }
    },
    { 
      id: '3', 
      type: 'success', 
      title: 'Cotisation reçue - Équipe Alpha', 
      message: 'Paiement de 2,450€ confirmé. Réf: TRX-884721.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: true,
      action: { label: 'Reçu', path: '/dashboard/invoices/884721' }
    },
    { 
      id: '4', 
      type: 'error', 
      title: 'Incident Match #234', 
      message: 'Blessure grave joueur #14. Procédure déclarée à la FFF requise sous 24h.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: false,
      action: { label: 'Déclarer', path: '/dashboard/incidents/234' }
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Assemblée générale', 
      message: 'Rappel : AG prévue le 20/03 à 19h00. Ordre du jour disponible.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true,
      action: { label: 'ODJ', path: '/dashboard/agenda/ag-2024' }
    },
    { 
      id: '6', 
      type: 'success', 
      title: 'Partenariat signé', 
      message: 'Nike prolonge jusqu\'en 2026. +15% sur la dotation matériel.', 
      timestamp: new Date(Date.now() - 259200000), 
      read: true 
    },
  ],

  TEAM_MANAGER: [
    { 
      id: '1', 
      type: 'info', 
      title: 'Entraînement déplacé', 
      message: 'Séance de 18h déplacée au terrain synthétique (pluie). Prévoir crampons moulés.', 
      timestamp: new Date(), 
      read: false 
    },
    { 
      id: '2', 
      type: 'warning', 
      title: 'Martin D. - Blessure', 
      message: 'Entorse cheville droite lors de l\'échauffement. Indisponible 2-3 semaines.', 
      timestamp: new Date(Date.now() - 1800000), 
      read: false, 
      action: { label: 'Gérer effectif', path: '/dashboard/squad/medical' } 
    },
    { 
      id: '3', 
      type: 'warning', 
      title: '3 Absents entraînement', 
      message: 'Durand (grippe), Petit (convocation), Bernard (sans justification).', 
      timestamp: new Date(Date.now() - 10800000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Victoire 3-1 !', 
      message: 'Félicitations à l\'équipe. Classement : 2ème (+3 pts sur le 3ème).', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true,
      action: { label: 'Stats', path: '/dashboard/matches/last' }
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Réunion staff', 
      message: 'Briefing avant match demain 12h30. Salle vidéo.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true 
    },
    { 
      id: '6', 
      type: 'success', 
      title: 'Nouveau sponsor', 
      message: 'LocalAuto accepte de sponsoriser les déplacements. +5K€/saison.', 
      timestamp: new Date(Date.now() - 345600000), 
      read: true 
    },
  ],

  COACH: [
    { 
      id: '1', 
      type: 'info', 
      title: 'Rapport analyse disponible', 
      message: 'Analyse tactique du dernier match prête. Focus sur les transitions défensives.', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Consulter', path: '/dashboard/analysis/last' } 
    },
    { 
      id: '2', 
      type: 'info', 
      title: 'Vidéo adversaire', 
      message: 'Les 3 derniers matchs de l\'adversaire du week-end sont uploadés.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: false,
      action: { label: 'Visionner', path: '/dashboard/videos/opponent' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: 'Charge d\'entraînement', 
      message: 'GPS data : 3 joueurs > 85% charge max. Prévoir récupération active demain.', 
      timestamp: new Date(Date.now() - 14400000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Séance validée', 
      message: 'Plan d\'entraînement semaine 12 approuvé par le staff médical.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true 
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Formation continue', 
      message: 'Webinar UEFA sur le pressing haut : 15/03 à 14h00.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true,
      action: { label: 'S\'inscrire', path: '/dashboard/training/uefa-webinar' }
    },
  ],

  PLAYER: [
    { 
      id: '1', 
      type: 'success', 
      title: 'Bonus fidélité débloqué !', 
      message: '50 points gagnés. Échangeable contre 1 séance massage ou équipement.', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Utiliser', path: '/dashboard/rewards' } 
    },
    { 
      id: '2', 
      type: 'info', 
      title: 'Match programmé', 
      message: 'Dimanche 15h vs Stade Rennais (Ext.). Rendez-vous bus à 13h00.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: true,
      action: { label: 'Convocation', path: '/dashboard/convocation/452' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: 'Tests physiques', 
      message: 'Rappel : VMA et tests de vitesse demain 9h00. À jeun.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'But de la semaine !', 
      message: 'Votre but vs Nantes est nominé. Vote ouvert jusqu\'à vendredi.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true,
      action: { label: 'Voter', path: '/dashboard/polls/goal-week' }
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Nouvel équipement', 
      message: 'La nouvelle collection training est arrivée. Disponible au vestiaire.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true 
    },
  ],

  BETTOR: [
    { 
      id: '1', 
      type: 'success', 
      title: 'Paris gagné : +245€ !', 
      message: 'Combiné PSG-Marseille (Nul) + But Mbappé. Cote totale : 4.90', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Retirer', path: '/dashboard/wallet/withdraw' } 
    },
    { 
      id: '2', 
      type: 'warning', 
      title: 'Solde faible', 
      message: 'Il vous reste 8.50€. Rechargez pour ne pas manquer les cotes du week-end.', 
      timestamp: new Date(Date.now() - 1800000), 
      read: false, 
      action: { label: 'Recharger', path: '/dashboard/wallet/deposit' } 
    },
    { 
      id: '3', 
      type: 'info', 
      title: 'Cote boostée x3', 
      message: 'PSG gagne et Mbappé marque. Valable jusqu\'à 20h00.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: true,
      action: { label: 'Parier', path: '/dashboard/bets/boosted' }
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Freebet reçu', 
      message: '5€ offerts pour votre fidélité. À utiliser dans les 7 jours.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true,
      action: { label: 'Utiliser', path: '/dashboard/bets/freebet' }
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'Pari long terme', 
      message: 'Votre pari "PSG Champion" est toujours en cours. Cote initiale : 1.85', 
      timestamp: new Date(Date.now() - 604800000), 
      read: true 
    },
    { 
      id: '6', 
      type: 'warning', 
      title: 'Vérification identité', 
      message: 'Documents requis pour retrait > 1000€. Veuillez uploader votre CNI.', 
      timestamp: new Date(Date.now() - 1209600000), 
      read: false,
      action: { label: 'Vérifier', path: '/dashboard/kyc' }
    },
  ],

  SUPPORT_AGENT: [
    { 
      id: '1', 
      type: 'urgent', 
      title: 'Ticket #1234 - Paiement bloqué', 
      message: 'Client VIP : retrait de 5000€ bloqué depuis 2h. Intervention immédiate requise.', 
      timestamp: new Date(), 
      read: false, 
      action: { label: 'Répondre', path: '/dashboard/tickets/1234' } 
    },
    { 
      id: '2', 
      type: 'urgent', 
      title: 'Escalade technique', 
      message: 'Bug critique : cotes ne s\'affichent pas sur l\'app iOS. 15 tickets liés.', 
      timestamp: new Date(Date.now() - 900000), 
      read: false,
      action: { label: 'Escalader', path: '/dashboard/tech-escalation/ios-bug' }
    },
    { 
      id: '3', 
      type: 'info', 
      title: '5 Nouveaux tickets', 
      message: 'Questions générales : bonus, règles paris, vérification compte.', 
      timestamp: new Date(Date.now() - 1800000), 
      read: false,
      action: { label: 'Traiter', path: '/dashboard/tickets/queue' }
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Ticket résolu #1201', 
      message: 'Problème de connexion résolu. Client satisfait (5★).', 
      timestamp: new Date(Date.now() - 3600000), 
      read: true 
    },
    { 
      id: '5', 
      type: 'warning', 
      title: 'File d\'attente critique', 
      message: '45 tickets en attente. Temps moyen de réponse dépassé de 12min.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: false 
    },
  ],

  ADMIN: [
    { 
      id: '1', 
      type: 'warning', 
      title: 'Modération requise', 
      message: '3 commentaires signalés pour propos inappropriés sur le live match.', 
      timestamp: new Date(), 
      read: false,
      action: { label: 'Modérer', path: '/admin/moderation/comments' }
    },
    { 
      id: '2', 
      type: 'warning', 
      title: 'Contenu à vérifier', 
      message: 'Photo de profil inappropriée détectée (IA). Utilisateur #45821.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: false 
    },
    { 
      id: '3', 
      type: 'info', 
      title: 'Rapport hebdomadaire', 
      message: '12 nouveaux utilisateurs, 3 suspensions, 98.5% de modération auto.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true,
      action: { label: 'Rapport', path: '/admin/reports/weekly' }
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Campagne validée', 
      message: 'Nouvelle bannière promotionnelle approuvée pour le week-end.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true 
    },
  ],

  AGENT: [
    { 
      id: '1', 
      type: 'info', 
      title: 'Nouvelle offre - J. Martin', 
      message: 'Manchester United propose 45M€ + 5M€ bonus. Deadline : 48h.', 
      timestamp: new Date(), 
      read: false,
      action: { label: 'Négocier', path: '/deals/martin-2024' }
    },
    { 
      id: '2', 
      type: 'success', 
      title: 'Contrat signé !', 
      message: 'K. Thuram prolonge jusqu\'en 2028. +20% de salaire.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: true,
      action: { label: 'Voir contrat', path: '/contracts/thuram-2028' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: 'Clause libératoire', 
      message: 'Alerte : clause de A. Tchouaméni activée par Real Madrid (80M€).', 
      timestamp: new Date(Date.now() - 14400000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'info', 
      title: 'Réunion transfert', 
      message: 'Mercato été : stratégie avec le Directeur Sportif. Demain 10h.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true 
    },
  ],

  SCOUT: [
    { 
      id: '1', 
      type: 'success', 
      title: 'Rapport validé : K. Mbappé', 
      message: 'Note finale : 18.5/20. Recommandation : Signature immédiate.', 
      timestamp: new Date(), 
      read: true,
      action: { label: 'Rapport', path: '/reports/mbappe-2024' }
    },
    { 
      id: '2', 
      type: 'info', 
      title: 'Match à observer', 
      message: 'Demain 20h : OL vs PSG. Cibles : Cherki, Zaïre-Emery.', 
      timestamp: new Date(Date.now() - 3600000), 
      read: false,
      action: { label: 'Briefing', path: '/missions/lyon-psg-2024' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: 'Joueur blessé', 
      message: 'V. Wanyama (cible) sorti sur blessure 12ème minute. À suivre.', 
      timestamp: new Date(Date.now() - 10800000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Découverte validée', 
      message: 'Votre recommandation E. Camavinga (2019) classée "Historique".', 
      timestamp: new Date(Date.now() - 259200000), 
      read: true 
    },
  ],

  ANALYST: [
    { 
      id: '1', 
      type: 'info', 
      title: 'Nouvelles données importées', 
      message: 'Stats Opta du weekend intégrées. 342 matchs, 12,456 événements.', 
      timestamp: new Date(), 
      read: false,
      action: { label: 'Explorer', path: '/data/weekend-2024' }
    },
    { 
      id: '2', 
      type: 'info', 
      title: 'Modèle prédiction mis à jour', 
      message: 'Accuracy : 73.2% (+1.4%). Nouveaux features : pression défensive.', 
      timestamp: new Date(Date.now() - 7200000), 
      read: false,
      action: { label: 'Voir modèle', path: '/models/prediction-v3' }
    },
    { 
      id: '3', 
      type: 'warning', 
      title: 'Anomalie détectée', 
      message: 'Expected Goals vs Réels : écart anormal sur 3 matchs Ligue 2.', 
      timestamp: new Date(Date.now() - 14400000), 
      read: false 
    },
    { 
      id: '4', 
      type: 'success', 
      title: 'Rapport automatique', 
      message: 'Analyse comparative équipes générée et envoyée au staff.', 
      timestamp: new Date(Date.now() - 86400000), 
      read: true 
    },
    { 
      id: '5', 
      type: 'info', 
      title: 'API Football-data', 
      message: 'Nouveau endpoint disponible : xT (Expected Threat) en temps réel.', 
      timestamp: new Date(Date.now() - 172800000), 
      read: true 
    },
  ],
};

const getNotifStyles = (type: Notification['type']) => {
  const styles = {
    info: { icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50' },
    success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    error: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    urgent: { icon: Zap, color: 'text-rose-600', bg: 'bg-rose-50' },
  };
  return styles[type];
};

const formatTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 1) return 'Maintenant';
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(diff / 86400000)}j`;
};

interface Props {
  userRole: UserRole;
  userName: string;
  userAvatar?: string;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

export default function ChicHeader({ 
  userRole = 'MATCH_OPERATOR',
  userName = 'Jean Dupont',
  userAvatar,
  onLogout,
  onSearch
}: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const config = roleConfig[userRole];
  const notifications = mockNotifications[userRole] || [];
  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUrgent = notifications.some(n => n.type === 'urgent' && !n.read);

  const RoleIcon = config.icon;

  const handleClick = (notif: Notification) => {
    if (notif.action) router.push(notif.action.path);
    setNotifOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Gauche - Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl ${config.bg} border ${config.border}`}
            >
              <RoleIcon size={20} className={config.color} />
              <span className={`text-sm font-bold ${config.color}`}>{config.label}</span>
            </motion.div>
          </div>

          {/* Centre - Search Bar Chic */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <motion.div 
              className={`relative flex items-center transition-all duration-300 ${
                searchFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300
                ${searchFocused ? `${config.bg} opacity-50` : 'bg-slate-100'}
              `} />
              
              <div className="relative flex items-center w-full">
                <Search 
                  size={18} 
                  className={`absolute left-4 transition-colors duration-300 ${
                    searchFocused ? config.color : 'text-slate-400'
                  }`} 
                />
                
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Rechercher..."
                  className={`
                    w-full pl-11 pr-20 py-2.5 bg-transparent rounded-2xl
                    text-sm text-slate-700 placeholder:text-slate-400
                    focus:outline-none
                  `}
                />
                
                <div className="absolute right-2 flex items-center gap-1">
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => setSearchValue('')}
                      className="p-1.5 rounded-lg hover:bg-slate-200/50 text-slate-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                  
                  <kbd className={`
                    hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-medium
                    ${searchFocused ? `${config.bg} ${config.color}` : 'bg-slate-200 text-slate-500'}
                  `}>
                    <Command size={10} />
                    <span>K</span>
                  </kbd>
                </div>
              </div>

              {/* Ligne d'accent quand focus */}
              <motion.div 
                className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${config.color.replace('text-', 'bg-')}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: searchFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </form>

          {/* Droite - Actions */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Status mobile */}
            <div className="md:hidden flex items-center">
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className={`
                  relative p-2.5 rounded-xl transition-all duration-200
                  ${notifOpen 
                    ? `${config.bg} ${config.color} shadow-sm` 
                    : 'hover:bg-slate-100 text-slate-600'
                  }
                `}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
                {hasUrgent && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                  >
                    <div className={`px-4 py-3 ${config.bg} border-b ${config.border} flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <RoleIcon size={16} className={config.color} />
                        <span className={`text-sm font-bold ${config.color}`}>Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <button 
                          onClick={() => {}} 
                          className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                        >
                          Tout lire
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell size={32} className="mx-auto mb-2 text-slate-200" />
                          <p className="text-sm text-slate-400">Aucune notification</p>
                        </div>
                      ) : (
                        notifications.map((notif, idx) => {
                          const style = getNotifStyles(notif.type);
                          const Icon = style.icon;
                          return (
                            <motion.button
                              key={notif.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => handleClick(notif)}
                              className={`
                                w-full flex items-start gap-3 p-3 text-left border-b border-slate-50 last:border-0 
                                hover:bg-slate-50 transition-colors relative group
                                ${!notif.read ? 'bg-slate-50/50' : ''}
                              `}
                            >
                              {!notif.read && (
                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${config.color.replace('text-', 'bg-')}`} />
                              )}
                              
                              <div className={`p-2 rounded-lg ${style.bg} ${style.color} shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon size={16} />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <p className={`text-sm font-semibold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {notif.title}
                                  </p>
                                  <span className="text-[10px] text-slate-400 font-medium">{formatTime(notif.timestamp)}</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{notif.message}</p>
                                {notif.action && (
                                  <span className={`inline-block mt-2 text-[10px] font-bold ${config.color}`}>
                                    {notif.action.label} →
                                  </span>
                                )}
                              </div>
                            </motion.button>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profil */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className={`
                  flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all
                  ${profileOpen ? `${config.bg} shadow-sm` : 'hover:bg-slate-100'}
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg ${config.bg} ${config.color} 
                  flex items-center justify-center text-sm font-bold
                  border ${config.border}
                `}>
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                  )}
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} 
                />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                  >
                    <div className={`p-4 ${config.bg} border-b ${config.border}`}>
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-12 h-12 rounded-xl bg-white ${config.color} 
                          flex items-center justify-center text-lg font-bold shadow-sm
                          border ${config.border}
                        `}>
                          {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{userName}</p>
                          <p className={`text-xs font-semibold ${config.color}`}>{config.label}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors group">
                        <User size={18} className="text-slate-400 group-hover:text-slate-600" />
                        Profil
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors group">
                        <Settings size={18} className="text-slate-400 group-hover:text-slate-600" />
                        Paramètres
                      </button>
                      <div className="h-px bg-slate-100 my-1" />
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium transition-colors group"
                      >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {(notifOpen || profileOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </>
  );
}