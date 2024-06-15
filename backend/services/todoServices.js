const Todo = require("../models/Todo");
const { handleRecurringTask } = require("../utils");

const findTodo = async (identificator, userId) => {
    return await Todo.findOne({ identificator, userId });
};

const saveTodo = async (todoData) => {
    const { content, identificator, done, category, recurring, userId } =
        todoData;
    if (!content || !identificator || !userId) {
        throw new Error("Content, identificator and userId must be provided");
    }

    const newTodo = new Todo({
        content,
        identificator,
        done,
        userId,
        category: category || "todo",
        recurring,
    });
    await newTodo.save();
    return { message: "Todo saved" };
};

const getAllTodos = async (userId) => {
    return await Todo.find({ userId });
};

const updateTodoCompletion = async (identificator, userId) => {
    const todo = await findTodoOrFail(identificator, userId);
    todo.done = !todo.done;
    await todo.save();

    if (todo.recurring && todo.done) {
        await handleRecurringTask(todo);
    }
};

const updateTodoFav = async (identificator, userId) => {
    const todo = await findTodoOrFail(identificator, userId);
    todo.favourited = !todo.favourited;
    await todo.save();
};

const updateTodoContent = async (identificator, content, userId) => {
    if (!content || content.length > 100) {
        throw new Error("Todo content must be between 0 and 100 chars");
    }

    const todo = await findTodoOrFail(identificator, userId);
    todo.content = content;
    await todo.save();
    return { message: "Todo content updated" };
};

const deleteTodo = async (identificator, userId) => {
    const todo = await findTodoOrFail(identificator, userId);
    await todo.deleteOne();
};

const findTodoOrFail = async (identificator, userId) => {
    const todo = await findTodo(identificator, userId);
    if (!todo) {
        throw new Error("Todo not found");
    }

    if (todo.userId !== userId) {
        throw new Error("Forbidden");
    }

    return todo;
};

module.exports = {
    saveTodo,
    getAllTodos,
    updateTodoCompletion,
    updateTodoFav,
    updateTodoContent,
    deleteTodo,
};
