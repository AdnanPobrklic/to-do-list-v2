const todoService = require("../services/todoServices");
const { handleErrorResponse } = require("../utils");
const postSaveTodo = async (req, res) => {
    try {
        const result = await todoService.saveTodo(req.body);
        return res.status(200).json(result);
    } catch (err) {
        return handleErrorResponse(res, 400, err.message);
    }
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos(req.params.userId);
        return res.status(200).json(todos);
    } catch (err) {
        return handleErrorResponse(res, 500, "Internal server error");
    }
};

const patchTodoCompletion = async (req, res) => {
    try {
        await todoService.updateTodoCompletion(
            req.params.identificator,
            req.body.userId
        );
        return res.sendStatus(204);
    } catch (err) {
        if (err.message === "Todo not found") {
            return handleErrorResponse(res, 404, err.message);
        } else if (err.message === "Forbidden") {
            return res.sendStatus(403);
        } else {
            return handleErrorResponse(res, 500, "Internal server error");
        }
    }
};

const patchTodoFav = async (req, res) => {
    try {
        await todoService.updateTodoFav(
            req.params.identificator,
            req.body.userId
        );
        return res.sendStatus(204);
    } catch (err) {
        if (err.message === "Todo not found") {
            return handleErrorResponse(res, 404, err.message);
        } else if (err.message === "Forbidden") {
            return res.sendStatus(403);
        } else {
            return handleErrorResponse(res, 500, "Internal server error");
        }
    }
};

const patchTodoContent = async (req, res) => {
    try {
        const result = await todoService.updateTodoContent(
            req.params.identificator,
            req.body.content,
            req.body.userId
        );
        return res.status(200).json(result);
    } catch (err) {
        if (
            err.message === "Todo not found" ||
            err.message === "Todo content must be between 0 and 100 chars"
        ) {
            return handleErrorResponse(res, 400, err.message);
        } else if (err.message === "Forbidden") {
            return res.sendStatus(403);
        } else {
            return handleErrorResponse(res, 500, "Internal server error");
        }
    }
};

const deleteTodo = async (req, res) => {
    try {
        await todoService.deleteTodo(
            req.params.identificator,
            req.query.userId
        );
        return res.sendStatus(200);
    } catch (err) {
        if (err.message === "Todo not found") {
            return handleErrorResponse(res, 404, err.message);
        } else if (err.message === "Forbidden") {
            return res.sendStatus(403);
        } else {
            return handleErrorResponse(res, 500, "Internal server error");
        }
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
