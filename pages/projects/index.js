import Layout from '@components/Layout';
import ProjectCard from '@components/ProjectCard';
import { getProjects } from '@models/project';

export default function Projects({ projects }) {
  return (
    <Layout pageTitle='Réalisations'>
      <h1 className='pageTitle'>Réalisations</h1>
      <div className='flex flex-wrap pt-8 pb-8'>
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
