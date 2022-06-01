import nc from 'next-connect';
import logger from './logger';

export default function base() {
  return nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end('Sorry, an error occurred, please try again later');
    },
    onNoMatch: (req, res, next) => {
      res.status(404).end('Not found');
    },
  }).use(logger);
}
