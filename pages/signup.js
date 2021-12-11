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
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Nom
          <input
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
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          Mot de passe
          <input
            required
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
      </form>
    </Layout>
  );
}
