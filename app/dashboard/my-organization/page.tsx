"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Loader2, Globe, Mail, Phone, MapPin, 
  Building2, FileText, Download, ShieldCheck, 
  ExternalLink, ArrowUpRight, Copy, CheckCircle2,
  AlertCircle, Calendar, Users, TrendingUp
} from 'lucide-react';
import { useOrgs } from "@/context/OrgContext";

// Types stricts
interface Document {
  id: string;
  type: string;
  url: string;
  size?: string;
  uploadedAt?: string;
}

interface Organization {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'suspended';
  industry: string;
  registrationNumber: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
  owner?: {
    email: string;
    name?: string;
  };
  documents?: Document[];
  _count?: {
    leagues: number;
    members?: number;
  };
  createdAt?: string;
  kycStatus?: 'verified' | 'pending' | 'rejected';
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Composants atomiques réutilisables

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    active: { bg: "bg-emerald-500", text: "text-white", label: "Actif" },
    pending: { bg: "bg-amber-500", text: "text-white", label: "En attente" },
    suspended: { bg: "bg-rose-500", text: "text-white", label: "Suspendu" },
    verified: { bg: "bg-blue-500", text: "text-white", label: "Vérifié" }
  };

  const config = configs[status as keyof typeof configs] || configs.active;

  return (
    <motion.span 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 ${config.bg} ${config.text} rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-${config.bg}/20`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      {config.label}
    </motion.span>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
      title="Copier"
    >
      {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </motion.button>
  );
};

const InfoCard = ({ 
  label, 
  value, 
  icon: Icon, 
  href, 
  copyable 
}: { 
  label: string; 
  value?: string; 
  icon: React.ElementType; 
  href?: string;
  copyable?: boolean;
}) => {
  if (!value) return null;

  const content = (
    <motion.div 
      variants={itemVariants}
      whileHover={{ x: 4 }}
      className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
    >
      <div className="p-3 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-slate-900 text-sm truncate">{value}</p>
          {copyable && <CopyButton text={value} />}
        </div>
      </div>
      {href && (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-blue-600 transition-all"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );

  return content;
};

const DocumentCard = ({ doc, index }: { doc: Document; index: number }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    // Simulation download
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDownloading(false);
  }, []);

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative overflow-hidden"
    >
      <motion.div 
        variants={cardHover}
        className="flex items-center justify-between p-6 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 hover:from-white hover:to-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer"
        onClick={handleDownload}
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <FileText size={22} strokeWidth={1.5} className="text-slate-700" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
              PDF
            </div>
          </div>
          <div>
            <p className="font-black text-xs uppercase tracking-wider text-slate-900 group-hover:text-blue-600 transition-colors">
              {doc.type}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {doc.size || "2.4 MB"} • {doc.uploadedAt || "Il y a 2 jours"}
            </p>
          </div>
        </div>
        
        <motion.div 
          className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDownloading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} strokeWidth={2.5} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color = "blue" 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number; 
  trend?: string;
  color?: "blue" | "emerald" | "amber" | "rose";
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
    emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
    amber: "from-amber-500 to-amber-600 shadow-amber-500/20",
    rose: "from-rose-500 to-rose-600 shadow-rose-500/20"
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClasses[color]} opacity-10 blur-2xl rounded-full -mr-8 -mt-8`} />
      
      <div className="relative flex items-start justify-between">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
          <Icon size={20} strokeWidth={2} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-xs font-medium text-slate-500 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

// Loading State amélioré
const LoadingState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 rounded-full animate-pulse" />
      <Loader2 className="animate-spin text-slate-900 relative z-10" size={48} strokeWidth={1.5} />
    </motion.div>
    <motion.p 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-slate-400 font-medium tracking-[0.3em] text-[11px] mt-8 uppercase"
    >
      Initialisation...
    </motion.p>
  </div>
);

// Empty State amélioré
const EmptyState = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] p-6"
  >
    <div className="max-w-md text-center space-y-6">
      <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
        <Building2 size={40} className="text-slate-300" />
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Aucune Organisation</h2>
        <p className="text-slate-500 leading-relaxed">
          Vous n'avez pas encore créé ou rejoint d'organisation. Commencez par créer votre structure.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20"
      >
        Créer une Organisation
      </motion.button>
    </div>
  </motion.div>
);

// Composant principal
export default function OrganizationPage() {
  const { organizations, isInitialized } = useOrgs();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'settings'>('overview');
  
  const org: Organization | null = organizations?.[0] || null;

  if (!isInitialized) return <LoadingState />;
  if (!org) return <EmptyState />;

  const ownerName = org.owner?.email?.split('@')[0] || "Propriétaire";
  const ownerEmail = org.owner?.email || "Non renseigné";

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation subtile */}
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">Dashboard</span>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
            {(['overview', 'documents', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto p-6 md:p-12 space-y-8"
      >
        {/* Header Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Info Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative group shrink-0"
              >
                <div className="h-36 w-36 rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-2 flex items-center justify-center overflow-hidden shadow-inner">
                  <img 
                    src={org.logoUrl || "/api/placeholder/150/150"} 
                    alt={`Logo ${org.name}`}
                    className="h-full w-full rounded-[1.6rem] object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100"
                >
                  <ShieldCheck size={22} className="text-blue-600" />
                </motion.div>
              </motion.div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={org.status} />
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {org.industry}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  {org.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <Building2 size={14} />
                    {org.registrationNumber || "N° Non renseigné"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <Calendar size={14} />
                    Créé récemment
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Owner Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-slate-900/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            
            <div className="relative flex justify-between items-start mb-8">
              <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <ArrowUpRight size={28} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Admin</span>
            </div>
            
            <div className="relative">
              <p className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Propriétaire</p>
              <p className="font-bold text-xl tracking-tight truncate mb-1">{ownerName}</p>
              <p className="text-xs text-white/40 truncate font-mono">{ownerEmail}</p>
            </div>
          </motion.div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description Section */}
            <motion.section 
              variants={itemVariants}
              className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                  À Propos
                  <div className="h-px w-12 bg-slate-200" />
                </h3>
                <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider transition-colors">
                  Modifier
                </button>
              </div>
              
              <blockquote className="relative">
                <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif leading-none">"</span>
                <p className="text-lg leading-relaxed text-slate-700 font-medium relative z-10 pl-4">
                  {org.description || "Aucune description n'a été rédigée pour le moment. Ajoutez une description pour présenter votre organisation."}
                </p>
              </blockquote>
            </motion.section>

            {/* Contact Grid */}
            <motion.section 
              variants={itemVariants}
              className="bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                Coordonnées
                <div className="h-px flex-1 bg-slate-100" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InfoCard 
                  label="Email Direct" 
                  value={org.email} 
                  icon={Mail} 
                  copyable 
                />
                <InfoCard 
                  label="Téléphone" 
                  value={org.phone} 
                  icon={Phone} 
                  copyable 
                />
                <InfoCard 
                  label="Site Web" 
                  value={org.website} 
                  icon={Globe} 
                  href={org.website}
                />
                <InfoCard 
                  label="Adresse" 
                  value={org.address} 
                  icon={MapPin} 
                />
              </div>
            </motion.section>

            {/* Documents Section */}
            <motion.section 
              variants={itemVariants}
              className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Archives Officielles
                  </h3>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                    {org.documents?.length || 0} Documents
                  </span>
                </div>
                <StatusBadge status="verified" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {org.documents?.map((doc, i) => (
                    <DocumentCard key={doc.id || i} doc={doc} index={i} />
                  ))}
                </AnimatePresence>
                
                {(!org.documents || org.documents.length === 0) && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl"
                  >
                    <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-medium text-slate-500">Aucun document archivé</p>
                  </motion.div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <motion.section variants={itemVariants} className="space-y-4">
              <MetricCard 
                icon={FileText} 
                label="Ligues Actives" 
                value={org._count?.leagues || 0} 
                trend="+12%"
                color="blue"
              />
              <MetricCard 
                icon={Users} 
                label="Membres Totaux" 
                value={org._count?.members || 0} 
                color="emerald"
              />
              <MetricCard 
                icon={ShieldCheck} 
                label="Statut KYC" 
                value={org.kycStatus === 'verified' ? 'Validé' : 'En cours'} 
                color={org.kycStatus === 'verified' ? 'emerald' : 'amber'}
              />
            </motion.section>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative overflow-hidden bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-900/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <ExternalLink size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Console Organisateur</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.section 
              variants={itemVariants}
              className="bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-sm"
            >
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                Actions Rapides
              </h4>
              <div className="space-y-2">
                {['Inviter membres', 'Nouvelle ligue', 'Support'].map((action, i) => (
                  <motion.button
                    key={action}
                    whileHover={{ x: 4 }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-between group"
                  >
                    {action}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </main>
  );
}