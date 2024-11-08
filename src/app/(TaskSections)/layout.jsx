'use client'

import { usePathname } from 'next/navigation'
import UserWelcome from '@/components/UserWelcome'
import AddTask from '@/components/Tasks/AddTask'

export default function RootLayout({ children }) {
    const pathname = usePathname()
    return (
        <>
            <div className="py-6 px-4 xs:px-2 sm:px-4 md:px-10 lg:px-20 space-y-5 h-full" >
                <UserWelcome />
                {children}
            </div>

            {/* hiding input for adding tasks while the user in page complete or incomplete tasks*/}
            {(pathname != "/completed" && pathname != "/incompleted") &&
                <AddTask />
            }
        </>
    )
}