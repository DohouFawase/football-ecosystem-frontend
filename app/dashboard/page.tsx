'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Line
} from 'recharts';
import {
  Activity, TrendingUp, Users, DollarSign, Target, Award, Calendar,
  AlertCircle, BarChart3, Clock, ArrowUpRight, ArrowDownRight, Zap, Star,
  ChevronRight, Filter, RefreshCw, Bell, MapPin, Globe, Shield, Percent,
  Flame, Trophy, Crown, Sparkles, CheckCircle, XCircle, Wifi,
  Database, Cloud, FileText, Mail, Video, Download, Info, AlertTriangle, Check
} from 'lucide-react';

// ============================================================
// THEMES PAR ROLE
// ============================================================
const ROLE_THEMES: Record<string, any> = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colors: { primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  ADMIN: {
    name: 'Administrateur',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    colors: { primary: '#3B82F6', secondary: '#0EA5E9', accent: '#06B6D4', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  BETTOR: {
    name: 'Parieur',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    colors: { primary: '#10B981', secondary: '#14B8A6', accent: '#06B6D4', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  ORGANIZATION_OWNER: {
    name: 'Organisation',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    colors: { primary: '#F59E0B', secondary: '#F97316', accent: '#EF4444', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  MANAGER: {
    name: 'Manager',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    colors: { primary: '#06B6D4', secondary: '#0EA5E9', accent: '#3B82F6', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  MANAGER: {
    name: 'Manager',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    colors: { primary: '#06B6D4', secondary: '#0EA5E9', accent: '#3B82F6', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  COACH: {
    name: 'Entraîneur',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    colors: { primary: '#EF4444', secondary: '#F43F5E', accent: '#EC4899', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  PLAYER: {
    name: 'Joueur',
    gradient: 'linear-gradient(135deg, #52c234 0%, #061700 100%)',
    colors: { primary: '#84CC16', secondary: '#10B981', accent: '#14B8A6', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  MATCH_OPERATOR: {
    name: 'Opérateur',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    colors: { primary: '#8B5CF6', secondary: '#A855F7', accent: '#C026D3', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  AGENT: {
    name: 'Agent',
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    colors: { primary: '#64748B', secondary: '#475569', accent: '#94A3B8', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  SCOUT: {
    name: 'Scout',
    gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    colors: { primary: '#14B8A6', secondary: '#06B6D4', accent: '#0EA5E9', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  ANALYST: {
    name: 'Analyste',
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    colors: { primary: '#6366F1', secondary: '#3B82F6', accent: '#0EA5E9', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  },
  SUPPORT_AGENT: {
    name: 'Support',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    colors: { primary: '#EC4899', secondary: '#F43F5E', accent: '#EF4444', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
  }
};

// ============================================================
// DONNÉES PAR ROLE
// ============================================================
const ROLE_DATA: Record<string, any> = {
  SUPER_ADMIN: {
    title: 'Plateforme Globale',
    subtitle: 'Supervision & Contrôle Total',
    kpis: [
      { id: 'orgs', label: 'Organisations', value: 156, prev: 144, target: 200, unit: '', icon: Users, trend: 'up', description: 'Organisations actives', details: { 'Nouvelles (30j)': 12, 'Actives': 148, 'En pause': 5, 'Inactives': 3, 'Churn rate': '2.1%', 'Revenue/org': '€16,400' }, chart: [{ name: 'Jan', value: 132 }, { name: 'Fév', value: 138 }, { name: 'Mar', value: 142 }, { name: 'Avr', value: 145 }, { name: 'Mai', value: 150 }, { name: 'Juin', value: 144 }, { name: 'Juil', value: 156 }] },
      { id: 'users', label: 'Utilisateurs', value: 12543, prev: 11600, target: 15000, unit: '', icon: Activity, trend: 'up', description: 'Base utilisateurs totale', details: { 'Actifs quotidiens': '4,832', 'Actifs hebdo': '8,234', 'Taux engagement': '68.4%', 'Sessions/jour': '3.2', 'Durée moyenne': '12m 34s' }, chart: [{ name: 'Jan', value: 9200 }, { name: 'Fév', value: 9800 }, { name: 'Mar', value: 10400 }, { name: 'Avr', value: 10900 }, { name: 'Mai', value: 11200 }, { name: 'Juin', value: 11600 }, { name: 'Juil', value: 12543 }] },
      { id: 'bets', label: 'Paris Actifs', value: 8234, prev: 7160, target: 10000, unit: '', icon: Target, trend: 'up', description: 'Paris en cours et pending', details: { 'Live': 234, 'Pending': '1,432', 'Stake total': '€543,200', 'Cote moyenne': '2.35' }, chart: [{ name: 'Jan', value: 5100 }, { name: 'Fév', value: 5600 }, { name: 'Mar', value: 6200 }, { name: 'Avr', value: 6700 }, { name: 'Mai', value: 7100 }, { name: 'Juin', value: 7160 }, { name: 'Juil', value: 8234 }] },
      { id: 'revenue', label: 'Revenus', value: 2543200, prev: 2067400, target: 3000000, unit: '€', icon: DollarSign, trend: 'up', description: 'CA mensuel', details: { 'Subscriptions': '€1,234,500', 'Commissions': '€987,400', 'Premium': '€321,300', 'Marge brute': '42.3%', 'ARPU': '€202' }, chart: [{ name: 'Jan', value: 1740000, subs: 890000, comm: 670000, premium: 180000 }, { name: 'Fév', value: 1830000, subs: 920000, comm: 710000, premium: 200000 }, { name: 'Mar', value: 1960000, subs: 980000, comm: 750000, premium: 230000 }, { name: 'Avr', value: 2130000, subs: 1050000, comm: 820000, premium: 260000 }, { name: 'Mai', value: 2280000, subs: 1120000, comm: 880000, premium: 280000 }, { name: 'Juin', value: 2400000, subs: 1180000, comm: 920000, premium: 300000 }, { name: 'Juil', value: 2543200, subs: 1234500, comm: 987400, premium: 321300 }] }
    ],
    performance: { metrics: [{ label: 'Uptime', value: 99.97, target: 99.9, unit: '%', icon: Wifi, status: 'excellent' }, { label: 'Latence API', value: 124, target: 150, unit: 'ms', icon: Zap, status: 'good' }, { label: 'Taux conversion', value: 4.2, target: 5.0, unit: '%', icon: TrendingUp, status: 'good' }, { label: 'NPS Score', value: 73, target: 70, unit: '', icon: Star, status: 'excellent' }, { label: 'Incidents', value: 2, target: 5, unit: '', icon: AlertTriangle, status: 'good' }, { label: 'Support SLA', value: 94.3, target: 90.0, unit: '%', icon: CheckCircle, status: 'excellent' }], userSegments: [{ name: 'Premium', value: 2543, percent: 20.3, color: '#6366F1' }, { name: 'Standard', value: 6832, percent: 54.5, color: '#8B5CF6' }, { name: 'Freemium', value: 3168, percent: 25.2, color: '#EC4899' }] },
    activity: [{ time: '5 min', title: 'Nouvelle organisation', subtitle: 'SportCorp Ltd. - Plan Premium', type: 'success', icon: Users, amount: '+€499/mois', details: '12 utilisateurs' }, { time: '12 min', title: 'Alerte sécurité', subtitle: 'Tentative connexion suspecte bloquée', type: 'warning', icon: Shield, details: 'IP: 45.123.45.67' }, { time: '28 min', title: 'Paiement reçu', subtitle: 'FC Barcelona Organization', type: 'success', icon: DollarSign, amount: '+€12,400' }, { time: '1h 05', title: 'Mise à jour déployée', subtitle: 'v2.5.1 - Nouvelles fonctionnalités', type: 'info', icon: Cloud, details: '18 améliorations' }, { time: '2h 34', title: 'Export données', subtitle: 'Rapport mensuel généré', type: 'info', icon: Download, details: '2,543 entrées' }, { time: '3h 12', title: 'Support résolu', subtitle: 'Ticket #4532', type: 'success', icon: CheckCircle, details: 'Satisfaction: 5/5' }]
  },

  ORGANIZATION_OWNER: {
    title: 'Mon Organisation',
    subtitle: 'Gestion Championnats & Équipes',
    kpis: [
      { id: 'championships', label: 'Championnats', value: 8, prev: 6, target: 12, unit: '', icon: Award, trend: 'up', description: 'Compétitions gérées', details: { 'En cours': 5, 'À venir': 3, 'Terminés ce mois': 2, 'Participants moy.': '18 équipes', 'Matchs/semaine': '12', 'Taux remplissage': '89.3%' }, chart: [{ name: 'Jan', value: 4 }, { name: 'Fév', value: 5 }, { name: 'Mar', value: 5 }, { name: 'Avr', value: 6 }, { name: 'Mai', value: 6 }, { name: 'Juin', value: 7 }, { name: 'Juil', value: 8 }] },
      { id: 'teams', label: 'Équipes', value: 24, prev: 19, target: 30, unit: '', icon: Users, trend: 'up', description: 'Équipes inscrites', details: { 'Nouvelles (30j)': 5, 'Actives': 22, 'En attente': 2, 'Joueurs total': 432, 'Moy. joueurs/équipe': '18', 'Taux rétention': '94.7%' }, chart: [{ name: 'Jan', value: 14 }, { name: 'Fév', value: 16 }, { name: 'Mar', value: 17 }, { name: 'Avr', value: 19 }, { name: 'Mai', value: 20 }, { name: 'Juin', value: 21 }, { name: 'Juil', value: 24 }] },
      { id: 'matches', label: 'Matchs', value: 12, prev: 10, target: 15, unit: '', icon: Calendar, trend: 'up', description: 'Matchs à venir (30j)', details: { 'Cette semaine': 4, 'Ce mois': 12, 'Terminés ce mois': 18, 'Taux completion': '94.7%', 'Incidents': 1, 'Satisfaction': '4.6/5' }, chart: [{ name: 'S1', value: 3 }, { name: 'S2', value: 4 }, { name: 'S3', value: 3 }, { name: 'S4', value: 5 }, { name: 'S5', value: 4 }, { name: 'S6', value: 4 }] },
      { id: 'revenue', label: 'Revenus', value: 15400, prev: 11760, target: 20000, unit: '€', icon: DollarSign, trend: 'up', description: 'CA mensuel', details: { 'Inscriptions': '€8,200', 'Licences': '€4,500', 'Sponsoring': '€2,700', 'Marge': '38.5%', 'Revenue/équipe': '€642' }, chart: [{ name: 'Jan', value: 8500, inscr: 4200, licences: 2800, sponsor: 1500 }, { name: 'Fév', value: 9500, inscr: 4800, licences: 3000, sponsor: 1700 }, { name: 'Mar', value: 10300, inscr: 5200, licences: 3200, sponsor: 1900 }, { name: 'Avr', value: 11700, inscr: 6100, licences: 3500, sponsor: 2100 }, { name: 'Mai', value: 12900, inscr: 6800, licences: 3800, sponsor: 2300 }, { name: 'Juin', value: 14200, inscr: 7500, licences: 4200, sponsor: 2500 }, { name: 'Juil', value: 15400, inscr: 8200, licences: 4500, sponsor: 2700 }] }
    ],
    performance: { metrics: [{ label: 'Remplissage', value: 89.3, target: 90.0, unit: '%', icon: Percent, status: 'good' }, { label: 'Satisfaction', value: 4.6, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Matchs à temps', value: 94.7, target: 95.0, unit: '%', icon: Clock, status: 'good' }, { label: 'Croissance', value: 31.0, target: 25.0, unit: '%', icon: TrendingUp, status: 'excellent' }, { label: 'Incidents', value: 2, target: 5, unit: '', icon: AlertCircle, status: 'good' }, { label: 'Rétention', value: 94.7, target: 90.0, unit: '%', icon: Users, status: 'excellent' }], userSegments: [{ name: 'Ligue Élite', value: 8, color: '#F59E0B' }, { name: 'Coupe Régionale', value: 6, color: '#F97316' }, { name: 'Tournoi Amateur', value: 5, color: '#EF4444' }, { name: 'Challenge Junior', value: 5, color: '#EC4899' }] },
    activity: [{ time: '20 min', title: 'Nouvelle équipe', subtitle: 'FC Phoenix - Ligue Élite', type: 'success', icon: Users, amount: '+€450' }, { time: '45 min', title: 'Match planifié', subtitle: 'PSG vs OM - Dimanche 15h', type: 'info', icon: Calendar, details: 'Stade Vélodrome' }, { time: '1h 30', title: 'Paiement reçu', subtitle: 'Real Warriors - Licence annuelle', type: 'success', icon: DollarSign, amount: '+€2,100' }, { time: '2h 15', title: 'Rapport généré', subtitle: 'Statistiques Janvier 2026', type: 'info', icon: FileText, details: '24 équipes' }, { time: '4h 20', title: 'Nouveau championnat', subtitle: 'Ligue Élite - Saison 2026', type: 'success', icon: Trophy, details: '8 équipes' }, { time: '1j', title: 'Match terminé', subtitle: 'United Stars 3-1 Dynamo', type: 'info', icon: CheckCircle, details: 'Rapport envoyé' }]
  },

  ADMIN: {
    title: 'Administration',
    subtitle: 'Gestion & Modération Plateforme',
    kpis: [
      { id: 'tickets', label: 'Tickets Support', value: 23, prev: 28, target: 15, unit: '', icon: AlertCircle, trend: 'down', description: 'Tickets ouverts en attente', details: { 'Ouverts': 23, 'En cours': 12, 'Résolus aujourd\'hui': 15, 'Temps réponse moy.': '2h 15m', 'Satisfaction': '4.7/5', 'Taux résolution': '94.2%' }, chart: [{ name: 'Jan', value: 45 }, { name: 'Fév', value: 38 }, { name: 'Mar', value: 32 }, { name: 'Avr', value: 29 }, { name: 'Mai', value: 25 }, { name: 'Juin', value: 28 }, { name: 'Juil', value: 23 }] },
      { id: 'moderation', label: 'Modérations', value: 45, prev: 52, target: 30, unit: '', icon: Users, trend: 'down', description: 'Actions de modération ce mois', details: { 'Avertissements': 25, 'Suspensions': 12, 'Bannissements': 8, 'Appels traités': 18, 'Taux appel accepté': '22%', 'Récidives': 5 }, chart: [{ name: 'Jan', value: 68 }, { name: 'Fév', value: 62 }, { name: 'Mar', value: 58 }, { name: 'Avr', value: 54 }, { name: 'Mai', value: 49 }, { name: 'Juin', value: 52 }, { name: 'Juil', value: 45 }] },
      { id: 'actions', label: 'Actions/jour', value: 67, prev: 54, target: 80, unit: '', icon: Activity, trend: 'up', description: 'Actions administratives effectuées', details: { 'Modération': 28, 'Vérifications': 15, 'Approbations': 12, 'Rejets': 8, 'Escalades': 4, 'Temps moyen': '8m 30s' }, chart: [{ name: 'Jan', value: 42 }, { name: 'Fév', value: 48 }, { name: 'Mar', value: 51 }, { name: 'Avr', value: 49 }, { name: 'Mai', value: 55 }, { name: 'Juin', value: 54 }, { name: 'Juil', value: 67 }] },
      { id: 'resolution', label: 'Taux Résolution', value: 94, prev: 92, target: 95, unit: '%', icon: TrendingUp, trend: 'up', description: 'Performance résolution tickets', details: { 'Premier contact': '91%', 'Sous 24h': '96%', 'Réouvertures': '3.2%', 'Escalades': '5.8%', 'Automatisés': '12%' }, chart: [{ name: 'Jan', value: 89 }, { name: 'Fév', value: 90 }, { name: 'Mar', value: 91 }, { name: 'Avr', value: 91 }, { name: 'Mai', value: 92 }, { name: 'Juin', value: 92 }, { name: 'Juil', value: 94 }] }
    ],
    performance: { metrics: [{ label: 'SLA Respect', value: 96.5, target: 95.0, unit: '%', icon: CheckCircle, status: 'excellent' }, { label: 'Temps réponse', value: 2.15, target: 3.0, unit: 'h', icon: Clock, status: 'excellent' }, { label: 'Satisfaction', value: 4.7, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Récidives', value: 5, target: 10, unit: '', icon: AlertTriangle, status: 'excellent' }, { label: 'Auto-résolu', value: 12, target: 15, unit: '%', icon: Zap, status: 'good' }, { label: 'Escalades', value: 5.8, target: 8.0, unit: '%', icon: TrendingUp, status: 'good' }], userSegments: [{ name: 'Actifs', value: 8234, color: '#3B82F6' }, { name: 'Modérés', value: 45, color: '#EF4444' }, { name: 'Suspendus', value: 12, color: '#F59E0B' }] },
    activity: [{ time: '5 min', title: 'Ticket résolu', subtitle: 'Problème facturation #4532', type: 'success', icon: CheckCircle, details: 'Satisfaction: 5/5' }, { time: '18 min', title: 'Utilisateur suspendu', subtitle: 'Violation règles - 7 jours', type: 'warning', icon: XCircle, details: 'UserID: 12543' }, { time: '32 min', title: 'Appel accepté', subtitle: 'Révision suspension', type: 'info', icon: Users, details: 'Case #2341' }, { time: '1h 15', title: 'Organisation vérifiée', subtitle: 'SportCorp Ltd. approuvée', type: 'success', icon: CheckCircle, details: 'Documents validés' }, { time: '2h 40', title: 'Modération contenu', subtitle: '3 publications supprimées', type: 'warning', icon: AlertTriangle, details: 'Spam détecté' }, { time: '3h 20', title: 'Rapport généré', subtitle: 'Statistiques modération mensuelle', type: 'info', icon: FileText, details: '156 pages' }]
  },

  BETTOR: {
    title: 'Mon Espace Paris',
    subtitle: 'Tableau de Bord Parieur',
    kpis: [
      { id: 'bets', label: 'Paris Actifs', value: 5, prev: 4, target: null, unit: '', icon: Target, trend: 'up', description: 'Paris en cours', details: { 'Simples': 2, 'Combinés': 3, 'Mise totale': '€125', 'Gain potentiel': '€487', 'Cote moyenne': '3.89', 'Plus gros gain': '€245' }, chart: [{ name: 'Lun', value: 3 }, { name: 'Mar', value: 3 }, { name: 'Mer', value: 4 }, { name: 'Jeu', value: 5 }, { name: 'Ven', value: 5 }, { name: 'Sam', value: 3 }, { name: 'Dim', value: 5 }] },
      { id: 'balance', label: 'Solde', value: 245, prev: 195, target: 500, unit: '€', icon: DollarSign, trend: 'up', description: 'Balance disponible', details: { 'Dépôt initial': '€200', 'Gains ce mois': '€95', 'Bonus actifs': '€50', 'En jeu': '€125', 'Disponible': '€120', 'Total retiré': '€150' }, chart: [{ name: 'Lun', value: 200 }, { name: 'Mar', value: 185 }, { name: 'Mer', value: 220 }, { name: 'Jeu', value: 205 }, { name: 'Ven', value: 235 }, { name: 'Sam', value: 225 }, { name: 'Dim', value: 245 }] },
      { id: 'winnings', label: 'Gains Totaux', value: 1850, prev: 1570, target: 2500, unit: '€', icon: TrendingUp, trend: 'up', description: 'Tous vos gains', details: { 'Ce mois': '€380', 'Ce trimestre': '€1,120', 'Taux réussite': '58.3%', 'Meilleur gain': '€245', 'ROI': '+12.4%', 'Paris gagnés': '64/110' }, chart: [{ name: 'Jan', value: 1200 }, { name: 'Fév', value: 1320 }, { name: 'Mar', value: 1450 }, { name: 'Avr', value: 1520 }, { name: 'Mai', value: 1680 }, { name: 'Juin', value: 1770 }, { name: 'Juil', value: 1850 }] },
      { id: 'bonus', label: 'Bonus', value: 50, prev: 50, target: null, unit: '€', icon: Award, trend: 'neutral', description: 'Crédits bonus', details: { 'Bienvenue': '€30', 'Fidélité': '€20', 'Expire dans': '12 jours', 'Conditions': 'x5 mise', 'Utilisé': '€0', 'Disponible': '€50' }, chart: [{ name: 'Jan', value: 30 }, { name: 'Fév', value: 30 }, { name: 'Mar', value: 50 }, { name: 'Avr', value: 50 }, { name: 'Mai', value: 50 }, { name: 'Juin', value: 50 }, { name: 'Juil', value: 50 }] }
    ],
    performance: { metrics: [{ label: 'Win Rate', value: 58.3, target: 60.0, unit: '%', icon: Target, status: 'good' }, { label: 'ROI', value: 12.4, target: 15.0, unit: '%', icon: TrendingUp, status: 'good' }, { label: 'Série', value: 3, target: 5, unit: ' wins', icon: Flame, status: 'good' }, { label: 'Cote moy.', value: 2.35, target: 2.0, unit: '', icon: BarChart3, status: 'warning' }, { label: 'Paris/jour', value: 3.2, target: 5.0, unit: '', icon: Activity, status: 'good' }, { label: 'Satisfaction', value: 4.7, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }], userSegments: [{ name: '1X2', value: 45, color: '#10B981' }, { name: 'BTTS', value: 25, color: '#14B8A6' }, { name: 'Over/Under', value: 20, color: '#06B6D4' }, { name: 'Handicap', value: 10, color: '#0EA5E9' }] },
    activity: [{ time: '1h', title: 'Pari gagné', subtitle: 'PSG vs OM - Victoire PSG', type: 'success', icon: CheckCircle, amount: '+€85' }, { time: '2h', title: 'Pari en cours', subtitle: 'Bayern vs Dortmund', type: 'info', icon: Activity, details: 'Score: 1-0 (45\')' }, { time: '3h', title: 'Nouveau bonus', subtitle: 'Freespin fidélité', type: 'success', icon: Award, amount: '+€20' }, { time: '5h', title: 'Match Live', subtitle: 'Real Madrid vs FC Barcelona', type: 'alert', icon: Activity, details: 'Mi-temps 1-1' }, { time: '8h', title: 'Pari placé', subtitle: 'Man City vs Liverpool', type: 'info', icon: Target, details: 'Combiné @3.2' }, { time: '1j', title: 'Retrait', subtitle: 'Virement bancaire', type: 'success', icon: DollarSign, amount: '-€150' }]
  },

  MANAGER: {
    title: 'Gestion d\'Équipe',
    subtitle: 'Performance & Management',
    kpis: [
      { id: 'players', label: 'Effectif', value: 23, prev: 22, target: 25, unit: '', icon: Users, trend: 'up', description: 'Joueurs dans l\'effectif', details: { 'Actifs': 21, 'Blessés': 2, 'Suspendus': 0, 'Nouveaux (30j)': 3, 'Départs (30j)': 2, 'Âge moyen': '24.3 ans' }, chart: [{ name: 'Jan', value: 20 }, { name: 'Fév', value: 21 }, { name: 'Mar', value: 21 }, { name: 'Avr', value: 22 }, { name: 'Mai', value: 22 }, { name: 'Juin', value: 22 }, { name: 'Juil', value: 23 }] },
      { id: 'victories', label: 'Victoires', value: 18, prev: 15, target: 22, unit: '', icon: Trophy, trend: 'up', description: 'Matchs gagnés cette saison', details: { 'Victoires': 18, 'Nuls': 6, 'Défaites': 4, 'Buts marqués': 54, 'Buts encaissés': 22, 'Goal average': '+32' }, chart: [{ name: 'J1-5', value: 3 }, { name: 'J6-10', value: 4 }, { name: 'J11-15', value: 3 }, { name: 'J16-20', value: 4 }, { name: 'J21-25', value: 2 }, { name: 'J26-28', value: 2 }] },
      { id: 'next_match', label: 'Prochain Match', value: 2, prev: 5, target: null, unit: 'j', icon: Calendar, trend: 'neutral', description: 'Jours avant le prochain match', details: { 'Adversaire': 'FC United', 'Date': 'Samedi 15h', 'Lieu': 'Domicile', 'Classement adv.': '3ème', 'Forme équipe': 'VVNVV' }, chart: [{ name: 'S1', value: 2 }, { name: 'S2', value: 2 }, { name: 'S3', value: 1 }, { name: 'S4', value: 2 }, { name: 'S5', value: 1 }, { name: 'S6', value: 2 }] },
      { id: 'budget', label: 'Budget', value: 250000, prev: 265000, target: 300000, unit: '€', icon: DollarSign, trend: 'down', description: 'Budget disponible', details: { 'Salaires': '€180,000', 'Transferts': '€45,000', 'Opérationnel': '€25,000', 'Dépensé': '€265,000', 'Restant': '€250,000' }, chart: [{ name: 'Jan', value: 300000 }, { name: 'Fév', value: 295000 }, { name: 'Mar', value: 285000 }, { name: 'Avr', value: 275000 }, { name: 'Mai', value: 270000 }, { name: 'Juin', value: 265000 }, { name: 'Juil', value: 250000 }] }
    ],
    performance: { metrics: [{ label: 'Win Rate', value: 64.3, target: 60.0, unit: '%', icon: Trophy, status: 'excellent' }, { label: 'Possession', value: 58.7, target: 55.0, unit: '%', icon: Activity, status: 'excellent' }, { label: 'Buts/match', value: 1.93, target: 1.5, unit: '', icon: Target, status: 'excellent' }, { label: 'Clean sheets', value: 42.9, target: 40.0, unit: '%', icon: Shield, status: 'excellent' }, { label: 'Blessures', value: 2, target: 3, unit: '', icon: AlertCircle, status: 'good' }, { label: 'Discipline', value: 1.2, target: 2.0, unit: 'C/M', icon: AlertTriangle, status: 'excellent' }], userSegments: [{ name: 'Attaquants', value: 6, color: '#EF4444' }, { name: 'Milieux', value: 8, color: '#F59E0B' }, { name: 'Défenseurs', value: 7, color: '#3B82F6' }, { name: 'Gardiens', value: 2, color: '#10B981' }] },
    activity: [{ time: '15 min', title: 'Entraînement', subtitle: 'Séance tactique terminée', type: 'success', icon: Activity, details: '90 minutes' }, { time: '1h 20', title: 'Match gagné', subtitle: 'Victoire 3-1 vs Real Warriors', type: 'success', icon: Trophy, amount: '+3 pts' }, { time: '3h 45', title: 'Joueur recruté', subtitle: 'Marco Silva - Milieu', type: 'success', icon: Users, amount: '€45,000' }, { time: '1j', title: 'Rapport médical', subtitle: '2 joueurs blessés', type: 'warning', icon: AlertCircle, details: '7-14 jours' }, { time: '2j', title: 'Analyse tactique', subtitle: 'Prochain adversaire étudié', type: 'info', icon: BarChart3, details: 'FC United' }, { time: '3j', title: 'Réunion staff', subtitle: 'Stratégie validée', type: 'info', icon: Users, details: '5 participants' }]
  },

  MANAGER: {
    title: 'Gestion d\'Équipe',
    subtitle: 'Performance & Management',
    kpis: [
      { id: 'players', label: 'Effectif', value: 23, prev: 22, target: 25, unit: '', icon: Users, trend: 'up', description: 'Joueurs dans l\'effectif', details: { 'Actifs': 21, 'Blessés': 2, 'Suspendus': 0, 'Nouveaux (30j)': 3, 'Âge moyen': '24.3 ans' }, chart: [{ name: 'Jan', value: 20 }, { name: 'Fév', value: 21 }, { name: 'Mar', value: 21 }, { name: 'Avr', value: 22 }, { name: 'Mai', value: 22 }, { name: 'Juin', value: 22 }, { name: 'Juil', value: 23 }] },
      { id: 'victories', label: 'Victoires', value: 18, prev: 15, target: 22, unit: '', icon: Trophy, trend: 'up', description: 'Matchs gagnés cette saison', details: { 'Victoires': 18, 'Nuls': 6, 'Défaites': 4, 'Goal average': '+32' }, chart: [{ name: 'J1-5', value: 3 }, { name: 'J6-10', value: 4 }, { name: 'J11-15', value: 3 }, { name: 'J16-20', value: 4 }, { name: 'J21-25', value: 2 }, { name: 'J26-28', value: 2 }] },
      { id: 'next_match', label: 'Prochain Match', value: 2, prev: 5, target: null, unit: 'j', icon: Calendar, trend: 'neutral', description: 'Jours avant le prochain match', details: { 'Adversaire': 'FC United', 'Date': 'Samedi 15h', 'Lieu': 'Domicile' }, chart: [{ name: 'S1', value: 2 }, { name: 'S2', value: 2 }, { name: 'S3', value: 1 }, { name: 'S4', value: 2 }, { name: 'S5', value: 1 }, { name: 'S6', value: 2 }] },
      { id: 'budget', label: 'Budget', value: 250000, prev: 265000, target: 300000, unit: '€', icon: DollarSign, trend: 'down', description: 'Budget disponible', details: { 'Salaires': '€180,000', 'Transferts': '€45,000', 'Restant': '€250,000' }, chart: [{ name: 'Jan', value: 300000 }, { name: 'Fév', value: 295000 }, { name: 'Mar', value: 285000 }, { name: 'Avr', value: 275000 }, { name: 'Mai', value: 270000 }, { name: 'Juin', value: 265000 }, { name: 'Juil', value: 250000 }] }
    ],
    performance: { metrics: [{ label: 'Win Rate', value: 64.3, target: 60.0, unit: '%', icon: Trophy, status: 'excellent' }, { label: 'Possession', value: 58.7, target: 55.0, unit: '%', icon: Activity, status: 'excellent' }, { label: 'Buts/match', value: 1.93, target: 1.5, unit: '', icon: Target, status: 'excellent' }, { label: 'Clean sheets', value: 42.9, target: 40.0, unit: '%', icon: Shield, status: 'excellent' }, { label: 'Blessures', value: 2, target: 3, unit: '', icon: AlertCircle, status: 'good' }, { label: 'Discipline', value: 1.2, target: 2.0, unit: 'C/M', icon: AlertTriangle, status: 'excellent' }], userSegments: [{ name: 'Attaquants', value: 6, color: '#EF4444' }, { name: 'Milieux', value: 8, color: '#F59E0B' }, { name: 'Défenseurs', value: 7, color: '#3B82F6' }, { name: 'Gardiens', value: 2, color: '#10B981' }] },
    activity: [{ time: '15 min', title: 'Entraînement', subtitle: 'Séance tactique terminée', type: 'success', icon: Activity, details: '90 minutes' }, { time: '1h 20', title: 'Match gagné', subtitle: 'Victoire 3-1 vs Real Warriors', type: 'success', icon: Trophy, amount: '+3 pts' }, { time: '1j', title: 'Rapport médical', subtitle: '2 joueurs blessés', type: 'warning', icon: AlertCircle, details: '7-14 jours' }, { time: '2j', title: 'Analyse tactique', subtitle: 'Prochain adversaire étudié', type: 'info', icon: BarChart3, details: 'FC United' }, { time: '3j', title: 'Réunion staff', subtitle: 'Stratégie validée', type: 'info', icon: Users, details: '5 participants' }]
  },

  COACH: {
    title: 'Espace Entraîneur',
    subtitle: 'Tactiques & Développement',
    kpis: [
      { id: 'sessions', label: 'Séances', value: 45, prev: 37, target: 50, unit: '', icon: Activity, trend: 'up', description: 'Séances d\'entraînement ce mois', details: { 'Physiques': 18, 'Tactiques': 15, 'Techniques': 12, 'Durée moyenne': '105 min', 'Participation': '94.3%' }, chart: [{ name: 'S1', value: 9 }, { name: 'S2', value: 10 }, { name: 'S3', value: 8 }, { name: 'S4', value: 11 }, { name: 'S5', value: 7 }] },
      { id: 'squad', label: 'Effectif', value: 23, prev: 23, target: 25, unit: '', icon: Users, trend: 'neutral', description: 'Joueurs sous votre direction', details: { 'Disponibles': 21, 'Blessés': 2, 'Forme optimale': 15, 'Progression': '+12%' }, chart: [{ name: 'Jan', value: 20 }, { name: 'Fév', value: 21 }, { name: 'Mar', value: 22 }, { name: 'Avr', value: 22 }, { name: 'Mai', value: 23 }, { name: 'Juin', value: 23 }, { name: 'Juil', value: 23 }] },
      { id: 'matches_coached', label: 'Matchs Dirigés', value: 8, prev: 6, target: 12, unit: '', icon: Calendar, trend: 'up', description: 'Matchs ce mois', details: { 'Victoires': 5, 'Nuls': 2, 'Défaites': 1, 'Win rate': '62.5%' }, chart: [{ name: 'Jan', value: 4 }, { name: 'Fév', value: 5 }, { name: 'Mar', value: 4 }, { name: 'Avr', value: 5 }, { name: 'Mai', value: 5 }, { name: 'Juin', value: 6 }, { name: 'Juil', value: 8 }] },
      { id: 'performance', label: 'Performance', value: 87, prev: 82, target: 90, unit: '%', icon: TrendingUp, trend: 'up', description: 'Score de performance globale', details: { 'Tactique': '89%', 'Physique': '86%', 'Mental': '85%', 'Cohésion': '91%', 'Progression': '+5%' }, chart: [{ name: 'Jan', value: 78 }, { name: 'Fév', value: 80 }, { name: 'Mar', value: 81 }, { name: 'Avr', value: 83 }, { name: 'Mai', value: 85 }, { name: 'Juin', value: 82 }, { name: 'Juil', value: 87 }] }
    ],
    performance: { metrics: [{ label: 'Victoires', value: 62.5, target: 60.0, unit: '%', icon: Trophy, status: 'excellent' }, { label: 'Progression', value: 12, target: 10, unit: '%', icon: TrendingUp, status: 'excellent' }, { label: 'Blessures', value: 2, target: 3, unit: '', icon: AlertCircle, status: 'good' }, { label: 'Participation', value: 94.3, target: 90.0, unit: '%', icon: Users, status: 'excellent' }, { label: 'Discipline', value: 1.1, target: 2.0, unit: 'C/M', icon: AlertTriangle, status: 'excellent' }, { label: 'Satisfaction', value: 4.8, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }], userSegments: [] },
    activity: [{ time: '2h', title: 'Entraînement', subtitle: 'Séance tactique 4-3-3', type: 'success', icon: Activity, details: '105 minutes' }, { time: '1j', title: 'Rapport tactique', subtitle: 'Analyse adversaire créée', type: 'success', icon: FileText, details: 'FC United' }, { time: '1j', title: 'Blessure', subtitle: 'Marco Silva - Entorse cheville', type: 'alert', icon: AlertCircle, details: '7-10 jours' }, { time: '2j', title: 'Vidéo session', subtitle: 'Analyse dernière défaite', type: 'info', icon: Video, details: '45 minutes' }, { time: '3j', title: 'Réunion staff', subtitle: 'Stratégie prochains matchs', type: 'info', icon: Users, details: '4 participants' }]
  },

  PLAYER: {
    title: 'Mon Profil Joueur',
    subtitle: 'Statistiques & Performance',
    kpis: [
      { id: 'goals', label: 'Buts', value: 12, prev: 9, target: 15, unit: '', icon: Target, trend: 'up', description: 'Buts marqués cette saison', details: { 'Pied droit': 7, 'Pied gauche': 3, 'Têtes': 2, 'Penalties': 2, 'Buts/match': '0.48' }, chart: [{ name: 'Jan', value: 3 }, { name: 'Fév', value: 2 }, { name: 'Mar', value: 1 }, { name: 'Avr', value: 2 }, { name: 'Mai', value: 1 }, { name: 'Juin', value: 1 }, { name: 'Juil', value: 2 }] },
      { id: 'assists', label: 'Passes Déc.', value: 8, prev: 6, target: 10, unit: '', icon: Activity, trend: 'up', description: 'Passes décisives', details: { 'Passes clés': 42, 'Passes réussies': '84.3%', 'Dribbles': 34, 'Duels gagnés': '62%' }, chart: [{ name: 'Jan', value: 2 }, { name: 'Fév', value: 1 }, { name: 'Mar', value: 1 }, { name: 'Avr', value: 2 }, { name: 'Mai', value: 1 }, { name: 'Juin', value: 0 }, { name: 'Juil', value: 1 }] },
      { id: 'matches', label: 'Matchs Joués', value: 25, prev: 22, target: 30, unit: '', icon: Calendar, trend: 'up', description: 'Matchs disputés', details: { 'Titulaire': 21, 'Remplaçant': 4, 'Minutes jouées': '2,134', 'Cartons jaunes': 3 }, chart: [{ name: 'Jan', value: 4 }, { name: 'Fév', value: 5 }, { name: 'Mar', value: 4 }, { name: 'Avr', value: 5 }, { name: 'Mai', value: 4 }, { name: 'Juin', value: 3 }, { name: 'Juil', value: 0 }] },
      { id: 'rating', label: 'Note Moyenne', value: 8.5, prev: 8.2, target: 9.0, unit: '/10', icon: Star, trend: 'up', description: 'Évaluation performance', details: { 'Meilleure note': '9.5', 'Moins bonne': '7.2', 'Notes > 8': '18/25', 'Consistance': '91%' }, chart: [{ name: 'Jan', value: 7.8 }, { name: 'Fév', value: 8.1 }, { name: 'Mar', value: 8.3 }, { name: 'Avr', value: 8.2 }, { name: 'Mai', value: 8.4 }, { name: 'Juin', value: 8.2 }, { name: 'Juil', value: 8.5 }] }
    ],
    performance: { metrics: [{ label: 'Form', value: 8.5, target: 8.0, unit: '/10', icon: TrendingUp, status: 'excellent' }, { label: 'Condition', value: 94, target: 90, unit: '%', icon: Activity, status: 'excellent' }, { label: 'Précision tirs', value: 68, target: 65, unit: '%', icon: Target, status: 'excellent' }, { label: 'Passes réussies', value: 84.3, target: 80.0, unit: '%', icon: CheckCircle, status: 'excellent' }, { label: 'Duels gagnés', value: 62, target: 60, unit: '%', icon: Trophy, status: 'excellent' }, { label: 'Discipline', value: 0.12, target: 0.5, unit: 'C/M', icon: Shield, status: 'excellent' }], userSegments: [] },
    activity: [{ time: '1j', title: 'Match prochain', subtitle: 'vs FC United - Samedi 15h', type: 'alert', icon: Calendar, details: 'Domicile' }, { time: '4h', title: 'Entraînement', subtitle: 'Séance ce soir 18h', type: 'info', icon: Activity, details: 'Tactique' }, { time: '2j', title: 'Man of the Match', subtitle: 'Meilleur joueur vs Warriors', type: 'success', icon: Trophy, amount: 'Note: 9.5' }, { time: '3j', title: 'But marqué', subtitle: 'Victoire 3-1', type: 'success', icon: Target, details: '65\' - Pied droit' }, { time: '5j', title: 'Passe décisive', subtitle: 'Assist pour Silva', type: 'success', icon: Activity, details: '42\'' }]
  },

  MATCH_OPERATOR: {
    title: 'Opération Match',
    subtitle: 'Gestion Événements Sportifs',
    kpis: [
      { id: 'live', label: 'En Direct', value: 2, prev: 1, target: null, unit: '', icon: Activity, trend: 'up', description: 'Matchs en cours de gestion', details: { 'Actifs': 2, 'Mi-temps': 1, '2e période': 1, 'Incidents': 0, 'Signalements': 3 }, chart: [{ name: 'Lun', value: 3 }, { name: 'Mar', value: 2 }, { name: 'Mer', value: 4 }, { name: 'Jeu', value: 1 }, { name: 'Ven', value: 3 }, { name: 'Sam', value: 5 }, { name: 'Dim', value: 2 }] },
      { id: 'completed', label: 'Terminés', value: 156, prev: 142, target: 200, unit: '', icon: CheckCircle, trend: 'up', description: 'Matchs gérés ce mois', details: { 'Sans incident': 148, 'Avec incidents': 8, 'Taux succès': '94.9%', 'Durée moy.': '102 min' }, chart: [{ name: 'Jan', value: 132 }, { name: 'Fév', value: 138 }, { name: 'Mar', value: 145 }, { name: 'Avr', value: 148 }, { name: 'Mai', value: 151 }, { name: 'Juin', value: 142 }, { name: 'Juil', value: 156 }] },
      { id: 'incidents', label: 'Incidents', value: 3, prev: 5, target: 0, unit: '', icon: AlertCircle, trend: 'down', description: 'Incidents actifs', details: { 'Mineurs': 2, 'Majeurs': 1, 'Critiques': 0, 'Résolus/24h': '85%', 'Temps résolution': '12 min' }, chart: [{ name: 'Jan', value: 8 }, { name: 'Fév', value: 7 }, { name: 'Mar', value: 9 }, { name: 'Avr', value: 6 }, { name: 'Mai', value: 7 }, { name: 'Juin', value: 5 }, { name: 'Juil', value: 3 }] },
      { id: 'upcoming', label: 'À Venir', value: 7, prev: 8, target: 10, unit: '', icon: Calendar, trend: 'down', description: 'Matchs planifiés (7j)', details: { 'Aujourd\'hui': 2, 'Demain': 3, 'Cette semaine': 7, 'Staff assigné': '100%' }, chart: [{ name: 'Lun', value: 2 }, { name: 'Mar', value: 1 }, { name: 'Mer', value: 3 }, { name: 'Jeu', value: 0 }, { name: 'Ven', value: 2 }, { name: 'Sam', value: 4 }, { name: 'Dim', value: 3 }] }
    ],
    performance: { metrics: [{ label: 'Ponctualité', value: 98.5, target: 95.0, unit: '%', icon: Clock, status: 'excellent' }, { label: 'Sans incident', value: 94.9, target: 90.0, unit: '%', icon: CheckCircle, status: 'excellent' }, { label: 'Résolution', value: 12, target: 15, unit: 'min', icon: Zap, status: 'excellent' }, { label: 'Satisfaction', value: 4.6, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Reports', value: 1.9, target: 5.0, unit: '%', icon: Calendar, status: 'excellent' }, { label: 'Staff complet', value: 100, target: 95, unit: '%', icon: Users, status: 'excellent' }], userSegments: [] },
    activity: [{ time: 'Live', title: 'Match en cours', subtitle: 'FC Phoenix vs Real Warriors - 1-1', type: 'alert', icon: Activity, details: '65\' - 2e Mi-temps' }, { time: '10 min', title: 'Incident signalé', subtitle: 'Problème éclairage Stade Nord', type: 'warning', icon: AlertTriangle, details: 'Réparation en cours' }, { time: '1h', title: 'Match terminé', subtitle: 'United Stars 3-1 Dynamo', type: 'success', icon: CheckCircle, details: 'Rapport envoyé' }, { time: '2h 30', title: 'Match planifié', subtitle: 'PSG vs OM - Dimanche 21h', type: 'info', icon: Calendar, details: 'Staff confirmé' }, { time: '5h', title: 'Vérification stade', subtitle: 'Inspection pré-match réussie', type: 'success', icon: CheckCircle, details: 'Tout OK' }]
  },

  AGENT: {
    title: 'Agent de Joueurs',
    subtitle: 'Représentation & Négociations',
    kpis: [
      { id: 'players_managed', label: 'Joueurs', value: 15, prev: 13, target: 20, unit: '', icon: Users, trend: 'up', description: 'Joueurs sous contrat', details: { 'Actifs': 15, 'Professionnels': 12, 'Jeunes': 3, 'Transferts en cours': 2, 'Valeur totale': '€8.5M' }, chart: [{ name: 'Jan', value: 10 }, { name: 'Fév', value: 11 }, { name: 'Mar', value: 12 }, { name: 'Avr', value: 12 }, { name: 'Mai', value: 13 }, { name: 'Juin', value: 13 }, { name: 'Juil', value: 15 }] },
      { id: 'negotiations', label: 'Négociations', value: 5, prev: 7, target: null, unit: '', icon: Activity, trend: 'down', description: 'Dossiers en cours', details: { 'Transferts': 2, 'Renouvellements': 2, 'Prêts': 1, 'Montant total': '€1.2M' }, chart: [{ name: 'Jan', value: 8 }, { name: 'Fév', value: 6 }, { name: 'Mar', value: 9 }, { name: 'Avr', value: 7 }, { name: 'Mai', value: 8 }, { name: 'Juin', value: 7 }, { name: 'Juil', value: 5 }] },
      { id: 'transfers', label: 'Transferts', value: 3, prev: 2, target: 5, unit: '', icon: TrendingUp, trend: 'up', description: 'Transferts conclus ce mois', details: { 'Ventes': 2, 'Achats': 1, 'Montant total': '€780K', 'Commission': '€39K' }, chart: [{ name: 'Jan', value: 1 }, { name: 'Fév', value: 2 }, { name: 'Mar', value: 1 }, { name: 'Avr', value: 0 }, { name: 'Mai', value: 3 }, { name: 'Juin', value: 2 }, { name: 'Juil', value: 3 }] },
      { id: 'commissions', label: 'Commissions', value: 45000, prev: 33000, target: 60000, unit: '€', icon: DollarSign, trend: 'up', description: 'Revenus ce mois', details: { 'Transferts': '€39,000', 'Contrats': '€4,500', 'Bonus': '€1,500', 'En attente': '€12,000' }, chart: [{ name: 'Jan', value: 18000 }, { name: 'Fév', value: 28000 }, { name: 'Mar', value: 22000 }, { name: 'Avr', value: 15000 }, { name: 'Mai', value: 38000 }, { name: 'Juin', value: 33000 }, { name: 'Juil', value: 45000 }] }
    ],
    performance: { metrics: [{ label: 'Taux succès', value: 60, target: 55, unit: '%', icon: Trophy, status: 'excellent' }, { label: 'Satisfaction', value: 4.8, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Deals/mois', value: 3, target: 4, unit: '', icon: TrendingUp, status: 'good' }, { label: 'Temps négo.', value: 21, target: 30, unit: 'j', icon: Clock, status: 'excellent' }, { label: 'Rétention', value: 93, target: 90, unit: '%', icon: Users, status: 'excellent' }, { label: 'Revenue/deal', value: 15000, target: 12000, unit: '€', icon: DollarSign, status: 'excellent' }], userSegments: [] },
    activity: [{ time: '1h', title: 'Offre reçue', subtitle: 'FC Barcelona pour Marco Silva', type: 'success', icon: TrendingUp, amount: '€450K' }, { time: '2j', title: 'Transfert signé', subtitle: 'João Costa vers Real Madrid', type: 'success', icon: CheckCircle, amount: '+€39K comm.' }, { time: '3j', title: 'Négociation', subtitle: 'Renouvellement Pedro Alvarez', type: 'info', icon: Activity, details: '85% accord' }, { time: '5j', title: 'Nouveau client', subtitle: 'Thomas Müller signé', type: 'success', icon: Users, details: 'Attaquant 22 ans' }, { time: '1sem', title: 'Offre refusée', subtitle: 'Montant insuffisant', type: 'warning', icon: XCircle, details: '€280K proposés' }]
  },

  SCOUT: {
    title: 'Scout Professionnel',
    subtitle: 'Détection & Analyse Talents',
    kpis: [
      { id: 'tracked', label: 'Joueurs Suivis', value: 34, prev: 27, target: 40, unit: '', icon: Users, trend: 'up', description: 'Joueurs sous observation', details: { 'Prioritaires': 8, 'Intéressants': 15, 'À surveiller': 11, 'Âge moyen': '21.4 ans' }, chart: [{ name: 'Jan', value: 18 }, { name: 'Fév', value: 21 }, { name: 'Mar', value: 24 }, { name: 'Avr', value: 26 }, { name: 'Mai', value: 28 }, { name: 'Juin', value: 27 }, { name: 'Juil', value: 34 }] },
      { id: 'reports', label: 'Rapports', value: 12, prev: 9, target: 15, unit: '', icon: FileText, trend: 'up', description: 'Rapports créés ce mois', details: { 'Complets': 8, 'Préliminaires': 4, 'Taux validation': '75%' }, chart: [{ name: 'Jan', value: 6 }, { name: 'Fév', value: 8 }, { name: 'Mar', value: 7 }, { name: 'Avr', value: 10 }, { name: 'Mai', value: 9 }, { name: 'Juin', value: 9 }, { name: 'Juil', value: 12 }] },
      { id: 'matches_obs', label: 'Matchs Observés', value: 28, prev: 23, target: 35, unit: '', icon: Calendar, trend: 'up', description: 'Matchs analysés', details: { 'Sur place': 12, 'En vidéo': 16, 'Pays différents': 5 }, chart: [{ name: 'S1', value: 5 }, { name: 'S2', value: 6 }, { name: 'S3', value: 4 }, { name: 'S4', value: 7 }, { name: 'S5', value: 6 }] },
      { id: 'reco', label: 'Recommandations', value: 8, prev: 6, target: 12, unit: '', icon: Award, trend: 'up', description: 'Joueurs recommandés', details: { 'Validées': 6, 'En étude': 2, 'Recrutés': 2, 'Taux succès': '75%', 'Valeur estimée': '€3.2M' }, chart: [{ name: 'Jan', value: 3 }, { name: 'Fév', value: 4 }, { name: 'Mar', value: 5 }, { name: 'Avr', value: 4 }, { name: 'Mai', value: 6 }, { name: 'Juin', value: 6 }, { name: 'Juil', value: 8 }] }
    ],
    performance: { metrics: [{ label: 'Précision', value: 75, target: 70, unit: '%', icon: Target, status: 'excellent' }, { label: 'ROI Recrues', value: 180, target: 150, unit: '%', icon: TrendingUp, status: 'excellent' }, { label: 'Temps/rapport', value: 4.5, target: 6.0, unit: 'h', icon: Clock, status: 'excellent' }, { label: 'Couverture', value: 8, target: 6, unit: 'pays', icon: Globe, status: 'excellent' }, { label: 'Matchs/mois', value: 28, target: 25, unit: '', icon: Calendar, status: 'excellent' }, { label: 'Satisfaction', value: 4.6, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }], userSegments: [] },
    activity: [{ time: '2h', title: 'Nouveau joueur', subtitle: 'Lucas Santos observé', type: 'success', icon: Users, details: '19 ans - Brésil' }, { time: '1j', title: 'Rapport complété', subtitle: 'Analyse Marco Silva', type: 'success', icon: FileText, details: 'Note: 8.5/10' }, { time: '1j', title: 'Match observé', subtitle: 'Juventus vs Milan', type: 'info', icon: Calendar, details: '3 joueurs suivis' }, { time: '2j', title: 'Recommandation', subtitle: 'Thomas Müller - Prioritaire', type: 'success', icon: Award, details: 'Attaquant talent' }, { time: '4j', title: 'Vidéo analysée', subtitle: '5 matchs Pedro Alvarez', type: 'info', icon: Video, details: '7h 30m footage' }, { time: '1sem', title: 'Voyage prévu', subtitle: 'Mission Espagne - 4 matchs', type: 'info', icon: MapPin, details: 'Du 15 au 20' }]
  },

  ANALYST: {
    title: 'Analyste Sportif',
    subtitle: 'Données & Performances',
    kpis: [
      { id: 'analyses', label: 'Analyses', value: 45, prev: 37, target: 55, unit: '', icon: BarChart3, trend: 'up', description: 'Analyses créées ce mois', details: { 'Tactiques': 18, 'Performances': 15, 'Adversaires': 12, 'Validation': '94%' }, chart: [{ name: 'Jan', value: 28 }, { name: 'Fév', value: 32 }, { name: 'Mar', value: 35 }, { name: 'Avr', value: 33 }, { name: 'Mai', value: 38 }, { name: 'Juin', value: 37 }, { name: 'Juil', value: 45 }] },
      { id: 'reports', label: 'Rapports', value: 23, prev: 19, target: 28, unit: '', icon: FileText, trend: 'up', description: 'Rapports publiés', details: { 'Match': 12, 'Hebdomadaires': 8, 'Mensuels': 3, 'Pages totales': 342 }, chart: [{ name: 'Jan', value: 14 }, { name: 'Fév', value: 16 }, { name: 'Mar', value: 18 }, { name: 'Avr', value: 17 }, { name: 'Mai', value: 20 }, { name: 'Juin', value: 19 }, { name: 'Juil', value: 23 }] },
      { id: 'heatmaps', label: 'Heatmaps', value: 67, prev: 55, target: 75, unit: '', icon: Activity, trend: 'up', description: 'Visualisations créées', details: { 'Possession': 22, 'Déplacements': 25, 'Tirs': 20 }, chart: [{ name: 'Jan', value: 38 }, { name: 'Fév', value: 42 }, { name: 'Mar', value: 48 }, { name: 'Avr', value: 45 }, { name: 'Mai', value: 52 }, { name: 'Juin', value: 55 }, { name: 'Juil', value: 67 }] },
      { id: 'matches_analyzed', label: 'Matchs Analysés', value: 89, prev: 74, target: 100, unit: '', icon: Calendar, trend: 'up', description: 'Matchs traités', details: { 'Notre équipe': 28, 'Adversaires': 35, 'Scouting': 26, 'Données points': '45,678', 'Insights': 234 }, chart: [{ name: 'Jan', value: 52 }, { name: 'Fév', value: 58 }, { name: 'Mar', value: 64 }, { name: 'Avr', value: 68 }, { name: 'Mai', value: 72 }, { name: 'Juin', value: 74 }, { name: 'Juil', value: 89 }] }
    ],
    performance: { metrics: [{ label: 'Précision', value: 94, target: 90, unit: '%', icon: Target, status: 'excellent' }, { label: 'Délai livraison', value: 2.45, target: 3.0, unit: 'h', icon: Clock, status: 'excellent' }, { label: 'Insights/match', value: 15, target: 12, unit: '', icon: Sparkles, status: 'excellent' }, { label: 'Données traitées', value: 45678, target: 40000, unit: '', icon: Database, status: 'excellent' }, { label: 'Satisfaction', value: 4.9, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Automatisation', value: 35, target: 30, unit: '%', icon: Zap, status: 'excellent' }], userSegments: [{ name: 'Tactique', value: 18, color: '#6366F1' }, { name: 'Perf.', value: 15, color: '#3B82F6' }, { name: 'Adversaires', value: 12, color: '#0EA5E9' }] },
    activity: [{ time: '1h', title: 'Analyse tactique', subtitle: 'Formation 4-3-3 vs 4-4-2', type: 'success', icon: BarChart3, details: '15 insights' }, { time: '3h', title: 'Heatmap généré', subtitle: 'Possession derniers 5 matchs', type: 'success', icon: Activity, details: '22 zones' }, { time: '5h', title: 'Rapport match', subtitle: 'Victoire 3-1 vs Warriors', type: 'info', icon: FileText, details: '28 pages' }, { time: '1j', title: 'Analyse adversaire', subtitle: 'FC United - Prochain match', type: 'info', icon: Users, details: 'Points faibles' }, { time: '2j', title: 'Stats joueurs', subtitle: 'Top 5 performeurs du mois', type: 'success', icon: Award, details: 'Rapport créé' }, { time: '3j', title: 'Prédiction', subtitle: 'Modèle match suivant', type: 'info', icon: TrendingUp, details: '68% victoire' }]
  },

  SUPPORT_AGENT: {
    title: 'Support Client',
    subtitle: 'Assistance Utilisateurs',
    kpis: [
      { id: 'open_tickets', label: 'Tickets Ouverts', value: 23, prev: 28, target: 15, unit: '', icon: AlertCircle, trend: 'down', description: 'Tickets en attente', details: { 'Nouveaux': 8, 'En cours': 12, 'Priorité haute': 5, 'Temps attente': '1h 45m' }, chart: [{ name: 'Jan', value: 45 }, { name: 'Fév', value: 38 }, { name: 'Mar', value: 32 }, { name: 'Avr', value: 29 }, { name: 'Mai', value: 25 }, { name: 'Juin', value: 28 }, { name: 'Juil', value: 23 }] },
      { id: 'resolved', label: 'Résolus', value: 156, prev: 144, target: 175, unit: '', icon: CheckCircle, trend: 'up', description: 'Tickets résolus ce mois', details: { 'Premier contact': 142, 'Escaladés': 14, 'Temps moy.': '2h 15m', 'Réouvertures': 5 }, chart: [{ name: 'Jan', value: 132 }, { name: 'Fév', value: 138 }, { name: 'Mar', value: 142 }, { name: 'Avr', value: 145 }, { name: 'Mai', value: 148 }, { name: 'Juin', value: 144 }, { name: 'Juil', value: 156 }] },
      { id: 'pending', label: 'En Attente', value: 7, prev: 10, target: 5, unit: '', icon: Clock, trend: 'down', description: 'Réponse client attendue', details: { '< 24h': 4, '24-48h': 2, '> 48h': 1, 'Taux réponse': '71%' }, chart: [{ name: 'Jan', value: 15 }, { name: 'Fév', value: 12 }, { name: 'Mar', value: 11 }, { name: 'Avr', value: 9 }, { name: 'Mai', value: 8 }, { name: 'Juin', value: 10 }, { name: 'Juil', value: 7 }] },
      { id: 'satisfaction', label: 'Satisfaction', value: 94, prev: 92, target: 95, unit: '%', icon: Star, trend: 'up', description: 'Taux satisfaction client', details: { 'Très satisfait': '82%', 'Satisfait': '12%', 'Neutre': '4%', 'Insatisfait': '2%', 'Note moyenne': '4.8/5' }, chart: [{ name: 'Jan', value: 89 }, { name: 'Fév', value: 90 }, { name: 'Mar', value: 91 }, { name: 'Avr', value: 91 }, { name: 'Mai', value: 92 }, { name: 'Juin', value: 92 }, { name: 'Juil', value: 94 }] }
    ],
    performance: { metrics: [{ label: 'Temps réponse', value: 1.45, target: 2.0, unit: 'h', icon: Clock, status: 'excellent' }, { label: 'Premier contact', value: 91, target: 85, unit: '%', icon: Zap, status: 'excellent' }, { label: 'Résolution', value: 94.2, target: 90.0, unit: '%', icon: CheckCircle, status: 'excellent' }, { label: 'CSAT', value: 4.8, target: 4.5, unit: '/5', icon: Star, status: 'excellent' }, { label: 'Réouvertures', value: 3.2, target: 5.0, unit: '%', icon: AlertCircle, status: 'excellent' }, { label: 'Tickets/agent', value: 22, target: 25, unit: '/jour', icon: Activity, status: 'good' }], userSegments: [{ name: 'Technique', value: 68, color: '#3B82F6' }, { name: 'Compte', value: 52, color: '#10B981' }, { name: 'Facturation', value: 36, color: '#F59E0B' }] },
    activity: [{ time: '5 min', title: 'Ticket résolu', subtitle: 'Problème connexion #4532', type: 'success', icon: CheckCircle, details: 'Satisfaction: 5/5' }, { time: '30 min', title: 'Ticket assigné', subtitle: 'Bug paiement #4533', type: 'info', icon: AlertCircle, details: 'Priorité haute' }, { time: '1h', title: 'Réponse client', subtitle: 'Information complémentaire reçue', type: 'info', icon: Mail, details: 'Ticket #4528' }, { time: '2h', title: 'Escalade', subtitle: 'Problème complexe vers Tech', type: 'warning', icon: AlertTriangle, details: 'Ticket #4520' }, { time: '4h', title: 'Feedback positif', subtitle: 'Client satisfait - Note 5/5', type: 'success', icon: Star, details: 'Ticket #4515' }, { time: '1j', title: 'Rapport créé', subtitle: 'Statistiques support hebdo', type: 'info', icon: FileText, details: '156 tickets' }]
  }
};

// ============================================================
// KPI CARD
// ============================================================
const AdvancedKPICard = ({ kpi, theme, index }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animateValue, setAnimateValue] = useState(false);
  const Icon = kpi.icon;
  const change = kpi.value - kpi.prev;
  const changePercent = ((change / kpi.prev) * 100).toFixed(1);
  const progress = kpi.target ? (kpi.value / kpi.target * 100) : null;

  useEffect(() => {
    const t = setTimeout(() => setAnimateValue(true), index * 150);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-700 border border-gray-100 overflow-hidden cursor-pointer"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="absolute top-0 right-0 w-72 h-72 opacity-0 group-hover:opacity-10 transition-all duration-1000 rounded-full" style={{ background: theme.gradient, filter: 'blur(60px)', transform: 'translate(30%, -30%)' }} />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="relative p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500" style={{ background: `${theme.colors.primary}20` }}>
          <Icon size={28} style={{ color: theme.colors.primary }} strokeWidth={2.8} />
        </div>
        {change !== 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm shadow-md" style={{ background: change > 0 ? '#10B98120' : '#EF444420', color: change > 0 ? '#10B981' : '#EF4444' }}>
            {change > 0 ? <ArrowUpRight size={18} strokeWidth={3} /> : <ArrowDownRight size={18} strokeWidth={3} />}
            {change > 0 ? '+' : ''}{changePercent}%
          </div>
        )}
      </div>
      <div className="mb-5 relative z-10">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">{kpi.label}</p>
        <div className="flex items-end gap-2">
          <p className="text-5xl font-black tracking-tight transition-all duration-1000" style={{ color: theme.colors.primary, transform: animateValue ? 'scale(1)' : 'scale(0.8)', opacity: animateValue ? 1 : 0 }}>
            {kpi.unit === '€' ? '€' : ''}{kpi.value >= 1000 ? `${(kpi.value / 1000).toFixed(1)}k` : kpi.value}{kpi.unit && kpi.unit !== '€' ? kpi.unit : ''}
          </p>
          {kpi.target && <p className="text-lg font-bold text-gray-400 mb-2">/ {kpi.unit === '€' ? '€' : ''}{kpi.target >= 1000 ? `${(kpi.target / 1000).toFixed(0)}k` : kpi.target}</p>}
        </div>
        <p className="text-xs text-gray-500 mt-2">{kpi.description}</p>
      </div>
      {progress !== null && (
        <div className="mb-5 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-gray-500">Progression</span>
            <span style={{ color: theme.colors.primary }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: animateValue ? `${Math.min(progress, 100)}%` : '0%', background: theme.gradient }} />
          </div>
        </div>
      )}
      <div className="h-20 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={kpi.chart}>
            <defs>
              <linearGradient id={`grad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.colors.primary} stopOpacity={0.4} />
                <stop offset="95%" stopColor={theme.colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={theme.colors.primary} strokeWidth={3} fill={`url(#grad-${kpi.id})`} animationDuration={2000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Details overlay */}
      <div className={`absolute inset-0 bg-white rounded-3xl p-6 transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`} style={{ zIndex: 30 }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-black" style={{ color: theme.colors.primary }}>Détails</h3>
          <Sparkles size={22} style={{ color: theme.colors.primary }} />
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {Object.entries(kpi.details || {}).map(([key, value]: any, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${theme.colors.primary}10` }}>
              <span className="text-sm font-bold text-gray-700">{key}</span>
              <span className="text-sm font-black" style={{ color: theme.colors.primary }}>{value}</span>
            </div>
          ))}
        </div>
        {change !== 0 && (
          <div className="mt-4 p-3 rounded-xl text-center" style={{ background: change > 0 ? '#10B98120' : '#EF444420' }}>
            <p className="text-xs font-black uppercase" style={{ color: change > 0 ? '#10B981' : '#EF4444' }}>
              {change > 0 ? '📈 +' : '📉 '}{Math.abs(change)} vs mois précédent
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ACTIVITY TIMELINE
// ============================================================
const ActivityTimeline = ({ activities, theme }: any) => {
  const getConfig = (type: string) => {
    const configs: any = {
      success: { color: '#10B981', bg: '#10B98120', icon: CheckCircle },
      warning: { color: '#F59E0B', bg: '#F59E0B20', icon: AlertTriangle },
      alert: { color: '#EF4444', bg: '#EF444420', icon: AlertCircle },
      info: { color: theme.colors.primary, bg: `${theme.colors.primary}20`, icon: Info }
    };
    return configs[type] || configs.info;
  };

  return (
    <div className="relative">
      <div className="absolute left-7 top-4 bottom-4 w-0.5 opacity-30" style={{ background: theme.gradient }} />
      <div className="space-y-4">
        {activities.map((activity: any, index: number) => {
          const config = getConfig(activity.type);
          const IconComponent = activity.icon || config.icon;
          return (
            <div key={index} className="relative pl-20 group">
              <div className="absolute left-4 top-4 w-7 h-7 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300 z-10" style={{ backgroundColor: config.color }}>
                <IconComponent size={14} className="text-white" strokeWidth={3} />
              </div>
              <div className="p-5 rounded-2xl transition-all duration-300 cursor-pointer group-hover:shadow-xl group-hover:-translate-y-1" style={{ backgroundColor: config.bg }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 text-base mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.subtitle}</p>
                  </div>
                  {activity.amount && (
                    <div className="px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap ml-4 shadow-md" style={{ backgroundColor: config.color, color: 'white' }}>
                      {activity.amount}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="font-mono font-semibold text-gray-500">Il y a {activity.time}</span>
                  </div>
                  {activity.details && <><span className="text-gray-300">•</span><span className="text-gray-600 font-semibold">{activity.details}</span></>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// PERFORMANCE METRICS
// ============================================================
const PerformanceMetrics = ({ metrics, theme }: any) => {
  const getStatusColor = (status: string) => ({ excellent: '#10B981', good: '#3B82F6', warning: '#F59E0B', danger: '#EF4444' }[status] || '#3B82F6');

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {metrics.map((metric: any, index: number) => {
        const IconComponent = metric.icon;
        const statusColor = getStatusColor(metric.status);
        const progress = (metric.value / metric.target) * 100;
        const achieved = metric.value >= metric.target;
        return (
          <div key={index} className="relative p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-500 group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-full blur-2xl" style={{ backgroundColor: statusColor }} />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="p-3 rounded-xl shadow-sm" style={{ backgroundColor: `${statusColor}15` }}>
                <IconComponent size={22} style={{ color: statusColor }} strokeWidth={2.5} />
              </div>
              {achieved && <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md"><Check size={14} className="text-white" strokeWidth={3} /></div>}
            </div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-wide mb-3 relative z-10">{metric.label}</p>
            <div className="flex items-end gap-2 mb-3 relative z-10">
              <p className="text-3xl font-black" style={{ color: statusColor }}>{metric.value}</p>
              <p className="text-base font-bold text-gray-400 mb-1">{metric.unit}</p>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-gray-500">Objectif: {metric.target}{metric.unit}</span>
                <span style={{ color: statusColor }}>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: statusColor }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// DASHBOARD PRINCIPAL — CONNECTÉ À REDUX
// ============================================================
const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  // ✅ LECTURE DU RÔLE DEPUIS REDUX
  const { user } = useSelector((state: RootState) => state.auth);
  const selectedRole = (user?.role as keyof typeof ROLE_THEMES) ?? 'SUPPORT_AGENT';

  // ✅ FALLBACK SI RÔLE INCONNU
  const theme = ROLE_THEMES[selectedRole] ?? ROLE_THEMES['SUPPORT_AGENT'];
  const data = ROLE_DATA[selectedRole] ?? ROLE_DATA['SUPPORT_AGENT'];

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="p-8">
          <div className="max-w-[1900px] mx-auto">

            {/* Hero Header */}
            <div className="mb-12 relative">
              <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ background: theme.gradient }} />
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-4 h-28 rounded-full shadow-2xl" style={{ background: theme.gradient }} />
                  <div>
                    <h1 className="text-6xl font-black tracking-tight text-gray-900 mb-3">{data.title}</h1>
                    <p className="text-2xl text-gray-500 font-bold">{data.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-sm flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                    <span className="text-gray-700 font-bold">Système opérationnel</span>
                  </div>
                  <span className="text-gray-300 font-bold">•</span>
                  <span className="text-gray-600 font-mono font-semibold">
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-gray-300 font-bold">•</span>
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-green-500" />
                    <span className="text-gray-600 font-semibold">Connecté — {theme.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
              {data.kpis.map((kpi: any, index: number) => (
                <AdvancedKPICard key={kpi.id} kpi={kpi} theme={theme} index={index} />
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Timeline */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Activités Récentes</h2>
                    <p className="text-gray-500 font-semibold">Toutes vos actions en temps réel</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"><Filter size={20} className="text-gray-600" strokeWidth={2.5} /></button>
                    <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"><RefreshCw size={20} className="text-gray-600" strokeWidth={2.5} /></button>
                  </div>
                </div>
                <ActivityTimeline activities={data.activity} theme={theme} />
                <button className="w-full mt-8 py-4 rounded-2xl font-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-lg" style={{ background: theme.gradient }}>
                  Voir tout l'historique <ChevronRight size={22} className="inline ml-2" strokeWidth={3} />
                </button>
              </div>

              {/* Sidebar widgets */}
              <div className="space-y-7">
                <div className="bg-white rounded-3xl p-7 shadow-lg border-2 border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Stats Rapides</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Aujourd\'hui', value: data.kpis[0]?.value ?? 0, icon: data.kpis[0]?.icon ?? Activity, color: theme.colors.primary },
                      { label: 'Progression', value: `${(((data.kpis[0]?.value - data.kpis[0]?.prev) / data.kpis[0]?.prev) * 100).toFixed(1)}%`, icon: TrendingUp, color: '#10B981' },
                      { label: 'Objectif', value: data.kpis[0]?.target ?? '—', icon: Target, color: theme.colors.secondary }
                    ].map((stat: any, i: number) => {
                      const IconComp = stat.icon;
                      return (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${stat.color}15` }}>
                              <IconComp size={22} style={{ color: stat.color }} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-gray-600">{stat.label}</span>
                          </div>
                          <span className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-7 shadow-2xl text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell size={26} className="animate-pulse" strokeWidth={2.5} />
                    <h2 className="text-2xl font-black">Notifications</h2>
                    <div className="ml-auto px-3 py-1.5 rounded-full bg-red-500 text-xs font-black">3</div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'Mise à jour v2.5.1', desc: 'Nouvelles fonctionnalités', time: '10 min' },
                      { title: 'Maintenance planifiée', desc: 'Dimanche 3h-5h', time: '2h' },
                      { title: 'Rapport disponible', desc: 'Statistiques janvier', time: '1j' }
                    ].map((notif, i) => (
                      <div key={i} className="p-4 rounded-2xl border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer group" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-base">{notif.title}</h3>
                          <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{notif.desc}</p>
                        <p className="text-xs text-gray-400 font-mono">Il y a {notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Métriques de Performance</h2>
              <PerformanceMetrics metrics={data.performance.metrics} theme={theme} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Évolution — {data.kpis[data.kpis.length - 1]?.label}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data.kpis[data.kpis.length - 1]?.chart ?? []}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.colors.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={theme.colors.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '13px', fontWeight: '700' }} />
                      <YAxis stroke="#9CA3AF" style={{ fontSize: '13px', fontWeight: '700' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: `3px solid ${theme.colors.primary}`, borderRadius: '16px', padding: '16px', fontWeight: 'bold' }} />
                      <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: '13px' }} />
                      <Bar dataKey="value" fill={theme.colors.primary} radius={[8, 8, 0, 0]} name="Valeur" />
                      <Line type="monotone" dataKey="value" stroke={theme.colors.accent} strokeWidth={3} dot={{ r: 5 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Répartition</h3>
                <div className="h-80 flex items-center justify-center">
                  {data.performance.userSegments?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data.performance.userSegments} cx="50%" cy="50%" labelLine={false} label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={120} dataKey="value" animationDuration={1500}>
                          {data.performance.userSegments.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: `3px solid ${theme.colors.primary}`, borderRadius: '16px', padding: '16px', fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: theme.gradient }}>
                        <BarChart3 size={40} className="text-white" />
                      </div>
                      <p className="text-gray-400 font-semibold">Données spécifiques au rôle</p>
                      <p className="text-gray-300 text-sm mt-1">{theme.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;