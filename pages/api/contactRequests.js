import base from '@middlewares/common';

const protectPost = (req, res, next) => {
  console.log('protect popssssts');
  next();
};

const handleNewContactRequest = (req, res) => {
  console.log(req.body);
  res.status(201).send(req.body);
};

const handleGetContactRequest = (req, res) => {
  res.send([]);
};

export default base()
  .post(protectPost, handleNewContactRequest)
  .get(handleGetContactRequest);
