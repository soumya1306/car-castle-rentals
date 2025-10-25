'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard by default
    router.replace('/login/admin/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}

export default Admin
