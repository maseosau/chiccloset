const userRouter = require('./user');
const productRouter = require('./products');
const checkoutRouter = require('./checkout');
const cartRouter = require('./cart');

function route(app) {
    app.use('/', userRouter);
    app.use('/', productRouter);
    app.use('/', checkoutRouter);
    app.use('/', cartRouter);
}

module.exports = route;