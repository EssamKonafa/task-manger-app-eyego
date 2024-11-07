'use client'
import React from 'react'
import SlideAnimation from '../SlideAnimation'
import TaskItem from './TaskItem'

function AllTasks() {
    return (
        <div>
            <SlideAnimation>
                <TaskItem />
            </SlideAnimation>
        </div>
    )
}

export default AllTasks