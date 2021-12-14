import Layout from '@components/Layout';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios
      .post('/api/users', { email, name, password })
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        if (err.response && err.response.status === 409)
          setError('email already taken');
      });
  };

  return (
    <Layout pageTitle='register'>
      <div className='mt-16 flex flex-col justify-center items-center '>
        <h1 className='pageTitle text-center '>Inscription</h1>
        <form
          onSubmit={handleSubmit}
          className='p-6 bg-slate-700/50 mt-6 rounded-xl'
        >
          <label htmlFor='name'>
            Nom
            <input
              className='block mb-6'
              required
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor='email'>
            Email
            <input
              required
              className='block mb-6'
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor='password'>
            Mot de passe
            <input
              className='block mb-6'
              required
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className='w-full' type='submit'>
            Allez hop !
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </Layout>
  );
}
