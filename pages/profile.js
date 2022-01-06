import Avatar from '../components/Avatar';
import Layout from '../components/Layout';
import CurrentUserContext from '../contexts/currentUserContext';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useRef, useState } from 'react';

export default function ProfilePage() {
  const { status } = useSession();
  const { currentUserProfile, updateProfileOnAPI } =
    useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');

  const avatarUploadRef = useRef();

  useEffect(() => {
    if (currentUserProfile) {
      setName(currentUserProfile.name);
      setEmail(currentUserProfile.email);
      setImage(currentUserProfile.image);
    }
  }, [currentUserProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('image', avatarUploadRef.current.files[0]);
    updateProfileOnAPI(data);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  const handleAvatarFileInputChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Layout pageTitle='Profil'>
      <div className='mt-8 flex flex-col justify-center items-center '>
        <h1 className='pageTitle text-center '>Mon profil</h1>

        <div
          className='cursor-pointer p-[1px] bg-white hover:bg-slate-300 w-[128px] h-[128px] flex justify-center items-center rounded-full'
          onClick={handleAvatarClick}
        >
          <Avatar size={120} src={image} />
        </div>

        <form
          onSubmit={handleSubmit}
          className='p-6 bg-slate-700/50 mt-6 rounded-xl w-[300px]'
        >
          <input
            type='file'
            id='avatar'
            accept='image/png, image/jpeg, image/gif'
            ref={avatarUploadRef}
            onChange={handleAvatarFileInputChange}
            style={{ display: 'none' }}
          />
          <label htmlFor='email'>
            Email
            <input
              required
              disabled
              className='block mb-6 opacity-70 w-full'
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor='name'>
            Nom
            <input
              className='block mb-10 w-full'
              required
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button className='w-full' type='submit'>
            Enregistrer
          </button>
        </form>
      </div>
    </Layout>
  );
}
