const baseUrl = process.env.HOST || 'http://localhost:3000';
const relativeUrlsToCheck = [
  '/',
  '/login',
  '/signup',
  '/contact',
  '/projects',
  '/projects/1',
];

module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      url: relativeUrlsToCheck.map((path) => baseUrl + path),
      // staticDistDir: '.next/server/pages',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': [
          'warn',
          { minScore: 0.9, aggregationMethod: 'optimistic' },
        ],
        'categories:accessibility': [
          'error',
          { minScore: 0.9, aggregationMethod: 'pessimistic' },
        ],
        'categories:best-practices': [
          'error',
          { minScore: 0.9, aggregationMethod: 'pessimistic' },
        ],
        'categories:seo': [
          'error',
          { minScore: 0.9, aggregationMethod: 'pessimistic' },
        ],
        'categories:pwa': [
          'error',
          { minScore: 1, aggregationMethod: 'pessimistic' },
        ],
      },
    },
  },
};
