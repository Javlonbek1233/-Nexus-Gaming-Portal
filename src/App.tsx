import { useState, useEffect } from 'react';
import { Game } from './types';
import { GAMES_DATA } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import GamesSection from './components/GamesSection';
import StoreSection from './components/StoreSection';
import CommunitySection from './components/CommunitySection';
import SupportSection from './components/SupportSection';
import DashboardSection from './components/DashboardSection';
import { Terminal, Shield, Cpu, RefreshCw, XCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [xpPoints, setXpPoints] = useState<number>(45); // Battle Pass progress
  const [creditBalance, setCreditBalance] = useState<number>(1520.00); // Live credit wallet
  
  // Local persistence inventories
  const [ownedGameIds, setOwnedGameIds] = useState<string[]>(['neon-overdrive', 'star-drifter']);
  const [inventoryItemIds, setInventoryItemIds] = useState<string[]>(['item-1', 'item-3']);

  // Selected game spec model (transferable to Games state)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Live online count simulated delta
  const [onlinePlayers, setOnlinePlayers] = useState<number>(1424902);

  // Virtual simulator handshake launcher state
  const [loadingSimulatorGame, setLoadingSimulatorGame] = useState<Game | null>(null);
  const [simLoadingProgress, setSimLoadingProgress] = useState(0);
  const [simulatingCoreActive, setSimulatingCoreActive] = useState<Game | null>(null);
  const [terminalBootLogs, setTerminalBootLogs] = useState<string[]>([]);

  // Simulation parameters for neural hacking canvas background
  useEffect(() => {
    const playerTimer = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor((Math.random() - 0.5) * 80));
    }, 4000);

    return () => clearInterval(playerTimer);
  }, []);

  // Simulating virtual server launch script
  useEffect(() => {
    if (!loadingSimulatorGame) return;

    setSimLoadingProgress(0);
    setTerminalBootLogs([
      `⚡ INITIALIZING HANDSHAKE SECURE TUNNEL [AETHER_NET_NODE_A]...`,
      `🔧 MATCHING METRIC BUFFERS FOR ${loadingSimulatorGame.title.toUpperCase()}...`,
      `📡 CONFIGURING DIRECT GRID PORT GATEWAY AT 0.0.0.0:3000...`
    ]);

    const progressTimer = setInterval(() => {
      setSimLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setSimulatingCoreActive(loadingSimulatorGame);
          setLoadingSimulatorGame(null);
          return 100;
        }

        const step = Math.floor(Math.random() * 15 + 10);
        const nextVal = Math.min(100, prev + step);

        if (nextVal > 30 && prev <= 30) {
          setTerminalBootLogs((prevLogs) => [
            ...prevLogs,
            `🟢 AUTHORIZATION SIGNATURE handshake validation ... VERIFIED [Level-42 Sentinel Certificate]`,
            `💾 EXPANDING DIRECT VIRTUAL STORAGE FILESYSTEM ... [OK - ${loadingSimulatorGame.stats.fileSize}]`
          ]);
        }
        if (nextVal > 70 && prev <= 70) {
          setTerminalBootLogs((prevLogs) => [
            ...prevLogs,
            `⚙️ RE-ALIGNING MULTI-CORE SHIELD INTRUSIONS EMISSION ... 100% SECURE`,
            `🚀 LAUNCHING CORE EMULATOR ENGINE MODULE ... READY`
          ]);
        }

        return nextVal;
      });
    }, 450);

    return () => clearInterval(progressTimer);
  }, [loadingSimulatorGame]);

  const handleLaunchSimulator = (game: Game) => {
    setLoadingSimulatorGame(game);
  };

  const terminateSimulator = () => {
    setSimulatingCoreActive(null);
    setTerminalBootLogs([]);
  };

  const handleHomeSelectGameSpecs = (game: Game) => {
    setSelectedGame(game);
    setActiveTab('games');
  };

  const toggleAddLibrary = (id: string) => {
    setOwnedGameIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(gId => gId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const addInventoryItem = (id: string) => {
    setInventoryItemIds((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#020204] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Absolute floating cyber grid accent layout background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),_linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Glow aura */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-cyan-700/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main header block */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} xpPoints={xpPoints} />

      {/* Primary Workspace Layout page switcher container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-start relative z-10 overflow-hidden">
        {activeTab === 'home' && (
          <HomeSection
            onPlayGame={handleLaunchSimulator}
            onSelectGame={handleHomeSelectGameSpecs}
            ownedGameIds={ownedGameIds}
            toggleAddLibrary={toggleAddLibrary}
          />
        )}

        {activeTab === 'games' && (
          <GamesSection
            onPlayGame={handleLaunchSimulator}
            ownedGameIds={ownedGameIds}
            toggleAddLibrary={toggleAddLibrary}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
        )}

        {activeTab === 'store' && (
          <StoreSection
            creditBalance={creditBalance}
            setCreditBalance={setCreditBalance}
            inventoryItemIds={inventoryItemIds}
            addInventoryItem={addInventoryItem}
          />
        )}

        {activeTab === 'community' && (
          <CommunitySection onlinePlayers={onlinePlayers} />
        )}

        {activeTab === 'support' && (
          <SupportSection />
        )}

        {activeTab === 'dashboard' && (
          <DashboardSection
            creditBalance={creditBalance}
            setCreditBalance={setCreditBalance}
            xpPoints={xpPoints}
            setXpPoints={setXpPoints}
            ownedGameIds={ownedGameIds}
            inventoryItemIds={inventoryItemIds}
          />
        )}
      </main>

      {/* Bottom footer bar status indicators */}
      <Footer onlinePlayers={onlinePlayers} />

      {/* Loading Handshake Overlay Simulator Modal */}
      {loadingSimulatorGame && (
        <div className="fixed inset-0 bg-[#020204] z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-xl p-8 bg-[#0a0a14] rounded-[2.5rem] border-2 border-dashed border-cyan-400/40 relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setLoadingSimulatorGame(null)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-16 h-16 bg-[#030308]/50 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] rounded-full flex items-center justify-center animate-spin mx-auto mb-6">
              <RefreshCw className="w-7 h-7" />
            </div>

            <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest font-black block">Handoff Gateway Access</span>
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight mt-1">Booting virtual launcher environment...</h3>
            
            <p className="text-xs text-slate-400 mt-2 font-mono italic">Establishing frame rates rendering at 240FPS for {loadingSimulatorGame.title}</p>

            {/* Custom Progress bar representation */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-mono text-cyan-400 mb-2 font-bold">
                <span>HANDSHAKE SECURE</span>
                <span>{simLoadingProgress}%</span>
              </div>
              <div className="h-2 w-full bg-white/15 rounded-full overflow-hidden border border-white/5 relative">
                <div style={{ width: `${simLoadingProgress}%` }} className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-300"></div>
              </div>
            </div>

            {/* Displaying active booting sequences logs in realistic terminals */}
            <div className="mt-8 bg-black p-4 rounded-xl border border-white/5 text-left font-mono text-[10px] sm:text-xs text-cyan-400 space-y-1.5 h-36 overflow-y-auto">
              {terminalBootLogs.map((log, idx) => (
                <p key={idx} className="leading-tight">{log}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Core Active Emulated Sandbox Simulator Viewport */}
      {simulatingCoreActive && (
        <div className="fixed inset-0 bg-[#020204] z-50 flex flex-col justify-between">
          {/* Simulation Header controls */}
          <div className="h-16 border-b border-cyan-400/20 bg-black/80 px-8 flex items-center justify-between z-10 font-mono">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black text-slate-100 uppercase tracking-wider">
                VIRTUALIZED CORE LIVE: <span className="text-cyan-400 neon-text-cyan">{simulatingCoreActive.title.toUpperCase()}</span>
              </span>
            </div>

            <button
              onClick={terminateSimulator}
              className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" /> Shutdown Stream Module
            </button>
          </div>

          {/* Core game emulator sandbox simulation canvas screen */}
          <div className="flex-1 bg-[#010102] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Retro cyberspace dashboard simulation with vector animations */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.95)_100%)]"></div>
            
            <div className="w-full max-w-4xl p-8 bg-[#0a0a14]/60 backdrop-blur-md rounded-3xl border border-white/10 text-center relative z-10 flex flex-col items-center">
              {/* Spinning circular HUD radar panel */}
              <div className="w-28 h-28 border-2 border-cyan-400 border-dashed rounded-full flex items-center justify-center animate-spin mb-6">
                <div className="w-20 h-20 border border-purple-400 border-dotted rounded-full flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-[#f1f1f5] uppercase font-sans">
                SYSTEM SIMULATOR ACTIVE
              </h2>
              
              <p className="text-sm text-slate-350 max-w-xl mt-3 leading-relaxed font-sans">
                You have successfully scaled compatibility configurations! Your Layer-Node Asia-Southeast is running the simulation loops securely. Frame rates synchronized at 240FPS with direct ray-reconstruction enabled.
              </p>

              {/* Functional simulator controls */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => alert(`SIMULATION INSTRUCTION: Ping test sequence dispatched to nodes. Average latency returns: 14ms.`)}
                  className="px-6 py-3 bg-white hover:bg-cyan-400 text-black font-black uppercase text-xs rounded-xl cursor-pointer"
                >
                  Verify Latency Ping
                </button>
                <button
                  onClick={() => {
                    setCreditBalance(prev => prev + 50);
                    alert(`SIMULATION BONUS: Acquired A$50.00 credits! Secure ledger ledger register synced.`);
                  }}
                  className="px-6 py-3 bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/40 rounded-xl font-mono text-xs font-bold cursor-pointer"
                >
                  Cheat: Inject A$ 50 Credits
                </button>
                <button
                  onClick={() => {
                    setXpPoints(Math.min(100, xpPoints + 15));
                    alert(`SIMULATION SUCCESS: Synchronized combat simulation! BP gained +15% XP.`);
                  }}
                  className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 rounded-xl font-mono text-xs font-bold cursor-pointer"
                >
                  Trigger Hacking Match (+15% XP)
                </button>
              </div>
            </div>

            {/* Glowing neon background loops design layout decorations */}
            <div className="absolute top-24 left-16 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-24 right-16 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
          </div>

          {/* Simulation Footer status bar */}
          <div className="h-10 border-t border-white/5 bg-black px-8 flex items-center justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase shrink-0">
            <span>Core Host Address: 0.0.0.0:3000</span>
            <span className="text-cyan-400">Simulation Status: 100% HEALTH</span>
          </div>
        </div>
      )}
    </div>
  );
}
