import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import useUserStore from '@/Stores/AuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { deleteTask, updateTask, updateTaskContent, updateTaskStatus } from '@/API/httpClient';
import { toast } from 'sonner';

function TaskItem({ task }) {

    //user info from the global state
    const { userInfo } = useUserStore();

    //state for the updated task sting
    const [updatedTask, setUpdatedTask] = useState(task.task);

    // Mutation for updating a task
    const queryClient = useQueryClient();
    const updateTaskMutation = useMutation({
        mutationFn: () => updateTaskContent({ taskId: task._id, updatedTask}),
        onSuccess() {
            queryClient.invalidateQueries()
            toast.success("task updated successfully")
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to update the task please try again later.");
        },
    })
    const handleUpdate = () => {
        updateTaskMutation.mutate();
    };

    // Mutation for deleting a task
    const deleteTaskMutation = useMutation({
        mutationFn: () => deleteTask(task._id),
        onSuccess() {
            queryClient.invalidateQueries()
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to Delete the task please try again later")
        },
    })

    // Mutation for toggling task status (complete/incomplete)
    const toggleStatusMutation = useMutation({
        mutationFn: (taskStatus) => updateTaskStatus({taskId:task._id, taskStatus}),
        onSuccess() {
            queryClient.invalidateQueries();
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to update task status please try again later.");
        },
    });
    const handleStatusChange = () => {
        toggleStatusMutation.mutate(!task.completed);
    };

    //data of the added task
    const formattedDate = new Date(task.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return (
        <div>
            <label className='flex justify-between cursor-pointer hover:shadow-md  transition-all duration-500 text-[#0a0a0a] bg-white rounded-xl shadow-sm p-3 '>
                <div className="flex gap-x-4 ">
                    <Checkbox
                        className="w-6 h-6 my-auto transition-all duration-300"
                        checked={task.completed}
                        onCheckedChange={handleStatusChange}
                    />
                    <p className={`${task.completed === true && 'line-through'} font-semibold content-center text-[17px]`}>{task.task}</p>
                </div>
                <div className="flex font-[500] text-[13px] text-[#8e8d8d]  gap-x-2 my-auto">
                    
                    <div className='my-auto content-center'>
                        <p className='font-semibold'>{task.userName}</p>
                    </div>
                    <div className='my-auto'>
                        {formattedDate}
                    </div>
                    <Dialog >
                        <DialogTrigger asChild>
                            <Edit className='w-6 h-6 hover:text-black transition-all duration-500' />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Task</DialogTitle>
                                <DialogDescription>
                                    Edit your task below and confirm to update.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={updatedTask}
                                    onChange={(e) => setUpdatedTask(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div className="flex justify-end gap-x-2 mt-4">
                                <Button
                                    onClick={handleUpdate}
                                    className='bg-green-500 hover:bg-green-600'
                                >
                                    Update
                                </Button>
                                <DialogClose className='bg-black hover:bg-gray-800 text-white text-[14px] rounded-md px-3 ph-2'>
                                    Close
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <Trash2 className='w-6 h-6 hover:text-red-500  transition-all duration-500' />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your task
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex justify-end gap-x-2'>
                                <Button className='bg-red-500 hover:bg-red-700'
                                    onClick={() => deleteTaskMutation.mutate()}>
                                    Delete
                                </Button>
                                <DialogClose className='bg-black hover:bg-gray-800 text-white text-[14px] rounded-md px-3 ph-2'>
                                    Cancel
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </label>
        </div>
    )
}

export default TaskItem