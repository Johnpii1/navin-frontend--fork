import React from "react";
import { Menu, Search } from "lucide-react";
import NotificationDropdown from "../../notifications/NotificationDropdown/NotificationDropdown";

interface TopHeaderProps {
  toggleSidebar: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="sticky top-0 z-20 w-full bg-[#14171e]">
      <header className="w-full max-w-[1080px] mx-auto h-[72px] flex flex-row items-center justify-between px-4 bg-transparent border-b border-slate-800">
        {/* Left */}
        <div className="flex items-center w-[200px]">
          <button
            className="lg:hidden flex items-center justify-center bg-transparent border-none text-white cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center">
          <label className="flex items-center gap-3 w-[480px] max-w-full h-10 px-4 rounded-[10px] bg-[#111624] border border-slate-800 transition-colors focus-within:border-indigo-500 cursor-text">
            <Search size={16} className="text-slate-500 shrink-0" />
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent text-white text-sm placeholder:text-slate-500"
              placeholder="Search shipment ID..."
            />
          </label>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end w-[200px]">
          <NotificationDropdown />
        </div>
      </header>
    </div>
  );
};

export default TopHeader;
