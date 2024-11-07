import React from 'react'

function TaskItem() {
    return (
        <div>
            <label className='flex justify-between cursor-pointer hover:shadow-md  transition-all duration-500 text-[#0a0a0a] bg-white rounded-xl shadow-sm p-3 '>
            <div className="flex gap-x-4 ">
                    <input
                    type='checkbox'
                        className="w-6 h-6 my-auto transition-all duration-300"
                        // checked={task.completed}
                        // onCheckedChange={handleStatusChange}
                    />
                    <p className={`font-semibold content-center text-[17px]`}>
                        {/* {task.task} */}
                        task
                        </p>
                        {/* ${task.completed === true && 'line-through'} */}
                </div>
            </label>
        </div>
    )
}

export default TaskItem