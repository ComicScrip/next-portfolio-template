import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <nav>
        <Link href='/admin'>
          <a>Admin</a>
        </Link>
      </nav>
    </footer>
  );
}
