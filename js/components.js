import { CONFIG, GAMES } from "./data/games.js";
export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const playable = g => !!g.embedUrl;
export const header = () => `<header class="site-header"><a class="logo" href="index.html">🎮 Play<span>Hub</span></a>
<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav">☰</button>
<nav id="nav" aria-label="Main"><a href="index.html">Home</a><a href="category.html">Categories</a><a href="index.html#new">New Games</a><a href="index.html#popular">Popular Games</a><a href="about.html">About</a></nav></header>`;
export const footer = () => `<footer class="site-footer"><nav aria-label="Footer"><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a></nav><p>© ${new Date().getFullYear()} ${esc(CONFIG.siteName)}. Free browser games.</p></footer>`;
export const thumb = g => `style="background:linear-gradient(135deg,${esc(g.colors[0])},${esc(g.colors[1])})"`;
export const card = g => `<a class="card" href="game.html?id=${encodeURIComponent(g.id)}"><div class="thumb" ${thumb(g)} aria-hidden="true"><span>${esc(g.emoji)}</span>${playable(g) ? "" : '<em class="badge">Coming soon</em>'}</div><div class="card-body"><h3>${esc(g.title)}</h3><p>${esc(g.category)}</p></div></a>`;
export const adSlot = (label = "Advertisement") => `<div class="ad" role="complementary" aria-label="${esc(label)}" data-ad-slot><div><small>${esc(label)}</small><span>Ad space (reserved)</span></div></div>`;
export const grid = list => list.length ? list.map(card).join("") : `<p class="empty">No games found.</p>`;
export const bestScore = id => { try { return +localStorage.getItem("hs:" + id) || 0; } catch { return 0; } };
export const saveScore = (id, v) => { try { if (v > bestScore(id)) localStorage.setItem("hs:" + id, v); } catch {} };
export const leaderboard = () => GAMES.filter(g => g.scoreSupport).map(g => ({ g, s: bestScore(g.id) })).filter(x => x.s).sort((a, b) => b.s - a.s);
export const embedAllowed = url => {
  try { const u = new URL(url, location.href);
    return u.origin === location.origin || (u.protocol === "https:" && CONFIG.allowedEmbedHosts.includes(u.hostname));
  } catch { return false; }
};
