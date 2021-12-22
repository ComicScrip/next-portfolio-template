module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/login',
        'http://localhost:3000/signup',
        'http://localhost:3000/contact',
        'http://localhost:3000/projects',
        'http://localhost:3000/projects/1',
      ],
      // staticDistDir: '.next/server/pages',
    },
  },
};
