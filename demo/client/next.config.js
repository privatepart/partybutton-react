module.exports = {
  async rewrites() {
    return [
      {
        source: '/privateparty',
        destination: 'http://localhost:4200/privateparty',
      },
      {
        source: '/connect',
        destination: 'http://localhost:4200/connect',
      },
      {
        source: '/disconnect',
        destination: 'http://localhost:4200/disconnect',
      },
      {
        source: '/session',
        destination: 'http://localhost:4200/session',
      },
    ]
  },
}
