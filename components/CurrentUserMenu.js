import CurrentUserContext from 'contexts/currentUserContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { useOutsideClick } from 'rooks';
import Avatar from './Avatar';

export default function CurrentUserMenu() {
  const { currentUserProfile, currentUserIsAdmin } =
    useContext(CurrentUserContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setUserMenuOpen((open) => !open);
  const ref = useRef();
  useOutsideClick(ref, () => setUserMenuOpen(false));

  if (!currentUserProfile) return null;

  const visibleLinks = currentUserIsAdmin
    ? [
        {
          label: 'Back-office',
          href: '/admin',
        },
        {
          label: 'Profil',
          href: '/profile',
        },
      ]
    : [
        {
          label: 'Profil',
          href: '/profile',
        },
      ];

  return (
    <div ref={ref}>
      <div onClick={toggleUserMenu} className='cursor-pointer'>
        <Avatar src={currentUserProfile.image} alt={currentUserProfile.name} />
      </div>
      <div
        style={{
          maxHeight: userMenuOpen ? 100 + visibleLinks.length * 100 : 0,
        }}
        className='transition-[max-height] overflow-hidden absolute z-10 right-[90px] md:right-[50px] mt-2 rounded bg-slate-700 text-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
      >
        {visibleLinks.map(({ href, label }) => (
          <Link key={href} href={href}>
            <a className='block p-[12px] text-sm text-center border-b-slate-600 border-b-[1px] cursor-pointer hover:bg-slate-600'>
              {label}
            </a>
          </Link>
        ))}

        <button
          onClick={() => signOut()}
          className='p-4 m-4 block text-sm px-4 py-2 leading-none border rounded text-white border-slate-500 hover:border-transparent hover:text-white hover:bg-slate-400 bg-slate-500'
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
