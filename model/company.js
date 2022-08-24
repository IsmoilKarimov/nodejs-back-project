const {Schema,model} = require('mongoose')

const company = new Schema({
    name: String,
    country: String,
    address: String,
    phone: Number,
    email: String,
    website: String,
    logo: String,
    status: {
        type: Number,
        default: 0
    }
})
module.exports = model('Company',company)   