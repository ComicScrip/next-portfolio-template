const handleNewContactRequest = (req, res) => {
  console.log(req.body);
  res.status(201).send(req.body);
};

export default function handler(req, res) {
  if (req.method === 'POST') handleNewContactRequest(req, res);
  else res.status(405).send('Method not allowed');
}
