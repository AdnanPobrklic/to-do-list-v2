import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import gsap from "gsap";
import io from "socket.io-client";
import AddTodoForm from "./AddTodoForm";
import MainMenu from "./MainMenu";
import TodoList from "./TodoList";
import ClockLoader from "react-spinners/ClockLoader";

export default function Main() {
    const [socket, setSocket] = useState(null);
    const userId = localStorage.getItem("userId") || uuidv4();
    const backendApiUrl =
        import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
    const [task, setTask] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRecurring, setSelectedRecurring] = useState("");
    const categoryFormRef = useRef(null);
    const [filteredCategory, setFilteredCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleTodoSubmit = async (event) => {
        event.preventDefault();
        if (task.trim().length === 0) {
            setShowWarning("Task content cannot be empty");
        } else if (task.length > 100) {
            setShowWarning("Task content cannot be more than 100 chars");
        } else {
            const newIdentificator = uuidv4();
            setIsFirstLoad(false);
            setTaskList((prevState) => [
                ...prevState,
                {
                    content: task,
                    done: false,
                    identificator: newIdentificator,
                    favourited: false,
                    category: selectedCategory || "todo",
                    recurring: selectedRecurring,
                },
            ]);
            try {
                const response = await axios.post(
                    `${backendApiUrl}/api/save-todo`,
                    {
                        content: task,
                        category: selectedCategory || "todo",
                        identificator: newIdentificator,
                        recurring: selectedRecurring,
                        done: false,
                        userId,
                    }
                );

                if (response.status !== 200) {
                    throw new Error(
                        "Task failed to save in our database, it will be lost after a refresh"
                    );
                }
            } catch (error) {
                console.log(error);
                setShowWarning(
                    "Task failed to save in our database, it will be lost after a refresh. Please try again."
                );
            }
            setTask("");
        }
    };

    const handleCategoryAdd = async (event) => {
        event.preventDefault();
        if (category.trim() === "") {
            setShowWarning("Category cannot be empty");
        } else if (category.length > 10) {
            setShowWarning("Category cannot be more than 10 chars");
        } else if (categories.includes(category.trim())) {
            setShowWarning("This category already exists");
        } else {
            const newCategories = [...categories, category.trim()];
            setCategories(newCategories);
            localStorage.setItem("categories", JSON.stringify(newCategories));
            setShowWarning("Cattegory added");
            setCategory("");
            setShowAddCategory(false);
        }
    };

    const handleCategoryDelete = (event) => {
        event.preventDefault();
        const protectedCategories = ["todo", "shopping", "packing"];
        if (category.trim() === "") {
            setShowWarning("Category cannot be empty");
            return;
        } else if (protectedCategories.includes(category.trim())) {
            setShowWarning("This category cannot be deleted");
        } else if (!categories.includes(category.trim())) {
            setShowWarning("This category does not exist");
        } else {
            const newCategories = categories.filter(
                (cat) => cat !== category.trim()
            );
            setShowWarning("Cattegory deleted");
            setCategories(newCategories);
            localStorage.setItem("categories", JSON.stringify(newCategories));
            setCategory("");
            setShowAddCategory(false);
        }
    };

    const handleToDoCompletion = async (identificator) => {
        setTaskList(
            taskList.map((task) =>
                task.identificator === identificator
                    ? { ...task, done: !task.done }
                    : task
            )
        );
        try {
            const response = await axios.patch(
                `${backendApiUrl}/api/todo-completion/${identificator}`,
                { userId }
            );

            if (response.status !== 204) {
                throw new Error(
                    "Task failed to be marked as completed in our database, it's state will be lost after a refresh"
                );
            }
        } catch (error) {
            setShowWarning(
                "Task failed to save in our database, it's state will be lost after a refresh."
            );
        }
    };

    const handleToDoFavouration = async (identificator) => {
        setTaskList(
            taskList.map((task) =>
                task.identificator === identificator
                    ? { ...task, favourited: !task.favourited }
                    : task
            )
        );
        try {
            const response = await axios.patch(
                `${backendApiUrl}/api/todo-fav/${identificator}`,
                { userId }
            );

            if (response.status !== 204) {
                throw new Error(
                    "Task failed to be marked as favourite in our database, it's state will be lost after a refresh"
                );
            }
        } catch (error) {
            console.log(error);
            setShowWarning(
                "Task failed to be marked as favourite in our database, it's state will be lost after a refresh."
            );
        }
    };

    const handleDelete = async (identificator) => {
        setTaskList((prevTaskList) =>
            prevTaskList.map((task) =>
                task.identificator === identificator
                    ? { ...task, triggerDelete: true }
                    : task
            )
        );

        setTimeout(() => {
            setTaskList((prevTaskList) =>
                prevTaskList.filter(
                    (task) => task.identificator !== identificator
                )
            );
        }, 500);
        try {
            const response = await axios.delete(
                `${backendApiUrl}/api/todo-deletion/${identificator}?userId=${userId}`
            );

            if (response.status !== 200) {
                throw new Error(
                    "Task failed to be deleted in our database, its state will be lost after a refresh"
                );
            }
        } catch (error) {
            setShowWarning(
                "Task failed to delete in our database, its state will be lost after a refresh."
            );
        }
    };

    useEffect(() => {
        if (!userId) return;
        const newSocket = io.connect(backendApiUrl);
        setSocket(newSocket);

        newSocket.emit("connectionMade", userId);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!localStorage.getItem("userId")) {
                    localStorage.setItem("userId", userId);
                }
                if (!localStorage.getItem("categories")) {
                    const defaultCategories = ["todo", "shopping", "packing"];
                    localStorage.setItem(
                        "categories",
                        JSON.stringify(defaultCategories)
                    );
                    setCategories(defaultCategories);
                } else {
                    setCategories(
                        JSON.parse(localStorage.getItem("categories"))
                    );
                }
                const response = await axios.get(
                    `${backendApiUrl}/api/todos/all/${userId}`
                );

                setTaskList(response.data);
            } catch (error) {
                console.log(error);
                setShowWarning(
                    "There has been an error fetching your saved todos"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId, backendApiUrl]);

    useEffect(() => {
        if (!showWarning) return;
        const timerId = setTimeout(() => {
            setShowWarning("");
        }, 4000);

        return () => clearTimeout(timerId);
    }, [showWarning]);

    useEffect(() => {
        if (showAddCategory && categoryFormRef.current) {
            gsap.fromTo(
                categoryFormRef.current,
                { y: -25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }
            );
        } else {
            gsap.fromTo(
                categoryFormRef.current,
                { y: 0, opacity: 1 },
                { y: -25, opacity: 0, duration: 0.5 }
            );
        }
    }, [showAddCategory]);

    useEffect(() => {
        if (taskList.length > 0) {
            if (filteredCategory === "all") {
                setFilteredTaskList(taskList);
            } else {
                const filteredTasks = taskList.filter(
                    (task) => task.category === filteredCategory
                );
                setFilteredTaskList(filteredTasks);
            }
        }
    }, [filteredCategory, taskList]);

    useEffect(() => {
        if (!socket) return;

        socket.on("taskUpdated", (updatedIdentificator) => {
            setTaskList((prevTaskList) =>
                prevTaskList.map((task) =>
                    task.identificator === updatedIdentificator
                        ? { ...task, done: !task.done }
                        : task
                )
            );
        });

        return () => {
            socket.off("taskUpdated");
        };
    }, [socket]);

    return isLoading ? (
        <div className="w-full grow flex flex-col gap-5 items-center justify-center text-center px-5">
            <p>
                Please wait a minute or two until our backend server activates
                (spinned off due to inactivity)
            </p>
            <ClockLoader color="#fff" />
        </div>
    ) : (
        <main className="w-full grow flex flex-col gap-5 pt-[25px] xl:pt-[50px]">
            <AddTodoForm
                handleTodoSubmit={handleTodoSubmit}
                task={task}
                handleInputChange={handleInputChange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                selectedRecurring={selectedRecurring}
                setSelectedRecurring={setSelectedRecurring}
            />
            <MainMenu
                setShowAddCategory={setShowAddCategory}
                showAddCategory={showAddCategory}
                categoryFormRef={categoryFormRef}
                category={category}
                setCategory={setCategory}
                handleCategoryAdd={handleCategoryAdd}
                handleCategoryDelete={handleCategoryDelete}
                showWarning={showWarning}
                filteredCategory={filteredCategory}
                setFilteredCategory={setFilteredCategory}
                categories={categories}
            />
            <TodoList
                userId={userId}
                filteredTaskList={filteredTaskList}
                isFirstLoad={isFirstLoad}
                handleToDoCompletion={handleToDoCompletion}
                handleDelete={handleDelete}
                setShowWarning={setShowWarning}
                backendApiUrl={backendApiUrl}
                handleToDoFavouration={handleToDoFavouration}
                taskList={taskList}
                setTaskList={setTaskList}
            />
        </main>
    );
}
