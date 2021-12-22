const baseUrl = process.env.HOST || 'http://localhost:3000';
const relativeUrlsToCheck = [
  '/',
  '/login',
  //'/signup',
  //'contact',
  //'/projects',
  //'projects/1',
];

module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      url: relativeUrlsToCheck.map((path) => baseUrl + path),
      // staticDistDir: '.next/server/pages',
    },
    assertions: {
      'categories:performance': ['warn', { minScore: 1 }],
      'categories:accessibility': ['error', { minScore: 0.95 }],
      'categories:best-practices': ['error', { minScore: 0.95 }],
      'categories:seo': ['error', { minScore: 0.95 }],
      'categories:pwa': ['error', { minScore: 1 }],
    },
  },
};
