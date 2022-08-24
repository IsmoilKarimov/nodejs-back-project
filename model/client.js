const {Schema,model} = require('mongoose')

const client = new Schema({
    name: String,
    phone: Number,
    email: String,
    avatar: String,
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }, 
    status: {
        type: Number,
        default: 0
    }
})
module.exports = model('Client',client)