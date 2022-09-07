const express = require('express');
const router = express.Router()
const Task = require('./models');


router.get('/todos', async(request,response)=>{
    const tasks = await Task.findAll();

    response.status(200).json(tasks);
});

router.post('/todos', async (request,response)=>{
    const {content , description} = request.body;

    const newTask = Task.build({
        'content':content,
        'description':description
    })

    try{
        await newTask.save()

        response.status(201).json(newTask);
    }
    catch(error){
        response.json(error)
    }
});

router.get('/todo/:id', async (request,response)=>{
    const task = await Task.findOne({
        where: {
            id:request.params.id
        }
    });

    response.status(200).json(task)
});

router.patch('/todo/:id',async (request,response)=>{
    const task = await Task.findOne({
        where: {
            id:request.params.id
        }
    });

    const {is_complete} = request.body;

    await task.set(
        {
            is_complete:is_complete
        }
    )

    await task.save();  

    response.status(200).json(task);

});

router.put('/todo/:id', async(request,response)=>{
    const task = await Task.findOne({
        where: {
            id:request.params.id
        }
    });

    const {is_complete,content,description} = request.body;

    await task.set(
        {
            is_complete:is_complete,
            content:content,
            description:description
        }
    )

    await task.save();  

    response.status(200).json(task);
});

router.delete('/todo/:id', async(request,response)=>{
    const task = await Task.findOne({
        where: {
            id:request.params.id
        }
    });

    await task.destroy();

    response.status(204).json({});
});

module.exports = router;