document.body.style.overflow = 'hidden';
// ---------- Utilities ----------
const isNum = v => v !== null && v !== '' && !Number.isNaN(Number(v));
const toNum = v => isNum(v) ? Number(v) : null;
const fmt = n => (n === null || n === undefined || !Number.isFinite(n)) ? '—' : (Math.abs(n) < 1e-8 ? n.toExponential(4) : Number(n.toPrecision(12)).toString());

// ---------- Navigation ----------
const topLinks = document.querySelectorAll(".top-link");
function switchTopPanel(e) {
  const targetPanelId = e.target.getAttribute("data-target");
  const allPanels = document.querySelectorAll(".panel");
  allPanels.forEach(panel => {
    panel.classList.remove("visible-panel");
    panel.classList.add("hidden");
  });
  const activePanel = document.getElementById(targetPanelId);
  if (activePanel) {
    activePanel.classList.remove("hidden");
    activePanel.classList.add("visible-panel");
  }
}
topLinks.forEach(link => link.addEventListener("click", switchTopPanel));
document.getElementById("panel-home").classList.add("visible-panel");


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

// -------- GENERAL CALCULATOR --------
function genCalcCompute() {

}
function genCalcClear() {
  document.getElementById("genCalcVal").value = '';
  document.getElementById("genCalcOut").textContent = '';
}


// ---------- TRIG EVALUATOR ----------
function parseRadianInput(raw) {
  let str = raw.replace(/π/g, 'Math.PI');

  try {
    return eval(str);
  } catch (e) {
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
      if (angle === 0 || angle === 2 * pi || angle === -2 * pi) rad = '0';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '1/2';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '√2/2';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '√3/2';
      else if (angle === pi / 2 || angle === -3 * pi / 2) rad = '1';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '√3/2';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '√2/2';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '1/2';
      else if (angle === pi || angle === -pi) rad = '0';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '-1/2';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '-√2/2';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '-√3/2';
      else if (angle === 3 * pi / 2 || angle === -pi / 2) rad = '-1';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '-√3/2';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '-√2/2';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '-1/2';
    }

    // cos
    else if (op === 'cos') {
      if (angle === 0 || angle === 2 * pi || angle === -2 * pi) rad = '1';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '√3/2';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '√2/2';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '1/2';
      else if (angle === pi / 2 || angle === -3 * pi / 2) rad = '0';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '-1/2';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '-√2/2';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '-√3/2';
      else if (angle === pi || angle === -pi) rad = '-1';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '-√3/2';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '-√2/2';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '-1/2';
      else if (angle === 3 * pi / 2 || angle === -pi / 2) rad = '0';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '1/2';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '√2/2';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '√3/2';
    }

    // tan
    else if (op === 'tan') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2 * pi || angle === -2 * pi) rad = '0';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '1/√3';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '1';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '√3';
      else if (angle === pi / 2 || angle === -3 * pi / 2 || angle === 3 * pi / 2 || angle === -pi / 2) rad = 'undefined';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '-√3';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '-1';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '-1/√3';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '1/√3';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '1';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '√3';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '-√3';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '-1';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '-1/√3';
    }

    // csc
    else if (op === 'csc') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2 * pi || angle === -2 * pi) rad = 'undefined';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '2';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '√2';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '2√3/3';
      else if (angle === pi / 2 || angle === -3 * pi / 2) rad = '1';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '2√3/3';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '√2';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '2';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '-2';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '-√2';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '-2√3/3';
      else if (angle === 3 * pi / 2 || angle === -pi / 2) rad = '-1';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '-2√3/3';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '-√2';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '-2';
    }

    // sec
    else if (op === 'sec') {
      if (angle === pi / 2 || angle === -3 * pi / 2 || angle === 3 * pi / 2 || angle === -pi / 2) rad = 'undefined';
      else if (angle === 0 || angle === 2 * pi || angle === -2 * pi) rad = '1';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '2√3/3';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '√2';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '2';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '-2';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '-√2';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '-2√3/3';
      else if (angle === pi || angle === -pi) rad = '-1';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '-2√3/3';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '-√2';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '-2';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '2';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '√2';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '2√3/3';
    }

    // cot
    else if (op === 'cot') {
      if (angle === 0 || angle === pi || angle === -pi || angle === 2 * pi || angle === -2 * pi) rad = 'undefined';
      else if (angle === pi / 6 || angle === -11 * pi / 6) rad = '√3/1';
      else if (angle === pi / 4 || angle === -7 * pi / 4) rad = '1';
      else if (angle === pi / 3 || angle === -5 * pi / 3) rad = '3√3/3';
      else if (angle === pi / 2 || angle === -3 * pi / 2 || angle === 3 * pi / 2 || angle === -pi / 2) rad = '0';
      else if (angle === 2 * pi / 3 || angle === -4 * pi / 3) rad = '-3√3/3';
      else if (angle === 3 * pi / 4 || angle === -5 * pi / 4) rad = '-1';
      else if (angle === 5 * pi / 6 || angle === -7 * pi / 6) rad = '-√3';
      else if (angle === 7 * pi / 6 || angle === -5 * pi / 6) rad = '√3';
      else if (angle === 5 * pi / 4 || angle === -3 * pi / 4) rad = '1';
      else if (angle === 4 * pi / 3 || angle === -2 * pi / 3) rad = '3√3/1';
      else if (angle === 5 * pi / 3 || angle === -pi / 3) rad = '-3√3/3';
      else if (angle === 7 * pi / 4 || angle === -pi / 4) rad = '-1';
      else if (angle === 11 * pi / 6 || angle === -pi / 6) rad = '-√3';
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

// -------- QUADRATIC EQUATION ---------

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
      let discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) { x1 = (-b + Math.sqrt(discriminant)) / (2 * a); x2 = (-b - Math.sqrt(discriminant)) / (2 * a); changed = true; }
    }
    if (known(a) && known(x1) && known(x2)) {
      if (!known(b)) { b = -a * (x1 + x2); changed = true; }
      if (!known(c)) { c = a * (x1 * x2); changed = true; }
    }
    if (known(a) && known(x1)) {
      if (!known(b) && known(c)) { b = -(a * x1 * x1 + c) / x1; changed = true; }
      if (!known(c) && known(b)) { c = -(a * x1 * x1 + b * x1); changed = true; }
    }
    if (!known(a) && known(b) && known(c) && known(x1)) { a = -(b * x1 + c) / (x1 * x1); changed = true; }
    if (known(a) && known(b) && !known(h)) { h = -b / (2 * a); changed = true; }
    if (known(a) && known(h) && !known(k) && known(c)) { k = a * h * h + b * h + c; changed = true; }
    if (known(a) && known(h) && !known(b)) { b = -2 * a * h; changed = true; }
    if (known(a) && known(b) && known(h) && known(k) && !known(c)) { c = k - (a * h * h + b * h); changed = true; }
    if (known(a) && known(b) && known(px) && known(py) && !known(c)) { c = py - (a * px * px + b * px); changed = true; }
    if (known(a) && known(c) && known(px) && known(py) && !known(b)) { b = (py - c - a * px * px) / px; changed = true; }
    if (known(b) && known(c) && known(px) && known(py) && !known(a)) { a = (py - b * px - c) / (px * px); changed = true; }
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

// ---------- GAMES ----------

// --------- Pi Game ---------
const pi = '141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141';
let piIndex = 0;
let mistakesAllowed = 3;
function changePiMode() {
  const piStart = document.getElementById("piStart");
  const piReset = document.getElementById("piReset");
  const piComment = document.getElementById("piComment");
  const mode = document.getElementById("piMode").value;
  const piTestHolder = document.getElementById("piTesterHolder");
  const piPracticeHolder = document.getElementById("piPracticeHolder");
  const piRevealHolder = document.getElementById("piRevealHolder");
  [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  if (mode === 'selectPi') {
    [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
      el.classList.add('piHidden');
      el.classList.remove('piVisible');
    });
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
  else if (mode === 'testPi') {
    piTestHolder.classList.remove('piHidden');
    piTestHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else if (mode === 'pracPi') {
    piPracticeHolder.classList.remove('piHidden');
    piPracticeHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else {
    piRevealHolder.classList.remove('piHidden');
    piRevealHolder.classList.add('piVisible');
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
}
function piReset() {
  [document.getElementById("piTesterHolder"), document.getElementById("piPracticeHolder"), document.getElementById("piRevealHolder")].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  document.getElementById("piMode").value = 'selectPi';
  document.getElementById("piReset").classList.add('pi-reset-hidden');
  document.getElementById("piStart").classList.add('pi-start-hidden');
  document.getElementById("piStart").textContent = 'Start';
  document.getElementById("piComment").classList.add('pi-comment-hidden');
  document.getElementById("piComment").classList.remove('pi-comment-visible');
  document.getElementById("piComment").textContent = "";
  document.getElementById("piTestInput").value = "";
  document.getElementById("piInputs").innerHTML = "";
  piIndex = 0;
  mistakesAllowed = 3;
}
function piStart() {
  const piStart = document.getElementById("piStart");
  const mode = document.getElementById("piMode").value;
  if (piStart.textContent === 'Start') {
    document.getElementById("piTestInput").disabled = false;
    if (mode === 'testPi') {
      startPiTest();
    }
    else {
      startPiPractice()
    }
    piStart.textContent = 'Restart';
  }
  else {
    piStart.textContent = 'Start';
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
    document.getElementById("piInputs").innerHTML = "";
    document.getElementById("piTestInput").disabled = false;
  }
}
function startPiTest() {
  const piTestInput = document.getElementById("piTestInput");
  const piComment = document.getElementById("piComment");
  let startTime = 0;
  piIndex = 0;
  startTime = Date.now();
  piComment.textContent = 'Start typing...';
  piTestInput.value = '';
  piTestInput.focus();
  piTestInput.oninput = () => {
    const val = piTestInput.value;
    if (val[val.length - 1] === pi[piIndex]) {
      piIndex++;
    } else {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Wrong digit at position ${piIndex + 1}. Time: ${timeTaken}s`;
      piTestInput.disabled = true;
      return;
    }
    if (piIndex >= pi.length) {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Perfect! You typed all ${pi.length} digits correctly in ${totalTime}s!`;
      piTestInput.disabled = true;
    }
  };
}
function startPiPractice() {
  mistakesAllowed = parseInt(document.getElementById("mistakeLimit").value || '3');
  piIndex = 0;
  document.getElementById("piInputs").innerHTML = "";
  createNextPracticeInput();
}
function createNextPracticeInput() {
  const inputContainer = document.getElementById("piInputs");
  const input = document.createElement("input");
  const piComment = document.getElementById("piComment");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "pi-digit-input";
  input.placeholder = `#${piIndex + 1}`;
  piComment.textContent = 'Start typing...';
  input.addEventListener("input", () => {
    const entered = input.value.trim();
    if (entered === "") {
      input.style.borderColor = "";
      return;
    }
    if (!/^\d$/.test(entered)) {
      piComment.textContent = "Please enter a number.";
      input.value = "";
      input.style.borderColor = "orange";
      return;
    }
    if (entered === pi[piIndex]) {
      input.style.borderColor = "green";
      input.style.transition = "border-color 0.3s";
      piIndex++;
      setTimeout(() => {
        input.style.borderColor = "";
        input.disabled = true;
        if (piIndex < pi.length) createNextPracticeInput();
        else piComment.textContent = `You completed all ${pi.length} digits!`;
      }, 300);
    }
    else {
      input.style.borderColor = "red";
      input.style.transition = "border-color 0.3s";
      mistakesAllowed--;
      if (mistakesAllowed <= 0) {
        piComment.textContent = `You’ve reached the mistake limit. Final digit count: ${piIndex}`;
        disableAllInputs();
      } else {
        piComment.textContent = `Oops, you got that one wrong. Mistakes left: ${mistakesAllowed}. Try again!`;
      }
    }
  });
  inputContainer.appendChild(input);
  input.focus();
}
function disableAllInputs() {
  document.querySelectorAll(".pi-digit-input").forEach(inp => inp.disabled = true);
}


// -------- Math Quiz ---------
let fg2_state = null;
function getSelectedOperations() {
  const ops = [];
  document.querySelectorAll('.operation:checked').forEach(cb => {
    ops.push(cb.value);
  });
  return ops.length > 0 ? ops : ['+'];
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
document.addEventListener(
  "keydown",
  (event) => {
    const key = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
      event.preventDefault();
    }
    if ((key === "a" || key === "arrowleft") && direction !== "RIGHT") direction = "LEFT";
    else if ((key === "w" || key === "arrowup") && direction !== "DOWN") direction = "UP";
    else if ((key === "d" || key === "arrowright") && direction !== "LEFT") direction = "RIGHT";
    else if ((key === "s" || key === "arrowdown") && direction !== "UP") direction = "DOWN";
  },
  { passive: false }
);
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

// ---------- UTILITIES -------------

// -------- UNIT CONVERTER ----------
const unitGroups = {
  length: `
    <option value="mmUnit">Millimeter (mm)</option>
    <option value="cmUnit">Centimeter (cm)</option>
    <option value="mUnit">Meter (m)</option>
    <option value="kmUnit">Kilometer (km)</option>
    <option value="inUnit">Inch (in)</option>
    <option value="ftUnit">Foot (ft)</option>
    <option value="ydUnit">Yard (yd)</option>
    <option value="miUnit">Mile (mi)</option>
    <option value="nmiUnit">Nautical mile (nmi)</option>
    <option value="µmUnit">Micrometer (µm)</option>
    <option value="nmUnit">Nanometer (nm)</option>
    <option value="ÅUnit">Angstrom (Å)</option>
    <option value="lyUnit">Light-year (ly)</option>
    <option value="auUnit">Astronomical unit (au)</option>
    <option value="pcUnit">Parsec (pc)</option>
  `,
  mass: `
    <option value="mgUnit">Milligram (mg)</option>
    <option value="gUnit">Gram (g)</option>
    <option value="kgUnit">Kilogram (kg)</option>
    <option value="tUnit">Tonne (t)</option>
    <option value="ozUnit">Ounce (oz)</option>
    <option value="lbUnit">Pound (lb)</option>
    <option value="stUnit">Stone (st)</option>
    <option value="slugUnit">Slug (slug)</option>
  `,
  area: `
    <option value="mm2Unit">Square millimeter (mm²)</option>
    <option value="cm2Unit">Square centimeter (cm²)</option>
    <option value="m2Unit">Square meter (m²)</option>
    <option value="km2Unit">Square kilometer (km²)</option>
    <option value="in2Unit">Square inch (in²)</option>
    <option value="ft2Unit">Square foot (ft²)</option>
    <option value="yd2Unit">Square yard (yd²)</option>
    <option value="acreUnit">Acre</option>
    <option value="haUnit">Hectare (ha)</option>
  `,
  volume: `
    <option value="mlUnit">Milliliter (mL)</option>
    <option value="lUnit">Liter (L)</option>
    <option value="m3Unit">Cubic meter (m³)</option>
    <option value="cm3Unit">Cubic centimeter (cm³)</option>
    <option value="in3Unit">Cubic inch (in³)</option>
    <option value="ft3Unit">Cubic foot (ft³)</option>
    <option value="yd3Unit">Cubic yard (yd³)</option>
    <option value="galUnit">Gallon (gal)</option>
    <option value="qtUnit">Quart (qt)</option>
    <option value="ptUnit">Pint (pt)</option>
    <option value="cupUnit">Cup (cup)</option>
    <option value="tbspUnit">Tablespoon (tbsp)</option>
    <option value="tspUnit">Teaspoon (tsp)</option>
  `,
  temperature: `
    <option value="cUnit">Celsius (°C)</option>
    <option value="fUnit">Fahrenheit (°F)</option>
    <option value="kUnit">Kelvin (K)</option>
    <option value="rUnit">Rankine (°R)</option>
  `,
  energy: `
    <option value="jUnit">Joule (J)</option>
    <option value="kjUnit">Kilojoule (kJ)</option>
    <option value="calUnit">Calorie (cal)</option>
    <option value="kcalUnit">Kilocalorie (kcal)</option>
    <option value="whUnit">Watt-hour (Wh)</option>
    <option value="kwhUnit">Kilowatt-hour (kWh)</option>
    <option value="evUnit">Electronvolt (eV)</option>
    <option value="btuUnit">British thermal unit (BTU)</option>
  `,
  speed: `
    <option value="mpsUnit">Meter/second (m/s)</option>
    <option value="kmphUnit">Kilometer/hour (km/h)</option>
    <option value="mphUnit">Mile/hour (mph)</option>
    <option value="fpsUnit">Foot/second (ft/s)</option>
    <option value="knotUnit">Knot (kn)</option>
  `,
  time: `
    <option value="nsUnit">Nanosecond (ns)</option>
    <option value="µsUnit">Microsecond (µs)</option>
    <option value="msUnit">Millisecond (ms)</option>
    <option value="sUnit">Second (s)</option>
    <option value="minUnit">Minute (min)</option>
    <option value="hrUnit">Hour (hr)</option>
    <option value="dayUnit">Day</option>
    <option value="wkUnit">Week</option>
    <option value="moUnit">Month</option>
    <option value="yrUnit">Year</option>
  `,
  power: `
    <option value="wUnit">Watt (W)</option>
    <option value="kwUnit">Kilowatt (kW)</option>
    <option value="mwUnit">Megawatt (MW)</option>
    <option value="hpUnit">Horsepower (hp)</option>
    <option value="calpsUnit">Calorie/second (cal/s)</option>
    <option value="btuhrUnit">BTU/hour</option>
  `
};
const categorySelect = document.getElementById("unitCategory");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
function updateUnits() {
  const selectedCategory = categorySelect.value;
  const options = unitGroups[selectedCategory] || "";
  fromUnit.innerHTML = options;
  toUnit.innerHTML = options;
}
updateUnits();
categorySelect.addEventListener("change", updateUnits);
const conversionRates = {
  length: {
    mmUnit: 0.001,
    cmUnit: 0.01,
    mUnit: 1,
    kmUnit: 1000,
    inUnit: 0.0254,
    ftUnit: 0.3048,
    ydUnit: 0.9144,
    miUnit: 1609.34
  },
  mass: {
    mgUnit: 0.000001,
    gUnit: 0.001,
    kgUnit: 1,
    tUnit: 1000,
    lbUnit: 0.453592,
    ozUnit: 0.0283495
  },
  area: {
    mm2Unit: 0.001,
    cm2Unit: 0.01,
    m2Unit: 1,
    km2Unit: 1000,
    in2Unit: 1550,
    ft2Unit: 10.7639,
    yd2Unit: 1.19599,
    acreUnit: 0.000247105,
    haUnit: 0.0001
  },
  volume: {
    mlUnit: 0.001,
    lUnit: 1,
    m3Unit: 1000,
    cm3Unit: 0.001,
    in3Unit: 0.0163871,
    ft3Unit: 28.3168,
    yd3Unit: 764.555,
    galUnit: 3.78541,
    qtUnit: 0.946353,
    ptUnit: 0.473176,
    cupUnit: 0.24,
    tbspUnit: 0.015,
    tspUnit: 0.005
  },
  angle: {
    asUnit: 4.848e-6,
    degUnit: 0.0174533,
    radUnit: 1,
    gradUnit: 0.015708,
    mradUnit: 0.001,
    maUnit: 0.000290888
  },
  temperature: {
    cUnit: "c",
    fUnit: "f",
    kUnit: "k",
    rUnit: "r"
  },
  energy: {
    jUnit: 1,
    kjUnit: 1000,
    calUnit: 4.184,
    kcalUnit: 4184,
    whUnit: 3600,
    kwhUnit: 3.6e6,
    evUnit: 1.602e-19,
    btuUnit: 1055.06
  },
  speed: {
    mpsUnit: 1,
    kmphUnit: 0.277778,
    mphUnit: 0.44704,
    fpsUnit: 0.3048,
    knotUnit: 0.514444
  },
  time: {
    nsUnit: 1e-9,
    µsUnit: 1e-6,
    msUnit: 0.001,
    sUnit: 1,
    minUnit: 60,
    hrUnit: 3600,
    dayUnit: 86400,
    wkUnit: 604800,
    moUnit: 2.628e6,
    yrUnit: 3.154e7
  },
  power: {
    wUnit: 1,
    kwUnit: 1000,
    mwUnit: 1e6,
    hpUnit: 745.7,
    calpsUnit: 4.184,
    btuhrUnit: 0.293071
  }
};
function unitCompute() {
  const category = categorySelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(document.getElementById("unitVal").value);
  const outputEl = document.getElementById("unitOut");

  if (isNaN(value)) {
    outputEl.textContent = "Please enter a valid number.";
    return;
  }

  let result;

  if (category === "temperature") {
    result = convertTemperature(value, from, to);
  }
  else {
    const rates = conversionRates[category];
    if (!rates[from] || !rates[to]) {
      outputEl.textContent = "Conversion not defined.";
      return;
    }
    const valueInBase = value * rates[from];
    result = valueInBase / rates[to];
  }

  const fromText = fromUnit.options[fromUnit.selectedIndex].text.match(/\(([^)]+)\)/);
  const toText = toUnit.options[toUnit.selectedIndex].text.match(/\(([^)]+)\)/);

  const fromAbbr = fromText ? fromText[1] : fromUnit.value;
  const toAbbr = toText ? toText[1] : toUnit.value;

  const formatted =
    Math.abs(result) >= 0.0001 && Math.abs(result) < 10000
      ? result.toFixed(4)
      : result.toExponential(4);

  outputEl.textContent = `${value} ${fromAbbr} = ${formatted} ${toAbbr}`;
}
function convertTemperature(val, from, to) {
  let celsius;
  switch (from) {
    case "cUnit": celsius = val; break;
    case "fUnit": celsius = (val - 32) * 5 / 9; break;
    case "kUnit": celsius = val - 273.15; break;
    case "rUnit": celsius = (val - 491.67) * 5 / 9; break;
  }
  switch (to) {
    case "cUnit": return celsius;
    case "fUnit": return celsius * 9 / 5 + 32;
    case "kUnit": return celsius + 273.15;
    case "rUnit": return (celsius + 273.15) * 9 / 5;
  }
}
function unitClear() {
  document.getElementById("unitCategory").value = "length";
  document.getElementById("unitVal").value = "";
  document.getElementById("fromUnit").innerHTML = unitGroups.length;
  document.getElementById("toUnit").innerHTML = unitGroups.length;
  document.getElementById("unitOut").textContent = "";
}


// -------- PASSWORD GENERATOR --------
const pwdToggle = document.getElementById('pwdCharacterTypesToggle');
const pwdContent = document.getElementById('pwdCharacterTypesContent');
pwdToggle.addEventListener('click', () => {
  const expanded = pwdToggle.getAttribute('aria-expanded') === 'true';
  pwdToggle.setAttribute('aria-expanded', !expanded);
  pwdContent.style.display = expanded ? 'none' : 'block';
  pwdContent.setAttribute('aria-hidden', expanded);
});
function passwordGenerate() {
  const length = parseInt(document.getElementById('pwdLength').value);
  if (isNaN(length) || length <= 0) {
    ('Please enter a valid password length.');
    return;
  }

  const types = document.querySelectorAll('.characters:checked');
  if (types.length === 0) {
    document.getElementById('pwdOut').textContent = 'Please select at least one character type.';
    return;
  }

  const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-----=[]{}|;:,.<>?/~`'
  };

  let allChars = '';
  types.forEach(t => allChars += charSets[t.value]);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  document.getElementById('pwdOut').textContent = password;
}
function passwordClear() {
  document.getElementById('pwdOut').textContent = '';
  document.getElementById('pwdLength').value = '';
  document.querySelectorAll('.characters').forEach(c => c.checked = true);
}
function copyPassword() {
  const password = document.getElementById('pwdOut').textContent;
  if (!password) return;
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy password.');
  });
}

// -------- INFO ----------

// ------ Customize -------
const accent1Picker = document.getElementById('accent1Picker');
const accent2Picker = document.getElementById('accent2Picker');
const background1Picker = document.getElementById('background1Picker');
const background2Picker = document.getElementById('background2Picker');
const root = document.documentElement;
const resetBtn = document.getElementById('resetColors');
function updateColor(varName, color) {
  root.style.setProperty(varName, color);
}
window.addEventListener('load', () => {
  const savedAccent1 = localStorage.getItem('accent1');
  const savedAccent2 = localStorage.getItem('accent2');

  if (savedAccent1) {
    accent1Picker.value = savedAccent1;
    updateColor('--accent1', savedAccent1);
  }
  if (savedAccent2) {
    accent2Picker.value = savedAccent2;
    updateColor('--accent2', savedAccent2);
  }

  const savedBg1 = localStorage.getItem('background1');
  const savedBg2 = localStorage.getItem('background2');

  if (savedBg1) {
    background1Picker.value = savedBg1;
    updateColor('--background1', savedBg1);
  }
  if (savedBg2) {
    background2Picker.value = savedBg2;
    updateColor('--background2', savedBg2);
  }
});
accent1Picker.addEventListener('input', (e) => {
  updateColor('--accent1', e.target.value);
  localStorage.setItem('accent1', e.target.value);
});
accent2Picker.addEventListener('input', (e) => {
  updateColor('--accent2', e.target.value);
  localStorage.setItem('accent2', e.target.value);
});
background1Picker.addEventListener('input', (e) => {
  updateColor('--background1', e.target.value);
  localStorage.setItem('background1', e.target.value);
});
background2Picker.addEventListener('input', (e) => {
  updateColor('--background2', e.target.value);
  localStorage.setItem('background2', e.target.value);
});
resetBtn.addEventListener('click', () => {
  const defaultAccent1 = '#3c78d8';
  const defaultAccent2 = '#9900ff';
  accent1Picker.value = defaultAccent1;
  accent2Picker.value = defaultAccent2;
  updateColor('--accent1', defaultAccent1);
  updateColor('--accent2', defaultAccent2);
  localStorage.removeItem('accent1');
  localStorage.removeItem('accent2');
  const defaultBackGround1 = '#172D50';
  const defaultBackGround2 = '#480A71';
  background1Picker.value = defaultBackGround1;
  background2Picker.value = defaultBackGround2;
  updateColor('--background1', defaultBackGround1);
  updateColor('--background2', defaultBackGround2);
  localStorage.removeItem('background1');
  localStorage.removeItem('background2');
});
