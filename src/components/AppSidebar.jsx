'use client'
import React from 'react'
import { AlignLeftIcon, CheckCircle, Circle, Settings, User2Icon, UserCog } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

function AppSidebar() {

    // Determines the current path for dynamic styling
    const pathname = usePathname();
    const router = useRouter()

    // Define the sidebar navigation items with information
    const items = [
        { title: "All Tasks", url: "/", icon: AlignLeftIcon, },
        { title: "My Tasks", url: "/mytasks", icon: UserCog, },
        { title: "Completed", url: "/completed", icon: CheckCircle, },
        { title: "Not Completed", url: "/incompleted", icon: Circle, }
    ]

    return (
        <div>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex mx-auto cursor-pointer gap-x-2 py-2  mb-2 duration-500 rounded-md">
                        {!items ?
                        <>
                        sign in or create your account
                            <Button
                                // onClick={() => signInMutation.mutate()}
                                className="bg-black rounded-md font-semibold hover:bg-white hover:border border-black hover:text-black">
                                Sign in
                            </Button>
                                    </>
                            :
                            <>
                                <User2Icon className="w-12 h-12 rounded-3xl p-1 bg-black text-white " />
                                <div className="my-auto ">
                                    <p className="font-semibold text-[15px]">
                                        {/* {userInfo.name} */}
                                        user name
                                    </p>
                                    <p className="text-[#929292] text-[12px]">
                                        {/* {userInfo.email} */}
                                        user email
                                    </p>
                                    <Button
                                        className="bg-black rounded-md font-semibold hover:bg-red-500 hover:border-none"
                                    // onClick={() => signOutMutation.mutate()}
                                    >
                                        Sign out
                                    </Button>
                                </div>
                            </>
                        }
                    </div>

                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <div className={`flex items-center space-x-2 p-2 rounded-md ${isActive ? " text-black font-[700]" : "text-gray-600"}`}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <div className="flex gap-x-2 cursor-pointer p-5 mx-auto rounded-xl duration-500 transition-all ">
                        <Settings className="w-12 h-12 p-1 rounded-3xl bg-black text-white" />
                        <p className="font-semibold my-auto text-[15px]">Task Manger</p>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}

export default AppSidebar