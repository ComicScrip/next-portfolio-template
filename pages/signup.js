import Layout from '@components/Layout';
import axios from 'axios';
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios
      .post('/api/users', { email, name, password })
      .then(() => {
        alert('ok');
      })
      .catch((err) => {
        if (err.response && err.response.status === 409)
          setError('email already taken');
      });
  };

  return (
    <Layout pageTitle='register'>
      <h1>Signup</h1>
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
