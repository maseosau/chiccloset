const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: String,
        required: true
    },
    consignee: {
        type: String,
        required: true
    },
    consigneePhone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', Orders);