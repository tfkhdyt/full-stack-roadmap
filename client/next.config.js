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
}
