import Image from 'next/image';
import Layout from '../../components/Layout';
import { getOneProject, getProjects } from '../../models/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Project({
  project: { title, mainPictureUrl, description },
}) {
  return (
    <Layout pageTitle={title}>
      <div className='max-w-4xl m-auto mt-4'>
        <h1 className='pageTitle lg:ml-0'>{title}</h1>
        <div className=''></div>
        <Image
          src={mainPictureUrl}
          alt={title}
          width={600 * (16 / 9)}
          height={600}
        />
        <p className='md:columns-2 m-6 lg:ml-0 gap-12 '>{description}</p>
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

export async function getStaticProps({ locale, params: { id } }) {
  const project = await getOneProject(id);
  return {
    props: { project, ...(await serverSideTranslations(locale, ['common'])) },
    revalidate: 10,
  };
}
