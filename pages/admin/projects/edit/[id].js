import AdminLayout from '../../../../components/AdminLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Widget } from '@uploadcare/react-widget';
import Image from 'next/image';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [mainPictureUrl, setMainPictureUrl] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const isUpdate = id !== 'new';

  const saveProject = async () => {
    const formValues = { title, mainPictureUrl, description };
    try {
      if (isUpdate) {
        await axios.patch(`/api/projects/${id}`, formValues);
      } else {
        await axios.post('/api/projects', formValues);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && isUpdate) {
      axios
        .get(`/api/projects/${id}`)
        .then(({ data: { title, description, mainPictureUrl } }) => {
          setTitle(title);
          setDescription(description);
          setMainPictureUrl(mainPictureUrl);
        });
    }
  }, [isUpdate, id]);

  return (
    <AdminLayout
      pageTitle={(isUpdate ? 'Edit ' : 'Create ') + (title || 'a projet')}
    >
      <h1 className='text-4xl font-bold mb-6'>
        {isUpdate ? 'Update a project' : 'Create a projet'}
      </h1>
      <form
        className=''
        onSubmit={async (e) => {
          e.preventDefault();
          await saveProject();
          router.push('/admin/projects');
        }}
      >
        <label htmlFor='mainPictureUrl'>
          Main picture :{' '}
          <Widget
            publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_KEY}
            id='file'
            tabs='file url'
            crop='16:9'
            value={mainPictureUrl}
            onChange={({ cdnUrl }) => setMainPictureUrl(cdnUrl)}
          />
        </label>

        {mainPictureUrl && (
          <div className='mt-5'>
            <Image src={mainPictureUrl} alt={title} width={800} height={450} />
          </div>
        )}
        <label htmlFor='title'>
          Title :{' '}
          <input
            required
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor='description' className='block'>
          Description :
          <textarea
            required
            className='block mb-6 w-[400px]'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type='submit'>Save</button>
      </form>
    </AdminLayout>
  );
}
