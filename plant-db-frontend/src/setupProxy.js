const { createProxyMiddleware } = require('http-proxy-middleware');

const target = "https://localhost:7132"

module.exports = function(app) {
  const appProxy = createProxyMiddleware("/api", {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};