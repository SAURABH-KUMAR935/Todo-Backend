const express = require('express');
const router = express.Router();
const todosController = require('../Controllers/todosController');


router.get('/', todosController.getTodos);
router.post('/', todosController.postTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;