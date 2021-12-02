import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function DashBoard() {
  return (
    <AdminLayout pageTitle='Dashboard'>
      <Link>
        <a>Gérer mes réalisations</a>
      </Link>
    </AdminLayout>
  );
}
