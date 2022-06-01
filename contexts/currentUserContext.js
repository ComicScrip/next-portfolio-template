import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const { status } = useSession();

  const currentUserIsAdmin = currentUserProfile?.role === 'admin';

  useEffect(() => {
    if (status === 'authenticated') {
      axios
        .get('/api/profile')
        .then(({ data }) => {
          setCurrentUserProfile(data);
        })
        .catch(() => {});
    } else if (status === 'unauthenticated') {
      setCurrentUserProfile(null);
    }
  }, [status]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUserProfile, setCurrentUserProfile, currentUserIsAdmin }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
