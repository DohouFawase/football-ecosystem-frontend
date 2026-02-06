import { MOCK_ORGANIZATION } from '@/mock/organizationMock';
import React from 'react';

/**
 * Composant de page optimisé : 
 * - Pas de useEffect (évite les doubles rendus)
 * - Design Tailwind CSS moderne & épuré
 * - Responsive (Mobile first)
 */
export default async function Page() {
    const org = MOCK_ORGANIZATION;

    return (
        <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* --- BANNIÈRE & LOGO --- */}
                <section className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
                    <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900" />
                    <div className="relative px-8 pb-8">
                        <div className="absolute -top-16 left-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-white p-2 shadow-xl ring-4 ring-white">
                            <img 
                                src={org.logoUrl} 
                                alt="Logo" 
                                className="h-full w-full rounded-2xl object-cover" 
                            />
                        </div>
                        <div className="ml-0 mt-20 flex flex-col justify-between gap-4 md:ml-40 md:mt-4 md:flex-row md:items-end">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{org.name}</h1>
                                <p className="text-slate-500 font-medium">{org.legalName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100">
                                    {org.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">À propos</h2>
                            <p className="leading-relaxed text-slate-600">{org.description}</p>
                            
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoBlock label="Email Professionnel" value={org.email} isLink />
                                <InfoBlock label="Téléphone" value={org.phone} />
                                <InfoBlock label="Site Web" value={org.website} isLink />
                                <InfoBlock label="Adresse" value={org.address} />
                            </div>
                        </section>

                        <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Documents Officiels</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {org.documents.map((doc, i) => (
                                    <a key={i} href={doc.url} target="_blank" className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm group-hover:scale-110 transition-transform font-bold text-xs">PDF</div>
                                            <span className="font-semibold text-slate-700 capitalize">{doc.type}</span>
                                        </div>
                                        <span className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase">Voir</span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                            <h2 className="text-lg font-bold mb-6">Propriétaire</h2>
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">
                                    {org.owner.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Contact Principal</p>
                                    <p className="font-bold truncate w-40">{org.owner.email}</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Vérification KYC</span>
                                    <span className="font-bold text-indigo-400 uppercase">{org.owner.kycStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Statistiques</h2>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 font-medium">Ligues créées</span>
                                <span className="text-3xl font-black text-indigo-600">{org._count.leagues}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

/** Composant utilitaire pour les blocs d'info */
function InfoBlock({ label, value, isLink = false }: { label: string, value: string, isLink?: boolean }) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
            {isLink ? (
                <a href={value.startsWith('http') ? value : `mailto:${value}`} className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors break-all">
                    {value}
                </a>
            ) : (
                <p className="font-bold text-slate-700">{value}</p>
            )}
        </div>
    );
}