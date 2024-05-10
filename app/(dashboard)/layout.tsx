import { Footer } from "@/components/footer";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="h-[80px] fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50 pt-[80px]">
            <Sidebar />
          </div>
          <main className="md:pl-72 pt-[80px] h-full">{children}</main>
        </div>
        <div className="md:pl-72">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
