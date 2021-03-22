const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    taskname: {
        type: String,
        require: true
    },
    start: {
        type: String,
        require: true
    },
    end: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Task = mongoose.model('tasks', taskSchema);