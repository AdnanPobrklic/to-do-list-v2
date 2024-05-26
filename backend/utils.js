const Todo = require("./models/Todo");
const { getIo, onlineUsers } = require("./sockets/socketManager");

const handleRecurringTask = async (todo) => {
    try {
        if (todo.recurring) {
            const delay =
                todo.recurring === 1
                    ? 1000 * 60
                    : todo.recurring === 2
                    ? 1000 * 60 * 60
                    : todo.recurring === 3
                    ? 1000 * 60 * 60 * 24
                    : todo.recurring === 4
                    ? 1000 * 60 * 60 * 24 * 7
                    : 10000;

            setTimeout(async () => {
                const existingTodo = await Todo.findOne({
                    identificator: todo.identificator,
                });

                if (existingTodo && existingTodo.done) {
                    existingTodo.done = false;
                    await existingTodo.save();
                    const io = getIo();

                    const socketId = onlineUsers.get(todo.userId);
                    if (socketId) {
                        io.to(socketId).emit(
                            "taskUpdated",
                            existingTodo.identificator
                        );
                    }
                }
            }, delay);
        }
    } catch (error) {
        console.log("Error handling recurring task:", error);
    }
};

module.exports = {
    handleRecurringTask,
};
