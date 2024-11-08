'use client'
import useUserStore from '@/Stores/AuthStore';
import React, { useEffect, useState } from 'react'

function UserWelcome() {

    const { userInfo } = useUserStore()

    const [currentDate, setCurrentDate] = useState('');

    const dateToday = () => {
        const date = new Date();
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        setCurrentDate(`It's ${date.toLocaleDateString('en-US', options)}`);
    };

    useEffect(() => {
        dateToday()
    }, []);

    return (
        <div>
            <p className="font-semibold text-[25px]">Welcome Back {userInfo?.userName}!</p>
            <p className="text-[20px]">{currentDate}</p>
        </div>
    )
}

export default UserWelcome