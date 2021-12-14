import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import axios from 'axios';
import Link from 'next/link';

export default function ProjectListAdmin() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios.get('/api/projects').then((res) => setProjects(res.data));
  }, []);

  const deleteProject = async (id) => {
    if (confirm('Voulez vous vraiment supprimer ce projet définitivement ?')) {
      await axios.delete(`/api/projects/${id}`);
      alert('projet bien supprimé');
      setProjects((projects) => projects.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout pageTitle='Gérer les projets'>
      <h1 className='text-4xl font-bold'>Manage projects</h1>
      {!projects && <p>Loading...</p>}
      {projects?.length === 0 && <p>No projects for now</p>}
      {projects && projects.length !== 0 && (
        <table className='table-auto mt-6 mb-6'>
          <tbody className='border-t'>
            {projects.map(({ id, title }) => (
              <tr className='border-b' key={id}>
                <td className='text-lg p-3 font-bold'>{title}</td>
                <td className='pt-3 pb-3'>
                  <Link passHref href={`/projects/${id}`}>
                    <button className='mr-6 bg-sky-600 hover:bg-sky-700'>
                      See
                    </button>
                  </Link>
                  <Link passHref href={`/admin/projects/edit/${id}`}>
                    <button className='mr-6'>Edit</button>
                  </Link>
                  <button
                    className='bg-red-400 hover:bg-red-500'
                    onClick={() => deleteProject(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link passHref href='/admin/projects/edit/new'>
        <button className='bg-green-600 hover:bg-green-700'>New Project</button>
      </Link>
    </AdminLayout>
  );
}
