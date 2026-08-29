const express = require('express');
const router = express.Router();
const todosController = require('../Controllers/todosController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all todo routes
router.use(authMiddleware);

router.get('/', todosController.getTodos);
router.post('/', todosController.postTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;