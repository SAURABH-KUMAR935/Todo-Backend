const Todo = require('../models/todosModel');

exports.getTodos = async (req, res) => {
    try {
        // Only fetch todos for the authenticated user
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
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

        // Create todo with authenticated user's ID
        const todo = new Todo({ 
            task: task.trim(),
            user: req.user.id 
        });
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

        // Only allow deletion of user's own todos
        const deletedTodo = await Todo.findOneAndDelete({ 
            _id: id, 
            user: req.user.id 
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
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

        // Only allow updating of user's own todos
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { task: task.trim() },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
};
