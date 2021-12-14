import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const { status } = useSession();

  const updateProfileOnAPI = (data) => {
    axios.patch('/api/profile', data).then(({ data }) => {
      setCurrentUserProfile(data);
      alert('ok');
    });
  };

  const getProfile = () => {
    axios
      .get('/api/profile')
      .then(({ data }) => {
        setCurrentUserProfile(data);
      })
      .catch(() => {});
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
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
