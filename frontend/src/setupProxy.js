const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/signin',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
  app.use(
    '/cards',
    createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true
    })
  )
};