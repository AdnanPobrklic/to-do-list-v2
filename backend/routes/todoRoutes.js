const { Router } = require("express");
const router = Router();
const todoControllers = require("../controllers/todoControllers");

router.get("/todos/all/:userId", todoControllers.getAllTodos);
router.post("/save-todo", todoControllers.postSaveTodo);
router.patch(
    "/todo-completion/:identificator",
    todoControllers.patchTodoCompletion
);
router.patch("/todo-fav/:identificator", todoControllers.patchTodoFav);
router.patch("/edit-todo/:identificator", todoControllers.patchTodoContent);
router.delete("/todo-deletion/:identificator", todoControllers.deleteTodo);

module.exports = router;
