import Link from 'next/link';
import styles from '../styles/Header.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data, status } = useSession();

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
        {status === 'unauthenticated' && (
          <button onClick={() => signIn()}>Se connecter</button>
        )}
        {status === 'authenticated' && (
          <button onClick={() => signOut()}>Se déconnecter</button>
        )}
      </nav>
    </header>
  );
}
