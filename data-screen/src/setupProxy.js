const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        proxy(
            '/screenJson',
            {
                target: "http://192.168.100.101:8076/api/DataScreen",
                changeOrigin: true,
                pathRewrite: {
                    "/screenJson": ""
                }
            }
        )
    )
}