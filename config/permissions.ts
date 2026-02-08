// ============================================
// SYSTÈME DE GESTION DES PERMISSIONS
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// Types de permissions
export enum Permission {
  // Permissions générales
  VIEW_DASHBOARD = 'view_dashboard',
  
  // Gestion des utilisateurs
  MANAGE_USERS = 'manage_users',
  VIEW_USERS = 'view_users',
  SUSPEND_USERS = 'suspend_users',
  
  // Gestion des organisations
  CREATE_ORGANIZATION = 'create_organization',
  APPROVE_ORGANIZATION = 'approve_organization',
  MANAGE_ORGANIZATION = 'manage_organization',
  
  // Gestion des championnats
  CREATE_CHAMPIONSHIP = 'create_championship',
  MANAGE_CHAMPIONSHIP = 'manage_championship',
  
  // Gestion des équipes
  CREATE_TEAM = 'create_team',
  MANAGE_TEAM = 'manage_team',
  MANAGE_PLAYERS = 'manage_players',
  
  // Paris
  PLACE_BET = 'place_bet',
  VIEW_BETS = 'view_bets',
  MANAGE_ODDS = 'manage_odds',
  VIEW_ALL_BETS = 'view_all_bets',
  
  // Matchs
  OPERATE_MATCH = 'operate_match',
  CREATE_MATCH = 'create_match',
  
  // Finances
  VIEW_FINANCES = 'view_finances',
  MANAGE_FINANCES = 'manage_finances',
  PROCESS_PAYMENTS = 'process_payments',
  
  // Support
  VIEW_TICKETS = 'view_tickets',
  MANAGE_TICKETS = 'manage_tickets',
  
  // Sécurité
  VIEW_SECURITY = 'view_security',
  MANAGE_SECURITY = 'manage_security',
  
  // Configuration système
  MANAGE_SYSTEM = 'manage_system',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
}

// Mappage des permissions par rôle
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  SUPER_ADMIN: [
    // Toutes les permissions
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.SUSPEND_USERS,
    Permission.APPROVE_ORGANIZATION,
    Permission.MANAGE_ORGANIZATION,
    Permission.VIEW_ALL_BETS,
    Permission.MANAGE_ODDS,
    Permission.VIEW_FINANCES,
    Permission.MANAGE_FINANCES,
    Permission.PROCESS_PAYMENTS,
    Permission.VIEW_SECURITY,
    Permission.MANAGE_SECURITY,
    Permission.MANAGE_SYSTEM,
    Permission.VIEW_AUDIT_LOGS,
    Permission.VIEW_TICKETS,
    Permission.MANAGE_TICKETS,
    Permission.OPERATE_MATCH,
  ],

  ADMIN: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_USERS,
    Permission.APPROVE_ORGANIZATION,
    Permission.VIEW_TICKETS,
    Permission.MANAGE_TICKETS,
    Permission.VIEW_ALL_BETS,
  ],

  BETTOR: [
    Permission.VIEW_DASHBOARD,
    Permission.PLACE_BET,
    Permission.VIEW_BETS,
  ],

  ORGANIZATION_OWNER: [
    Permission.VIEW_DASHBOARD,
    Permission.CREATE_ORGANIZATION,
    Permission.MANAGE_ORGANIZATION,
    Permission.CREATE_CHAMPIONSHIP,
    Permission.MANAGE_CHAMPIONSHIP,
    Permission.CREATE_MATCH,
    Permission.VIEW_FINANCES,
    Permission.PLACE_BET,
  ],

  TEAM_MANAGER: [
    Permission.VIEW_DASHBOARD,
    Permission.CREATE_TEAM,
    Permission.MANAGE_TEAM,
    Permission.MANAGE_PLAYERS,
    Permission.VIEW_FINANCES,
    Permission.PLACE_BET,
  ],

  COACH: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_PLAYERS,
  ],

  PLAYER: [
    Permission.VIEW_DASHBOARD,
  ],

  AGENT: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_FINANCES,
  ],

  MATCH_OPERATOR: [
    Permission.VIEW_DASHBOARD,
    Permission.OPERATE_MATCH,
  ],

  SCOUT: [
    Permission.VIEW_DASHBOARD,
  ],

  ANALYST: [
    Permission.VIEW_DASHBOARD,
  ],

  SUPPORT_AGENT: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_TICKETS,
    Permission.MANAGE_TICKETS,
    Permission.VIEW_USERS,
  ],
};

// ============================================
// FONCTIONS HELPERS POUR LES PERMISSIONS
// ============================================

/**
 * Vérifie si un rôle a une permission spécifique
 */
export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Vérifie si un rôle a toutes les permissions spécifiées
 */
export function hasAllPermissions(role: string, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Vérifie si un rôle a au moins une des permissions spécifiées
 */
export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Récupère toutes les permissions d'un rôle
 */
export function getRolePermissions(role: string): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

// ============================================
// MIDDLEWARE DE VÉRIFICATION DES PERMISSIONS
// ============================================

/**
 * HOC (Higher Order Component) pour protéger une page
 * Usage: export default withAuth(MaPage, [Permission.MANAGE_USERS])
 */
export function withAuth(
  Component: React.ComponentType<any>,
  requiredPermissions: Permission[] = []
) {
  return function ProtectedComponent(props: any) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requiredPermissions.length > 0) {
        const hasAccess = hasAllPermissions(user.role, requiredPermissions);
        if (!hasAccess) {
          router.push('/unauthorized');
        }
      }
    }, [user, router]);

    if (!user) {
      return <LoadingSpinner />;
    }

    const hasAccess = requiredPermissions.length === 0 || 
                      hasAllPermissions(user.role, requiredPermissions);

    if (!hasAccess) {
      return <UnauthorizedPage />;
    }

    return <Component {...props} />;
  };
}

/**
 * Hook pour vérifier les permissions dans les composants
 * Usage: const canEdit = usePermission(Permission.MANAGE_USERS)
 */
export function usePermission(permission: Permission): boolean {
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (!user || !user.role) {
    return false;
  }

  return hasPermission(user.role, permission);
}

/**
 * Hook pour vérifier plusieurs permissions
 * Usage: const canManage = usePermissions([Permission.MANAGE_USERS, Permission.SUSPEND_USERS])
 */
export function usePermissions(permissions: Permission[]): boolean {
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (!user || !user.role) {
    return false;
  }

  return hasAllPermissions(user.role, permissions);
}

// ============================================
// COMPOSANT DE PROTECTION CONDITIONNELLE
// ============================================

/**
 * Composant qui affiche son contenu seulement si l'utilisateur a la permission
 * Usage:
 * <ProtectedContent permission={Permission.MANAGE_USERS}>
 *   <button>Supprimer utilisateur</button>
 * </ProtectedContent>
 */
interface ProtectedContentProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // true = toutes les permissions, false = au moins une
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function ProtectedContent({
  permission,
  permissions = [],
  requireAll = true,
  fallback = null,
  children,
}: ProtectedContentProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !user.role) {
    return <>{fallback}</>;
  }

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(user.role, permission);
  } else if (permissions.length > 0) {
    hasAccess = requireAll
      ? hasAllPermissions(user.role, permissions)
      : hasAnyPermission(user.role, permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

// ============================================
// EXEMPLES D'UTILISATION
// ============================================

/*
// 1. Protéger une page entière
export default withAuth(UsersPage, [Permission.MANAGE_USERS]);

// 2. Vérifier permission dans un composant
function MyComponent() {
  const canEdit = usePermission(Permission.MANAGE_USERS);
  
  return (
    <div>
      {canEdit && <button>Modifier</button>}
    </div>
  );
}

// 3. Affichage conditionnel avec composant
function Dashboard() {
  return (
    <div>
      <ProtectedContent permission={Permission.MANAGE_USERS}>
        <AdminPanel />
      </ProtectedContent>
      
      <ProtectedContent 
        permissions={[Permission.VIEW_BETS, Permission.PLACE_BET]}
        requireAll={false}
      >
        <BettingSection />
      </ProtectedContent>
    </div>
  );
}

// 4. Vérification côté serveur (API Route)
export async function POST(request: NextRequest) {
  const session = await getSession(request);
  
  if (!hasPermission(session.user.role, Permission.MANAGE_USERS)) {
    return NextResponse.json(
      { error: 'Permission refusée' },
      { status: 403 }
    );
  }
  
  // Code de l'API
}

// 5. Vérification dans un formulaire
function CreateChampionshipForm() {
  const canCreate = usePermission(Permission.CREATE_CHAMPIONSHIP);
  
  if (!canCreate) {
    return <p>Vous n'avez pas les droits pour créer un championnat</p>;
  }
  
  return <form>...</form>;
}

// 6. Boutons conditionnels dans une liste
function UsersList() {
  const canSuspend = usePermission(Permission.SUSPEND_USERS);
  
  return (
    <table>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>
            {canSuspend && (
              <button onClick={() => suspendUser(user.id)}>
                Suspendre
              </button>
            )}
          </td>
        </tr>
      ))}
    </table>
  );
}
*/

// ============================================
// MIDDLEWARE NEXT.JS (middleware.ts)
// ============================================

/*
// Créez un fichier middleware.ts à la racine de votre projet

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const path = request.nextUrl.pathname;

  // Routes publiques
  const publicPaths = ['/', '/login', '/register'];
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est connecté
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Décoder le token pour obtenir le rôle
  const user = decodeToken(token.value);

  // Vérifications spécifiques par route
  if (path.startsWith('/dashboard/admin') && user.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
*/