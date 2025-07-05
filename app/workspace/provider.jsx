import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'


const WorkspaceProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full"> {/* Ensure full width */}
        {/* Sidebar */}
        <AppSidebar />

        {/* Main layout */}
        <div className="flex flex-col flex-1 w-full"> {/* Take remaining space */}
          <AppHeader/> {/* Now it will stretch full width */}
        
          <div className="flex-1 p-10  overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider
