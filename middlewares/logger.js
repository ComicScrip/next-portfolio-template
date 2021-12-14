import morgan from 'morgan';

morgan.token('reqbody', (req) => JSON.stringify(req.body, null, 2));

const logger = morgan(
  ':method :url \nreq.body: :reqbody \n:status - :response-time ms\n'
);

export default logger;
