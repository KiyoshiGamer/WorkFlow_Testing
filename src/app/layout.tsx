import "./globals.css";
import SidebarNavigation from "@/components/navigation/sidebar";

export const metadata = {
  title: "FlowForge",
  description: "FlowForge Workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        <SidebarNavigation />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
