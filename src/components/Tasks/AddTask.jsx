import React from 'react'

function AddTask() {
    return (
        <div className='bottom-10 sticky mx-auto w-1/2 '>
            <label className="flex p-3 py-auto rounded-full gap-x-2 bg-black ">
                {/* <Plus className="w-7 h-7 text-white" /> */}
                <input
                    className="text-white bg-black w-full outline-none "
                    placeholder="Create a New Task"
                    // value={taskInput}
                    // onChange={(e) => setTaskInput(e.target.value)}
                    // onKeyDown={handleKeyDown}
                />
                <div>
                    {/* <SendHorizonal onClick={() => addTaskMutation.mutate()} className="w-7 h-7 transition-all text-white cursor-pointer" /> */}
                </div>
            </label>
        </div>
    )
}

export default AddTask