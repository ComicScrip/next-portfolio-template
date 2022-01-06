import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { CurrentUserContextProvider } from 'contexts/currentUserContext';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CurrentUserContextProvider>
        <Component {...pageProps} />
      </CurrentUserContextProvider>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        theme='dark'
      />
    </SessionProvider>
  );
}
