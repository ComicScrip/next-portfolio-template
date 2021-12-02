import AdminLayout from '../../../components/AdminLayout';
import axios from 'axios';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [mainPictureUrl, setMainPictureUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, message });
    axios
      .post('/api/projects', { title, mainPictureUrl, description })
      .then(() => {
        alert('ok');
      });
  };

  return (
    <AdminLayout pageTitle='Create a new project'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title :
          <input
            required
            id='title'
            type='text'
            value={title}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='message'>
          Message :
          <textarea
            required
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button>Envoyer</button>
      </form>
    </AdminLayout>
  );
}
