"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

const SideBarOptions = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/#'
  },
  {
    title: 'My Learning',
    icon: Book,
    path: '/workspace/my-learning'
  },
  {
    title: 'Explore Courses',
    icon: Compass,
    path: '/workspace/explore'
  },
  {
    title: 'AI Tools',
    icon: PencilRulerIcon,
    path: '/workspace/ai-tools'
  },
  {
    title: 'Billing',
    icon: WalletCards,
    path: '/workspace/billing'
  },
  {
    title: 'Profile',
    icon: UserCircle2Icon,
    path: '/workspace/profile'
  }
]

const AppSidebar = () => {
  const  path=usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="logo" width={70} height={50} />
        <p className="font-bold text-xl text-blue-500">CareerPilot-Ai</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5'}>
                <Link href={item.path} className={`flex items-center gap-2 text-[17px]
                   ${path.includes(item.path) && 'text-primary bg-purple-500'}
                  `}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
         <AddNewCourseDialog>
        <div className="p-4">
          <Button className="w-full">Create New Course</Button>
        </div>
        </AddNewCourseDialog>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
