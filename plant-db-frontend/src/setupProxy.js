const { createProxyMiddleware } = require('http-proxy-middleware');

const target = "https://localhost:7132"

const context =  [
  "/api/ferns",
  "/api/cacti"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};