'use client';
import { withAuth } from '@/app/_components/withAuth';

function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Contenu admin */}
    </div>
  );
}

export default withAuth(AdminPage, { requiredRole: 'admin' }); 