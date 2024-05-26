const Todo = require("../models/Todo");
const { handleRecurringTask } = require("../utils");

const handleErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

const findTodo = async (identificator, userId) => {
    return await Todo.findOne({ identificator, userId });
};

const postSaveTodo = async (req, res) => {
    try {
        const { content, identificator, done, category, recurring, userId } =
            req.body;

        if (!content || !identificator || !userId) {
            return handleErrorResponse(
                res,
                400,
                "Content, identificator and userId must be provided"
            );
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
        return res.status(200).json({ message: "Todo saved" });
    } catch (err) {
        console.log(err);
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const getAllTodos = async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await Todo.find({ userId });
        return res.status(200).json(todos);
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const patchTodoCompletion = async (req, res) => {
    try {
        const { identificator } = req.params;
        const { userId } = req.body;

        const todo = await findTodo(identificator, userId);
        if (!todo) {
            return handleErrorResponse(res, 404, "Todo not found");
        }

        if (todo.userId !== userId) {
            return res.sendStatus(403);
        }

        todo.done = !todo.done;
        await todo.save();

        if (todo.recurring && todo.done) {
            await handleRecurringTask(todo);
        }

        return res.sendStatus(204);
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const patchTodoFav = async (req, res) => {
    try {
        const { identificator } = req.params;
        const { userId } = req.body;

        const todo = await findTodo(identificator, userId);
        if (!todo) {
            return handleErrorResponse(res, 404, "Todo not found");
        }

        if (todo.userId !== userId) {
            return res.sendStatus(403);
        }

        todo.favourited = !todo.favourited;
        await todo.save();
        return res.sendStatus(204);
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const patchTodoContent = async (req, res) => {
    try {
        const { identificator } = req.params;
        const { content, userId } = req.body;

        if (!content || content.length > 100) {
            return handleErrorResponse(
                res,
                400,
                "Todo content must be between 0 and 100 chars"
            );
        }

        const todo = await findTodo(identificator, userId);
        if (!todo) {
            return handleErrorResponse(res, 404, "Todo not found");
        }

        if (todo.userId !== userId) {
            return res.sendStatus(403);
        }

        todo.content = content;
        await todo.save();
        return res.status(200).json({ message: "Todo content updated" });
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { identificator } = req.params;
        const { userId } = req.query;

        const todo = await findTodo(identificator, userId);
        if (!todo) {
            return handleErrorResponse(res, 404, "Todo not found");
        }

        if (todo.userId !== userId) {
            return res.sendStatus(403);
        }

        await todo.deleteOne();
        return res.sendStatus(200);
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

module.exports = {
    postSaveTodo,
    getAllTodos,
    patchTodoCompletion,
    patchTodoContent,
    deleteTodo,
    patchTodoFav,
};
