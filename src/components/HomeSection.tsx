import { useState, useRef, useEffect } from 'react';
import { Play, Plus, Volume2, Maximize2, Shield, Flame, Terminal, Star, Sparkles, ExternalLink } from 'lucide-react';
import { Game } from '../types';
import { GAMES_DATA } from '../data';

interface HomeSectionProps {
  onPlayGame: (game: Game) => void;
  onSelectGame: (game: Game) => void;
  ownedGameIds: string[];
  toggleAddLibrary: (id: string) => void;
}

export default function HomeSection({ onPlayGame, onSelectGame, ownedGameIds, toggleAddLibrary }: HomeSectionProps) {
  const [heroGame, setHeroGame] = useState<Game>(GAMES_DATA[0]); // Neon Overdrive
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [glitchFactor, setGlitchFactor] = useState(0.15);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Custom Canvas Gameplay Animation Player Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Canvas animation reflecting game stream simulation!
  useEffect(() => {
    if (!isVideoModalOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;
    
    // Particle arrays for vector stream simulation
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 3 + 1,
        color: Math.random() > 0.4 ? '#22d3ee' : '#a855f7' // cyan or purple
      });
    }

    const render = () => {
      if (!ctx || !canvas) return;
      frameCount++;

      // Background matrix grid style
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render grid grid-lines lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and update vectors (combats particles)
      particles.forEach((p) => {
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;

          // bounce boundaries
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw vector lines between particles
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Simulated Cyber holographic ring
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 3;
      ctx.arc(cx, cy, 140 + Math.sin(frameCount * 0.05) * 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([15, 10]);
      ctx.arc(cx, cy, 100 - Math.sin(frameCount * 0.02) * 5, frameCount * 0.01, frameCount * 0.01 + Math.PI * 1.5);
      ctx.stroke();
      ctx.setLineDash([]); // clear

      // HUD overlays
      ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`STREAMING LINK STATE_A: CORE_UP`, 40, 50);
      ctx.fillText(`STABILITY: ${(100 - glitchFactor * 100).toFixed(0)}%`, 40, 70);
      ctx.fillText(`RENDER FREQUENCY: 240 FPS`, canvas.width - 250, 50);
      ctx.fillText(`NODE: MAIN_HUB_GATEWAY_V`, canvas.width - 250, 70);

      // Draw visual combat simulation targets
      const tx = cx + Math.cos(frameCount * 0.03) * 110;
      const ty = cy + Math.sin(frameCount * 0.03) * 110;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.drawRound = true;
      ctx.arc(tx, ty, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.fillText(`LOCK_ON`, tx + 20, ty + 5);

      // Simulation of digital horizontal scan glitch lines
      if (Math.random() < glitchFactor) {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, Math.random() * 20 + 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, Math.random() * 20 + 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideoModalOpen, isPlaying, glitchFactor]);

  const quickGridGames = GAMES_DATA.slice(1, 4); // Cyber Siege 2, Star Drifter, Steel Reborn

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
      {/* Immersive Animated Game Hero Area */}
      <div className="relative h-96 sm:h-[420px] rounded-[2.5rem] overflow-hidden bg-[#0c0c16] border border-white/10 group shadow-2xl shadow-cyan-950/20 shrink-0">
        {/* Glowing backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_75%_35%,#3b82f6_0%,transparent_50%)]"></div>
        
        {/* Image wallpaper depicting the game */}
        <img
          src={heroGame.videoPlaceholderUrl || heroGame.imageUrl}
          alt={heroGame.title}
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-[1.03] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic ambient grid elements to enhance cyberspace motif */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,_rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none"></div>

        {/* Floating cyber widgets */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <span className="px-3 py-1 bg-[#020204]/90 backdrop-blur-md rounded-full text-[9px] font-bold font-mono text-cyan-400 border border-cyan-400/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
            ACTIVE NODES: {heroGame.stats.playersActive}
          </span>
        </div>

        {/* Content Block of the Hero Game */}
        <div className="absolute bottom-8 left-6 sm:left-10 z-20 max-w-xl pr-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-cyan-500 text-[#020204] text-[9px] font-black uppercase rounded tracking-wider">
              {heroGame.status} Launcher
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase rounded tracking-wider">
              {heroGame.genre}
            </span>
            <div className="flex items-center gap-0.5 text-amber-400 bg-black/40 px-2 py-0.5 rounded-md text-[10px] font-mono">
              <Star className="w-3 h-3 fill-current" />
              <span>{heroGame.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black italic uppercase tracking-tighter mb-3 leading-none text-white">
            Neon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">{heroGame.title.split(' ')[1] || 'Overdrive'}</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed opacity-90 font-sans">
            {heroGame.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onPlayGame(heroGame)}
              className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase text-xs rounded-full hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Play Live Simulator
            </button>
            
            <button
              onClick={() => toggleAddLibrary(heroGame.id)}
              className={`px-6 py-2.5 border backdrop-blur-md text-white font-black uppercase text-xs rounded-full transition-all cursor-pointer flex items-center gap-2 ${
                ownedGameIds.includes(heroGame.id)
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20'
                  : 'bg-white/5 border-white/20 hover:bg-white/15'
              }`}
            >
              {ownedGameIds.includes(heroGame.id) ? '✓ Saved in Library' : <><Plus className="w-3.5 h-3.5" /> Acquire Module</>}
            </button>

            <button
              onClick={() => onSelectGame(heroGame)}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 rounded-full text-xs font-bold"
            >
              System Specs
            </button>
          </div>
        </div>

        {/* Rotating Animated Play Action Circle Placeholder */}
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-x-[150px] lg:translate-x-[200px] -translate-y-12 w-20 h-20 bg-[#020204]/80 backdrop-blur-xl border-2 border-cyan-400 rounded-full flex items-center justify-center group-hover:scale-110 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer group/btn"
          title="Watch Interactive Live Stream"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-purple-400 animate-spin opacity-50"></div>
          <Play className="w-6 h-6 text-cyan-400 fill-cyan-400 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </button>
      </div>

      {/* Grid items under Hero showcasing secondary tiles */}
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-1.5 mb-2 pl-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hot Cyberspace Systems
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickGridGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/5 shadow-md hover:border-cyan-500/20 transition-all duration-300 cursor-pointer flex flex-col group"
            >
              {/* Image thumbnail */}
              <div className="w-full h-24 bg-black/40 rounded-xl mb-3 overflow-hidden relative">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 right-2 text-[8px] bg-black/60 border border-white/5 text-slate-300 font-mono px-2 py-0.5 rounded uppercase">
                  {game.genre.split(' ')[0]}
                </span>
                
                {/* Simulated equalizer animation reflecting diagnostic state */}
                <div className="absolute bottom-2 left-2 flex gap-0.5 items-end h-3">
                  <div className="w-0.5 bg-cyan-400 animate-pulse h-1"></div>
                  <div className="w-0.5 bg-cyan-400 animate-pulse h-3 animation-delay-75"></div>
                  <div className="w-0.5 bg-cyan-400 animate-pulse h-2 animation-delay-150"></div>
                  <div className="w-0.5 bg-cyan-400 animate-pulse h-1.5"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                    {game.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {game.description}
                  </p>
                </div>
                
                <div className="mt-3 pt-2.5 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>{game.stats.playersActive} ONLINE</span>
                  <span className="text-cyan-400 flex items-center gap-1 hover:underline">
                    Launcher Specs <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cyber Space Stream Simulation Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-[#020204]/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl bg-[#080811] rounded-[2rem] border border-cyan-400/40 p-6 shadow-2xl overflow-hidden relative">
            <div className="cyber-scanner absolute inset-0 opacity-15 pointer-events-none"></div>

            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white">
                  Handshake Stream: <span className="text-cyan-400">{heroGame.title} (Live Synth)</span>
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Custom Interactive Canvas Graphics Game Simulator */}
            <div className="relative bg-[#020204] rounded-2xl overflow-hidden border border-white/10 flex justify-center items-center" style={{ height: '320px' }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={350}
                className="w-full h-full block"
              />
              
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <Play className="w-12 h-12 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AETHER_SIMULATOR_PAUSED</span>
                </div>
              )}
            </div>

            {/* Simulated Live Stream Feed Comments */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-[10px] text-cyan-400 font-mono uppercase mb-1">Vector Glitch Interference</p>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={glitchFactor}
                  onChange={(e) => setGlitchFactor(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1">
                  <span>STABLE CORE (0.0)</span>
                  <span>CURRENT: {glitchFactor.toFixed(2)}</span>
                  <span>TOTAL DAMAGE (0.8)</span>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase text-slate-200 cursor-pointer"
                >
                  {isPlaying ? 'Pause Simulator' : 'Resume Simulator'}
                </button>
                <button
                  onClick={() => onPlayGame(heroGame)}
                  className="px-4 py-2 bg-cyan-400 text-[#020204] hover:bg-cyan-500 rounded-xl text-xs font-black uppercase cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                >
                  Launch Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
