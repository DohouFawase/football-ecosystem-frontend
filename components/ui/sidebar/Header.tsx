'use client'
import { Bell, Search, Settings, ShieldCheck, Zap, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { SIDEBAR_CONFIG } from "@/config/sidebarConfig";

export default function Header() {
    const pathname = usePathname();
    
    // Simulation du rôle (À remplacer par ton State/Redux plus tard)
    const currentRole = "ORGANIZATION_OWNER"; 
    const config = SIDEBAR_CONFIG[currentRole];

    // Style dynamique selon le rôle
    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN': return "from-amber-500 to-orange-600 shadow-orange-500/20";
            case 'ORGANIZATION_OWNER': return "from-blue-500 to-indigo-600 shadow-blue-500/20";
            case 'TEAM_MANAGER': return "from-green-500 to-emerald-600 shadow-green-500/20";
            default: return "from-slate-700 to-slate-800 shadow-slate-500/20";
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full px-6 py-4">
            <div className="mx-auto flex items-center justify-between bg-white/[0.8] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] px-6 py-3">
                
                {/* GAUCHE : Breadcrumbs & Titre Dynamique */}
                <div className="flex items-center gap-4">
                    <div className={`hidden md:flex p-2.5 rounded-2xl bg-gradient-to-br ${getRoleStyles(currentRole)} text-white`}>
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">
                            {config.displayName}
                        </h2>
                        <h1 className="text-slate-900 font-black text-lg tracking-tight capitalize italic">
                            {pathname.split('/').pop() || 'Dashboard'}
                        </h1>
                    </div>
                </div>

                {/* CENTRE : Barre de recherche Hype */}
                <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative group">
                    <Search className="absolute left-4 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Rechercher une analyse, un joueur..." 
                        className="w-full bg-slate-100/50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                    />
                </div>

                {/* DROITE : Actions & Notifications */}
                <div className="flex items-center gap-3">
                    
                    {/* Bouton Notification avec Badge Pulse */}
                    <button className="relative p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                    </button>

                    {/* Quick Settings */}
                    <button className="hidden sm:flex p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                        <Settings size={20} />
                    </button>

                    {/* Séparateur */}
                    <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />

                    {/* Badge Rôle Statut */}
                    <div className="flex items-center gap-2 pl-2">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                            <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                                <ShieldCheck size={12} /> Verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}