import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import axios from 'axios';
import Layout from '../components/Layout';

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
      <div className='max-w-4xl m-auto'>
        <h1 className='pageTitle'>Me contacter</h1>

        <form
          onSubmit={handleSubmit}
          className='m-6 bg-slate-200 rounded-3xl p-8 text-slate-800'
        >
          <div>
            <label htmlFor='email'>
              Email
              <input
                className='w-full'
                required
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='me@website.com'
              />
            </label>
          </div>

          <div className='mt-6'>
            <label htmlFor='message'>
              Message
              <textarea
                className='w-full'
                placeholder='Write something...'
                required
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>
          <div className='mt-6'>
            <HCaptcha
              styles={{}}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
              onVerify={(token) => {
                setHcaptchaToken(token);
              }}
            />
          </div>

          <button className='mt-6 w-full pt-4 pb-4'>{"C'est parti !"}</button>
        </form>
      </div>
    </Layout>
  );
}
