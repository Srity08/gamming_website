// ===== Game catalogue: edit this file to add/remove/organise games =====
// embedUrl: same-origin path (e.g. "games/x.html") or https URL whose host is in CONFIG.allowedEmbedHosts.
// Leave embedUrl empty ("") for a game that is not integrated yet: the portal shows "Coming soon", never a fake game.
export const CONFIG = {
  siteName: "PlayHub",
  allowedEmbedHosts: [],          // e.g. ["html5.gamedistribution.com"] (only after you have a licence/agreement)
  membershipEnabled: false        // flip to true when ad-free membership exists
};
export const CATEGORIES = [
  { name: "Puzzle", emoji: "🧩" }, { name: "Action", emoji: "⚔️" }, { name: "Racing", emoji: "🏎️" },
  { name: "Arcade", emoji: "👾" }, { name: "Adventure", emoji: "🗺️" }, { name: "Brain Training", emoji: "🧠" }
];
export const GAMES = [
  { id: "dot-tap", title: "Dot Tap", category: "Arcade", emoji: "🎯", colors: ["#ff3d81", "#ffb347"],
    description: "Tap the glowing dot as many times as you can in 20 seconds. Original game built for PlayHub.",
    embedUrl: "games/dot-tap.html", featured: true, plays: 100, added: "2026-10-20", scoreSupport: true },
  { id: "block-slide", title: "Block Slide", category: "Puzzle", emoji: "🧩", colors: ["#7c3aed", "#22d3ee"],
    description: "Slide blocks into place. Sample entry: add a licensed embed to enable it.", embedUrl: "", plays: 80, added: "2026-10-01" },
  { id: "turbo-run", title: "Turbo Run", category: "Racing", emoji: "🏎️", colors: ["#f97316", "#ef4444"],
    description: "Sample racing entry awaiting an authorised game source.", embedUrl: "", plays: 95, added: "2026-09-20" },
  { id: "star-quest", title: "Star Quest", category: "Adventure", emoji: "🗺️", colors: ["#10b981", "#3b82f6"],
    description: "Sample adventure entry awaiting an authorised game source.", embedUrl: "", plays: 60, added: "2026-10-15" },
  { id: "mind-match", title: "Mind Match", category: "Brain Training", emoji: "🧠", colors: ["#eab308", "#ec4899"],
    description: "Sample brain-training entry awaiting an authorised game source.", embedUrl: "", plays: 70, added: "2026-10-10" },
  { id: "ninja-dash", title: "Ninja Dash", category: "Action", emoji: "⚔️", colors: ["#0ea5e9", "#6366f1"],
    description: "Sample action entry awaiting an authorised game source.", embedUrl: "", plays: 88, added: "2026-10-22" }
];
