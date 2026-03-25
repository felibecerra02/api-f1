import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3000/api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e10600;
    --red-dim: #8a0400;
    --bg: #0a0a0a;
    --bg2: #111111;
    --bg3: #181818;
    --border: #2a2a2a;
    --text: #f0f0f0;
    --text-dim: #888;
    --accent: #ffd700;
    --mono: 'Share Tech Mono', monospace;
    --heading: 'Barlow Condensed', sans-serif;
    --body: 'Barlow', sans-serif;
  }

  html, body { width: 100%; min-height: 100vh; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: var(--body); }
  #root { width: 100%; }
  .app { min-height: 100vh; width: 100%; }

  /* ══════════════════════════════════════════
     LANDING
  ══════════════════════════════════════════ */
  .landing {
    min-height: 100vh; width: 100%;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }

  /* grid de fondo */
  .landing::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.018) 80px, rgba(255,255,255,0.018) 81px),
      repeating-linear-gradient(0deg,  transparent, transparent 80px, rgba(255,255,255,0.018) 80px, rgba(255,255,255,0.018) 81px);
  }

  /* franja diagonal roja */
  .landing::after {
    content: ''; position: absolute;
    top: -10%; right: -5%;
    width: 55%; height: 130%;
    background: linear-gradient(135deg, rgba(225,6,0,0.07) 0%, transparent 60%);
    pointer-events: none;
  }

  .landing-nav {
    display: flex; align-items: center;
    padding: 1.5rem 3rem;
    border-bottom: 1px solid var(--border);
    position: relative; z-index: 2;
  }
  .landing-nav-logo {
    display: flex; align-items: center; gap: 0.75rem; text-decoration: none;
  }
  .landing-nav-mark {
    width: 36px; height: 36px; background: var(--red);
    clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--heading); font-weight: 900; font-size: 0.8rem;
    color: white; letter-spacing: 0.05em;
  }
  .landing-nav-text {
    font-family: var(--heading); font-weight: 900;
    font-size: 1.4rem; letter-spacing: 0.1em; color: var(--text);
  }
  .landing-nav-text span { color: var(--red); }
  .landing-nav-season {
    margin-left: auto; font-family: var(--mono);
    font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.15em;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .landing-nav-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); animation: blink 2s infinite;
  }

  /* hero principal */
  .landing-hero {
    flex: 1; display: flex; align-items: center;
    padding: 4rem 3rem; position: relative; z-index: 2;
    gap: 4rem;
  }
  .landing-hero-left { flex: 1; max-width: 620px; }

  .landing-eyebrow {
    font-family: var(--mono); font-size: 0.72rem;
    color: var(--red); letter-spacing: 0.25em;
    text-transform: uppercase; margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .landing-eyebrow::before {
    content: ''; width: 2.5rem; height: 1px; background: var(--red);
  }

  .landing-title {
    font-family: var(--heading); font-weight: 900;
    font-size: clamp(3.5rem, 8vw, 7rem);
    line-height: 0.92; letter-spacing: -0.01em;
    text-transform: uppercase;
  }
  .landing-title .line-red { color: var(--red); display: block; }
  .landing-title .line-dim {
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.25);
    display: block;
  }

  .landing-desc {
    margin-top: 2rem; max-width: 480px;
    color: var(--text-dim); font-weight: 300;
    line-height: 1.75; font-size: 1rem;
  }

  .landing-cta {
    margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 0.85rem 2rem;
    background: var(--red); color: white;
    font-family: var(--heading); font-weight: 700;
    font-size: 0.9rem; letter-spacing: 0.15em;
    text-transform: uppercase; border: none;
    cursor: pointer; transition: all 0.2s;
    clip-path: polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%);
  }
  .btn-primary:hover { background: #ff1a0f; transform: translateX(3px); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 0.85rem 1.75rem;
    background: transparent; color: var(--text);
    font-family: var(--heading); font-weight: 700;
    font-size: 0.9rem; letter-spacing: 0.15em;
    text-transform: uppercase; border: 1px solid var(--border);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--red); color: var(--red); }

  /* stats row */
  .landing-stats {
    display: flex; gap: 0; margin-top: 3.5rem;
    border-top: 1px solid var(--border);
    padding-top: 2rem;
  }
  .landing-stat {
    flex: 1; padding-right: 2rem;
    border-right: 1px solid var(--border);
    margin-right: 2rem;
  }
  .landing-stat:last-child { border-right: none; margin-right: 0; }
  .landing-stat-num {
    font-family: var(--heading); font-weight: 900;
    font-size: 2.8rem; line-height: 1; color: var(--red);
  }
  .landing-stat-label {
    font-family: var(--mono); font-size: 0.65rem;
    color: var(--text-dim); letter-spacing: 0.15em;
    text-transform: uppercase; margin-top: 0.3rem;
  }

  /* número grande decorativo */
  .landing-hero-right {
    position: relative; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .landing-big-num {
    font-family: var(--heading); font-weight: 900;
    font-size: clamp(10rem, 20vw, 18rem);
    line-height: 1; letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.055);
    user-select: none;
  }
  .landing-big-num-accent {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--heading); font-weight: 900;
    font-size: clamp(10rem, 20vw, 18rem);
    line-height: 1; letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(225,6,0,0.15);
    user-select: none;
    clip-path: inset(50% 0 0 0);
  }

  /* ticker inferior */
  .landing-ticker {
    border-top: 1px solid var(--border);
    padding: 0.85rem 0; overflow: hidden;
    position: relative; z-index: 2;
  }
  .landing-ticker-track {
    display: flex; gap: 0;
    animation: ticker 28s linear infinite;
    white-space: nowrap;
  }
  .landing-ticker-track:hover { animation-play-state: paused; }
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .landing-ticker-item {
    font-family: var(--mono); font-size: 0.7rem;
    color: var(--text-dim); letter-spacing: 0.1em;
    padding: 0 2.5rem; white-space: nowrap;
  }
  .landing-ticker-item span { color: var(--red); margin-right: 0.5rem; }

  /* ══════════════════════════════════════════
     NAV (dentro de la app)
  ══════════════════════════════════════════ */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: stretch;
    padding: 0 2rem; width: 100%;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 1rem 1.5rem 1rem 0;
    border-right: 1px solid var(--border);
    margin-right: 1rem;
    background: none; border-top: none; border-bottom: none; border-left: none;
    cursor: pointer; flex-shrink: 0;
  }
  .nav-logo-mark {
    width: 32px; height: 32px; background: var(--red);
    clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--heading); font-weight: 900; font-size: 0.75rem;
    color: white; letter-spacing: 0.05em;
  }
  .nav-logo-text { font-family: var(--heading); font-weight: 900; font-size: 1.3rem; letter-spacing: 0.1em; color: var(--text); }
  .nav-logo-text span { color: var(--red); }
  .nav-tabs { display: flex; flex: 1; }
  .nav-tab {
    padding: 0 1.5rem; border: none; background: none;
    font-family: var(--heading); font-weight: 700;
    font-size: 0.85rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--text-dim);
    cursor: pointer; transition: all 0.2s;
    border-bottom: 3px solid transparent; white-space: nowrap;
  }
  .nav-tab:hover { color: var(--text); }
  .nav-tab.active { color: var(--red); border-bottom-color: var(--red); }
  .nav-status {
    display: flex; align-items: center; gap: 0.5rem;
    margin-left: auto; padding: 0 0 0 1.5rem;
    font-family: var(--mono); font-size: 0.7rem; color: var(--text-dim);
    border-left: 1px solid var(--border); flex-shrink: 0;
  }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

  /* ══════════════════════════════════════════
     HERO de sección
  ══════════════════════════════════════════ */
  .hero {
    position: relative; overflow: hidden;
    padding: 3.5rem 2rem 2.5rem;
    border-bottom: 1px solid var(--border); width: 100%;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background:
      repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px),
      repeating-linear-gradient(0deg,  transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px);
  }
  .hero-number {
    font-family: var(--heading); font-weight: 900;
    font-size: clamp(6rem, 15vw, 14rem);
    line-height: 0.85; letter-spacing: -0.02em;
    color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.055);
    position: absolute; right: -0.02em; top: 50%; transform: translateY(-50%);
    pointer-events: none; user-select: none;
  }
  .hero-tag {
    font-family: var(--mono); font-size: 0.72rem; color: var(--red);
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.75rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .hero-tag::before { content:''; display:block; width:2rem; height:1px; background:var(--red); }
  .hero-title {
    font-family: var(--heading); font-weight: 900;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1; letter-spacing: 0.02em;
    text-transform: uppercase; position: relative;
  }
  .hero-title span { color: var(--red); }
  .hero-sub { margin-top: 0.75rem; max-width: 520px; color: var(--text-dim); font-weight: 300; line-height: 1.6; font-size: 0.95rem; }

  /* ══════════════════════════════════════════
     SECTION
  ══════════════════════════════════════════ */
  .section { padding: 2.5rem 2rem; width: 100%; }
  .section-header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem; padding-bottom: 1rem;
    border-bottom: 1px solid var(--border); flex-wrap: wrap;
  }
  .section-title { font-family: var(--heading); font-weight: 900; font-size: 1.8rem; letter-spacing: 0.05em; text-transform: uppercase; }
  .section-count { font-family: var(--mono); font-size: 0.75rem; color: var(--red); padding: 0.2rem 0.6rem; border: 1px solid var(--red-dim); border-radius: 2px; }
  .section-search {
    margin-left: auto; display: flex; align-items: center; gap: 0.5rem;
    background: var(--bg2); border: 1px solid var(--border);
    padding: 0.5rem 0.75rem; border-radius: 2px; transition: border-color 0.2s;
  }
  .section-search:focus-within { border-color: var(--red); }
  .section-search input { background:none; border:none; outline:none; color:var(--text); font-family:var(--mono); font-size:0.8rem; width:200px; }
  .section-search input::placeholder { color: var(--text-dim); }
  .search-icon { color: var(--text-dim); font-size: 0.85rem; }

  /* ══════════════════════════════════════════
     GRIDS
  ══════════════════════════════════════════ */
  .grid-drivers  { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1px; background:var(--border); width:100%; }
  .grid-teams    { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:1px; background:var(--border); width:100%; }
  .grid-circuits { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:1rem; width:100%; }

  /* ── driver card ── */
  .driver-card { background:var(--bg2); padding:1.5rem; cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; }
  .driver-card::after { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--red); transform:scaleY(0); transform-origin:bottom; transition:transform 0.2s; }
  .driver-card:hover { background:var(--bg3); }
  .driver-card:hover::after { transform:scaleY(1); }
  .driver-number { font-family:var(--heading); font-weight:900; font-size:3rem; line-height:1; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.12); position:absolute; right:1rem; top:1rem; }
  .driver-flag { font-size:1.5rem; margin-bottom:0.5rem; }
  .driver-name { font-family:var(--heading); font-weight:700; font-size:1.3rem; letter-spacing:0.04em; text-transform:uppercase; line-height:1.1; }
  .driver-name-given { font-weight:400; color:var(--text-dim); display:block; font-size:0.85rem; letter-spacing:0.08em; }
  .driver-meta { margin-top:1rem; display:flex; gap:1rem; font-family:var(--mono); font-size:0.7rem; color:var(--text-dim); flex-wrap:wrap; }
  .driver-meta-item { display:flex; flex-direction:column; gap:0.15rem; }
  .driver-meta-label { color:var(--red); font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; }
  .driver-team-badge { display:inline-block; margin-top:0.75rem; padding:0.2rem 0.6rem; background:rgba(225,6,0,0.1); border:1px solid rgba(225,6,0,0.3); font-family:var(--mono); font-size:0.65rem; color:var(--red); letter-spacing:0.08em; text-transform:uppercase; border-radius:1px; }

  /* ── team card ── */
  .team-card { background:var(--bg2); padding:1.75rem; cursor:pointer; transition:background 0.2s; position:relative; }
  .team-card:hover { background:var(--bg3); }
  .team-stripe { position:absolute; top:0; left:0; right:0; height:3px; background:var(--red); }
  .team-name { font-family:var(--heading); font-weight:900; font-size:1.4rem; text-transform:uppercase; letter-spacing:0.03em; line-height:1.1; margin-top:0.25rem; }
  .team-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1.25rem; }
  .team-info-item { display:flex; flex-direction:column; gap:0.2rem; }
  .team-info-label { font-family:var(--mono); font-size:0.6rem; color:var(--red); letter-spacing:0.12em; text-transform:uppercase; }
  .team-info-value { font-family:var(--body); font-weight:500; font-size:0.85rem; color:var(--text); }

  /* ── circuit card ── */
  .circuit-card { background:var(--bg2); border:1px solid var(--border); padding:1.5rem; cursor:pointer; transition:all 0.2s; position:relative; overflow:hidden; }
  .circuit-card:hover { border-color:var(--red); transform:translateY(-2px); }
  .circuit-location { font-family:var(--mono); font-size:0.65rem; color:var(--text-dim); letter-spacing:0.12em; text-transform:uppercase; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; }
  .circuit-location::before { content:'◆'; color:var(--red); font-size:0.4rem; }
  .circuit-name { font-family:var(--heading); font-weight:700; font-size:1.25rem; text-transform:uppercase; letter-spacing:0.04em; line-height:1.1; }
  .circuit-id { font-family:var(--mono); font-size:0.65rem; color:var(--red); margin-top:0.75rem; padding:0.2rem 0; border-top:1px solid var(--border); }

  /* ══════════════════════════════════════════
     LOADING / ERROR / EMPTY
  ══════════════════════════════════════════ */
  .loading { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6rem 2rem; gap:1.5rem; color:var(--text-dim); }
  .loading-track { width:200px; height:2px; background:var(--border); position:relative; overflow:hidden; }
  .loading-car { position:absolute; left:-30%; width:30%; height:100%; background:var(--red); animation:race 1.2s ease-in-out infinite; }
  @keyframes race { 0%{left:-30%;} 100%{left:130%;} }
  .loading-text { font-family:var(--mono); font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase; }
  .error-box { margin:2rem; padding:1.5rem; border:1px solid var(--red-dim); background:rgba(225,6,0,0.05); font-family:var(--mono); font-size:0.8rem; color:var(--red); }
  .empty { padding:4rem 2rem; text-align:center; font-family:var(--mono); font-size:0.8rem; color:var(--text-dim); letter-spacing:0.1em; }

  /* ══════════════════════════════════════════
     MODAL
  ══════════════════════════════════════════ */
  .modal-overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(0,0,0,0.88);
    backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center;
    padding:1.5rem;
    animation:fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
  .modal {
    background:var(--bg2); border:1px solid var(--border);
    width:100%; max-width:620px; max-height:90vh;
    overflow-y:auto; position:relative;
    animation:slideUp 0.25s ease;
  }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }
  .modal-red-stripe { height:3px; background:var(--red); }
  .modal-header {
    position:sticky; top:0; background:var(--bg2);
    border-bottom:1px solid var(--border);
    padding:1.1rem 1.5rem;
    display:flex; align-items:center; gap:1rem;
  }
  .modal-header-tag { font-family:var(--mono); font-size:0.65rem; color:var(--red); letter-spacing:0.15em; text-transform:uppercase; }
  .modal-close {
    margin-left:auto; background:none; border:1px solid var(--border);
    color:var(--text-dim); width:30px; height:30px;
    cursor:pointer; font-size:0.9rem;
    display:flex; align-items:center; justify-content:center; transition:all 0.2s;
  }
  .modal-close:hover { border-color:var(--red); color:var(--red); }
  .modal-body { padding:1.75rem 1.5rem; position:relative; }
  .modal-name-block { margin-bottom:1.75rem; }
  .modal-flag { font-size:2.2rem; margin-bottom:0.4rem; }
  .modal-given { font-family:var(--heading); font-size:1rem; font-weight:400; color:var(--text-dim); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:0.1rem; }
  .modal-surname { font-family:var(--heading); font-weight:900; font-size:clamp(1.8rem,5vw,3rem); text-transform:uppercase; line-height:1; letter-spacing:0.03em; }
  .modal-team-name { font-family:var(--heading); font-weight:900; font-size:clamp(1.4rem,4vw,2.2rem); text-transform:uppercase; line-height:1.1; letter-spacing:0.03em; }
  .modal-circuit-name { font-family:var(--heading); font-weight:900; font-size:clamp(1.5rem,4vw,2.2rem); text-transform:uppercase; line-height:1.1; letter-spacing:0.02em; }
  .modal-number-ghost {
    font-family:var(--heading); font-weight:900; font-size:9rem; line-height:1;
    color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04);
    position:absolute; right:1rem; top:1rem;
    pointer-events:none; user-select:none;
  }
  .modal-badge {
    display:inline-flex; align-items:center; gap:0.4rem;
    padding:0.25rem 0.7rem; margin-top:0.75rem;
    background:rgba(225,6,0,0.1); border:1px solid rgba(225,6,0,0.3);
    font-family:var(--mono); font-size:0.7rem; color:var(--red);
    letter-spacing:0.08em; text-transform:uppercase; border-radius:2px;
  }
  .modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; }
  .modal-field { display:flex; flex-direction:column; gap:0.3rem; }
  .modal-label { font-family:var(--mono); font-size:0.6rem; color:var(--red); letter-spacing:0.15em; text-transform:uppercase; }
  .modal-value { font-family:var(--body); font-weight:500; font-size:0.95rem; }
  .modal-value.mono { font-family:var(--mono); font-size:0.85rem; }
  .modal-divider { height:1px; background:var(--border); margin:1.25rem 0; }
  .modal-section-title { font-family:var(--heading); font-weight:700; font-size:0.9rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-dim); margin-bottom:0.75rem; }
  .modal-drivers-list { display:flex; flex-wrap:wrap; gap:0.5rem; }
  .modal-driver-pill { padding:0.35rem 0.8rem; background:var(--bg3); border:1px solid var(--border); font-family:var(--mono); font-size:0.75rem; color:var(--text); border-radius:2px; }
  .modal-wiki-link { font-family:var(--mono); font-size:0.7rem; color:var(--red); letter-spacing:0.1em; text-decoration:none; }
  .modal-wiki-link:hover { text-decoration:underline; }

  /* stat destacada en modal de equipo */
  .modal-stat-row { display:flex; gap:0; margin-bottom:1.5rem; }
  .modal-stat-block {
    flex:1; padding:1rem 1.25rem;
    background:var(--bg3); border:1px solid var(--border);
    margin-right:-1px;
    display:flex; flex-direction:column; gap:0.3rem;
  }
  .modal-stat-num { font-family:var(--heading); font-weight:900; font-size:2.5rem; line-height:1; color:var(--accent); }
  .modal-stat-label { font-family:var(--mono); font-size:0.6rem; color:var(--text-dim); letter-spacing:0.12em; text-transform:uppercase; }
`

// ─── helpers ───────────────────────────────────────────────────────────────

const countryFlag = (nat) => {
  const map = {
    'great britain':'🇬🇧','united kingdom':'🇬🇧','netherlands':'🇳🇱',
    'monaco':'🇲🇨','spain':'🇪🇸','mexico':'🇲🇽','australia':'🇦🇺',
    'germany':'🇩🇪','france':'🇫🇷','canada':'🇨🇦','japan':'🇯🇵',
    'china':'🇨🇳','thailand':'🇹🇭','usa':'🇺🇸','united states':'🇺🇸',
    'denmark':'🇩🇰','finland':'🇫🇮','austria':'🇦🇹','brazil':'🇧🇷',
    'italy':'🇮🇹','argentina':'🇦🇷','new zealand':'🇳🇿','belgium':'🇧🇪',
    'poland':'🇵🇱','sweden':'🇸🇪','switzerland':'🇨🇭',
  }
  return map[(nat || '').toLowerCase()] || '🏁'
}

const teamLabel = (teamId) => {
  const map = {
    mercedes:'Mercedes', ferrari:'Ferrari', red_bull:'Red Bull',
    mclaren:'McLaren', alpine:'Alpine', aston_martin:'Aston Martin',
    williams:'Williams', rb:'RB', haas:'Haas', audi:'Audi', cadillac:'Cadillac',
  }
  return map[teamId] || teamId || ''
}

// ─── Modal base ─────────────────────────────────────────────────────────────

function Modal({ onClose, children }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">{children}</div>
    </div>
  )
}

// ─── Driver Modal ───────────────────────────────────────────────────────────

function DriverModal({ driver: d, onClose }) {
  const given   = d.name || ''
  const surname = d.surname || '—'
  const nat     = d.nationality || ''
  const num     = d.number || ''
  const bday    = d.birthday || ''
  const team    = teamLabel(d.teamId)
  const code    = d.shortName || d.driverId || ''

  return (
    <Modal onClose={onClose}>
      <div className="modal-red-stripe" />
      <div className="modal-header">
        <span className="modal-header-tag">Piloto</span>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        {num && <div className="modal-number-ghost">{num}</div>}
        <div className="modal-name-block">
          <div className="modal-flag">{countryFlag(nat)}</div>
          {given && <div className="modal-given">{given}</div>}
          <div className="modal-surname">{surname.toUpperCase()}</div>
          {team && <div className="modal-badge">🏎 {team}</div>}
        </div>
        <div className="modal-grid">
          {num  && <div className="modal-field"><span className="modal-label">Número</span><span className="modal-value mono">#{num}</span></div>}
          {code && <div className="modal-field"><span className="modal-label">Código</span><span className="modal-value mono">{code}</span></div>}
          {nat  && <div className="modal-field"><span className="modal-label">Nacionalidad</span><span className="modal-value">{nat}</span></div>}
          {bday && <div className="modal-field"><span className="modal-label">Fecha de nacimiento</span><span className="modal-value mono">{bday}</span></div>}
          {team && <div className="modal-field"><span className="modal-label">Equipo actual</span><span className="modal-value">{team}</span></div>}
          {d.driverId && <div className="modal-field"><span className="modal-label">Driver ID</span><span className="modal-value mono">{d.driverId}</span></div>}
        </div>
        {d.url && (<><div className="modal-divider" /><a href={d.url} target="_blank" rel="noopener noreferrer" className="modal-wiki-link">→ Ver en Wikipedia</a></>)}
      </div>
    </Modal>
  )
}

// ─── Team Modal ─────────────────────────────────────────────────────────────

function TeamModal({ team: t, onClose }) {
  // Campos reales: teamName, teamNationality, firstAppeareance, constructorsChampionships, driversChampionships, url
  const name        = t.teamName || t.name || t.teamId || '—'
  const nat         = t.teamNationality || t.nationality || ''
  const firstYear   = t.firstAppeareance ?? t.firstAppearance ?? t.firstTeamEntry ?? ''
  const constrChamp = t.constructorsChampionships
  const driverChamp = t.driversChampionships

  return (
    <Modal onClose={onClose}>
      <div className="modal-red-stripe" />
      <div className="modal-header">
        <span className="modal-header-tag">Escudería</span>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="modal-name-block">
          {nat && <div className="modal-given">{nat} {countryFlag(nat)}</div>}
          <div className="modal-team-name">{name.toUpperCase()}</div>
          {firstYear && <div className="modal-badge">📅 En F1 desde {firstYear}</div>}
        </div>

        {/* Stats destacadas solo si tienen valor */}
        {(constrChamp != null || driverChamp != null) && (
          <div className="modal-stat-row">
            {constrChamp != null && (
              <div className="modal-stat-block">
                <span className="modal-stat-num">{constrChamp ?? 0}</span>
                <span className="modal-stat-label">Títulos constructores</span>
              </div>
            )}
            {driverChamp != null && (
              <div className="modal-stat-block">
                <span className="modal-stat-num">{driverChamp ?? 0}</span>
                <span className="modal-stat-label">Títulos pilotos</span>
              </div>
            )}
          </div>
        )}

        <div className="modal-grid">
          {nat       && <div className="modal-field"><span className="modal-label">Nacionalidad</span><span className="modal-value">{nat}</span></div>}
          {firstYear && <div className="modal-field"><span className="modal-label">Primera aparición</span><span className="modal-value mono">{firstYear}</span></div>}
          {t.teamId  && <div className="modal-field"><span className="modal-label">Team ID</span><span className="modal-value mono">{t.teamId}</span></div>}
          {constrChamp == null && <div className="modal-field"><span className="modal-label">Títulos constructores</span><span className="modal-value mono">—</span></div>}
          {driverChamp == null && <div className="modal-field"><span className="modal-label">Títulos pilotos</span><span className="modal-value mono">—</span></div>}
        </div>

        {t.url && (<><div className="modal-divider" /><a href={t.url} target="_blank" rel="noopener noreferrer" className="modal-wiki-link">→ Ver en Wikipedia</a></>)}
      </div>
    </Modal>
  )
}

// ─── Circuit Modal ──────────────────────────────────────────────────────────

function CircuitModal({ circuit: c, onClose }) {
  const name    = c.circuitName || c.name || '—'
  const city    = c.city || c.location?.locality || ''
  const country = c.country || c.location?.country || ''
  const id      = c.circuitId || c.id || ''
  const length  = c.circuitLength || c.length || ''
  const laps    = c.numberOfLaps || c.laps || ''
  const lat     = c.location?.lat || c.lat || ''
  const lng     = c.location?.long || c.lng || ''
  return (
    <Modal onClose={onClose}>
      <div className="modal-red-stripe" />
      <div className="modal-header">
        <span className="modal-header-tag">Circuito</span>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="modal-name-block">
          {(city || country) && <div className="modal-given">◆ {[city, country].filter(Boolean).join(' · ')}</div>}
          <div className="modal-circuit-name">{name}</div>
          {id && <div className="modal-badge">🏁 {id}</div>}
        </div>
        <div className="modal-grid">
          {length  && <div className="modal-field"><span className="modal-label">Longitud</span><span className="modal-value mono">{length}</span></div>}
          {laps    && <div className="modal-field"><span className="modal-label">Vueltas</span><span className="modal-value mono">{laps}</span></div>}
          {country && <div className="modal-field"><span className="modal-label">País</span><span className="modal-value">{country}</span></div>}
          {city    && <div className="modal-field"><span className="modal-label">Ciudad</span><span className="modal-value">{city}</span></div>}
          {lat     && <div className="modal-field"><span className="modal-label">Latitud</span><span className="modal-value mono">{lat}</span></div>}
          {lng     && <div className="modal-field"><span className="modal-label">Longitud GPS</span><span className="modal-value mono">{lng}</span></div>}
          {c.raceDistance           && <div className="modal-field"><span className="modal-label">Distancia carrera</span><span className="modal-value mono">{c.raceDistance}</span></div>}
          {c.firstParticipationYear && <div className="modal-field"><span className="modal-label">Primera carrera</span><span className="modal-value mono">{c.firstParticipationYear}</span></div>}
        </div>
        {c.url && (<><div className="modal-divider" /><a href={c.url} target="_blank" rel="noopener noreferrer" className="modal-wiki-link">→ Ver en Wikipedia</a></>)}
      </div>
    </Modal>
  )
}

// ─── Shared UI ──────────────────────────────────────────────────────────────

function LoadingState({ label = 'Cargando datos' }) {
  return (
    <div className="loading">
      <div className="loading-track"><div className="loading-car" /></div>
      <span className="loading-text">{label}</span>
    </div>
  )
}
function ErrorState({ msg }) {
  return <div className="error-box">⚠ Error: {msg || 'No se pudo conectar con el servidor'}</div>
}
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="section-search">
      <span className="search-icon">⌕</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

// ─── DRIVERS ───────────────────────────────────────────────────────────────

function DriversSection() {
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/pilotos`)
      .then(r => r.json())
      .then(r => { setData(r.data); setLoading(false) })
      .catch(() => { setError('No se pudieron obtener los pilotos'); setLoading(false) })
  }, [])

  const drivers = (() => {
    const raw = data?.drivers || (Array.isArray(data) ? data : [])
    if (!search) return raw
    const q = search.toLowerCase()
    return raw.filter(d =>
      (d.surname || '').toLowerCase().includes(q) ||
      (d.name || '').toLowerCase().includes(q) ||
      (d.nationality || '').toLowerCase().includes(q) ||
      teamLabel(d.teamId).toLowerCase().includes(q)
    )
  })()

  return (
    <div className="section">
      {selected && <DriverModal driver={selected} onClose={() => setSelected(null)} />}
      <div className="section-header">
        <h2 className="section-title">Pilotos</h2>
        {drivers.length > 0 && <span className="section-count">{drivers.length} ACTIVOS</span>}
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar piloto..." />
      </div>
      {loading && <LoadingState label="Cargando pilotos" />}
      {error   && <ErrorState msg={error} />}
      {!loading && !error && (
        drivers.length === 0
          ? <div className="empty">NO SE ENCONTRARON RESULTADOS</div>
          : <div className="grid-drivers">
              {drivers.map((d, i) => (
                <div key={d.driverId || i} className="driver-card" onClick={() => setSelected(d)}>
                  <div className="driver-number">{d.number}</div>
                  <div className="driver-flag">{countryFlag(d.nationality)}</div>
                  <div className="driver-name">
                    <span className="driver-name-given">{d.name}</span>
                    {(d.surname || '').toUpperCase()}
                  </div>
                  {d.teamId && <div className="driver-team-badge">{teamLabel(d.teamId)}</div>}
                  <div className="driver-meta">
                    {d.nationality && <div className="driver-meta-item"><span className="driver-meta-label">NAC</span>{d.nationality}</div>}
                    {d.birthday    && <div className="driver-meta-item"><span className="driver-meta-label">NACIMIENTO</span>{d.birthday}</div>}
                  </div>
                </div>
              ))}
            </div>
      )}
    </div>
  )
}

// ─── TEAMS ─────────────────────────────────────────────────────────────────

function TeamsSection() {
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/equipos`)
      .then(r => r.json())
      .then(r => { setData(r.data); setLoading(false) })
      .catch(() => { setError('No se pudieron obtener los equipos'); setLoading(false) })
  }, [])

  // Campos reales: teamId, teamName, teamNationality, firstAppeareance, constructorsChampionships, driversChampionships
  const teams = (() => {
    const raw = data?.teams || (Array.isArray(data) ? data : [])
    if (!search) return raw
    const q = search.toLowerCase()
    return raw.filter(t =>
      (t.teamName || '').toLowerCase().includes(q) ||
      (t.teamNationality || '').toLowerCase().includes(q)
    )
  })()

  return (
    <div className="section">
      {selected && <TeamModal team={selected} onClose={() => setSelected(null)} />}
      <div className="section-header">
        <h2 className="section-title">Equipos</h2>
        {teams.length > 0 && <span className="section-count">{teams.length} EQUIPOS</span>}
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar equipo..." />
      </div>
      {loading && <LoadingState label="Cargando equipos" />}
      {error   && <ErrorState msg={error} />}
      {!loading && !error && (
        teams.length === 0
          ? <div className="empty">NO SE ENCONTRARON RESULTADOS</div>
          : <div className="grid-teams">
              {teams.map((t, i) => (
                <div key={t.teamId || i} className="team-card" onClick={() => setSelected(t)}>
                  <div className="team-stripe" />
                  <div className="team-name">{(t.teamName || t.teamId || '—').toUpperCase()}</div>
                  <div className="team-info-grid">
                    {t.teamNationality && (
                      <div className="team-info-item">
                        <span className="team-info-label">Nacionalidad</span>
                        <span className="team-info-value">{t.teamNationality} {countryFlag(t.teamNationality)}</span>
                      </div>
                    )}
                    {t.firstAppeareance != null && (
                      <div className="team-info-item">
                        <span className="team-info-label">En F1 desde</span>
                        <span className="team-info-value">{t.firstAppeareance}</span>
                      </div>
                    )}
                    {t.constructorsChampionships != null && (
                      <div className="team-info-item">
                        <span className="team-info-label">Títulos constructores</span>
                        <span className="team-info-value">{t.constructorsChampionships}</span>
                      </div>
                    )}
                    {t.driversChampionships != null && (
                      <div className="team-info-item">
                        <span className="team-info-label">Títulos pilotos</span>
                        <span className="team-info-value">{t.driversChampionships}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
      )}
    </div>
  )
}

// ─── CIRCUITS ──────────────────────────────────────────────────────────────

function CircuitsSection() {
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/circuitos`)
      .then(r => r.json())
      .then(r => { setData(r.data); setLoading(false) })
      .catch(() => { setError('No se pudieron obtener los circuitos'); setLoading(false) })
  }, [])

  const circuits = (() => {
    const raw = data?.circuits || (Array.isArray(data) ? data : [])
    if (!search) return raw
    const q = search.toLowerCase()
    return raw.filter(c =>
      (c.circuitName || c.name || '').toLowerCase().includes(q) ||
      (c.country || c.location?.country || '').toLowerCase().includes(q) ||
      (c.city || c.location?.locality || '').toLowerCase().includes(q)
    )
  })()

  return (
    <div className="section">
      {selected && <CircuitModal circuit={selected} onClose={() => setSelected(null)} />}
      <div className="section-header">
        <h2 className="section-title">Circuitos</h2>
        {circuits.length > 0 && <span className="section-count">{circuits.length} TRAZADOS</span>}
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar circuito..." />
      </div>
      {loading && <LoadingState label="Cargando circuitos" />}
      {error   && <ErrorState msg={error} />}
      {!loading && !error && (
        circuits.length === 0
          ? <div className="empty">NO SE ENCONTRARON RESULTADOS</div>
          : <div className="grid-circuits">
              {circuits.map((c, i) => {
                const name    = c.circuitName || c.name || '—'
                const city    = c.city || c.location?.locality || ''
                const country = c.country || c.location?.country || ''
                const id      = c.circuitId || c.id || ''
                const length  = c.circuitLength || c.length || ''
                const laps    = c.numberOfLaps || c.laps || ''
                return (
                  <div key={id || i} className="circuit-card" onClick={() => setSelected(c)}>
                    <div className="circuit-location">{[city, country].filter(Boolean).join(' · ')}</div>
                    <div className="circuit-name">{name}</div>
                    <div style={{display:'flex',gap:'1.5rem',marginTop:'1rem'}}>
                      {length && <div className="driver-meta-item"><span className="driver-meta-label" style={{color:'var(--red)',fontFamily:'var(--mono)',fontSize:'0.6rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>Longitud</span><span style={{fontFamily:'var(--mono)',fontSize:'0.75rem'}}>{length}</span></div>}
                      {laps   && <div className="driver-meta-item"><span className="driver-meta-label" style={{color:'var(--red)',fontFamily:'var(--mono)',fontSize:'0.6rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>Vueltas</span><span style={{fontFamily:'var(--mono)',fontSize:'0.75rem'}}>{laps}</span></div>}
                    </div>
                    {id && <div className="circuit-id">ID: {id}</div>}
                  </div>
                )
              })}
            </div>
      )}
    </div>
  )
}

// ─── LANDING ───────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  'Lewis Hamilton · Ferrari', 'Max Verstappen · Red Bull', 'Lando Norris · McLaren',
  'Charles Leclerc · Ferrari', 'George Russell · Mercedes', 'Fernando Alonso · Aston Martin',
  'Carlos Sainz · Williams', 'Oscar Piastri · McLaren', 'Franco Colapinto · Alpine',
  'Temporada 2026', 'Gran Premio de Australia', 'Gran Premio de Monaco',
  'Gran Premio de Monza', 'Gran Premio de Silverstone', '22 pilotos · 11 escuderías',
]

function Landing({ onEnter }) {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div className="landing-nav-mark">F1</div>
          <span className="landing-nav-text">Proyecto API F1</span>
        </div>
        <div className="landing-nav-season">
          <div className="landing-nav-dot" />
          TEMPORADA 2026
        </div>
      </nav>

      <div className="landing-hero">
        <div className="landing-hero-left">
          <div className="landing-eyebrow">Fórmula 1 · Base de datos oficial</div>

          <h1 className="landing-title">
            <span>VELOCIDAD</span>
            <span className="line-red">SIN</span>
            <span className="line-dim">LÍMITES</span>
          </h1>

          <p className="landing-desc">
            Explorá la temporada 2026 de Fórmula 1 en tiempo real. Pilotos, escuderías
            y circuitos de la competencia más exigente del mundo, todo en un solo lugar.
          </p>

          <div className="landing-cta">
            <button className="btn-primary" onClick={onEnter}>
              Explorar temporada →
            </button>
            <button className="btn-secondary" onClick={onEnter}>
              Ver pilotos
            </button>
          </div>

          <div className="landing-stats">
            <div className="landing-stat">
              <div className="landing-stat-num">22</div>
              <div className="landing-stat-label">Pilotos</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-num">11</div>
              <div className="landing-stat-label">Escuderías</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-num">24</div>
              <div className="landing-stat-label">Circuitos</div>
            </div>
          </div>
        </div>

        <div className="landing-hero-right" aria-hidden="true">
          <div className="landing-big-num">F1</div>
          <div className="landing-big-num-accent">F1</div>
        </div>
      </div>

      <div className="landing-ticker">
        <div className="landing-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="landing-ticker-item">
              <span>◆</span>{item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'drivers',  label: 'Pilotos'   },
  { id: 'teams',    label: 'Equipos'   },
  { id: 'circuits', label: 'Circuitos' },
]

export default function App() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'app'
  const [tab, setTab]       = useState('drivers')

  if (screen === 'landing') {
    return (
      <>
        <style>{styles}</style>
        <Landing onEnter={() => setScreen('app')} />
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="nav">
          {/* logo lleva de vuelta a la landing */}
          <button className="nav-logo" onClick={() => setScreen('landing')}>
            <div className="landing-nav-mark">F1</div>
            <span className="nav-logo-text">Proyecto API F1 </span>
          </button>
          <div className="nav-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`nav-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="nav-status">
            <div className="status-dot" />
            LIVE · 2026
          </div>
        </nav>

        <header className="hero">
          <div className="hero-tag">Fórmula 1 · Temporada 2026</div>
          <h1 className="hero-title">
            {tab === 'drivers'  && <>PILOTOS <span>F1</span></>}
            {tab === 'teams'    && <>EQUIPOS <span>F1</span></>}
            {tab === 'circuits' && <>CIRCUITOS <span>F1</span></>}
          </h1>
          <p className="hero-sub">
            {tab === 'drivers'  && 'Los mejores pilotos del mundo compitiendo al límite de la velocidad y la física.'}
            {tab === 'teams'    && 'Las escuderías que diseñan, construyen y desarrollan las máquinas más rápidas del planeta.'}
            {tab === 'circuits' && 'Trazados legendarios donde la historia de la Fórmula 1 se escribe cada temporada.'}
          </p>
          <div className="hero-number" aria-hidden="true">
            {tab === 'drivers' ? '22' : tab === 'teams' ? '11' : '24'}
          </div>
        </header>

        {tab === 'drivers'  && <DriversSection  />}
        {tab === 'teams'    && <TeamsSection    />}
        {tab === 'circuits' && <CircuitsSection />}
      </div>
    </>
  )
}
