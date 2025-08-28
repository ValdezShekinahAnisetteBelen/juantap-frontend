"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 md:ml-64 p-4">
        {/* Mobile toggle button */}
        <div className="md:hidden mb-4">
          <Button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4 mr-2" />
            Open Menu
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}
