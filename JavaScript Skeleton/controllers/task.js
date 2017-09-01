const Task = require('../models/Task');

module.exports = {
	index: (req, res) => {
		/*let tasksPromises = [
			Task.find({status: "Open"}),
			Task.find({status: "In Progress"}),
			Task.find({status: "Finished"})];
		Promise.all(tasksPromises).then(taskResult => {
			res.render('task/index',{
				'openTasks': taskResult[0],
				'inProgressTasks': taskResult[1],
				'finishedTasks': taskResult[2]
			});
		});*/

		Task.find().then(tasks => {
			res.render('task/index', {
				'openTasks': tasks.filter(t => t.status === "Open"),
				'inProgressTasks': tasks.filter(t => t.status === "In Progress"),
				'finishedTasks': tasks.filter(t => t.status === "Finished"),
			})
		})
	},
	createGet: (req, res) => {
        res.render('task/create');
	},
	createPost: (req, res) => {
        let taskArgs = req.body;
        if (!taskArgs.title || !taskArgs.status){
            res.redirect('/');
            return;
        }

        Task.create(taskArgs).then(taskArgs => {
            res.redirect('/');
        })
	},
	editGet: (req, res) => {
        let id = req.params.id;

        Task.findById(id).then(task => {
            if (!task) {
                res.redirect('/');
                return;
            }
            res.render('task/edit', task)
        }).catch(err => res.redirect('/'));
	},
	editPost: (req, res) => {
        let id = req.params.id;
        let task = req.body;

        Task.findByIdAndUpdate(id, task, {runValidators: true}).then(task => {
            res.redirect('/');
        }).catch(err => {
        	task.id = id;
        	task.error = 'Cannot edit task.';
        	return res.render('task/edit', task);
		});
	}
};