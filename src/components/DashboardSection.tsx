import { useState } from 'react';
import { Trophy, TrendingUp, Shield, HelpCircle, Activity, Star, Award, Zap, Sword, Settings, Play } from 'lucide-react';
import { COMBAT_HISTORY, WEAPONS_INVENTORY, WEEKLY_PERFORMANCE } from '../data';
import { Game } from '../types';

interface DashboardSectionProps {
  creditBalance: number;
  setCreditBalance: (bal: number) => void;
  xpPoints: number;
  setXpPoints: (xp: number) => void;
  ownedGameIds: string[];
  inventoryItemIds: string[];
}

export default function DashboardSection({
  creditBalance,
  setCreditBalance,
  xpPoints,
  setXpPoints,
  ownedGameIds,
  inventoryItemIds
}: DashboardSectionProps) {
  // Weapon loadout customizable states
  const [weapons, setWeapons] = useState(WEAPONS_INVENTORY);
  const [activeWeaponId, setActiveWeaponId] = useState('w-1');
  const [armorShieldRating, setArmorShieldRating] = useState(85); // Upgradable!
  
  // Custom dashboard interaction log
  const [actionLog, setActionLog] = useState<string | null>(null);

  const activeWeapon = weapons.find(w => w.id === activeWeaponId) || weapons[0];

  const handleEquipWeapon = (id: string, name: string) => {
    setActiveWeaponId(id);
    logDashboardAction(`EQUIP: Standard weapon node mapped to ${name}.`);
  };

  const handleUpgradeWeapon = (id: string) => {
    const cost = 150;
    if (creditBalance < cost) {
      alert('INSUFFICIENT AETHER CREDITS PROTOCOL! Earn more credits by completing games or managing the support command console.');
      return;
    }

    setCreditBalance(creditBalance - cost);
    setWeapons(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          damage: Math.min(100, w.damage + 2),
          speed: Math.min(100, w.speed + 1)
        };
      }
      return w;
    }));

    logDashboardAction(`UPGRADE: Weapon assembly successfully boosted! Credits spent: A$150.00.`);
  };

  const handleUpgradeArmor = () => {
    const cost = 200;
    if (creditBalance < cost) {
      alert('INSUFFICIENT CREDITS! Armor fabrication upgrades require at least A$200.00.');
      return;
    }

    setCreditBalance(creditBalance - cost);
    setArmorShieldRating(prev => Math.min(100, prev + 5));
    logDashboardAction(`FABRICATE: Neural nanotech shield matrix reinforced. Protection level +5%.`);
  };

  const handleTriggerRankUp = () => {
    if (xpPoints < 100) {
      // simulate training xp bump of +20 points
      setXpPoints(Math.min(100, xpPoints + 20));
      logDashboardAction(`TRAINING: Handshake test modules compiled! Gained +20% Battle Pass XP.`);
    } else {
      setXpPoints(0);
      alert('PROMOTION COMPLETE! Your character level has successfully escalated to Rank Level (Lv. 43)! All servers synchronized.');
      logDashboardAction(`LEVEL UP: Master sentinel tier upgraded to Rank 43.`);
    }
  };

  const logDashboardAction = (msg: string) => {
    setActionLog(msg);
    setTimeout(() => {
      setActionLog(null);
    }, 4500);
  };

  // High-fidelity custom SVG combat analytics charts graphs parameters
  // Weekly XP scores plotting points
  const points = WEEKLY_PERFORMANCE.map((p, idx) => {
    const x = 40 + idx * 50; // layout placement
    const maxVal = 9500;
    const y = 140 - (p.xp / maxVal) * 110; // SVG space projection height
    return { x, y, label: p.day, xp: p.xp };
  });

  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Left Column: Player Core Stats terminal & Loadout inventory modules config */}
      <div className="flex-[3] flex flex-col gap-5 overflow-y-auto pr-1">
        
        {/* Profile statistics headers */}
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_90%_10%,#a855f7_0%,transparent_50%)]"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-cyan-400 p-0.5 shadow-xl">
                <div className="w-full h-full bg-[#030308] rounded-xl flex items-center justify-center font-black text-cyan-400 font-sans tracking-widest text-[#eceff1]">
                  XS
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-100 flex items-center gap-1.5 font-sans">
                    Xeno_Slayer_42 <Award className="w-4 h-4 text-cyan-400 fill-current" />
                  </h2>
                  <span className="text-[9px] font-mono text-purple-400 bg-purple-950/20 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase font-bold">
                    Sentinel Leader
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Network Gateway: Asia-Southeast-Node-A1 (Online 14ms)</p>
              </div>
            </div>

            {/* Quick XP rank trigger */}
            <div className="text-right flex items-center gap-4">
              <div className="font-sans">
                <p className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Battle Pass Progression</p>
                <p className="text-sm font-black text-slate-200 mt-0.5">Lv. 42 <span className="text-cyan-400 font-mono text-xs">({xpPoints}% XP)</span></p>
                
                {/* Visual Level indicator bar */}
                <div className="h-1.5 w-32 bg-white/10 rounded-full mt-2 overflow-hidden relative">
                  <div style={{ width: `${xpPoints}%` }} className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                </div>
              </div>

              <button
                onClick={handleTriggerRankUp}
                className="px-4 py-2 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-400 text-cyan-400 hover:text-[#020204] font-black uppercase text-[10px] rounded-xl transition-all cursor-pointer"
              >
                {xpPoints >= 100 ? 'Escalate Rank' : 'Simulate Battle (+20 XP)'}
              </button>
            </div>
          </div>

          {actionLog && (
            <div className="mt-4 p-3 bg-cyan-950/10 border border-cyan-400/25 text-cyan-400 text-[10px] font-mono rounded-xl animate-fade">
              ⚙️ {actionLog}
            </div>
          )}
        </div>

        {/* Weapons loadout customizer inventory list */}
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-6">
            <Sword className="w-4 h-4 text-cyan-400 animate-pulse" /> Weapons Armory Loadout Customizer
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weapon modules specs */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {weapons.map((w) => {
                const isActive = w.id === activeWeaponId;
                
                return (
                  <div
                    key={w.id}
                    onClick={() => handleEquipWeapon(w.id, w.name)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      isActive 
                        ? 'bg-cyan-400/5 border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]' 
                        : 'bg-black/35 border-white/5 hover:bg-black/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-lg">
                        {w.preview}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{w.name}</h4>
                        <p className="text-[9px] text-slate-500 font-mono uppercase mt-0.5">{w.category}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {isActive ? (
                        <span className="text-[9px] text-[#020204] bg-cyan-400 font-black px-1.5 py-0.5 rounded uppercase font-mono shadow-[0_0_5px_#22d3ee]">
                          Equipped
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-500 font-mono uppercase">
                          Armory Core
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upgrade selected weapon component panel */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[8px] tracking-wider uppercase text-purple-400 font-black">Active Receptacle Control</span>
                <h4 className="text-sm font-black text-slate-200 mt-1 uppercase">{activeWeapon.name}</h4>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{activeWeapon.desc}</p>
                
                {/* Selected stats grids */}
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-400">
                      <span>PLASMA DAMAGE POWER</span>
                      <span className="font-bold text-cyan-400">{activeWeapon.damage} DPS</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div style={{ width: `${activeWeapon.damage}%` }} className="h-full bg-cyan-400"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-400">
                      <span>SWING EMISSION SPEED</span>
                      <span className="font-bold text-purple-400">{activeWeapon.speed}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div style={{ width: `${activeWeapon.speed}%` }} className="h-full bg-purple-400"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action upgrade button */}
              <div className="mt-6 pt-3.5 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] text-slate-500 font-mono">Upgrade: A$150.00</span>
                <button
                  onClick={() => handleUpgradeWeapon(activeWeapon.id)}
                  className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 font-black uppercase text-[9px] rounded-xl cursor-pointer transition-all"
                >
                  Enhance Receptacle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: High-fidelity custom graphs and live match histories logs */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1">
        
        {/* Custom High-fidelity SVG plot chart weekly performance */}
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-5 shrink-0 select-none">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-1.5 leading-none">
                <Activity className="w-3.5 h-3.5 text-purple-400" /> Weekly Combat Yield
              </h3>
              <p className="text-[9px] text-slate-500 mt-1 font-mono">Total score metrics compiled daily</p>
            </div>
            
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/20 px-2.5 py-1 rounded border border-cyan-500/10">
              Avg: 5,400 XP
            </span>
          </div>

          {/* SVG Custom graph design - No libraries to prevent build failure! */}
          <div className="relative bg-[#020204] border border-white/5 rounded-2xl p-2 h-44 flex items-center justify-center">
            <svg width="340" height="160" viewBox="0 0 340 160" className="w-full h-full">
              {/* Grid guides guidelines */}
              <line x1="30" y1="30" x2="330" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="85" x2="330" y2="85" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="140" x2="330" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Area path paint glow */}
              <path
                d={`${pathD} L ${points[points.length-1].x} 140 L ${points[0].x} 140 Z`}
                fill="url(#neon-grad)"
                opacity="0.15"
              />

              {/* Glowing Line outline paths */}
              <path
                d={pathD}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              />

              {/* Dots representation */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#22d3ee"
                    stroke="#020204"
                    strokeWidth="1.5"
                    className="cursor-pointer hover:r-6"
                  />
                  {/* Values label indicator text hover style */}
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fill="#ededf2"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {p.xp.toLocaleString()}
                  </text>
                  
                  {/* Axis day marks label */}
                  <text
                    x={p.x}
                    y="152"
                    textAnchor="middle"
                    fill="#52526b"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              {/* Def definitions colors gradients for graphics */}
              <defs>
                <linearGradient id="neon-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Combat Ledger lists history */}
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-5 h-64 flex flex-col justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 mb-3">
             Match Performance Records
          </h3>

          <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 h-28 scrollbar-none">
            {COMBAT_HISTORY.map((match, idx) => (
              <div key={idx} className="flex justify-between items-center bg-black/40 p-2.5 rounded-xl border border-white/5 text-[9px] font-mono leading-none">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-200 font-bold">{match.match}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400 font-sans">{match.game}</span>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-1.5">{match.date}</p>
                </div>

                <div className="text-right">
                  <p className={`font-black uppercase tracking-wider ${match.result === 'Victory' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {match.result}
                  </p>
                  <p className="text-slate-500 mt-1.5">K/D: {match.kd} ({match.kills} / {match.deaths})</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5 mt-4 border-t border-white/5 pt-3 text-[9px] font-mono justify-between text-slate-500 leading-none">
            <span>UNLOCKED: {inventoryItemIds.length} STORE CORES</span>
            <span>GAMES WORKSPACE: {ownedGameIds.length} INSTALLED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
