import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import EditModal from "./EditModal";

export default function Todo({
    todo,
    index,
    handleDelete,
    handleToDoCompletion,
    isFirstLoad,
    backendApiUrl,
    setShowWarning,
    handleToDoFavouration,
    userId,
    setTaskList,
}) {
    const todoRef = useRef(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (isFirstLoad) {
            gsap.fromTo(
                todoRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, delay: 0.35 }
            );
        } else {
            gsap.fromTo(
                todoRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.55 }
            );
        }
    }, [index]);

    return (
        <li
            className={`relative border-2 border-slate-400 rounded-[15px] flex justify-between gap-5 px-5 py-2 text-xl shadow-inner opacity-0 ${
                todo.done
                    ? "line-through decoration-[3px] decoration-yellow-500"
                    : ""
            } ${
                todo.triggerDelete
                    ? "translate-x-[-1500px] transition-all duration-500"
                    : ""
            }
            `}
            ref={todoRef}
        >
            <p
                onClick={() => handleToDoCompletion(todo.identificator)}
                className="cursor-pointer md:hover:opacity-50 transition-all font-[500] text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px]  break-all"
            >
                {todo.content}
            </p>

            <div className="flex gap-[15px]">
                {!todo.done && (
                    <>
                        <button
                            onClick={() =>
                                handleToDoFavouration(todo.identificator)
                            }
                        >
                            <i
                                className={`fa-solid fa-star md:hover:text-yellow-400 transition-all cursor-pointer ${
                                    todo.favourited ? "text-yellow-300" : ""
                                }`}
                            ></i>
                        </button>
                        <button
                            onClick={() =>
                                setShowEditModal((prevState) => !prevState)
                            }
                        >
                            <i className="fa-solid fa-pen-to-square md:hover:text-gray-400 transition-all cursor-pointer "></i>
                        </button>
                    </>
                )}

                <button onClick={() => handleDelete(todo.identificator)}>
                    <i className="fa-solid fa-trash-can md:hover:text-red-400 transition-all cursor-pointer "></i>
                </button>
            </div>
            <EditModal
                setTaskList={setTaskList}
                userId={userId}
                showEditModal={showEditModal}
                identificator={todo.identificator}
                setShowWarning={setShowWarning}
                setShowEditModal={setShowEditModal}
                backendApiUrl={backendApiUrl}
                firstLoad={firstLoad}
                setFirstLoad={setFirstLoad}
            />
        </li>
    );
}
