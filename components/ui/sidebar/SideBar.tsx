// components/SideBar.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronRight, LogOut, User, Menu, X } from 'lucide-react';
import SvgIcon from './SvgIcon';
import { SIDEBAR_CONFIG } from "@/config/sidebarConfig";
import { SidebarLink } from "@/config/sidebarConfig";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { logout } from '@/slice/authSlice';

export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // ✅ Lire le rôle depuis Redux, fallback sur SUPPORT_AGENT
    const userRole = user?.role ?? 'SUPPORT_AGENT';
    const currentRoleConfig = SIDEBAR_CONFIG[userRole] ?? SIDEBAR_CONFIG['SUPPORT_AGENT'];
    const sidebarLinks = currentRoleConfig.links;
    const displayRoleName = currentRoleConfig.displayName;

    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ''}`.trim()
        : user?.email?.split('@')[0] ?? 'User';

    const avatarLetter = displayName.charAt(0).toUpperCase();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    const toggleSubMenu = (linkId: number) => {
        setOpenSubMenus(prev =>
            prev.includes(linkId) ? prev.filter(id => id !== linkId) : [...prev, linkId]
        );
    };

    const renderLink = (link: SidebarLink) => {
        const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
        const hasSubLinks = link.subLinks && link.subLinks.length > 0;
        const isSubOpen = openSubMenus.includes(link.id);

        return (
            <li key={link.id} className="list-none mb-1">
                <div className="relative group px-3">
                    {hasSubLinks ? (
                        <button
                            onClick={() => toggleSubMenu(link.id)}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all duration-300
                                ${isActive
                                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-200"
                                    : "text-slate-500 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${isActive ? "bg-white/20" : "bg-slate-100"}`}>
                                    <SvgIcon name={link.iconName} size={18} color={isActive ? "white" : "currentColor"} />
                                </div>
                                <span className="text-[13px] font-bold tracking-tight">{link.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {link.badge && (
                                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                        {link.badge}
                                    </span>
                                )}
                                <ChevronRight size={14} className={`transition-transform ${isSubOpen ? 'rotate-90' : ''}`} />
                            </div>
                        </button>
                    ) : (
                        <Link
                            href={link.path}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all duration-300
                                ${isActive
                                    ? "bg-slate-900 text-white shadow-xl scale-[1.02]"
                                    : "text-slate-500 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${isActive ? "bg-green-500" : "bg-slate-100"}`}>
                                    <SvgIcon name={link.iconName} size={18} color={isActive ? "white" : "currentColor"} />
                                </div>
                                <span className="text-[13px] font-bold tracking-tight">{link.title}</span>
                            </div>
                            {link.badge && (
                                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    )}
                </div>

                {hasSubLinks && isSubOpen && (
                    <ul className="mt-2 ml-12 space-y-1 border-l-2 border-slate-100">
                        {link.subLinks!.map(subLink => (
                            <li key={subLink.id}>
                                <Link
                                    href={subLink.path}
                                    className={`block py-2 px-4 text-[12px] font-semibold transition-colors
                                        ${pathname === subLink.path ? "text-green-600" : "text-slate-400 hover:text-slate-700"}`}
                                >
                                    {subLink.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-slate-900 text-white rounded-2xl shadow-xl"
            >
                <Menu size={24} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-[80] w-72 bg-white flex flex-col transition-transform duration-500 ease-in-out
                lg:translate-x-0 lg:static lg:h-screen lg:border-r lg:border-slate-100
                ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-6 right-6 p-2 bg-slate-100 rounded-xl"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-[2rem] shadow-2xl">
                        <div className="bg-white p-2 rounded-2xl">
                            <Image src="/logo/logo.png" width={32} height={32} alt="Logo" />
                        </div>
                        <div className="leading-none">
                            <h2 className="text-white text-sm font-black uppercase italic">Futur</h2>
                            <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Ecosystem</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
                    {/* ✅ Badge du rôle depuis Redux */}
                    <div className="px-6 mb-4">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            {displayRoleName}
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {sidebarLinks.map((link: SidebarLink) => renderLink(link))}
                    </nav>
                </div>

                <div className="p-6 mt-auto">
                    <div className="bg-slate-50 p-4 pt-12 rounded-[2.5rem] relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <div className="w-16 h-16 bg-slate-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                <span className="text-white text-xl font-black">{avatarLetter}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-sm font-black text-slate-900 uppercase truncate max-w-[160px] mx-auto">
                                {displayName}
                            </h3>
                            {/* ✅ Rôle depuis Redux */}
                            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">
                                {displayRoleName}
                            </span>
                            {user?.email && (
                                <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[160px] mx-auto">
                                    {user.email}
                                </p>
                            )}
                        </div>

                        <div className="mt-5 flex gap-2">
                            <Link
                                href="/dashboard/profile"
                                className="flex-1 flex justify-center items-center gap-2 py-3 bg-white rounded-2xl text-[11px] font-black uppercase border border-slate-100 hover:bg-slate-900 hover:text-white transition-all"
                            >
                                <User size={14} /> Profil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-3 bg-white text-red-500 rounded-2xl border border-slate-100 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}