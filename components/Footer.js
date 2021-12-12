import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-slate-700 p-6 text-white'>
      <nav className='flex justify-between'>
        <div className='flex'>
          <img
            width={20}
            height={20}
            src='https://upload.wikimedia.org/wikipedia/commons/8/8b/Copyleft.svg'
            alt='copyleft'
            className='mr-4'
            style={{ filter: 'invert(1)' }}
          />
          CopyLeft 2021
        </div>

        <Link href='/admin'>
          <a>Admin</a>
        </Link>
      </nav>
    </footer>
  );
}
