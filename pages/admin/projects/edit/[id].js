import AdminLayout from '../../../../components/AdminLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from '../../../../styles/AdminProjectEdition.module.css';
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
      pageTitle={isUpdate ? 'Edit ' : 'Create ' + (title || 'a projet')}
    >
      <h1>{isUpdate ? 'Update a project' : 'Create a projet'}</h1>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          await saveProject();
          router.push('/admin/projects');
        }}
      >
        <div className={styles.field}>
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
        </div>

        {mainPictureUrl && (
          <Image src={mainPictureUrl} alt={title} width={800} height={450} />
        )}
        <div className={styles.field}>
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
        </div>

        <div className={styles.field}>
          <label htmlFor='description'>
            Description :
            <textarea
              required
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <button type='submit'>Save</button>
      </form>
    </AdminLayout>
  );
}
