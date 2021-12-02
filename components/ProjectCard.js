import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ProjectCard.module.css';

export default function ProjectCard({
  project: { title, mainPictureUrl, id },
}) {
  return (
    <Link href={`/projects/${id}`}>
      <a>
        <div className={styles.projectCard}>
          <h2>{title}</h2>
          <Image src={mainPictureUrl} width={300} height={180} alt={title} />
        </div>
      </a>
    </Link>
  );
}
