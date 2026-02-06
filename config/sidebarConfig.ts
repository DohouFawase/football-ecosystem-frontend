// Configuration des menus sidebar par rôle
import { LucideIcon } from 'lucide-react';

export type SidebarLink = {
    id: number;
    title: string;
    path: string;
    iconName: string;
    svgPath?: string; // Chemin vers le fichier SVG
    badge?: number; // Pour afficher des notifications
    subLinks?: SidebarLink[]; // Pour les sous-menus
};

export type RoleConfig = {
    role: string;
    displayName: string;
    links: SidebarLink[];
};

// ============================================
// CONFIGURATION DES MENUS PAR RÔLE
// ============================================

export const SIDEBAR_CONFIG: Record<string, RoleConfig> = {
    // ==================== SUPER_ADMIN ====================
    SUPER_ADMIN: {
        role: 'SUPER_ADMIN',
        displayName: 'Super Administrateur',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Organisations',
                path: '/dashboard/organizations',
                iconName: 'organizations',
                svgPath: '/icons/organizations.svg',
                badge: 5, // Organisations en attente
                subLinks: [
                    {
                        id: 21,
                        title: 'En attente',
                        path: '/dashboard/organizations/pending',
                        iconName: 'pending',
                        svgPath: '/icons/pending.svg',
                    },
                    {
                        id: 22,
                        title: 'Approuvées',
                        path: '/dashboard/organizations/approved',
                        iconName: 'approved',
                        svgPath: '/icons/approved.svg',
                    },
                    {
                        id: 23,
                        title: 'Suspendues',
                        path: '/dashboard/organizations/suspended',
                        iconName: 'suspended',
                        svgPath: '/icons/suspended.svg',
                    },
                ],
            },
            {
                id: 3,
                title: 'Utilisateurs',
                path: '/dashboard/users',
                iconName: 'users',
                svgPath: '/icons/users.svg',
            },
            {
                id: 4,
                title: 'Paris & Cotes',
                path: '/dashboard/bets',
                iconName: 'bets',
                svgPath: '/icons/bets.svg',
            },
            {
                id: 5,
                title: 'Finances',
                path: '/dashboard/finances',
                iconName: 'finances',
                svgPath: '/icons/finances.svg',
            },
            {
                id: 6,
                title: 'Sports & Marchés',
                path: '/dashboard/sports-config',
                iconName: 'sports',
                svgPath: '/icons/sports.svg',
            },
            {
                id: 7,
                title: 'Sécurité & Fraude',
                path: '/dashboard/security',
                iconName: 'security',
                svgPath: '/icons/security.svg',
                badge: 12, // Alertes
            },
            {
                id: 8,
                title: 'Support',
                path: '/dashboard/support',
                iconName: 'support',
                svgPath: '/icons/support.svg',
                badge: 23,
            },
            {
                id: 9,
                title: 'Paramètres',
                path: '/dashboard/settings',
                iconName: 'settings',
                svgPath: '/icons/settings.svg',
            },
        ],
    },

    // ==================== ADMIN ====================
    ADMIN: {
        role: 'ADMIN',
        displayName: 'Administrateur',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Organisations',
                path: '/dashboard/organizations',
                iconName: 'organizations',
                svgPath: '/icons/organizations.svg',
            },
            {
                id: 3,
                title: 'Support',
                path: '/dashboard/support',
                iconName: 'support',
                svgPath: '/icons/support.svg',
            },
            {
                id: 4,
                title: 'Modération',
                path: '/dashboard/moderation',
                iconName: 'moderation',
                svgPath: '/icons/moderation.svg',
            },
            {
                id: 5,
                title: 'Paramètres',
                path: '/dashboard/settings',
                iconName: 'settings',
                svgPath: '/icons/settings.svg',
            },
        ],
    },

    // ==================== BETTOR ====================
    BETTOR: {
        role: 'BETTOR',
        displayName: 'Parieur',
        links: [
            {
                id: 1,
                title: 'Accueil',
                path: '/dashboard',
                iconName: 'home',
                svgPath: '/icons/home.svg',
            },
            {
                id: 2,
                title: 'Mes Paris',
                path: '/dashboard/my-bets',
                iconName: 'my-bets',
                svgPath: '/icons/my-bets.svg',
                subLinks: [
                    {
                        id: 21,
                        title: 'En cours',
                        path: '/dashboard/my-bets/active',
                        iconName: 'active',
                        svgPath: '/icons/active.svg',
                    },
                    {
                        id: 22,
                        title: 'Historique',
                        path: '/dashboard/my-bets/history',
                        iconName: 'history',
                        svgPath: '/icons/history.svg',
                    },
                ],
            },
            {
                id: 3,
                title: 'Matchs',
                path: '/dashboard/matches',
                iconName: 'matches',
                svgPath: '/icons/matches.svg',
            },
            {
                id: 4,
                title: 'Live',
                path: '/dashboard/live',
                iconName: 'live',
                svgPath: '/icons/live.svg',
            },
            {
                id: 5,
                title: 'Wallet',
                path: '/dashboard/wallet',
                iconName: 'wallet',
                svgPath: '/icons/wallet.svg',
            },
            {
                id: 6,
                title: 'Bonus',
                path: '/dashboard/bonus',
                iconName: 'bonus',
                svgPath: '/icons/bonus.svg',
                badge: 2,
            },
            {
                id: 7,
                title: 'Favoris',
                path: '/dashboard/favorites',
                iconName: 'favorites',
                svgPath: '/icons/favorites.svg',
            },
            {
                id: 8,
                title: 'Fidélité',
                path: '/dashboard/loyalty',
                iconName: 'loyalty',
                svgPath: '/icons/loyalty.svg',
            },
        ],
    },

    // ==================== ORGANIZATION_OWNER ====================
    ORGANIZATION_OWNER: {
        role: 'ORGANIZATION_OWNER',
        displayName: 'Organisateur',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Mon Organisation',
                path: '/dashboard/my-organization',
                iconName: 'organization',
                svgPath: '/icons/organization.svg',
            },
            {
                id: 3,
                title: 'Championnats',
                path: '/dashboard/championships',
                iconName: 'championships',
                svgPath: '/icons/championships.svg',
                subLinks: [
                    {
                        id: 31,
                        title: 'En cours',
                        path: '/dashboard/championships/active',
                        iconName: 'active',
                        svgPath: '/icons/active.svg',
                    },
                    {
                        id: 32,
                        title: 'Créer nouveau',
                        path: '/dashboard/championships/create',
                        iconName: 'create',
                        svgPath: '/icons/create.svg',
                    },

                     {
                        id: 32,
                        title: 'En attente',
                        path: '/dashboard/championships/pending',
                        iconName: 'create',
                        svgPath: '/icons/create.svg',
                    },
                ],
            },
            {
                id: 4,
                title: 'Équipes',
                path: '/dashboard/teams',
                iconName: 'teams',
                svgPath: '/icons/teams.svg',
                badge: 3, // Inscriptions en attente
            },
            {
                id: 5,
                title: 'Matchs',
                path: '/dashboard/matches',
                iconName: 'matches',
                svgPath: '/icons/matches.svg',
            },
            {
                id: 6,
                title: 'Finances',
                path: '/dashboard/finances',
                iconName: 'finances',
                svgPath: '/icons/finances.svg',
            },
            {
                id: 7,
                title: 'Opérateurs',
                path: '/dashboard/operators',
                iconName: 'operators',
                svgPath: '/icons/operators.svg',
            },
            {
                id: 8,
                title: 'Paramètres',
                path: '/dashboard/settings',
                iconName: 'settings',
                svgPath: '/icons/settings.svg',
            },
        ],
    },

    // ==================== TEAM_MANAGER ====================
    TEAM_MANAGER: {
        role: 'TEAM_MANAGER',
        displayName: 'Manager d\'Équipe',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Mon Équipe',
                path: '/dashboard/my-team',
                iconName: 'team',
                svgPath: '/icons/team.svg',
            },
            {
                id: 3,
                title: 'Effectif',
                path: '/dashboard/squad',
                iconName: 'squad',
                svgPath: '/icons/squad.svg',
                subLinks: [
                    {
                        id: 31,
                        title: 'Joueurs',
                        path: '/dashboard/squad/players',
                        iconName: 'players',
                        svgPath: '/icons/players.svg',
                    },
                    {
                        id: 32,
                        title: 'Staff',
                        path: '/dashboard/squad/staff',
                        iconName: 'staff',
                        svgPath: '/icons/staff.svg',
                    },
                    {
                        id: 33,
                        title: 'Recruter',
                        path: '/dashboard/squad/recruit',
                        iconName: 'recruit',
                        svgPath: '/icons/recruit.svg',
                    },
                ],
            },
            {
                id: 4,
                title: 'Championnats',
                path: '/dashboard/championships',
                iconName: 'championships',
                svgPath: '/icons/championships.svg',
            },
            {
                id: 5,
                title: 'Calendrier',
                path: '/dashboard/calendar',
                iconName: 'calendar',
                svgPath: '/icons/calendar.svg',
            },
            {
                id: 6,
                title: 'Matchs Amicaux',
                path: '/dashboard/friendly-matches',
                iconName: 'friendly',
                svgPath: '/icons/friendly.svg',
            },
            {
                id: 7,
                title: 'Transferts',
                path: '/dashboard/transfers',
                iconName: 'transfers',
                svgPath: '/icons/transfers.svg',
            },
            {
                id: 8,
                title: 'Tactiques',
                path: '/dashboard/tactics',
                iconName: 'tactics',
                svgPath: '/icons/tactics.svg',
            },
            {
                id: 9,
                title: 'Finances',
                path: '/dashboard/finances',
                iconName: 'finances',
                svgPath: '/icons/finances.svg',
            },
            {
                id: 10,
                title: 'Réunions',
                path: '/dashboard/meetings',
                iconName: 'meetings',
                svgPath: '/icons/meetings.svg',
            },
        ],
    },

    // ==================== COACH ====================
    COACH: {
        role: 'COACH',
        displayName: 'Entraîneur',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Effectif',
                path: '/dashboard/squad',
                iconName: 'squad',
                svgPath: '/icons/squad.svg',
            },
            {
                id: 3,
                title: 'Prochains Matchs',
                path: '/dashboard/upcoming-matches',
                iconName: 'upcoming',
                svgPath: '/icons/upcoming.svg',
            },
            {
                id: 4,
                title: 'Tactiques',
                path: '/dashboard/tactics',
                iconName: 'tactics',
                svgPath: '/icons/tactics.svg',
            },
            {
                id: 5,
                title: 'Entraînements',
                path: '/dashboard/training',
                iconName: 'training',
                svgPath: '/icons/training.svg',
            },
            {
                id: 6,
                title: 'Statistiques',
                path: '/dashboard/stats',
                iconName: 'stats',
                svgPath: '/icons/stats.svg',
            },
            {
                id: 7,
                title: 'Rapports',
                path: '/dashboard/reports',
                iconName: 'reports',
                svgPath: '/icons/reports.svg',
            },
        ],
    },

    // ==================== PLAYER ====================
    PLAYER: {
        role: 'PLAYER',
        displayName: 'Joueur',
        links: [
            {
                id: 1,
                title: 'Mon Profil',
                path: '/dashboard',
                iconName: 'profile',
                svgPath: '/icons/profile.svg',
            },
            {
                id: 2,
                title: 'Statistiques',
                path: '/dashboard/stats',
                iconName: 'stats',
                svgPath: '/icons/stats.svg',
            },
            {
                id: 3,
                title: 'Calendrier',
                path: '/dashboard/calendar',
                iconName: 'calendar',
                svgPath: '/icons/calendar.svg',
            },
            {
                id: 4,
                title: 'Mon Contrat',
                path: '/dashboard/contract',
                iconName: 'contract',
                svgPath: '/icons/contract.svg',
            },
            {
                id: 5,
                title: 'Prix & Récompenses',
                path: '/dashboard/awards',
                iconName: 'awards',
                svgPath: '/icons/awards.svg',
            },
            {
                id: 6,
                title: 'Condition Physique',
                path: '/dashboard/fitness',
                iconName: 'fitness',
                svgPath: '/icons/fitness.svg',
            },
        ],
    },

    // ==================== MATCH_OPERATOR ====================
    MATCH_OPERATOR: {
        role: 'MATCH_OPERATOR',
        displayName: 'Opérateur de Match',
        links: [
            {
                id: 1,
                title: 'Mes Matchs',
                path: '/dashboard',
                iconName: 'my-matches',
                svgPath: '/icons/my-matches.svg',
            },
            {
                id: 2,
                title: 'Match en Direct',
                path: '/dashboard/live-match',
                iconName: 'live-match',
                svgPath: '/icons/live-match.svg',
            },
            {
                id: 3,
                title: 'Historique',
                path: '/dashboard/history',
                iconName: 'history',
                svgPath: '/icons/history.svg',
            },
            {
                id: 4,
                title: 'Incidents',
                path: '/dashboard/incidents',
                iconName: 'incidents',
                svgPath: '/icons/incidents.svg',
            },
        ],
    },

    // ==================== AGENT ====================
    AGENT: {
        role: 'AGENT',
        displayName: 'Agent de Joueurs',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Mes Joueurs',
                path: '/dashboard/my-players',
                iconName: 'my-players',
                svgPath: '/icons/my-players.svg',
            },
            {
                id: 3,
                title: 'Marché Transferts',
                path: '/dashboard/transfer-market',
                iconName: 'market',
                svgPath: '/icons/market.svg',
            },
            {
                id: 4,
                title: 'Négociations',
                path: '/dashboard/negotiations',
                iconName: 'negotiations',
                svgPath: '/icons/negotiations.svg',
                badge: 5,
            },
            {
                id: 5,
                title: 'Finances',
                path: '/dashboard/finances',
                iconName: 'finances',
                svgPath: '/icons/finances.svg',
            },
        ],
    },

    // ==================== SCOUT ====================
    SCOUT: {
        role: 'SCOUT',
        displayName: 'Scout',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Joueurs à Scout',
                path: '/dashboard/scouting',
                iconName: 'scouting',
                svgPath: '/icons/scouting.svg',
            },
            {
                id: 3,
                title: 'Mes Rapports',
                path: '/dashboard/reports',
                iconName: 'reports',
                svgPath: '/icons/reports.svg',
            },
            {
                id: 4,
                title: 'Matchs à Observer',
                path: '/dashboard/matches',
                iconName: 'matches',
                svgPath: '/icons/matches.svg',
            },
        ],
    },

    // ==================== ANALYST ====================
    ANALYST: {
        role: 'ANALYST',
        displayName: 'Analyste',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Statistiques',
                path: '/dashboard/statistics',
                iconName: 'statistics',
                svgPath: '/icons/statistics.svg',
            },
            {
                id: 3,
                title: 'Rapports',
                path: '/dashboard/reports',
                iconName: 'reports',
                svgPath: '/icons/reports.svg',
            },
            {
                id: 4,
                title: 'Analyses Tactiques',
                path: '/dashboard/tactical-analysis',
                iconName: 'tactical',
                svgPath: '/icons/tactical.svg',
            },
            {
                id: 5,
                title: 'Heatmaps',
                path: '/dashboard/heatmaps',
                iconName: 'heatmaps',
                svgPath: '/icons/heatmaps.svg',
            },
        ],
    },

    // ==================== SUPPORT_AGENT ====================
    SUPPORT_AGENT: {
        role: 'SUPPORT_AGENT',
        displayName: 'Agent Support',
        links: [
            {
                id: 1,
                title: 'Dashboard',
                path: '/dashboard',
                iconName: 'dashboard',
                svgPath: '/icons/dashboard.svg',
            },
            {
                id: 2,
                title: 'Tickets',
                path: '/dashboard/tickets',
                iconName: 'tickets',
                svgPath: '/icons/tickets.svg',
                badge: 23,
            },
            {
                id: 3,
                title: 'Utilisateurs',
                path: '/dashboard/users',
                iconName: 'users',
                svgPath: '/icons/users.svg',
            },
            {
                id: 4,
                title: 'Transactions',
                path: '/dashboard/transactions',
                iconName: 'transactions',
                svgPath: '/icons/transactions.svg',
            },
        ],
    },
};

// Fonction helper pour obtenir la config d'un rôle
export const getSidebarConfig = (role: string): RoleConfig | null => {
    return SIDEBAR_CONFIG[role] || null;
};

// Fonction pour vérifier si un utilisateur a accès à un lien
export const hasAccessToLink = (userRole: string, linkPath: string): boolean => {
    const config = getSidebarConfig(userRole);
    if (!config) return false;

    const checkLinks = (links: SidebarLink[]): boolean => {
        return links.some(link => {
            if (link.path === linkPath) return true;
            if (link.subLinks) return checkLinks(link.subLinks);
            return false;
        });
    };

    return checkLinks(config.links);
};