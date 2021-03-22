const express = require('express');
const passport = require('passport');

const router = express.Router();

//Model
const Taks = require('../models/task.model');

//@route    GET api/task/test
//@desc     Test task rout
//@access   Public
router.get('/test', (req, res) => {
    res.send('Hello from task route, Test passed!')
})

//@route    GET api/task/
//@desc     get all tasks
//@access   Public
router.get('/', (req, res) => {
    Task.find({}).then(tasks => {
        res.status(200).json(tasks);
    })
})

//@route    GET api/task/:user_id
//@desc     Get task of specific user
//@access   Public
router.get('/:user_id', (req, res) => {
    const userid = req.params.user_id;
    Task.find({ userid }).populate('userid', ['username']).then(tasks => {
        if (!tasks) {
            res.status(404).json({ message: 'Tasks Not Found!' })
        } else {
            res.status(200).json(tasks)
        }
    })
})

//@route    POST api/task/
//@desc     create task
//@access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newTask = {
        userid: req.user.id,
        taskname: req.body.taskname,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description
    }

    Task.create(newTask).then(task => {
        res.json(task)
    })
})

//@route    Put api/task/:task_id
//@desc     Edit task
//@access   Private
router.put('/:task_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const taskId = req.params.task_id;
    const taskDetails = {
        userid: req.user.id,
        taskname: req.body.taskname,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description
    }

    Task.findOne({ _id: taskId }).then(task => {
        if (task.userid == req.user.id) {
            Task.findOneAndUpdate(
                { _id: taskId },
                { $set: taskDetails },
                { new: true }
            ).then(task => res.status(200).json(task))
        } else {
            return res.status(301).json({ unAuthorized: 'You are Not aalowed to edit!' })
        }
    })
})

//@route    DELETE api/task/:task_id
//@desc     DELETE task
//@access   Private
router.delete('/:task_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const taskId = req.params.task_id;
    Task.findOne({ _id: taskId }).then(task => {
        if (task.userid == req.user.id) {
            Task.deleteOne({ _id: taskId }).then(() => {
                res.json({ success: 'Task deleted!' })
            })
        } else {
            return res.status(301).json({ unAuthorized: 'You are Not aalowed to delete!' })
        }
    })
})

module.exports = router;