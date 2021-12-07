import Layout from '@components/Layout';
import axios from 'axios';
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', { email, name, password }).then(() => {
      alert('ok');
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
      </form>
    </Layout>
  );
}
