// script.js
// All logic: solvers, games, typing effect, navigation

// ---------- Navigation ----------
function navTo(id){
  document.querySelectorAll('.panel').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-target="${id}"]`)?.classList.add('active');
}
document.querySelectorAll('.menu-btn').forEach(b => {
  b.addEventListener('click', () => navTo(b.dataset.target));
});

// show home on load
navTo('home');

// ---------- Utilities ----------
const isNum = v => v !== null && v !== '' && !Number.isNaN(Number(v));
const toNum = v => isNum(v) ? Number(v) : null;
const fmt = n => (n===null || n===undefined || !Number.isFinite(n)) ? '—' : (Math.abs(n) < 1e-8 ? n.toExponential(4) : Number(n.toPrecision(12)).toString());

// typing effect helper: types text into an element char-by-char
// options: speed ms per char (default 18). If disableTyping true, write instantly.
function typeOut(el, text, options = {}) {
  const speed = options.speed ?? 16;
  const disable = options.disable ?? false;
  if (disable) { el.textContent = text; return Promise.resolve(); }

  el.textContent = '';
  el.classList.add('typing-caret');
  return new Promise(res => {
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(timer);
        el.classList.remove('typing-caret');
        res();
      }
    }, speed);
  });
}

// ---------- TRIANGLE SOLVER ----------
function triangle_clear() {
  ['tri_a','tri_b','tri_c','tri_A','tri_B','tri_C'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('tri_out').textContent = '';
}
function triangle_solve() {
  let a = toNum(document.getElementById('tri_a').value);
  let b = toNum(document.getElementById('tri_b').value);
  let c = toNum(document.getElementById('tri_c').value);
  let A = toNum(document.getElementById('tri_A').value);
  let B = toNum(document.getElementById('tri_B').value);
  let C = toNum(document.getElementById('tri_C').value);

  const deg2rad = d => d * Math.PI/180;
  const rad2deg = r => r * 180/Math.PI;
  const known = x => x !== null;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    // angle sum
    if (known(A) && known(B) && !known(C)) { C = 180 - A - B; changed = true; }
    if (known(A) && known(C) && !known(B)) { B = 180 - A - C; changed = true; }
    if (known(B) && known(C) && !known(A)) { A = 180 - B - C; changed = true; }

    // law of sines: a/sinA = b/sinB = c/sinC
    if (known(A) && known(a) && known(B) && !known(b)) { b = a * Math.sin(deg2rad(B)) / Math.sin(deg2rad(A)); changed = true; }
    if (known(A) && known(a) && known(C) && !known(c)) { c = a * Math.sin(deg2rad(C)) / Math.sin(deg2rad(A)); changed = true; }
    if (known(B) && known(b) && known(A) && !known(a)) { a = b * Math.sin(deg2rad(A)) / Math.sin(deg2rad(B)); changed = true; }

    // law of cosines for sides
    if (!known(a) && known(b) && known(c) && known(A)) { const val = b*b + c*c - 2*b*c*Math.cos(deg2rad(A)); if (val >= 0) { a = Math.sqrt(val); changed = true; } }
    if (!known(b) && known(a) && known(c) && known(B)) { const val = a*a + c*c - 2*a*c*Math.cos(deg2rad(B)); if (val >= 0) { b = Math.sqrt(val); changed = true; } }
    if (!known(c) && known(a) && known(b) && known(C)) { const val = a*a + b*b - 2*a*b*Math.cos(deg2rad(C)); if (val >= 0) { c = Math.sqrt(val); changed = true; } }

    // law of cosines for angles if all sides known
    if (known(a) && known(b) && known(c)) {
      if (!known(A)) { const v = (b*b + c*c - a*a) / (2*b*c); if (v >= -1 && v <= 1) { A = rad2deg(Math.acos(v)); changed = true; } }
      if (!known(B)) { const v = (a*a + c*c - b*b) / (2*a*c); if (v >= -1 && v <= 1) { B = rad2deg(Math.acos(v)); changed = true; } }
      if (!known(C)) { const v = (a*a + b*b - c*c) / (2*a*b); if (v >= -1 && v <= 1) { C = rad2deg(Math.acos(v)); changed = true; } }
    }
  }

  const out = `Iterations: ${iter}\n` +
    `a = ${fmt(a)}\nb = ${fmt(b)}\nc = ${fmt(c)}\nA = ${fmt(A)}°\nB = ${fmt(B)}°\nC = ${fmt(C)}°`;
  document.getElementById('tri_out').textContent = out;
}



// ---------- TRIG EVALUATOR ----------
function trig_compute() {
  const mode = document.getElementById('tri_mode').value; // deg or rad
  const op = document.getElementById('tri_op').value;
  const raw = document.getElementById('tri_val').value;
  const outEl = document.getElementById('tri_out');
  if (raw === '') { outEl.textContent = 'Enter a value'; return; }
  const x = Number(raw);
  const toRad = v => mode === 'deg' ? v * Math.PI/180 : v;
  const fromRad = v => mode === 'deg' ? v * 180/Math.PI : v;

  try {
    let res = null, note = '';
    switch (op) {
      case 'sin': res = Math.sin(toRad(x)); break;
      case 'cos': res = Math.cos(toRad(x)); break;
      case 'tan': res = Math.tan(toRad(x)); break;
      case 'csc': res = 1/Math.sin(toRad(x)); break;
      case 'sec': res = 1/Math.cos(toRad(x)); break;
      case 'cot': res = 1/Math.tan(toRad(x)); break;
      case 'asin': { let v = Math.asin(x); res = fromRad(v); note = '(output in chosen mode)'; break; }
      case 'acos': { let v = Math.acos(x); res = fromRad(v); note = '(output in chosen mode)'; break; }
      case 'atan': { let v = Math.atan(x); res = fromRad(v); note = '(output in chosen mode)'; break; }
      case 'asec': { let v = 1/x; if (Math.abs(v) > 1) { let r = Math.acos(1/v); res = fromRad(r); note = '(arcsec)'; } else res = NaN; break; }
      case 'acsc': { let v = 1/x; if (Math.abs(v) <= 1) { let r = Math.asin(1/v); res = fromRad(r); note = '(arccsc)'; } else res = NaN; break; }
      case 'acot': { let r = Math.atan(1/x); res = fromRad(r); note = '(arccot)'; break; }
      case 'sinh': res = Math.sinh(toRad(x)); break;
      case 'cosh': res = Math.cosh(toRad(x)); break;
      case 'tanh': res = Math.tanh(toRad(x)); break;
      case 'csch': res = 1/Math.sinh(toRad(x)); break;
      case 'sech': res = 1/Math.cosh(toRad(x)); break;
      case 'coth': res = 1/Math.tanh(toRad(x)); break;
    }
    outEl.textContent = `Result: ${fmt(res)} ${note}`;
  } catch (e) {
    outEl.textContent = 'Error: ' + e.message;
  }
}

// ---------- KINEMATICS SOLVER ----------
function kinematics_clear() {
  ['kin_s','kin_u','kin_v','kin_a','kin_t'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('kin_out').textContent = '';
}
async function kinematics_solve() {
  let s = toNum(document.getElementById('kin_s').value);
  let u = toNum(document.getElementById('kin_u').value);
  let v = toNum(document.getElementById('kin_v').value);
  let a = toNum(document.getElementById('kin_a').value);
  let t = toNum(document.getElementById('kin_t').value);
  const known = x => x !== null;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    // v = u + a t
    if (!known(v) && known(u) && known(a) && known(t)) { v = u + a*t; changed = true; }
    if (!known(u) && known(v) && known(a) && known(t)) { u = v - a*t; changed = true; }
    if (!known(a) && known(v) && known(u) && known(t) && t !== 0) { a = (v - u)/t; changed = true; }
    if (!known(t) && known(v) && known(u) && known(a) && a !== 0) { t = (v - u)/a; changed = true; }

    // s = u t + 0.5 a t^2
    if (!known(s) && known(u) && known(t) && known(a)) { s = u*t + 0.5*a*t*t; changed = true; }
    // s = (u+v)/2 * t
    if (!known(s) && known(u) && known(v) && known(t)) { s = (u+v)/2 * t; changed = true; }
    if (!known(t) && known(s) && known(u) && known(v) && (u+v) !== 0) { t = (2*s)/(u+v); changed = true; }

    // v^2 = u^2 + 2 a s
    if (!known(v) && known(u) && known(a) && known(s)) { const val = u*u + 2*a*s; if (val >= 0) { v = Math.sqrt(val); changed = true; } }
    if (!known(u) && known(v) && known(a) && known(s)) { const val = v*v - 2*a*s; if (val >= 0) { u = Math.sqrt(val); changed = true; } }
    if (!known(a) && known(v) && known(u) && known(s) && s !== 0) { a = (v*v - u*u)/(2*s); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `s = ${fmt(s)}\nu = ${fmt(u)}\nv = ${fmt(v)}\na = ${fmt(a)}\nt = ${fmt(t)}`;

  const el = document.getElementById('kin_out');
  const typing = document.getElementById('kin_typing').checked;
  await typeOut(el, out, { disable: !typing, speed: 18 });
}

// ---------- PROJECTILE FLEXIBLE SOLVER ----------
function proj_clear(){ ['pm_v0','pm_theta','pm_g','pm_T','pm_R','pm_H'].forEach(id=>document.getElementById(id).value=''); document.getElementById('pm_out').textContent=''; }
function proj_flexible(){
  let v0 = toNum(document.getElementById('pm_v0').value);
  let theta = toNum(document.getElementById('pm_theta').value); // degrees
  let g = toNum(document.getElementById('pm_g').value) ?? 9.81;
  let T = toNum(document.getElementById('pm_T').value);
  let R = toNum(document.getElementById('pm_R').value);
  let H = toNum(document.getElementById('pm_H').value);

  const known = x => x !== null;
  const deg2rad = d => d * Math.PI/180;
  const rad2deg = r => r * 180/Math.PI;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    // If v0 and θ known -> compute T,R,H
    if (known(v0) && known(theta)) {
      const th = deg2rad(theta);
      if (!known(T)) { T = 2*v0*Math.sin(th)/g; changed = true; }
      if (!known(R)) { R = (v0*v0*Math.sin(2*th))/g; changed = true; }
      if (!known(H)) { H = (v0*v0*Math.sin(th)*Math.sin(th))/(2*g); changed = true; }
    }
    // If T & θ known -> v0
    if (known(T) && known(theta) && !known(v0)) { const th = deg2rad(theta); v0 = (T*g)/(2*Math.sin(th)); changed = true; }
    // If R & θ known -> v0
    if (known(R) && known(theta) && !known(v0)) { const th = deg2rad(theta); const denom = Math.sin(2*th); if (Math.abs(denom) > 1e-12) { v0 = Math.sqrt(R*g/denom); changed = true; } }
    // If v0 & R known -> θ (principal)
    if (known(v0) && known(R) && !known(theta)) { const val = (R*g)/(v0*v0); if (Math.abs(val) <= 1) { const twoTh = Math.asin(val); theta = rad2deg(twoTh/2); changed = true; }
    }
    // If H & v0 known -> θ
    if (known(H) && known(v0) && !known(theta)) { const v = (2*g*H)/(v0*v0); if (v >= 0 && v <= 1) { theta = rad2deg(Math.asin(Math.sqrt(v))); changed = true; }
    }
    // If H & θ known -> v0
    if (known(H) && known(theta) && !known(v0)) { const th = deg2rad(theta); const denom = Math.sin(th)*Math.sin(th); if (denom > 0) { v0 = Math.sqrt(2*g*H/denom); changed = true; }
    }
    // If T & v0 known -> θ
    if (known(T) && known(v0) && !known(theta)) { const val = (T*g)/(2*v0); if (Math.abs(val) <= 1) { theta = rad2deg(Math.asin(val)); changed = true; }
    }
  }

  const out = `Iterations: ${iter}\n` +
    `v0 = ${fmt(v0)} m/s\nθ = ${fmt(theta)}°\ng = ${fmt(g)} m/s²\nT = ${fmt(T)} s\nR = ${fmt(R)} m\nH = ${fmt(H)} m`;
  document.getElementById('pm_out').textContent = out;
}


// ---------- WAVES CALCULATOR ---------

function waves_clear() {
  ['wav_v','wav_f','wav_wavelength','wav_T','wav_F', 'wav_u'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('wav_out').textContent = '';
}
async function waves_solve() {
  let v = toNum(document.getElementById('wav_v').value);
  let f = toNum(document.getElementById('wav_f').value);
  let lambda = toNum(document.getElementById('lambda').value);
  let T = toNum(document.getElementById('wav_T').value);
  let F = toNum(document.getElementById('wav_F').value);
  let mu = toNum(document.getElementById('wav_mu').value);
  const known = x => x !== null;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    
    // v = f * lambda
    if (!known(v) && known(f) && known(lambda)) { v = f * lambda; changed = true; }
    if (!known(f) && known(v) && known(lambda) && lambda !== 0) { f = v / lambda; changed = true; }
    if (!known(lambda) && known(v) && known(f) && f !== 0) { lambda = v / f; changed = true; }

    // T = 1/f and f = 1/T
    if (!known(T) && known(f) && f !== 0) { T = 1 / f; changed = true; }
    if (!known(f) && known(T) && T !== 0) { f = 1 / T; changed = true; }

    // v = lambda / T or lambda = v * T
    if (!known(v) && known(lambda) && known(T) && T !== 0) { v = lambda / T; changed = true; }
    if (!known(lambda) && known(v) && known(T)) { lambda = v * T; changed = true; }
    if (!known(T) && known(v) && known(lambda) && v !== 0) { T = lambda / v; changed = true; }

    // v = √(F/μ)
    if (!known(v) && known(F) && known(mu) && mu !== 0) { v = Math.sqrt(F / mu); changed = true; }
    // F = μv²
    if (!known(F) && known(v) && known(mu)) { F = mu * v * v; changed = true; 
    }
    // μ = F/v²
    if (!known(mu) && known(v) && known(F) && v !== 0) { mu = F / (v * v); changed = true; 
    }
  }

  const out = `Iterations: ${iter}\n` +
    `v = ${fmt(v)}\n` +
    `f = ${fmt(f)}\n` +
    `λ = ${fmt(lambda)}\n` +
    `T = ${fmt(T)}\n` +
    `F = ${fmt(F)}\n` +
    `μ = ${fmt(mu)}`;
  
  const el = document.getElementById('wav_out');
  const typing = document.getElementById('wav_typing').checked;
  await typeOut(el, out, { disable: !typing, speed: 18 });
}

// ---------- GAMES: fg2 Quiz ----------
let fg2_state = null;
function fg2_start(){
  const min = toNum(document.getElementById('fg_min').value) ?? 0;
  const max = toNum(document.getElementById('fg_max').value) ?? 10;
  const opsPer = toNum(document.getElementById('fg_ops').value) ?? 1;
  const n = toNum(document.getElementById('fg_n').value) ?? 5;
  if (min > max) { document.getElementById('fg2_area').textContent = 'Min must be <= Max.'; return; }
  const allowed = ['+','-','*','/','%']; // simple ops by default (expand if needed)
  fg2_state = {min,max,opsPer,n,idx:0,score:0};
  fg2_next();
}
function fg2_reset(){ fg2_state = null; document.getElementById('fg2_area').textContent = 'Reset. Configure and press Start.'; }
function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function randChoice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function makeExpr(min,max,ops){
  let expr = `${randInt(min,max)}`;
  const opsList = ['+','-','*','/','%'];
  for(let i=0;i<ops;i++){
    const op = randChoice(opsList);
    const num = randInt(min,max);
    expr += ` ${op} ${num}`;
  }
  return expr;
}
function evalExpr(s){
  if(!/^[-+*/%(). 0-9]+$/.test(s)) throw new Error('Invalid tokens');
  return Function(`"use strict"; return (${s});`)();
}
function fg2_next(){
  if(!fg2_state) return;
  if(fg2_state.idx >= fg2_state.n){ document.getElementById('fg2_area').textContent = `Finished! Score: ${fg2_state.score}/${fg2_state.n}`; return; }
  const expr = makeExpr(fg2_state.min, fg2_state.max, fg2_state.opsPer);
  const correct = evalExpr(expr);
  fg2_state.current = {expr, correct};
  document.getElementById('fg2_area').innerHTML = `Q${fg2_state.idx+1}/${fg2_state.n}: Solve → ${expr}\n\n<input id="fg2_answer" type="number" step="any" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.03);background:#071219;color:#e6eef6;font-family:var(--mono)"/> <button class="btn" onclick="fg2_submit()">Submit</button>`;
  document.getElementById('fg2_answer').focus();
}
function fg2_submit(){
  const ans = Number(document.getElementById('fg2_answer').value);
  const ok = Math.abs(ans - fg2_state.current.correct) < 1e-9;
  if(ok) fg2_state.score++;
  fg2_state.idx++;
  document.getElementById('fg2_area').textContent = (ok ? '✅ Correct! ' : '❌ Incorrect. ') + `Answer: ${fmt(fg2_state.current.correct)}`;
  setTimeout(fg2_next, 700);
}

// ---------- NUMBER GUESSING ----------
let ng_secret = null, ng_tries = 0;
function ng_start(){ ng_secret = randInt(1,100); ng_tries = 0; document.getElementById('ng_out').textContent='I picked a number 1–100. Start guessing!'; }
function ng_try(){
  const g = toNum(document.getElementById('ng_guess').value);
  if (g === null) return;
  ng_tries++;
  if (g === ng_secret){ document.getElementById('ng_out').textContent = `🎉 You got it in ${ng_tries} tries!`; ng_secret = null; }
  else if (g < ng_secret) document.getElementById('ng_out').textContent = 'Too low.';
  else document.getElementById('ng_out').textContent = 'Too high.';
}
// End of script.js
