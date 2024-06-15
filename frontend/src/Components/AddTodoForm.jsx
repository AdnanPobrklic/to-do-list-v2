import React from "react";
import IconTag from "./IconTag";

export default function AddTodoForm({
    handleTodoSubmit,
    task,
    handleInputChange,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedRecurring,
    setSelectedRecurring,
}) {
    return (
        <form
            onSubmit={handleTodoSubmit}
            className="w-full flex flex-col xl:flex-row items-stretch gap-5 h-[60px]"
        >
            <input
                className="border-2 border-slate-300 rounded p-3 w-full bg-transparent text-[17px] lg:text-[19px] xl:text-[22px] 2xl:text-[24px] placeholder:text-slate-300 text-slate-200 font-[500] shadow-xl pr-[25px] xl:pr-[50px] outline-lime-300"
                type="text"
                placeholder="Enter a title for a task..."
                value={task}
                onChange={handleInputChange}
            />
            <div className="flex h-full gap-0 min-h-[50px]">
                <select
                    className="bg-[#018584]  text-white  border-l h-[100%] text-[15px] md:text-[17px]  px-2 outline-lime-300 font-[500] cursor-pointer md:hover:opacity-50"
                    title="Category"
                    value={selectedCategory}
                    onChange={(event) =>
                        setSelectedCategory(event.target.value)
                    }
                >
                    <option value="">Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    className="bg-[#018584]  text-white  border-x h-[95%] text-[15px] md:text-[17px]  px-2 outline-lime-300 font-[500] cursor-pointer md:hover:opacity-50"
                    title="Recurring"
                    value={selectedRecurring}
                    onChange={(event) =>
                        setSelectedRecurring(event.target.value)
                    }
                >
                    <option value="">Recurring</option>
                    <option value="0">Never</option>
                    <option value="1">Every minute</option>
                    <option value="2">Every hour</option>
                    <option value="3">Every day</option>
                    <option value="4">Every Week</option>
                </select>
                <button
                    type="submit"
                    className="bg-white flex items-center justify-center ml-5 w-[50px] h-[30px] xl:w-[55px] xl:h-[35px] self-center rounded-full md:hover:opacity-50 cursor-pointer transition-all"
                >
                    <IconTag className="fa-solid fa-plus text-[15px] xl:text-[20px] text-[#018583] font-[900]" />
                </button>
            </div>
        </form>
    );
}
