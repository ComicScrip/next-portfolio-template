import { useState } from 'react';
import Avatar from './Avatar';

export default function CurrentUserMenu({ currentUser }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setUserMenuOpen((open) => !open);

  const visibleLinks =
    currentUser?.role === 'admin'
      ? [
          {
            label: 'Profile',
            href: '/profile',
          },
          {
            label: 'Se déconnecter',
            href: '/signout',
          },
        ]
      : [
          {
            label: 'Profile',
            href: '/profile',
          },
          {
            label: 'Se déconnecter',
            href: '/signout',
          },
        ];

  return (
    <>
      <div onClick={toggleUserMenu} className='cursor-pointer'>
        <Avatar src={currentUser.image} alt={currentUser.name} />
      </div>
      <div
        style={{ height: userMenuOpen ? 100 + visibleLinks.length * 30 : 0 }}
        className='transition-all overflow-hidden absolute z-10 right-8  mt-1 shadow-slate-900  rounded'
      >
        <div
          className='w-0 h-0 
    border-l-[70px] md:border-l-[170px] border-l-transparent border-r-[70px] md:border-r-[10px] border-r-transparent border-b-[19px] border-b-slate-700'
        />
        <div className='pb-4 bg-slate-700 text-white shadow'>
          {visibleLinks.map(({ href, label }) => (
            <p
              key={href}
              className='pt-2 pb-2 text-center border-b-slate-600 border-b-[1px] mb-3 '
            >
              {label}
            </p>
          ))}

          <p className='text-center'>content2</p>
        </div>
      </div>
    </>
  );
}
