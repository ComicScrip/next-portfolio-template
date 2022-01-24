import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import axios from 'axios';
import Layout from '../components/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';

export default function ContactPage() {
  const [missingHcaptchaError, setMissingHcaptchaError] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState(null);
  const { t } = useTranslation('contact');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hcaptchaToken)
      return setMissingHcaptchaError(
        'Merci de complétrer la vérification hCaptcha ci-dessus'
      );
    axios
      .post('/api/contactRequests', { email, message, hcaptchaToken })
      .then(() => {
        toast.success(t('thanksIllGetBackToYou'));
        setMessage('');
        setEmail('');
      });
  };

  return (
    <Layout pageTitle='Contact'>
      <div className='max-w-4xl m-auto'>
        <h1 className='pageTitle'>{t('contactMe')}</h1>

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
                placeholder={t('writeSomething')}
                required
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>
          <div className='mt-6 flex flex-col sm:flex-row'>
            <div className='mb-3'>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                onVerify={(token) => {
                  setMissingHcaptchaError('');
                  setHcaptchaToken(token);
                }}
                size='compact'
                id='contact-captcha'
                languageOverride={router.locale}
              />
              {missingHcaptchaError && (
                <div className='text-red-400 mb-3'>{missingHcaptchaError}</div>
              )}
            </div>

            <button className='w-full pt-4 pb-4 h-[80px] sm:h-[133px] m-1'>
              {t('letsgo')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  };
}
