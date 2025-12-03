import DashboardCard from "./DashboardCard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import UsersTable from "./UsersTable";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden md:pl-12.5 md:pr-14 p-2">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <DashboardCard />
          <div className=" ">
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;