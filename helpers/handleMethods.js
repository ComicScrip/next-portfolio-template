export const handleMethods = (methodHandlerMap) => {
  // so that {post: handler} is equivalent to {POST: handler}
  for (const verb in methodHandlerMap) {
    methodHandlerMap[verb.toUpperCase()] = methodHandlerMap[verb];
  }
  return (req, res) => {
    if (typeof methodHandlerMap[req.method] === 'function')
      return methodHandlerMap[req.method](req, res);
    else res.status(405).send('Method not allowed');
  };
};
