// app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Upload,
  Trash2,
  Save,
  Mail,
  Smartphone,
  Key,
  LogOut,
  Moon,
  Sun,
  Globe,
  CreditCard,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  Download,
  RefreshCw,
  AlertCircle,
  Copy,
  ShieldCheck,
} from "lucide-react";

// Types
interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState<
    "intro" | "qr" | "verify" | "backup" | "success"
  >("intro");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  // États formulaires
  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@organisation.com",
    phone: "+33 6 12 34 56 78",
    role: "Organisateur Principal",
  });

  const [organization, setOrganization] = useState({
    name: "Ligue Régionale de Football",
    description: "Organisation officielle des championnats régionaux",
    address: "123 Avenue du Sport",
    city: "Paris",
    zipCode: "75001",
    country: "France",
    siret: "123 456 789 00012",
    website: "www.ligue-football.fr",
  });

  const [notifications, setNotifications] = useState({
    email: {
      teams: true,
      matches: true,
      finances: false,
    },
    push: {
      championships: true,
      urgent: true,
    },
    sms: {
      critical: false,
    },
  });

  const tabs: Tab[] = [
    { id: "profile", label: "Profil", icon: User },
    { id: "organization", label: "Organisation", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "appearance", label: "Apparence", icon: Palette },
  ];

  const handleSave = () => {
    // Simulation sauvegarde
    alert("Modifications sauvegardées !");
  };

  const toggleNotification = (
    category: "email" | "push" | "sms",
    key: string,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof (typeof prev)[typeof category]],
      },
    }));
  };

  // Générer des codes de secours aléatoires
  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      codes.push(Math.random().toString(36).substring(2, 8).toUpperCase());
    }
    return codes;
  };

  // Réinitialiser le modal 2FA
  const reset2FAModal = () => {
    setTwoFAStep("intro");
    setVerificationCode("");
    setBackupCodes([]);
    setCopiedCode(false);
    setShow2FAModal(false);
  };

  // Démarrer la configuration 2FA
  const start2FASetup = () => {
    setBackupCodes(generateBackupCodes());
    setTwoFAStep("qr");
  };

  // Vérifier le code
  const verifyCode = () => {
    if (verificationCode.length === 6) {
      setTwoFAStep("backup");
    }
  };

  // Activer 2FA
  const enable2FA = () => {
    setIs2FAEnabled(true);
    setTwoFAStep("success");
    setTimeout(() => {
      reset2FAModal();
    }, 2000);
  };

  // Désactiver 2FA
  const disable2FA = () => {
    setIs2FAEnabled(false);
    setTwoFAStep("intro");
  };

  // Copier les codes
  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const QRCodeDisplay = ({ value }: { value: string }) => {
    return (
      <div className="relative w-48 h-48 mx-auto bg-white p-4 rounded-xl">
        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Pattern QR simulé */}
          <div className="grid grid-cols-7 gap-1 w-32 h-32">
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${Math.random() > 0.5 ? "bg-white" : "bg-transparent"}`}
              />
            ))}
          </div>
          {/* Logo au centre */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant Switch personnalisé
  const CustomSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  // Composant Modal personnalisé
  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer: React.ReactNode;
  }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <div className="p-6">{children}</div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
            {footer}
          </div>
        </div>
      </div>
    );
  };

  // Composant Select personnalisé
  const CustomSelect = ({
    value,
    onChange,
    options,
    icon: Icon,
  }: {
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
    icon?: React.ElementType;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selected = options.find((o) => o.value === value);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl text-left hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-gray-500" />}
            <span className="text-gray-900 dark:text-white">
              {selected?.label}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-between ${
                    value === option.value
                      ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {option.label}
                  {value === option.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Paramètres
            </h1>
            <p className="text-slate-500 mt-2 dark:text-slate-400">
              Gérez vos préférences, votre organisation et la sécurité de votre
              compte
            </p>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            Sauvegarder les modifications
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-2xl backdrop-blur-sm mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-md transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4 hidden md:block" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          {/* PROFIL */}
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Informations personnelles
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Mettez à jour vos informations de profil et votre photo
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Photo de profil */}
                <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-slate-700 shadow-lg">
                    JD
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800">
                        <Upload className="w-4 h-4" />
                        Changer la photo
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium bg-white dark:bg-slate-800">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      JPG, PNG ou GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rôle dans l'organisation
                    </label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full px-4 py-2.5 bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500">
                      Le rôle ne peut être modifié que par un administrateur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ORGANISATION */}
          {activeTab === "organization" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Mon Organisation
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Gérez les informations de votre organisation
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nom de l'organisation
                    </label>
                    <input
                      type="text"
                      value={organization.name}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={organization.description}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={organization.address}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={organization.city}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={organization.zipCode}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pays
                    </label>
                    <CustomSelect
                      value={organization.country}
                      onChange={(val) =>
                        setOrganization({ ...organization, country: val })
                      }
                      options={[
                        { value: "France", label: "France" },
                        { value: "Belgique", label: "Belgique" },
                        { value: "Suisse", label: "Suisse" },
                        { value: "Canada", label: "Canada" },
                      ]}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Numéro SIRET
                    </label>
                    <input
                      type="text"
                      value={organization.siret}
                      onChange={(e) =>
                        setOrganization({
                          ...organization,
                          siret: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Site web
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={organization.website}
                        onChange={(e) =>
                          setOrganization({
                            ...organization,
                            website: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Plan */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                      Plan actuel
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Premium - Renouvellement le 15 mars 2024
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-amber-300 dark:border-amber-700 rounded-lg text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors font-medium">
                    <CreditCard className="w-4 h-4" />
                    Gérer l'abonnement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Préférences de notification
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choisissez comment et quand vous souhaitez être notifié
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Email */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                    <Mail className="w-5 h-5 text-gray-500" />
                    Notifications par email
                  </h3>
                  <div className="space-y-3 pl-7">
                    {[
                      {
                        key: "teams",
                        title: "Nouvelles inscriptions d'équipes",
                        desc: "Recevoir un email lorsqu'une nouvelle équipe s'inscrit",
                      },
                      {
                        key: "matches",
                        title: "Mise à jour des matchs",
                        desc: "Scores, changements de date, annulations",
                      },
                      {
                        key: "finances",
                        title: "Rapports financiers",
                        desc: "Résumés hebdomadaires des transactions",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <CustomSwitch
                          checked={
                            notifications.email[
                              item.key as keyof typeof notifications.email
                            ]
                          }
                          onChange={() => toggleNotification("email", item.key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Push */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                    <Smartphone className="w-5 h-5 text-gray-500" />
                    Notifications push
                  </h3>
                  <div className="space-y-3 pl-7">
                    {[
                      {
                        key: "championships",
                        title: "Championnats",
                        desc: "Début/fin de saison, classements mis à jour",
                      },
                      {
                        key: "urgent",
                        title: "Alertes urgentes",
                        desc: "Conflits de planning, problèmes de terrain",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <CustomSwitch
                          checked={
                            notifications.push[
                              item.key as keyof typeof notifications.push
                            ]
                          }
                          onChange={() => toggleNotification("push", item.key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* SMS */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                    <Key className="w-5 h-5 text-gray-500" />
                    SMS
                  </h3>
                  <div className="pl-7">
                    <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Alertes critiques uniquement
                        </p>
                        <p className="text-sm text-gray-500">
                          Annulations de dernière minute, urgences
                        </p>
                      </div>
                      <CustomSwitch
                        checked={notifications.sms.critical}
                        onChange={() => toggleNotification("sms", "critical")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SÉCURITÉ */}
          {activeTab === "security" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Sécurité du compte
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Gérez votre mot de passe et la sécurité
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Mot de passe */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Changer le mot de passe
                  </h3>
                  <div className="grid gap-4 max-w-md">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirmer
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <button className="w-fit px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors">
                      Mettre à jour
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* 2FA */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Authentification à deux facteurs
                  </h3>
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      is2FAEnabled
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          is2FAEnabled
                            ? "bg-green-100 dark:bg-green-800"
                            : "bg-slate-100 dark:bg-slate-700"
                        }`}
                      >
                        <Shield
                          className={`w-6 h-6 ${is2FAEnabled ? "text-green-600 dark:text-green-300" : "text-slate-500"}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-semibold ${is2FAEnabled ? "text-green-900 dark:text-green-100" : "text-gray-900 dark:text-white"}`}
                        >
                          {is2FAEnabled ? "2FA Activée" : "2FA Désactivée"}
                        </p>
                        <p
                          className={`text-sm ${is2FAEnabled ? "text-green-700 dark:text-green-300" : "text-gray-500"}`}
                        >
                          {is2FAEnabled
                            ? "Votre compte est sécurisé"
                            : "Activez la 2FA pour plus de sécurité"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShow2FAModal(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        is2FAEnabled
                          ? "border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25"
                      }`}
                    >
                      {is2FAEnabled ? "Gérer" : "Activer"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Zone danger */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Zone de danger
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center gap-2 px-4 py-3 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion de toutes les sessions
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center gap-2 px-4 py-3 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-left"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APPARENCE */}
          {activeTab === "appearance" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Palette className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Apparence
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Personnalisez l'interface
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Thème */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Thème
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setIsDarkMode(false)}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        !isDarkMode
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                      }`}
                    >
                      <Sun className="w-8 h-8 mb-3 mx-auto text-amber-500" />
                      <p className="font-semibold text-center text-gray-900 dark:text-white">
                        Clair
                      </p>
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Interface lumineuse
                      </p>
                    </button>
                    <button
                      onClick={() => setIsDarkMode(true)}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        isDarkMode
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                      }`}
                    >
                      <Moon className="w-8 h-8 mb-3 mx-auto text-indigo-600" />
                      <p className="font-semibold text-center text-gray-900 dark:text-white">
                        Sombre
                      </p>
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Interface sombre
                      </p>
                    </button>
                    <button className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed relative overflow-hidden">
                      <div className="flex justify-center mb-3">
                        <Sun className="w-6 h-6 text-amber-500 mr-1" />
                        <Moon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="font-semibold text-center text-gray-900 dark:text-white">
                        Système
                      </p>
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Suivre le système
                      </p>
                      <span className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-400">
                        Bientôt
                      </span>
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Langue */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Langue
                  </h3>
                  <CustomSelect
                    value="fr"
                    onChange={() => {}}
                    icon={Globe}
                    options={[
                      { value: "fr", label: "🇫🇷 Français" },
                      { value: "en", label: "🇬🇧 English" },
                      { value: "es", label: "🇪🇸 Español" },
                      { value: "de", label: "🇩🇪 Deutsch" },
                    ]}
                  />
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                {/* Date et heure */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Format de date et heure
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Format de date
                      </label>
                      <CustomSelect
                        value="fr"
                        onChange={() => {}}
                        options={[
                          { value: "fr", label: "JJ/MM/AAAA" },
                          { value: "us", label: "MM/JJ/AAAA" },
                          { value: "iso", label: "AAAA-MM-JJ" },
                        ]}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fuseau horaire
                      </label>
                      <CustomSelect
                        value="paris"
                        onChange={() => {}}
                        options={[
                          { value: "paris", label: "Europe/Paris (UTC+1)" },
                          { value: "london", label: "Europe/London (UTC+0)" },
                          { value: "ny", label: "New York (UTC-5)" },
                          { value: "tokyo", label: "Tokyo (UTC+9)" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Déconnexion globale"
        footer={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              Annuler
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Déconnecter
            </button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          Êtes-vous sûr de vouloir vous déconnecter de tous les appareils ? Vous
          devrez vous reconnecter sur chaque appareil.
        </p>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer définitivement le compte"
        footer={
          <>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              Annuler
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteConfirmText !== "SUPPRIMER"}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Supprimer définitivement
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-red-600 dark:text-red-400 font-medium">
            Cette action est irréversible. Toutes vos données seront perdues.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tapez "SUPPRIMER" pour confirmer
            </label>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="SUPPRIMER"
              className="w-full px-4 py-2 border border-red-300 dark:border-red-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </Modal>

      <Modal
  isOpen={show2FAModal}
  onClose={reset2FAModal}
  title={
    twoFAStep === 'intro' ? 'Authentification à deux facteurs' :
    twoFAStep === 'qr' ? 'Scanner le QR Code' :
    twoFAStep === 'verify' ? 'Vérification' :
    twoFAStep === 'backup' ? 'Codes de secours' :
    'Succès !'
  }
  footer={
    twoFAStep === 'intro' ? (
      <>
        <button 
          onClick={reset2FAModal}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          Annuler
        </button>
        {is2FAEnabled ? (
          <button 
            onClick={disable2FA}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Désactiver 2FA
          </button>
        ) : (
          <button 
            onClick={start2FASetup}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Configurer
          </button>
        )}
      </>
    ) : twoFAStep === 'qr' ? (
      <>
        <button 
          onClick={() => setTwoFAStep('intro')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          Retour
        </button>
        <button 
          onClick={() => setTwoFAStep('verify')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Continuer
        </button>
      </>
    ) : twoFAStep === 'verify' ? (
      <>
        <button 
          onClick={() => setTwoFAStep('qr')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          Retour
        </button>
        <button 
          onClick={verifyCode}
          disabled={verificationCode.length !== 6}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          Vérifier
        </button>
      </>
    ) : twoFAStep === 'backup' ? (
      <>
        <button 
          onClick={() => setTwoFAStep('verify')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          Retour
        </button>
        <button 
          onClick={enable2FA}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          Activer 2FA
        </button>
      </>
    ) : null
  }
>
  {twoFAStep === 'intro' && (
    <div className="space-y-4">
      {is2FAEnabled ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-green-900 dark:text-green-100">Protection active</span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            L'authentification à deux facteurs est actuellement activée sur votre compte. 
            Vous pouvez la désactiver ou reconfigurer vos méthodes d'authentification.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Sécurisez votre compte en ajoutant une couche de protection supplémentaire. 
            Lors de la connexion, vous devrez saisir un code généré par votre téléphone.
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Application d'authentification requise</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Protection contre les accès non autorisés</span>
            </div>
          </div>
        </>
      )}
    </div>
  )}

  {twoFAStep === 'qr' && (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Scannez ce QR Code avec votre application d'authentification 
        (Google Authenticator, Authy, etc.)
      </p>
      
      <QRCodeDisplay value="2FA-SETUP-CODE" />
      
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Clé secrète</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg font-mono text-sm border border-gray-200 dark:border-gray-700">
            XJ2K-9FMP-3LQ8-R5TZ
          </code>
          <button 
            onClick={() => navigator.clipboard.writeText('XJ2K-9FMP-3LQ8-R5TZ')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-800 dark:text-amber-200">
          Ne partagez jamais ce QR Code ou cette clé secrète.
        </p>
      </div>
    </div>
  )}

  {twoFAStep === 'verify' && (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Entrez le code à 6 chiffres généré par votre application d'authentification
      </p>
      
      <div className="flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={verificationCode[i] || ''}
            onChange={(e) => {
              const newCode = verificationCode.split('');
              newCode[i] = e.target.value;
              setVerificationCode(newCode.join(''));
              if (e.target.value && i < 5) {
                const nextInput = e.target.parentElement?.nextElementSibling?.querySelector('input');
                nextInput?.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !verificationCode[i] && i > 0) {
                const prevInput = e.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
                prevInput?.focus();
              }
            }}
            className="w-12 h-14 text-center text-2xl font-bold bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 dark:text-white"
          />
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={() => setTwoFAStep('qr')}
          className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Régénérer le QR Code
        </button>
      </div>
    </div>
  )}

  {twoFAStep === 'backup' && (
    <div className="space-y-4">
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-amber-900 dark:text-amber-100">Important !</span>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Conservez ces codes de secours dans un endroit sûr. Ils vous permettront de 
          récupérer l'accès à votre compte si vous perdez votre téléphone.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        {backupCodes.map((code, i) => (
          <div 
            key={i} 
            className="font-mono text-sm bg-white dark:bg-slate-900 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300"
          >
            {code}
          </div>
        ))}
      </div>

      <button
        onClick={copyBackupCodes}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
          copiedCode 
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
        }`}
      >
        {copiedCode ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Codes copiés !
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Copier les codes
          </>
        )}
      </button>

      <button
        onClick={() => {
          const blob = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'codes-secours-2fa.txt';
          a.click();
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        Télécharger les codes
      </button>
    </div>
  )}

  {twoFAStep === 'success' && (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
      </div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        2FA Activée !
      </h4>
      <p className="text-gray-600 dark:text-gray-400">
        Votre compte est maintenant sécurisé.
      </p>
    </div>
  )}
</Modal>
    </div>
  );
}
