import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, PieChart, Calendar, Settings, Bell, Search, TrendingUp, MoreHorizontal, ChevronDown } from 'lucide-react';

export function CrmDashboardMockup() {
  return (
    <div className="w-full h-full flex bg-[#0B1526] rounded-2xl shadow-2xl border border-white/10 overflow-hidden font-sans text-white" style={{ minHeight: '600px', maxHeight: '800px' }}>
      {/* Sidebar */}
      <div className="w-64 bg-[#070d18] text-white flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-[#FF7A59] rounded-lg mr-3 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          HubSpot
        </div>
        <div className="flex-1 py-6 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<Users size={18} />} label="Contacts" />
          <NavItem icon={<TrendingUp size={18} />} label="Sales" />
          <NavItem icon={<PieChart size={18} />} label="Reports" />
          <NavItem icon={<Calendar size={18} />} label="Meetings" />
        </div>
        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0B1526]">
        {/* Top Header */}
        <div className="h-16 bg-[#12233f] border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center bg-white/5 rounded-full px-4 py-2 w-64 border border-white/10">
            <Search size={16} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full text-gray-200" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF7A59] rounded-full border-2 border-[#12233f]"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer border-l border-white/10 pl-4">
              <div className="w-8 h-8 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center font-bold text-sm">
                JD
              </div>
              <span className="text-sm font-medium hidden sm:block">John Doe</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Sales Overview</h1>
            <button className="bg-[#FF7A59] hover:bg-[#ff8f73] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Create Report
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" />
            <StatCard title="New Customers" value="356" change="+12.5%" trend="up" />
            <StatCard title="Active Deals" value="1,245" change="-4.2%" trend="down" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-[#12233f] p-6 rounded-xl border border-white/10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Revenue Growth</h2>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2 pb-4 border-b border-white/5">
                {[40, 60, 45, 80, 65, 90, 75, 110, 85, 120, 100, 130].map((h, i) => (
                  <div key={i} className="w-full bg-white/5 rounded-t-sm relative group cursor-pointer" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-[#FF7A59] rounded-t-sm transition-all duration-300 group-hover:bg-[#ff8f73]" 
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="bg-[#12233f] p-6 rounded-xl border border-white/10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Recent Contacts</h2>
                <button className="text-sm text-[#FF7A59] font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <ContactRow name="Sarah Jenkins" company="TechCorp" status="New" color="bg-blue-500/20 text-blue-300" />
                <ContactRow name="Michael Chen" company="Innovate LLC" status="In Progress" color="bg-orange-500/20 text-orange-300" />
                <ContactRow name="Emma Wilson" company="Global Systems" status="Closed" color="bg-green-500/20 text-green-300" />
                <ContactRow name="David Miller" company="DataSync" status="New" color="bg-blue-500/20 text-blue-300" />
                <ContactRow name="Jessica Taylor" company="CloudNet" status="In Progress" color="bg-orange-500/20 text-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? 'text-[#FF7A59]' : ''}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) {
  return (
    <div className="bg-[#12233f] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-2">{value}</div>
      <div className={`text-xs font-medium flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
        {trend === 'up' ? (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        ) : (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        )}
        {change} from last month
      </div>
    </div>
  );
}

function ContactRow({ name, company, status, color }: { name: string, company: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-gray-400 text-sm">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-sm text-white">{name}</div>
          <div className="text-xs text-gray-400">{company}</div>
        </div>
      </div>
      <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${color}`}>
        {status}
      </div>
    </div>
  );
}
