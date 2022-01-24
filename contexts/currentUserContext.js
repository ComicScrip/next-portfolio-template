import { signOut, useSession } from 'next-auth/react';
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import axios from 'axios';
const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const { status } = useSession();
  const currentUserIsAdmin = useMemo(
    () => currentUserProfile?.role === 'admin',
    [currentUserProfile]
  );

  const updateProfileOnAPI = useCallback((payload, onSuccess) => {
    axios.patch('/api/profile', payload).then(({ data: profile }) => {
      setCurrentUserProfile(profile);
      onSuccess(profile);
    });
  }, []);

  const getProfile = useCallback(() => {
    axios
      .get('/api/profile')
      .then(({ data }) => {
        setCurrentUserProfile(data);
      })
      .catch(() => {
        // when we have a stale cookie, disconnect
        signOut();
      });
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      getProfile();
    } else if (status === 'unauthenticated') {
      setCurrentUserProfile(null);
    }
  }, [status, getProfile]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserProfile,
        setCurrentUserProfile,
        updateProfileOnAPI,
        getProfile,
        currentUserIsAdmin,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
