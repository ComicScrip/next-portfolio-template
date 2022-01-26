import Layout from '../../components/Layout';
import ProjectCard from '../../components/ProjectCard';
import { getProjects, getTranslation } from '../../models/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Projects({ projects }) {
  const { t } = useTranslation('projects');

  return (
    <Layout pageTitle={t('achievements')}>
      <h1 className='pageTitle'>{t('achievements')}</h1>
      <div className='flex flex-wrap pt-8 pb-8'>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const projects = (await getProjects()).map((p) => getTranslation(p, locale));
  return {
    props: {
      projects,
      ...(await serverSideTranslations(locale, ['common', 'projects'])),
    },
    revalidate: 10,
  };
}
