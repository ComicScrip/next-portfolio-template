import { useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import Avatar from './Avatar';
import 'reactjs-popup/dist/index.css';
import CurrentUserMenu from './CurrentUserMenu';

export default function Header() {
  const { data } = useSession();
  const currentUser = data?.user;
  console.log(data);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-slate-800 p-6'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <span className='font-semibold text-xl '>DaveLopper.pro</span>
        </div>
        <div className='flex md:order-3'>
          <div className='mr-6 md:mr-0'>
            {currentUser ? (
              <CurrentUserMenu currentUser={currentUser} />
            ) : (
              <Link href='/login'>
                <a className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-slate-800 hover:bg-white'>
                  Se connecter
                </a>
              </Link>
            )}
          </div>

          <div className='block md:hidden'>
            <button
              className='flex items-center px-3 py-2 border rounded text-sky-200 border-slate-600 hover:text-white hover:border-white'
              onClick={toggleMenu}
            >
              <svg
                className='fill-current h-3 w-3'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`w-full block flex-grow md:flex md:items-center md:w-auto md:h-[35px] ${
            menuOpen ? 'h-[110px]' : 'h-0'
          } overflow-hidden transition-all`}
        >
          <div className='text-sm md:flex-grow'>
            <NavLink href='/'>Accueil</NavLink>
            <NavLink href='/projects'>Projets</NavLink>
            <NavLink href='/contact'>Contact</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

const NavLink = ({ href, children }) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link href={href}>
      <a
        className={`block mt-4 md:inline-block md:mt-0 ${
          active ? 'text-white' : 'text-sky-200'
        } hover:text-white mr-4`}
      >
        {children}
      </a>
    </Link>
  );
};
