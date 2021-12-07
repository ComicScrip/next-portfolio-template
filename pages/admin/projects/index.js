import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../../styles/AdminProjectListing.module.css';

export default function ProjectListAdmin() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios.get('/api/projects').then((res) => setProjects(res.data));
  }, []);

  const deleteProject = async (id) => {
    if (confirm('Voulez vous vraiment supprimer ce projet définitivement ?')) {
      await axios.delete(`/api/projects/${id}`);
      alert('projet bien supprimé');
      setProjects((projects) => projects.filter((p) => p._id !== id));
    }
  };

  return (
    <AdminLayout pageTitle='Gérer les projets'>
      <h1>Manage projects</h1>
      {!projects && <p>Chargement...</p>}
      {projects?.length === 0 && <p>Aucun projet enregistré pour le moment</p>}
      {projects && projects.length !== 0 && (
        <table className={styles.table}>
          <tbody>
            {projects.map(({ _id, title }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td>
                  <Link passHref href={`/admin/projects/edit/${_id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteProject(_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link passHref href='/admin/projects/edit/new'>
        <button>New Project</button>
      </Link>
    </AdminLayout>
  );
}
