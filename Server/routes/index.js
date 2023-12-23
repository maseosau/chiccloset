const userRouter = require('./user');
const productRouter = require('./products');
const cartRouter = require('./cart');

function route(app) {
    app.use('/', userRouter);
    app.use('/', productRouter);
    app.use('/', cartRouter);
}

module.exports = route;