import Layout from '../../components/Layout';
import ProjectCard from '../../components/ProjectCard';
import { getProjects } from '../../models/project';
import styles from '../../styles/ProjectList.module.css';

export default function Projects({ projects }) {
  return (
    <Layout pageTitle='Réalisations'>
      <h1 className={styles.title}>Mes Réalisations</h1>
      <div className={styles.projectListContainer}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = await getProjects();
  return {
    props: { projects },
  };
}
