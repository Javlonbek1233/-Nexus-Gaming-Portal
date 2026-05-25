import { useState } from 'react';
import { Search, Gamepad2, Play, Download, Trash2, Cpu, Laptop, CheckCircle2, Star, ShieldAlert } from 'lucide-react';
import { Game } from '../types';
import { GAMES_DATA } from '../data';

interface GamesSectionProps {
  onPlayGame: (game: Game) => void;
  ownedGameIds: string[];
  toggleAddLibrary: (id: string) => void;
  selectedGame: Game | null;
  setSelectedGame: (game: Game | null) => void;
}

export default function GamesSection({
  onPlayGame,
  ownedGameIds,
  toggleAddLibrary,
  selectedGame,
  setSelectedGame
}: GamesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  // Benchmark test configurations
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState<string | null>(null);

  const genres = ['All', 'Cyberpunk', 'Tactical', 'Space', 'Mecha', 'Strategic', 'Stealth'];

  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.genre.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedGenre === 'All') return matchesSearch;
    return matchesSearch && game.genre.toLowerCase().includes(selectedGenre.toLowerCase());
  });

  const runSystemBenchmark = () => {
    setBenchmarking(true);
    setBenchmarkResult(null);
    setTimeout(() => {
      setBenchmarking(false);
      // Let's decide a fun cybernetic hardware validation score
      const score = Math.random() > 0.15 
        ? 'STABLE (PASS) - Decrypted graphics engine matches layer core. Framerate locked at 240FPS!'
        : 'LATENCY DUPLICATE - Recommended to disable visual anti-aliasing buffers to prevent screen tear.';
      setBenchmarkResult(score);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/5 rounded-3xl p-5 shrink-0">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-100">Mainframe Deck Modules</h2>
            <p className="text-[10px] text-slate-400">Manage and execute simulation clusters on demand</p>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search game clusters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500 font-mono"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all border shrink-0 ${
              selectedGenre === genre
                ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Games Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const isOwned = ownedGameIds.includes(game.id);
          
          return (
            <div
              key={game.id}
              onClick={() => {
                setSelectedGame(game);
                setBenchmarkResult(null); // clear benchmark cache
              }}
              className="bg-[#0b0b13] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-cyan-400/20 shadow-lg hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Card visual wrapper */}
              <div className="relative h-44 overflow-hidden bg-black/45">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-[1.04] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badges */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="px-2.5 py-0.5 bg-black/60 border border-white/10 text-[9px] font-bold uppercase rounded text-cyan-400 tracking-wide">
                    {game.genre}
                  </span>
                </div>

                {/* Bottom specs metadata preview */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] text-white font-mono bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                  <span>Size: {game.stats.fileSize}</span>
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-100 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Card execution buttons */}
                <div className="mt-5 pt-4 border-t border-white/5 flex gap-2 items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {game.platforms.join(' | ')}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAddLibrary(game.id);
                      }}
                      className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isOwned 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                      title={isOwned ? 'Delete from Library' : 'Acquire to Library'}
                    >
                      {isOwned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayGame(game);
                      }}
                      className="px-4 py-2 bg-white text-black hover:bg-cyan-400 hover:text-black font-black uppercase text-[10px] rounded-xl transition-all cursor-pointer flex items-center gap-1 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    >
                      <Play className="w-3 h-3 fill-current" /> Execute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cyber Hardware Spec assessment Overlay / Detail Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-[#020204]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-[#090913] rounded-[2.5rem] border border-cyan-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-6 right-6">
              <button
                onClick={() => {
                  setSelectedGame(null);
                  setBenchmarkResult(null);
                }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Graphic thumbnail details */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="h-40 rounded-2xl overflow-hidden bg-black border border-white/10 relative">
                  <img
                    src={selectedGame.imageUrl}
                    alt={selectedGame.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#020204]/80 text-[10px] font-mono border border-white/15 rounded-md text-white font-bold">
                    ACTIVE SESSIONS: {selectedGame.stats.playersActive}
                  </span>
                </div>

                {/* Play, save buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      onPlayGame(selectedGame);
                    }}
                    className="py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase text-xs rounded-xl hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Launch Core
                  </button>
                  
                  <button
                    onClick={() => toggleAddLibrary(selectedGame.id)}
                    className={`py-3 rounded-xl font-bold uppercase text-xs border cursor-pointer transition-colors text-center ${
                      ownedGameIds.includes(selectedGame.id) 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {ownedGameIds.includes(selectedGame.id) ? 'Deploy Remove' : 'Save Module'}
                  </button>
                </div>
              </div>

              {/* System specifications details benchmark tool */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest block">Simulation Spec Benchmark</span>
                  <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight mt-1">{selectedGame.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{selectedGame.description}</p>
                  
                  {/* Benchmarking specs requirement blocks list */}
                  <div className="mt-4 space-y-2 border-t border-b border-white/5 py-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500 flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> Core Requirement</span>
                      <span className="text-slate-300">Intel i7 Octa-Core 3.8GHz</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500 flex items-center gap-1"><Laptop className="w-3.5 h-3.5" /> Graphics Renderer</span>
                      <span className="text-slate-300">NVIDIA RTX 4070 Grid-vS</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500">Local Vector Matrix Space</span>
                      <span className="text-slate-300">{selectedGame.stats.fileSize}</span>
                    </div>
                  </div>
                </div>

                {/* Benchmark Execution Simulator */}
                <div className="mt-4 bg-[#030308] border border-white/5 rounded-2xl p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Handshake Compatibility Hardware</span>
                    <button
                      onClick={runSystemBenchmark}
                      disabled={benchmarking}
                      className="px-3 py-1 bg-[#10101b] border border-cyan-400/40 text-cyan-400 hover:bg-[#1a1a2b] transition-colors rounded-lg text-[9px] font-black font-mono uppercase cursor-pointer"
                    >
                      {benchmarking ? 'Analyzing...' : 'Test Handshake'}
                    </button>
                  </div>

                  {benchmarkResult ? (
                    <div className={`text-[10px] font-mono leading-tight px-3 py-2 rounded-xl flex gap-2 border ${
                      benchmarkResult.includes('STABLE') 
                        ? 'bg-emerald-900/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)]' 
                        : 'bg-amber-900/10 border-amber-500/20 text-amber-400'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{benchmarkResult}</span>
                    </div>
                  ) : benchmarking ? (
                    <div className="h-8 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce decoration-200"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce decoration-400"></div>
                    </div>
                  ) : (
                    <p className="text-[10px] italic text-slate-500 text-center font-mono py-1">Ready to run digital diagnostics test.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
