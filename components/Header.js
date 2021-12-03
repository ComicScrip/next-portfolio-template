import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header>
      <nav className={styles.menu}>
        <Link href='/'>
          <a>Accueil</a>
        </Link>
        <Link href='/projects'>
          <a>Projets</a>
        </Link>
        <Link href='/contact'>
          <a>Contact</a>
        </Link>
      </nav>
    </header>
  );
}
