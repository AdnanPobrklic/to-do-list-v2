import Todo from "./Todo";

export default function TodoList({
    filteredTaskList,
    isFirstLoad,
    handleToDoCompletion,
    handleDelete,
    setShowWarning,
    backendApiUrl,
    handleToDoFavouration,
    taskList,
    userId,
    setTaskList,
}) {
    return (
        <>
            {filteredTaskList.length > 0 ? (
                <>
                    <ul className="w-full flex flex-col-reverse gap-5 mt-5">
                        {filteredTaskList
                            .sort((a, b) => {
                                if (a.favourited === b.favourited) {
                                    return a.identificator < b.identificator
                                        ? 1
                                        : -1;
                                }
                                return a.favourited ? 1 : -1;
                            })
                            .map(
                                (todo) =>
                                    !todo.done && (
                                        <Todo
                                            setTaskList={setTaskList}
                                            userId={userId}
                                            key={todo.identificator}
                                            todo={todo}
                                            identificator={todo.identificator}
                                            isFirstLoad={isFirstLoad}
                                            handleToDoCompletion={
                                                handleToDoCompletion
                                            }
                                            handleDelete={handleDelete}
                                            setShowWarning={setShowWarning}
                                            backendApiUrl={backendApiUrl}
                                            handleToDoFavouration={
                                                handleToDoFavouration
                                            }
                                        />
                                    )
                            )}
                    </ul>
                    <h3 className="text-2xl border-b pb-2 mt-10">Completed</h3>
                    <ul className="w-full flex flex-col-reverse gap-5 mt-5">
                        {taskList.map(
                            (todo) =>
                                todo.done && (
                                    <Todo
                                        key={todo.identificator}
                                        todo={todo}
                                        identificator={todo.identificator}
                                        isFirstLoad={isFirstLoad}
                                        handleToDoCompletion={
                                            handleToDoCompletion
                                        }
                                        handleDelete={handleDelete}
                                        setShowWarning={setShowWarning}
                                        backendApiUrl={backendApiUrl}
                                        handleToDoFavouration={
                                            handleToDoFavouration
                                        }
                                    />
                                )
                        )}
                    </ul>
                </>
            ) : (
                <p className="w-full text-center pt-[100px]">
                    <i className="fa-solid fa-arrow-down text-5xl lg:text-6xl xl:text-7xl"></i>
                </p>
            )}
        </>
    );
}
