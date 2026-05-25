import { useState } from 'react';
import { Shield, Bell, Trophy, Flame, ChevronDown, Radio, Cpu, User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xpPoints: number;
}

export default function Header({ activeTab, setActiveTab, xpPoints }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Z-Xenon challenged you to a friendly match in Cyber Siege 2!', time: '10m ago', unread: true },
    { id: 2, text: 'Rank Promotion Eligible! Check your Gaming Dashboard.', time: '1h ago', unread: true },
    { id: 3, text: 'Legendary skin Aether Edge Neon Katana is on 20% sale!', time: '12h ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'games', label: 'Games' },
    { id: 'store', label: 'Store' },
    { id: 'community', label: 'Community' },
    { id: 'support', label: 'Support' },
    { id: 'dashboard', label: 'My Dashboard' }
  ];

  return (
    <header className="h-20 flex items-center justify-between px-6 sm:px-10 border-b border-white/5 bg-[#020204]/80 backdrop-blur-xl shrink-0 z-50 relative select-none">
      {/* Brand logo & rotating shield indicator */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="w-9 h-9 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center rotate-45 transform hover:rotate-90 transition-transform duration-500">
          <div className="w-4 h-4 border-2 border-white -rotate-45 flex items-center justify-center font-black text-xs">A</div>
        </div>
        <span className="hidden sm:inline-block ml-2 text-xl sm:text-2xl font-black tracking-tight uppercase italic font-sans">
          Aether<span className="text-cyan-400 font-bold neon-text-cyan">Grid</span>
        </span>
      </div>

      {/* Navigation menu */}
      <nav className="flex gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm font-bold uppercase tracking-widest overflow-x-auto py-2 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`transition-all duration-300 pb-1 border-b-2 hover:text-white cursor-pointer relative whitespace-nowrap ${
              activeTab === item.id
                ? 'text-cyan-400 border-cyan-400 font-black scale-105 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                : 'text-slate-400 border-transparent hover:border-white/10'
            }`}
          >
            {item.label}
            {item.id === 'dashboard' && (
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
            )}
          </button>
        ))}
      </nav>

      {/* User Status / Notification Hub / Character Avatar */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Quick Level Fire / Streak Indicators */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>7d Streak</span>
        </div>

        {/* Notifications list icon */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-[#020204]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-[#090912]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-50 text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400">Activity Logs</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] uppercase text-cyan-400 hover:underline cursor-pointer">
                    Mark Read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border ${
                      n.unread ? 'bg-white/5 border-cyan-500/20' : 'bg-black/30 border-white/5'
                    } text-xs transition-colors`}
                  >
                    <p className="text-slate-200 leading-tight">{n.text}</p>
                    <span className="text-[10px] opacity-40 block mt-1">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

        {/* Level Stats Block */}
        <div className="hidden sm:block text-right">
          <p className="text-[9px] uppercase tracking-wider opacity-60 font-black flex items-center justify-end gap-1">
            <Trophy className="w-2.5 h-2.5 text-cyan-400" /> Layer Level
          </p>
          <p className="text-sm font-black font-sans leading-none mt-1">
            Lv. 42 <span className="text-[10px] font-mono text-cyan-400">({xpPoints}% XP)</span>
          </p>
        </div>

        {/* Character Avatar Dropdown Trigger */}
        <button
          onClick={() => {
            setProfileOpen(!profileOpen);
            setNotificationsOpen(false);
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)] overflow-hidden transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
            <span className="text-sm font-black text-white tracking-widest font-mono">XS</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:text-cyan-400 ${profileOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Profile Details Dropdown box */}
        {profileOpen && (
          <div className="absolute right-0 top-12 mt-2 w-60 bg-[#07070f]/98 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-50 text-left">
            <div className="pb-3 border-b border-white/5">
              <p className="text-xs font-medium text-slate-400">Signed in as</p>
              <p className="text-sm font-black font-mono text-cyan-400">Xeno_Slayer_42</p>
            </div>
            <div className="py-2.5 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between py-1 px-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-cyan-400" /> Stats Terminal</span>
                <span className="text-[10px] bg-cyan-900/40 text-cyan-400 px-1.5 rounded">ONLINE</span>
              </div>
              <div className="flex items-center justify-between py-1 px-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <span className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-purple-400" /> Matrix Loadout</span>
                <span className="text-[10px] opacity-60 font-mono">4 / 4 equipped</span>
              </div>
              <div className="flex items-center justify-between py-1 px-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setActiveTab('support')}>
                <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-emerald-400" /> System Diagnostics</span>
                <span className="text-[10px] text-emerald-400">SECURE</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>Ping: 14ms</span>
              <button className="text-rose-400 cursor-pointer hover:underline flex items-center gap-1" onClick={() => alert('Diagnostic Handshake Reset Complete!')}>
                <LogOut className="w-2.5 h-2.5" /> Re-sync
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
