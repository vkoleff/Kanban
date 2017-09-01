const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    title: {type: 'string', require: 'true'},
    status: {type: 'string', require: 'true'}
});

let Task = mongoose.model('Task', taskSchema, 'allTasks');

module.exports = Task;