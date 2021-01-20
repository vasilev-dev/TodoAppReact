const express = require('express');
const taskRouter = express.Router();
const { Task } = require('../models');

taskRouter.get('/', async (req, res) => {
   const tasks = await Task.findAll();
   res.send(tasks)
});

taskRouter.post('/', async (req, res) => {
   const { label, done, important } = req.body;
   const task = await Task.create({ label, done, important });
   res.send(task);
});

taskRouter.put('/:taskId/', async (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    const result = await Task.update(updatedTask, {
        where: {
            id: taskId
        }
    });

    if(result[0]) res.sendStatus(200);
    else res.status(404).send('Resource not found!');
});

taskRouter.delete('/:taskId', async (req, res) => {
   const taskId = req.params.taskId;
   const result = await Task.destroy({
       where: {
           id: taskId
       }
   });

   if (result) res.sendStatus(200);
   else res.status(404).send('Resource not found!');
});

module.exports = taskRouter;
