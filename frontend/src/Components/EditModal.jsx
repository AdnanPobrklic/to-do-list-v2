import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import IconTag from "./IconTag";

export default function EditModal({
    showEditModal,
    identificator,
    setShowWarning,
    setShowEditModal,
    backendApiUrl,
    setFirstLoad,
    firstLoad,
    userId,
    setTaskList,
}) {
    const editModalRef = useRef(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setFirstLoad(false);
        }, 500);
    }, []);

    useEffect(() => {
        if (firstLoad) return;
        if (showEditModal) {
            gsap.fromTo(
                editModalRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 40, duration: 0.25 }
            );
        } else {
            gsap.fromTo(
                editModalRef.current,
                { opacity: 1, y: 40 },
                { opacity: 0, y: -20, duration: 0.5 }
            );
        }
    }, [showEditModal]);

    const handleTodoEdit = async (event) => {
        event.preventDefault();
        if (editValue.length === 0) {
            setShowWarning("Task content cannot be empty");
        } else if (editValue.length > 100) {
            setShowWarning("Task content cannot be more than 100 chars");
        } else {
            try {
                const response = await axios.patch(
                    `${backendApiUrl}/api/edit-todo/${identificator}`,
                    { content: editValue, userId }
                );

                if (response.status !== 200) {
                    throw new Error("Failed to edit the task.");
                }

                setShowEditModal(false);
                setTaskList((prevState) =>
                    prevState.map((todo) =>
                        todo.identificator === identificator
                            ? { ...todo, content: editValue }
                            : todo
                    )
                );
                setEditValue("");
            } catch (error) {
                console.log(error);
                setShowWarning("Failed to edit the task. Please try again.");
            }
        }
    };

    const handleTodoClose = (event) => {
        event.preventDefault();
        setEditValue("");
        setShowEditModal(false);
    };

    return (
        <form
            className={`absolute left-0 bg-slate-700 py-1 px-5 text-slate-200 w-[50%] min-w-[250px] rounded flex justify-between gap-5 ${
                !showEditModal ? "z-[-10] opacity-0 " : "z-[20] "
            }`}
            ref={editModalRef}
            onSubmit={handleTodoEdit}
        >
            <input
                className="bg-transparent placeholder-slate-400 outline-none w-[90%]"
                placeholder="Edit here..."
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
            />
            <button type="submit">
                <IconTag className="fa-solid fa-check text-lime-400" />
            </button>
            <button onClick={handleTodoClose}>
                <IconTag className="fa-solid fa-close text-red-400" />
            </button>
        </form>
    );
}
