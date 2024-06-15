import React, { useEffect, useRef } from "react";
import IconTag from "./IconTag";

export default function MainMenu({
    setShowAddCategory,
    showAddCategory,
    categoryFormRef,
    category,
    setCategory,
    handleCategoryAdd,
    handleCategoryDelete,
    showWarning,
    filteredCategory,
    setFilteredCategory,
    categories,
}) {
    const openFormRef = useRef(null);

    const handleClickOutside = (e) => {
        if (categoryFormRef.current.contains(e.target)) return;
        if (!openFormRef.current.contains(e.target)) {
            setShowAddCategory(false);
        } else {
            setShowAddCategory((prevState) => !prevState);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div className="relative w-full h-[5px] mt-[75px] mb-5 pt-2 border-b border-slate-300">
            <p
                className={`py-2 text-slate-200 absolute top-[-25px] right-0 md:hover:opacity-50 cursor-pointer flex items-center select-none`}
                ref={openFormRef}
            >
                {showAddCategory
                    ? "Add with '+' remove with 'x'"
                    : "Show category form"}
                &nbsp;
                {!showAddCategory && (
                    <IconTag className="fa-solid fa-arrow-down" />
                )}
            </p>
            <div
                ref={categoryFormRef}
                className={`absolute  top-[25px] right-0 flex flex-col gap-3 px-7 py-2 bg-slate-700 text-slate-200 z-20  rounded ${
                    showAddCategory ? "block" : "hidden"
                }`}
            >
                <form className="flex gap-5">
                    <input
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        placeholder="Category..."
                        className="border-2 border-slate-200 bg-transparent placeholder-slate-300 px-2 rounded py-1 w-[200px]"
                    />
                    <div className="flex items-center gap-5">
                        <button
                            type="submit"
                            onClick={handleCategoryAdd}
                            className="md:hover:text-lime-400 cursor-pointer text-[18px]"
                        >
                            <IconTag className="fa-solid fa-plus" />
                        </button>
                        <button
                            type="submit"
                            onClick={handleCategoryDelete}
                            className="md:hover:text-red-500 cursor-pointer text-[18px]"
                        >
                            <IconTag className="fa-solid fa-close" />
                        </button>
                    </div>
                </form>
            </div>
            <p
                className={`py-2 text-yellow-500 absolute top-[-25px] left-0 bg-slate-700 w-full pl-2 ${
                    showWarning ? "block" : "hidden"
                }`}
            >
                {showWarning}
            </p>
            <select
                className="absolute top-[15px]  right-[0px] bg-[#018382] border border-slate-200 text-white p-1 px-2 rounded font-[500] outline-none"
                value={filteredCategory}
                onChange={(event) => setFilteredCategory(event.target.value)}
            >
                <option value="all">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}
