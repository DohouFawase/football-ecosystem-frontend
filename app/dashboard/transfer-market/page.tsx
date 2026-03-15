// app/transfer/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowRight, 
  Wallet, 
  History, 
  User, 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Send,
  Download,
  Clock,
  Star,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  X,
  ChevronLeft,
  CreditCard,
  Smartphone,
  Globe,
  Zap,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Bookmark,
  Trash2,
  Edit3,
  Share2,
  FileText,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types existants conservés + nouveaux
interface UserAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accountNumber: string;
  type: 'checking' | 'savings';
}

interface TransferHistory {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'sent' | 'received';
  category?: string;
  reference?: string;
}

interface TransferFormData {
  recipient: string;
  amount: string;
  currency: string;
  note: string;
  schedule?: Date;
  isRecurring?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

interface FavoriteContact {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  avatar?: string;
  isFavorite: boolean;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

// Mock Data existant conservé + extensions
const MOCK_ACCOUNTS: UserAccount[] = [
  { id: '1', name: 'Compte Courant', balance: 15420.50, currency: 'EUR', accountNumber: 'FR76 3000 1000 0100 0000 0000 000', type: 'checking' },
  { id: '2', name: 'Livret A', balance: 8500.00, currency: 'EUR', accountNumber: 'FR76 3000 1000 0200 0000 0000 001', type: 'savings' },
];

const MOCK_HISTORY: TransferHistory[] = [
  { id: '1', recipient: 'Marie Dupont', amount: 250.00, date: '2024-02-23T10:30:00', status: 'completed', type: 'sent', category: 'Alimentation', reference: 'TRF-001' },
  { id: '2', recipient: 'Jean Martin', amount: 1200.00, date: '2024-02-22T14:15:00', status: 'completed', type: 'sent', category: 'Loyer', reference: 'TRF-002' },
  { id: '3', recipient: 'Sophie Bernard', amount: 75.50, date: '2024-02-21T09:00:00', status: 'pending', type: 'sent', category: 'Services', reference: 'TRF-003' },
  { id: '4', recipient: 'Pierre Durand', amount: 3000.00, date: '2024-02-20T16:45:00', status: 'completed', type: 'received', category: 'Salaire', reference: 'TRF-004' },
  { id: '5', recipient: 'Amazon', amount: 89.99, date: '2024-02-19T11:20:00', status: 'completed', type: 'sent', category: 'Shopping', reference: 'TRF-005' },
  { id: '6', recipient: 'EDF', amount: 145.00, date: '2024-02-18T08:00:00', status: 'completed', type: 'sent', category: 'Factures', reference: 'TRF-006' },
];

const FAVORITES: FavoriteContact[] = [
  { id: '1', name: 'Marie Dupont', accountNumber: 'FR76 3000 1000 0100 0000 0000 001', bank: 'BNP Paribas', isFavorite: true },
  { id: '2', name: 'Jean Martin', accountNumber: 'FR76 3000 1000 0100 0000 0000 002', bank: 'Société Générale', isFavorite: true },
  { id: '3', name: 'Sophie Bernard', accountNumber: 'FR76 3000 1000 0100 0000 0000 003', bank: 'Crédit Agricole', isFavorite: true },
  { id: '4', name: 'Pierre Durand', accountNumber: 'FR76 3000 1000 0100 0000 0000 004', bank: 'CIC', isFavorite: false },
];

const EXCHANGE_RATES: ExchangeRate[] = [
  { from: 'EUR', to: 'USD', rate: 1.0845, trend: 'up', change: 0.12 },
  { from: 'EUR', to: 'GBP', rate: 0.8542, trend: 'down', change: -0.05 },
  { from: 'EUR', to: 'CHF', rate: 0.9421, trend: 'stable', change: 0.01 },
];

// NOUVEAU: Composants UI avancés
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Tabs = ({ 
  tabs, 
  activeTab, 
  onChange 
}: { 
  tabs: { id: string; label: string; icon?: React.ElementType }[]; 
  activeTab: string; 
  onChange: (id: string) => void;
}) => (
  <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6">
    {tabs.map((tab) => {
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === tab.id 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }
          `}
        >
          {Icon && <Icon size={16} />}
          {tab.label}
        </button>
      );
    })}
  </div>
);

const Badge = ({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  trend?: 'up' | 'down'; 
  trendValue?: string;
  icon: React.ElementType;
}) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon size={20} className="text-blue-600" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <p className="text-slate-500 text-sm mb-1">{title}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

// Composants existants conservés (Card, Button, Input, BalanceCard, TransferStep, RecentContact, TransactionItem)
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600',
    ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md'
  };

  return (
    <button 
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; icon?: React.ElementType }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
      {label}
      {props.required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={20} />
        </div>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
          ${Icon ? 'pl-12' : ''}
          ${error 
            ? 'border-red-300 focus:border-red-500 bg-red-50' 
            : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50/30 hover:border-slate-300'
          }
        `}
        {...props}
      />
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-600 flex items-center gap-1"
      >
        <AlertCircle size={14} />
        {error}
      </motion.p>
    )}
  </div>
);

const BalanceCard = ({ account }: { account: UserAccount }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
      <div className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">{account.name}</p>
            <p className="text-blue-200 text-xs font-mono opacity-80">{account.accountNumber.slice(-4).padStart(account.accountNumber.length, '•')}</p>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showBalance ? <EyeOff size={20} className="text-blue-100" /> : <Eye size={20} className="text-blue-100" />}
          </button>
        </div>
        
        <div className="space-y-1">
          <p className="text-blue-100 text-sm">Solde disponible</p>
          <h2 className="text-4xl font-bold tracking-tight">
            {showBalance 
              ? `${account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ${account.currency}`
              : '••••••••'
            }
          </h2>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-full">
            <Shield size={12} />
            Sécurisé
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={12} />
            Actif
          </div>
        </div>
      </div>
    </Card>
  );
};

const TransferStep = ({ 
  number, 
  title, 
  active, 
  completed 
}: { 
  number: number; 
  title: string; 
  active: boolean; 
  completed: boolean 
}) => (
  <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-50'}`}>
    <div className={`
      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
      ${completed ? 'bg-green-500 text-white' : active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}
    `}>
      {completed ? <CheckCircle2 size={16} /> : number}
    </div>
    <span className={`font-medium ${active ? 'text-slate-900' : 'text-slate-500'}`}>{title}</span>
  </div>
);

const RecentContact = ({ name, onClick }: { name: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg group-hover:scale-110 transition-transform">
      {name.charAt(0)}
    </div>
    <span className="text-xs font-medium text-slate-600">{name.split(' ')[0]}</span>
  </button>
);

const TransactionItem = ({ transaction, onClick }: { transaction: TransferHistory; onClick?: () => void }) => {
  const isSent = transaction.type === 'sent';
  const statusColors = {
    completed: 'text-green-600 bg-green-50',
    pending: 'text-amber-600 bg-amber-50',
    failed: 'text-red-600 bg-red-50'
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${isSent ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}
        `}>
          {isSent ? <Send size={18} /> : <Download size={18} />}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{transaction.recipient}</p>
          <p className="text-sm text-slate-500">
            {new Date(transaction.date).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
            {transaction.category && ` • ${transaction.category}`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isSent ? 'text-slate-900' : 'text-green-600'}`}>
          {isSent ? '-' : '+'}{transaction.amount.toFixed(2)} €
        </p>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[transaction.status]}`}>
          {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En cours' : 'Échoué'}
        </span>
      </div>
    </div>
  );
};

// NOUVEAU: Composant détail transaction
const TransactionDetailModal = ({ 
  transaction, 
  isOpen, 
  onClose 
}: { 
  transaction: TransferHistory | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails de la transaction" size="md">
      <div className="space-y-6">
        <div className="text-center pb-6 border-b border-slate-100">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${transaction.type === 'sent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {transaction.type === 'sent' ? <Send size={32} /> : <Download size={32} />}
          </div>
          <h2 className={`text-3xl font-bold ${transaction.type === 'sent' ? 'text-slate-900' : 'text-green-600'}`}>
            {transaction.type === 'sent' ? '-' : '+'}{transaction.amount.toFixed(2)} €
          </h2>
          <p className="text-slate-500 mt-2">{transaction.recipient}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-slate-500">Statut</span>
            <Badge variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'error'}>
              {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En cours' : 'Échoué'}
            </Badge>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-slate-500">Date</span>
            <span className="font-medium">{new Date(transaction.date).toLocaleString('fr-FR')}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-slate-500">Référence</span>
            <span className="font-mono font-medium">{transaction.reference}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-slate-500">Catégorie</span>
            <span className="font-medium">{transaction.category}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-slate-500">Type</span>
            <span className="font-medium capitalize">{transaction.type === 'sent' ? 'Envoyé' : 'Reçu'}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={() => {}}>
            <Share2 size={18} />
            Partager
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => {}}>
            <FileText size={18} />
            PDF
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => {}}>
            <Printer size={18} />
            Imprimer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// NOUVEAU: Modal Historique Complet
const HistoryModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransferHistory | null>(null);

  const filteredHistory = MOCK_HISTORY.filter(t => {
    const matchesFilter = filter === 'all' ? true : filter === 'sent' ? t.type === 'sent' : t.type === 'received';
    const matchesSearch = t.recipient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Historique complet" size="lg">
        <div className="space-y-6">
          {/* Filtres et recherche */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none bg-white"
            >
              <option value="all">Tous</option>
              <option value="sent">Envoyés</option>
              <option value="received">Reçus</option>
            </select>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600">{MOCK_HISTORY.length}</p>
              <p className="text-sm text-blue-700">Total</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600">
                {MOCK_HISTORY.filter(t => t.type === 'received').reduce((acc, t) => acc + t.amount, 0).toFixed(0)}€
              </p>
              <p className="text-sm text-green-700">Reçus</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-red-600">
                {MOCK_HISTORY.filter(t => t.type === 'sent').reduce((acc, t) => acc + t.amount, 0).toFixed(0)}€
              </p>
              <p className="text-sm text-red-700">Envoyés</p>
            </div>
          </div>

          {/* Liste des transactions */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredHistory.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onClick={() => setSelectedTransaction(transaction)}
              />
            ))}
          </div>
        </div>
      </Modal>

      <TransactionDetailModal 
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
};

// NOUVEAU: Modal Favoris
const FavoritesModal = ({ 
  isOpen, 
  onClose,
  onSelectContact
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSelectContact: (contact: FavoriteContact) => void;
}) => {
  const [favorites, setFavorites] = useState(FAVORITES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', accountNumber: '', bank: '' });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.map(f => f.id === id ? { ...f, isFavorite: !f.isFavorite } : f));
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.accountNumber) {
      const contact: FavoriteContact = {
        id: Date.now().toString(),
        ...newContact,
        isFavorite: true
      };
      setFavorites([...favorites, contact]);
      setNewContact({ name: '', accountNumber: '', bank: '' });
      setShowAddForm(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contacts favoris" size="md">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-600">{favorites.filter(f => f.isFavorite).length} favoris</p>
          <Button variant="secondary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Annuler' : 'Ajouter'}
          </Button>
        </div>

        {showAddForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-slate-50 p-4 rounded-xl space-y-3 mb-4"
          >
            <Input
              label="Nom"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
            />
            <Input
              label="IBAN / Numéro de compte"
              value={newContact.accountNumber}
              onChange={(e) => setNewContact({...newContact, accountNumber: e.target.value})}
            />
            <Input
              label="Banque"
              value={newContact.bank}
              onChange={(e) => setNewContact({...newContact, bank: e.target.value})}
            />
            <Button className="w-full" onClick={handleAddContact}>
              Ajouter le contact
            </Button>
          </motion.div>
        )}

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {favorites.filter(f => f.isFavorite).map((contact) => (
            <div 
              key={contact.id} 
              className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{contact.name}</p>
                  <p className="text-sm text-slate-500">{contact.bank}</p>
                  <p className="text-xs text-slate-400 font-mono">{contact.accountNumber.slice(0, 8)}...</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onSelectContact(contact)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
                <button 
                  onClick={() => toggleFavorite(contact.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

// NOUVEAU: Convertisseur de devises
const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  
  const rate = EXCHANGE_RATES.find(r => r.from === fromCurrency && r.to === toCurrency)?.rate || 1;
  const converted = (parseFloat(amount || '0') * rate).toFixed(2);

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={20} className="text-indigo-200" />
        <h3 className="font-bold">Convertisseur de devises</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-indigo-200 mb-1 block">Montant</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
          </div>
          <div>
            <label className="text-xs text-indigo-200 mb-1 block">De</label>
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
            >
              <option value="EUR" className="text-slate-900">EUR</option>
              <option value="USD" className="text-slate-900">USD</option>
              <option value="GBP" className="text-slate-900">GBP</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Repeat size={20} className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-indigo-200 mb-1 block">Vers</label>
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
            >
              <option value="USD" className="text-slate-900">USD</option>
              <option value="EUR" className="text-slate-900">EUR</option>
              <option value="GBP" className="text-slate-900">GBP</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-indigo-200 mb-1 block">Résultat</label>
            <div className="px-3 py-2 rounded-lg bg-white/20 font-bold text-lg">
              {converted} {toCurrency}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-200 pt-2 border-t border-white/10">
          <TrendingUp size={14} />
          <span>Taux: 1 {fromCurrency} = {rate} {toCurrency}</span>
        </div>
      </div>
    </Card>
  );
};

// NOUVEAU: Transfert programmé
const ScheduledTransferModal = ({ 
  isOpen, 
  onClose,
  formData,
  setFormData
}: { 
  isOpen: boolean; 
  onClose: () => void;
  formData: TransferFormData;
  setFormData: React.Dispatch<React.SetStateAction<TransferFormData>>;
}) => {
  const [scheduledTransfers, setScheduledTransfers] = useState([
    { id: '1', recipient: 'Loyer', amount: 1200, date: '2024-03-01', frequency: 'monthly' },
    { id: '2', recipient: 'Netflix', amount: 15.99, date: '2024-03-05', frequency: 'monthly' },
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transferts programmés" size="md">
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Calendar size={18} />
            Programmer un nouveau transfert
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="recurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="recurring" className="text-sm text-slate-700">Transfert récurrent</label>
            </div>
            
            {formData.isRecurring && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-3"
              >
                <select 
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value as any})}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                >
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                </select>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, schedule: new Date(e.target.value)})}
                />
              </motion.div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Transferts actifs</h4>
          <div className="space-y-2">
            {scheduledTransfers.map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{transfer.recipient}</p>
                    <p className="text-sm text-slate-500 capitalize">{transfer.frequency} • Prochain: {transfer.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{transfer.amount.toFixed(2)} €</p>
                  <button className="text-xs text-red-600 hover:underline">Annuler</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Main Component avec nouvelles fonctionnalités
export default function TransferMarketPage() {
  // États existants conservés
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount>(MOCK_ACCOUNTS[0]);
  const [formData, setFormData] = useState<TransferFormData>({
    recipient: '',
    amount: '',
    currency: 'EUR',
    note: '',
    isRecurring: false
  });
  const [errors, setErrors] = useState<Partial<TransferFormData>>({});

  // NOUVEAUX états pour les modals
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showScheduledModal, setShowScheduledModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransferHistory | null>(null);

  // Vérification du rôle conservée
  const userRole = 'argent';
  const isAuthorized = userRole === 'argent';

  // Fonctions existantes conservées
  const validateStep1 = () => {
    const newErrors: Partial<TransferFormData> = {};
    if (!formData.recipient.trim()) newErrors.recipient = 'Veuillez saisir un destinataire';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Montant invalide';
    if (parseFloat(formData.amount) > selectedAccount.balance) newErrors.amount = 'Solde insuffisant';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 2000);
    }
  };

  const handleNewTransfer = () => {
    setStep(1);
    setFormData({ recipient: '', amount: '', currency: 'EUR', note: '', isRecurring: false });
    setErrors({});
  };

  const handleSelectContact = (contact: FavoriteContact) => {
    setFormData({ ...formData, recipient: contact.name });
    setShowFavoritesModal(false);
  };

  // NOUVEAU: Notifications mock
  const notifications = [
    { id: '1', title: 'Transfert reçu', message: '+500€ de Pierre Durand', time: '2 min', unread: true },
    { id: '2', title: 'Paiement effectué', message: 'Virement vers Marie Dupont', time: '1h', unread: true },
    { id: '3', title: 'Alerte sécurité', message: 'Nouvelle connexion détectée', time: '3h', unread: false },
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Accès Restreint</h2>
          <p className="text-slate-600 mb-6">
            Cette section est réservée aux utilisateurs avec le rôle 'argent'.
          </p>
          <Button variant="outline" className="w-full">Retour à l'accueil</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header amélioré avec notifications */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-end h-16">
            
            <div className="flex items-center gap-4">
              {/* NOUVEAU: Bouton favoris */}
              <button 
                onClick={() => setShowFavoritesModal(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
                title="Contacts favoris"
              >
                <Star size={20} className="text-slate-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
                  {FAVORITES.filter(f => f.isFavorite).length}
                </span>
              </button>

              {/* NOUVEAU: Bouton transferts programmés */}
              <button 
                onClick={() => setShowScheduledModal(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Transferts programmés"
              >
                <Calendar size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* NOUVEAU: Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Solde total" 
            value={`${selectedAccount.balance.toLocaleString('fr-FR')} €`}
            trend="up"
            trendValue="+2.4%"
            icon={Wallet}
          />
          <StatCard 
            title="Envoyés ce mois" 
            value="1,525.50 €"
            trend="down"
            trendValue="-12%"
            icon={ArrowUpRight}
          />
          <StatCard 
            title="Reçus ce mois" 
            value="3,000.00 €"
            trend="up"
            trendValue="+8%"
            icon={ArrowDownLeft}
          />
          <StatCard 
            title="Transactions" 
            value="24"
            icon={Repeat}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transfer Form (VOTRE LOGIQUE CONSERVÉE) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <TransferStep number={1} title="Détails" active={step === 1} completed={step > 1} />
                <div className="flex-1 h-0.5 bg-slate-200 mx-4">
                  <div className={`h-full bg-blue-600 transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`} />
                </div>
                <TransferStep number={2} title="Confirmation" active={step === 2} completed={step > 2} />
                <div className="flex-1 h-0.5 bg-slate-200 mx-4">
                  <div className={`h-full bg-blue-600 transition-all duration-500 ${step > 2 ? 'w-full' : 'w-0'}`} />
                </div>
                <TransferStep number={3} title="Terminé" active={step === 3} completed={step > 3} />
              </div>
            </Card>

            {/* Transfer Form (VOTRE CODE EXACT CONSERVÉ) */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Send className="text-blue-600" />
                      Nouveau Transfert
                    </h2>

                    {/* Account Selection */}
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">Compte source</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MOCK_ACCOUNTS.map((account) => (
                          <button
                            key={account.id}
                            onClick={() => setSelectedAccount(account)}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200
                              ${selectedAccount.id === account.id 
                                ? 'border-blue-600 bg-blue-50' 
                                : 'border-slate-200 hover:border-blue-300'
                              }
                            `}
                          >
                            <p className="font-semibold text-slate-900">{account.name}</p>
                            <p className="text-sm text-slate-600 mt-1">
                              {account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {account.currency}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Contacts */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-slate-700">Contacts récents</label>
                        <button 
                          onClick={() => setShowFavoritesModal(true)}
                          className="text-xs text-blue-600 font-medium hover:underline"
                        >
                          Voir les favoris
                        </button>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {['Marie D.', 'Jean M.', 'Sophie B.', 'Pierre D.', 'Lucas R.'].map((name) => (
                          <RecentContact 
                            key={name} 
                            name={name} 
                            onClick={() => setFormData({ ...formData, recipient: name })} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Destinataire"
                        placeholder="Nom, IBAN, email ou téléphone"
                        value={formData.recipient}
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        error={errors.recipient}
                        icon={User}
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Montant"
                          type="number"
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          error={errors.amount}
                          required
                        />
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Devise</label>
                          <select 
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none bg-white"
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Motif (optionnel)</label>
                        <textarea
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none resize-none h-24"
                          placeholder="Ajouter un message..."
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        />
                      </div>

                      {/* NOUVEAU: Option programmation rapide */}
                      <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <Calendar size={18} className="text-slate-400" />
                        <span className="text-sm text-slate-600 flex-1">Programmer pour plus tard ?</span>
                        <button 
                          onClick={() => setShowScheduledModal(true)}
                          className="text-sm text-blue-600 font-medium hover:underline"
                        >
                          Configurer
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="text-sm text-slate-500">
                        Frais de transfert: <span className="font-semibold text-slate-900">0.00 €</span>
                      </div>
                      <Button onClick={handleContinue} className="min-w-[160px]">
                        Continuer
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Confirmer le transfert</h2>
                    
                    <div className="bg-slate-50 rounded-xl p-6 space-y-4 mb-6">
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">De</span>
                        <span className="font-semibold text-slate-900">{selectedAccount.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Vers</span>
                        <span className="font-semibold text-slate-900">{formData.recipient}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Montant</span>
                        <span className="font-bold text-2xl text-slate-900">
                          {parseFloat(formData.amount).toFixed(2)} {formData.currency}
                        </span>
                      </div>
                      {formData.note && (
                        <div className="flex justify-between py-2 border-b border-slate-200">
                          <span className="text-slate-600">Motif</span>
                          <span className="font-medium text-slate-900 text-right max-w-[200px]">{formData.note}</span>
                        </div>
                      )}
                      {formData.isRecurring && (
                        <div className="flex justify-between py-2 border-b border-slate-200">
                          <span className="text-slate-600">Récurrence</span>
                          <span className="font-medium text-blue-600 capitalize">{formData.frequency}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Frais</span>
                        <span className="font-semibold text-green-600">Gratuit</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <Shield className="text-blue-600 shrink-0 mt-0.5" size={20} />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Sécurité renforcée</p>
                        <p>Ce transfert sera sécurisé par cryptage bancaire de niveau militaire.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="secondary" 
                        className="flex-1" 
                        onClick={() => setStep(1)}
                        disabled={isLoading}
                      >
                        Modifier
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={handleContinue}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="animate-spin" size={18} />
                            Traitement...
                          </>
                        ) : (
                          <>
                            Confirmer
                            <CheckCircle2 size={18} />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Transfert effectué !</h2>
                    <p className="text-slate-600 mb-8">
                      Votre transfert de <span className="font-bold text-slate-900">{parseFloat(formData.amount).toFixed(2)} {formData.currency}</span> vers {formData.recipient} a été initié avec succès.
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-500">Référence</span>
                        <span className="font-mono font-semibold">TRF-{Date.now().toString(36).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold">{new Date().toLocaleString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => {}}>
                        <Download size={18} />
                        Reçu
                      </Button>
                      <Button className="flex-1" onClick={handleNewTransfer}>
                        Nouveau transfert
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Améliorée */}
          <div className="space-y-6">
            <BalanceCard account={selectedAccount} />

            {/* NOUVEAU: Convertisseur de devises */}
            <CurrencyConverter />

            {/* Historique amélioré avec "Voir tout" fonctionnel */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <History size={20} className="text-blue-600" />
                  Historique récent
                </h3>
                <button 
                  onClick={() => setShowHistoryModal(true)}
                  className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                  Voir tout
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="space-y-2">
                {MOCK_HISTORY.slice(0, 4).map((transaction) => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction}
                    onClick={() => setSelectedTransaction(transaction)}
                  />
                ))}
              </div>
            </Card>

            {/* Limites conservées */}
            <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
              <h3 className="font-bold mb-2">Limites de transfert</h3>
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Journalier</span>
                    <span>10 000 / 50 000 €</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[20%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Mensuel</span>
                    <span>45 000 / 100 000 €</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[45%] rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* NOUVEAUX Modals */}
      <HistoryModal 
        isOpen={showHistoryModal} 
        onClose={() => setShowHistoryModal(false)} 
      />
      
      <FavoritesModal 
        isOpen={showFavoritesModal} 
        onClose={() => setShowFavoritesModal(false)}
        onSelectContact={handleSelectContact}
      />

      <ScheduledTransferModal 
        isOpen={showScheduledModal}
        onClose={() => setShowScheduledModal(false)}
        formData={formData}
        setFormData={setFormData}
      />

      <TransactionDetailModal 
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}