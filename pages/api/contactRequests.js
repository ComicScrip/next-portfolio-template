import base from '@middlewares/common';

async function handlePost(req, res) {
  console.log(req.body);
  res.status(201).send(req.body);
}

export default base().post(handlePost);
