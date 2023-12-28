const userRouter = require('./user');
const productRouter = require('./products');
const checkoutRouter = require('./checkout');
function route(app) {
    app.use('/', userRouter);
    app.use('/', productRouter);
    app.use('/', checkoutRouter);
}

module.exports = route;