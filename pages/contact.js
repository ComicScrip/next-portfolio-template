import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import axios from 'axios';
import Layout from '../components/Layout';
import styles from '../styles/ContactPage.module.css';

export default function Projects() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/contactRequests', { email, message, hcaptchaToken })
      .then(() => {
        alert('Merci, je vous recontacterai au plus vite');
        setMessage('');
        setEmail('');
      });
  };

  return (
    <Layout pageTitle='Contact'>
      <h1 className={styles.title}>Me contacter</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor='email'>
            Email :{' '}
            <input
              required
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.field}>
          <label htmlFor='message'>
            Message
            <textarea
              required
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>

        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={(token) => {
            setHcaptchaToken(token);
          }}
        />

        <button>Envoyer</button>
      </form>
    </Layout>
  );
}
