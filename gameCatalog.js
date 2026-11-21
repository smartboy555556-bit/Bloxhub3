const TOP_50 = [
  { id: 1, title: 'Brookhaven RP', genre: 'Roleplay', players: '412K', color: 'from-blue-600 to-sky-900', mode: 'city' },
  { id: 2, title: 'Blox Fruits', genre: 'Action', players: '389K', color: 'from-orange-600 to-red-900', mode: 'pirate' },
  { id: 3, title: 'Adopt Me!', genre: 'Roleplay', players: '145K', color: 'from-pink-500 to-rose-900', mode: 'city' },
  { id: 4, title: 'Tower of Hell', genre: 'Parkour', players: '68K', color: 'from-emerald-600 to-teal-900', mode: 'obby' },
  { id: 5, title: 'Murder Mystery 2', genre: 'Survival', players: '112K', color: 'from-red-700 to-zinc-900', mode: 'survival' },
  { id: 6, title: 'Blade Ball', genre: 'Action', players: '94K', color: 'from-indigo-600 to-purple-950', mode: 'arena' },
  { id: 7, title: 'Pet Simulator 99', genre: 'Tycoon', players: '85K', color: 'from-amber-500 to-orange-900', mode: 'tycoon' },
  { id: 8, title: 'Doors', genre: 'Survival', players: '54K', color: 'from-stone-700 to-neutral-950', mode: 'survival' },
  { id: 9, title: 'BedWars', genre: 'Action', players: '61K', color: 'from-cyan-600 to-blue-950', mode: 'arena' },
  { id: 10, title: 'Berry Avenue RP', genre: 'Roleplay', players: '77K', color: 'from-fuchsia-600 to-purple-900', mode: 'city' },
  { id: 11, title: 'Dress To Impress', genre: 'Roleplay', players: '190K', color: 'from-rose-400 to-pink-900', mode: 'city' },
  { id: 12, title: 'The Strongest Battlegrounds', genre: 'Action', players: '132K', color: 'from-slate-600 to-slate-950', mode: 'arena' },
  { id: 13, title: 'Royale High', genre: 'Roleplay', players: '32K', color: 'from-violet-600 to-indigo-950', mode: 'city' },
  { id: 14, title: 'Welcome to Bloxburg', genre: 'Roleplay', players: '48K', color: 'from-teal-600 to-emerald-950', mode: 'city' },
  { id: 15, title: 'Jailbreak', genre: 'Action', players: '29K', color: 'from-amber-600 to-stone-900', mode: 'city' },
  { id: 16, title: 'Natural Disaster Survival', genre: 'Survival', players: '41K', color: 'from-green-600 to-emerald-950', mode: 'survival' },
  { id: 17, title: 'Arsenal', genre: 'Action', players: '24K', color: 'from-red-600 to-orange-950', mode: 'arena' },
  { id: 18, title: 'Livetopia', genre: 'Roleplay', players: '36K', color: 'from-sky-500 to-blue-900', mode: 'city' },
  { id: 19, title: 'Theme Park Tycoon 2', genre: 'Tycoon', players: '22K', color: 'from-yellow-500 to-amber-900', mode: 'tycoon' },
  { id: 20, title: 'Bee Swarm Simulator', genre: 'Tycoon', players: '39K', color: 'from-yellow-400 to-orange-800', mode: 'tycoon' },
  { id: 21, title: 'Anime Defenders', genre: 'Action', players: '71K', color: 'from-purple-600 to-slate-950', mode: 'pirate' },
  { id: 22, title: 'Sol RNG', genre: 'Tycoon', players: '64K', color: 'from-indigo-500 to-zinc-950', mode: 'tycoon' },
  { id: 23, title: 'Dusty Trip', genre: 'Survival', players: '58K', color: 'from-orange-700 to-amber-950', mode: 'survival' },
  { id: 24, title: 'Evade', genre: 'Survival', players: '33K', color: 'from-zinc-700 to-black', mode: 'survival' },
  { id: 25, title: '3008', genre: 'Survival', players: '27K', color: 'from-blue-700 to-yellow-900', mode: 'survival' },
  { id: 26, title: 'Piggy', genre: 'Survival', players: '19K', color: 'from-pink-700 to-zinc-950', mode: 'survival' },
  { id: 27, title: 'Work at a Pizza Place', genre: 'Roleplay', players: '25K', color: 'from-red-500 to-yellow-900', mode: 'tycoon' },
  { id: 28, title: 'Mega Easy Obby', genre: 'Parkour', players: '31K', color: 'from-lime-500 to-green-900', mode: 'obby' },
  { id: 29, title: 'Escape Running Head', genre: 'Parkour', players: '18K', color: 'from-emerald-500 to-cyan-950', mode: 'obby' },
  { id: 30, title: 'Obby But You Are On A Bike', genre: 'Parkour', players: '26K', color: 'from-cyan-500 to-teal-950', mode: 'obby' },
  { id: 31, title: 'Speed Run 4', genre: 'Parkour', players: '15K', color: 'from-violet-500 to-purple-950', mode: 'obby' },
  { id: 32, title: 'Floor Is Lava', genre: 'Parkour', players: '21K', color: 'from-orange-500 to-red-950', mode: 'survival' },
  { id: 33, title: 'King Legacy', genre: 'Action', players: '23K', color: 'from-amber-500 to-red-950', mode: 'pirate' },
  { id: 34, title: 'Grand Piece Online', genre: 'Action', players: '17K', color: 'from-blue-500 to-indigo-950', mode: 'pirate' },
  { id: 35, title: 'Shindo Life', genre: 'Action', players: '16K', color: 'from-red-600 to-stone-950', mode: 'pirate' },
  { id: 36, title: 'All Star Tower Defense', genre: 'Action', players: '20K', color: 'from-yellow-600 to-purple-950', mode: 'arena' },
  { id: 37, title: 'Lumber Tycoon 2', genre: 'Tycoon', players: '14K', color: 'from-amber-700 to-green-950', mode: 'tycoon' },
  { id: 38, title: 'Restaurant Tycoon 2', genre: 'Tycoon', players: '19K', color: 'from-rose-500 to-amber-900', mode: 'tycoon' },
  { id: 39, title: 'Car Dealership Tycoon', genre: 'Tycoon', players: '28K', color: 'from-blue-600 to-slate-900', mode: 'tycoon' },
  { id: 40, title: 'Military Tycoon', genre: 'Tycoon', players: '18K', color: 'from-green-700 to-stone-950', mode: 'tycoon' },
  { id: 41, title: 'Super League Soccer', genre: 'Action', players: '34K', color: 'from-emerald-600 to-green-950', mode: 'arena' },
  { id: 42, title: 'Blue Lock Rivals', genre: 'Action', players: '82K', color: 'from-blue-500 to-cyan-950', mode: 'arena' },
  { id: 43, title: 'Fisch', genre: 'Adventure', players: '120K', color: 'from-teal-500 to-blue-950', mode: 'pirate' },
  { id: 44, title: 'Rivals FPS', genre: 'Action', players: '95K', color: 'from-orange-500 to-zinc-950', mode: 'arena' },
  { id: 45, title: 'Dandy World', genre: 'Survival', players: '67K', color: 'from-purple-500 to-pink-950', mode: 'survival' },
  { id: 46, title: 'Catalog Avatar Creator', genre: 'Roleplay', players: '53K', color: 'from-indigo-500 to-blue-900', mode: 'city' },
  { id: 47, title: 'Pls Donate', genre: 'Tycoon', players: '44K', color: 'from-green-500 to-emerald-900', mode: 'tycoon' },
  { id: 48, title: 'Build A Boat For Treasure', genre: 'Adventure', players: '37K', color: 'from-sky-600 to-amber-900', mode: 'pirate' },
  { id: 49, title: 'Slap Battles', genre: 'Action', players: '46K', color: 'from-yellow-500 to-red-900', mode: 'arena' },
  { id: 50, title: 'Da Hood', genre: 'Roleplay', players: '39K', color: 'from-neutral-700 to-zinc-950', mode: 'city' }
];

const EXTRA_THEMES = [
  // 30 Curated Themes x 10 Editions = 300 Additional Games (IDs 51 to 350)
  { base: 'Anime Vanguards', genre: 'Action', mode: 'pirate', color: 'from-purple-600 to-indigo-950' },
  { base: 'Pressure Underwater', genre: 'Survival', mode: 'survival', color: 'from-cyan-800 to-slate-950' },
  { base: 'Jujutsu Shenanigans', genre: 'Action', mode: 'arena', color: 'from-blue-700 to-purple-950' },
  { base: 'SpongeBob Tower Defense', genre: 'Action', mode: 'pirate', color: 'from-yellow-400 to-sky-900' },
  { base: 'Basketball Legends', genre: 'Action', mode: 'arena', color: 'from-orange-600 to-zinc-900' },
  { base: 'Driving Empire', genre: 'Roleplay', mode: 'city', color: 'from-red-600 to-slate-900' },
  { base: 'Greenville Wisconsin RP', genre: 'Roleplay', mode: 'city', color: 'from-emerald-600 to-slate-900' },
  { base: 'Emergency Response Liberty', genre: 'Roleplay', mode: 'city', color: 'from-blue-700 to-red-950' },
  { base: 'Southwest Florida RP', genre: 'Roleplay', mode: 'city', color: 'from-teal-500 to-amber-900' },
  { base: 'Phantom Forces FPS', genre: 'Action', mode: 'arena', color: 'from-slate-600 to-zinc-950' },
  { base: 'Rainbow Friends', genre: 'Survival', mode: 'survival', color: 'from-blue-600 to-pink-900' },
  { base: 'Garten of Banban RP', genre: 'Survival', mode: 'survival', color: 'from-green-600 to-rose-950' },
  { base: 'Skibidi Toilet Tower', genre: 'Action', mode: 'arena', color: 'from-zinc-600 to-amber-950' },
  { base: 'Toilet Tower Defense', genre: 'Tycoon', mode: 'tycoon', color: 'from-sky-600 to-indigo-950' },
  { base: 'Anime Last Stand', genre: 'Action', mode: 'pirate', color: 'from-rose-600 to-purple-950' },
  { base: 'Fruit Battlegrounds', genre: 'Action', mode: 'pirate', color: 'from-orange-500 to-amber-900' },
  { base: 'Type Soul', genre: 'Action', mode: 'arena', color: 'from-neutral-700 to-blue-950' },
  { base: 'Peroxide', genre: 'Action', mode: 'arena', color: 'from-indigo-600 to-black' },
  { base: 'Deepwoken Seas', genre: 'Adventure', mode: 'pirate', color: 'from-teal-700 to-slate-950' },
  { base: 'Tower Defense Simulator', genre: 'Action', mode: 'arena', color: 'from-blue-600 to-zinc-900' },
  { base: 'Escape School Obby', genre: 'Parkour', mode: 'obby', color: 'from-yellow-500 to-red-900' },
  { base: 'Escape Dentist Obby', genre: 'Parkour', mode: 'obby', color: 'from-cyan-400 to-blue-900' },
  { base: 'Glass Bridge Squid', genre: 'Parkour', mode: 'obby', color: 'from-pink-600 to-teal-950' },
  { base: 'Cart Ride Into RDite', genre: 'Adventure', mode: 'obby', color: 'from-amber-600 to-zinc-900' },
  { base: 'Super Hero Tycoon', genre: 'Tycoon', mode: 'tycoon', color: 'from-red-600 to-blue-950' },
  { base: 'Clone Tycoon 2', genre: 'Tycoon', mode: 'tycoon', color: 'from-emerald-500 to-slate-900' },
  { base: 'Retail Tycoon 2', genre: 'Tycoon', mode: 'tycoon', color: 'from-blue-500 to-indigo-900' },
  { base: 'Mining Simulator 2', genre: 'Adventure', mode: 'tycoon', color: 'from-amber-600 to-stone-950' },
  { base: 'Hide and Seek Extreme', genre: 'Survival', mode: 'survival', color: 'from-violet-600 to-blue-950' },
  { base: 'Epic Minigames', genre: 'Adventure', mode: 'arena', color: 'from-fuchsia-500 to-indigo-900' }
];

const EDITIONS = ['Original', 'Pro', '2026', 'X', 'Turbo', 'Ultimate', 'VIP', 'Mega', 'Legends', 'World'];

const GENERATED_300 = [];
let nextId = 51;

for (let e = 0; e < EDITIONS.length; e++) {
  for (let t = 0; t < EXTRA_THEMES.length; t++) {
    const item = EXTRA_THEMES[t];
    const playerCount = (((nextId * 7) % 45) + 3) + 'K';
    GENERATED_300.push({
      id: nextId++,
      title: e === 0 ? item.base : ${item.base} ${EDITIONS[e]},
      genre: item.genre,
      players: playerCount,
      color: item.color,
      mode: item.mode
      });
      }
      }
      export const GAMES_CATALOG = [...TOP_50, ...GENERATED_300];