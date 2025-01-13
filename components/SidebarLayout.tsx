import { Sidebar } from './Sidebar'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="md:w-64 flex-shrink-0">
        <div className="md:fixed md:top-0 md:left-0 md:bottom-0 md:w-64 z-40">
          <Sidebar />
        </div>
      </div>
      <main className="flex-grow md:ml-64 p-4 md:p-8 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}

