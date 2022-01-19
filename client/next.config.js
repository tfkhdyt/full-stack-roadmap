module.exports = {
  redirects: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      },
    ]
  },
}
