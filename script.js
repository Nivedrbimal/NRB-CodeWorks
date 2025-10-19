
// Uses DOMContentLoaded and defer script in HTML



document.body.style.overflow = 'hidden';
// ---------- Utilities ----------
const isNum = v => v !== null && v !== '' && !Number.isNaN(Number(v));
const toNum = v => isNum(v) ? Number(v) : null;
const fmt = n => (n === null || n === undefined || !Number.isFinite(n)) ? '—' : (Math.abs(n) < 1e-8 ? n.toExponential(4) : Number(n.toPrecision(12)).toString());

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

// ---------- Navigation ----------

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarResponsive = document.getElementById("toggleSidebarResponsive");

  toggleSidebarResponsive.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});

document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    e.target !== toggleSidebarResponsive
  ) {
    sidebar.classList.remove("open");
  }
});

function navTo(id) {
  document.querySelectorAll('.panel').forEach(s => {
    if (s.id === id) {
      s.classList.remove('hidden');
      s.classList.add('visible-panel');
      s.querySelectorAll('input, button, select, textarea').forEach(el => el.setAttribute('tabindex', '0'));
    } else {
      s.classList.add('hidden');
      s.classList.remove('visible-panel');
      s.querySelectorAll('input, button, select, textarea').forEach(el => el.setAttribute('tabindex', '-1'));
    }
  });

  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.menu-btn[data-target="${id}"]`);
  if (btn) btn.classList.add('active');

  // move focus to main container for keyboard users
  const app = document.getElementById('app');
  if (app) app.focus();
}

document.addEventListener('click', (e) => {
  const mb = e.target.closest('.menu-btn');
  if (mb) navTo(mb.dataset.target);
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});

function toggleDropdown() {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  dd.classList.toggle('open');
  const content = document.getElementById('opsContent');
  const toggle = document.getElementById('opsToggle');
  if (dd.classList.contains('open')) {
    content.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    content.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
const opsToggle = document.getElementById('opsToggle');
if (opsToggle) {
  opsToggle.addEventListener('click', toggleDropdown);
  opsToggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); } });
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  if (!dd.contains(e.target)) {
    dd.classList.remove('open');
    document.getElementById('opsContent').setAttribute('aria-hidden', 'true');
    document.getElementById('opsToggle').setAttribute('aria-expanded', 'false');
  }
});

function getSelectedOperations() {
  const boxes = Array.from(document.querySelectorAll('.operation'));
  const ops = boxes.filter(cb => cb.checked).map(cb => cb.value);
  return ops.length ? ops : ['+', '-', '*', '/'];
}

// ---------- INTRO SCREEN ----------
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const header = document.getElementById('mainHeader');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('app');

  if (!intro) {
    header.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    main.classList.remove('hidden');
    header.classList.add('visible');
    sidebar.classList.add('visible');
    main.classList.add('visible');
    document.body.style.overflow = 'auto';
    return;
  }

  setTimeout(() => { intro.classList.add('fade-out'); }, 1250);
  setTimeout(() => {
    if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    if (header) header.classList.remove('hidden');
    if (sidebar) sidebar.classList.remove('hidden');
    if (main) main.classList.remove('hidden');

    header && header.classList.add('visible');
    sidebar && sidebar.classList.add('visible');
    main && main.classList.add('visible');

    document.body.style.overflow = 'auto';
    main && main.focus();
  }, 1250);
});

// ---------- TRIG EVALUATOR ----------
function parseRadianInput(raw) {
  let str = raw.replace(/π/g, 'Math.PI');
  
  try {
    return eval(str); 
  } catch(e) {
    return NaN;
  }
}
function updatePlaceholder() {
  const mode = document.getElementById('triMode').value;
  const input = document.getElementById('triVal');
  const op = document.getElementById('triOp').value;
  if (['asin', 'acos', 'atan', 'acsc', 'asec', 'acot'].includes(op)) {
    input.placeholder = 'Enter value';
  } 
  else if (['sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth'].includes(op)) {
    input.placeholder = 'Enter a real number';
  } 
  else {
    if (mode === 'deg' || mode === 'pol') {
      input.placeholder = 'Enter in degree(s)';
    } else if (mode === 'rad') {
      input.placeholder = 'Enter in radian(s) (use the pi symbol (π) when inputting)';
    } else {
      input.placeholder = 'Enter number';
    }
  }
}
function trigClear() {
  document.getElementById('triOut').textContent = '';
  document.getElementById('triVal').value = '';
  document.getElementById('triOp').value = 'sin';
  document.getElementById('triMode').value = 'deg';
  updatePlaceholder(); 
}
function trigCompute() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const raw = document.getElementById('triVal').value;
  const outEl = document.getElementById('triOut');
  if (!raw) { outEl.textContent = 'Enter a value'; return; }
  let x;
  if (mode === 'rad') {
    x = parseRadianInput(raw);
  } else {
    x = Number(raw);
  }
  if (isNaN(x)) { outEl.textContent = 'Invalid input'; return; }
  const toRad = v => mode === 'deg' ? v * Math.PI / 180 : v;
  const fromRad = v => mode === 'deg' ? v * 180 / Math.PI : v;
  const pi = Math.PI;
  
  try {
    const angle = toRad(x);
    let res = null;
    switch (op) {
      case 'sin': res = Math.sin(toRad(x)); break;
      case 'cos': res = Math.cos(toRad(x)); break;
      case 'tan': res = Math.tan(toRad(x)); break;
      case 'csc': res = 1 / Math.sin(toRad(x)); break;
      case 'sec': res = 1 / Math.cos(toRad(x)); break;
      case 'cot': res = 1 / Math.tan(toRad(x)); break;
      case 'asin': { let v = Math.asin(x); res = fromRad(v); break; }
      case 'acos': { let v = Math.acos(x); res = fromRad(v); break; }
      case 'atan': { let v = Math.atan(x); res = fromRad(v); break; }
      case 'asec': { let v = 1 / x; if (Math.abs(v) <= 1) { let r = Math.acos(1 / v); res = fromRad(r); } else res = NaN; break; }
      case 'acsc': { let v = 1 / x; if (Math.abs(v) <= 1) { let r = Math.asin(1 / v); res = fromRad(r); } else res = NaN; break; }
      case 'acot': { let r = Math.atan(1 / x); res = fromRad(r); break; }
      case 'sinh': res = Math.sinh(toRad(x)); break;
      case 'cosh': res = Math.cosh(toRad(x)); break;
      case 'tanh': res = Math.tanh(toRad(x)); break;
      case 'csch': res = 1 / Math.sinh(toRad(x)); break;
      case 'sech': res = 1 / Math.cosh(toRad(x)); break;
      case 'coth': res = 1 / Math.tanh(toRad(x)); break;
      default: res = NaN;
    }
    var rad = null;
    if (op === 'sin') {
      if (angle === 0 || angle === 2*pi || angle === -2*pi) rad = '0';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '1/2';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '√2/2';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '√3/2';
      else if (angle === pi/2 || angle === -3*pi/2) rad = '1';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '√3/2';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '√2/2';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '1/2';
      else if (angle === pi || angle === -pi) rad = '0';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '-1/2';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '-√2/2';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '-√3/2';
      else if (angle === 3*pi/2 || angle === -pi/2) rad = '-1';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '-√3/2';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '-√2/2';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '-1/2';
    }

    // cos
    else if (op === 'cos') {
      if (angle === 0 || angle === 2*pi || angle === -2*pi) rad = '1';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '√3/2';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '√2/2';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '1/2';
      else if (angle === pi/2 || angle === -3*pi/2) rad = '0';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '-1/2';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '-√2/2';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '-√3/2';
      else if (angle === pi || angle === -pi) rad = '-1';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '-√3/2';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '-√2/2';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '-1/2';
      else if (angle === 3*pi/2 || angle === -pi/2) rad = '0';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '1/2';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '√2/2';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '√3/2';
    }

    // tan
    else if (op === 'tan') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2*pi || angle === -2*pi) rad = '0';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '1/√3';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '1';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '√3';
      else if (angle === pi/2 || angle === -3*pi/2 || angle === 3*pi/2 || angle === -pi/2) rad = 'undefined';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '-√3';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '-1';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '-1/√3';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '1/√3';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '1';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '√3';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '-√3';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '-1';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '-1/√3';
    }

    // csc
    else if (op === 'csc') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2*pi || angle === -2*pi) rad = 'undefined';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '2';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '√2';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '2√3/3';
      else if (angle === pi/2 || angle === -3*pi/2) rad = '1';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '2√3/3';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '√2';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '2';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '-2';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '-√2';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '-2√3/3';
      else if (angle === 3*pi/2 || angle === -pi/2) rad = '-1';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '-2√3/3';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '-√2';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '-2';
    }

    // sec
    else if (op === 'sec') {
      if (angle === pi/2 || angle === -3*pi/2 || angle === 3*pi/2 || angle === -pi/2) rad = 'undefined';
      else if (angle === 0 || angle === 2*pi || angle === -2*pi) rad = '1';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '2√3/3';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '√2';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '2';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '-2';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '-√2';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '-2√3/3';
      else if (angle === pi || angle === -pi) rad = '-1';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '-2√3/3';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '-√2';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '-2';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '2';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '√2';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '2√3/3';
    }

    // cot
    else if (op === 'cot') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2*pi || angle === -2*pi) rad = 'undefined';
      else if (angle === pi/6 || angle === -11*pi/6) rad = '√3/1';
      else if (angle === pi/4 || angle === -7*pi/4) rad = '1';
      else if (angle === pi/3 || angle === -5*pi/3) rad = '3√3/3';
      else if (angle === pi/2 || angle === -3*pi/2 || angle === 3*pi/2 || angle === -pi/2) rad = '0';
      else if (angle === 2*pi/3 || angle === -4*pi/3) rad = '-3√3/3';
      else if (angle === 3*pi/4 || angle === -5*pi/4) rad = '-1';
      else if (angle === 5*pi/6 || angle === -7*pi/6) rad = '-√3';
      else if (angle === 7*pi/6 || angle === -5*pi/6) rad = '√3';
      else if (angle === 5*pi/4 || angle === -3*pi/4) rad = '1';
      else if (angle === 4*pi/3 || angle === -2*pi/3) rad = '3√3/1';
      else if (angle === 5*pi/3 || angle === -pi/3) rad = '-3√3/3';
      else if (angle === 7*pi/4 || angle === -pi/4) rad = '-1';
      else if (angle === 11*pi/6 || angle === -pi/6) rad = '-√3';
    }

    if (rad !== null) {
      outEl.textContent = `Result: ${fmt(res)} or ` + rad;
    }
    else
      outEl.textContent = `Result: ${fmt(res)}`;
  } catch (e) {
    outEl.textContent = 'Error: ' + e.message;
  }
}

// ---------- QUADRATIC EQUATION ---------

function quadeClear() {
  ['quadA', 'quadB', 'quadC', 'quadX1', 'quadX2', 'quadH', 'quadK', 'quadPx', 'quadPy'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('quadOut').textContent = '';
}

function quadeSolve() {
  let a = toNum(document.getElementById('quadA').value);
  let b = toNum(document.getElementById('quadB').value);
  let c = toNum(document.getElementById('quadC').value);
  let x1 = toNum(document.getElementById('quadX1').value);
  let x2 = toNum(document.getElementById('quadX2').value);
  let h = toNum(document.getElementById('quadH').value);
  let k = toNum(document.getElementById('quadK').value);
  let px = toNum(document.getElementById('quadPx').value);
  let py = toNum(document.getElementById('quadPy').value);
  const known = x => x !== null && x !== undefined && !isNaN(x);

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (known(a) && known(b) && known(c) && !known(x1) && !known(x2)) {
      let discriminant = b*b - 4*a*c;
      if (discriminant >= 0) { x1 = (-b + Math.sqrt(discriminant)) / (2*a); x2 = (-b - Math.sqrt(discriminant)) / (2*a); changed = true; }
    }
    if (known(a) && known(x1) && known(x2)) {
      if (!known(b)) { b = -a * (x1 + x2); changed = true; }
      if (!known(c)) { c = a * (x1 * x2); changed = true; }
    }
    if (known(a) && known(x1)) {
      if (!known(b) && known(c)) { b = -(a*x1*x1 + c)/x1; changed = true; }
      if (!known(c) && known(b)) { c = -(a*x1*x1 + b*x1); changed = true; } 
    }
    if (!known(a) && known(b) && known(c) && known(x1)) { a = -(b*x1 + c)/(x1*x1); changed = true; }
    if (known(a) && known(b) && !known(h)) { h = -b/(2*a); changed = true; }
    if (known(a) && known(h) && !known(k) && known(c)) { k = a*h*h + b*h + c; changed = true; }
    if (known(a) && known(h) && !known(b)) { b = -2 * a * h; changed = true; }
    if (known(a) && known(b) && known(h) && known(k) && !known(c)) { c = k - (a * h * h + b * h); changed = true; }
    if (known(a) && known(b) && known(px) && known(py) && !known(c)) { c = py - (a*px*px + b*px); changed = true; }
    if (known(a) && known(c) && known(px) && known(py) && !known(b)) { b = (py - c - a*px*px)/px; changed = true; }
    if (known(b) && known(c) && known(px) && known(py) && !known(a)) { a = (py - b*px - c)/(px*px); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `a = ${fmt(a)}\n` +
    `b = ${fmt(b)}\n` +
    `c = ${fmt(c)}\n` +
    `x1 = ${fmt(x1)}\n` +
    `x2 = ${fmt(x2)}\n` +
    `h = ${fmt(h)}\n` +
    `k = ${fmt(k)}\n` +
    `x = ${fmt(px)}\n` +
    `y = ${fmt(py)}`;

  document.getElementById('quadOut').textContent = out;
}


// ---------- KINEMATICS SOLVER ----------
function kinematics_clear() {
  ['kin_s', 'kin_u', 'kin_v', 'kin_a', 'kin_t'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('kin_out').textContent = '';
}
function kinematics_solve() {
  let s = toNum(document.getElementById('kin_s').value);
  let u = toNum(document.getElementById('kin_u').value);
  let v = toNum(document.getElementById('kin_v').value);
  let a = toNum(document.getElementById('kin_a').value);
  let t = toNum(document.getElementById('kin_t').value);
  const known = x => x !== null;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (!known(v) && known(u) && known(a) && known(t)) { v = u + a * t; changed = true; }
    if (!known(u) && known(v) && known(a) && known(t)) { u = v - a * t; changed = true; }
    if (!known(a) && known(v) && known(u) && known(t) && t !== 0) { a = (v - u) / t; changed = true; }
    if (!known(t) && known(v) && known(u) && known(a) && a !== 0) { t = (v - u) / a; changed = true; }
    if (!known(s) && known(u) && known(t) && known(a)) { s = u * t + 0.5 * a * t * t; changed = true; }
    if (!known(s) && known(u) && known(v) && known(t)) { s = (u + v) / 2 * t; changed = true; }
    if (!known(t) && known(s) && known(u) && known(v) && (u + v) !== 0) { t = (2 * s) / (u + v); changed = true; }
    if (!known(v) && known(u) && known(a) && known(s)) { const val = u * u + 2 * a * s; if (val >= 0) { v = Math.sqrt(val); changed = true; } }
    if (!known(u) && known(v) && known(a) && known(s)) { const val = v * v - 2 * a * s; if (val >= 0) { u = Math.sqrt(val); changed = true; } }
    if (!known(a) && known(v) && known(u) && known(s) && s !== 0) { a = (v * v - u * u) / (2 * s); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `s = ${fmt(s)}\n` +
    `u = ${fmt(u)}\n` +
    `v = ${fmt(v)}\n` +
    `a = ${fmt(a)}\n` +
    `t = ${fmt(t)}`;

  document.getElementById('kin_out').textContent = out;
}

// ---------- PROJECTILE FLEXIBLE SOLVER ----------
function proj_clear() {
  ['pm_v0', 'pm_theta', 'pm_g', 'pm_T', 'pm_R', 'pm_H'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pm_out').textContent = '';
}
function proj_flexible() {
  let v0 = toNum(document.getElementById('pm_v0').value);
  let theta = toNum(document.getElementById('pm_theta').value); // degrees
  let g = toNum(document.getElementById('pm_g').value) ?? 9.81;
  let T = toNum(document.getElementById('pm_T').value);
  let R = toNum(document.getElementById('pm_R').value);
  let H = toNum(document.getElementById('pm_H').value);

  const known = x => x !== null;
  const deg2rad = d => d * Math.PI / 180;
  const rad2deg = r => r * 180 / Math.PI;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (known(v0) && known(theta)) {
      const th = deg2rad(theta);
      if (!known(T)) { T = 2 * v0 * Math.sin(th) / g; changed = true; }
      if (!known(R)) { R = (v0 * v0 * Math.sin(2 * th)) / g; changed = true; }
      if (!known(H)) { H = (v0 * v0 * Math.sin(th) * Math.sin(th)) / (2 * g); changed = true; }
    }
    if (known(T) && known(theta) && !known(v0)) { const th = deg2rad(theta); v0 = (T * g) / (2 * Math.sin(th)); changed = true; }
    if (known(R) && known(theta) && !known(v0)) { const th = deg2rad(theta); const denom = Math.sin(2 * th); if (Math.abs(denom) > 1e-12) { v0 = Math.sqrt(R * g / denom); changed = true; } }
    if (known(v0) && known(R) && !known(theta)) { const val = (R * g) / (v0 * v0); if (Math.abs(val) <= 1) { const twoTh = Math.asin(val); theta = rad2deg(twoTh / 2); changed = true; } }
    if (known(H) && known(v0) && !known(theta)) { const v = (2 * g * H) / (v0 * v0); if (v >= 0 && v <= 1) { theta = rad2deg(Math.asin(Math.sqrt(v))); changed = true; } }
    if (known(H) && known(theta) && !known(v0)) { const th = deg2rad(theta); const denom = Math.sin(th) * Math.sin(th); if (denom > 0) { v0 = Math.sqrt(2 * g * H / denom); changed = true; } }
    if (known(T) && known(v0) && !known(theta)) { const val = (T * g) / (2 * v0); if (Math.abs(val) <= 1) { theta = rad2deg(Math.asin(val)); changed = true; } }
  }

  const out = `Iterations: ${iter}\n` +
    `v0 = ${fmt(v0)} m/s\n` +
    `θ = ${fmt(theta)}°\n` +
    `g = ${fmt(g)} m/s²\n` +
    `T = ${fmt(T)} s\n` +
    `R = ${fmt(R)} m\n` +
    `H = ${fmt(H)} m`;
  document.getElementById('pm_out').textContent = out;
}

// ---------- WAVES CALCULATOR ----------
function waves_clear() {
  ['wav_v', 'wav_f', 'wav_lambda', 'wav_T', 'wav_F', 'wav_mu'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('wav_out').textContent = '';
}
function waves_solve() {
  let v = toNum(document.getElementById('wav_v').value);
  let f = toNum(document.getElementById('wav_f').value);
  let lambda = toNum(document.getElementById('wav_lambda').value);
  let T = toNum(document.getElementById('wav_T').value);
  let F = toNum(document.getElementById('wav_F').value);
  let mu = toNum(document.getElementById('wav_mu').value);
  const known = x => x !== null;

  let changed = true, iter = 0;
  while (changed && iter < 40) {
    changed = false; iter++;
    if (!known(v) && known(f) && known(lambda)) { v = f * lambda; changed = true; }
    if (!known(f) && known(v) && known(lambda) && lambda !== 0) { f = v / lambda; changed = true; }
    if (!known(lambda) && known(v) && known(f) && f !== 0) { lambda = v / f; changed = true; }
    if (!known(T) && known(f) && f !== 0) { T = 1 / f; changed = true; }
    if (!known(f) && known(T) && T !== 0) { f = 1 / T; changed = true; }
    if (!known(v) && known(lambda) && known(T) && T !== 0) { v = lambda / T; changed = true; }
    if (!known(lambda) && known(v) && known(T)) { lambda = v * T; changed = true; }
    if (!known(T) && known(v) && known(lambda) && v !== 0) { T = lambda / v; changed = true; }
    if (!known(v) && known(F) && known(mu) && mu !== 0) { v = Math.sqrt(F / mu); changed = true; }
    if (!known(F) && known(v) && known(mu)) { F = mu * v * v; changed = true; }
    if (!known(mu) && known(v) && known(F) && v !== 0) { mu = F / (v * v); changed = true; }
  }

  const out = `Iterations: ${iter}\n` +
    `v = ${fmt(v)}\n` +
    `f = ${fmt(f)}\n` +
    `λ = ${fmt(lambda)}\n` +
    `T = ${fmt(T)}\n` +
    `F = ${fmt(F)}\n` +
    `μ = ${fmt(mu)}`;

  document.getElementById('wav_out').textContent = out;
}

// ---------- GAMES: fg2 Quiz ----------
let fg2_state = null;

// get selected operations from checkboxes
function getSelectedOperations() {
  const ops = [];
  document.querySelectorAll('.operation:checked').forEach(cb => {
    ops.push(cb.value);
  });
  return ops.length > 0 ? ops : ['+']; // fallback to + if none selected
}

function fg2_start() {
  const min = toNum(document.getElementById('fg_min').value) ?? 0;
  const max = toNum(document.getElementById('fg_max').value) ?? 10;
  const opsPer = toNum(document.getElementById('fg_ops').value) ?? 1;
  const n = toNum(document.getElementById('fg_n').value) ?? 5;

  if (min > max) {
    document.getElementById('fg2_area').textContent = 'Min must be <= Max.';
    return;
  }

  const allowed = getSelectedOperations();
  fg2_state = { min, max, opsPer, n, idx: 0, score: 0, allowed };
  fg2_next();
}

function fg2_reset() {
  fg2_state = null;
  document.getElementById('fg2_area').textContent = 'Reset. Configure and press Start.';
}

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeExpr(min, max, ops, allowedOps) {
  const nums = [];
  for (let i = 0; i < ops + 1; i++) nums.push(randInt(min, max));

  let expr = '' + nums[0];

  for (let i = 0; i < ops; i++) {
    let op = randChoice(allowedOps);
    let val = nums[i + 1];

    // 🚫 Prevent division/modulo by zero
    if ((op === '/' || op === '%') && val === 0) {
      val = 1;
    }

    expr += ` ${op} ${val}`;
  }

  return expr;
}

function evalExpr(s) {
  if (!/^[0-9+\-*/%^().\s]+$/.test(s)) throw new Error('Invalid tokens');
  const safe = s.replace(/\^/g, '**');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${safe});`)();
}

function fg2_next() {
  if (!fg2_state) return;

  if (fg2_state.idx >= fg2_state.n) {
    document.getElementById('fg2_area').textContent =
      `Finished! Score: ${fg2_state.score}/${fg2_state.n}`;
    return;
  }

  const expr = makeExpr(fg2_state.min, fg2_state.max, fg2_state.opsPer, fg2_state.allowed);
  let correct;
  try {
    correct = evalExpr(expr);
  } catch (e) {
    return fg2_next();
  }

  // ✅ Round correct answer to nearest 100th
  correct = Math.round(correct * 100) / 100;

  fg2_state.current = { expr, correct };

  const area = document.getElementById('fg2_area');
  area.innerHTML = `
    Q${fg2_state.idx + 1}/${fg2_state.n}: Solve → ${expr}
    <br><br>
    <input id="fg2_answer" type="number" step="0.01" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.03);background:#071219;color:#e6eef6;font-family:var(--mono)"/>
    <button class="btn" onclick="fg2_submit()">Submit</button>
  `;

  const ansInput = document.getElementById('fg2_answer');
  if (ansInput) ansInput.focus();
}

function fg2_submit() {
  const ansInput = document.getElementById('fg2_answer');
  const ans = ansInput ? Number(ansInput.value) : NaN;

  const correct = Math.round(fg2_state.current.correct * 100) / 100;
  const ok = Math.abs(ans - correct) < 1e-9;

  if (ok) fg2_state.score++;
  fg2_state.idx++;

  document.getElementById('fg2_area').textContent =
    (ok ? 'Correct! ' : 'Incorrect. ') + `Answer: ${fmt(correct)}`;

  setTimeout(fg2_next, 700);
}

// ---------- Dropdown Toggle ----------
document.addEventListener('DOMContentLoaded', () => {
  const opsToggle = document.getElementById('opsToggle');
  const opsContent = document.getElementById('opsContent');

  if (opsToggle && opsContent) {
    opsToggle.addEventListener('click', () => {
      const expanded = opsToggle.getAttribute('aria-expanded') === 'true';
      opsToggle.setAttribute('aria-expanded', !expanded);
      opsContent.setAttribute('aria-hidden', expanded);
      opsContent.classList.toggle('show');
    });
  }
});



// ---------- NUMBER GUESSING ----------
let ng_secret = null, ng_tries = 0;
function ng_start() {
  ng_secret = randInt(1, 100); ng_tries = 0; document.getElementById('ng_out').textContent = 'I picked a number 1–100. Start guessing!';
}
function ng_try() {
  const g = toNum(document.getElementById('ng_guess').value);
  if (g === null) return;
  ng_tries++;
  if (g === ng_secret) { document.getElementById('ng_out').textContent = `🎉 You got it in ${ng_tries} tries!`; ng_secret = null; }
  else if (g < ng_secret) document.getElementById('ng_out').textContent = 'Too low.';
  else document.getElementById('ng_out').textContent = 'Too high.';
}

// -------------- Snake Game -------------
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const snakeScore = document.getElementById("snakeScore");

const leftBtn = document.getElementById("leftSnake");
const upBtn = document.getElementById("upSnake");
const rightBtn = document.getElementById("rightSnake");
const downBtn = document.getElementById("downSnake");
const startBtn = document.getElementById("startSnakeBtn");
const pauseBtn = document.getElementById("pauseSnakeBtn"); 
const size = Math.floor(window.innerHeight * 0.65); 
  canvas.width = size;
  canvas.height = size;
let box = Math.floor(size / 25);

let snake, direction, food, score, foodsEaten;
let specialFood = null;
let specialFoodTimer = null;
let paused = false;
function startSnakeGame() {
  if (!snake || snake.length === 0) {
    snake = [{ x: 3 * box, y: 3 * box }];
    direction = "RIGHT";
    food = randomFood();
    score = 0;
    foodsEaten = 0;
    specialFood = null;
  }

  clearInterval(window.snakeGameLoop);
  window.snakeGameLoop = setInterval(drawSnakeGame, 100);

  if (specialFood) {
    clearTimeout(specialFoodTimer);
    specialFoodTimer = setTimeout(() => { specialFood = null; }, 5000);
  }

  paused = false;
  pauseBtn.textContent = "Pause";
  canvas.focus();
}
function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}
leftBtn.addEventListener("click", () => { if (direction !== "RIGHT") direction = "LEFT"; });
upBtn.addEventListener("click", () => { if (direction !== "DOWN") direction = "UP"; });
rightBtn.addEventListener("click", () => { if (direction !== "LEFT") direction = "RIGHT"; });
downBtn.addEventListener("click", () => { if (direction !== "UP") direction = "DOWN"; });
document.addEventListener("keydown", (event) => {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
});
pauseBtn.textContent = "Pause";
pauseBtn.addEventListener("click", () => {
  if (!paused) {
    clearInterval(window.snakeGameLoop);
    clearTimeout(specialFoodTimer);
    paused = true;
    pauseBtn.textContent = "Resume";
  } else {
    window.snakeGameLoop = setInterval(drawSnakeGame, 100);
    if (specialFood) {
      specialFoodTimer = setTimeout(() => { specialFood = null; }, 5000);
    }
    paused = false;
    pauseBtn.textContent = "Pause";
    canvas.focus();
  }
});
function drawSnakeGame() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);
  if (specialFood) {
    ctx.fillStyle = "#ff0";
    ctx.fillRect(specialFood.x, specialFood.y, box * 2, box * 2);
  }
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#0f0" : "#4f8";
    ctx.fillRect(segment.x, segment.y, box, box);
  });
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;
  if (snakeX === food.x && snakeY === food.y) {
    score += 5;
    foodsEaten++;
    food = randomFood();
    if (foodsEaten % 10 === 0) spawnSpecialFood();
  } else {
    snake.pop();
  }
  if (specialFood && hitSpecialFood(snakeX, snakeY)) {
    score += 25;
    specialFood = null;
    clearTimeout(specialFoodTimer);
  }
  const newHead = { x: snakeX, y: snakeY };
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(window.snakeGameLoop);
    clearTimeout(specialFoodTimer);
    alert("Game Over! Your score: " + score);
    snake = [];
    return;
  }
  snake.unshift(newHead);
  snakeScore.textContent = "Score: " + score;
}
function spawnSpecialFood() {
  specialFood = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 18 + 1) * box
  };
  clearTimeout(specialFoodTimer);
  specialFoodTimer = setTimeout(() => { specialFood = null; }, 5000);
}
function hitSpecialFood(snakeX, snakeY) {
  if (!specialFood) return false;
  return (
    snakeX < specialFood.x + box * 2 &&
    snakeX + box > specialFood.x &&
    snakeY < specialFood.y + box * 2 &&
    snakeY + box > specialFood.y
  );
}
function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}
startBtn.addEventListener("click", startSnakeGame);
