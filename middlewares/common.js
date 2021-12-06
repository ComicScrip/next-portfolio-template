import nc from 'next-connect';
import morgan from 'morgan';

export default function base() {
  return nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end('Something broke!');
    },
    onNoMatch: (req, res, next) => {
      res.status(404).end('Not found');
    },
  }).use(morgan('combined'));
}
