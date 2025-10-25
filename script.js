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

// =========== MATHEMATICS ============

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

// --------- 2D Shapes -----------
function showShape2DInputs() {
  const shape = document.getElementById('shape2D').value;
  document.querySelectorAll('.shapes-2d').forEach(el => {
    el.classList.add('shapes-2d-hidden');
    el.classList.remove('shapes-2d-visible');
  });

  switch (shape) {
    case 'circle':
    case 'semicircle':
      document.getElementById('shapes2DCircleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DCircleGrid').classList.add('shapes-2d-visible');
      break;
    case 'triangle':
      document.getElementById('shapes2DTriangleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DTriangleGrid').classList.add('shapes-2d-visible');
      break;
    case 'square':
      document.getElementById('shapes2DSquareGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DSquareGrid').classList.add('shapes-2d-visible');
      break;
    case 'rectangle':
      document.getElementById('shapes2DRectangleGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DRectangleGrid').classList.add('shapes-2d-visible');
      break;
    case 'parallelogram':
      document.getElementById('shapes2DParallelogramGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DParallelogramGrid').classList.add('shapes-2d-visible');
      break;
    case 'trapezoid':
      document.getElementById('shapes2DTrapezoidGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DTrapezoidGrid').classList.add('shapes-2d-visible');
      break;
    case 'kite':
      document.getElementById('shapes2DInputsKites').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DInputsKites').classList.add('shapes-2d-visible');
      break;
    case 'ellipse':
      document.getElementById('shapes2DEllipseGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DEllipseGrid').classList.add('shapes-2d-visible');
      break;
    case 'regularPolygon':
      document.getElementById('shapes2DRegularPolygonGrid').classList.remove('shapes-2d-hidden');
      document.getElementById('shapes2DRegularPolygonGrid').classList.add('shapes-2d-visible');
      break;
  }
}
function solveShape2D(shape, inputs) {
  let changed = true, iter = 0;
  const known = (x) => x !== null && x !== undefined && !isNaN(x);

  while (changed && iter < 60) {
    changed = false; iter++;

    switch (shape) {
      // ==================== CIRCLE ====================
      case "circle":
        if (!known(inputs.d) && known(inputs.r)) { inputs.d = 2 * inputs.r; changed = true; }
        if (!known(inputs.r) && known(inputs.d)) { inputs.r = inputs.d / 2; changed = true; }
        if (!known(inputs.c) && known(inputs.r)) { inputs.c = 2 * Math.PI * inputs.r; changed = true; }
        if (!known(inputs.r) && known(inputs.c)) { inputs.r = inputs.c / (2 * Math.PI); changed = true; }
        if (!known(inputs.a) && known(inputs.r)) { inputs.a = Math.PI * inputs.r ** 2; changed = true; }
        if (!known(inputs.r) && known(inputs.a)) { inputs.r = Math.sqrt(inputs.a / Math.PI); changed = true; }
        if (!known(inputs.arcLength) && known(inputs.centralAngle) && known(inputs.r)) { inputs.arcLength = (inputs.centralAngle / 360) * 2 * Math.PI * inputs.r; changed = true; }
        if (!known(inputs.centralAngle) && known(inputs.arcLength) && known(inputs.r) && inputs.r !== 0) { inputs.centralAngle = (inputs.arcLength / (2 * Math.PI * inputs.r)) * 360; changed = true; }
        if (!known(inputs.sectorArea) && known(inputs.centralAngle) && known(inputs.r)) { inputs.sectorArea = (inputs.centralAngle / 360) * Math.PI * inputs.r ** 2; changed = true; }
        if (!known(inputs.centralAngle) && known(inputs.sectorArea) && known(inputs.r) && inputs.r !== 0) { inputs.centralAngle = (inputs.sectorArea / (Math.PI * inputs.r ** 2)) * 360; changed = true; }
        break;

      // ==================== TRIANGLE ====================
      case "triangle":
        if (!known(inputs.angleA) && known(inputs.s1) && known(inputs.s2) && known(inputs.angleB) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleA = Math.asin(inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180) / inputs.s2) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleA) && known(inputs.s1) && known(inputs.s3) && known(inputs.angleC) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleA = Math.asin(inputs.s1 * Math.sin(inputs.angleC * Math.PI / 180) / inputs.s3) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleB) && known(inputs.s2) && known(inputs.s1) && known(inputs.angleA) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleB = Math.asin(inputs.s2 * Math.sin(inputs.angleA * Math.PI / 180) / inputs.s1) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleB) && known(inputs.s2) && known(inputs.s3) && known(inputs.angleC) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleB = Math.asin(inputs.s2 * Math.sin(inputs.angleC * Math.PI / 180) / inputs.s3) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleC) && known(inputs.s3) && known(inputs.s1) && known(inputs.angleA) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleC = Math.asin(inputs.s3 * Math.sin(inputs.angleA * Math.PI / 180) / inputs.s1) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleC) && known(inputs.s3) && known(inputs.s2) && known(inputs.angleB) && (inputs.tp === 'acute' || inputs.tp === 'right')) { inputs.angleC = Math.asin(inputs.s3 * Math.sin(inputs.angleB * Math.PI / 180) / inputs.s2) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleA) && known(inputs.angleB) && known(inputs.angleC)) { inputs.angleA = 180 - (inputs.angleB + inputs.angleC); changed = true; }
        if (!known(inputs.angleB) && known(inputs.angleA) && known(inputs.angleC)) { inputs.angleB = 180 - (inputs.angleA + inputs.angleC); changed = true; }
        if (!known(inputs.angleC) && known(inputs.angleA) && known(inputs.angleB)) { inputs.angleC = 180 - (inputs.angleA + inputs.angleB); changed = true; }
        if (!known(inputs.sp) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { inputs.sp = (inputs.s1 + inputs.s2 + inputs.s3) / 2; changed = true; }
        if (!known(inputs.tp) && known(inputs.angleA) && known(inputs.angleB) && known(inputs.angleC) && (inputs.angleA < 90 && inputs.angleB < 90 && inputs.angleC < 90)) { inputs.tp = 'acute'; changed = true; }
        if (!known(inputs.tp) && ((known(inputs.angleA) && inputs.angleA === 90) || (known(inputs.angleB) && inputs.angleB === 90) || (known(inputs.angleC) && inputs.angleC === 90))) { inputs.tp = 'right'; changed = true; }
        if (!known(inputs.tp) && ((known(inputs.angleA) && inputs.angleA > 90) || (known(inputs.angleB) && inputs.angleB > 90) || (known(inputs.angleC) && inputs.angleC > 90))) { inputs.tp = 'obtuse'; changed = true; }
        if (!known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && (inputs.tp === 'right')) { inputs.s1 = Math.sqrt(inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!known(inputs.s2) && known(inputs.s1) && known(inputs.s3) && (inputs.tp === 'right')) { inputs.s2 = Math.sqrt(inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!known(inputs.s3) && known(inputs.s1) && known(inputs.s2) && (inputs.tp === 'right')) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2); changed = true; }
        if (!known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && (inputs.angleC === 90)) { inputs.s1 = Math.sqrt(inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!known(inputs.s2) && known(inputs.s1) && known(inputs.s3) && (inputs.angleC === 90)) { inputs.s2 = Math.sqrt(inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!known(inputs.s3) && known(inputs.s1) && known(inputs.s2) && (inputs.angleC === 90)) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2); changed = true; }
        if (!known(inputs.angleA) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && known(inputs.tp) && (inputs.s1 > inputs.s2) && (inputs.s1 > inputs.s3) && inputs.tp === 'right') { inputs.angleA = 90; changed = true; }
        if (!known(inputs.angleB) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && known(inputs.tp) && (inputs.s2 > inputs.s1) && (inputs.s1 > inputs.s3) && inputs.tp === 'right') { inputs.angleB = 90; changed = true; }
        if (!known(inputs.angleC) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && known(inputs.tp) && (inputs.s3 > inputs.s1) && (inputs.s3 > inputs.s2) && inputs.tp === 'right') { inputs.angleC = 90; changed = true; }
        if (!known(inputs.tT) && known(inputs.s1) && (inputs.s2) && (inputs.s3) && (inputs.s1 + inputs.s2 <= inputs.s3 || inputs.s1 + inputs.s3 <= inputs.s2 || inputs.s2 + inputs.s3 <= inputs.s1)) { inputs.tT = "Invalid"; }
        if (!known(inputs.tT) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && inputs.s1 === inputs.s2 && inputs.s2 === inputs.s3) { inputs.tT = 'equilateral'; changed = true; }
        if (!known(inputs.tT) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && ((inputs.s1 === inputs.s2 && inputs.s1 !== inputs.s3) || (inputs.s2 === inputs.s3 && inputs.s2 !== inputs.s1) || (inputs.s1 === inputs.s3 && inputs.s1 !== inputs.s2))) { inputs.tT = 'isosceles'; changed = true; }
        if (!known(inputs.tT) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && (inputs.s1 !== inputs.s2 && inputs.s2 !== inputs.s3 && inputs.s1 !== inputs.s3)) { inputs.tT = 'scalene'; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.s2)) { inputs.s2 = inputs.s1; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.s3)) { inputs.s3 = inputs.s1; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s2) && !known(inputs.s1)) { inputs.s1 = inputs.s2; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s2) && !known(inputs.s3)) { inputs.s3 = inputs.s2; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s3) && !known(inputs.s1)) { inputs.s1 = inputs.s3; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s3) && !known(inputs.s2)) { inputs.s2 = inputs.s3; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'isosceles' && known(inputs.s1) && known(inputs.s2) && inputs.s1 === inputs.s2 && !known(inputs.s3)) { }
        if (known(inputs.tT) && inputs.tT === 'isosceles' && known(inputs.s1) && known(inputs.s3) && inputs.s1 === inputs.s3 && !known(inputs.s2)) { }
        if (known(inputs.tT) && inputs.tT === 'isosceles' && known(inputs.s2) && known(inputs.s3) && inputs.s2 === inputs.s3 && !known(inputs.s1)) { }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && !known(inputs.angleA)) { inputs.angleA = 60; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && !known(inputs.angleB)) { inputs.angleB = 60; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && !known(inputs.angleC)) { inputs.angleC = 60; changed = true; }
        if (!known(inputs.p) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { inputs.p = inputs.s1 + inputs.s2 + inputs.s3; changed = true; }
        if (!known(inputs.a) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { let s = (inputs.s1 + inputs.s2 + inputs.s3) / 2; inputs.a = Math.sqrt(s * (s - inputs.s1) * (s - inputs.s2) * (s - inputs.s3)); changed = true; }
        if (!known(inputs.b) && known(inputs.s1)) { inputs.b = inputs.s1; changed = true; }
        if (!known(inputs.s1) && known(inputs.b)) { inputs.s1 = inputs.b; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.h1)) { inputs.h1 = (Math.sqrt(3) / 2) * inputs.s1; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.a)) { inputs.a = (Math.sqrt(3) / 4) * inputs.s1 ** 2; changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.inR)) { inputs.inR = inputs.s1 / (2 * Math.sqrt(3)); changed = true; }
        if (known(inputs.tT) && inputs.tT === 'equilateral' && known(inputs.s1) && !known(inputs.circumR)) { inputs.circumR = inputs.s1 / Math.sqrt(3); changed = true; }
        if (!known(inputs.h1) && known(inputs.a) && known(inputs.s1)) { inputs.h1 = 2 * inputs.a / inputs.s1; changed = true; }
        if (!known(inputs.h2) && known(inputs.a) && known(inputs.s2)) { inputs.h2 = 2 * inputs.a / inputs.s2; changed = true; }
        if (!known(inputs.h3) && known(inputs.a) && known(inputs.s3)) { inputs.h3 = 2 * inputs.a / inputs.s3; changed = true; }
        if (!known(inputs.a) && known(inputs.h1) && known(inputs.s1)) { inputs.a = 0.5 * inputs.h1 * inputs.s1; changed = true; }
        if (!known(inputs.a) && known(inputs.h2) && known(inputs.s2)) { inputs.a = 0.5 * inputs.h2 * inputs.s2; changed = true; }
        if (!known(inputs.a) && known(inputs.h3) && known(inputs.s3)) { inputs.a = 0.5 * inputs.h3 * inputs.s3; changed = true; }
        if (!known(inputs.s1) && known(inputs.a) && known(inputs.h1)) { inputs.s1 = 2 * inputs.a / inputs.h1; changed = true; }
        if (!known(inputs.s2) && known(inputs.a) && known(inputs.h2)) { inputs.s2 = 2 * inputs.a / inputs.h2; changed = true; }
        if (!known(inputs.s3) && known(inputs.a) && known(inputs.h3)) { inputs.s3 = 2 * inputs.a / inputs.h3; changed = true; }
        if (!known(inputs.a) && known(inputs.s1) && known(inputs.s2) && known(inputs.angleC)) { inputs.a = 0.5 * inputs.s1 * inputs.s2 * Math.sin(inputs.angleC * Math.PI / 180); changed = true; }
        if (!known(inputs.a) && known(inputs.s2) && known(inputs.s3) && known(inputs.angleA)) { inputs.a = 0.5 * inputs.s2 * inputs.s3 * Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!known(inputs.a) && known(inputs.s3) && known(inputs.s1) && known(inputs.angleB)) { inputs.a = 0.5 * inputs.s3 * inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180); changed = true; }
        if (!known(inputs.m1) && known(inputs.s2) && known(inputs.s3)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.s2 ** 2 + 2 * inputs.s3 ** 2 - inputs.s1 ** 2); changed = true; }
        if (!known(inputs.m2) && known(inputs.s1) && known(inputs.s3)) { inputs.m2 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s3 ** 2 - inputs.s2 ** 2); changed = true; }
        if (!known(inputs.m3) && known(inputs.s1) && known(inputs.s2)) { inputs.m3 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2 - inputs.s3 ** 2); changed = true; }
        if (!known(inputs.mid1) && known(inputs.s1)) { inputs.mid1 = inputs.s1 / 2; changed = true; }
        if (!known(inputs.mid2) && known(inputs.s2)) { inputs.mid2 = inputs.s2 / 2; changed = true; }
        if (!known(inputs.mid3) && known(inputs.s3)) { inputs.mid3 = inputs.s3 / 2; changed = true; }
        if (!known(inputs.s1) && known(inputs.mid1)) { inputs.s1 = 2 * inputs.mid1; changed = true; }
        if (!known(inputs.s2) && known(inputs.mid2)) { inputs.s2 = 2 * inputs.mid2; changed = true; }
        if (!known(inputs.s3) && known(inputs.mid3)) { inputs.s3 = 2 * inputs.mid3; changed = true; }
        if (!known(inputs.s1) && known(inputs.m1) && known(inputs.s2) && known(inputs.s3)) { inputs.s1 = Math.sqrt(2 * inputs.s2 ** 2 + 2 * inputs.s3 ** 2 - 4 * inputs.m1 ** 2); changed = true; }
        if (!known(inputs.s2) && known(inputs.m2) && known(inputs.s1) && known(inputs.s3)) { inputs.s2 = Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s3 ** 2 - 4 * inputs.m2 ** 2); changed = true; }
        if (!known(inputs.s3) && known(inputs.m3) && known(inputs.s1) && known(inputs.s2)) { inputs.s3 = Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2 - 4 * inputs.m3 ** 2); changed = true; }
        if (!known(inputs.s1) && !known(inputs.s2) && !known(inputs.s3) && known(inputs.m1) && known(inputs.m2) && known(inputs.m3)) { inputs.s1 = (2 / 3) * Math.sqrt(2 * (inputs.m2 ** 2 + inputs.m3 ** 2) - inputs.m1 ** 2); changed = true; }
        if (!known(inputs.s1) && !known(inputs.s2) && !known(inputs.s3) && known(inputs.m1) && known(inputs.m2) && known(inputs.m3)) { inputs.s2 = (2 / 3) * Math.sqrt(2 * (inputs.m1 ** 2 + inputs.m3 ** 2) - inputs.m2 ** 2); changed = true; }
        if (!known(inputs.s1) && !known(inputs.s2) && !known(inputs.s3) && known(inputs.m1) && known(inputs.m2) && known(inputs.m3)) { inputs.s3 = (2 / 3) * Math.sqrt(2 * (inputs.m1 ** 2 + inputs.m2 ** 2) - inputs.m3 ** 2); changed = true; }
        if (!known(inputs.s3) && known(inputs.s1) && known(inputs.s2) && known(inputs.angleC)) { inputs.s3 = Math.sqrt(inputs.s1 ** 2 + inputs.s2 ** 2 - 2 * inputs.s1 * inputs.s2 * Math.cos(inputs.angleC * Math.PI / 180)); changed = true; }
        if (!known(inputs.s2) && known(inputs.s1) && known(inputs.s3) && known(inputs.angleB)) { inputs.s2 = Math.sqrt(inputs.s1 ** 2 + inputs.s3 ** 2 - 2 * inputs.s1 * inputs.s3 * Math.cos(inputs.angleB * Math.PI / 180)); changed = true; }
        if (!known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && known(inputs.angleA)) { inputs.s1 = Math.sqrt(inputs.s2 ** 2 + inputs.s3 ** 2 - 2 * inputs.s2 * inputs.s3 * Math.cos(inputs.angleA * Math.PI / 180)); changed = true; }
        if (!known(inputs.angleA) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { inputs.angleA = Math.acos((inputs.s1 ** 2 - inputs.s2 ** 2 - inputs.s3 ** 2) / (-2 * inputs.s2 * inputs.s3)) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleB) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { inputs.angleB = Math.acos((inputs.s2 ** 2 - inputs.s1 ** 2 - inputs.s3 ** 2) / (-2 * inputs.s1 * inputs.s3)) * 180 / Math.PI; changed = true; }
        if (!known(inputs.angleC) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { inputs.angleC = Math.acos((inputs.s3 ** 2 - inputs.s1 ** 2 - inputs.s2 ** 2) / (-2 * inputs.s1 * inputs.s2)) * 180 / Math.PI; changed = true; }
        if (!known(inputs.s1) && known(inputs.s2) && known(inputs.angleA) && known(inputs.angleB)) { inputs.s1 = inputs.s2 * Math.sin(inputs.angleA * Math.PI / 180) / Math.sin(inputs.angleB * Math.PI / 180); changed = true; }
        if (!known(inputs.s2) && known(inputs.s1) && known(inputs.angleA) && known(inputs.angleB)) { inputs.s2 = inputs.s1 * Math.sin(inputs.angleB * Math.PI / 180) / Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!known(inputs.s3) && known(inputs.s1) && known(inputs.angleA) && known(inputs.angleC)) { inputs.s3 = inputs.s1 * Math.sin(inputs.angleC * Math.PI / 180) / Math.sin(inputs.angleA * Math.PI / 180); changed = true; }
        if (!known(inputs.inR) && known(inputs.a) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3)) { let s = (inputs.s1 + inputs.s2 + inputs.s3) / 2; inputs.inR = inputs.a / s; changed = true; }
        if (!known(inputs.circumR) && known(inputs.s1) && known(inputs.s2) && known(inputs.s3) && known(inputs.a)) { inputs.circumR = (inputs.s1 * inputs.s2 * inputs.s3) / (4 * inputs.a); changed = true; }
        if (!known(inputs.exR1) && known(inputs.a) && known(inputs.p) && known(inputs.s1)) { let s = inputs.p / 2; inputs.exR1 = inputs.a / (s - inputs.s1); changed = true; }
        if (!known(inputs.exR2) && known(inputs.a) && known(inputs.p) && known(inputs.s2)) { let s = inputs.p / 2; inputs.exR2 = inputs.a / (s - inputs.s2); changed = true; }
        if (!known(inputs.exR3) && known(inputs.a) && known(inputs.p) && known(inputs.s3)) { let s = inputs.p / 2; inputs.exR3 = inputs.a / (s - inputs.s3); changed = true; }
        break;

      // ==================== SQUARE ====================
      case "square":
        if (!known(inputs.p) && known(inputs.s)) { inputs.p = 4 * inputs.s; changed = true; }
        if (!known(inputs.s) && known(inputs.p)) { inputs.s = inputs.p / 4; changed = true; }
        if (!known(inputs.d) && known(inputs.s)) { inputs.d = Math.sqrt(2) * inputs.s; changed = true; }
        if (!known(inputs.s) && known(inputs.d)) { inputs.s = inputs.d / Math.sqrt(2); changed = true; }
        if (!known(inputs.a) && known(inputs.s)) { inputs.a = inputs.s ** 2; changed = true; }
        if (!known(inputs.s) && known(inputs.a)) { inputs.s = Math.sqrt(inputs.a); changed = true; }
        if (!known(inputs.inR) && known(inputs.s)) { inputs.inR = inputs.s / 2; changed = true; }
        if (!known(inputs.circumR) && known(inputs.s)) { inputs.circumR = (Math.sqrt(2) * inputs.s) / 2; changed = true; }
        if (!known(inputs.ml) && known(inputs.s)) { inputs.ml = (Math.sqrt(2) * inputs.s) / 2; changed = true; }
        if (!known(inputs.h) && known(inputs.h)) { inputs.h = inputs.s; changed = true; }
        if (!known(inputs.m) && known(inputs.h)) { inputs.m = inputs.s; changed = true; }
        break;

      // ==================== RECTANGLE ====================
      case "rectangle":
        if (!known(inputs.a) && known(inputs.l) && known(inputs.w)) { inputs.p = 2 * (inputs.l + inputs.w); changed = true; }
        if (!known(inputs.l) && known(inputs.p) && known(inputs.w)) { inputs.l = inputs.p / 2 - inputs.w; changed = true; }
        if (!known(inputs.w) && known(inputs.p) && known(inputs.l)) { inputs.w = inputs.p / 2 - inputs.l; changed = true; }
        if (!known(inputs.d) && known(inputs.l) && known(inputs.w)) { inputs.d = Math.sqrt(inputs.l ** 2 + inputs.w ** 2); changed = true; }
        if (!known(inputs.a) && known(inputs.l) && known(inputs.w)) { inputs.p = inputs.l * inputs.w; changed = true; }
        if (!known(inputs.l) && known(inputs.a) && known(inputs.w) && inputs.w !== 0) { inputs.l = inputs.a / inputs.w; changed = true; }
        if (!known(inputs.w) && known(inputs.a) && known(inputs.l) && inputs.l !== 0) { inputs.w = inputs.a / inputs.l; changed = true; }
        if (!known(inputs.midL) && known(inputs.l)) { inputs.midL = inputs.l / 2; changed = true; }
        if (!known(inputs.midW) && known(inputs.w)) { inputs.midW = inputs.w / 2; changed = true; }
        if (!known(inputs.l) && known(inputs.midL)) { inputs.l = 2 * inputs.midL; changed = true; }
        if (!known(inputs.w) && known(inputs.midW)) { inputs.w = 2 * inputs.midW; changed = true; }
        if (!known(inputs.inR) && known(inputs.l) && known(inputs.w)) { inputs.inR = Math.min(inputs.l, inputs.w) / 2; changed = true; }
        if (!known(inputs.circumR) && known(inputs.d)) { inputs.circumR = inputs.d / 2; changed = true; }
        if (!known(inputs.m1) && known(inputs.l) && known(inputs.w)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.l ** 2 + 2 * inputs.w ** 2); changed = true; }
        if (!known(inputs.m2) && known(inputs.l) && known(inputs.w)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== PARALLELOGRAM ====================
      case "parallelogram":
        if (!known(inputs.a) && known(inputs.b) && known(inputs.h)) { inputs.a = inputs.b * inputs.h; changed = true; }
        if (!known(inputs.h) && known(inputs.a) && known(inputs.b) && inputs.b !== 0) { inputs.h = inputs.a / inputs.b; changed = true; }
        if (!known(inputs.p) && known(inputs.b) && known(inputs.s)) { inputs.p = 2 * (inputs.b + inputs.s); changed = true; }
        if (!known(inputs.angleB) && known(inputs.angleA)) { inputs.angleB = 180 - inputs.angleA; changed = true; }
        if (!known(inputs.angleA) && known(inputs.angleB)) { inputs.angleA = 180 - inputs.angleB; changed = true; }
        if (!known(inputs.midB) && known(inputs.b)) { inputs.midB = inputs.b / 2; changed = true; }
        if (!known(inputs.midS) && known(inputs.s)) { inputs.midS = inputs.s / 2; changed = true; }
        if (!known(inputs.inR) && known(inputs.a) && known(inputs.p)) { inputs.inR = inputs.a / (0.5 * inputs.P); changed = true; }
        if (!known(inputs.circumR) && known(inputs.b) && known(inputs.s) && known(inputs.angleA)) { inputs.circumR = Math.sqrt(inputs.b ** 2 + inputs.s ** 2 - 2 * inputs.b * inputs.s * Math.cos(inputs.angleA * Math.PI / 180)) / 2; changed = true; }
        if (!known(inputs.m1) && known(inputs.b) && known(inputs.s)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.b ** 2 + 2 * inputs.s ** 2 - 4 * inputs.b * inputs.s * Math.cos(inputs.angleA * Math.PI / 180)); changed = true; }
        if (!known(inputs.m2) && known(inputs.b) && known(inputs.s)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== TRAPEZOID ====================
      case "trapezoid":
        if (!known(inputs.a) && known(inputs.b1) && known(inputs.b2) && known(inputs.h)) { inputs.a = 0.5 * (inputs.b1 + inputs.b2) * inputs.h; changed = true; }
        if (!known(inputs.h) && known(inputs.a) && known(inputs.b1) && known(inputs.b2) && (inputs.b1 + inputs.b2) !== 0) { inputs.h = (2 * inputs.a) / (inputs.b1 + inputs.b2); changed = true; }
        if (!known(inputs.mid) && known(inputs.b1) && known(inputs.b2)) { inputs.mid = 0.5 * (inputs.b1 + inputs.b2); changed = true; }
        if (!known(inputs.p) && known(inputs.b1) && known(inputs.b2) && known(inputs.s1) && known(inputs.s2)) { inputs.p = inputs.b1 + inputs.b2 + inputs.s1 + inputs.s2; changed = true; }
        if (!known(inputs.b1) && known(inputs.mid) && known(inputs.b2)) { inputs.b1 = 2 * inputs.mid - inputs.b2; changed = true; }
        if (!known(inputs.b2) && known(inputs.mid) && known(inputs.b1)) { inputs.b2 = 2 * inputs.mid - inputs.b1; changed = true; }
        if (!known(inputs.inR) && known(inputs.a) && known(inputs.p)) { inputs.inR = 2 * inputs.a / inputs.a; changed = true; }
        if (!known(inputs.circumR) && known(inputs.b1) && known(inputs.b2) && known(inputs.s1) && known(inputs.s2)) { inputs.circumR = (inputs.b1 * inputs.b2 + inputs.s1 * inputs.s2) / (4 * inputs.A); changed = true; }
        if (!known(inputs.m1) && known(inputs.b1) && known(inputs.b2) && known(inputs.s1) && known(inputs.s2)) { inputs.m1 = 0.5 * Math.sqrt(inputs.b1 ** 2 + inputs.s1 ** 2); changed = true; }
        if (!known(inputs.m2) && known(inputs.b1) && known(inputs.b2) && known(inputs.s1) && known(inputs.s2)) { inputs.m2 = 0.5 * Math.sqrt(inputs.b2 ** 2 + inputs.s2 ** 2); changed = true; }
        break;

      // ==================== RHOMBUS ====================
      case "rhombus":
        if (!known(inputs.p) && known(inputs.s)) { inputs.p = 4 * inputs.s; changed = true; }
        if (!known(inputs.a) && known(inputs.d1) && known(inputs.d2)) { inputs.a = 0.5 * inputs.d1 * inputs.d2; changed = true; }
        if (!known(inputs.s) && known(inputs.p)) { inputs.s = inputs.p / 4; changed = true; }
        if (!known(inputs.d1) && known(inputs.a) && known(inputs.d2)) { inputs.d1 = (2 * inputs.a) / inputs.d2; changed = true; }
        if (!known(inputs.d2) && known(inputs.a) && known(inputs.d1)) { inputs.d2 = (2 * inputs.a) / inputs.d1; changed = true; }
        if (!known(inputs.h) && known(inputs.a) && known(inputs.s)) { inputs.h = inputs.a / inputs.s; changed = true; }
        if (!known(inputs.midD1) && known(inputs.d1)) { inputs.midD1 = inputs.d1 / 2; changed = true; }
        if (!known(inputs.midD2) && known(inputs.d2)) { inputs.midD2 = inputs.d2 / 2; changed = true; }
        if (!known(inputs.m1) && known(inputs.s)) { inputs.m1 = inputs.s; changed = true; }
        if (!known(inputs.m2) && known(inputs.s)) { inputs.m2 = inputs.s; changed = true; }
        break;

      // ==================== KITE ====================
      case "kite":
        if (!known(inputs.p) && known(inputs.s1) && known(inputs.s2)) { inputs.p = 2 * (inputs.s1 + inputs.s2); changed = true; }
        if (!known(inputs.a) && known(inputs.d1) && known(inputs.d2)) { inputs.a = 0.5 * inputs.d1 * inputs.d2; changed = true; }
        if (!known(inputs.midD1) && known(inputs.d1)) { inputs.midD1 = inputs.d1 / 2; changed = true; }
        if (!known(inputs.midD2) && known(inputs.d2)) { inputs.midD2 = inputs.d2 / 2; changed = true; }
        if (!known(inputs.d1) && known(inputs.midD1)) { inputs.d1 = 2 * inputs.midD1; changed = true; }
        if (!known(inputs.d2) && known(inputs.midD2)) { inputs.d2 = 2 * inputs.midD2; changed = true; }
        if (!known(inputs.inR) && known(inputs.a) && known(inputs.p)) { inputs.inR = inputs.a / (0.5 * inputs.p); changed = true; }
        if (!known(inputs.circumR) && known(inputs.d1) && known(inputs.d2)) { inputs.circumR = 0.5 * Math.sqrt(inputs.d1 ** 2 + inputs.d2 ** 2); changed = true; }
        if (!known(inputs.m1) && known(inputs.s1) && known(inputs.s2)) { inputs.m1 = 0.5 * Math.sqrt(2 * inputs.s1 ** 2 + 2 * inputs.s2 ** 2); changed = true; }
        if (!known(inputs.m2) && known(inputs.s1) && known(inputs.s2)) { inputs.m2 = inputs.m1; changed = true; }
        break;

      // ==================== ELLIPSE ====================
      case "ellipse":
        if (!known(inputs.a) && known(inputs.a) && known(inputs.b)) { inputs.a = Math.PI * inputs.a * inputs.b; changed = true; }
        if (!known(inputs.p) && known(inputs.a) && known(inputs.b)) { inputs.p = Math.PI * (3 * (inputs.a + inputs.b) - Math.sqrt((3 * inputs.a + inputs.b) * (inputs.a + 3 * inputs.b))); changed = true; }
        if (!known(inputs.c) && known(inputs.a) && known(inputs.b)) { inputs.c = Math.sqrt(inputs.a ** 2 - inputs.b ** 2); changed = true; }
        if (!known(inputs.b) && known(inputs.a) && known(inputs.c)) { inputs.b = Math.sqrt(inputs.a ** 2 - inputs.c ** 2); changed = true; }
        break;

      // ==================== REGULAR POLYGON ====================
      case "regularPolygon":
        if (!known(inputs.p) && known(inputs.n) && known(inputs.s)) { inputs.p = inputs.n * inputs.s; changed = true; }
        if (!known(inputs.a) && known(inputs.n) && known(inputs.s) && known(inputs.apothem)) { inputs.a = 0.5 * inputs.n * inputs.s * inputs.apothem; changed = true; }
        if (!known(inputs.apothem) && known(inputs.a) && known(inputs.p) && inputs.p !== 0) { inputs.apothem = (2 * inputs.a) / inputs.p; changed = true; }
        if (!known(inputs.inR) && known(inputs.a) && known(inputs.p) && inputs.p !== 0) { inputs.inR = (2 * inputs.a) / inputs.p; changed = true; }
        if (!known(inputs.circumR) && known(inputs.s) && known(inputs.n)) { inputs.circumR = inputs.s / (2 * Math.sin(Math.PI / inputs.n)); changed = true; }
        break;
    }
  }

  return inputs;
}
function shapes2DCompute() {
  const shape = document.getElementById("shape2D").value;
  let inputs = {};
  const nameMap = {
    r: "Radius",
    d: "Diameter",
    c: "Circumference",
    a: "Area",
    tp: "Triangle type based on angles",
    tT: "Triangle type based on sides",
    b: "Base",
    h1: "Height 1",
    h2: "Height 2",
    h3: "Height 3",
    m1: "Median 1",
    m2: "Median 2",
    m3: "Median 3",
    h: "Height",
    ml: "Midline",
    ml1: "Midline",
    ml2: "Midline",
    s1: "Side 1",
    s2: "Side 2",
    s3: "Side 3",
    p: "Perimeter",
    sp: "Semierimeter",
    l: "Length",
    w: "Width",
    d1: "Diagonal 1",
    d2: "Diagonal 2",
    n: "Number of Sides",
    s: "Side Length",
    apothem: "Apothem Length",
    sectorArea: "Sector Area",
    arcLength: "Arc Length",
    centralAngle: "Central Angle",
    semiperimeter: "Semiperimeter",
    inR: "Inradius",
    circumR: "Circumradius",
    exR1: "Exradius 1",
    exR2: "Exradius 2",
    exR3: "Exradius 3",
    angleA: "Angle A",
    angleB: "Angle B",
    angleC: "Angle C",
    midsegment: "Midsegment",
    base1: "Base 1",
    base2: "Base 2",
    focalDistance: "Focal Distance",
    semiMajor: "Semi-Major Axis",
    semiMinor: "Semi-Minor Axis",
    midL: "Longer midline",
    midW: "Shorter midline",
    midB: "Midline of base",
    midS: "Midline of side",
    midD1: "Midsegment of diagonal 1",
    midS: "Midsegment of diagonal 2",
    mid1: "Midsegment 1",
    mid2: "Midsegment 2",
    mid3: "Midsegment 3"
  };
  switch (shape) {
    case "circle":
      inputs = {
        r: parseFloat(shape2DCircleRadius?.value) || null,
        d: parseFloat(shape2DCircleDiameter?.value) || null,
        c: parseFloat(shape2DCircleCircumference?.value) || null,
        a: parseFloat(shape2DCircleArea?.value) || null,
        SectorArea: parseFloat(shape2DCircleSectorArea?.value) || null,
        ArcLength: parseFloat(shape2DCircleArcLength?.value) || null,
        CentralAngle: parseFloat(shape2DCircleCentralAngle?.value) || null
      };
      break;
    case "triangle":
      inputs = {
        tp: shape2DTriangleAngleType?.value || null,
        tT: shape2DTriangleSideType?.value || null,
        s1: parseFloat(shape2DTriangleSide1?.value) || null,
        s2: parseFloat(shape2DTriangleSide2?.value) || null,
        s3: parseFloat(shape2DTriangleSide3?.value) || null,
        b: parseFloat(shape2DTriangleBase?.value) || null,
        h1: parseFloat(shape2DTriangleHeight1?.value) || null,
        h2: parseFloat(shape2DTriangleHeight2?.value) || null,
        h3: parseFloat(shape2DTriangleHeight3?.value) || null,
        m1: parseFloat(shape2DTriangleMedian1?.value) || null,
        m2: parseFloat(shape2DTriangleMedian2?.value) || null,
        m3: parseFloat(shape2DTriangleMedian3?.value) || null,
        mid1: parseFloat(shape2DTriangleMidsegment1?.value) || null,
        mid2: parseFloat(shape2DTriangleMidsegment2?.value) || null,
        mid3: parseFloat(shape2DTriangleMidsegment3?.value) || null,
        p: parseFloat(shape2DTrianglePerimeter?.value) || null,
        sp: parseFloat(shape2DTriangleSemiperimeter?.value) || null,
        a: parseFloat(shape2DTriangleArea?.value) || null,
        angleA: parseFloat(shape2DTriangleAngle1?.value) || null,
        angleB: parseFloat(shape2DTriangleAngle2?.value) || null,
        angleC: parseFloat(shape2DTriangleAngle3?.value) || null,
        inR: parseFloat(shape2DTriangleInradius?.value) || null,
        exR1: parseFloat(shape2DTriangleExradius1?.value) || null,
        exR2: parseFloat(shape2DTriangleExradius2?.value) || null,
        exR3: parseFloat(shape2DTriangleExradius3?.value) || null,
        circumR: parseFloat(shape2DTriangleCircumradius?.value) || null
      };
      break;
    case "square":
      inputs = {
        s: parseFloat(shape2DSquareSide?.value) || null,
        d: parseFloat(shape2DSquareDiagonal?.value) || null,
        m: parseFloat(shape2DSquareMedian?.value) || null,
        h: parseFloat(shape2DSquareHeight?.value) || null,
        ml: parseFloat(shape2DSquareMidline?.value) || null,
        p: parseFloat(shape2DSquarePerimeter?.value) || null,
        a: parseFloat(shape2DSquareArea?.value) || null,
        inR: parseFloat(shape2DSquareInradius?.value) || null,
        circumR: parseFloat(shape2DSquareCircumradius?.value) || null
      };
      break;
    case "rectangle":
      inputs = {
        l: parseFloat(shape2DRectangleLength?.value) || null,
        w: parseFloat(shape2DRectangleWidth?.value) || null,
        d: parseFloat(shape2DRectangleDiagonal?.value) || null,
        p: parseFloat(shape2DRectanglePerimeter?.value) || null,
        a: parseFloat(shape2DRectangleArea?.value) || null,
        midL: parseFloat(shape2DRectangleMidlineL?.value) || null,
        midW: parseFloat(shape2DRectangleMidlineW?.value) || null,
        inR: parseFloat(shape2DRectangleInradius?.value) || null,
        circumR: parseFloat(shape2DRectangleCircumradius?.value) || null,
        m1: parseFloat(shape2DRectangleMedian1?.value) || null,
        m2: parseFloat(shape2DRectangleMedian2?.value) || null
      };
      break;
    case "parallelogram":
      inputs = {
        b: parseFloat(shape2DParallelogramBase?.value) || null,
        h: parseFloat(shape2DParallelogramHeight?.value) || null,
        s: parseFloat(shape2DParallelogramSide?.value) || null,
        angleA: parseFloat(shape2DParallelogramAngleA?.value) || null,
        angleB: parseFloat(shape2DParallelogramAngleB?.value) || null,
        p: parseFloat(shape2DParallelogramPerimeter?.value) || null,
        a: parseFloat(shape2DParallelogramArea?.value) || null,
        midB: parseFloat(shape2DParallelogramMidlineB?.value) || null,
        midS: parseFloat(shape2DParallelogramMidlineS?.value) || null,
        inR: parseFloat(shape2DParallelogramInradius?.value) || null,
        circumR: parseFloat(shape2DParallelogramCircumradius?.value) || null,
        m1: parseFloat(shape2DParallelogramMedian1?.value) || null,
        m2: parseFloat(shape2DParallelogramMedian2?.value) || null
      };
      break;
    case "trapezoid":
      inputs = {
        b1: parseFloat(shape2DTrapezoidBase1?.value) || null,
        b2: parseFloat(shape2DTrapezoidBase2?.value) || null,
        h: parseFloat(shape2DTrapezoidHeight?.value) || null,
        s1: parseFloat(shape2DTrapezoidSide1?.value) || null,
        s2: parseFloat(shape2DTrapezoidSide2?.value) || null,
        mid: parseFloat(shape2DTrapezoidMidsegment?.value) || null,
        p: parseFloat(shape2DTrapezoidPerimeter?.value) || null,
        a: parseFloat(shape2DTrapezoidArea?.value) || null,
        inR: parseFloat(shape2DTrapezoidInradius?.value) || null,
        circumR: parseFloat(shape2DTrapezoidCircumradius?.value) || null,
        m1: parseFloat(shape2DTrapezoidMedian1?.value) || null,
        m2: parseFloat(shape2DTrapezoidMedian2?.value) || null
      };
      break;
    case "rhombus":
      inputs = {
        s: parseFloat(shape2DRhombusSide?.value) || null,
        d1: parseFloat(shape2DRhombusDiagonal1?.value) || null,
        d2: parseFloat(shape2DRhombusDiagonal2?.value) || null,
        h: parseFloat(shape2DRhombusHeight?.value) || null,
        midD1: parseFloat(shape2DRhombusMidDiagonal1?.value) || null,
        midD2: parseFloat(shape2DRhombusMidDiagonal2?.value) || null,
        P: parseFloat(shape2DRhombusPerimeter?.value) || null,
        A: parseFloat(shape2DRhombusArea?.value) || null,
        m1: parseFloat(shape2DRhombusMedian1?.value) || null,
        m2: parseFloat(shape2DRhombusMedian2?.value) || null
      };
      break;
    case "kite":
      inputs = {
        d1: parseFloat(shape2DKiteDiagonal1?.value) || null,
        d2: parseFloat(shape2DKiteDiagonal2?.value) || null,
        s1: parseFloat(shape2DKiteSide1?.value) || null,
        s2: parseFloat(shape2DKiteSide2?.value) || null,
        p: parseFloat(shape2DKitePerimeter?.value) || null,
        a: parseFloat(shape2DKiteArea?.value) || null,
        midD1: parseFloat(shape2DKiteMidD1?.value) || null,
        midD2: parseFloat(shape2DKiteMidD2?.value) || null,
        inR: parseFloat(shape2DKiteInradius?.value) || null,
        circumR: parseFloat(shape2DKiteCircumradius?.value) || null,
        m1: parseFloat(shape2DKiteMedian1?.value) || null,
        m2: parseFloat(shape2DKiteMedian2?.value) || null
      };
      break;
    case "ellipse":
      inputs = {
        a: parseFloat(shape2DEllipseSemiMajor?.value) || null,
        b: parseFloat(shape2DEllipseSemiMinor?.value) || null,
        c: parseFloat(shape2DEllipseFocalDistance?.value) || null,
        p: parseFloat(shape2DEllipsePerimeter?.value) || null,
        a: parseFloat(shape2DEllipseArea?.value) || null
      };
      break;
    case "regularPolygon":
      inputs = {
        n: parseFloat(shape2DRegularPolygonSides?.value) || null,
        s: parseFloat(shape2DRegularPolygonSideLength?.value) || null,
        apothem: parseFloat(shape2DRegularPolygonApothemLength?.value) || null,
        a: parseFloat(shape2DRegularPolygonArea?.value) || null,
        p: parseFloat(shape2DRegularPolygonPerimeter?.value) || null,
        circumR: parseFloat(shape2DRegularPolygonCircumradius?.value) || null,
        inR: parseFloat(shape2DRegularPolygonInradius?.value) || null
      };
      break;
  }

  const result = solveShape2D(shape, inputs);
  const fmt = (x) => {
    if (typeof x === "string") return x; if (x !== null && !isNaN(x)) return x.toFixed(4); return "unknown";
  };
  let out = `Shape: ${shape}\n`;
  for (const [key, val] of Object.entries(result)) out += `${nameMap[key] || key} = ${fmt(val)}\n`;
  document.getElementById("shapes2DOut").textContent = out;
}
function shapes2DClear() {
  document.querySelectorAll('.shapes-2d-visible input').forEach(input => input.value = '');
  document.getElementById('shape2D').value = 'select';
  document.getElementById('shapes2DOut').textContent = '';
  const grids = [
    'shapes2DCircleGrid',
    'shapes2DTriangleGrid',
    'shapes2DSquareGrid',
    'shapes2DRectangleGrid',
    'shapes2DParallelogramGrid',
    'shapes2DTrapezoidGrid',
    'shapes2DRhombusGrid',
    'shapes2DKiteGrid',
    'shapes2DEllipseGrid',
    'shapes2DRegularPolygonGrid'
  ];
  grids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('shapes-2d-visible');
      el.classList.add('shapes-2d-hidden');
    }
  });
}

// =============== PHYSICS ===============

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

// ======== CHEMISTRY ========
function highlightElementGroup(type) {
  const elements = document.querySelectorAll(`.${type}`);
  const alreadyHighlighted = Array.from(elements).some(el => el.classList.contains('highlighted'));
  document.querySelectorAll('.element-box').forEach(el => el.classList.remove('highlighted'));
  if (!alreadyHighlighted) {
    elements.forEach(el => el.classList.add('highlighted'));
  }
}

function showElementInfo(symbol) {
  const out = document.getElementById('ptOut');
  const info = elementData[symbol];
  const infoBtn = document.getElementById('ptInfoBtn');
  if (!info) {
    out.textContent = "No data available for this element.";
    infoBtn.classList.remove('ptInfoBtnHidden');
    infoBtn.classList.add('ptInfoBtnVisible');
    return;
  }
  out.innerHTML = info.replace(/\n/g, '<br>');
  infoBtn.classList.remove('ptInfoBtnHidden');
  infoBtn.classList.add('ptInfoBtnVisible');
}
document.querySelectorAll('.element-box').forEach(box => {
  box.addEventListener('click', () => {
    const symbol = box.getAttribute('data-symbol');
    showElementInfo(symbol);
  });
});
const elementData = {
  H: 'Atomic Number: 1\nCategory: Nonmetal\nPeriod / Block: 1 / s\nAppearance: Colorless gas\nProperties: Lightest element; highly flammable; forms H₂ gas\nReactivity: Reacts explosively with oxygen; forms water\nDiscovery / History: Recognized as an element by Henry Cavendish in 1766\nName Origin: Greek “hydro” (water) + “genes” (creator)\nOccurrence / Uses: Water, acids, ammonia, fuel cells, rockets\nTrivia: Makes up ~75% of the universe’s elemental mass',
  He: 'Atomic Number: 2\nCategory: Noble gas\nPeriod / Block: 1 / s\nAppearance: Colorless, odorless gas\nProperties: Inert, very low boiling point\nReactivity: Extremely unreactive\nDiscovery / History: Detected in the Sun’s spectrum in 1868, isolated on Earth in 1895\nName Origin: Greek “Helios” (Sun)\nOccurrence / Uses: Balloons, cryogenics, pressurizing, deep-sea diving\nTrivia: Second lightest element; can produce superfluid at near absolute zero',
  Li: 'Atomic Number: 3\nCategory: Alkali metal\nPeriod / Block: 2 / s\nAppearance: Silvery metal\nProperties: Soft, reacts with water, low density\nReactivity: Very reactive; stored in oil\nDiscovery / History: Discovered by Johan August Arfvedson in 1817\nName Origin: Greek “lithos” (stone)\nOccurrence / Uses: Batteries, ceramics, pharmaceuticals\nTrivia: Lightest metal; used in mental health medicine',
  Be: 'Atomic Number: 4\nCategory: Alkaline Earth Metals\nPeriod / Block: 2 / s\nAppearance: Hard, gray metal\nProperties: High melting point, low density\nReactivity: Reactive, especially with acids\nDiscovery / History: Discovered by Louis-Nicolas Vauquelin in 1798\nName Origin: Greek “beryllos” (beryl)\nOccurrence / Uses: Aerospace, X-ray windows, nuclear reactors\nTrivia: Rarely found in nature; often extracted from beryl',
  B: 'Atomic Number: 5\nCategory: Metalloids\nPeriod / Block: 2 / p\nAppearance: Black-brown solid\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Joseph Louis Gay-Lussac and Louis Jacques Thénard in 1808\nName Origin: Arabic “buraq” (lightning)\nOccurrence / Uses: Glass, ceramics, detergents\nTrivia: Has several allotropes; used in boron nitride',
  C: 'Atomic Number: 6\nCategory: Nonmetals\nPeriod / Block: 2 / p\nAppearance: Black (graphite) or clear (diamond)\nProperties: Forms various allotropes; essential for life\nReactivity: Reacts with oxygen to form CO and CO₂\nDiscovery / History: Known since ancient times; recognized as an element in the 18th century\nName Origin: Latin “carbo” (coal)\nOccurrence / Uses: Life, fuels, steel production, lubricants\nTrivia: Basis of organic chemistry; diamond is the hardest natural substance',
  N: 'Atomic Number: 7\nCategory: Nonmetals\nPeriod / Block: 2 / p\nAppearance: Colorless gas\nProperties: Inert, makes up ~78% of Earth’s atmosphere\nReactivity: Generally unreactive; forms compounds like ammonia and nitrates\nDiscovery / History: Discovered by Daniel Rutherford in 1772\nName Origin: Greek “nitron” + “genes” (forming)\nOccurrence / Uses: Fertilizers, explosives, industrial processes\nTrivia: Essential for life; part of amino acids and nucleic acids',
  O: 'Atomic Number: 8\nCategory: Nonmetals\nPeriod / Block: 2 / p\nAppearance: Colorless gas\nProperties: Supports combustion; essential for respiration\nReactivity: Highly reactive; forms oxides with most elements\nDiscovery / History: Discovered by Carl Wilhelm Scheele and Joseph Priestley in the 1770s\nName Origin: Greek “oxys” (acid) + “genes” (forming)\nOccurrence / Uses: Respiration, combustion, water, steel production\nTrivia: Makes up ~21% of Earth’s atmosphere; ozone is a form of oxygen',
  F: 'Atomic Number: 9\nCategory: Halogens\nPeriod / Block: 2 / p\nAppearance: Pale yellow gas\nProperties: Highly reactive, corrosive\nReactivity: Most reactive of all elements; forms compounds with almost all other elements\nDiscovery / History: Discovered by Henri Moissan in 1886\nName Origin: Latin “fluere” (to flow)\nOccurrence / Uses: Toothpaste, Teflon, refrigerants\nTrivia: Never found free in nature due to its reactivity',
  Ne: 'Atomic Number: 10\nCategory: Noble gas\nPeriod / Block: 2 / p\nAppearance: Colorless gas\nProperties: Inert, low density\nReactivity: Extremely unreactive\nDiscovery / History: Discovered in the Sun’s spectrum in 1869\nName Origin: Greek “neos” (new)\nOccurrence / Uses: Neon lights, high-voltage indicators\nTrivia: Emits a distinct reddish-orange glow when electrified',
  Na: 'Atomic Number: 11\nCategory: Alkali Metals\nPeriod / Block: 3 / s\nAppearance: Silvery-white metal\nProperties: Soft, malleable, highly reactive\nReactivity: Reacts vigorously with water\nDiscovery / History: Discovered by Sir Humphry Davy in 1807\nName Origin: Latin “Natrium”\nOccurrence / Uses: Table salt, soap, glass\nTrivia: Essential for life; regulates blood pressure',
  Mg: 'Atomic Number: 12\nCategory: Alkaline Earth Metals\nPeriod / Block: 3 / s\nAppearance: Silvery-white metal\nProperties: Lightweight, strong, resistant to corrosion\nReactivity: Reacts with water, but less vigorously than alkali metals\nDiscovery / History: Isolated by Sir Humphry Davy in 1808\nName Origin: Greek “magnesia” (a region in Thessaly)\nOccurrence / Uses: Chlorophyll, fireworks, flares\nTrivia: 8th most abundant element in the universe',
  Al: 'Atomic Number: 13\nCategory: Post-transition Metals\nPeriod / Block: 3 / p\nAppearance: Silvery-white metal\nProperties: Lightweight, malleable, ductile\nReactivity: Reacts with acids and bases\nDiscovery / History: Isolated by Hans Christian Ørsted in 1825\nName Origin: Latin “Alumen” (bitter salt)\nOccurrence / Uses: Aircraft, packaging, construction\nTrivia: Most abundant metal in Earth’s crust',
  Si: 'Atomic Number: 14\nCategory: Metalloids\nPeriod / Block: 3 / p\nAppearance: Hard, brittle crystalline solid\nProperties: Semiconductor, high melting point\nReactivity: Reacts with oxygen and halogens\nDiscovery / History: Discovered by Jöns Jacob Berzelius in 1824\nName Origin: Latin “silex” (flint)\nOccurrence / Uses: Computer chips, solar cells, glass\nTrivia: Second most abundant element in Earth’s crust',
  P: 'Atomic Number: 15\nCategory: Nonmetals\nPeriod / Block: 3 / p\nAppearance: White, red, or black solid\nProperties: Highly reactive, essential for life\nReactivity: Reacts with oxygen and halogens\nDiscovery / History: Discovered by Hennig Brand in 1669\nName Origin: Greek “phosphoros” (light-bearer)\nOccurrence / Uses: Fertilizers, detergents, matches\nTrivia: Vital for DNA, RNA, and ATP in living organisms',
  S: 'Atomic Number: 16\nCategory: Nonmetals\nPeriod / Block: 3 / p\nAppearance: Yellow solid\nProperties: Brittle, low melting point\nReactivity: Reacts with oxygen and metals\nDiscovery / History: Known since ancient times; recognized as an element in the 18th century\nName Origin: Latin “sulphur”\nOccurrence / Uses: Sulfuric acid, vulcanization of rubber\nTrivia: Found in volcanic regions; used in gunpowder',
  Cl: 'Atomic Number: 17\nCategory: Halogens\nPeriod / Block: 3 / p\nAppearance: Greenish-yellow gas\nProperties: Toxic, corrosive\nReactivity: Very reactive; forms compounds with almost all elements\nDiscovery / History: Discovered by Carl Wilhelm Scheele in 1774\nName Origin: Greek “chloros” (green)\nOccurrence / Uses: Disinfectants, bleaches, water treatment\nTrivia: Most reactive nonmetal; used in mustard gas',
  Ar: 'Atomic Number: 18\nCategory: Noble Gases\nPeriod / Block: 3 / p\nAppearance: Colorless gas\nProperties: Inert, low density\nReactivity: Extremely unreactive\nDiscovery / History: Discovered in the Sun’s spectrum in 1869\nName Origin: Greek “argos” (inactive)\nOccurrence / Uses: Neon lights, high-voltage indicators\nTrivia: Emits a distinct reddish-orange glow when electrified',
  K: 'Atomic Number: 19\nCategory: Alkali Metals\nPeriod / Block: 4 / s\nAppearance: Silvery-white metal\nProperties: Soft, malleable, highly reactive\nReactivity: Reacts vigorously with water\nDiscovery / History: Discovered by Sir Humphry Davy in 1807\nName Origin: Latin “Kalium”\nOccurrence / Uses: Fertilizers, soap, glass\nTrivia: Essential for life; regulates blood pressure',
  Ca: 'Atomic Number: 20\nCategory: Alkaline Earth Metals\nPeriod / Block: 4 / s\nAppearance: Silvery-white metal\nProperties: Lightweight, strong, resistant to corrosion\nReactivity: Reacts with water, but less vigorously than alkali metals\nDiscovery / History: Isolated by Sir Humphry Davy in 1808\nName Origin: Latin “Calx” (lime)\nOccurrence / Uses: Bones, teeth, cement\nTrivia: 5th most abundant element in the universe',
  Sc: 'Atomic Number: 21\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery metal\nProperties: Lightweight, strong, resistant to corrosion\nReactivity: Reacts with oxygen and water\nDiscovery / History: Discovered by Lars Fredrik Nilson in 1879\nName Origin: Latin “Scandia” (Scandinavia)\nOccurrence / Uses: Aerospace, medical devices\nTrivia: Used in high-performance alloys',
  Ti: 'Atomic Number: 22\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery-gray metal\nProperties: Strong, lightweight, resistant to corrosion\nReactivity: Reacts with oxygen at high temperatures\nDiscovery / History: Discovered by William Gregor in 1791\nName Origin: Latin “Titanium” (Titans of Greek mythology)\nOccurrence / Uses: Aerospace, medical implants, pigments\nTrivia: 9th most abundant element in the universe',
  V: 'Atomic Number: 23\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery metal\nProperties: Strong, ductile, resistant to corrosion\nReactivity: Reacts with oxygen and water\nDiscovery / History: Discovered by Andrés Manuel del Río in 1801\nName Origin: Latin “Vanadium” (Vanadis, goddess of beauty)\nOccurrence / Uses: Aerospace, automotive, chemical industries\nTrivia: Used in high-strength alloys',
  Cr: 'Atomic Number: 24\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery-gray metal\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Louis Nicolas Vauquelin in 1797\nName Origin: Latin “Chromium” (color)\nOccurrence / Uses: Stainless steel, pigments, leather tanning\nTrivia: Has several oxidation states; used in colored glass',
  Mn: 'Atomic Number: 25\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery metal\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Johann Gottlieb Gahn in 1774\nName Origin: Latin “Manganum” (magnet)\nOccurrence / Uses: Steel production, batteries, pigments\nTrivia: Essential trace element for living organisms',
  Fe: 'Atomic Number: 26\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery-gray metal\nProperties: Ductile, malleable, magnetic\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Latin “Ferrum” (iron)\nOccurrence / Uses: Construction, transportation, manufacturing\nTrivia: Most widely used metal; essential for blood production',
  Co: 'Atomic Number: 27\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Hard, lustrous metal\nProperties: High melting point, good conductor\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Georg Brandt in 1735\nName Origin: Latin “Cobaltum” (goblin)\nOccurrence / Uses: Batteries, magnets, catalysts\nTrivia: Essential trace element; used in vitamin B12',
  Ni: 'Atomic Number: 28\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Silvery-white metal\nProperties: Ductile, malleable, resistant to corrosion\nReactivity: Reacts with acids\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Latin “Niccolum” (nickel)\nOccurrence / Uses: Coins, batteries, alloys\nTrivia: Used in stainless steel and other corrosion-resistant alloys',
  Cu: 'Atomic Number: 29\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Reddish-brown metal\nProperties: Ductile, malleable, excellent conductor\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Latin “Cuprum” (from Cyprus)\nOccurrence / Uses: Electrical wiring, plumbing, coins\nTrivia: Has been used by humans for thousands of years',
  Zn: 'Atomic Number: 30\nCategory: Transition Metals\nPeriod / Block: 4 / d\nAppearance: Bluish-white metal\nProperties: Brittle, low melting point\nReactivity: Reacts with acids\nDiscovery / History: Discovered by Andreas Marggraf in 1746\nName Origin: German “Zink”\nOccurrence / Uses: Galvanization, alloys, batteries\nTrivia: Essential trace element; used in zinc supplements',
  Ga: 'Atomic Number: 31\nCategory: Post-transition Metals\nPeriod / Block: 4 / p\nAppearance: Silvery-blue metal\nProperties: Soft, low melting point\nReactivity: Reacts with acids\nDiscovery / History: Discovered by Paul-Émile Lecoq de Boisbaudran in 1875\nName Origin: Latin “Gallia” (Gaul)\nOccurrence / Uses: LEDs, solar panels, alloys\nTrivia: Has a low melting point; can melt in your hand',
  Ge: 'Atomic Number: 32\nCategory: Metalloids\nPeriod / Block: 4 / p\nAppearance: Grayish-white metal\nProperties: Brittle, semiconductor\nReactivity: Reacts with oxygen and halogens\nDiscovery / History: Discovered by Clemens Winkler in 1886\nName Origin: Latin “Germania” (Germany)\nOccurrence / Uses: Electronics, fiber optics, solar cells\nTrivia: Has properties of both metals and nonmetals',
  As: 'Atomic Number: 33\nCategory: Metalloids\nPeriod / Block: 4 / p\nAppearance: Gray metallic solid\nProperties: Brittle, toxic\nReactivity: Reacts with oxygen and halogens\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Greek “arsenikon” (yellow orpiment)\nOccurrence / Uses: Semiconductors, pesticides, wood preservatives\nTrivia: Poisonous; used historically as a poison',
  Se: 'Atomic Number: 34\nCategory: Nonmetals\nPeriod / Block: 4 / p\nAppearance: Red or gray solid\nProperties: Brittle, semiconductor\nReactivity: Reacts with oxygen and metals\nDiscovery / History: Discovered by Jöns Jacob Berzelius in 1817\nName Origin: Greek “selene” (moon)\nOccurrence / Uses: Glass, pigments, photocopiers\nTrivia: Has several allotropes; essential for life',
  Br: 'Atomic Number: 35\nCategory: Halogens\nPeriod / Block: 4 / p\nAppearance: Reddish-brown liquid\nProperties: Toxic, corrosive\nReactivity: Very reactive; forms compounds with almost all elements\nDiscovery / History: Discovered by Antoine Jérôme Balard in 1826\nName Origin: Greek “bromos” (stench)\nOccurrence / Uses: Disinfectants, flame retardants\nTrivia: Only liquid nonmetal at room temperature',
  Kr: 'Atomic Number: 36\nCategory: Noble Gases\nPeriod / Block: 4 / p\nAppearance: Colorless gas\nProperties: Inert, low density\nReactivity: Extremely unreactive\nDiscovery / History: Discovered in the Sun’s spectrum in 1898\nName Origin: Greek “kryptos” (hidden)\nOccurrence / Uses: Neon lights, high-voltage indicators\nTrivia: Emits a distinct reddish-orange glow when electrified',
  Rb: 'Atomic Number: 37\nCategory: Alkali Metals\nPeriod / Block: 5 / s\nAppearance: Silvery-white metal\nProperties: Soft, malleable, highly reactive\nReactivity: Reacts vigorously with water\nDiscovery / History: Discovered by Robert Bunsen and Gustav Kirchhoff in 1861\nName Origin: Latin “Rubidus” (deep red)\nOccurrence / Uses: Photocells, fireworks, research\nTrivia: Has the lowest ionization energy of all elements',
  Sr: 'Atomic Number: 38\nCategory: Alkaline Earth Metals\nPeriod / Block: 5 / s\nAppearance: Silvery-white metal\nProperties: Lightweight, strong, resistant to corrosion\nReactivity: Reacts with water, but less vigorously than alkali metals\nDiscovery / History: Isolated by Sir Humphry Davy in 1808\nName Origin: Latin “Strontian” (from Strontian, Scotland)\nOccurrence / Uses: Fireworks, magnets, medical imaging\nTrivia: Burns with a bright red flame',
  Y: 'Atomic Number: 39\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery metal\nProperties: Strong, ductile, resistant to corrosion\nReactivity: Reacts with oxygen and water\nDiscovery / History: Discovered by Johan Gadolin in 1794\nName Origin: Ytterby, Sweden\nOccurrence / Uses: LEDs, phosphors, superconductors\nTrivia: Has no stable isotopes',
  Zr: 'Atomic Number: 40\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery-gray metal\nProperties: Strong, corrosion-resistant\nReactivity: Reacts with oxygen and water\nDiscovery / History: Discovered by Martin Heinrich Klaproth in 1789\nName Origin: Greek “zirkon” (from zircon)\nOccurrence / Uses: Nuclear reactors, aerospace, medical imaging\nTrivia: Has a high melting point',
  Nb: 'Atomic Number: 41\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Gray metal\nProperties: Ductile, malleable, resistant to corrosion\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Charles Hatchett in 1801\nName Origin: Niobium, daughter of Tantalus\nOccurrence / Uses: Superconductors, alloys, jewelry\nTrivia: Has a high melting point',
  Mo: 'Atomic Number: 42\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery metal\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Carl Wilhelm Scheele in 1778\nName Origin: Greek “molybdos” (lead)\nOccurrence / Uses: Steel production, electrical contacts\nTrivia: Essential trace element for plants',
  Tc: 'Atomic Number: 43\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery-gray metal\nProperties: Radioactive, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Emilio Segrè and Carlo Perrier in 1937\nName Origin: Greek “technetos” (artificial)\nOccurrence / Uses: Medical imaging, cancer treatment\nTrivia: Has no stable isotopes',
  Ru: 'Atomic Number: 44\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery metal\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by Karl Ernst Claus in 1844\nName Origin: Latin “Ruthenia” (Russia)\nOccurrence / Uses: Catalysts, electrical contacts\nTrivia: Rarely found in nature',
  Rh: 'Atomic Number: 45\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery-white metal\nProperties: Hard, corrosion-resistant\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by William Hyde Wollaston in 1803\nName Origin: Greek “rhodon” (rose)\nOccurrence / Uses: Catalysts, jewelry\nTrivia: One of the rarest elements in the Earth’s crust',
  Pd: 'Atomic Number: 46\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Silvery-white metal\nProperties: Ductile, malleable, excellent catalyst\nReactivity: Reacts with oxygen and acids\nDiscovery / History: Discovered by William Hyde Wollaston in 1803\nName Origin: Latin “palladium” (from Pallas Athena)\nOccurrence / Uses: Catalysts, electronics, jewelry\nTrivia: Has the highest melting point of the platinum group metals',
  Ag: 'Atomic Number: 47\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Lustrous white metal\nProperties: Ductile, malleable, excellent conductor\nReactivity: Reacts with sulfur and halogens\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Latin “Argentum” (silver)\nOccurrence / Uses: Jewelry, coins, electronics\nTrivia: Has the highest electrical conductivity of all elements',
  Cd: 'Atomic Number: 48\nCategory: Transition Metals\nPeriod / Block: 5 / d\nAppearance: Bluish-white metal\nProperties: Ductile, malleable, low melting point\nReactivity: Reacts with acids\nDiscovery / History: Discovered by Friedrich Strohmeyer in 1817\nName Origin: Latin “Cadmia” (from zinc)\nOccurrence / Uses: Batteries, coatings, pigments\nTrivia: Toxic; exposure can cause health problems',
  In: 'Atomic Number: 49\nCategory: Post-transition Metals\nPeriod / Block: 5 / p\nAppearance: Silvery metal\nProperties: Soft, malleable, ductile\nReactivity: Reacts with acids\nDiscovery / History: Discovered by Frederick Stokes in 1863\nName Origin: Latin “Indium” (from indigo)\nOccurrence / Uses: Electronics, alloys, solar cells\nTrivia: Has a low melting point',
  Sn: 'Atomic Number: 50\nCategory: Post-transition Metals\nPeriod / Block: 5 / p\nAppearance: Silvery-white metal\nProperties: Malleable, ductile, resistant to corrosion\nReactivity: Reacts with acids\nDiscovery / History: Known since ancient times; isolated in the 18th century\nName Origin: Latin “Stannum” (tin)\nOccurrence / Uses: Alloys, coatings, solder\nTrivia: Has a low melting point',
  Sb: 'Atomic Number: 51\nCategory: Metalloids\nPeriod / Block: 5 / p\nAppearance: Lustrous gray solid\nProperties: Brittle, toxic\nReactivity: Reacts with oxygen and halogens\nDiscovery / History: Known since ancient times; isolated in the 17th century\nName Origin: Greek “antimonion” (not alone)\nOccurrence / Uses: Flame retardants, alloys, semiconductors\nTrivia: Has several allotropes',
  Te: 'Atomic Number: 52\nCategory: Metalloids\nPeriod / Block: 5 / p\nAppearance: Silvery-white metal\nProperties: Brittle, semiconductor\nReactivity: Reacts with oxygen and metals\nDiscovery / History: Discovered by Franz-Joseph Müller von Reichenstein in 1782\nName Origin: Latin “Tellus” (Earth)\nOccurrence / Uses: Alloys, semiconductors, photocopiers\nTrivia: Has several allotropes',
  I: 'Atomic Number: 53\nCategory: Halogens\nPeriod / Block: 5 / p\nAppearance: Dark purple solid\nProperties: Brittle, toxic\nReactivity: Very reactive; forms compounds with almost all elements\nDiscovery / History: Discovered by Bernard Courtois in 1811\nName Origin: Greek “iodes” (violet)\nOccurrence / Uses: Disinfectants, dyes, photography\nTrivia: Has several allotropes',
  Xe: 'Atomic Number: 54\nCategory: Noble Gases\nPeriod / Block: 5 / p\nAppearance: Colorless gas\nProperties: Inert, low density\nReactivity: Extremely unreactive\nDiscovery / History: Discovered in the Sun’s spectrum in 1898\nName Origin: Greek “kryptos” (hidden)\nOccurrence / Uses: Neon lights, high-voltage indicators\nTrivia: Emits a distinct reddish-orange glow when electrified',
  Cs: 'Atomic Number: 55\nCategory: Alkali Metals\nPeriod / Block: 6 / s\nAppearance: Silvery-golden metal\nProperties: Soft, malleable, highly reactive\nReactivity: Reacts vigorously with water\nDiscovery / History: Discovered by Robert Bunsen and Gustav Kirchhoff in 1860\nName Origin: Latin “Caesius” (sky blue)\nOccurrence / Uses: Atomic clocks, photoelectric cells\nTrivia: Has the lowest density of all metals',
  Ba: 'Atomic Number: 56\nCategory: Alkaline Earth Metals\nPeriod / Block: 6 / s\nAppearance: Silvery-white metal\nProperties: Soft, malleable, reactive\nReactivity: Reacts with water and acids\nDiscovery / History: Isolated by Sir Humphry Davy in 1808\nName Origin: Latin “Barium” (heavy)\nOccurrence / Uses: Fireworks, magnets, medical imaging\nTrivia: Burns with a bright green flame',
  La: 'Atomic Number: 57\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery-white metal\nProperties: Soft, malleable, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Martin Heinrich Klaproth in 1803\nName Origin: Greek “lanthanum” (to lie hidden)\nOccurrence / Uses: Glass, ceramics, catalysts\nTrivia: Has no stable isotopes',
  Ce: 'Atomic Number: 58\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery-white metal\nProperties: Hard, brittle, high melting point\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Martin Heinrich Klaproth in 1803\nName Origin: Latin “Cerium” (from Ceres)\nOccurrence / Uses: Glass, ceramics, catalysts\nTrivia: Has no stable isotopes',
  Pr: 'Atomic Number: 59\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery-green metal\nProperties: Soft, malleable, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Paul Émile Lecoq de Boisbaudran in 1885\nName Origin: Greek “prasinos” (green)\nOccurrence / Uses: Magnets, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Nd: 'Atomic Number: 60\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Hard, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Carl Auer von Welsbach in 1885\nName Origin: Latin “Neodymium” (new twin)\nOccurrence / Uses: Magnets, lasers, glass\nTrivia: Has no stable isotopes',
  Pm: 'Atomic Number: 61\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Radioactive\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg in 1945\nName Origin: Prometheus (mythical figure)\nOccurrence / Uses: Research, potential use in batteries\nTrivia: Has no stable isotopes',
  Sm: 'Atomic Number: 62\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Hard, brittle\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Paul Émile Lecoq de Boisbaudran in 1857\nName Origin: Greek “samarios” (from Samarskite)\nOccurrence / Uses: Magnets, phosphors, nuclear reactors\nTrivia: Has no stable isotopes',
  Eu: 'Atomic Number: 63\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Soft, malleable\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Eugène-Antole Demarçay in 1896\nName Origin: Europe (continent)\nOccurrence / Uses: Phosphors, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Gd: 'Atomic Number: 64\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery-white metal\nProperties: Hard, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Jean Charles Galissard de Marignac in 1880\nName Origin: Gadolin (Finnish chemist)\nOccurrence / Uses: MRI contrast agents, magnets, nuclear reactors\nTrivia: Has no stable isotopes',
  Tb: 'Atomic Number: 65\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Soft, malleable\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Marc Delafontaine in 1843\nName Origin: Ytterby (village in Sweden)\nOccurrence / Uses: Phosphors, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Dy: 'Atomic Number: 66\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery-white metal\nProperties: Hard, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Paul Émile Lecoq de Boisbaudran in 1886\nName Origin: Greek “dysprositos” (hard to get at)\nOccurrence / Uses: Magnets, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Ho: 'Atomic Number: 67\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Hard, brittle\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Jacques-Louis Soret in 1878\nName Origin: Holmia (Latin name for Stockholm)\nOccurrence / Uses: Lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Er: 'Atomic Number: 68\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Soft, malleable\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Karl Auer von Welsbach in 1843\nName Origin: Ytterby (village in Sweden)\nOccurrence / Uses: Phosphors, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Tm: 'Atomic Number: 69\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Hard, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Claude-Auguste Lamy in 1879\nName Origin: Thule (mythical northern land)\nOccurrence / Uses: Lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Yb: 'Atomic Number: 70\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Soft, malleable\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Jean Charles Galissard de Marignac in 1878\nName Origin: Ytterby (village in Sweden)\nOccurrence / Uses: Phosphors, lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Lu: 'Atomic Number: 71\nCategory: Lanthanides\nPeriod / Block: 6 / f\nAppearance: Silvery metal\nProperties: Hard, ductile\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Georges Urbain in 1907\nName Origin: Lutetia (ancient name for Paris)\nOccurrence / Uses: Lasers, nuclear reactors\nTrivia: Has no stable isotopes',
  Hf: 'Atomic Number: 72\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Silvery metal\nProperties: Hard, brittle\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Dirk Coster and George de Hevesy in 1923\nName Origin: Hafnia (Latin name for Copenhagen)\nOccurrence / Uses: Nuclear reactors, high-temperature ceramics\nTrivia: Has a high melting point',
  Ta: 'Atomic Number: 73\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Blue-gray metal\nProperties: Hard, corrosion-resistant\nReactivity: Resistant to acids\nDiscovery / History: Discovered by Anders Ekeberg in 1864\nName Origin: Tantalus (mythical figure)\nOccurrence / Uses: Electronics, surgical implants\nTrivia: Has a high melting point',
  W: 'Atomic Number: 74\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Steel-gray metal\nProperties: Hard, dense\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Carl Wilhelm Scheele in 1783\nName Origin: Wolfram (German name for tungsten)\nOccurrence / Uses: Filaments, cutting tools\nTrivia: Has the highest melting point of all elements',
  Re: 'Atomic Number: 75\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Silver-gray metal\nProperties: Dense, hard\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Masataka Ogawa in 1925\nName Origin: Rhenus (Latin name for the Rhine River)\nOccurrence / Uses: Superalloys, electrical contacts\nTrivia: Has a high melting point',
  Os: 'Atomic Number: 76\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Blue-gray metal\nProperties: Hard, brittle\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Smithson Tennant in 1803\nName Origin: Osmium (Greek “osme” - smell)\nOccurrence / Uses: Fountain pen nibs, electrical contacts\nTrivia: Has a high density',
  Ir: 'Atomic Number: 77\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Silvery metal\nProperties: Hard, brittle\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Smithson Tennant in 1803\nName Origin: Iridium (Latin name for the rainbow)\nOccurrence / Uses: Fountain pen nibs, electrical contacts\nTrivia: Has a high density',
  Pt: 'Atomic Number: 78\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Silvery-white metal\nProperties: Dense, malleable\nReactivity: Resistant to corrosion\nDiscovery / History: Discovered by Antonio de Ulloa in 1735\nName Origin: Platinum (Spanish “platina” - little silver)\nOccurrence / Uses: Jewelry, catalytic converters\nTrivia: Has a high melting point',
  Au: 'Atomic Number: 79\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Yellow metal\nProperties: Dense, malleable\nReactivity: Resistant to corrosion\nDiscovery / History: Known since ancient times\nName Origin: Aurum (Latin for gold)\nOccurrence / Uses: Jewelry, electronics\nTrivia: Does not tarnish',
  Hg: 'Atomic Number: 80\nCategory: Transition Metals\nPeriod / Block: 6 / d\nAppearance: Silvery liquid\nProperties: Dense, toxic\nReactivity: Resistant to corrosion\nDiscovery / History: Known since ancient times\nName Origin: Hydrargyrum (Greek for watery silver)\nOccurrence / Uses: Thermometers, barometers\nTrivia: Only metal that is liquid at room temperature',
  Tl: 'Atomic Number: 81\nCategory: Post-transition Metals\nPeriod / Block: 6 / p\nAppearance: Silvery-white metal\nProperties: Soft, malleable\nReactivity: Reacts with air and moisture\nDiscovery / History: Discovered by Claude-Auguste Lamy in 1861\nName Origin: Thallus (Greek for green shoot)\nOccurrence / Uses: Electronics, pharmaceuticals\nTrivia: Has no stable isotopes',
  Pb: 'Atomic Number: 82\nCategory: Post-transition Metals\nPeriod / Block: 6 / p\nAppearance: Bluish-white metal\nProperties: Soft, malleable\nReactivity: Reacts with acids\nDiscovery / History: Known since ancient times\nName Origin: Plumbum (Latin for lead)\nOccurrence / Uses: Batteries, radiation shielding\nTrivia: Has no stable isotopes',
  Bi: 'Atomic Number: 83\nCategory: Post-transition Metals\nPeriod / Block: 6 / p\nAppearance: Silvery-white metal\nProperties: Brittle, low melting point\nReactivity: Reacts with air and moisture\nDiscovery / History: Discovered by Claude-Auguste Lamy in 1753\nName Origin: Bismuth (German for white mass)\nOccurrence / Uses: Cosmetics, pharmaceuticals\nTrivia: Has no stable isotopes',
  Po: 'Atomic Number: 84\nCategory: Metalloids\nPeriod / Block: 6 / p\nAppearance: Metallic\nProperties: Radioactive, brittle\nReactivity: Reacts with air and moisture\nDiscovery / History: Discovered by Marie Curie in 1940\nName Origin: Polonia (Latin name for Poland)\nOccurrence / Uses: Research, nuclear applications\nTrivia: Has no stable isotopes',
  At: 'Atomic Number: 85\nCategory: Halogens\nPeriod / Block: 6 / p\nAppearance: Metallic\nProperties: Radioactive, brittle\nReactivity: Reacts with alkali metals\nDiscovery / History: Discovered by Emilio Segrè and Glenn T. Seaborg in 1940\nName Origin: Astatine (Greek for unstable)\nOccurrence / Uses: Research, nuclear applications\nTrivia: Has no stable isotopes',
  Rn: 'Atomic Number: 86\nCategory: Noble Gases\nPeriod / Block: 6 / p\nAppearance: Colorless gas\nProperties: Inert, non-toxic\nReactivity: Does not react with other elements\nDiscovery / History: Discovered by Frederick Soddy in 1900\nName Origin: Radon (Latin for radiation)\nOccurrence / Uses: Research, radiation detection\nTrivia: Has no stable isotopes',
  Fr: 'Atomic Number: 87\nCategory: Alkali Metals\nPeriod / Block: 7 / s\nAppearance: Silvery-white metal\nProperties: Highly radioactive, soft\nReactivity: Reacts violently with water\nDiscovery / History: Discovered by Marguerite Perey in 1939\nName Origin: France (country of discovery)\nOccurrence / Uses: Research only\nTrivia: Rarest naturally occurring alkali metal',
  Ra: 'Atomic Number: 88\nCategory: Alkaline Earth Metals\nPeriod / Block: 7 / s\nAppearance: Silvery-white metal\nProperties: Highly radioactive, soft\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Marie and Pierre Curie in 1898\nName Origin: Radius (Latin for ray)\nOccurrence / Uses: Research only\nTrivia: First element discovered to be radioactive',
  Ac: 'Atomic Number: 89\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, soft\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by André-Louis Debierne in 1899\nName Origin: Actinium (Greek for ray)\nOccurrence / Uses: Research only\nTrivia: First element in the actinide series',
  Th: 'Atomic Number: 90\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, high melting point\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Jöns Jacob Berzelius in 1829\nName Origin: Thor (Norse god)\nOccurrence / Uses: Nuclear reactors, research\nTrivia: Has a high melting point',
  Pa: 'Atomic Number: 91\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Otto Hahn and Lise Meitner in 1917\nName Origin: Protactinium (Greek for first actinium)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  U: 'Atomic Number: 92\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Martin Heinrich Klaproth in 1789\nName Origin: Uranus (planet)\nOccurrence / Uses: Nuclear fuel, research\nTrivia: Has a high melting point',
  Np: 'Atomic Number: 93\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Edwin McMillan and Philip H. Abelson in 1940\nName Origin: Neptunium (planet)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Pu: 'Atomic Number: 94\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Edwin McMillan, and Joseph W. Kennedy in 1940\nName Origin: Plutonium (planet)\nOccurrence / Uses: Nuclear fuel, research\nTrivia: Has a high melting point',
  Am: 'Atomic Number: 95\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1944\nName Origin: Americium (America)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Cm: 'Atomic Number: 96\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1944\nName Origin: Curium (Marie and Pierre Curie)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Bk: 'Atomic Number: 97\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1949\nName Origin: Berkelium (Berkel en Rodenrijs, Netherlands)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Cf: 'Atomic Number: 98\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1950\nName Origin: Californium (California)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Es: 'Atomic Number: 99\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1952\nName Origin: Einsteinium (Albert Einstein)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Fm: 'Atomic Number: 100\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1952\nName Origin: Fermium (Enrico Fermi)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Md: 'Atomic Number: 101\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1955\nName Origin: Mendelevium (Dmitri Mendeleev)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  No: 'Atomic Number: 102\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Glenn T. Seaborg, Albert Ghiorso, and Emilio Segrè in 1957\nName Origin: Nobelium (Alfred Nobel)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Lr: 'Atomic Number: 103\nCategory: Actinides\nPeriod / Block: 7 / f\nAppearance: Silvery metal\nProperties: Radioactive, dense\nReactivity: Reacts with water and acids\nDiscovery / History: Discovered by Albert Ghiorso, Glenn T. Seaborg, and others in 1961\nName Origin: Lawrencium (Ernest O. Lawrence)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Rf: 'Atomic Number: 104\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian and American scientists in 1964\nName Origin: Rutherfordium (Ernest Rutherford)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Db: 'Atomic Number: 105\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian scientists in 1970\nName Origin: Dubnium (Dubna, Russia)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Sg: 'Atomic Number: 106\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1974\nName Origin: Seaborgium (Glenn T. Seaborg)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Bh: 'Atomic Number: 107\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1981\nName Origin: Bohrium (Niels Bohr)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Hs: 'Atomic Number: 108\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1984\nName Origin: Hassium (Hesse, Germany)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Mt: 'Atomic Number: 109\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1982\nName Origin: Meitnerium (Lise Meitner)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Ds: 'Atomic Number: 110\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1994\nName Origin: Darmstadtium (Darmstadt, Germany)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Rg: 'Atomic Number: 111\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 1994\nName Origin: Roentgenium (Wilhelm Röntgen)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Cn: 'Atomic Number: 112\nCategory: Transition Metals\nPeriod / Block: 7 / d\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian and American scientists in 1996\nName Origin: Copernicium (Nicolaus Copernicus)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Nh: 'Atomic Number: 113\nCategory: Post-transition Metals\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian and American scientists in 2003\nName Origin: Nihonium (Japan)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Fl: 'Atomic Number: 114\nCategory: Post-transition Metals\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian and American scientists in 2012\nName Origin: Flerovium (Georgy Flerov)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Mc: 'Atomic Number: 115\nCategory: Post-transition Metals\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian and American scientists in 2015\nName Origin: Moscovium (Moscow)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Lv: 'Atomic Number: 116\nCategory: Post-transition Metals\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 2011\nName Origin: Livermorium (Lawrence Livermore National Laboratory)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Ts: 'Atomic Number: 117\nCategory: Halogens\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of Russian scientists in 2010\nName Origin: Tennessine (Tennessee)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes',
  Og: 'Atomic Number: 118\nCategory: Noble Gases\nPeriod / Block: 7 / p\nAppearance: Unknown\nProperties: Radioactive\nReactivity: Unknown\nDiscovery / History: Discovered by a team of American scientists in 2002\nName Origin: Oganesson (Yuri Oganessian)\nOccurrence / Uses: Research only\nTrivia: Has no stable isotopes'
};
function searchElement() {
  const searchedElement = document.getElementById('ptSearch').value.trim().toLowerCase();
  const ptOut = document.getElementById('ptOut');

  // map of possible user inputs → element button IDs
  const elements = {
    "1": "atomH", "h": "atomH", "hydrogen": "atomH",
    "2": "atomHe", "he": "atomHe", "helium": "atomHe",
    "3": "atomLi", "li": "atomLi", "lithium": "atomLi",
    "4": "atomBe", "be": "atomBe", "beryllium": "atomBe",
    "5": "atomB", "b": "atomB", "boron": "atomB",
    "6": "atomC", "c": "atomC", "carbon": "atomC",
    "7": "atomN", "n": "atomN", "nitrogen": "atomN",
    "8": "atomO", "o": "atomO", "oxygen": "atomO",
    "9": "atomF", "f": "atomF", "fluorine": "atomF",
    "10": "atomNe", "ne": "atomNe", "neon": "atomNe",
    "11": "atomNa", "na": "atomNa", "sodium": "atomNa",
    "12": "atomMg", "mg": "atomMg", "magnesium": "atomMg",
    "13": "atomAl", "al": "atomAl", "aluminum": "atomAl",
    "14": "atomSi", "si": "atomSi", "silicon": "atomSi",
    "15": "atomP", "p": "atomP", "phosphorus": "atomP",
    "16": "atomS", "s": "atomS", "sulfur": "atomS",
    "17": "atomCl", "cl": "atomCl", "chlorine": "atomCl",
    "18": "atomAr", "ar": "atomAr", "argon": "atomAr",
    "19": "atomK", "k": "atomK", "potassium": "atomK",
    "20": "atomCa", "ca": "atomCa", "calcium": "atomCa",
    "21": "atomSc", "sc": "atomSc", "scandium": "atomSc",
    "22": "atomTi", "ti": "atomTi", "titanium": "atomTi",
    "23": "atomV", "v": "atomV", "vanadium": "atomV",
    "24": "atomCr", "cr": "atomCr", "chromium": "atomCr",
    "25": "atomMn", "mn": "atomMn", "manganese": "atomMn",
    "26": "atomFe", "fe": "atomFe", "iron": "atomFe",
    "27": "atomCo", "co": "atomCo", "cobalt": "atomCo",
    "28": "atomNi", "ni": "atomNi", "nickel": "atomNi",
    "29": "atomCu", "cu": "atomCu", "copper": "atomCu",
    "30": "atomZn", "zn": "atomZn", "zinc": "atomZn",
    "31": "atomGa", "ga": "atomGa", "gallium": "atomGa",
    "32": "atomGe", "ge": "atomGe", "germanium": "atomGe",
    "33": "atomAs", "as": "atomAs", "arsenic": "atomAs",
    "34": "atomSe", "se": "atomSe", "selenium": "atomSe",
    "35": "atomBr", "br": "atomBr", "bromine": "atomBr",
    "36": "atomKr", "kr": "atomKr", "krypton": "atomKr",
    "37": "atomRb", "rb": "atomRb", "rubidium": "atomRb",
    "38": "atomSr", "sr": "atomSr", "strontium": "atomSr",
    "39": "atomY", "y": "atomY", "yttrium": "atomY",
    "40": "atomZr", "zr": "atomZr", "zirconium": "atomZr",
    "41": "atomNb", "nb": "atomNb", "niobium": "atomNb",
    "42": "atomMo", "mo": "atomMo", "molybdenum": "atomMo",
    "43": "atomTc", "tc": "atomTc", "technetium": "atomTc",
    "44": "atomRu", "ru": "atomRu", "ruthenium": "atomRu",
    "45": "atomRh", "rh": "atomRh", "rhodium": "atomRh",
    "46": "atomPd", "pd": "atomPd", "palladium": "atomPd",
    "47": "atomAg", "ag": "atomAg", "silver": "atomAg",
    "48": "atomCd", "cd": "atomCd", "cadmium": "atomCd",
    "49": "atomIn", "in": "atomIn", "indium": "atomIn",
    "50": "atomSn", "sn": "atomSn", "tin": "atomSn",
    "51": "atomSb", "sb": "atomSb", "antimony": "atomSb",
    "52": "atomTe", "te": "atomTe", "tellurium": "atomTe",
    "53": "atomI", "i": "atomI", "iodine": "atomI",
    "54": "atomXe", "xe": "atomXe", "xenon": "atomXe",
    "55": "atomCs", "cs": "atomCs", "cesium": "atomCs",
    "56": "atomBa", "ba": "atomBa", "barium": "atomBa",
    "57": "atomLa", "la": "atomLa", "lanthanum": "atomLa",
    "58": "atomCe", "ce": "atomCe", "cerium": "atomCe",
    "59": "atomPr", "pr": "atomPr", "praseodymium": "atomPr",
    "60": "atomNd", "nd": "atomNd", "neodymium": "atomNd",
    "61": "atomPm", "pm": "atomPm", "promethium": "atomPm",
    "62": "atomSm", "sm": "atomSm", "samarium": "atomSm",
    "63": "atomEu", "eu": "atomEu", "europium": "atomEu",
    "64": "atomGd", "gd": "atomGd", "gadolinium": "atomGd",
    "65": "atomTb", "tb": "atomTb", "terbium": "atomTb",
    "66": "atomDy", "dy": "atomDy", "dysprosium": "atomDy",
    "67": "atomHo", "ho": "atomHo", "holmium": "atomHo",
    "68": "atomEr", "er": "atomEr", "erbium": "atomEr",
    "69": "atomTm", "tm": "atomTm", "thulium": "atomTm",
    "70": "atomYb", "yb": "atomYb", "ytterbium": "atomYb",
    "71": "atomLu", "lu": "atomLu", "lutetium": "atomLu",
    "72": "atomHf", "hf": "atomHf", "hafnium": "atomHf",
    "73": "atomTa", "ta": "atomTa", "tantalum": "atomTa",
    "74": "atomW", "w": "atomW", "tungsten": "atomW",
    "75": "atomRe", "re": "atomRe", "rhenium": "atomRe",
    "76": "atomOs", "os": "atomOs", "osmium": "atomOs",
    "77": "atomIr", "ir": "atomIr", "iridium": "atomIr",
    "78": "atomPt", "pt": "atomPt", "platinum": "atomPt",
    "79": "atomAu", "au": "atomAu", "gold": "atomAu",
    "80": "atomHg", "hg": "atomHg", "mercury": "atomHg",
    "81": "atomTl", "tl": "atomTl", "thallium": "atomTl",
    "82": "atomPb", "pb": "atomPb", "lead": "atomPb",
    "83": "atomBi", "bi": "atomBi", "bismuth": "atomBi",
    "84": "atomPo", "po": "atomPo", "polonium": "atomPo",
    "85": "atomAt", "at": "atomAt", "astatine": "atomAt",
    "86": "atomRn", "rn": "atomRn", "radon": "atomRn",
    "87": "atomFr", "fr": "atomFr", "francium": "atomFr",
    "88": "atomRa", "ra": "atomRa", "radium": "atomRa",
    "89": "atomAc", "ac": "atomAc", "actinium": "atomAc",
    "90": "atomTh", "th": "atomTh", "thorium": "atomTh",
    "91": "atomPa", "pa": "atomPa", "protactinium": "atomPa",
    "92": "atomU", "u": "atomU", "uranium": "atomU",
    "93": "atomNp", "np": "atomNp", "neptunium": "atomNp",
    "94": "atomPu", "pu": "atomPu", "plutonium": "atomPu",
    "95": "atomAm", "am": "atomAm", "americium": "atomAm",
    "96": "atomCm", "cm": "atomCm", "curium": "atomCm",
    "97": "atomBk", "bk": "atomBk", "berkelium": "atomBk",
    "98": "atomCf", "cf": "atomCf", "californium": "atomCf",
    "99": "atomEs", "es": "atomEs", "einsteinium": "atomEs",
    "100": "atomFm", "fm": "atomFm", "fermium": "atomFm",
    "101": "atomMd", "md": "atomMd", "mendelevium": "atomMd",
    "102": "atomNo", "no": "atomNo", "nobelium": "atomNo",
    "103": "atomLr", "lr": "atomLr", "lawrencium": "atomLr",
    "104": "atomRf", "rf": "atomRf", "rutherfordium": "atomRf",
    "105": "atomDb", "db": "atomDb", "dubnium": "atomDb",
    "106": "atomSg", "sg": "atomSg", "seaborgium": "atomSg",
    "107": "atomBh", "bh": "atomBh", "bohrium": "atomBh",
    "108": "atomHs", "hs": "atomHs", "hassium": "atomHs",
    "109": "atomMt", "mt": "atomMt", "meitnerium": "atomMt",
    "110": "atomDs", "ds": "atomDs", "darmstadtium": "atomDs",
    "111": "atomRg", "rg": "atomRg", "roentgenium": "atomRg",
    "112": "atomCn", "cn": "atomCn", "copernicium": "atomCn",
    "113": "atomNh", "nh": "atomNh", "nihonium": "atomNh",
    "114": "atomFl", "fl": "atomFl", "flerovium": "atomFl",
    "115": "atomMc", "mc": "atomMc", "moscovium": "atomMc",
    "116": "atomLv", "lv": "atomLv", "livermorium": "atomLv",
    "117": "atomTs", "ts": "atomTs", "tennessine": "atomTs",
    "118": "atomOg", "og": "atomOg", "oganesson": "atomOg"
  };

  const elementId = elements[searchedElement];

  if (elementId) {
    document.getElementById(elementId).click();
    document.getElementById(elementId).classList.add("hover-element");
    setTimeout(() => document.getElementById(elementId).classList.remove("hover-element"), 4000);
  } else {
    ptOut.textContent = 'Invalid input. Please enter a valid element name, symbol, or atomic number.';
  }
}

document.getElementById('ptSearch').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchElement();
  }
});
function ptInfoClear() {
  document.getElementById("ptOut").textContent = "";
  document.getElementById("ptInfoBtn").classList.add('ptInfoBtnHidden');
  document.getElementById("ptInfoBtn").classList.remove('ptInfoBtnVisible');
}


// ========== GAMES ==========

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

// ---------- Number Guessing ----------
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
canvas.width = 25 * box;
canvas.height = 25 * box;
let snake, direction, food, score, foodsEaten;
let specialFood = null;
let highScore = localStorage.getItem("snakeHighScore") || 0;
document.getElementById("snakeHighScore").textContent = "High score = " + highScore;
let specialFoodTimer = null;
let specialFoodTime = 5000;
let paused = false;
let lastFrameTime = 0;
let moveDelay = 200;
let accumulatedTime = 0;
let running = false;
function startSnakeGame() {
  moveDelay = 200;
  snake = [{ x: 3 * box, y: 3 * box }];
  direction = "RIGHT";
  food = randomFood();
  score = 0;
  foodsEaten = 0;
  specialFood = null;
  paused = false;
  running = true;
  lastFrameTime = 0;
  accumulatedTime = 0;
  pauseBtn.textContent = "Pause";
  canvas.focus();
  requestAnimationFrame(gameLoop);
}
function randomFood() {
  return {
    x: Math.floor(Math.random() * 25) * box,
    y: Math.floor(Math.random() * 25) * box
  };
}
function spawnSpecialFood() {
  specialFood = {
    x: Math.floor(Math.random() * 25) * box,
    y: Math.floor(Math.random() * 25) * box
  };
  clearTimeout(specialFoodTimer);
  specialFoodTimer = setTimeout(() => (specialFood = null), specialFoodTime);
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
leftBtn.addEventListener("click", () => { if (direction !== "RIGHT") direction = "LEFT"; });
upBtn.addEventListener("click", () => { if (direction !== "DOWN") direction = "UP"; });
rightBtn.addEventListener("click", () => { if (direction !== "LEFT") direction = "RIGHT"; });
downBtn.addEventListener("click", () => { if (direction !== "UP") direction = "DOWN"; });
document.addEventListener(
  "keydown",
  event => {
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
pauseBtn.addEventListener("click", () => {
  if (!running) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  if (!paused) requestAnimationFrame(gameLoop);
});
function drawGame() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 25 * box, 25 * box);
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ac2727ff";
  ctx.fill();
  if (specialFood) {
    ctx.beginPath();
    ctx.arc(specialFood.x + box, specialFood.y + box, box, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
  }
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "rgba(13, 55, 128, 1)" : "rgba(53, 127, 208, 1)";
    ctx.fillRect(segment.x, segment.y, box, box);
  });
}
function updateGame() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;
  if (snakeX === food.x && snakeY === food.y) {
    score += 5;
    foodsEaten++;
    moveDelay -= 2.5;
    food = randomFood();
    if (foodsEaten % 10 === 0) spawnSpecialFood();
  } else {
    snake.pop();
  }
  if (specialFood && hitSpecialFood(snakeX, snakeY)) {
    score += 50;
    specialFood = null;
    clearTimeout(specialFoodTimer);
  }
  const newHead = { x: snakeX, y: snakeY };
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX > canvas.width || snakeY > canvas.height ||
    collision(newHead, snake)
  ) {
    gameOver();
    return;
  }
  snake.unshift(newHead);
  snakeScore.textContent = "Score: " + score;
}
function gameOver() {
  running = false;
  clearTimeout(specialFoodTimer);
  drawGame();
  snake = [];
  food = [];
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("snakeHighScore", highScore);
    document.getElementById("snakeHighScore").textContent = "High score = " + highScore;
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Over! Score: " + score + "\nNew High Score: " + highScore + "!", canvas.width / 2, canvas.height / 2);
  }
  else {
  ctx.font = "32px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Game Over! Score: " + score, canvas.width / 2, canvas.height / 2);
  }
}
function gameLoop(timestamp) {
  if (!running) return;
  if (paused) {
    lastFrameTime = timestamp;
    requestAnimationFrame(gameLoop);
    return;
  }
  if (!lastFrameTime) lastFrameTime = timestamp;
  const deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;
  accumulatedTime += deltaTime;
  if (accumulatedTime >= moveDelay) {
    updateGame();
    accumulatedTime = 0;
    if (!running) {
      gameOver();
      return;
    }
  }
  drawGame();
  requestAnimationFrame(gameLoop);
}
startBtn.addEventListener("click", startSnakeGame);


// ========== UTILITIES =============

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

// // ------- Weekday Calculator -------
// function calculateWeekday() {
//   const dateInput = document.getElementById('weekdayDate').value;
//   if (!dateInput) {
//     document.getElementById('weekdayOut').textContent = 'Please select a date.';
//     return;
//   }
//   const date = new Date(dateInput);
//   const options = { weekday: 'long' };
//   const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
//   document.getElementById('weekdayOut').textContent = `The day is: ${weekday}`;
// }
// function clearWeekday() {
//   document.getElementById('weekdayDate').value = '';
//   document.getElementById('weekdayOut').textContent = '';
// }

// ======== INFO ==========

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
