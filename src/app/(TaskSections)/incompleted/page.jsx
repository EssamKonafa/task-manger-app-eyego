'use client'
import { getUserTasks } from '@/API/httpClient';
import SlideAnimation from '@/components/SlideAnimation';
import TaskItem from '@/components/Tasks/TaskItem';
import useUserStore from '@/Stores/AuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import React from 'react'

function page() {

    //zustand global state holding user information
    const { userInfo } = useUserStore();

    //query for completed tasks for the signed user
    const status = false;
    const {
        data: completedTasks,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: () => getUserTasks(userInfo.userId,status),
        enabled: !!userInfo?.userId,
    });

    if (tasksLoading) {
        return (
            <div className="p-4 space-y-4">
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
        );
    }

    if (tasksError) {
        return (
            <div className="p-4 bg-red-100 border-l-4 text-red-700">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p className="font-bold">Error</p>
                </div>
                <p className="mt-2">Please try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <p className='font-bold text-center py-3 text-[25px]'>My incompleted Tasks</p>

            <div className="space-y-3">
                {userInfo ? (
                    completedTasks && completedTasks.length > 0 ? (
                        <AnimatePresence>
                            {completedTasks.map((task) => (
                                <div key={task._id}>
                                    <SlideAnimation>
                                        <TaskItem task={task} />
                                    </SlideAnimation>
                                </div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <SlideAnimation>
                            <p className="text-center text-gray-500 text-2xl">
                                No tasks to display.
                            </p>
                        </SlideAnimation>
                    )
                ) : (
                    <SlideAnimation>
                        <p className="text-center text-gray-500 text-2xl">
                            Please sign in to view your incompleted tasks.
                        </p>
                    </SlideAnimation>
                )}
            </div>
        </div>
    );
}

export default page