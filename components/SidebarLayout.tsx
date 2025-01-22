import { useState } from 'react';
import { Sidebar } from './Sidebar'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <div className={`fixed top-0 left-0 bottom-0 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <Sidebar />
      </div>
      <main className="flex-1 ml-0 md:ml-72 min-h-screen">
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close' : 'Open'} Sidebar
        </button>
        {children}
      </main>
    </div>
  )
}