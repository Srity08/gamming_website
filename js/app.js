import { CONFIG, CATEGORIES, GAMES } from "./data/games.js";
import { esc, header, footer, grid, adSlot, thumb, playable, leaderboard, bestScore, saveScore, embedAllowed } from "./components.js";
const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
$("#site-header").innerHTML = header();
$("#site-footer").innerHTML = footer();
const tgl = $(".nav-toggle");
tgl.addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); tgl.setAttribute("aria-expanded", o); });
document.querySelectorAll("[data-ad]").forEach(e => e.innerHTML = adSlot(e.dataset.ad));
const chips = active => `<a class="chip ${active ? "" : "on"}" href="category.html">All</a>` + CATEGORIES.map(c =>
  `<a class="chip ${active === c.name ? "on" : ""}" href="category.html?cat=${encodeURIComponent(c.name)}">${c.emoji} ${esc(c.name)}</a>`).join("");

const pages = {
  home() {
    const f = GAMES.find(g => g.featured) || GAMES[0];
    $("#hero").innerHTML = `<div class="hero" ${thumb(f)}><div><span class="tag">Featured game</span><h1>${esc(f.title)}</h1><p>${esc(f.description)}</p>
      <a class="btn" href="game.html?id=${encodeURIComponent(f.id)}">▶ Play Now</a></div><div class="hero-emoji" aria-hidden="true">${esc(f.emoji)}</div></div>`;
    $("#cats").innerHTML = chips();
    $("#popularGrid").innerHTML = grid([...GAMES].sort((a, b) => b.plays - a.plays).slice(0, 6));
    $("#newGrid").innerHTML = grid([...GAMES].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6));
    const lb = leaderboard();
    $("#leaderboard").innerHTML = lb.length ? lb.map(x => `<li>${esc(x.g.title)} <b>${x.s}</b></li>`).join("") : "<li>Play a scored game to set your first high score!</li>";
  },
  category() {
    const cat = params.get("cat") || "", q = (params.get("q") || "").trim();
    $("#cats").innerHTML = chips(cat);
    $("#q").value = q;
    $("#catHidden").value = cat;
    const list = GAMES.filter(g => (!cat || g.category === cat) && g.title.toLowerCase().includes(q.toLowerCase()));
    $("#heading").textContent = (cat || "All games") + (q ? ` matching “${q}”` : "");
    document.title = `${cat || "All"} Games – ${CONFIG.siteName}`;
    $("#results").innerHTML = list.length ? grid(list) : `<p class="empty">😕 No games match your search${cat ? " in " + esc(cat) : ""}. Try another name or <a href="category.html">view all games</a>.</p>`;
  },
  game() {
    const g = GAMES.find(x => x.id === params.get("id"));
    const stage = $("#stage"), btn = $("#play");
    if (!g) { btn.hidden = true; $("#title").textContent = "Game not found"; stage.innerHTML = `<p class="empty">We couldn't find that game. <a href="category.html">Browse all games</a>.</p>`; return; }
    document.title = `Play ${g.title} Free – ${CONFIG.siteName}`;
    document.querySelector('meta[name="description"]').content = g.description;
    $("#title").textContent = g.title; $("#desc").textContent = g.description; $("#cat").textContent = g.category;
    $("#best").textContent = g.scoreSupport ? `Your best: ${bestScore(g.id)}` : "";
    const others = GAMES.filter(x => x.id !== g.id);
    $("#related").innerHTML = grid(others.filter(x => x.category === g.category).concat(others.filter(x => x.category !== g.category)).slice(0, 4));
    if (!playable(g)) { btn.hidden = true; stage.innerHTML = `<div class="notice">🚧 <b>${esc(g.title)}</b> isn't available yet. No game has been integrated for this entry.</div>`; return; }
    if (!embedAllowed(g.embedUrl)) { btn.hidden = true; stage.innerHTML = `<div class="notice">⚠️ This game's source isn't on the approved list.</div>`; return; }
    btn.addEventListener("click", () => {
      btn.hidden = true; stage.innerHTML = `<div class="notice" role="status">Loading…</div>`;
      const fr = document.createElement("iframe");
      fr.title = g.title; fr.src = g.embedUrl; fr.sandbox = "allow-scripts allow-pointer-lock"; fr.allow = "fullscreen"; fr.referrerPolicy = "no-referrer"; fr.hidden = true;
      const fail = setTimeout(() => { fr.remove(); stage.innerHTML = `<div class="notice">😞 The game didn't load. Please try again.</div>`; btn.hidden = false; }, 12000);
      fr.addEventListener("load", () => { clearTimeout(fail); stage.querySelector(".notice")?.remove(); fr.hidden = false; });
      stage.append(fr);
      addEventListener("message", e => {
        if (e.source !== fr.contentWindow || e.data?.type !== "score" || !Number.isFinite(e.data.value)) return;
        saveScore(g.id, e.data.value); $("#best").textContent = `Your best: ${bestScore(g.id)}`;
      });
    });
  }
};
pages[document.body.dataset.page]?.();
