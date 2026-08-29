const Todo = require('../models/todosModel');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch todos' });
    }
};

exports.postTodo = async (req, res) => {
    try {
        const { task } = req.body;

        if (!task || task.trim() === '') {
            return res.status(400).json({ message: 'Task is required' });
        }

        if (task.length > 500) {
            return res.status(400).json({ message: 'Task must be less than 500 characters' });
        }

        const todo = new Todo({ task: task.trim() });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create todo' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;

        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        if (!task || task.trim() === '') {
            return res.status(400).json({ message: 'Task is required' });
        }

        if (task.length > 500) {
            return res.status(400).json({ message: 'Task must be less than 500 characters' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task: task.trim() },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
};
