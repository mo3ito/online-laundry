const mongoose = require("mongoose")
const {Schema} = mongoose;


const OrderSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    type_of_clothing: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    }
});



const CustomersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    orders:{
        type: [OrderSchema],
        default: []

    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Customers = mongoose.model("customers", CustomersSchema);

module.exports = Customers;