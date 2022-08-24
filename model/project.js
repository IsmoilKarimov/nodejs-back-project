const {Schema,model, Types} = require('mongoose')

const project = new Schema({
    title: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    cleint: {
        type:Schema.Types.ObjectId,
        ref: 'Client'
    },
    price: Number,
    team: {
        type:Schema.Types.ObjectId,
        ref:'Team'
    },
    priority: {
        type: Number,
        default: 0
    },
    from: Date,
    to:Date,
    description:String,
    attachment:String,
    status: {
        type: Number,
        default:0
    }
})

module.exports = model('Project',project)