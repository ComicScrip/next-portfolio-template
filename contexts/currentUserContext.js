import { signOut, useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const { status } = useSession();
  const currentUserIsAdmin = currentUserProfile?.role === 'admin';

  const updateProfileOnAPI = (data) => {
    axios.patch('/api/profile', data).then(({ data }) => {
      setCurrentUserProfile(data);
      toast.success('Votre profil a bien été enregistré');
    });
  };

  const getProfile = () => {
    axios
      .get('/api/profile')
      .then(({ data }) => {
        setCurrentUserProfile(data);
      })
      .catch(() => {
        // when we have a stale cookie, disconnect
        signOut();
      });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getProfile();
    } else if (status === 'unauthenticated') {
      setCurrentUserProfile(null);
    }
  }, [status]);

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
