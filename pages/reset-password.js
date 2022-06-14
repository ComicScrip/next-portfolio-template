import Layout from '../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation('reset-password');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const sendResetPasswordEmail = (e) => {};

  const resetPassword = (e) => {};

  return (
    <Layout pageTitle={t('resetPassword')}>
      <Toaster position='bottom-center' />
      <div className='m-6'>
        <h1 className='pageTitle text-center'>{t('resetPassword')}</h1>

        <div className='max-w-xl m-auto flex flex-col items-center'>
          {resetEmailSent ? (
            <p>{t('resetEmailSent')}</p>
          ) : (
            <>
              {router.query.resetPasswordToken ? (
                <form
                  onSubmit={resetPassword}
                  className='bg-slate-700 p-12 rounded-2xl shadow-black/30 shadow-lg min-w-[320px]'
                >
                  <label>
                    {t('password')}
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      data-cy='newPassword'
                      id='newPassword'
                      name='newPassword'
                      type='password'
                      required
                      minLength='8'
                      className='block w-full mb-2'
                    />
                  </label>

                  <label>
                    {t('passwordConfirmation')}
                    <input
                      value={newPasswordConfirmation}
                      onChange={(e) =>
                        setNewPasswordConfirmation(e.target.value)
                      }
                      data-cy='newPasswordConfirmation'
                      id='newPasswordConfirmation'
                      name='newPasswordConfirmation'
                      type='password'
                      required
                      minLength='8'
                      className='block w-full mb-2'
                    />
                  </label>

                  <button
                    id='credentials-login-btn'
                    className='bg-amber-500 mt-6 w-full'
                    type='submit'
                    data-cy='resetPasswordBtn'
                  >
                    {t('go')}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={sendResetPasswordEmail}
                  className='bg-slate-700 p-12 rounded-2xl shadow-black/30 shadow-lg min-w-[320px]'
                >
                  <label>
                    {t('email')}
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-cy='email'
                      id='email'
                      name='email'
                      type='email'
                      required
                      className='block w-full mb-2'
                      placeholder='me@something.com'
                    />
                  </label>

                  <button
                    id='credentials-login-btn'
                    className='bg-amber-500 mt-6 w-full'
                    type='submit'
                    data-cy='sendResetLinkBtn'
                  >
                    {t('sendResetLink')}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'reset-password',
      ])),
    },
  };
}
