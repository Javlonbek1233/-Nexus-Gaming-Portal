import { Game, StoreItem, CommunityPost, SquadMember } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: 'neon-overdrive',
    title: 'Neon Overdrive',
    genre: 'Cyberpunk Action RPG',
    description: 'Dive into the electric streets of Neo-Tokyo. Fight through cyborg syndicates in the definitive open-world combat experience of 2026. Custom cyberwares, extreme hyper-cars with nitro drives, and real-time hacking puzzles await.',
    rating: 4.9,
    playtime: '142 hrs',
    status: 'Featured',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    videoPlaceholderUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    trailerTitle: 'Neon Overdrive - Official Cybernetic Reveal Trailer (4K)',
    accentColor: 'cyan',
    platforms: ['PC', 'Consoles', 'Cloud'],
    stats: {
      playersActive: '124,500',
      achievementsUnlocked: '18 / 40',
      fileSize: '82.4 GB'
    }
  },
  {
    id: 'cyber-siege-2',
    title: 'Cyber Siege 2',
    genre: 'Tactical Shooter',
    description: 'Defend neural nexus node sites or steal database matrices in highly competitive 5v5 tactical cyberspace duels. Place nanotech barriers, hack security terminals, and execute precision breach procedures.',
    rating: 4.7,
    playtime: '89 hrs',
    status: 'Update',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    accentColor: 'purple',
    platforms: ['PC', 'VR'],
    stats: {
      playersActive: '67,310',
      achievementsUnlocked: '22 / 50',
      fileSize: '45.1 GB'
    }
  },
  {
    id: 'star-drifter',
    title: 'Star Drifter',
    genre: 'Space Simulator',
    description: 'Chart uncharted star clusters, build deep-space trading outposts, and battle pirate armadas. Includes realistic orbital mechanics, starship damage modeling, and infinite procedurally generated space systems.',
    rating: 4.8,
    playtime: '190 hrs',
    status: 'Classic',
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop',
    accentColor: 'indigo',
    platforms: ['PC', 'Mainframe'],
    stats: {
      playersActive: '45,210',
      achievementsUnlocked: '38 / 60',
      fileSize: '120.0 GB'
    }
  },
  {
    id: 'steel-reborn',
    title: 'Steel Reborn',
    genre: 'Mecha Combat',
    description: 'Pilot customizable 50-tonne war machines across toxic wasteland war zones. Assemble power plants, laser weapon batteries, missile pods, and energy shielding grids, then test your design in brutal arena combat.',
    rating: 4.6,
    playtime: '64 hrs',
    status: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    accentColor: 'rose',
    platforms: ['PC', 'Consoles'],
    stats: {
      playersActive: '34,900',
      achievementsUnlocked: '12 / 30',
      fileSize: '58.7 GB'
    }
  },
  {
    id: 'hologram-arena',
    title: 'Hologram Arena',
    genre: 'Strategic MOBA',
    description: 'Select legendary hyper-heroes and lead squads into the neural-space hexagon arena. Coordinate holographic summons, construct fast defenses, and capture the ultimate central server core before the opposing team.',
    rating: 4.5,
    playtime: '210 hrs',
    status: 'Classic',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop',
    accentColor: 'emerald',
    platforms: ['PC', 'Mobile', 'Cloud'],
    stats: {
      playersActive: '189,440',
      achievementsUnlocked: '44 / 70',
      fileSize: '24.2 GB'
    }
  },
  {
    id: 'shadow-protocol',
    title: 'Shadow Protocol',
    genre: 'Stealth Rogue-like',
    description: 'Infiltrate high-security megacorp buildings in real-time isometric turn stealth. Hack security micro-bots, silence sound sensors, bypass security laser grids, and extract data crystals undetected.',
    rating: 4.8,
    playtime: '34 hrs',
    status: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    accentColor: 'yellow',
    platforms: ['PC', 'Mobile'],
    stats: {
      playersActive: '12,800',
      achievementsUnlocked: '9 / 25',
      fileSize: '15.0 GB'
    }
  }
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'item-1',
    name: 'Aether Edge Neon Katana',
    category: 'skins',
    price: '$14.99',
    rarity: 'Legendary',
    rarityColor: '#f59e0b', // Amber
    imageUrl: 'https://images.unsplash.com/photo-1589715970111-9f31278f2a9d?q=80&w=400&auto=format&fit=crop',
    description: 'A glowing plasma sword skin featuring real-time damage emission and custom slash sound waves.',
    stats: [
      { label: 'Energy Slash Glow', value: '+100%' },
      { label: 'Deflect FX Intensity', value: 'High' }
    ],
    inStock: true
  },
  {
    id: 'item-2',
    name: 'Specter HUD Visor Mask',
    category: 'skins',
    price: '$9.99',
    rarity: 'Epic',
    rarityColor: '#a855f7', // Purple
    imageUrl: 'https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?q=80&w=400&auto=format&fit=crop',
    description: 'An intimidating faceless smart visor which streams real-time battle telemetry on the visor mesh.',
    stats: [
      { label: 'Hologram Hue', value: 'Neon Purple' },
      { label: 'Armor Protection Bonus', value: '+0.0% (Skin-Only)' }
    ],
    inStock: true
  },
  {
    id: 'item-3',
    name: 'Overcharge Season Pass',
    category: 'passes',
    price: '$19.99',
    rarity: 'Legendary',
    rarityColor: '#f59e0b',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
    description: 'Instant levels boost (+20 Levels) and unlock 8 premium neon weapon wraps instantly.',
    stats: [
      { label: 'XP Multiplier Boost', value: '2.5x Speed' },
      { label: 'Weekly Loot Shards', value: '4 Premium Boxes' }
    ],
    inStock: true
  },
  {
    id: 'item-4',
    name: 'Aether Grid Mechanical Keyboard',
    category: 'hardware',
    price: '$129.99',
    rarity: 'Epic',
    rarityColor: '#22d3ee', // Cyan
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400&auto=format&fit=crop',
    description: 'Custom hot-swappable mechanical gaming keyboard featuring actual custom-mapped Aether lighting scripts.',
    stats: [
      { label: 'Switch Response Latency', value: '0.1ms Optical' },
      { label: 'Custom Neon Keycaps', value: 'Laser-Etched ABS' }
    ],
    inStock: true
  },
  {
    id: 'item-5',
    name: 'Grid Core GPU Hyper-Module',
    category: 'hardware',
    price: '$799.00',
    rarity: 'Legendary',
    rarityColor: '#ef4444', // Red
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400&auto=format&fit=crop',
    description: 'The ultimate AI core co-processor designed for real-time ray-reconstruction and 240FPS absolute fluid mechanics.',
    stats: [
      { label: 'Raytracing Cores', value: '96 Neural Engines' },
      { label: 'Grid Shielding Rating', value: 'Military Space Grade' }
    ],
    inStock: false
  },
  {
    id: 'item-6',
    name: 'Cyber Blade Plasma Rifle Wrapper',
    category: 'weapons',
    price: '$4.99',
    rarity: 'Common',
    rarityColor: '#94a3b8', // Gray
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=400&auto=format&fit=crop',
    description: 'Transform standard sniper rifles into carbon-fiber textured weapons glowing with active green currents.',
    stats: [
      { label: 'Chamber Heat FX', value: 'Green Plasma Smoke' }
    ],
    inStock: true
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Cyber_Vixen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      level: 54,
      badge: 'Sniper Prodigy'
    },
    content: 'Just managed to clear the Neural Sector 7 boss on Neon Overdrive in hardmode without utilizing any secondary armor stims! Pro-tip: Utilize the laser grapple to continuously stay suspended when the electric floor matrices trigger. Check my profile for full recording link!',
    timestamp: '2 hours ago',
    likes: 128,
    commentsCount: 32,
    comments: [
      { id: 'c1', author: 'Hex_Glitch', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', content: 'Incredibly insane reflexes! Are you using the custom Aether Keyboard with standard latency or controller?', timestamp: '1h ago' },
      { id: 'c2', author: 'Z-Xenon', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop', content: 'That floor transition of the floor matrices always kills my squad. We definitely need a grapple expert like you in our lobby tonight.', timestamp: '45m ago' }
    ],
    likedByCurrentUser: false
  },
  {
    id: 'post-2',
    author: {
      name: 'GhostProtocol',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      level: 67,
      badge: 'Aether Veteran'
    },
    content: 'The new weapon wraps in the upcoming Overcharge season pass look absolutely pristine. Let me know if anyone wants to team up to maximize our battle pass progression on double-XP weekends. I usually play around 19:00 - 23:00 UTC.',
    timestamp: '4 hours ago',
    likes: 92,
    commentsCount: 14,
    comments: [],
    likedByCurrentUser: true
  },
  {
    id: 'post-3',
    author: {
      name: 'Chronos_Pulse',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop',
      level: 21,
      badge: 'Grid Infiltrator'
    },
    content: 'Is anyone else experiencing a slight server jitter in Cyber Siege 2 around EU node servers? My typical 14ms ping suddenly jumps up to 120ms during defense breaches. Submitted diagnostic report terminal test in support and hoping they optimize routing soon.',
    timestamp: '1 day ago',
    likes: 45,
    commentsCount: 22,
    comments: [],
    likedByCurrentUser: false
  }
];

export const SQUAD_MEMBERS: SquadMember[] = [
  { id: 'sm-1', name: 'Shadow_Link', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop', level: 91, status: 'ingame', gameplaying: 'Cyber Siege 2', ping: 12 },
  { id: 'sm-2', name: 'Z-Xenon', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', level: 42, status: 'online', ping: 14 },
  { id: 'sm-3', name: 'Cyber_Vixen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', level: 54, status: 'ingame', gameplaying: 'Neon Overdrive', ping: 19 },
  { id: 'sm-4', name: 'HologramKid', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop', level: 16, status: 'offline', ping: 25 }
];

export const COMBAT_HISTORY = [
  { match: 'Match #152', date: 'May 20', result: 'Victory', kills: 14, deaths: 4, score: 3200, xpEarned: 1200, game: 'Cyber Siege 2', kd: 3.5 },
  { match: 'Match #151', date: 'May 19', result: 'Defeat', kills: 8, deaths: 9, score: 1850, xpEarned: 400, game: 'Cyber Siege 2', kd: 0.88 },
  { match: 'Match #150', date: 'May 18', result: 'Victory', kills: 19, deaths: 5, score: 4100, xpEarned: 1500, game: 'Neon Overdrive', kd: 3.8 },
  { match: 'Match #149', date: 'May 17', result: 'Victory', kills: 11, deaths: 3, score: 2700, xpEarned: 1000, game: 'Cyber Siege 2', kd: 3.66 },
  { match: 'Match #148', date: 'May 15', result: 'Victory', kills: 12, deaths: 6, score: 2900, xpEarned: 1100, game: 'Star Drifter', kd: 2.0 },
  { match: 'Match #147', date: 'May 14', result: 'Defeat', kills: 5, deaths: 7, score: 1200, xpEarned: 300, game: 'Steel Reborn', kd: 0.71 }
];

export const WEEKLY_PERFORMANCE = [
  { day: 'Mon', xp: 2400 },
  { day: 'Tue', xp: 4800 },
  { day: 'Wed', xp: 3200 },
  { day: 'Thu', xp: 6200 },
  { day: 'Fri', xp: 5100 },
  { day: 'Sat', xp: 8900 },
  { day: 'Sun', xp: 7200 }
];

export const WEAPONS_INVENTORY = [
  {
    id: 'w-1',
    name: 'Aether Katana V2',
    category: 'Melee',
    unlocked: true,
    damage: 94,
    speed: 98,
    glow: 'Cyan',
    desc: 'Upgraded version of our trademark holographic edge blade.',
    preview: '⚔️'
  },
  {
    id: 'w-2',
    name: 'Specter Plasma Rifle',
    category: 'Rifle',
    unlocked: true,
    damage: 85,
    speed: 72,
    glow: 'Purple',
    desc: 'Custom heavy electromagnetic weapon with thermal breach clips.',
    preview: '🔫'
  },
  {
    id: 'w-3',
    name: 'Neural Breach Pistol',
    category: 'Sidearm',
    unlocked: true,
    damage: 54,
    speed: 85,
    glow: 'Emerald',
    desc: 'Light tactical hand-blaster firing electromagnetic virus payloads.',
    preview: '🛡️'
  },
  {
    id: 'w-4',
    name: 'Singularity Railgun',
    category: 'Heavy',
    unlocked: false,
    unlockLevel: 50,
    damage: 100,
    speed: 15,
    glow: 'Rose',
    desc: 'Heavy weapon projecting miniature blackholes that fold standard shields.',
    preview: '☄️'
  }
];

export const SUPPORT_FAQS = [
  {
    q: "How do I sync my character level across Cloud and main PC versions?",
    a: "Level profile stats are automatically synchronized through your encrypted central Aether Net account key. Simply ensure you sign in with the exact credentials on both environments. Character progress and items will dynamically download during handshake verification."
  },
  {
    q: "What is the grid routing latency issue and how is it resolved?",
    a: "If you observe ping spikes exceeding 100ms, your terminal might be routed through suboptimal satellite subchannels. Navigate to Settings -> Networking -> Gateway Nodes inside our client app and switch your hub server node to 'Mainframe Grid Route A' or 'Grid Route B'."
  },
  {
    q: "Can I sell or trade weapon cosmetic skins with other squadmates?",
    a: "Trading of Legendary and Epic items is fully supported within our digital item store page. Simply view your purchase, click on the transfer crystal button, and type in your squadmate's verified profile identifier to execute the neural ledger contract transfer."
  },
  {
    q: "The Season 8 Battle Pass didn't load upon payment, what should I do?",
    a: "This occurs if the ledger transaction takes longer than 60s to confirm. You can force-clear your token database by executing the `REPAIR_GRID` instruction from our support terminal prompt. This queries the block register directly and refreshes state instantly."
  }
];
