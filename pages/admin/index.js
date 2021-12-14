import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function DashBoard() {
  return (
    <AdminLayout pageTitle='Dashboard'>
      <h1 className='text-4xl font-bold mb-6'>Dashboard</h1>
      <Link passHref href='/admin/projects'>
        <button className='mb-6'>See my projects</button>
      </Link>

      <p>Soon : lots of cool charts here</p>
    </AdminLayout>
  );
}
