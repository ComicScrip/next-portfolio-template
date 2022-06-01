import morgan from 'morgan';

morgan.token('reqbody', (req) => JSON.stringify(req.body, null, 2));

export default morgan(
  ':method :url \nreq.body: :reqbody \n:status - :response-time ms\n'
);
