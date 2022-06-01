import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/users')
      .then((res) => setUserList(res.data))
      .catch(console.error);
  }, []);

  return (
    <AdminLayout pageTitle={'Dashboard'}>
      <h1 className='text-2xl mb-4'>Dashboard</h1>
      <h2 className='text-2xl'>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {userList.map(({ id, name, email, role }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
