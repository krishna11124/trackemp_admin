const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://89.116.33.23:8080',
      changeOrigin: true,
      secure: false,
      headers: {
        'X-Custom-Header': 'yes',
      },
    })
  );
};