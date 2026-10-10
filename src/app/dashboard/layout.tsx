import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SidebarResizable from "@/components/SidebarResizable";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarResizable>
        <AppSidebar />
      </SidebarResizable>

      <SidebarInset>
        <Header />

        <main className="dashboard-content flex flex-1 flex-col gap-4 p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
