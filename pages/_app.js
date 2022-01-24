import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { CurrentUserContextProvider } from '../contexts/currentUserContext';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';

const TranslatedContent = appWithTranslation(function Content({
  Component,
  pageProps,
}) {
  return (
    <>
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
    </>
  );
});

export default function App(props) {
  return (
    <SessionProvider session={props.pageProps.session}>
      <TranslatedContent {...props} />
    </SessionProvider>
  );
}
