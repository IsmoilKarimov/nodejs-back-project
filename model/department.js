const {Schema,model} = require('mongoose')

const department = new Schema({
    title: String,
    status: {
        type: Number,
        default: 0
    }
})
module.exports = model('Department',department)