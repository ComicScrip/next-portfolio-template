import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { CurrentUserContextProvider } from 'contexts/currentUserContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CurrentUserContextProvider>
        <Component {...pageProps} />
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}
