import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="md:pl-72 pt-[80px] h-full">{children}</main>
        </div>
        <div className="md:pl-72">
          <footer className="p-4 w-full bg-white border-t flex flex-col lg:flex-row items-start lg:items-center">
            <div className="text-xs text-muted-foreground py-2 px-4 lg:flex-1">
              © 2024 Clubes Ciência Viva na Escola. All rights reserved.
            </div>
            <a
              className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
              href="#"
            >
              Contact
            </a>
            <a
              target="_blank"
              className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
              href="#"
            >
              Terms of Service
            </a>
            <a
              target="_blank"
              className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
              href="#"
            >
              Privacy Policy
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
