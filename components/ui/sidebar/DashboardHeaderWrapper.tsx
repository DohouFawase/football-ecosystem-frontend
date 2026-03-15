// components/ui/sidebar/DashboardHeaderWrapper.tsx
'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/store/store';
import { logout } from '@/slice/authSlice';
import ChicHeader from '@/components/ui/sidebar/Header';

export default function DashboardHeaderWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // ✅ Nom depuis Redux
  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ''}`.trim()
    : user?.email?.split('@')[0] ?? 'Utilisateur';

  // ✅ Rôle depuis Redux
  const userRole = (user?.role ?? 'SUPPORT_AGENT') as any;

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <ChicHeader
      userRole={userRole}
      userName={userName}
      onLogout={handleLogout}
    />
  );
}
