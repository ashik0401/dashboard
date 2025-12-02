import DashboardCard from "./DashboardCard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import UsersTable from "./UsersTable";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <DashboardCard />
          <div className="p-2 sm:p-4">
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;