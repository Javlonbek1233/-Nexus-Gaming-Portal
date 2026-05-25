import { Radio, Zap, Activity } from 'lucide-react';

interface FooterProps {
  onlinePlayers?: number;
}

export default function Footer({ onlinePlayers = 1424902 }: FooterProps) {
  return (
    <footer className="h-14 sm:h-12 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between bg-black/80 text-[10px] uppercase font-bold tracking-[0.15em] border-t border-white/5 shrink-0 select-none z-10 text-slate-400 gap-2 sm:gap-0 py-2 sm:py-0">
      {/* Live system telemetries */}
      <div className="flex gap-4 sm:gap-8 items-center text-center sm:text-left">
        <span className="text-cyan-400 font-sans flex items-center gap-1.5 filter drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Online Matrices: {onlinePlayers.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Node Diagnostic Ping: 14ms</span>
        </span>
        <span className="hidden md:flex items-center gap-1.5 text-purple-400">
          <Activity className="w-3 h-3" />
          <span>Handshake Protocol: Secure v4.21</span>
        </span>
      </div>

      {/* Corporate placeholders */}
      <div className="flex gap-4 sm:gap-6 opacity-60 text-[9px] font-mono">
        <a href="#terms" className="hover:text-cyan-400 hover:opacity-100 transition-colors">Grid-Terms</a>
        <a href="#privacy" className="hover:text-cyan-400 hover:opacity-100 transition-colors">Privacy_Matrix</a>
        <a href="#cookies" className="hover:text-cyan-400 hover:opacity-100 transition-colors">Sub-Processors</a>
        <span className="hidden lg:inline">&copy; {new Date().getFullYear()} AetherGrid Systems Inc.</span>
      </div>
    </footer>
  );
}
