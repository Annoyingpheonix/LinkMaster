import React from 'react';
import { NavView } from '../types';
import { LayoutDashboard, CalendarDays, UserCircle, Zap, Menu, X, Settings, LogOut, ChevronRight, BarChart3, Target } from 'lucide-react';

interface LayoutProps {
  currentView: NavView;
  setView: (view: NavView) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: NavView.DASHBOARD, label: 'Performance', icon: BarChart3 },
    { id: NavView.PLANNER, label: 'Post Lab', icon: CalendarDays },
    { id: NavView.OPTIMIZER, label: 'Profile Opti', icon: Target },
    { id: NavView.HOOKS, label: 'Hook Gen', icon: Zap },
  ];

  const handleNavClick = (view: NavView) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 fixed h-full z-20">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 group cursor-pointer transition-all hover:scale-105 active:scale-95">
              <Zap className="text-white group-hover:text-blue-400 transition-colors" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                LinkMaster
              </h1>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1 block">Growth Engine</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-5 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-5 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Management</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all duration-300 group relative ${
                currentView === item.id
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={currentView === item.id ? 'text-blue-400' : 'group-hover:text-blue-500 transition-colors'} />
                <span className="text-sm font-bold">{item.label}</span>
              </div>
              {currentView === item.id && <ChevronRight size={14} className="text-slate-500 animate-pulse" />}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-slate-50">
            <p className="px-5 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Workspace</p>
            <button
              onClick={() => handleNavClick(NavView.SETTINGS)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-[1.25rem] transition-all duration-300 ${
                currentView === NavView.SETTINGS
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings size={20} className={currentView === NavView.SETTINGS ? 'text-blue-400' : ''} />
              <span className="text-sm font-bold">Preferences</span>
            </button>
          </div>
        </nav>

        <div className="p-6">
          <div className="bg-slate-50 rounded-[2rem] p-5 border border-slate-100 group transition-all hover:border-blue-100">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-200 flex items-center justify-center text-blue-700 font-black text-xs shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4" alt="User" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-black text-slate-800 truncate">John Doe</p>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Premium Tier</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full py-3 bg-white border border-slate-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md z-30 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <Zap className="text-blue-600" size={20} fill="currentColor" />
           <h1 className="text-lg font-black text-slate-900 tracking-tighter">LinkMaster</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-80 bg-white transform transition-transform duration-500 ease-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Zap className="text-blue-600" size={24} fill="currentColor" />
                <h1 className="text-xl font-black text-slate-900 tracking-tighter">LinkMaster AI</h1>
              </div>
           </div>
           <nav className="p-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                    currentView === item.id
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-300'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="pt-6 border-t border-slate-100 mt-6">
                 <button
                    onClick={() => handleNavClick(NavView.SETTINGS)}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      currentView === NavView.SETTINGS ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500'
                    }`}
                  >
                    <Settings size={20} />
                    <span>Preferences</span>
                 </button>
              </div>
           </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen pt-24 lg:pt-12 px-6 md:px-16 overflow-x-hidden">
        <div className="max-w-screen-2xl mx-auto h-full pb-20 lg:pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;