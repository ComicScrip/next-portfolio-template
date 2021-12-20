import Layout from '@components/Layout';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

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
        alert(
          `Votre inscription est presque terminée, merci de bien vouloir confirmer votre addresse e-mail en cliquant sur le lien d'activation envoyé à ${email}.`
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 409)
          setError(
            "Email déjà pris. S'il s'agit du vôtre, vérifiez votre boite de réception et rendez-vous sur le lien d'activation envoyé."
          );
      });
  };

  return (
    <Layout pageTitle='register'>
      <div className='mt-16 flex flex-col justify-center items-center'>
        <h1 className='pageTitle text-center '>Inscription</h1>
        <form
          onSubmit={handleSubmit}
          className='p-6 bg-slate-700/50 mt-6 rounded-xl w-96'
        >
          <label htmlFor='name'>
            Nom
            <input
              className='block mb-6 w-full'
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
              className='block mb-6 w-full'
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor='password'>
            Mot de passe
            <input
              className='block mb-6 w-full'
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
          {error && <p className='pt-6'>{error}</p>}
        </form>
        <Link href='/login'>
          <a className='mt-6 text-sky-300 hover:text-sky-400'>
            Vous avez déjà un compte ?
          </a>
        </Link>
      </div>
    </Layout>
  );
}
