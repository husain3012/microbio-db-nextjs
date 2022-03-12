module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8001/:path*' // Proxy to Backend
        }
      ]
    }
  }