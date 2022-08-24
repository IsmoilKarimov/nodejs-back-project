const {Schema,model} = require('mongoose')

const team = new Schema({
    name: String,
    status: {
        type: Number,
        default: 0
    }
})
module.exports = model('Team',team)