const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/ws",
    createProxyMiddleware({ target: "http://i9a209.p.ssafy.io", ws: true })
  );
};
