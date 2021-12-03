import Image from 'next/image';
import Layout from '@components/Layout';
import { getOneProject, getProjects } from '@models/project';
import styles from '@styles/ProjectDetails.module.css';

export default function Project({
  project: { title, mainPictureUrl, description },
}) {
  return (
    <Layout pageTitle={title}>
      <div className={styles.projectDetailsContainer}>
        <h1 className={styles.title}>{title}</h1>
        <Image src={mainPictureUrl} alt={title} width={1000} height={600} />
        <p>{description}</p>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const projects = await getProjects();
  return {
    paths: projects.map((p) => {
      return { params: { id: p.id.toString() } };
    }),
    fallback: 'blocking',
  };
}

export async function getStaticProps(ctx) {
  const project = await getOneProject(ctx.params.id);
  return {
    props: { project },
  };
}
