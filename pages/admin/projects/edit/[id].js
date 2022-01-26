import AdminLayout from '../../../../components/AdminLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Widget } from '@uploadcare/react-widget';
import Image from 'next/image';

export default function CreateProject() {
  const [error, setError] = useState('');
  const [titleFR, setTitleFR] = useState('');
  const [titleEN, setTitleEN] = useState('');
  const [mainPictureUrl, setMainPictureUrl] = useState('');
  const [descriptionFR, setDescriptionFR] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');
  const [lang, setLang] = useState('FR');
  const [mainPictureUrlError, setMainPictureUrlError] = useState('');
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const isUpdate = id !== 'new';

  const saveProject = async () => {
    const formValues = {
      titleFR,
      titleEN,
      mainPictureUrl,
      descriptionEN,
      descriptionFR,
    };
    if (!mainPictureUrl)
      return setMainPictureUrlError('Please choose an image');
    try {
      if (isUpdate) {
        await axios.patch(`/api/projects/${id}`, formValues);
      } else {
        await axios.post('/api/projects', formValues);
      }
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && isUpdate) {
      axios
        .get(`/api/projects/${id}`)
        .then(
          ({
            data: {
              titleFR,
              titleEN,
              descriptionFR,
              descriptionEN,
              mainPictureUrl,
            },
          }) => {
            setTitleFR(titleFR);
            setTitleEN(titleEN);
            setDescriptionFR(descriptionFR);
            setDescriptionEN(descriptionEN);
            setMainPictureUrl(mainPictureUrl);
          }
        )
        .catch(() => setError('could not retrive projects from the API'));
    }
  }, [isUpdate, id]);

  const title = lang === 'FR' ? titleFR : titleEN;
  const setTitle = lang === 'FR' ? setTitleFR : setTitleEN;
  const description = lang === 'FR' ? descriptionFR : descriptionEN;
  const setDescription = lang === 'FR' ? setDescriptionFR : setDescriptionEN;

  return (
    <AdminLayout
      pageTitle={(isUpdate ? 'Edit ' : 'Create ') + (title || 'a projet')}
    >
      <h1 className='text-4xl font-bold mb-6'>
        {isUpdate ? 'Update a project' : 'Create a projet'}
      </h1>
      {error && <div className='text-red-500'>{error}</div>}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await saveProject();
        }}
      >
        <label htmlFor='mainPictureUrl' className='block mb-3'>
          Main picture :{' '}
          <Widget
            publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_KEY}
            id='file'
            tabs='file url'
            crop='16:9'
            required
            value={mainPictureUrl}
            onChange={({ cdnUrl }) => {
              setMainPictureUrlError('');
              setMainPictureUrl(cdnUrl);
            }}
          />
          {mainPictureUrlError && (
            <div className='text-red-500'>{mainPictureUrlError}</div>
          )}
        </label>

        {mainPictureUrl && (
          <div className='mt-5'>
            <Image src={mainPictureUrl} alt={title} width={800} height={450} />
          </div>
        )}

        <label htmlFor='lang' className='block mb-3'>
          Lang :{' '}
          <select
            className='mt-5'
            required
            id='lang'
            type='text'
            data-cy='project-lang-input'
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value='FR'>FR</option>
            <option value='EN'>EN</option>
          </select>
        </label>

        <label htmlFor='title' className='block mb-3'>
          Title :{' '}
          <input
            required
            id='title'
            type='text'
            data-cy='project-title-input'
            value={lang === 'FR' ? titleFR : titleEN}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </label>

        <label htmlFor='description' className='block'>
          Description :
          <textarea
            required
            className='block mb-6 w-[400px]'
            id='description'
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
        </label>

        <button type='submit'>Save</button>
      </form>
    </AdminLayout>
  );
}
