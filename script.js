document.body.style.overflow = 'hidden';
// ---------- Utilities ----------
const isNum = v => v !== null && v !== '' && !Number.isNaN(Number(v));
const toNum = v => isNum(v) ? Number(v) : null;
// const fmt = n => (n === null || n === undefined || !Number.isFinite(n)) ? '—' : (Math.abs(n) < 1e-8 ? n.toExponential(4) : Number(n.toPrecision(12)).toString());
const known = x => x !== null;
const deg2rad = d => d * Math.PI / 180;
const rad2deg = r => r * 180 / Math.PI;
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
  const input = document.getElementById('genCalcVal').value;
  const mode = document.getElementById('genCalcAngleMode').value;
  const round = document.getElementById('genCalcRound').value || 10000;
  let expr = input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**')
    .replace(/π/g, 'Math.PI');

  if (mode === 'deg') {
    expr = expr.replace(/sin⁻¹\(([^)]+)\)/g, '(Math.asin($1) * 180 / Math.PI)');
    expr = expr.replace(/cos⁻¹\(([^)]+)\)/g, '(Math.acos($1) * 180 / Math.PI)');
    expr = expr.replace(/tan⁻¹\(([^)]+)\)/g, '(Math.atan($1) * 180 / Math.PI)');
    expr = expr.replace(/csc⁻¹\(([^)]+)\)/g, '(Math.asin(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/sec⁻¹\(([^)]+)\)/g, '(Math.acos(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/cot⁻¹\(([^)]+)\)/g, '(Math.atan(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
    expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
    expr = expr.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
    expr = expr.replace(/csc\(([^)]+)\)/g, '1 / Math.sin(($1) * Math.PI / 180)');
    expr = expr.replace(/sec\(([^)]+)\)/g, '1 / Math.cos(($1) * Math.PI / 180)');
    expr = expr.replace(/cot\(([^)]+)\)/g, '1 / Math.tan(($1) * Math.PI / 180)');
    expr = expr.replace(/asin\(([^)]+)\)/g, '(Math.asin($1) * 180 / Math.PI)');
    expr = expr.replace(/acos\(([^)]+)\)/g, '(Math.acos($1) * 180 / Math.PI)');
    expr = expr.replace(/atan\(([^)]+)\)/g, '(Math.atan($1) * 180 / Math.PI)');
    expr = expr.replace(/acsc\(([^)]+)\)/g, '(Math.asin(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/asec\(([^)]+)\)/g, '(Math.acos(1 / $1) * 180 / Math.PI)');
    expr = expr.replace(/acot\(([^)]+)\)/g, '(Math.atan(1 / $1) * 180 / Math.PI)');
  } else {
    expr = expr.replace(/sin⁻¹\(([^)]+)\)/g, 'Math.asin($1)');
    expr = expr.replace(/cos⁻¹\(([^)]+)\)/g, 'Math.acos($1)');
    expr = expr.replace(/tan⁻¹\(([^)]+)\)/g, 'Math.atan($1)');
    expr = expr.replace(/csc⁻¹\(([^)]+)\)/g, 'Math.asin(1 / $1)');
    expr = expr.replace(/sec⁻¹\(([^)]+)\)/g, 'Math.acos(1 / $1)');
    expr = expr.replace(/cot⁻¹\(([^)]+)\)/g, 'Math.atan(1 / $1)');
    expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    expr = expr.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    expr = expr.replace(/csc\(([^)]+)\)/g, '1 / Math.sin($1)');
    expr = expr.replace(/sec\(([^)]+)\)/g, '1 / Math.cos($1)');
    expr = expr.replace(/cot\(([^)]+)\)/g, '1 / Math.tan($1)');
    expr = expr.replace(/asin\(([^)]+)\)/g, 'Math.asin($1)');
    expr = expr.replace(/acos\(([^)]+)\)/g, 'Math.acos($1)');
    expr = expr.replace(/atan\(([^)]+)\)/g, 'Math.atan($1)');
    expr = expr.replace(/acsc\(([^)]+)\)/g, 'Math.asin(1 / $1)');
    expr = expr.replace(/asec\(([^)]+)\)/g, 'Math.acos(1 / $1)');
    expr = expr.replace(/acot\(([^)]+)\)/g, 'Math.atan(1 / $1)');
  }
  try {
    const result = eval(expr);
    if (round === 0) {
      document.getElementById('genCalcOut').textContent = result;
    }
    else {
      document.getElementById('genCalcOut').textContent = Math.round(result * round) / round;
    }
  }
  catch (e) {
    document.getElementById('genCalcOut').textContent = "Invalid Expression";
  }
}
function genCalcClear() {
  document.getElementById('genCalcVal').value = '';
  document.getElementById('genCalcRound').value = 'select'
  document.getElementById('genCalcAngleMode').value = 'select'
  document.getElementById('genCalcOut').textContent = '';
}


// ---------- TRIG EVALUATOR ----------

function fmt(v) { return Number(v.toFixed(6)); }

function parseRadianInput(raw) {
  try { return eval(raw.replace(/π/g, 'Math.PI')); }
  catch { return NaN; }
}
function parseRadianInput(raw) {
  let str = raw.replace(/π/g, 'Math.PI');

  try {
    return eval(str);
  } catch (e) {
    return NaN;
  }
}
function parsePolarInput(raw) {
  const match = raw.match(/^\s*([\d.]+)\s*∠\s*([\d.π\/+-]+)\s*$/i);
  if (!match) return null;
  let r = parseFloat(match[1]);
  let theta;
  try { theta = eval(match[2].replace(/π/g, 'Math.PI')); }
  catch { return null; }
  return { r, theta };
}
function updatePlaceholder() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const input = document.getElementById('triVal');
  if (['asin', 'acos', 'atan', 'acsc', 'asec', 'acot'].includes(op))
    input.placeholder = 'Enter value';
  else if (['sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth'].includes(op))
    input.placeholder = 'Enter a real number';
  else if (mode === 'deg') input.placeholder = 'Enter in degree(s)';
  else input.placeholder = 'Enter in radian(s)';
}
function trigClear() {
  document.getElementById('triOut').textContent = '';
  document.getElementById('triVal').value = '';
  document.getElementById('triPolar').value = '';
  document.getElementById('triOp').value = 'sin';
  document.getElementById('triMode').value = 'deg';
  updatePlaceholder();
}
function getNiceAngle(op, angle) {
  const pi = Math.PI, tol = 1e-6;
  const near = (a, b) => Math.abs(a - b) < tol;

  switch (op) {
    case 'sin':
      if (near(angle, 0) || near(angle, 2 * pi)) return '0';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '1/2';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2/2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '√3/2';
      if (near(angle, pi / 2)) return '1';
      if (near(angle, pi)) return '0';
      break;
    case 'cos':
      if (near(angle, 0) || near(angle, 2 * pi)) return '1';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '√3/2';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2/2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '1/2';
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return '0';
      if (near(angle, pi)) return '-1';
      break;
    case 'tan':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return '0';
      if (near(angle, pi / 6) || near(angle, 7 * pi / 6)) return '1/√3';
      if (near(angle, pi / 4) || near(angle, 5 * pi / 4)) return '1';
      if (near(angle, pi / 3) || near(angle, 4 * pi / 3)) return '√3';
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return 'undefined';
      break;
    case 'csc':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return 'undefined';
      if (near(angle, pi / 6) || near(angle, 5 * pi / 6)) return '2';
      if (near(angle, pi / 4) || near(angle, 3 * pi / 4)) return '√2';
      if (near(angle, pi / 3) || near(angle, 2 * pi / 3)) return '2√3/3';
      if (near(angle, pi / 2)) return '1';
      break;
    case 'sec':
      if (near(angle, pi / 2) || near(angle, 3 * pi / 2)) return 'undefined';
      if (near(angle, 0) || near(angle, 2 * pi)) return '1';
      if (near(angle, pi / 6) || near(angle, 11 * pi / 6)) return '2√3/3';
      if (near(angle, pi / 4) || near(angle, 7 * pi / 4)) return '√2';
      if (near(angle, pi / 3) || near(angle, 5 * pi / 3)) return '2';
      if (near(angle, pi)) return '-1';
      break;
    case 'cot':
      if (near(angle, 0) || near(angle, pi) || near(angle, 2 * pi)) return 'undefined';
      if (near(angle, pi / 6) || near(angle, 7 * pi / 6)) return '√3';
      if (near(angle, pi / 4) || near(angle, 5 * pi / 4)) return '1';
      if (near(angle, pi / 3) || near(angle, 4 * pi / 3)) return '1/√3';
      if (near(angle, pi / 2)) return '0';
      break;
    default: return null;
  }
  return null;
}
function trigCompute() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const raw = document.getElementById('triVal').value;
  const polarRaw = document.getElementById('triPolar').value;
  const outEl = document.getElementById('triOut');
  if (!raw && !polarRaw) { outEl.textContent = 'Enter a value'; return; }
  let x, polar = null;
  if (polarRaw) {
    polar = parsePolarInput(polarRaw);
    if (!polar) {
      outEl.textContent = 'Invalid polar input';
      return;
    }
    const thetaRad = (mode === 'deg') ? polar.theta * Math.PI / 180 : polar.theta;
    const xRect = polar.r * Math.cos(thetaRad);
    const yRect = polar.r * Math.sin(thetaRad);
    let trigValue;
    switch (op) {
      case 'sin': trigValue = Math.sin(thetaRad); break;
      case 'cos': trigValue = Math.cos(thetaRad); break;
      case 'tan': trigValue = Math.tan(thetaRad); break;
      case 'csc': trigValue = 1 / Math.sin(thetaRad); break;
      case 'sec': trigValue = 1 / Math.cos(thetaRad); break;
      case 'cot': trigValue = 1 / Math.tan(thetaRad); break;
      default: trigValue = NaN;
    }

    outEl.textContent = `Result: ${fmt(trigValue)} | Rectangular: (${fmt(xRect)}, ${fmt(yRect)})`;
    return;
  }

  else if (mode === 'rad') {
    x = parseRadianInput(raw);
  } else {
    x = Number(raw);
  }
  if (isNaN(x)) { outEl.textContent = 'Invalid input'; return; }

  const toRad = v => mode === 'deg' ? v * Math.PI / 180 : v;
  const fromRad = v => mode === 'deg' ? v * 180 / Math.PI : v;
  const angle = toRad(x);

  let res;
  try {
    if (polar) {
      res = evalTrig(op, polar.theta, mode);
    } else {
      res = evalTrig(op, angle, mode);
    }
    switch (op) {
      case 'sin': res = Math.sin(angle); break;
      case 'cos': res = Math.cos(angle); break;
      case 'tan': res = Math.tan(angle); break;
      case 'csc': res = 1 / Math.sin(angle); break;
      case 'sec': res = 1 / Math.cos(angle); break;
      case 'cot': res = 1 / Math.tan(angle); break;
      case 'asin': res = fromRad(Math.asin(x)); break;
      case 'acos': res = fromRad(Math.acos(x)); break;
      case 'atan': res = fromRad(Math.atan(x)); break;
      case 'asec': res = fromRad(Math.acos(1 / x)); break;
      case 'acsc': res = fromRad(Math.asin(1 / x)); break;
      case 'acot': res = fromRad(Math.atan(1 / x)); break;
      case 'sinh': res = Math.sinh(x); break;
      case 'cosh': res = Math.cosh(x); break;
      case 'tanh': res = Math.tanh(x); break;
      case 'csch': res = 1 / Math.sinh(x); break;
      case 'sech': res = 1 / Math.cosh(x); break;
      case 'coth': res = 1 / Math.tanh(x); break;
      default: res = NaN;
    }
    let output = `Result: ${fmt(res)}`;
    const nice = getNiceAngle(op, angle);
    if (nice) output += ` or ${nice}`;

    if (polar) {
      let xr = polar.r * Math.cos(polar.theta);
      let yr = polar.r * Math.sin(polar.theta);
      output += ` | Rectangular: (${fmt(xr)}, ${fmt(yr)})`;
    }

    outEl.textContent = output;
  } catch (e) { outEl.textContent = 'Error: ' + e.message; }
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
let ptPrintTimer = null;
let ptLineQueue = [];

function showElementInfo(symbol) {
  const out = document.getElementById('ptOut');
  const infoBtn = document.getElementById('ptInfoBtn');
  if (ptPrintTimer) {
    clearTimeout(ptPrintTimer);
    ptPrintTimer = null;
  }
  ptLineQueue = [];
  infoBtn.classList.remove('ptInfoBtnVisible');
  infoBtn.classList.add('ptInfoBtnHidden');
  const existingLines = out.querySelectorAll('.pt-info-line');
  
  if (existingLines.length > 0) {
    existingLines.forEach(line => {
      line.classList.remove('pt-line-visible');
    });
    ptPrintTimer = setTimeout(() => {
      out.innerHTML = '';
      loadAndPrintNewInfo(symbol, out, infoBtn);
    }, 400); 
  } 
  else {
    out.innerHTML = '';
    loadAndPrintNewInfo(symbol, out, infoBtn);
  }
}
function loadAndPrintNewInfo(symbol, out, infoBtn) {
  const info = elementData.find(el => el.Symbol === symbol);
  if (!info) {
    ptLineQueue.push("No data available for this element.");
  } else {
    for (const [key, value] of Object.entries(info)) {
      ptLineQueue.push(`<strong>${key}:</strong> ${value}`);
    }
  }
  printNextLine(out, infoBtn);
}
function printNextLine(out, infoBtn) {
  if (ptLineQueue.length === 0) {
    infoBtn.classList.remove('ptInfoBtnHidden');
    infoBtn.classList.add('ptInfoBtnVisible');
    ptPrintTimer = null;
    return;
  }
  const lineHTML = ptLineQueue.shift();
  const lineEl = document.createElement('div');
  lineEl.classList.add('pt-info-line');
  lineEl.innerHTML = lineHTML;
  out.appendChild(lineEl);
  requestAnimationFrame(() => {
    lineEl.classList.add('pt-line-visible');
  });
  ptPrintTimer = setTimeout(() => printNextLine(out, infoBtn), 150); 
}

document.querySelectorAll('.element-box').forEach(box => {
  box.addEventListener('click', () => {
    const symbol = box.getAttribute('data-symbol');
    showElementInfo(symbol);
  });
});
const elementData = 
[
 {
   "Z": 1,
   "Symbol": "H",
   "Name": "Hydrogen",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 1,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Henry Cavendish",
   "Date": "1766",
   "Origin of Name (Etymology)": "Greek: hydro (water) + genes (forming)",
   "Atomic Mass (amu)": "1.008",
   "Protons": 1,
   "Electrons (Neutral)": 1,
   "Neutrons": "0 (for _H)",
   "Known Isotopes": "_H–_H",
   "Natural Isotopic Composition (%)": "_H (99.9885%), _H (0.0115%)",
   "Isotopic Masses (amu)": "1.007825, 2.014102",
   "Electron Count in Ion(s)": "0 (H_), 2 (H_)",
   "Common Oxidation States": "+1, -1",
   "ElectronConfiguration": "1s1",
   "Electron Configuration": "1s_",
   "Valence Orbital Diagram": "1s: (_)",
   "DotStructure": "H•",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "2.7928",
   "Melting Point (°C)": "-259.1",
   "Melting Point (K)": "14",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-252.9",
   "Boiling Point (K)": "20.2",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.00008988",
   "Atomic Radius (pm)": "53",
   "Covalent Radius (pm)": 31,
   "Van der Waals Radius (pm)": "120",
   "Ionic Radius(es) (pm)": "208 (H_); -21 (H_)",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "0.14 (Solid)",
   "Shear Modulus (GPa)": "0.06 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.1805 (Gas)",
   "Specific Heat (J/g·K)": "14.304 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.117 (H_)",
   "Heat of Vaporization (kJ/mol)": "0.904 (H_)",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000132 (Gas)",
   "Electron Affinity (kJ/mol)": "72.8",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "1312",
   "Standard Electrode Potential (V)": "0.00 (by definition)",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Hexagonal",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "H (Solid, Hexagonal): a = 3.76, c = 6.16 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "1400",
   "Abundance (O | A | U)": "O: 11% | A: 0.5 ppm | U: 75%",
   "Sources": "Water, natural gas",
   "Toxicity": "Low (flammable)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.42 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Slightly"
},
 {
   "Z": 2,
   "Symbol": "He",
   "Name": "Helium",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 1,
   "Group": 18,
   "Block": "s",
   "Discoverer": "Janssen & Lockyer",
   "Date": "1868",
   "Origin of Name (Etymology)": "Greek: helios (sun)",
   "Atomic Mass (amu)": "4.0026",
   "Protons": 2,
   "Electrons (Neutral)": 2,
   "Neutrons": "2 (for _He)",
   "Known Isotopes": "_He–__He",
   "Natural Isotopic Composition (%)": "_He (0.000137%), _He (99.999863%)",
   "Isotopic Masses (amu)": "3.016029, 4.002603",
   "Electron Count in Ion(s)": "(Does not form ions)",
   "Common Oxidation States": "0",
   "ElectronConfiguration": "1s2",
   "Electron Configuration": "1s_",
   "Valence Orbital Diagram": "1s: (__)",
   "DotStructure": "He:",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "N/A (at 1 atm)",
   "Melting Point (K)": "N/A (at 1 atm)",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-268.9",
   "Boiling Point (K)": "4.2",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.0001785",
   "Atomic Radius (pm)": "31",
   "Covalent Radius (pm)": 28,
   "Van der Waals Radius (pm)": "140",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "0.05 (Solid)",
   "Shear Modulus (GPa)": "0.01 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.1513 (Gas)",
   "Specific Heat (J/g·K)": "5.193 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.021",
   "Heat of Vaporization (kJ/mol)": "0.082",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000035 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "N/A",
   "1st Ionization Energy (kJ/mol)": "2372.3",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "Inert",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "He (Solid, HCP): a = 3.53, c = 5.78 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.008",
   "Abundance (O | A | U)": "O: 7 ppb | A: 5.2 ppm | U: 24%",
   "Sources": "Natural gas",
   "Toxicity": "Low (asphyxiant)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 3,
   "Symbol": "Li",
   "Name": "Lithium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 2,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Johan Arfwedson",
   "Date": "1817",
   "Origin of Name (Etymology)": "Greek: lithos (stone)",
   "Atomic Mass (amu)": "6.94",
   "Protons": 3,
   "Electrons (Neutral)": 3,
   "Neutrons": "4 (for _Li)",
   "Known Isotopes": "_Li–__Li",
   "Natural Isotopic Composition (%)": "_Li (7.59%), _Li (92.41%)",
   "Isotopic Masses (amu)": "6.015122, 7.016004",
   "Electron Count in Ion(s)": "2",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s22s1",
   "Electron Configuration": "[He] 2s_",
   "Valence Orbital Diagram": "2s: (_)",
   "DotStructure": "Li•",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "3.256",
   "Melting Point (°C)": "180.5",
   "Melting Point (K)": "453.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1342",
   "Boiling Point (K)": "1615",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.534",
   "Atomic Radius (pm)": "167",
   "Covalent Radius (pm)": 128,
   "Van der Waals Radius (pm)": "182",
   "Ionic Radius(es) (pm)": "76 (Li_)",
   "Mohs Hardness": "0.6",
   "Young's Modulus (GPa)": "4.9",
   "Bulk Modulus (GPa)": "11",
   "Shear Modulus (GPa)": "4.9",
   "Thermal Conductivity (W/m·K)": "85",
   "Specific Heat (J/g·K)": "3.582",
   "Heat of Fusion (kJ/mol)": "3",
   "Heat of Vaporization (kJ/mol)": "145.9",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "59.6",
   "Electronegativity (Pauling Scale)": "0.98",
   "1st Ionization Energy (kJ/mol)": "520.2",
   "Standard Electrode Potential (V)": "-3.04",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "1.1 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Li (BCC): a = 3.51 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "20",
   "Abundance (O | A | U)": "O: 0.18 ppm | U: 6 ppb",
   "Sources": "Spodumene, brines",
   "Toxicity": "Moderate",
   "Bio. Role": "Trace",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "13.02",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 4,
   "Symbol": "Be",
   "Name": "Beryllium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 2,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Louis-Nicolas Vauquelin",
   "Date": "1798",
   "Origin of Name (Etymology)": "Greek: beryllos (beryl mineral)",
   "Atomic Mass (amu)": "9.0122",
   "Protons": 4,
   "Electrons (Neutral)": 4,
   "Neutrons": "5 (for _Be)",
   "Known Isotopes": "_Be–__Be",
   "Natural Isotopic Composition (%)": "_Be (100%)",
   "Isotopic Masses (amu)": "9.012182",
   "Electron Count in Ion(s)": "2",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s22s2",
   "Electron Configuration": "[He] 2s_",
   "Valence Orbital Diagram": "2s: (__)",
   "DotStructure": "•Be•",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "-1.177",
   "Melting Point (°C)": "1287",
   "Melting Point (K)": "1560",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2469",
   "Boiling Point (K)": "2742",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.85",
   "Atomic Radius (pm)": "112",
   "Covalent Radius (pm)": 96,
   "Van der Waals Radius (pm)": "153",
   "Ionic Radius(es) (pm)": "45 (Be__)",
   "Mohs Hardness": "5.5",
   "Young's Modulus (GPa)": "287",
   "Bulk Modulus (GPa)": "130",
   "Shear Modulus (GPa)": "132",
   "Thermal Conductivity (W/m·K)": "190",
   "Specific Heat (J/g·K)": "1.825",
   "Heat of Fusion (kJ/mol)": "7.89",
   "Heat of Vaporization (kJ/mol)": "292.4",
   "Color in Solid State": "Slate-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.57",
   "1st Ionization Energy (kJ/mol)": "899.5",
   "Standard Electrode Potential (V)": "-1.85",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "3.1 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Be (HCP): a = 2.29, c = 3.58 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "2.8",
   "Abundance (O | A | U)": "O: 0.6 ppt | U: 0.01 ppb",
   "Sources": "Beryl, bertrandite",
   "Toxicity": "High (inhalation)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "4.85",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 5,
   "Symbol": "B",
   "Name": "Boron",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 2,
   "Group": 13,
   "Block": "p",
   "Discoverer": "Gay-Lussac & Thénard",
   "Date": "1808",
   "Origin of Name (Etymology)": "Arabic: buraq (borax)",
   "Atomic Mass (amu)": "10.81",
   "Protons": 5,
   "Electrons (Neutral)": 5,
   "Neutrons": "6 (for __B)",
   "Known Isotopes": "_B–__B",
   "Natural Isotopic Composition (%)": "__B (19.9%), __B (80.1%)",
   "Isotopic Masses (amu)": "10.012937, 11.009305",
   "Electron Count in Ion(s)": "2",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s22s22p1",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (_)( )( )",
   "DotStructure": "•B• (3 dots)",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.688",
   "Melting Point (°C)": "2076",
   "Melting Point (K)": "2349",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3927",
   "Boiling Point (K)": "4200",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.34",
   "Atomic Radius (pm)": "87",
   "Covalent Radius (pm)": 84,
   "Van der Waals Radius (pm)": "192",
   "Ionic Radius(es) (pm)": "27 (B__)",
   "Mohs Hardness": "9.3",
   "Young's Modulus (GPa)": "440",
   "Bulk Modulus (GPa)": "21",
   "Shear Modulus (GPa)": "15",
   "Thermal Conductivity (W/m·K)": "27",
   "Specific Heat (J/g·K)": "1.026",
   "Heat of Fusion (kJ/mol)": "50.2",
   "Heat of Vaporization (kJ/mol)": "535.8",
   "Color in Solid State": "Black/Brown",
   "Refractive Index": "3.015",
   "Electron Affinity (kJ/mol)": "26.7",
   "Electronegativity (Pauling Scale)": "2.04",
   "1st Ionization Energy (kJ/mol)": "800.6",
   "Standard Electrode Potential (V)": "-0.89",
   "Acid/Base Behavior (if applicable)": "Weakly Acidic",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-4} (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "1.56",
   "Crystal Structure (Solid)": "Rhombohedral",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "B (_-Rhombohedral): a = 10.94, c = 23.81 (Hexagonal setting)",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "10",
   "Abundance (O | A | U)": "O: 4.4 ppm | U: 0.02 ppb",
   "Sources": "Borax, kernite",
   "Toxicity": "Low",
   "Bio. Role": "Essential (plants)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "4.6",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 6,
   "Symbol": "C",
   "Name": "Carbon",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Solid (Graphite/Diamond)",
   "Period": 2,
   "Group": 14,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Latin: carbo (coal, charcoal)",
   "Atomic Mass (amu)": "12.011",
   "Protons": 6,
   "Electrons (Neutral)": 6,
   "Neutrons": "6 (for __C)",
   "Known Isotopes": "_C–__C",
   "Natural Isotopic Composition (%)": "__C (98.93%), __C (1.07%)",
   "Isotopic Masses (amu)": "12.000000 (by definition), 13.003355",
   "Electron Count in Ion(s)": "2 (C__), 10 (C__)",
   "Common Oxidation States": "+4, -4",
   "ElectronConfiguration": "1s22s22p2",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (_)(_)( )",
   "DotStructure": "•C• (4 dots)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "3550 (sublimes)",
   "Melting Point (K)": "3823 (sublimes)",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "4027 (sublimes)",
   "Boiling Point (K)": "4300 (sublimes)",
   "Boiling Point Pressure Dependency": "Increases (Sublimes at 1 atm)",
   "Density (g/cm³)": "2.26",
   "Atomic Radius (pm)": "67",
   "Covalent Radius (pm)": 76,
   "Van der Waals Radius (pm)": "170",
   "Ionic Radius(es) (pm)": "260 (C__); 16 (C__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "30",
   "Bulk Modulus (GPa)": "33 (Graphite)",
   "Shear Modulus (GPa)": "N/A (Anisotropic)",
   "Thermal Conductivity (W/m·K)": "350 (Graphite)",
   "Specific Heat (J/g·K)": "0.710 (Graphite)",
   "Heat of Fusion (kJ/mol)": "(sublimes)",
   "Heat of Vaporization (kJ/mol)": "711 (sublimes)",
   "Color in Solid State": "Black (Graphite)",
   "Refractive Index": "2.4 (Graphite)",
   "Electron Affinity (kJ/mol)": "121.8",
   "Electronegativity (Pauling Scale)": "2.55",
   "1st Ionization Energy (kJ/mol)": "1086.5",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Weakly Acidic",
   "Reactivity": "Low (graphite)",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^5 (Graphite)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "5.5 (Diamond)",
   "Crystal Structure (Solid)": "Hexagonal (Graphite)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "C (Graphite): a = 2.46, c = 6.71 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "200",
   "Abundance (O | A | U)": "O: 28 ppm | A: 412 ppm (CO_) | U: 0.5%",
   "Sources": "Limestone, coal, atmosphere",
   "Toxicity": "Low (bulk), High (CO)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "5.31 (Graphite)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 7,
   "Symbol": "N",
   "Name": "Nitrogen",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 2,
   "Group": 15,
   "Block": "p",
   "Discoverer": "Daniel Rutherford",
   "Date": "1772",
   "Origin of Name (Etymology)": "Greek: nitron (nitre) + genes (forming)",
   "Atomic Mass (amu)": "14.007",
   "Protons": 7,
   "Electrons (Neutral)": 7,
   "Neutrons": "7 (for __N)",
   "Known Isotopes": "__N–__N",
   "Natural Isotopic Composition (%)": "__N (99.636%), __N (0.364%)",
   "Isotopic Masses (amu)": "14.003074, 15.000109",
   "Electron Count in Ion(s)": "10 (N__), 2 (N__), 4 (N__)",
   "Common Oxidation States": "-3, +5, +3",
   "ElectronConfiguration": "1s22s22p3",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (_)(_)(_)",
   "DotStructure": "•N: (1 pair, 3 singles)",
   "Nuclear Spin (I)": "1",
   "Magnetic Moment (μ/μN​)": "0.4037",
   "Melting Point (°C)": "-210",
   "Melting Point (K)": "63.1",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-195.8",
   "Boiling Point (K)": "77.3",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.001251",
   "Atomic Radius (pm)": "56",
   "Covalent Radius (pm)": 71,
   "Van der Waals Radius (pm)": "155",
   "Ionic Radius(es) (pm)": "146 (N__); 13 (N__)",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "4.1 (Solid)",
   "Shear Modulus (GPa)": "1.6 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0258 (Gas)",
   "Specific Heat (J/g·K)": "1.040 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.72 (N_)",
   "Heat of Vaporization (kJ/mol)": "5.57 (N_)",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000298 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "3.04",
   "1st Ionization Energy (kJ/mol)": "1402.3",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Very low (as N2)",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Hexagonal (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "N (_-phase, Cubic): a = 5.64 (α=β=γ=90°)",
   "Space Group": "Pa-3",
   "Abundance (Earth's Crust, ppm)": "19",
   "Abundance (O | A | U)": "O: 0.5 ppm | A: 78.1% | U: 0.1%",
   "Sources": "Atmosphere",
   "Toxicity": "Low (N_), High (cyanide)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 8,
   "Symbol": "O",
   "Name": "Oxygen",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 2,
   "Group": 16,
   "Block": "p",
   "Discoverer": "Scheele & Priestley",
   "Date": "1774",
   "Origin of Name (Etymology)": "Greek: oxys (acid) + genes (forming)",
   "Atomic Mass (amu)": "15.999",
   "Protons": 8,
   "Electrons (Neutral)": 8,
   "Neutrons": "8 (for __O)",
   "Known Isotopes": "__O–__O",
   "Natural Isotopic Composition (%)": "__O (99.757%), __O (0.038%), __O (0.205%)",
   "Isotopic Masses (amu)": "15.994915, 16.999131, 17.999160",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "-2",
   "ElectronConfiguration": "1s22s22p4",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (__)(_)(_)",
   "DotStructure": ":O• (2 pairs, 2 singles)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-218.8",
   "Melting Point (K)": "54.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-183",
   "Boiling Point (K)": "90.1",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.001429",
   "Atomic Radius (pm)": "48",
   "Covalent Radius (pm)": 66,
   "Van der Waals Radius (pm)": "152",
   "Ionic Radius(es) (pm)": "140 (O__)",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "8.9 (Solid)",
   "Shear Modulus (GPa)": "3.3 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0266 (Gas)",
   "Specific Heat (J/g·K)": "0.918 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.444 (O_)",
   "Heat of Vaporization (kJ/mol)": "6.82 (O_)",
   "Color in Solid State": "Pale blue",
   "Refractive Index": "1.000271 (Gas)",
   "Electron Affinity (kJ/mol)": "141",
   "Electronegativity (Pauling Scale)": "3.44",
   "1st Ionization Energy (kJ/mol)": "1313.9",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A (forms oxides)",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Cubic (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "O (_-phase, Cubic): a = 6.83 (α=β=γ=90°)",
   "Space Group": "Pm-3n",
   "Abundance (Earth's Crust, ppm)": "461000",
   "Abundance (O | A | U)": "O: 86% | A: 20.9% | U: 1%",
   "Sources": "Atmosphere, water",
   "Toxicity": "Low (O_), High (O_)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Slightly"
},
 {
   "Z": 9,
   "Symbol": "F",
   "Name": "Fluorine",
   "Classification": "Halogen",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 2,
   "Group": 17,
   "Block": "p",
   "Discoverer": "Henri Moissan",
   "Date": "1886",
   "Origin of Name (Etymology)": "Latin: fluere (to flow)",
   "Atomic Mass (amu)": "18.998",
   "Protons": 9,
   "Electrons (Neutral)": 9,
   "Neutrons": "10 (for __F)",
   "Known Isotopes": "__F–__F",
   "Natural Isotopic Composition (%)": "__F (100%)",
   "Isotopic Masses (amu)": "18.998403",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "-1",
   "ElectronConfiguration": "1s22s22p5",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (__)(__)(_)",
   "DotStructure": ":F• (3 pairs, 1 single)",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "2.628",
   "Melting Point (°C)": "-219.6",
   "Melting Point (K)": "53.5",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-188.1",
   "Boiling Point (K)": "85",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.001696",
   "Atomic Radius (pm)": "42",
   "Covalent Radius (pm)": 57,
   "Van der Waals Radius (pm)": "147",
   "Ionic Radius(es) (pm)": "133 (F_)",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "5.8 (Solid)",
   "Shear Modulus (GPa)": "2.2 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0277 (Gas)",
   "Specific Heat (J/g·K)": "0.824 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.51 (F_)",
   "Heat of Vaporization (kJ/mol)": "6.62 (F_)",
   "Color in Solid State": "Pale yellow",
   "Refractive Index": "1.000195 (Gas)",
   "Electron Affinity (kJ/mol)": "328",
   "Electronegativity (Pauling Scale)": "3.98",
   "1st Ionization Energy (kJ/mol)": "1681",
   "Standard Electrode Potential (V)": "2.87",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Cubic (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "F (_-phase, Monoclinic): a=5.50, b=3.28, c=7.28, _=102.17°",
   "Space Group": "C2/c",
   "Abundance (Earth's Crust, ppm)": "585",
   "Abundance (O | A | U)": "O: 1.3 ppm | U: 0.4 ppm",
   "Sources": "Fluorite, cryolite",
   "Toxicity": "High (elemental/F_)",
   "Bio. Role": "Essential (trace)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 10,
   "Symbol": "Ne",
   "Name": "Neon",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 2,
   "Group": 18,
   "Block": "p",
   "Discoverer": "Ramsay & Travers",
   "Date": "1898",
   "Origin of Name (Etymology)": "Greek: neos (new)",
   "Atomic Mass (amu)": "20.18",
   "Protons": 10,
   "Electrons (Neutral)": 10,
   "Neutrons": "10 (for __Ne)",
   "Known Isotopes": "__Ne–__Ne",
   "Natural Isotopic Composition (%)": "__Ne (90.48%), __Ne (0.27%), __Ne (9.25%)",
   "Isotopic Masses (amu)": "19.992440, 20.993847, 21.991386",
   "Electron Count in Ion(s)": "(Does not form ions)",
   "Common Oxidation States": "0",
   "ElectronConfiguration": "1s22s22p6",
   "Electron Configuration": "[He] 2s_ 2p_",
   "Valence Orbital Diagram": "2s: (__) 2p: (__)(__)(__)",
   "DotStructure": ":Ne: (4 pairs)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-248.6",
   "Melting Point (K)": "24.5",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-246.1",
   "Boiling Point (K)": "27.1",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.0009002",
   "Atomic Radius (pm)": "38",
   "Covalent Radius (pm)": 58,
   "Van der Waals Radius (pm)": "154",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "1.8 (Solid)",
   "Shear Modulus (GPa)": "0.7 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0491 (Gas)",
   "Specific Heat (J/g·K)": "1.030 (Gas)",
   "Heat of Fusion (kJ/mol)": "0.335",
   "Heat of Vaporization (kJ/mol)": "1.71",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000067 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "N/A",
   "1st Ionization Energy (kJ/mol)": "2080.7",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "Inert",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ne (FCC): a = 4.43 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.005",
   "Abundance (O | A | U)": "O: 0.2 ppb | A: 18.2 ppm | U: 0.13%",
   "Sources": "Atmosphere",
   "Toxicity": "Low (asphyxiant)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 11,
   "Symbol": "Na",
   "Name": "Sodium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 3,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Humphry Davy",
   "Date": "1807",
   "Origin of Name (Etymology)": "Latin: natrium (soda)",
   "Atomic Mass (amu)": "22.99",
   "Protons": 11,
   "Electrons (Neutral)": 11,
   "Neutrons": "12 (for __Na)",
   "Known Isotopes": "__Na–__Na",
   "Natural Isotopic Composition (%)": "__Na (100%)",
   "Isotopic Masses (amu)": "22.989769",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s22s22p63s1",
   "Electron Configuration": "[Ne] 3s_",
   "Valence Orbital Diagram": "3s: (_)",
   "DotStructure": "Na•",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.217",
   "Melting Point (°C)": "97.8",
   "Melting Point (K)": "370.9",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "883",
   "Boiling Point (K)": "1156",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.968",
   "Atomic Radius (pm)": "190",
   "Covalent Radius (pm)": 166,
   "Van der Waals Radius (pm)": "227",
   "Ionic Radius(es) (pm)": "102 (Na_)",
   "Mohs Hardness": "0.5",
   "Young's Modulus (GPa)": "10",
   "Bulk Modulus (GPa)": "6.3",
   "Shear Modulus (GPa)": "3.2",
   "Thermal Conductivity (W/m·K)": "140",
   "Specific Heat (J/g·K)": "1.228",
   "Heat of Fusion (kJ/mol)": "2.6",
   "Heat of Vaporization (kJ/mol)": "97.4",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "52.8",
   "Electronegativity (Pauling Scale)": "0.93",
   "1st Ionization Energy (kJ/mol)": "495.8",
   "Standard Electrode Potential (V)": "-2.71",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "2.1 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Na (BCC): a = 4.29 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "23600",
   "Abundance (O | A | U)": "O: 10,800 ppm | U: 2 ppm",
   "Sources": "Halite (salt), brines",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "23.78",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 12,
   "Symbol": "Mg",
   "Name": "Magnesium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 3,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Joseph Black",
   "Date": "1755",
   "Origin of Name (Etymology)": "Magnesia, a district in Greece",
   "Atomic Mass (amu)": "24.305",
   "Protons": 12,
   "Electrons (Neutral)": 12,
   "Neutrons": "12 (for __Mg)",
   "Known Isotopes": "__Mg–__Mg",
   "Natural Isotopic Composition (%)": "__Mg (78.99%), __Mg (10.00%), __Mg (11.01%)",
   "Isotopic Masses (amu)": "23.985042, 24.985837, 25.982593",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s22s22p63s2",
   "Electron Configuration": "[Ne] 3s_",
   "Valence Orbital Diagram": "3s: (__)",
   "DotStructure": "•Mg•",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "650",
   "Melting Point (K)": "923",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1090",
   "Boiling Point (K)": "1363",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.738",
   "Atomic Radius (pm)": "145",
   "Covalent Radius (pm)": 141,
   "Van der Waals Radius (pm)": "173",
   "Ionic Radius(es) (pm)": "72 (Mg__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "45",
   "Bulk Modulus (GPa)": "35",
   "Shear Modulus (GPa)": "17",
   "Thermal Conductivity (W/m·K)": "160",
   "Specific Heat (J/g·K)": "1.023",
   "Heat of Fusion (kJ/mol)": "8.48",
   "Heat of Vaporization (kJ/mol)": "128",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.31",
   "1st Ionization Energy (kJ/mol)": "737.7",
   "Standard Electrode Potential (V)": "-2.37",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "2.3 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Mg (HCP): a = 3.21, c = 5.21 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "23300",
   "Abundance (O | A | U)": "O: 1,290 ppm | U: 38 ppm",
   "Sources": "Magnesite, dolomite, seawater",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "14",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 13,
   "Symbol": "Al",
   "Name": "Aluminum",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 3,
   "Group": 13,
   "Block": "p",
   "Discoverer": "Hans Christian Ørsted",
   "Date": "1825",
   "Origin of Name (Etymology)": "Latin: alumen (alum)",
   "Atomic Mass (amu)": "26.982",
   "Protons": 13,
   "Electrons (Neutral)": 13,
   "Neutrons": "14 (for __Al)",
   "Known Isotopes": "__Al–__Al",
   "Natural Isotopic Composition (%)": "__Al (100%)",
   "Isotopic Masses (amu)": "26.981538",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s22s22p63s23p1",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (_)( )( )",
   "DotStructure": "•Al• (3 dots)",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "3.641",
   "Melting Point (°C)": "660.3",
   "Melting Point (K)": "933.4",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2519",
   "Boiling Point (K)": "2792",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.7",
   "Atomic Radius (pm)": "118",
   "Covalent Radius (pm)": 121,
   "Van der Waals Radius (pm)": "184",
   "Ionic Radius(es) (pm)": "53.5 (Al__)",
   "Mohs Hardness": "2.75",
   "Young's Modulus (GPa)": "70",
   "Bulk Modulus (GPa)": "76",
   "Shear Modulus (GPa)": "26",
   "Thermal Conductivity (W/m·K)": "235",
   "Specific Heat (J/g·K)": "0.897",
   "Heat of Fusion (kJ/mol)": "10.71",
   "Heat of Vaporization (kJ/mol)": "294",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "41.8",
   "Electronegativity (Pauling Scale)": "1.61",
   "1st Ionization Energy (kJ/mol)": "577.5",
   "Standard Electrode Potential (V)": "-1.66",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "3.8 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Al (FCC): a = 4.05 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "82300",
   "Abundance (O | A | U)": "O: 0.1 ppm | U: 2 ppm",
   "Sources": "Bauxite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 14,
   "Symbol": "Si",
   "Name": "Silicon",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 3,
   "Group": 14,
   "Block": "p",
   "Discoverer": "Jöns Jacob Berzelius",
   "Date": "1824",
   "Origin of Name (Etymology)": "Latin: silex (flint, hard stone)",
   "Atomic Mass (amu)": "28.085",
   "Protons": 14,
   "Electrons (Neutral)": 14,
   "Neutrons": "14 (for __Si)",
   "Known Isotopes": "__Si–__Si",
   "Natural Isotopic Composition (%)": "__Si (92.223%), __Si (4.685%), __Si (3.092%)",
   "Isotopic Masses (amu)": "27.976926, 28.976495, 29.973770",
   "Electron Count in Ion(s)": "10",
   "Common Oxidation States": "4",
   "ElectronConfiguration": "1s22s22p63s23p2",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (_)(_)( )",
   "DotStructure": "•Si• (4 dots)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1414",
   "Melting Point (K)": "1687",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "3265",
   "Boiling Point (K)": "3538",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.33",
   "Atomic Radius (pm)": "111",
   "Covalent Radius (pm)": 111,
   "Van der Waals Radius (pm)": "210",
   "Ionic Radius(es) (pm)": "271 (Si__); 40 (Si__)",
   "Mohs Hardness": "6.5",
   "Young's Modulus (GPa)": "185",
   "Bulk Modulus (GPa)": "100",
   "Shear Modulus (GPa)": "60",
   "Thermal Conductivity (W/m·K)": "150",
   "Specific Heat (J/g·K)": "0.712",
   "Heat of Fusion (kJ/mol)": "50.21",
   "Heat of Vaporization (kJ/mol)": "359",
   "Color in Solid State": "Gray (Metallic)",
   "Refractive Index": "3.418",
   "Electron Affinity (kJ/mol)": "133.6",
   "Electronegativity (Pauling Scale)": "1.9",
   "1st Ionization Energy (kJ/mol)": "786.5",
   "Standard Electrode Potential (V)": "-0.84",
   "Acid/Base Behavior (if applicable)": "Weakly Acidic",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-3} (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "1.12",
   "Crystal Structure (Solid)": "Cubic Diamond",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Si (Diamond Cubic): a = 5.43 (α=β=γ=90°)",
   "Space Group": "Fd-3m",
   "Abundance (Earth's Crust, ppm)": "282000",
   "Abundance (O | A | U)": "O: 2.2 ppm | U: 35 ppm",
   "Sources": "Quartz (sand), silicates",
   "Toxicity": "Low (bulk)",
   "Bio. Role": "Trace (debated)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "12.06",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 15,
   "Symbol": "P",
   "Name": "Phosphorus",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Solid (White/Red/Black)",
   "Period": 3,
   "Group": 15,
   "Block": "p",
   "Discoverer": "Hennig Brand",
   "Date": "1669",
   "Origin of Name (Etymology)": "Greek: phosphoros (light-bringer)",
   "Atomic Mass (amu)": "30.974",
   "Protons": 15,
   "Electrons (Neutral)": 15,
   "Neutrons": "16 (for __P)",
   "Known Isotopes": "__P–__P",
   "Natural Isotopic Composition (%)": "__P (100%)",
   "Isotopic Masses (amu)": "30.973762",
   "Electron Count in Ion(s)": "10 (P__), 12 (P__), 18 (P__)",
   "Common Oxidation States": "+5, +3, -3",
   "ElectronConfiguration": "1s22s22p63s23p3",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (_)(_)(_)",
   "DotStructure": "•P: (1 pair, 3 singles)",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "1.131",
   "Melting Point (°C)": "44.1",
   "Melting Point (K)": "317.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "280.5",
   "Boiling Point (K)": "553.6",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.823",
   "Atomic Radius (pm)": "98",
   "Covalent Radius (pm)": 107,
   "Van der Waals Radius (pm)": "180",
   "Ionic Radius(es) (pm)": "212 (P__); 38 (P__)",
   "Mohs Hardness": "0.5",
   "Young's Modulus (GPa)": "N/A",
   "Bulk Modulus (GPa)": "11 (White P)",
   "Shear Modulus (GPa)": "4.4 (White P)",
   "Thermal Conductivity (W/m·K)": "0.236 (White P)",
   "Specific Heat (J/g·K)": "0.769 (White P)",
   "Heat of Fusion (kJ/mol)": "0.66",
   "Heat of Vaporization (kJ/mol)": "12.4",
   "Color in Solid State": "White/Red/Black",
   "Refractive Index": "1.824 (White P)",
   "Electron Affinity (kJ/mol)": "72",
   "Electronegativity (Pauling Scale)": "2.19",
   "1st Ionization Energy (kJ/mol)": "1011.8",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "High (White P)",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-15} (Insulator)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0.3 (Black P)",
   "Crystal Structure (Solid)": "Orthorhombic (White)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "P (White, Cubic): a = 18.51 (α=β=γ=90°)",
   "Space Group": "I-43m",
   "Abundance (Earth's Crust, ppm)": "1050",
   "Abundance (O | A | U)": "O: 1.1 ppm | U: 0.7 ppm",
   "Sources": "Phosphate rock",
   "Toxicity": "High (White P)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "17.02 (White)",
   "Vapor P. (Pa @ 25°C)": "0.003 (White P)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 16,
   "Symbol": "S",
   "Name": "Sulfur",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 3,
   "Group": 16,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Latin: sulphurium (brimstone)",
   "Atomic Mass (amu)": "32.06",
   "Protons": 16,
   "Electrons (Neutral)": 16,
   "Neutrons": "16 (for __S)",
   "Known Isotopes": "__S–__S",
   "Natural Isotopic Composition (%)": "__S (94.99%), __S (0.75%), __S (4.25%), __S (0.01%)",
   "Isotopic Masses (amu)": "31.972071, 32.971458, 33.967867, 35.967081",
   "Electron Count in Ion(s)": "18 (S__), 10 (S__), 12 (S__)",
   "Common Oxidation States": "-2, +6, +4",
   "ElectronConfiguration": "1s22s22p63s23p4",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (__)(_)(_)",
   "DotStructure": ":S• (2 pairs, 2 singles)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "115.2",
   "Melting Point (K)": "388.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "444.6",
   "Boiling Point (K)": "717.7",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.07",
   "Atomic Radius (pm)": "88",
   "Covalent Radius (pm)": 105,
   "Van der Waals Radius (pm)": "180",
   "Ionic Radius(es) (pm)": "184 (S__); 29 (S__)",
   "Mohs Hardness": "2",
   "Young's Modulus (GPa)": "N/A",
   "Bulk Modulus (GPa)": "7.7 (Rhombic)",
   "Shear Modulus (GPa)": "2.6 (Rhombic)",
   "Thermal Conductivity (W/m·K)": "0.265 (Rhombic)",
   "Specific Heat (J/g·K)": "0.710 (Rhombic)",
   "Heat of Fusion (kJ/mol)": "1.727",
   "Heat of Vaporization (kJ/mol)": "9.8",
   "Color in Solid State": "Yellow",
   "Refractive Index": "1.957 (Rhombic)",
   "Electron Affinity (kJ/mol)": "200.4",
   "Electronegativity (Pauling Scale)": "2.58",
   "1st Ionization Energy (kJ/mol)": "999.6",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-15} (Insulator)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "2.6",
   "Crystal Structure (Solid)": "Orthorhombic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "S (_-Orthorhombic): a=10.47, b=12.87, c=24.49 (α=β=γ=90°)",
   "Space Group": "Fddd",
   "Abundance (Earth's Crust, ppm)": "350",
   "Abundance (O | A | U)": "O: 905 ppm | U: 15 ppm",
   "Sources": "Pyrite, gypsum",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "15.53",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 17,
   "Symbol": "Cl",
   "Name": "Chlorine",
   "Classification": "Halogen",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 3,
   "Group": 17,
   "Block": "p",
   "Discoverer": "Carl Wilhelm Scheele",
   "Date": "1774",
   "Origin of Name (Etymology)": "Greek: chloros (pale green)",
   "Atomic Mass (amu)": "35.45",
   "Protons": 17,
   "Electrons (Neutral)": 17,
   "Neutrons": "18 (for __Cl)",
   "Known Isotopes": "__Cl–__Cl",
   "Natural Isotopic Composition (%)": "__Cl (75.78%), __Cl (24.22%)",
   "Isotopic Masses (amu)": "34.968853, 36.965903",
   "Electron Count in Ion(s)": "18 (Cl_), 16 (Cl_), 12 (Cl__), 10 (Cl__)",
   "Common Oxidation States": "-1, +1, +5, +7",
   "ElectronConfiguration": "1s22s22p63s23p5",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (__)(__)(_)",
   "DotStructure": ":Cl• (3 pairs, 1 single)",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "0.8218",
   "Melting Point (°C)": "-101.5",
   "Melting Point (K)": "171.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-34",
   "Boiling Point (K)": "239.1",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.003214",
   "Atomic Radius (pm)": "79",
   "Covalent Radius (pm)": 102,
   "Van der Waals Radius (pm)": "175",
   "Ionic Radius(es) (pm)": "181 (Cl_)",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "9.8 (Solid)",
   "Shear Modulus (GPa)": "3.7 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0089 (Gas)",
   "Specific Heat (J/g·K)": "0.479 (Gas)",
   "Heat of Fusion (kJ/mol)": "6.406 (Cl_)",
   "Heat of Vaporization (kJ/mol)": "20.41 (Cl_)",
   "Color in Solid State": "Yellow-green",
   "Refractive Index": "1.000773 (Gas)",
   "Electron Affinity (kJ/mol)": "349",
   "Electronegativity (Pauling Scale)": "3.16",
   "1st Ionization Energy (kJ/mol)": "1251.2",
   "Standard Electrode Potential (V)": "1.36",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Orthorhombic (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cl (Orthorhombic): a=6.24, b=4.48, c=8.26 (α=β=γ=90°)",
   "Space Group": "Cmca",
   "Abundance (Earth's Crust, ppm)": "145",
   "Abundance (O | A | U)": "O: 19,400 ppm | A: trace | U: 1 ppm",
   "Sources": "Halite (salt), seawater",
   "Toxicity": "High (gas)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 18,
   "Symbol": "Ar",
   "Name": "Argon",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 3,
   "Group": 18,
   "Block": "p",
   "Discoverer": "Ramsay & Rayleigh",
   "Date": "1894",
   "Origin of Name (Etymology)": "Greek: argos (inactive, lazy)",
   "Atomic Mass (amu)": "39.948",
   "Protons": 18,
   "Electrons (Neutral)": 18,
   "Neutrons": "22 (for __Ar)",
   "Known Isotopes": "__Ar–__Ar",
   "Natural Isotopic Composition (%)": "__Ar (0.3365%), __Ar (0.0632%), __Ar (99.6003%)",
   "Isotopic Masses (amu)": "35.967545, 37.962732, 39.962383",
   "Electron Count in Ion(s)": "(Does not typically form ions)",
   "Common Oxidation States": "0",
   "ElectronConfiguration": "1s22s22p63s23p6",
   "Electron Configuration": "[Ne] 3s_ 3p_",
   "Valence Orbital Diagram": "3s: (__) 3p: (__)(__)(__)",
   "DotStructure": ":Ar: (4 pairs)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-189.3",
   "Melting Point (K)": "83.8",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-185.8",
   "Boiling Point (K)": "87.3",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.001784",
   "Atomic Radius (pm)": "71",
   "Covalent Radius (pm)": 106,
   "Van der Waals Radius (pm)": "188",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "2.5 (Solid)",
   "Shear Modulus (GPa)": "1.1 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0177 (Gas)",
   "Specific Heat (J/g·K)": "0.520 (Gas)",
   "Heat of Fusion (kJ/mol)": "1.18",
   "Heat of Vaporization (kJ/mol)": "6.43",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000281 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "N/A",
   "1st Ionization Energy (kJ/mol)": "1520.6",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "Inert",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ar (FCC): a = 5.26 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "3.5",
   "Abundance (O | A | U)": "O: 0.45 ppb | A: 0.93% | U: 3.8 ppm",
   "Sources": "Atmosphere",
   "Toxicity": "Low (asphyxiant)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 19,
   "Symbol": "K",
   "Name": "Potassium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Humphry Davy",
   "Date": "1807",
   "Origin of Name (Etymology)": "English: potash (pot ash)",
   "Atomic Mass (amu)": "39.098",
   "Protons": 19,
   "Electrons (Neutral)": 19,
   "Neutrons": "20 (for __K)",
   "Known Isotopes": "__K–__K",
   "Natural Isotopic Composition (%)": "__K (93.2581%), __K (0.0117%), __K (6.7302%)",
   "Isotopic Masses (amu)": "38.963706, 39.963998, 40.961825",
   "Electron Count in Ion(s)": "18",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s22s22p63s23p64s1",
   "Electron Configuration": "[Ar] 4s_",
   "Valence Orbital Diagram": "4s: (_)",
   "DotStructure": "K•",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "0.3914",
   "Melting Point (°C)": "63.5",
   "Melting Point (K)": "336.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "759",
   "Boiling Point (K)": "1032",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.862",
   "Atomic Radius (pm)": "243",
   "Covalent Radius (pm)": 203,
   "Van der Waals Radius (pm)": "275",
   "Ionic Radius(es) (pm)": "138 (K_)",
   "Mohs Hardness": "0.4",
   "Young's Modulus (GPa)": "3.5",
   "Bulk Modulus (GPa)": "3.1",
   "Shear Modulus (GPa)": "1.3",
   "Thermal Conductivity (W/m·K)": "100",
   "Specific Heat (J/g·K)": "0.757",
   "Heat of Fusion (kJ/mol)": "2.33",
   "Heat of Vaporization (kJ/mol)": "77.1",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "48.4",
   "Electronegativity (Pauling Scale)": "0.82",
   "1st Ionization Energy (kJ/mol)": "418.8",
   "Standard Electrode Potential (V)": "-2.93",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "1.4 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "K (BCC): a = 5.32 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "20900",
   "Abundance (O | A | U)": "O: 415 ppm | U: 3 ppm",
   "Sources": "Sylvite, carnallite",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "45.46",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 20,
   "Symbol": "Ca",
   "Name": "Calcium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Humphry Davy",
   "Date": "1808",
   "Origin of Name (Etymology)": "Latin: calx (lime)",
   "Atomic Mass (amu)": "40.078",
   "Protons": 20,
   "Electrons (Neutral)": 20,
   "Neutrons": "20 (for __Ca)",
   "Known Isotopes": "__Ca–__Ca",
   "Natural Isotopic Composition (%)": "__Ca (96.941%), __Ca (0.647%), __Ca (0.135%), __Ca (2.086%), __Ca (0.004%), __Ca (0.187%)",
   "Isotopic Masses (amu)": "39.962591, 41.958618, 42.958766, 43.955481, 45.953690, 47.952534",
   "Electron Count in Ion(s)": "18",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s22s22p63s23p64s2",
   "Electron Configuration": "[Ar] 4s_",
   "Valence Orbital Diagram": "4s: (__)",
   "DotStructure": "•Ca•",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "842",
   "Melting Point (K)": "1115",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1484",
   "Boiling Point (K)": "1757",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.55",
   "Atomic Radius (pm)": "194",
   "Covalent Radius (pm)": 176,
   "Van der Waals Radius (pm)": "231",
   "Ionic Radius(es) (pm)": "100 (Ca__)",
   "Mohs Hardness": "1.75",
   "Young's Modulus (GPa)": "20",
   "Bulk Modulus (GPa)": "17",
   "Shear Modulus (GPa)": "7.4",
   "Thermal Conductivity (W/m·K)": "201",
   "Specific Heat (J/g·K)": "0.647",
   "Heat of Fusion (kJ/mol)": "8.54",
   "Heat of Vaporization (kJ/mol)": "155",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "2.4",
   "Electronegativity (Pauling Scale)": "1",
   "1st Ionization Energy (kJ/mol)": "589.8",
   "Standard Electrode Potential (V)": "-2.87",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "2.9 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ca (FCC): a = 5.58 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "41500",
   "Abundance (O | A | U)": "O: 415 ppm | U: 2 ppm",
   "Sources": "Limestone, gypsum",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "25.86",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 21,
   "Symbol": "Sc",
   "Name": "Scandium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 3,
   "Block": "d",
   "Discoverer": "Lars Fredrik Nilson",
   "Date": "1879",
   "Origin of Name (Etymology)": "Latin: Scandia (Scandinavia)",
   "Atomic Mass (amu)": "44.956",
   "Protons": 21,
   "Electrons (Neutral)": 21,
   "Neutrons": "24 (for __Sc)",
   "Known Isotopes": "__Sc–__Sc",
   "Natural Isotopic Composition (%)": "__Sc (100%)",
   "Isotopic Masses (amu)": "44.955912",
   "Electron Count in Ion(s)": "18",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s22s22p63s23p63d14s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "4.756",
   "Melting Point (°C)": "1541",
   "Melting Point (K)": "1814",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2836",
   "Boiling Point (K)": "3109",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.985",
   "Atomic Radius (pm)": "184",
   "Covalent Radius (pm)": 170,
   "Van der Waals Radius (pm)": "211",
   "Ionic Radius(es) (pm)": "74.5 (Sc__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "74.4",
   "Bulk Modulus (GPa)": "44",
   "Shear Modulus (GPa)": "29",
   "Thermal Conductivity (W/m·K)": "16",
   "Specific Heat (J/g·K)": "0.568",
   "Heat of Fusion (kJ/mol)": "14.1",
   "Heat of Vaporization (kJ/mol)": "332.7",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "18.1",
   "Electronegativity (Pauling Scale)": "1.36",
   "1st Ionization Energy (kJ/mol)": "633.1",
   "Standard Electrode Potential (V)": "-2.03",
   "Acid/Base Behavior (if applicable)": "Weakly Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.8 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sc (HCP): a = 3.31, c = 5.27 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "22",
   "Abundance (O | A | U)": "O: 0.04 ppm | U: 0.03 ppm",
   "Sources": "Thortveitite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "15",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 22,
   "Symbol": "Ti",
   "Name": "Titanium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 4,
   "Block": "d",
   "Discoverer": "William Gregor",
   "Date": "1791",
   "Origin of Name (Etymology)": "Greek: Titans (mythological giants)",
   "Atomic Mass (amu)": "47.867",
   "Protons": 22,
   "Electrons (Neutral)": 22,
   "Neutrons": "26 (for __Ti)",
   "Known Isotopes": "__Ti–__Ti",
   "Natural Isotopic Composition (%)": "__Ti (8.25%), __Ti (7.44%), __Ti (73.72%), __Ti (5.41%), __Ti (5.18%)",
   "Isotopic Masses (amu)": "45.952631, 46.951763, 47.947946, 48.947870, 49.944791",
   "Electron Count in Ion(s)": "18 (Ti__), 19 (Ti__)",
   "Common Oxidation States": "+4, +3",
   "ElectronConfiguration": "1s22s22p63s23p63d24s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1668",
   "Melting Point (K)": "1941",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3287",
   "Boiling Point (K)": "3560",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "4.506",
   "Atomic Radius (pm)": "176",
   "Covalent Radius (pm)": 160,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "60.5 (Ti__); 86 (Ti__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "116",
   "Bulk Modulus (GPa)": "110",
   "Shear Modulus (GPa)": "44",
   "Thermal Conductivity (W/m·K)": "22",
   "Specific Heat (J/g·K)": "0.523",
   "Heat of Fusion (kJ/mol)": "14.15",
   "Heat of Vaporization (kJ/mol)": "425",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "7.3",
   "Electronegativity (Pauling Scale)": "1.54",
   "1st Ionization Energy (kJ/mol)": "658.8",
   "Standard Electrode Potential (V)": "-1.63",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "2.4 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ti (HCP): a = 2.95, c = 4.68 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "5650",
   "Abundance (O | A | U)": "O: 0.4 ppm | U: 0.8 ppm",
   "Sources": "Ilmenite, rutile",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10.64",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 23,
   "Symbol": "V",
   "Name": "Vanadium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 5,
   "Block": "d",
   "Discoverer": "Nils Sefström",
   "Date": "1830",
   "Origin of Name (Etymology)": "Vanadis, a Scandinavian goddess",
   "Atomic Mass (amu)": "50.942",
   "Protons": 23,
   "Electrons (Neutral)": 23,
   "Neutrons": "28 (for __V)",
   "Known Isotopes": "__V–__V",
   "Natural Isotopic Composition (%)": "__V (0.250%), __V (99.750%)",
   "Isotopic Masses (amu)": "49.947158, 50.943959",
   "Electron Count in Ion(s)": "18 (V__), 19 (V__), 20 (V__)",
   "Common Oxidation States": "+5, +4, +3",
   "ElectronConfiguration": "1s22s22p63s23p63d34s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "5.158",
   "Melting Point (°C)": "1910",
   "Melting Point (K)": "2183",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3407",
   "Boiling Point (K)": "3680",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.11",
   "Atomic Radius (pm)": "171",
   "Covalent Radius (pm)": 153,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "54 (V__); 79 (V__)",
   "Mohs Hardness": "7",
   "Young's Modulus (GPa)": "128",
   "Bulk Modulus (GPa)": "160",
   "Shear Modulus (GPa)": "67",
   "Thermal Conductivity (W/m·K)": "35",
   "Specific Heat (J/g·K)": "0.489",
   "Heat of Fusion (kJ/mol)": "21.5",
   "Heat of Vaporization (kJ/mol)": "459",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50.7",
   "Electronegativity (Pauling Scale)": "1.63",
   "1st Ionization Energy (kJ/mol)": "650.9",
   "Standard Electrode Potential (V)": "-1.13",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "5.0 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "V (BCC): a = 3.02 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "120",
   "Abundance (O | A | U)": "O: 1.9 ppm | U: 0.1 ppm",
   "Sources": "Vanadinite, carnotite",
   "Toxicity": "High (compounds)",
   "Bio. Role": "Trace",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "8.32",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 24,
   "Symbol": "Cr",
   "Name": "Chromium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 6,
   "Block": "d",
   "Discoverer": "Louis-Nicolas Vauquelin",
   "Date": "1797",
   "Origin of Name (Etymology)": "Greek: chroma (color)",
   "Atomic Mass (amu)": "51.996",
   "Protons": 24,
   "Electrons (Neutral)": 24,
   "Neutrons": "28 (for __Cr)",
   "Known Isotopes": "__Cr–__Cr",
   "Natural Isotopic Composition (%)": "__Cr (4.345%), __Cr (83.789%), __Cr (9.501%), __Cr (2.365%)",
   "Isotopic Masses (amu)": "49.946044, 51.940507, 52.940649, 53.938880",
   "Electron Count in Ion(s)": "21 (Cr__), 18 (Cr__), 22 (Cr__)",
   "Common Oxidation States": "+3, +6, +2",
   "ElectronConfiguration": "1s22s22p63s23p63d54s1",
   "Electron Configuration": "[Ar] 3d_ 4s_ *",
   "Valence Orbital Diagram": "4s: (_) 3d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1907",
   "Melting Point (K)": "2180",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2671",
   "Boiling Point (K)": "2944",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.19",
   "Atomic Radius (pm)": "166",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "61.5 (Cr__); 80 (Cr__)",
   "Mohs Hardness": "8.5",
   "Young's Modulus (GPa)": "279",
   "Bulk Modulus (GPa)": "160",
   "Shear Modulus (GPa)": "115",
   "Thermal Conductivity (W/m·K)": "94",
   "Specific Heat (J/g·K)": "0.449",
   "Heat of Fusion (kJ/mol)": "21",
   "Heat of Vaporization (kJ/mol)": "339",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "64.3",
   "Electronegativity (Pauling Scale)": "1.66",
   "1st Ionization Energy (kJ/mol)": "652.9",
   "Standard Electrode Potential (V)": "-0.74",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "7.9 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cr (BCC): a = 2.88 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "102",
   "Abundance (O | A | U)": "O: 0.1 ppm | U: 0.5 ppm",
   "Sources": "Chromite",
   "Toxicity": "High (Cr(VI))",
   "Bio. Role": "Trace",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "7.23",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 25,
   "Symbol": "Mn",
   "Name": "Manganese",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 7,
   "Block": "d",
   "Discoverer": "Johan Gottlieb Gahn",
   "Date": "1774",
   "Origin of Name (Etymology)": "Latin: magnes (magnet), from Magnesia",
   "Atomic Mass (amu)": "54.938",
   "Protons": 25,
   "Electrons (Neutral)": 25,
   "Neutrons": "30 (for __Mn)",
   "Known Isotopes": "__Mn–__Mn",
   "Natural Isotopic Composition (%)": "__Mn (100%)",
   "Isotopic Masses (amu)": "54.938045",
   "Electron Count in Ion(s)": "23 (Mn__), 21 (Mn__), 18 (Mn__)",
   "Common Oxidation States": "+2, +4, +7",
   "ElectronConfiguration": "1s22s22p63s23p63d54s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "3.449",
   "Melting Point (°C)": "1246",
   "Melting Point (K)": "1519",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2061",
   "Boiling Point (K)": "2334",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.21",
   "Atomic Radius (pm)": "161",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "46 (Mn__); 64.5 (Mn__); 83 (Mn__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "198",
   "Bulk Modulus (GPa)": "160",
   "Shear Modulus (GPa)": "83",
   "Thermal Conductivity (W/m·K)": "13",
   "Specific Heat (J/g·K)": "0.478",
   "Heat of Fusion (kJ/mol)": "11.7",
   "Heat of Vaporization (kJ/mol)": "239.7",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.55",
   "1st Ionization Energy (kJ/mol)": "717.3",
   "Standard Electrode Potential (V)": "-1.18",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "6.9 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Cubic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Mn (_-Cubic): a = 8.91 (α=β=γ=90°)",
   "Space Group": "I-43m",
   "Abundance (Earth's Crust, ppm)": "950",
   "Abundance (O | A | U)": "O: 0.01 ppm | U: 0.3 ppm",
   "Sources": "Pyrolusite",
   "Toxicity": "Low (bulk), High (dust)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "7.35",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 26,
   "Symbol": "Fe",
   "Name": "Iron",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 8,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Anglo-Saxon: iron",
   "Atomic Mass (amu)": "55.845",
   "Protons": 26,
   "Electrons (Neutral)": 26,
   "Neutrons": "30 (for __Fe)",
   "Known Isotopes": "__Fe–__Fe",
   "Natural Isotopic Composition (%)": "__Fe (5.845%), __Fe (91.754%), __Fe (2.119%), __Fe (0.282%)",
   "Isotopic Masses (amu)": "53.939610, 55.934937, 56.935394, 57.933275",
   "Electron Count in Ion(s)": "23 (Fe__), 24 (Fe__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s22s22p63s23p63d64s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (__)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1538",
   "Melting Point (K)": "1811",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2861",
   "Boiling Point (K)": "3134",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.874",
   "Atomic Radius (pm)": "156",
   "Covalent Radius (pm)": 132,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "64.5 (Fe__); 78 (Fe__)",
   "Mohs Hardness": "4",
   "Young's Modulus (GPa)": "211",
   "Bulk Modulus (GPa)": "170",
   "Shear Modulus (GPa)": "82",
   "Thermal Conductivity (W/m·K)": "80",
   "Specific Heat (J/g·K)": "0.449",
   "Heat of Fusion (kJ/mol)": "13.81",
   "Heat of Vaporization (kJ/mol)": "340",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "15.7",
   "Electronegativity (Pauling Scale)": "1.83",
   "1st Ionization Energy (kJ/mol)": "762.5",
   "Standard Electrode Potential (V)": "-0.44",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate (rusts)",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^7",
   "Magnetic Properties": "Ferromagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Fe (BCC): a = 2.87 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "56300",
   "Abundance (O | A | U)": "O: 0.01 ppm | U: 0.11%",
   "Sources": "Hematite, magnetite",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "7.09",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 27,
   "Symbol": "Co",
   "Name": "Cobalt",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 9,
   "Block": "d",
   "Discoverer": "Georg Brandt",
   "Date": "1735",
   "Origin of Name (Etymology)": "German: Kobold (goblin, evil spirit)",
   "Atomic Mass (amu)": "58.933",
   "Protons": 27,
   "Electrons (Neutral)": 27,
   "Neutrons": "32 (for __Co)",
   "Known Isotopes": "__Co–__Co",
   "Natural Isotopic Composition (%)": "__Co (100%)",
   "Isotopic Masses (amu)": "58.933195",
   "Electron Count in Ion(s)": "25 (Co__), 24 (Co__)",
   "Common Oxidation States": "+2, +3",
   "ElectronConfiguration": "1s22s22p63s23p63d74s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "4.627",
   "Melting Point (°C)": "1495",
   "Melting Point (K)": "1768",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2927",
   "Boiling Point (K)": "3200",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.9",
   "Atomic Radius (pm)": "152",
   "Covalent Radius (pm)": 126,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "61 (Co__); 74.5 (Co__)",
   "Mohs Hardness": "5",
   "Young's Modulus (GPa)": "209",
   "Bulk Modulus (GPa)": "180",
   "Shear Modulus (GPa)": "78",
   "Thermal Conductivity (W/m·K)": "100",
   "Specific Heat (J/g·K)": "0.444",
   "Heat of Fusion (kJ/mol)": "14.9",
   "Heat of Vaporization (kJ/mol)": "377",
   "Color in Solid State": "Silvery-blue",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "63.9",
   "Electronegativity (Pauling Scale)": "1.88",
   "1st Ionization Energy (kJ/mol)": "760.4",
   "Standard Electrode Potential (V)": "-0.28",
   "Acid/Base Behavior (if applicable)": "Weakly Basic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.7 x 10^7",
   "Magnetic Properties": "Ferromagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Co (HCP): a = 2.51, c = 4.07 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "25",
   "Abundance (O | A | U)": "O: 4 ppb | U: 0.3 ppm",
   "Sources": "Cobaltite",
   "Toxicity": "High (intake)",
   "Bio. Role": "Essential (B12)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "6.7",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 28,
   "Symbol": "Ni",
   "Name": "Nickel",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 10,
   "Block": "d",
   "Discoverer": "Axel Fredrik Cronstedt",
   "Date": "1751",
   "Origin of Name (Etymology)": "German: Kupfernickel (devil's copper)",
   "Atomic Mass (amu)": "58.693",
   "Protons": 28,
   "Electrons (Neutral)": 28,
   "Neutrons": "30 (for __Ni)",
   "Known Isotopes": "__Ni–__Ni",
   "Natural Isotopic Composition (%)": "__Ni (68.077%), __Ni (26.223%), __Ni (1.140%), __Ni (3.634%), __Ni (0.926%)",
   "Isotopic Masses (amu)": "57.935342, 59.930786, 60.931056, 61.928345, 63.927966",
   "Electron Count in Ion(s)": "26 (Ni__), 25 (Ni__)",
   "Common Oxidation States": "+2, +3",
   "ElectronConfiguration": "1s22s22p63s23p63d84s2",
   "Electron Configuration": "[Ar] 3d_ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (__)(__)(__)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1455",
   "Melting Point (K)": "1728",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2913",
   "Boiling Point (K)": "3186",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.908",
   "Atomic Radius (pm)": "149",
   "Covalent Radius (pm)": 124,
   "Van der Waals Radius (pm)": "163",
   "Ionic Radius(es) (pm)": "69 (Ni__)",
   "Mohs Hardness": "4",
   "Young's Modulus (GPa)": "200",
   "Bulk Modulus (GPa)": "200",
   "Shear Modulus (GPa)": "76",
   "Thermal Conductivity (W/m·K)": "91",
   "Specific Heat (J/g·K)": "0.444",
   "Heat of Fusion (kJ/mol)": "17.48",
   "Heat of Vaporization (kJ/mol)": "377.1",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "112",
   "Electronegativity (Pauling Scale)": "1.91",
   "1st Ionization Energy (kJ/mol)": "737.1",
   "Standard Electrode Potential (V)": "-0.25",
   "Acid/Base Behavior (if applicable)": "Weakly Basic",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "1.4 x 10^7",
   "Magnetic Properties": "Ferromagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ni (FCC): a = 3.52 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "84",
   "Abundance (O | A | U)": "O: 2.8 ppb | U: 0.6 ppm",
   "Sources": "Pentlandite",
   "Toxicity": "Low (bulk), High (dust)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "6.59",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 29,
   "Symbol": "Cu",
   "Name": "Copper",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 11,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Latin: cyprium (from Cyprus)",
   "Atomic Mass (amu)": "63.546",
   "Protons": 29,
   "Electrons (Neutral)": 29,
   "Neutrons": "34 (for __Cu)",
   "Known Isotopes": "__Cu–__Cu",
   "Natural Isotopic Composition (%)": "__Cu (69.17%), __Cu (30.83%)",
   "Isotopic Masses (amu)": "62.929597, 64.927789",
   "Electron Count in Ion(s)": "27 (Cu__), 28 (Cu_)",
   "Common Oxidation States": "+2, +1",
   "ElectronConfiguration": "1s22s22p63s23p63d104s1",
   "Electron Configuration": "[Ar] 3d__ 4s_ *",
   "Valence Orbital Diagram": "4s: (_) 3d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.223",
   "Melting Point (°C)": "1084.6",
   "Melting Point (K)": "1357.7",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2562",
   "Boiling Point (K)": "2835",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.96",
   "Atomic Radius (pm)": "145",
   "Covalent Radius (pm)": 132,
   "Van der Waals Radius (pm)": "140",
   "Ionic Radius(es) (pm)": "73 (Cu__); 77 (Cu_)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "110",
   "Bulk Modulus (GPa)": "140",
   "Shear Modulus (GPa)": "48",
   "Thermal Conductivity (W/m·K)": "401",
   "Specific Heat (J/g·K)": "0.385",
   "Heat of Fusion (kJ/mol)": "13.26",
   "Heat of Vaporization (kJ/mol)": "300.4",
   "Color in Solid State": "Reddish-gold",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "118.4",
   "Electronegativity (Pauling Scale)": "1.9",
   "1st Ionization Energy (kJ/mol)": "745.5",
   "Standard Electrode Potential (V)": "0.34",
   "Acid/Base Behavior (if applicable)": "Weakly Basic",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "5.9 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cu (FCC): a = 3.61 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "60",
   "Abundance (O | A | U)": "O: 0.25 ppb | U: 0.07 ppm",
   "Sources": "Chalcopyrite",
   "Toxicity": "Low (bulk), High (ions)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "7.11",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 30,
   "Symbol": "Zn",
   "Name": "Zinc",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 12,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "German: Zink (of obscure origin)",
   "Atomic Mass (amu)": "65.38",
   "Protons": 30,
   "Electrons (Neutral)": 30,
   "Neutrons": "34 (for __Zn)",
   "Known Isotopes": "__Zn–__Zn",
   "Natural Isotopic Composition (%)": "__Zn (49.17%), __Zn (27.73%), __Zn (4.04%), __Zn (18.45%), __Zn (0.61%)",
   "Isotopic Masses (amu)": "63.929142, 65.926033, 66.927127, 67.924844, 69.925319",
   "Electron Count in Ion(s)": "28",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s22s22p63s23p63d104s2",
   "Electron Configuration": "[Ar] 3d__ 4s_",
   "Valence Orbital Diagram": "4s: (__) 3d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "419.5",
   "Melting Point (K)": "692.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "907",
   "Boiling Point (K)": "1180",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.14",
   "Atomic Radius (pm)": "142",
   "Covalent Radius (pm)": 122,
   "Van der Waals Radius (pm)": "139",
   "Ionic Radius(es) (pm)": "74 (Zn__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "108",
   "Bulk Modulus (GPa)": "130",
   "Shear Modulus (GPa)": "43",
   "Thermal Conductivity (W/m·K)": "116",
   "Specific Heat (J/g·K)": "0.388",
   "Heat of Fusion (kJ/mol)": "10",
   "Heat of Vaporization (kJ/mol)": "114.8",
   "Color in Solid State": "Silvery-blue",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.65",
   "1st Ionization Energy (kJ/mol)": "906.4",
   "Standard Electrode Potential (V)": "-0.76",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.7 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Zn (HCP): a = 2.66, c = 4.95 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "70",
   "Abundance (O | A | U)": "O: 5 ppb | U: 0.3 ppm",
   "Sources": "Sphalerite",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.16",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 31,
   "Symbol": "Ga",
   "Name": "Gallium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 13,
   "Block": "p",
   "Discoverer": "Paul-Émile Lecoq",
   "Date": "1875",
   "Origin of Name (Etymology)": "Latin: Gallia (France)",
   "Atomic Mass (amu)": "69.723",
   "Protons": 31,
   "Electrons (Neutral)": 31,
   "Neutrons": "38 (for __Ga)",
   "Known Isotopes": "__Ga–__Ga",
   "Natural Isotopic Composition (%)": "__Ga (60.108%), __Ga (39.892%)",
   "Isotopic Masses (amu)": "68.925573, 70.924701",
   "Electron Count in Ion(s)": "28",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p1",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (_)( )( )",
   "DotStructure": "•Ga• (3 dots)",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.016",
   "Melting Point (°C)": "29.8",
   "Melting Point (K)": "302.9",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "2204",
   "Boiling Point (K)": "2477",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "5.91",
   "Atomic Radius (pm)": "136",
   "Covalent Radius (pm)": 122,
   "Van der Waals Radius (pm)": "187",
   "Ionic Radius(es) (pm)": "62 (Ga__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "9.8",
   "Bulk Modulus (GPa)": "58",
   "Shear Modulus (GPa)": "26",
   "Thermal Conductivity (W/m·K)": "43",
   "Specific Heat (J/g·K)": "0.371",
   "Heat of Fusion (kJ/mol)": "5.59",
   "Heat of Vaporization (kJ/mol)": "254",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "41",
   "Electronegativity (Pauling Scale)": "1.81",
   "1st Ionization Energy (kJ/mol)": "578.8",
   "Standard Electrode Potential (V)": "-0.53",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "7.1 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Orthorhombic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ga (Orthorhombic): a=4.51, b=7.66, c=4.52 (α=β=γ=90°)",
   "Space Group": "Cmca",
   "Abundance (Earth's Crust, ppm)": "19",
   "Abundance (O | A | U)": "O: 30 ppt | U: 0.01 ppm",
   "Sources": "Bauxite, sphalerite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "11.8",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 32,
   "Symbol": "Ge",
   "Name": "Germanium",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 14,
   "Block": "p",
   "Discoverer": "Clemens Winkler",
   "Date": "1886",
   "Origin of Name (Etymology)": "Latin: Germania (Germany)",
   "Atomic Mass (amu)": "72.63",
   "Protons": 32,
   "Electrons (Neutral)": 32,
   "Neutrons": "42 (for __Ge)",
   "Known Isotopes": "__Ge–__Ge",
   "Natural Isotopic Composition (%)": "__Ge (20.38%), __Ge (27.31%), __Ge (7.76%), __Ge (36.72%), __Ge (7.83%)",
   "Isotopic Masses (amu)": "69.924247, 71.922075, 72.923458, 73.921177, 75.921402",
   "Electron Count in Ion(s)": "28",
   "Common Oxidation States": "4",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p2",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (_)(_)( )",
   "DotStructure": "•Ge• (4 dots)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "938.3",
   "Melting Point (K)": "1211.4",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "2833",
   "Boiling Point (K)": "3106",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "5.323",
   "Atomic Radius (pm)": "125",
   "Covalent Radius (pm)": 120,
   "Van der Waals Radius (pm)": "211",
   "Ionic Radius(es) (pm)": "53 (Ge__); 73 (Ge__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "103",
   "Bulk Modulus (GPa)": "75",
   "Shear Modulus (GPa)": "31",
   "Thermal Conductivity (W/m·K)": "67",
   "Specific Heat (J/g·K)": "0.312",
   "Heat of Fusion (kJ/mol)": "7.37",
   "Heat of Vaporization (kJ/mol)": "272",
   "Color in Solid State": "Grayish-white",
   "Refractive Index": "4.01",
   "Electron Affinity (kJ/mol)": "119",
   "Electronegativity (Pauling Scale)": "2.01",
   "1st Ionization Energy (kJ/mol)": "762",
   "Standard Electrode Potential (V)": "-0.12",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "2.2 (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0.67",
   "Crystal Structure (Solid)": "Cubic Diamond",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ge (Diamond Cubic): a = 5.66 (α=β=γ=90°)",
   "Space Group": "Fd-3m",
   "Abundance (Earth's Crust, ppm)": "1.5",
   "Abundance (O | A | U)": "O: 1 ppt | U: 0.04 ppm",
   "Sources": "Germanite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "13.6",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 33,
   "Symbol": "As",
   "Name": "Arsenic",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 15,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Greek: arsenikon (yellow orpiment)",
   "Atomic Mass (amu)": "74.922",
   "Protons": 33,
   "Electrons (Neutral)": 33,
   "Neutrons": "42 (for __As)",
   "Known Isotopes": "__As–__As",
   "Natural Isotopic Composition (%)": "__As (100%)",
   "Isotopic Masses (amu)": "74.921596",
   "Electron Count in Ion(s)": "30 (As__), 28 (As__), 36 (As__)",
   "Common Oxidation States": "+3, +5, -3",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p3",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (_)(_)(_)",
   "DotStructure": "•As: (1 pair, 3 singles)",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "1.439",
   "Melting Point (°C)": "817 (sublimes)",
   "Melting Point (K)": "1090 (sublimes)",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "614 (sublimes)",
   "Boiling Point (K)": "887 (sublimes)",
   "Boiling Point Pressure Dependency": "Increases (Sublimes at 1 atm)",
   "Density (g/cm³)": "5.727",
   "Atomic Radius (pm)": "114",
   "Covalent Radius (pm)": 119,
   "Van der Waals Radius (pm)": "185",
   "Ionic Radius(es) (pm)": "58 (As__); 46 (As__)",
   "Mohs Hardness": "3.5",
   "Young's Modulus (GPa)": "N/A",
   "Bulk Modulus (GPa)": "50",
   "Shear Modulus (GPa)": "20",
   "Thermal Conductivity (W/m·K)": "25",
   "Specific Heat (J/g·K)": "0.322",
   "Heat of Fusion (kJ/mol)": "7.32",
   "Heat of Vaporization (kJ/mol)": "150.3",
   "Color in Solid State": "Gray (Metallic)",
   "Refractive Index": "3.87",
   "Electron Affinity (kJ/mol)": "79",
   "Electronegativity (Pauling Scale)": "2.18",
   "1st Ionization Energy (kJ/mol)": "947",
   "Standard Electrode Potential (V)": "0.25",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "3.3 x 10^4 (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "1.4 (Gray As)",
   "Crystal Structure (Solid)": "Rhombohedral",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "As (Rhombohedral): a = 4.13, c = 11.27 (Hexagonal setting)",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "1.8",
   "Abundance (O | A | U)": "O: 1.5 ppm | U: 0.002 ppm",
   "Sources": "Arsenopyrite",
   "Toxicity": "Very High",
   "Bio. Role": "Trace (debated)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "13.1",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 34,
   "Symbol": "Se",
   "Name": "Selenium",
   "Classification": "Nonmetal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 4,
   "Group": 16,
   "Block": "p",
   "Discoverer": "Berzelius & Gahn",
   "Date": "1817",
   "Origin of Name (Etymology)": "Greek: selene (moon)",
   "Atomic Mass (amu)": "78.971",
   "Protons": 34,
   "Electrons (Neutral)": 34,
   "Neutrons": "46 (for __Se)",
   "Known Isotopes": "__Se–__Se",
   "Natural Isotopic Composition (%)": "__Se (0.89%), __Se (9.37%), __Se (7.63%), __Se (23.77%), __Se (49.61%), __Se (8.73%)",
   "Isotopic Masses (amu)": "73.922476, 75.919213, 76.919914, 77.917309, 79.916521, 81.916699",
   "Electron Count in Ion(s)": "36 (Se__), 30 (Se__), 28 (Se__)",
   "Common Oxidation States": "-2, +4, +6",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p4",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (__)(_)(_)",
   "DotStructure": ":Se• (2 pairs, 2 singles)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "221",
   "Melting Point (K)": "494",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "685",
   "Boiling Point (K)": "958",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "4.81",
   "Atomic Radius (pm)": "103",
   "Covalent Radius (pm)": 120,
   "Van der Waals Radius (pm)": "190",
   "Ionic Radius(es) (pm)": "198 (Se__)",
   "Mohs Hardness": "2",
   "Young's Modulus (GPa)": "10",
   "Bulk Modulus (GPa)": "42",
   "Shear Modulus (GPa)": "18",
   "Thermal Conductivity (W/m·K)": "9",
   "Specific Heat (J/g·K)": "0.227",
   "Heat of Fusion (kJ/mol)": "6.7",
   "Heat of Vaporization (kJ/mol)": "29.5",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "2.41",
   "Electron Affinity (kJ/mol)": "195",
   "Electronegativity (Pauling Scale)": "2.55",
   "1st Ionization Energy (kJ/mol)": "941",
   "Standard Electrode Potential (V)": "-0.67",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-10} (Insulator)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "1.7 (Gray Se)",
   "Crystal Structure (Solid)": "Hexagonal",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Se (Gray, Trigonal): a = 4.37, c = 4.95 (α=β=90°, γ=120°)",
   "Space Group": "P3_21",
   "Abundance (Earth's Crust, ppm)": "0.05",
   "Abundance (O | A | U)": "O: 0.05 ppm | U: 0.03 ppm",
   "Sources": "Clausthalite",
   "Toxicity": "High",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "16.42",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 35,
   "Symbol": "Br",
   "Name": "Bromine",
   "Classification": "Halogen",
   "Standard State (0°C, 1 atm)": "Liquid",
   "Period": 4,
   "Group": 17,
   "Block": "p",
   "Discoverer": "Balard & Löwig",
   "Date": "1825",
   "Origin of Name (Etymology)": "Greek: bromos (stench)",
   "Atomic Mass (amu)": "79.904",
   "Protons": 35,
   "Electrons (Neutral)": 35,
   "Neutrons": "44 (for __Br)",
   "Known Isotopes": "__Br–___Br",
   "Natural Isotopic Composition (%)": "__Br (50.69%), __Br (49.31%)",
   "Isotopic Masses (amu)": "78.918337, 80.916290",
   "Electron Count in Ion(s)": "36 (Br_), 34 (Br_), 30 (Br__)",
   "Common Oxidation States": "-1, +1, +5",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p5",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (__)(__)(_)",
   "DotStructure": ":Br• (3 pairs, 1 single)",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.106",
   "Melting Point (°C)": "-7.3",
   "Melting Point (K)": "265.8",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "58.8",
   "Boiling Point (K)": "331.9",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "3.102",
   "Atomic Radius (pm)": "94",
   "Covalent Radius (pm)": 120,
   "Van der Waals Radius (pm)": "185",
   "Ionic Radius(es) (pm)": "196 (Br_)",
   "Mohs Hardness": "N/A (Liquid)",
   "Young's Modulus (GPa)": "N/A (Liquid)",
   "Bulk Modulus (GPa)": "27 (Liquid)",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "0.0109 (Gas)",
   "Specific Heat (J/g·K)": "0.334 (Liquid)",
   "Heat of Fusion (kJ/mol)": "10.59 (Br_)",
   "Heat of Vaporization (kJ/mol)": "30.91 (Br_)",
   "Color in Solid State": "Red-brown",
   "Refractive Index": "1.001132 (Gas)",
   "Electron Affinity (kJ/mol)": "324.6",
   "Electronegativity (Pauling Scale)": "2.96",
   "1st Ionization Energy (kJ/mol)": "1139.9",
   "Standard Electrode Potential (V)": "1.07",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-10} (Insulator)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Orthorhombic (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Br (Orthorhombic): a=6.67, b=4.48, c=8.72 (α=β=γ=90°)",
   "Space Group": "Cmca",
   "Abundance (Earth's Crust, ppm)": "2.4",
   "Abundance (O | A | U)": "O: 65 ppm | U: 0.003 ppm",
   "Sources": "Seawater (bromides)",
   "Toxicity": "High (liquid/gas)",
   "Bio. Role": "Trace",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "23.50 (Liquid)",
   "Vapor P. (Pa @ 25°C)": "28,400 (Liquid)",
   "Solubility (in H₂O)": "Slightly"
},
 {
   "Z": 36,
   "Symbol": "Kr",
   "Name": "Krypton",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 4,
   "Group": 18,
   "Block": "p",
   "Discoverer": "Ramsay & Travers",
   "Date": "1898",
   "Origin of Name (Etymology)": "Greek: kryptos (hidden)",
   "Atomic Mass (amu)": "83.798",
   "Protons": 36,
   "Electrons (Neutral)": 36,
   "Neutrons": "48 (for __Kr)",
   "Known Isotopes": "__Kr–___Kr",
   "Natural Isotopic Composition (%)": "__Kr (0.355%), __Kr (2.286%), __Kr (11.593%), __Kr (11.500%), __Kr (56.987%), __Kr (17.279%)",
   "Isotopic Masses (amu)": "77.920364, 79.916379, 81.913483, 82.914136, 83.911507, 85.910610",
   "Electron Count in Ion(s)": "36 (Kr), 34 (Kr__)",
   "Common Oxidation States": "0, +2",
   "ElectronConfiguration": "1s22s22p63s23p63d104s24p6",
   "Electron Configuration": "[Ar] 3d__ 4s_ 4p_",
   "Valence Orbital Diagram": "4s: (__) 4p: (__)(__)(__)",
   "DotStructure": ":Kr: (4 pairs)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-157.4",
   "Melting Point (K)": "115.7",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-153.2",
   "Boiling Point (K)": "119.9",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.003749",
   "Atomic Radius (pm)": "88",
   "Covalent Radius (pm)": 116,
   "Van der Waals Radius (pm)": "202",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "3.7 (Solid)",
   "Shear Modulus (GPa)": "1.5 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0094 (Gas)",
   "Specific Heat (J/g·K)": "0.248 (Gas)",
   "Heat of Fusion (kJ/mol)": "1.64",
   "Heat of Vaporization (kJ/mol)": "9.08",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000449 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "3",
   "1st Ionization Energy (kJ/mol)": "1350.8",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Very low",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Kr (FCC): a = 5.72 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.0001",
   "Abundance (O | A | U)": "O: 1.1 ppt | A: 1.1 ppm | U: 0.5 ppm",
   "Sources": "Atmosphere",
   "Toxicity": "Low (asphyxiant)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 37,
   "Symbol": "Rb",
   "Name": "Rubidium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Bunsen & Kirchhoff",
   "Date": "1861",
   "Origin of Name (Etymology)": "Latin: rubidus (deepest red)",
   "Atomic Mass (amu)": "85.468",
   "Protons": 37,
   "Electrons (Neutral)": 37,
   "Neutrons": "48 (for __Rb)",
   "Known Isotopes": "__Rb–___Rb",
   "Natural Isotopic Composition (%)": "__Rb (72.17%), __Rb (27.83%)",
   "Isotopic Masses (amu)": "84.911789, 86.909180",
   "Electron Count in Ion(s)": "36",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s2...4p65s1",
   "Electron Configuration": "[Kr] 5s_",
   "Valence Orbital Diagram": "5s: (_)",
   "DotStructure": "Rb•",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "1.353",
   "Melting Point (°C)": "39.3",
   "Melting Point (K)": "312.4",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "688",
   "Boiling Point (K)": "961",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.532",
   "Atomic Radius (pm)": "265",
   "Covalent Radius (pm)": 220,
   "Van der Waals Radius (pm)": "303",
   "Ionic Radius(es) (pm)": "152 (Rb_)",
   "Mohs Hardness": "0.3",
   "Young's Modulus (GPa)": "2.4",
   "Bulk Modulus (GPa)": "2.5",
   "Shear Modulus (GPa)": "0.9",
   "Thermal Conductivity (W/m·K)": "58",
   "Specific Heat (J/g·K)": "0.363",
   "Heat of Fusion (kJ/mol)": "2.3",
   "Heat of Vaporization (kJ/mol)": "65.9",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "46.9",
   "Electronegativity (Pauling Scale)": "0.82",
   "1st Ionization Energy (kJ/mol)": "403",
   "Standard Electrode Potential (V)": "-2.92",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "8.3 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Rb (BCC): a = 5.59 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "90",
   "Abundance (O | A | U)": "O: 0.38 ppm | U: 0.002 ppm",
   "Sources": "Lepidolite",
   "Toxicity": "Low",
   "Bio. Role": "Trace (debated)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "55.9",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 38,
   "Symbol": "Sr",
   "Name": "Strontium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Crawford & Hope",
   "Date": "1790",
   "Origin of Name (Etymology)": "Strontian, a village in Scotland",
   "Atomic Mass (amu)": "87.62",
   "Protons": 38,
   "Electrons (Neutral)": 38,
   "Neutrons": "50 (for __Sr)",
   "Known Isotopes": "__Sr–___Sr",
   "Natural Isotopic Composition (%)": "__Sr (0.56%), __Sr (9.86%), __Sr (7.00%), __Sr (82.58%)",
   "Isotopic Masses (amu)": "83.913424, 85.909260, 86.908877, 87.905612",
   "Electron Count in Ion(s)": "36",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s2...4p65s2",
   "Electron Configuration": "[Kr] 5s_",
   "Valence Orbital Diagram": "5s: (__)",
   "DotStructure": "•Sr•",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "777",
   "Melting Point (K)": "1050",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1382",
   "Boiling Point (K)": "1655",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "2.64",
   "Atomic Radius (pm)": "219",
   "Covalent Radius (pm)": 195,
   "Van der Waals Radius (pm)": "249",
   "Ionic Radius(es) (pm)": "118 (Sr__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "16",
   "Bulk Modulus (GPa)": "11",
   "Shear Modulus (GPa)": "5.1",
   "Thermal Conductivity (W/m·K)": "51",
   "Specific Heat (J/g·K)": "0.276",
   "Heat of Fusion (kJ/mol)": "7.7",
   "Heat of Vaporization (kJ/mol)": "141",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "5",
   "Electronegativity (Pauling Scale)": "0.95",
   "1st Ionization Energy (kJ/mol)": "549.5",
   "Standard Electrode Potential (V)": "-2.91",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "7.7 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sr (FCC): a = 6.08 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "370",
   "Abundance (O | A | U)": "O: 7.7 ppm | U: 0.003 ppm",
   "Sources": "Celestite, strontianite",
   "Toxicity": "Low",
   "Bio. Role": "Trace",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "33.94",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 39,
   "Symbol": "Y",
   "Name": "Yttrium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 3,
   "Block": "d",
   "Discoverer": "Johan Gadolin",
   "Date": "1794",
   "Origin of Name (Etymology)": "Ytterby, a village in Sweden",
   "Atomic Mass (amu)": "88.906",
   "Protons": 39,
   "Electrons (Neutral)": 39,
   "Neutrons": "50 (for __Y)",
   "Known Isotopes": "__Y–___Y",
   "Natural Isotopic Composition (%)": "__Y (100%)",
   "Isotopic Masses (amu)": "88.905848",
   "Electron Count in Ion(s)": "36",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...4p64d15s2",
   "Electron Configuration": "[Kr] 4d_ 5s_",
   "Valence Orbital Diagram": "5s: (__) 4d: (_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "-0.1373",
   "Melting Point (°C)": "1526",
   "Melting Point (K)": "1799",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3345",
   "Boiling Point (K)": "3618",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "4.472",
   "Atomic Radius (pm)": "212",
   "Covalent Radius (pm)": 190,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "90 (Y__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "63.5",
   "Bulk Modulus (GPa)": "35",
   "Shear Modulus (GPa)": "19",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.293",
   "Heat of Fusion (kJ/mol)": "11",
   "Heat of Vaporization (kJ/mol)": "290",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "29.6",
   "Electronegativity (Pauling Scale)": "1.22",
   "1st Ionization Energy (kJ/mol)": "600",
   "Standard Electrode Potential (V)": "-2.37",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.7 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Y (HCP): a = 3.65, c = 5.73 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "33",
   "Abundance (O | A | U)": "O: 1.3 ppt | U: 0.002 ppm",
   "Sources": "Bastnäsite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "19.89",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 40,
   "Symbol": "Zr",
   "Name": "Zirconium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 4,
   "Block": "d",
   "Discoverer": "Martin Heinrich Klaproth",
   "Date": "1789",
   "Origin of Name (Etymology)": "Persian: zargun (gold-like)",
   "Atomic Mass (amu)": "91.224",
   "Protons": 40,
   "Electrons (Neutral)": 40,
   "Neutrons": "50 (for __Zr)",
   "Known Isotopes": "__Zr–___Zr",
   "Natural Isotopic Composition (%)": "__Zr (51.45%), __Zr (11.22%), __Zr (17.15%), __Zr (17.38%), __Zr (2.80%)",
   "Isotopic Masses (amu)": "89.904704, 90.905645, 91.905040, 93.906315, 95.908273",
   "Electron Count in Ion(s)": "36",
   "Common Oxidation States": "4",
   "ElectronConfiguration": "1s2...4p64d25s2",
   "Electron Configuration": "[Kr] 4d_ 5s_",
   "Valence Orbital Diagram": "5s: (__) 4d: (_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1855",
   "Melting Point (K)": "2128",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4409",
   "Boiling Point (K)": "4682",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.52",
   "Atomic Radius (pm)": "206",
   "Covalent Radius (pm)": 175,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "72 (Zr__)",
   "Mohs Hardness": "5",
   "Young's Modulus (GPa)": "88",
   "Bulk Modulus (GPa)": "83",
   "Shear Modulus (GPa)": "33",
   "Thermal Conductivity (W/m·K)": "19",
   "Specific Heat (J/g·K)": "0.28",
   "Heat of Fusion (kJ/mol)": "17.1",
   "Heat of Vaporization (kJ/mol)": "363",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "41.1",
   "Electronegativity (Pauling Scale)": "1.33",
   "1st Ionization Energy (kJ/mol)": "640.1",
   "Standard Electrode Potential (V)": "-2.37",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "2.3 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Zr (HCP): a = 3.23, c = 5.15 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "165",
   "Abundance (O | A | U)": "O: 1.3 ppt | U: 0.3 ppm",
   "Sources": "Zircon",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "14.02",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 41,
   "Symbol": "Nb",
   "Name": "Niobium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 5,
   "Block": "d",
   "Discoverer": "Charles Hatchett",
   "Date": "1801",
   "Origin of Name (Etymology)": "Greek: Niobe (mythological daughter of Tantalus)",
   "Atomic Mass (amu)": "92.906",
   "Protons": 41,
   "Electrons (Neutral)": 41,
   "Neutrons": "52 (for __Nb)",
   "Known Isotopes": "__Nb–___Nb",
   "Natural Isotopic Composition (%)": "__Nb (100%)",
   "Isotopic Masses (amu)": "92.906378",
   "Electron Count in Ion(s)": "36 (Nb__), 38 (Nb__)",
   "Common Oxidation States": "+5, +3",
   "ElectronConfiguration": "1s2...4p64d45s1",
   "Electron Configuration": "[Kr] 4d_ 5s_ *",
   "Valence Orbital Diagram": "5s: (_) 4d: (_)(_)(_)(_)( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "6.17",
   "Melting Point (°C)": "2477",
   "Melting Point (K)": "2750",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4744",
   "Boiling Point (K)": "5017",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.57",
   "Atomic Radius (pm)": "198",
   "Covalent Radius (pm)": 164,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "64 (Nb__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "105",
   "Bulk Modulus (GPa)": "100",
   "Shear Modulus (GPa)": "38",
   "Thermal Conductivity (W/m·K)": "31",
   "Specific Heat (J/g·K)": "0.247",
   "Heat of Fusion (kJ/mol)": "25",
   "Heat of Vaporization (kJ/mol)": "425",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "86.1",
   "Electronegativity (Pauling Scale)": "1.6",
   "1st Ionization Energy (kJ/mol)": "652.1",
   "Standard Electrode Potential (V)": "-1.21",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "6.7 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Nb (BCC): a = 3.30 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "20",
   "Abundance (O | A | U)": "O: 0.1 ppb | U: 0.008 ppm",
   "Sources": "Columbite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10.83",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 42,
   "Symbol": "Mo",
   "Name": "Molybdenum",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 6,
   "Block": "d",
   "Discoverer": "Carl Wilhelm Scheele",
   "Date": "1778",
   "Origin of Name (Etymology)": "Greek: molybdos (lead)",
   "Atomic Mass (amu)": "95.95",
   "Protons": 42,
   "Electrons (Neutral)": 42,
   "Neutrons": "56 (for __Mo)",
   "Known Isotopes": "__Mo–___Mo",
   "Natural Isotopic Composition (%)": "__Mo (14.53%), __Mo (9.15%), __Mo (15.84%), __Mo (16.67%), __Mo (9.60%), __Mo (24.39%), ___Mo (9.82%)",
   "Isotopic Masses (amu)": "91.906807, 93.905085, 94.905841, 95.904678, 96.906020, 97.905407, 99.90747",
   "Electron Count in Ion(s)": "36 (Mo__), 38 (Mo__)",
   "Common Oxidation States": "+6, +4",
   "ElectronConfiguration": "1s2...4p64d55s1",
   "Electron Configuration": "[Kr] 4d_ 5s_ *",
   "Valence Orbital Diagram": "5s: (_) 4d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "2623",
   "Melting Point (K)": "2896",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4639",
   "Boiling Point (K)": "4912",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "10.28",
   "Atomic Radius (pm)": "190",
   "Covalent Radius (pm)": 154,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "59 (Mo__)",
   "Mohs Hardness": "5.5",
   "Young's Modulus (GPa)": "329",
   "Bulk Modulus (GPa)": "140",
   "Shear Modulus (GPa)": "58",
   "Thermal Conductivity (W/m·K)": "51",
   "Specific Heat (J/g·K)": "0.233",
   "Heat of Fusion (kJ/mol)": "29",
   "Heat of Vaporization (kJ/mol)": "431",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "71.9",
   "Electronegativity (Pauling Scale)": "2.16",
   "1st Ionization Energy (kJ/mol)": "684.3",
   "Standard Electrode Potential (V)": "-0.9",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.8 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Mo (BCC): a = 3.15 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "1.2",
   "Abundance (O | A | U)": "O: 2.3 ppm | U: 0.07 ppm",
   "Sources": "Molybdenite",
   "Toxicity": "Low",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.38",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 43,
   "Symbol": "Tc",
   "Name": "Technetium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 7,
   "Block": "d",
   "Discoverer": "Perrier & Segrè",
   "Date": "1937",
   "Origin of Name (Etymology)": "Greek: technetos (artificial)",
   "Atomic Mass (amu)": "[98]",
   "Protons": 43,
   "Electrons (Neutral)": 43,
   "Neutrons": "55 (for __Tc)",
   "Known Isotopes": "__Tc–___Tc",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[98]",
   "Electron Count in Ion(s)": "36 (Tc__), 39 (Tc__)",
   "Common Oxidation States": "+7, +4",
   "ElectronConfiguration": "1s2...4p64d55s2",
   "Electron Configuration": "[Kr] 4d_ 5s_",
   "Valence Orbital Diagram": "5s: (__) 4d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "5.684",
   "Melting Point (°C)": "2157",
   "Melting Point (K)": "2430",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4265",
   "Boiling Point (K)": "4538",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "11.5",
   "Atomic Radius (pm)": "183",
   "Covalent Radius (pm)": 147,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "56 (Tc__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "450",
   "Bulk Modulus (GPa)": "130",
   "Shear Modulus (GPa)": "55",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.247",
   "Heat of Fusion (kJ/mol)": "10.5",
   "Heat of Vaporization (kJ/mol)": "293",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "53",
   "Electronegativity (Pauling Scale)": "1.9",
   "1st Ionization Energy (kJ/mol)": "702",
   "Standard Electrode Potential (V)": "-0.83",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "6.7 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Tc (HCP): a = 2.74, c = 4.39 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "N/A (Synthetic)",
   "Toxicity": "Fission products",
   "Bio. Role": "High (Radiological)",
   "Radioactive?": "None",
   "Half-life": "Yes",
   "Molar Vol. (cm³/mol)": "__Tc: 4.2_10_ y",
   "Vapor P. (Pa @ 25°C)": "8.63",
   "Solubility (in H₂O)": "Negligible"
},
 {
   "Z": 44,
   "Symbol": "Ru",
   "Name": "Ruthenium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 8,
   "Block": "d",
   "Discoverer": "Karl Ernst Claus",
   "Date": "1844",
   "Origin of Name (Etymology)": "Latin: Ruthenia (Russia)",
   "Atomic Mass (amu)": "101.07",
   "Protons": 44,
   "Electrons (Neutral)": 44,
   "Neutrons": "58 (for ___Ru)",
   "Known Isotopes": "__Ru–___Ru",
   "Natural Isotopic Composition (%)": "__Ru (5.54%), __Ru (1.87%), __Ru (12.76%), ___Ru (12.60%), ___Ru (17.06%), ___Ru (31.55%), ___Ru (18.62%)",
   "Isotopic Masses (amu)": "95.907597, 97.90528, 98.905938, 99.904219, 100.905581, 101.904348, 103.90543",
   "Electron Count in Ion(s)": "41 (Ru__), 40 (Ru__), 36 (Ru__)",
   "Common Oxidation States": "+3, +4, +8",
   "ElectronConfiguration": "1s2...4p64d75s1",
   "Electron Configuration": "[Kr] 4d_ 5s_ *",
   "Valence Orbital Diagram": "5s: (_) 4d: (__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "2334",
   "Melting Point (K)": "2607",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4150",
   "Boiling Point (K)": "4423",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "12.45",
   "Atomic Radius (pm)": "178",
   "Covalent Radius (pm)": 146,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "68 (Ru__)",
   "Mohs Hardness": "6.5",
   "Young's Modulus (GPa)": "447",
   "Bulk Modulus (GPa)": "140",
   "Shear Modulus (GPa)": "56",
   "Thermal Conductivity (W/m·K)": "35",
   "Specific Heat (J/g·K)": "0.23",
   "Heat of Fusion (kJ/mol)": "12.3",
   "Heat of Vaporization (kJ/mol)": "311.8",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "101.3",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "710.2",
   "Standard Electrode Potential (V)": "-0.47",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.3 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ru (HCP): a = 2.71, c = 4.28 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.001",
   "Abundance (O | A | U)": "O: 1 ppt | U: 0.007 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "8.28",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 45,
   "Symbol": "Rh",
   "Name": "Rhodium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 9,
   "Block": "d",
   "Discoverer": "William Hyde Wollaston",
   "Date": "1803",
   "Origin of Name (Etymology)": "Greek: rhodon (rose-colored)",
   "Atomic Mass (amu)": "102.91",
   "Protons": 45,
   "Electrons (Neutral)": 45,
   "Neutrons": "58 (for ___Rh)",
   "Known Isotopes": "__Rh–___Rh",
   "Natural Isotopic Composition (%)": "___Rh (100%)",
   "Isotopic Masses (amu)": "102.905504",
   "Electron Count in Ion(s)": "42 (Rh__), 44 (Rh_)",
   "Common Oxidation States": "+3, +1",
   "ElectronConfiguration": "1s2...4p64d85s1",
   "Electron Configuration": "[Kr] 4d_ 5s_ *",
   "Valence Orbital Diagram": "5s: (_) 4d: (__)(__)(__)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "-0.0889",
   "Melting Point (°C)": "1964",
   "Melting Point (K)": "2237",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3695",
   "Boiling Point (K)": "3968",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "12.41",
   "Atomic Radius (pm)": "173",
   "Covalent Radius (pm)": 142,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "66.5 (Rh__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "380",
   "Bulk Modulus (GPa)": "160",
   "Shear Modulus (GPa)": "66",
   "Thermal Conductivity (W/m·K)": "68",
   "Specific Heat (J/g·K)": "0.236",
   "Heat of Fusion (kJ/mol)": "17.6",
   "Heat of Vaporization (kJ/mol)": "321",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "109.7",
   "Electronegativity (Pauling Scale)": "2.28",
   "1st Ionization Energy (kJ/mol)": "719.7",
   "Standard Electrode Potential (V)": "0.52",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "2.1 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Rh (FCC): a = 3.80 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.001",
   "Abundance (O | A | U)": "O: 0.3 ppt | U: 0.002 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.09",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 46,
   "Symbol": "Pd",
   "Name": "Palladium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 10,
   "Block": "d",
   "Discoverer": "William Hyde Wollaston",
   "Date": "1803",
   "Origin of Name (Etymology)": "Pallas, an asteroid",
   "Atomic Mass (amu)": "106.42",
   "Protons": 46,
   "Electrons (Neutral)": 46,
   "Neutrons": "60 (for ___Pd)",
   "Known Isotopes": "__Pd–___Pd",
   "Natural Isotopic Composition (%)": "___Pd (1.02%), ___Pd (11.14%), ___Pd (22.33%), ___Pd (27.33%), ___Pd (26.46%), ___Pd (11.72%)",
   "Isotopic Masses (amu)": "101.905609, 103.904036, 104.905085, 105.903486, 107.903892, 109.905153",
   "Electron Count in Ion(s)": "44 (Pd__), 42 (Pd__)",
   "Common Oxidation States": "+2, +4",
   "ElectronConfiguration": "1s2...4p64d10",
   "Electron Configuration": "[Kr] 4d__ *",
   "Valence Orbital Diagram": "5s: ( ) 4d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1554.9",
   "Melting Point (K)": "1828",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2963",
   "Boiling Point (K)": "3236",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "12.023",
   "Atomic Radius (pm)": "169",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "163",
   "Ionic Radius(es) (pm)": "86 (Pd__); 64 (Pd__)",
   "Mohs Hardness": "4.75",
   "Young's Modulus (GPa)": "121",
   "Bulk Modulus (GPa)": "180",
   "Shear Modulus (GPa)": "73",
   "Thermal Conductivity (W/m·K)": "86",
   "Specific Heat (J/g·K)": "0.218",
   "Heat of Fusion (kJ/mol)": "18",
   "Heat of Vaporization (kJ/mol)": "314",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "53.7",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "804.4",
   "Standard Electrode Potential (V)": "0.95",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (Noble metal)",
   "Electrical Conductivity (S/m @ 20°C)": "9.5 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pd (FCC): a = 3.89 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.015",
   "Abundance (O | A | U)": "O: 0.7 ppt | U: 0.001 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.47",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 47,
   "Symbol": "Ag",
   "Name": "Silver",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 11,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Anglo-Saxon: seolfor (silver)",
   "Atomic Mass (amu)": "107.87",
   "Protons": 47,
   "Electrons (Neutral)": 47,
   "Neutrons": "60 (for ___Ag)",
   "Known Isotopes": "__Ag–___Ag",
   "Natural Isotopic Composition (%)": "___Ag (51.839%), ___Ag (48.161%)",
   "Isotopic Masses (amu)": "106.905097, 108.904752",
   "Electron Count in Ion(s)": "46",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s2...4p64d105s1",
   "Electron Configuration": "[Kr] 4d__ 5s_ *",
   "Valence Orbital Diagram": "5s: (_) 4d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "-0.1135",
   "Melting Point (°C)": "1234.9",
   "Melting Point (K)": "2162",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2435",
   "Boiling Point (K)": "",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "10.49",
   "Atomic Radius (pm)": "165",
   "Covalent Radius (pm)": 145,
   "Van der Waals Radius (pm)": "172",
   "Ionic Radius(es) (pm)": "115 (Ag_)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "83",
   "Bulk Modulus (GPa)": "140",
   "Shear Modulus (GPa)": "46",
   "Thermal Conductivity (W/m·K)": "170",
   "Specific Heat (J/g·K)": "0.215",
   "Heat of Fusion (kJ/mol)": "16.1",
   "Heat of Vaporization (kJ/mol)": "275.6",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "125.6",
   "Electronegativity (Pauling Scale)": "1.93",
   "1st Ionization Energy (kJ/mol)": "731",
   "Standard Electrode Potential (V)": "0.8",
   "Acid/Base Behavior (if applicable)": "Weakly Basic",
   "Reactivity": "Low (Noble metal)",
   "Electrical Conductivity (S/m @ 20°C)": "6.1 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ag (FCC): a = 4.09 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.075",
   "Abundance (O | A | U)": "O: 0.5 ppt | U: 0.001 ppm",
   "Sources": "Argentite",
   "Toxicity": "Low (compounds)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10.27",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 48,
   "Symbol": "Cd",
   "Name": "Cadmium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 12,
   "Block": "d",
   "Discoverer": "Friedrich Stromeyer",
   "Date": "1817",
   "Origin of Name (Etymology)": "Latin: cadmia (calamine, a zinc ore)",
   "Atomic Mass (amu)": "112.41",
   "Protons": 48,
   "Electrons (Neutral)": 48,
   "Neutrons": "66 (for ___Cd)",
   "Known Isotopes": "__Cd–___Cd",
   "Natural Isotopic Composition (%)": "___Cd (1.25%), ___Cd (0.89%), ___Cd (12.49%), ___Cd (12.80%), ___Cd (24.13%), ___Cd (12.22%), ___Cd (28.73%), ___Cd (7.49%)",
   "Isotopic Masses (amu)": "105.906459, 107.904183, 109.903002, 110.904177, 111.902757, 112.904401, 113.903358, 115.904756",
   "Electron Count in Ion(s)": "46",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s2...4p64d105s2",
   "Electron Configuration": "[Kr] 4d__ 5s_",
   "Valence Orbital Diagram": "5s: (__) 4d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "321.1",
   "Melting Point (K)": "594.2",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "767",
   "Boiling Point (K)": "1040",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.65",
   "Atomic Radius (pm)": "161",
   "Covalent Radius (pm)": 144,
   "Van der Waals Radius (pm)": "158",
   "Ionic Radius(es) (pm)": "95 (Cd__)",
   "Mohs Hardness": "2",
   "Young's Modulus (GPa)": "50",
   "Bulk Modulus (GPa)": "77",
   "Shear Modulus (GPa)": "30",
   "Thermal Conductivity (W/m·K)": "64",
   "Specific Heat (J/g·K)": "0.2",
   "Heat of Fusion (kJ/mol)": "16.7",
   "Heat of Vaporization (kJ/mol)": "179.5",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.69",
   "1st Ionization Energy (kJ/mol)": "867.8",
   "Standard Electrode Potential (V)": "-0.34",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.4 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cd (HCP): a = 2.98, c = 5.62 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.159",
   "Abundance (O | A | U)": "O: 0.03 ppm | U: 0.003 ppm",
   "Sources": "Sphalerite",
   "Toxicity": "Very High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "13",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 49,
   "Symbol": "In",
   "Name": "Indium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 13,
   "Block": "p",
   "Discoverer": "Reich & Richter",
   "Date": "1863",
   "Origin of Name (Etymology)": "Latin: indicum (indigo color)",
   "Atomic Mass (amu)": "114.82",
   "Protons": 49,
   "Electrons (Neutral)": 49,
   "Neutrons": "66 (for ___In)",
   "Known Isotopes": "__In–___In",
   "Natural Isotopic Composition (%)": "___In (4.29%), ___In (95.71%)",
   "Isotopic Masses (amu)": "112.904058, 114.903878",
   "Electron Count in Ion(s)": "46 (In__), 48 (In_)",
   "Common Oxidation States": "+3, +1",
   "ElectronConfiguration": "1s2...4d105s25p1",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (_)( )( )",
   "DotStructure": "•In• (3 dots)",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "5.541",
   "Melting Point (°C)": "156.6",
   "Melting Point (K)": "429.7",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2072",
   "Boiling Point (K)": "2345",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.31",
   "Atomic Radius (pm)": "156",
   "Covalent Radius (pm)": 142,
   "Van der Waals Radius (pm)": "193",
   "Ionic Radius(es) (pm)": "80 (In__)",
   "Mohs Hardness": "1.2",
   "Young's Modulus (GPa)": "11",
   "Bulk Modulus (GPa)": "40",
   "Shear Modulus (GPa)": "16",
   "Thermal Conductivity (W/m·K)": "46",
   "Specific Heat (J/g·K)": "0.246",
   "Heat of Fusion (kJ/mol)": "7.58",
   "Heat of Vaporization (kJ/mol)": "227.1",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "37",
   "Electronegativity (Pauling Scale)": "1.78",
   "1st Ionization Energy (kJ/mol)": "558.3",
   "Standard Electrode Potential (V)": "-0.32",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "1.2 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Tetragonal",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "In (Tetragonal): a = 3.25, c = 4.95 (α=β=γ=90°)",
   "Space Group": "I4/mmm",
   "Abundance (Earth's Crust, ppm)": "0.25",
   "Abundance (O | A | U)": "O: 0.06 ppb | U: 0.008 ppm",
   "Sources": "Sphalerite",
   "Toxicity": "High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "15.74",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 50,
   "Symbol": "Sn",
   "Name": "Tin",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 14,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Anglo-Saxon: tin",
   "Atomic Mass (amu)": "118.71",
   "Protons": 50,
   "Electrons (Neutral)": 50,
   "Neutrons": "70 (for ___Sn)",
   "Known Isotopes": "__Sn–___Sn",
   "Natural Isotopic Composition (%)": "___Sn (0.97%), ___Sn (0.66%), ___Sn (0.34%), ___Sn (14.54%), ___Sn (7.68%), ___Sn (24.22%), ___Sn (8.59%), ___Sn (32.58%), ___Sn (4.63%), ___Sn (5.79%)",
   "Isotopic Masses (amu)": "111.904818, 113.902779, 114.903342, 115.901744, 116.902953, 117.901606, 118.903309, 119.902196, 121.903439, 123.905273",
   "Electron Count in Ion(s)": "46 (Sn__), 48 (Sn__)",
   "Common Oxidation States": "+4, +2",
   "ElectronConfiguration": "1s2...4d105s25p2",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (_)(_)( )",
   "DotStructure": "•Sn• (4 dots)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "231.9",
   "Melting Point (K)": "505",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2602",
   "Boiling Point (K)": "2875",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.31",
   "Atomic Radius (pm)": "145",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "217",
   "Ionic Radius(es) (pm)": "69 (Sn__); 118 (Sn__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "50",
   "Bulk Modulus (GPa)": "44 (White)",
   "Shear Modulus (GPa)": "18 (White)",
   "Thermal Conductivity (W/m·K)": "39 (White)",
   "Specific Heat (J/g·K)": "0.228 (White)",
   "Heat of Fusion (kJ/mol)": "2.51",
   "Heat of Vaporization (kJ/mol)": "172.4",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "107.3",
   "Electronegativity (Pauling Scale)": "1.96",
   "1st Ionization Energy (kJ/mol)": "708.6",
   "Standard Electrode Potential (V)": "-0.14",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "9.1 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0.08 (Gray Sn)",
   "Crystal Structure (Solid)": "Tetragonal (White)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sn (White, Tetragonal): a = 5.83, c = 3.18 (α=β=γ=90°)",
   "Space Group": "I4_/amd",
   "Abundance (Earth's Crust, ppm)": "2.3",
   "Abundance (O | A | U)": "O: 0.07 ppm | U: 0.001 ppm",
   "Sources": "Cassiterite",
   "Toxicity": "Low",
   "Bio. Role": "Trace (debated)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "16.29 (White)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 51,
   "Symbol": "Sb",
   "Name": "Antimony",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 15,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Greek: anti (not) + monos (alone)",
   "Atomic Mass (amu)": "121.76",
   "Protons": 51,
   "Electrons (Neutral)": 51,
   "Neutrons": "70 (for ___Sb)",
   "Known Isotopes": "___Sb–___Sb",
   "Natural Isotopic Composition (%)": "___Sb (57.21%), ___Sb (42.79%)",
   "Isotopic Masses (amu)": "120.903815, 122.904214",
   "Electron Count in Ion(s)": "48 (Sb__), 46 (Sb__)",
   "Common Oxidation States": "+3, +5",
   "ElectronConfiguration": "1s2...4d105s25p3",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (_)(_)(_)",
   "DotStructure": "•Sb: (1 pair, 3 singles)",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "3.359",
   "Melting Point (°C)": "630.6",
   "Melting Point (K)": "903.7",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "1587",
   "Boiling Point (K)": "1860",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.697",
   "Atomic Radius (pm)": "133",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "206",
   "Ionic Radius(es) (pm)": "76 (Sb__); 60 (Sb__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "55",
   "Bulk Modulus (GPa)": "31",
   "Shear Modulus (GPa)": "12",
   "Thermal Conductivity (W/m·K)": "23",
   "Specific Heat (J/g·K)": "0.222",
   "Heat of Fusion (kJ/mol)": "10.9",
   "Heat of Vaporization (kJ/mol)": "180.7",
   "Color in Solid State": "Silvery-gray",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "101",
   "Electronegativity (Pauling Scale)": "2.05",
   "1st Ionization Energy (kJ/mol)": "834",
   "Standard Electrode Potential (V)": "0.2",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "2.9 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0.17",
   "Crystal Structure (Solid)": "Rhombohedral",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sb (Rhombohedral): a = 4.51, c = 11.27 (Hexagonal setting)",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "0.2",
   "Abundance (O | A | U)": "O: 0.2 ppb | U: 0.001 ppm",
   "Sources": "Stibnite",
   "Toxicity": "High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "18.19",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 52,
   "Symbol": "Te",
   "Name": "Tellurium",
   "Classification": "Metalloid",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 16,
   "Block": "p",
   "Discoverer": "Franz-Joseph Müller",
   "Date": "1782",
   "Origin of Name (Etymology)": "Latin: tellus (earth)",
   "Atomic Mass (amu)": "127.6",
   "Protons": 52,
   "Electrons (Neutral)": 52,
   "Neutrons": "78 (for ___Te)",
   "Known Isotopes": "___Te–___Te",
   "Natural Isotopic Composition (%)": "___Te (0.09%), ___Te (2.55%), ___Te (0.89%), ___Te (4.74%), ___Te (7.07%), ___Te (18.84%), ___Te (31.74%), ___Te (34.08%)",
   "Isotopic Masses (amu)": "119.90404, 121.903043, 122.904270, 123.902817, 124.904430, 125.903311, 127.904463, 129.906224",
   "Electron Count in Ion(s)": "54 (Te__), 48 (Te__), 46 (Te__)",
   "Common Oxidation States": "-2, +4, +6",
   "ElectronConfiguration": "1s2...4d105s25p4",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (__)(_)(_)",
   "DotStructure": ":Te• (2 pairs, 2 singles)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "449.5",
   "Melting Point (K)": "722.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "988",
   "Boiling Point (K)": "1261",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.24",
   "Atomic Radius (pm)": "123",
   "Covalent Radius (pm)": 138,
   "Van der Waals Radius (pm)": "206",
   "Ionic Radius(es) (pm)": "221 (Te__)",
   "Mohs Hardness": "2.25",
   "Young's Modulus (GPa)": "41",
   "Bulk Modulus (GPa)": "21",
   "Shear Modulus (GPa)": "8",
   "Thermal Conductivity (W/m·K)": "20",
   "Specific Heat (J/g·K)": "0.212",
   "Heat of Fusion (kJ/mol)": "11.2",
   "Heat of Vaporization (kJ/mol)": "100",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "190.2",
   "Electronegativity (Pauling Scale)": "2.1",
   "1st Ionization Energy (kJ/mol)": "869.3",
   "Standard Electrode Potential (V)": "-0.36",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "2.0 x 10^2 (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0.33",
   "Crystal Structure (Solid)": "Hexagonal",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Te (Trigonal): a = 4.46, c = 5.93 (α=β=90°, γ=120°)",
   "Space Group": "P3_21",
   "Abundance (Earth's Crust, ppm)": "0.001",
   "Abundance (O | A | U)": "O: 0.5 ppt | U: 0.001 ppm",
   "Sources": "Tellurides",
   "Toxicity": "High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "20.42",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 53,
   "Symbol": "I",
   "Name": "Iodine",
   "Classification": "Halogen",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 5,
   "Group": 17,
   "Block": "p",
   "Discoverer": "Bernard Courtois",
   "Date": "1811",
   "Origin of Name (Etymology)": "Greek: iodes (violet-colored)",
   "Atomic Mass (amu)": "126.9",
   "Protons": 53,
   "Electrons (Neutral)": 53,
   "Neutrons": "74 (for ___I)",
   "Known Isotopes": "___I–___I",
   "Natural Isotopic Composition (%)": "___I (100%)",
   "Isotopic Masses (amu)": "126.904473",
   "Electron Count in Ion(s)": "54 (I_), 52 (I_), 48 (I__), 46 (I__)",
   "Common Oxidation States": "-1, +1, +5, +7",
   "ElectronConfiguration": "1s2...4d105s25p5",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (__)(__)(_)",
   "DotStructure": ":I• (3 pairs, 1 single)",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "2.813",
   "Melting Point (°C)": "113.7",
   "Melting Point (K)": "386.8",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "184.3",
   "Boiling Point (K)": "457.4",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "4.933",
   "Atomic Radius (pm)": "115",
   "Covalent Radius (pm)": 139,
   "Van der Waals Radius (pm)": "198",
   "Ionic Radius(es) (pm)": "220 (I_)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "N/A",
   "Bulk Modulus (GPa)": "14 (Solid)",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "0.0565 (Gas)",
   "Specific Heat (J/g·K)": "0.138 (Solid)",
   "Heat of Fusion (kJ/mol)": "15.52 (I_)",
   "Heat of Vaporization (kJ/mol)": "41.57 (I_)",
   "Color in Solid State": "Dark violet",
   "Refractive Index": "1.001921 (Gas)",
   "Electron Affinity (kJ/mol)": "295.2",
   "Electronegativity (Pauling Scale)": "2.66",
   "1st Ionization Energy (kJ/mol)": "1008.4",
   "Standard Electrode Potential (V)": "0.54",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^{-7} (Semiconductor)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "1.3",
   "Crystal Structure (Solid)": "Orthorhombic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "I (Orthorhombic): a=7.15, b=4.67, c=9.79 (α=β=γ=90°)",
   "Space Group": "Cmca",
   "Abundance (Earth's Crust, ppm)": "0.45",
   "Abundance (O | A | U)": "O: 60 ppm | U: 0.001 ppm",
   "Sources": "Seawater (iodides)",
   "Toxicity": "Moderate (gas)",
   "Bio. Role": "Essential",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "25.72",
   "Vapor P. (Pa @ 25°C)": "16 (Solid)",
   "Solubility (in H₂O)": "Slightly"
},
 {
   "Z": 54,
   "Symbol": "Xe",
   "Name": "Xenon",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 5,
   "Group": 18,
   "Block": "p",
   "Discoverer": "Ramsay & Travers",
   "Date": "1898",
   "Origin of Name (Etymology)": "Greek: xenos (stranger)",
   "Atomic Mass (amu)": "131.29",
   "Protons": 54,
   "Electrons (Neutral)": 54,
   "Neutrons": "78 (for ___Xe)",
   "Known Isotopes": "___Xe–___Xe",
   "Natural Isotopic Composition (%)": "___Xe (0.095%), ___Xe (0.089%), ___Xe (1.910%), ___Xe (26.401%), ___Xe (4.071%), ___Xe (21.232%), ___Xe (26.909%), ___Xe (10.436%), ___Xe (8.857%)",
   "Isotopic Masses (amu)": "123.90589, 125.90429, 127.903531, 128.904779, 129.903508, 130.905082, 131.904153, 133.90539, 135.90722",
   "Electron Count in Ion(s)": "54 (Xe), 52 (Xe__), 50 (Xe__), 48 (Xe__)",
   "Common Oxidation States": "0, +2, +4, +6",
   "ElectronConfiguration": "1s2...4d105s25p6",
   "Electron Configuration": "[Kr] 4d__ 5s_ 5p_",
   "Valence Orbital Diagram": "5s: (__) 5p: (__)(__)(__)",
   "DotStructure": ":Xe: (4 pairs)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-111.8",
   "Melting Point (K)": "161.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-108",
   "Boiling Point (K)": "165.1",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.005894",
   "Atomic Radius (pm)": "108",
   "Covalent Radius (pm)": 140,
   "Van der Waals Radius (pm)": "216",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "3.8 (Solid)",
   "Shear Modulus (GPa)": "1.6 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.0057 (Gas)",
   "Specific Heat (J/g·K)": "0.158 (Gas)",
   "Heat of Fusion (kJ/mol)": "2.29",
   "Heat of Vaporization (kJ/mol)": "12.62",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.000702 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "2.6",
   "1st Ionization Energy (kJ/mol)": "1170.4",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Acidic",
   "Reactivity": "Very low",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Xe (FCC): a = 6.20 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.00003",
   "Abundance (O | A | U)": "O: 46 ppt | A: 87 ppb | U: 0.05 ppm",
   "Sources": "Atmosphere",
   "Toxicity": "Low (asphyxiant)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.4 (Gas)",
   "Vapor P. (Pa @ 25°C)": "N/A (Gas)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 55,
   "Symbol": "Cs",
   "Name": "Cesium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Bunsen & Kirchhoff",
   "Date": "1860",
   "Origin of Name (Etymology)": "Latin: caesius (sky blue)",
   "Atomic Mass (amu)": "132.91",
   "Protons": 55,
   "Electrons (Neutral)": 55,
   "Neutrons": "78 (for ___Cs)",
   "Known Isotopes": "___Cs–___Cs",
   "Natural Isotopic Composition (%)": "___Cs (100%)",
   "Isotopic Masses (amu)": "132.905452",
   "Electron Count in Ion(s)": "54",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s2...5p66s1",
   "Electron Configuration": "[Xe] 6s_",
   "Valence Orbital Diagram": "6s: (_)",
   "DotStructure": "Cs•",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "2.582",
   "Melting Point (°C)": "28.4",
   "Melting Point (K)": "301.5",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "671",
   "Boiling Point (K)": "944",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "1.93",
   "Atomic Radius (pm)": "298",
   "Covalent Radius (pm)": 244,
   "Van der Waals Radius (pm)": "343",
   "Ionic Radius(es) (pm)": "167 (Cs_)",
   "Mohs Hardness": "0.2",
   "Young's Modulus (GPa)": "1.7",
   "Bulk Modulus (GPa)": "2.2",
   "Shear Modulus (GPa)": "0.8",
   "Thermal Conductivity (W/m·K)": "36",
   "Specific Heat (J/g·K)": "0.241",
   "Heat of Fusion (kJ/mol)": "2.19",
   "Heat of Vaporization (kJ/mol)": "63.6",
   "Color in Solid State": "Silvery-gold",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "45.5",
   "Electronegativity (Pauling Scale)": "0.79",
   "1st Ionization Energy (kJ/mol)": "375.7",
   "Standard Electrode Potential (V)": "-2.92",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "5.0 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cs (BCC): a = 6.05 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "3",
   "Abundance (O | A | U)": "O: 0.33 ppm | U: 0.001 ppm",
   "Sources": "Pollucite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "70.96",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 56,
   "Symbol": "Ba",
   "Name": "Barium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Humphry Davy",
   "Date": "1808",
   "Origin of Name (Etymology)": "Greek: barys (heavy)",
   "Atomic Mass (amu)": "137.33",
   "Protons": 56,
   "Electrons (Neutral)": 56,
   "Neutrons": "82 (for ___Ba)",
   "Known Isotopes": "___Ba–___Ba",
   "Natural Isotopic Composition (%)": "___Ba (0.106%), ___Ba (0.101%), ___Ba (2.417%), ___Ba (6.592%), ___Ba (7.854%), ___Ba (11.232%), ___Ba (71.698%)",
   "Isotopic Masses (amu)": "129.90632, 131.90506, 133.904508, 134.905688, 135.904576, 136.905827, 137.905247",
   "Electron Count in Ion(s)": "54",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s2...5p66s2",
   "Electron Configuration": "[Xe] 6s_",
   "Valence Orbital Diagram": "6s: (__)",
   "DotStructure": "•Ba•",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "727",
   "Melting Point (K)": "1000",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1897",
   "Boiling Point (K)": "2170",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "3.51",
   "Atomic Radius (pm)": "253",
   "Covalent Radius (pm)": 215,
   "Van der Waals Radius (pm)": "268",
   "Ionic Radius(es) (pm)": "135 (Ba__)",
   "Mohs Hardness": "1.25",
   "Young's Modulus (GPa)": "13",
   "Bulk Modulus (GPa)": "9.6",
   "Shear Modulus (GPa)": "3.6",
   "Thermal Conductivity (W/m·K)": "18",
   "Specific Heat (J/g·K)": "0.198",
   "Heat of Fusion (kJ/mol)": "7.5",
   "Heat of Vaporization (kJ/mol)": "142",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "13.9",
   "Electronegativity (Pauling Scale)": "0.89",
   "1st Ionization Energy (kJ/mol)": "502.9",
   "Standard Electrode Potential (V)": "-2.92",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "2.9 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ba (BCC): a = 5.02 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "425",
   "Abundance (O | A | U)": "O: 8.5 ppm | U: 0.003 ppm",
   "Sources": "Barite, witherite",
   "Toxicity": "Moderate",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "38.16",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 57,
   "Symbol": "La",
   "Name": "Lanthanum",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Carl Gustaf Mosander",
   "Date": "1839",
   "Origin of Name (Etymology)": "Greek: lanthanein (to lie hidden)",
   "Atomic Mass (amu)": "138.91",
   "Protons": 57,
   "Electrons (Neutral)": 57,
   "Neutrons": "82 (for ___La)",
   "Known Isotopes": "___La–___La",
   "Natural Isotopic Composition (%)": "___La (0.090%), ___La (99.910%)",
   "Isotopic Masses (amu)": "137.90711, 138.906353",
   "Electron Count in Ion(s)": "54",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p65d16s2",
   "Electron Configuration": "[Xe] 5d_ 6s_ *",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "2.783",
   "Melting Point (°C)": "920",
   "Melting Point (K)": "1193",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3464",
   "Boiling Point (K)": "3737",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.162",
   "Atomic Radius (pm)": "240",
   "Covalent Radius (pm)": 207,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "103.2 (La__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "36.6",
   "Bulk Modulus (GPa)": "34",
   "Shear Modulus (GPa)": "18",
   "Thermal Conductivity (W/m·K)": "13",
   "Specific Heat (J/g·K)": "0.275",
   "Heat of Fusion (kJ/mol)": "8.8",
   "Heat of Vaporization (kJ/mol)": "289",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "48",
   "Electronegativity (Pauling Scale)": "1.1",
   "1st Ionization Energy (kJ/mol)": "538.1",
   "Standard Electrode Potential (V)": "-2.52",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.3 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "La (Double HCP): a = 3.77, c = 12.16 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "39",
   "Abundance (O | A | U)": "O: 2.5 ppt | U: 0.0003 ppm",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "22.15",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 58,
   "Symbol": "Ce",
   "Name": "Cerium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Berzelius & Hisinger",
   "Date": "1803",
   "Origin of Name (Etymology)": "Ceres, an asteroid",
   "Atomic Mass (amu)": "140.12",
   "Protons": 58,
   "Electrons (Neutral)": 58,
   "Neutrons": "82 (for ___Ce)",
   "Known Isotopes": "___Ce–___Ce",
   "Natural Isotopic Composition (%)": "___Ce (0.185%), ___Ce (0.251%), ___Ce (88.450%), ___Ce (11.114%)",
   "Isotopic Masses (amu)": "135.90717, 137.90599, 139.905438, 141.90924",
   "Electron Count in Ion(s)": "55 (Ce__), 54 (Ce__)",
   "Common Oxidation States": "+3, +4",
   "ElectronConfiguration": "1s2...5p64f15d16s2",
   "Electron Configuration": "[Xe] 4f_ 5d_ 6s_ *",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)( )( )( )( ) 4f: (_)( )( )( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "798",
   "Melting Point (K)": "1071",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3443",
   "Boiling Point (K)": "3716",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.77",
   "Atomic Radius (pm)": "235",
   "Covalent Radius (pm)": 204,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "101 (Ce__); 87 (Ce__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "33.6",
   "Bulk Modulus (GPa)": "30",
   "Shear Modulus (GPa)": "14",
   "Thermal Conductivity (W/m·K)": "14",
   "Specific Heat (J/g·K)": "0.244",
   "Heat of Fusion (kJ/mol)": "11.4",
   "Heat of Vaporization (kJ/mol)": "337",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.12",
   "1st Ionization Energy (kJ/mol)": "534.4",
   "Standard Electrode Potential (V)": "-2.52",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.4 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ce (FCC): a = 5.16 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "66.5",
   "Abundance (O | A | U)": "O: 2.8 ppt | U: 0.0003 ppm",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "20.59",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 59,
   "Symbol": "Pr",
   "Name": "Praseodymium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Carl Auer von Welsbach",
   "Date": "1885",
   "Origin of Name (Etymology)": "Greek: prasios (green) + didymos (twin)",
   "Atomic Mass (amu)": "140.91",
   "Protons": 59,
   "Electrons (Neutral)": 59,
   "Neutrons": "82 (for ___Pr)",
   "Known Isotopes": "___Pr–___Pr",
   "Natural Isotopic Composition (%)": "___Pr (100%)",
   "Isotopic Masses (amu)": "140.907653",
   "Electron Count in Ion(s)": "56 (Pr__), 55 (Pr__)",
   "Common Oxidation States": "+3, +4",
   "ElectronConfiguration": "1s2...5p64f36s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (_)(_)(_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "4.136",
   "Melting Point (°C)": "931",
   "Melting Point (K)": "1204",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3520",
   "Boiling Point (K)": "3793",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.77",
   "Atomic Radius (pm)": "239",
   "Covalent Radius (pm)": 203,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "99 (Pr__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "37.3",
   "Bulk Modulus (GPa)": "32",
   "Shear Modulus (GPa)": "17",
   "Thermal Conductivity (W/m·K)": "14",
   "Specific Heat (J/g·K)": "0.237",
   "Heat of Fusion (kJ/mol)": "10.3",
   "Heat of Vaporization (kJ/mol)": "316",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.13",
   "1st Ionization Energy (kJ/mol)": "527",
   "Standard Electrode Potential (V)": "-2.51",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.4 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pr (Double HCP): a = 3.67, c = 11.83 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "9.2",
   "Abundance (O | A | U)": "O: 0.63 ppt | U: 0.0001 ppm",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "20.8",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 60,
   "Symbol": "Nd",
   "Name": "Neodymium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Carl Auer von Welsbach",
   "Date": "1885",
   "Origin of Name (Etymology)": "Greek: neos (new) + didymos (twin)",
   "Atomic Mass (amu)": "144.24",
   "Protons": 60,
   "Electrons (Neutral)": 60,
   "Neutrons": "84 (for ___Nd)",
   "Known Isotopes": "___Nd–___Nd",
   "Natural Isotopic Composition (%)": "___Nd (27.2%), ___Nd (12.2%), ___Nd (23.8%), ___Nd (8.3%), ___Nd (17.2%), ___Nd (5.7%), ___Nd (5.6%)",
   "Isotopic Masses (amu)": "141.907723, 142.909814, 143.910087, 144.912573, 145.913116, 147.916893, 149.92089",
   "Electron Count in Ion(s)": "57",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f46s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (_)(_)(_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1021",
   "Melting Point (K)": "1294",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3074",
   "Boiling Point (K)": "3347",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.01",
   "Atomic Radius (pm)": "229",
   "Covalent Radius (pm)": 201,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "98.3 (Nd__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "41.4",
   "Bulk Modulus (GPa)": "38",
   "Shear Modulus (GPa)": "21",
   "Thermal Conductivity (W/m·K)": "13",
   "Specific Heat (J/g·K)": "0.23",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "302",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.14",
   "1st Ionization Energy (kJ/mol)": "533.1",
   "Standard Electrode Potential (V)": "-2.48",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.6 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Nd (Double HCP): a = 3.66, c = 11.80 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "41.5",
   "Abundance (O | A | U)": "O: 1.2 ppt | U: 0.0004 ppm",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "20.79",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 61,
   "Symbol": "Pm",
   "Name": "Promethium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Marinsky, Glendenin, Coryell",
   "Date": "1945",
   "Origin of Name (Etymology)": "Prometheus, a Greek Titan",
   "Atomic Mass (amu)": "[145]",
   "Protons": 61,
   "Electrons (Neutral)": 61,
   "Neutrons": "84 (for ___Pm)",
   "Known Isotopes": "___Pm–___Pm",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[145]",
   "Electron Count in Ion(s)": "58",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f56s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (_)(_)(_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "±2.6",
   "Melting Point (°C)": "1042",
   "Melting Point (K)": "1315",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3000",
   "Boiling Point (K)": "3273",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.26",
   "Atomic Radius (pm)": "226",
   "Covalent Radius (pm)": 199,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "97 (Pm__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "46",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.165",
   "Heat of Fusion (kJ/mol)": "7.9",
   "Heat of Vaporization (kJ/mol)": "280 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.13",
   "1st Ionization Energy (kJ/mol)": "536",
   "Standard Electrode Potential (V)": "-2.48",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.3 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pm (Double HCP): a = 3.65, c = 11.65 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "N/A (Synthetic)",
   "Toxicity": "Fission products",
   "Bio. Role": "High (Radiological)",
   "Radioactive?": "None",
   "Half-life": "Yes",
   "Molar Vol. (cm³/mol)": "___Pm: 17.7 y",
   "Vapor P. (Pa @ 25°C)": "20.53",
   "Solubility (in H₂O)": "Negligible"
},
 {
   "Z": 62,
   "Symbol": "Sm",
   "Name": "Samarium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Paul-Émile Lecoq",
   "Date": "1879",
   "Origin of Name (Etymology)": "Samarskite mineral (after V. Samarsky)",
   "Atomic Mass (amu)": "150.36",
   "Protons": 62,
   "Electrons (Neutral)": 62,
   "Neutrons": "90 (for ___Sm)",
   "Known Isotopes": "___Sm–___Sm",
   "Natural Isotopic Composition (%)": "___Sm (3.07%), ___Sm (14.99%), ___Sm (11.24%), ___Sm (13.82%), ___Sm (7.38%), ___Sm (26.75%), ___Sm (22.75%)",
   "Isotopic Masses (amu)": "143.91199, 146.914897, 147.914822, 148.917184, 149.917275, 151.919732, 153.92220",
   "Electron Count in Ion(s)": "59 (Sm__), 60 (Sm__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...5p64f66s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(_)(_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1072",
   "Melting Point (K)": "1345",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1794",
   "Boiling Point (K)": "2067",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.52",
   "Atomic Radius (pm)": "227",
   "Covalent Radius (pm)": 198,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "95.8 (Sm__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "49.7",
   "Bulk Modulus (GPa)": "37",
   "Shear Modulus (GPa)": "20",
   "Thermal Conductivity (W/m·K)": "13",
   "Specific Heat (J/g·K)": "0.229",
   "Heat of Fusion (kJ/mol)": "10.5",
   "Heat of Vaporization (kJ/mol)": "316",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.17",
   "1st Ionization Energy (kJ/mol)": "544.5",
   "Standard Electrode Potential (V)": "-2.47",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "9.6 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Rhombohedral",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sm (Rhombohedral): a = 3.62, c = 26.25 (Hexagonal setting)",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "7.05",
   "Abundance (O | A | U)": "O: 0.5 ppt | U: 0.0001 ppm",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "20",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 63,
   "Symbol": "Eu",
   "Name": "Europium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Eugène-Anatole Demarçay",
   "Date": "1901",
   "Origin of Name (Etymology)": "Europe",
   "Atomic Mass (amu)": "151.96",
   "Protons": 63,
   "Electrons (Neutral)": 63,
   "Neutrons": "90 (for ___Eu)",
   "Known Isotopes": "___Eu–___Eu",
   "Natural Isotopic Composition (%)": "___Eu (47.8%), ___Eu (52.2%)",
   "Isotopic Masses (amu)": "150.919850, 152.921230",
   "Electron Count in Ion(s)": "60 (Eu__), 61 (Eu__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...5p64f76s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (_)(_)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "1.533",
   "Melting Point (°C)": "822",
   "Melting Point (K)": "1095",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1529",
   "Boiling Point (K)": "1802",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "5.244",
   "Atomic Radius (pm)": "231",
   "Covalent Radius (pm)": 198,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "94.7 (Eu__); 117 (Eu__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "18.2",
   "Bulk Modulus (GPa)": "31",
   "Shear Modulus (GPa)": "13",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.18",
   "Heat of Fusion (kJ/mol)": "12.4",
   "Heat of Vaporization (kJ/mol)": "153",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.2",
   "1st Ionization Energy (kJ/mol)": "547.1",
   "Standard Electrode Potential (V)": "-2.46",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.1 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Eu (BCC): a = 4.58 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "2",
   "Abundance (O | A | U)": "O: 0.13 ppt | U: 40 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "28.98",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 64,
   "Symbol": "Gd",
   "Name": "Gadolinium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Jean de Marignac",
   "Date": "1880",
   "Origin of Name (Etymology)": "Johan Gadolin, a chemist",
   "Atomic Mass (amu)": "157.25",
   "Protons": 64,
   "Electrons (Neutral)": 64,
   "Neutrons": "96 (for ___Gd)",
   "Known Isotopes": "___Gd–___Gd",
   "Natural Isotopic Composition (%)": "___Gd (0.20%), ___Gd (2.18%), ___Gd (14.80%), ___Gd (20.47%), ___Gd (15.65%), ___Gd (24.84%), ___Gd (21.86%)",
   "Isotopic Masses (amu)": "151.91979, 153.920865, 154.922621, 155.922122, 156.923960, 157.924103, 159.92705",
   "Electron Count in Ion(s)": "61",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f75d16s2",
   "Electron Configuration": "[Xe] 4f_ 5d_ 6s_ *",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)( )( )( )( ) 4f: (_)(_)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1313",
   "Melting Point (K)": "1586",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3273",
   "Boiling Point (K)": "3546",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "7.9",
   "Atomic Radius (pm)": "234",
   "Covalent Radius (pm)": 196,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "93.8 (Gd__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "54.8",
   "Bulk Modulus (GPa)": "40",
   "Shear Modulus (GPa)": "21",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.227",
   "Heat of Fusion (kJ/mol)": "9.1",
   "Heat of Vaporization (kJ/mol)": "288",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.2",
   "1st Ionization Energy (kJ/mol)": "593.4",
   "Standard Electrode Potential (V)": "-2.44",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "7.7 x 10^5",
   "Magnetic Properties": "Ferromagnetic (below 20°C)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Gd (HCP): a = 3.64, c = 5.78 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "6.2",
   "Abundance (O | A | U)": "O: 0.5 ppt | U: 50 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "19.9",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 65,
   "Symbol": "Tb",
   "Name": "Terbium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Carl Gustaf Mosander",
   "Date": "1843",
   "Origin of Name (Etymology)": "Ytterby, a village in Sweden",
   "Atomic Mass (amu)": "158.93",
   "Protons": 65,
   "Electrons (Neutral)": 65,
   "Neutrons": "94 (for ___Tb)",
   "Known Isotopes": "___Tb–___Tb",
   "Natural Isotopic Composition (%)": "___Tb (100%)",
   "Isotopic Masses (amu)": "158.925347",
   "Electron Count in Ion(s)": "62 (Tb__), 61 (Tb__)",
   "Common Oxidation States": "+3, +4",
   "ElectronConfiguration": "1s2...5p64f96s2",
   "Electron Configuration": "[Xe] 4f_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.014",
   "Melting Point (°C)": "1356",
   "Melting Point (K)": "1629",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3230",
   "Boiling Point (K)": "3503",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.23",
   "Atomic Radius (pm)": "225",
   "Covalent Radius (pm)": 194,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "92.3 (Tb__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "55.7",
   "Bulk Modulus (GPa)": "38",
   "Shear Modulus (GPa)": "20",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.22",
   "Heat of Fusion (kJ/mol)": "9",
   "Heat of Vaporization (kJ/mol)": "284",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.1",
   "1st Ionization Energy (kJ/mol)": "565.8",
   "Standard Electrode Potential (V)": "-2.42",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "8.3 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Tb (HCP): a = 3.60, c = 5.69 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "1.2",
   "Abundance (O | A | U)": "O: 0.4 ppt | U: 30 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "19.34",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 66,
   "Symbol": "Dy",
   "Name": "Dysprosium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Paul-Émile Lecoq",
   "Date": "1886",
   "Origin of Name (Etymology)": "Greek: dysprositos (hard to get at)",
   "Atomic Mass (amu)": "162.5",
   "Protons": 66,
   "Electrons (Neutral)": 66,
   "Neutrons": "98 (for ___Dy)",
   "Known Isotopes": "___Dy–___Dy",
   "Natural Isotopic Composition (%)": "___Dy (0.06%), ___Dy (0.10%), ___Dy (2.34%), ___Dy (18.91%), ___Dy (25.51%), ___Dy (24.90%), ___Dy (28.18%)",
   "Isotopic Masses (amu)": "155.92528, 157.92440, 159.925197, 160.926933, 161.926798, 162.928731, 163.929174",
   "Electron Count in Ion(s)": "63",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f106s2",
   "Electron Configuration": "[Xe] 4f__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(__)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1412",
   "Melting Point (K)": "1685",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2567",
   "Boiling Point (K)": "2840",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.54",
   "Atomic Radius (pm)": "228",
   "Covalent Radius (pm)": 192,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "91.2 (Dy__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "61.4",
   "Bulk Modulus (GPa)": "38",
   "Shear Modulus (GPa)": "21",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.207",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "293",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.22",
   "1st Ionization Energy (kJ/mol)": "573",
   "Standard Electrode Potential (V)": "-2.41",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "9.1 x 10^5",
   "Magnetic Properties": "Ferromagnetic (below 88K)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Dy (HCP): a = 3.59, c = 5.65 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "5.2",
   "Abundance (O | A | U)": "O: 0.2 ppt | U: 30 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "19.1",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 67,
   "Symbol": "Ho",
   "Name": "Holmium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Per Teodor Cleve",
   "Date": "1878",
   "Origin of Name (Etymology)": "Latin: Holmia (Stockholm)",
   "Atomic Mass (amu)": "164.93",
   "Protons": 67,
   "Electrons (Neutral)": 67,
   "Neutrons": "98 (for ___Ho)",
   "Known Isotopes": "___Ho–___Ho",
   "Natural Isotopic Composition (%)": "___Ho (100%)",
   "Isotopic Masses (amu)": "164.930322",
   "Electron Count in Ion(s)": "64",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f116s2",
   "Electron Configuration": "[Xe] 4f__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "4.173",
   "Melting Point (°C)": "1474",
   "Melting Point (K)": "1747",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2700",
   "Boiling Point (K)": "2973",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "8.79",
   "Atomic Radius (pm)": "226",
   "Covalent Radius (pm)": 192,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "90.1 (Ho__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "64.8",
   "Bulk Modulus (GPa)": "40",
   "Shear Modulus (GPa)": "21",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.197",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "282",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.23",
   "1st Ionization Energy (kJ/mol)": "581",
   "Standard Electrode Potential (V)": "-2.4",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "8.7 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ho (HCP): a = 3.58, c = 5.62 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "1.3",
   "Abundance (O | A | U)": "O: 0.09 ppt | U: 10 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "18.84",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 68,
   "Symbol": "Er",
   "Name": "Erbium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Carl Gustaf Mosander",
   "Date": "1843",
   "Origin of Name (Etymology)": "Ytterby, a village in Sweden",
   "Atomic Mass (amu)": "167.26",
   "Protons": 68,
   "Electrons (Neutral)": 68,
   "Neutrons": "98 (for ___Er)",
   "Known Isotopes": "___Er–___Er",
   "Natural Isotopic Composition (%)": "___Er (0.139%), ___Er (1.601%), ___Er (33.503%), ___Er (22.869%), ___Er (26.978%), ___Er (14.910%)",
   "Isotopic Masses (amu)": "161.92877, 163.92920, 165.930293, 166.931954, 167.932370, 169.935464",
   "Electron Count in Ion(s)": "65",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f126s2",
   "Electron Configuration": "[Xe] 4f__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(__)(__)(__)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1529",
   "Melting Point (K)": "1802",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2868",
   "Boiling Point (K)": "3141",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "9.066",
   "Atomic Radius (pm)": "226",
   "Covalent Radius (pm)": 189,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "89 (Er__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "69.9",
   "Bulk Modulus (GPa)": "41",
   "Shear Modulus (GPa)": "22",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.188",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "273",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.24",
   "1st Ionization Energy (kJ/mol)": "589.3",
   "Standard Electrode Potential (V)": "-2.39",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.1 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Er (HCP): a = 3.56, c = 5.59 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "3.5",
   "Abundance (O | A | U)": "O: 0.12 ppt | U: 20 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "18.74",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 69,
   "Symbol": "Tm",
   "Name": "Thulium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Per Teodor Cleve",
   "Date": "1879",
   "Origin of Name (Etymology)": "Thule, an ancient name for Scandinavia",
   "Atomic Mass (amu)": "168.93",
   "Protons": 69,
   "Electrons (Neutral)": 69,
   "Neutrons": "100 (for ___Tm)",
   "Known Isotopes": "___Tm–___Tm",
   "Natural Isotopic Composition (%)": "___Tm (100%)",
   "Isotopic Masses (amu)": "168.934213",
   "Electron Count in Ion(s)": "66 (Tm__), 67 (Tm__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...5p64f136s2",
   "Electron Configuration": "[Xe] 4f__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(__)(__)(__)(__)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "-0.2316",
   "Melting Point (°C)": "1545",
   "Melting Point (K)": "1818",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1950",
   "Boiling Point (K)": "2223",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "9.32",
   "Atomic Radius (pm)": "222",
   "Covalent Radius (pm)": 190,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "88 (Tm__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "74",
   "Bulk Modulus (GPa)": "44",
   "Shear Modulus (GPa)": "23",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.18",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "273",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.25",
   "1st Ionization Energy (kJ/mol)": "596.7",
   "Standard Electrode Potential (V)": "-2.38",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.5 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Tm (HCP): a = 3.54, c = 5.55 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.52",
   "Abundance (O | A | U)": "O: 0.02 ppt | U: 10 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "18.44",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 70,
   "Symbol": "Yb",
   "Name": "Ytterbium",
   "Classification": "Lanthanide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Jean de Marignac",
   "Date": "1878",
   "Origin of Name (Etymology)": "Ytterby, a village in Sweden",
   "Atomic Mass (amu)": "173.05",
   "Protons": 70,
   "Electrons (Neutral)": 70,
   "Neutrons": "104 (for ___Yb)",
   "Known Isotopes": "___Yb–___Yb",
   "Natural Isotopic Composition (%)": "___Yb (0.123%), ___Yb (3.015%), ___Yb (14.086%), ___Yb (21.684%), ___Yb (16.103%), ___Yb (32.024%), ___Yb (12.965%)",
   "Isotopic Masses (amu)": "167.93389, 169.93476, 170.936325, 171.936381, 172.938210, 173.938862, 175.94257",
   "Electron Count in Ion(s)": "67 (Yb__), 68 (Yb__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...5p64f146s2",
   "Electron Configuration": "[Xe] 4f__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 4f: (__)(__)(__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "824",
   "Melting Point (K)": "1097",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1196",
   "Boiling Point (K)": "1469",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "6.9",
   "Atomic Radius (pm)": "222",
   "Covalent Radius (pm)": 187,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "86.8 (Yb__); 102 (Yb__)",
   "Mohs Hardness": "1.25",
   "Young's Modulus (GPa)": "23.9",
   "Bulk Modulus (GPa)": "25",
   "Shear Modulus (GPa)": "10",
   "Thermal Conductivity (W/m·K)": "13",
   "Specific Heat (J/g·K)": "0.168",
   "Heat of Fusion (kJ/mol)": "9.1",
   "Heat of Vaporization (kJ/mol)": "159",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.1",
   "1st Ionization Energy (kJ/mol)": "603.4",
   "Standard Electrode Potential (V)": "-2.37",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "3.6 x 10^6",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Yb (FCC): a = 5.49 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "3.2",
   "Abundance (O | A | U)": "O: 0.03 ppt | U: 20 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "24.84",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 71,
   "Symbol": "Lu",
   "Name": "Lutetium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 3,
   "Block": "d",
   "Discoverer": "Urbain & von Welsbach",
   "Date": "1907",
   "Origin of Name (Etymology)": "Lutetia, an ancient name for Paris",
   "Atomic Mass (amu)": "174.97",
   "Protons": 71,
   "Electrons (Neutral)": 71,
   "Neutrons": "104 (for ___Lu)",
   "Known Isotopes": "___Lu–___Lu",
   "Natural Isotopic Composition (%)": "___Lu (97.41%), ___Lu (2.59%)",
   "Isotopic Masses (amu)": "174.940771, 175.942686",
   "Electron Count in Ion(s)": "68",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5p64f145d16s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_ *",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "2.232",
   "Melting Point (°C)": "1663",
   "Melting Point (K)": "1936",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3402",
   "Boiling Point (K)": "3675",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "9.841",
   "Atomic Radius (pm)": "217",
   "Covalent Radius (pm)": 187,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "86.1 (Lu__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "68.6",
   "Bulk Modulus (GPa)": "46",
   "Shear Modulus (GPa)": "23",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.165",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "274",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50",
   "Electronegativity (Pauling Scale)": "1.27",
   "1st Ionization Energy (kJ/mol)": "523.5",
   "Standard Electrode Potential (V)": "-2.36",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.8 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Lu (HCP): a = 3.50, c = 5.55 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.8",
   "Abundance (O | A | U)": "O: 0.02 ppt | U: 10 ppt",
   "Sources": "Bastnäsite, monazite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "17.8",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 72,
   "Symbol": "Hf",
   "Name": "Hafnium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 4,
   "Block": "d",
   "Discoverer": "Coster & de Hevesy",
   "Date": "1923",
   "Origin of Name (Etymology)": "Latin: Hafnia (Copenhagen)",
   "Atomic Mass (amu)": "178.49",
   "Protons": 72,
   "Electrons (Neutral)": 72,
   "Neutrons": "108 (for ___Hf)",
   "Known Isotopes": "___Hf–___Hf",
   "Natural Isotopic Composition (%)": "___Hf (0.16%), ___Hf (5.26%), ___Hf (18.60%), ___Hf (27.28%), ___Hf (13.62%), ___Hf (35.08%)",
   "Isotopic Masses (amu)": "173.94004, 175.94140, 176.943220, 177.943698, 178.945816, 179.946550",
   "Electron Count in Ion(s)": "68",
   "Common Oxidation States": "4",
   "ElectronConfiguration": "1s2...4f145d26s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "2233",
   "Melting Point (K)": "2506",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4603",
   "Boiling Point (K)": "4876",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "13.31",
   "Atomic Radius (pm)": "208",
   "Covalent Radius (pm)": 175,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "71 (Hf__)",
   "Mohs Hardness": "5.5",
   "Young's Modulus (GPa)": "78",
   "Bulk Modulus (GPa)": "140",
   "Shear Modulus (GPa)": "56",
   "Thermal Conductivity (W/m·K)": "63",
   "Specific Heat (J/g·K)": "0.232",
   "Heat of Fusion (kJ/mol)": "19.2",
   "Heat of Vaporization (kJ/mol)": "413",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "0",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "658.5",
   "Standard Electrode Potential (V)": "-2.25",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "3.1 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Hf (HCP): a = 3.19, c = 5.05 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "3",
   "Abundance (O | A | U)": "O: 0.2 ppt | U: 0.03 ppm",
   "Sources": "Zircon",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "13.44",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 73,
   "Symbol": "Ta",
   "Name": "Tantalum",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 5,
   "Block": "d",
   "Discoverer": "Anders Gustaf Ekeberg",
   "Date": "1802",
   "Origin of Name (Etymology)": "Tantalus, a Greek mythological figure",
   "Atomic Mass (amu)": "180.95",
   "Protons": 73,
   "Electrons (Neutral)": 73,
   "Neutrons": "108 (for ___Ta)",
   "Known Isotopes": "___Ta–___Ta",
   "Natural Isotopic Composition (%)": "___Ta (0.012%), ___Ta (99.988%)",
   "Isotopic Masses (amu)": "179.947464, 180.947995",
   "Electron Count in Ion(s)": "68",
   "Common Oxidation States": "5",
   "ElectronConfiguration": "1s2...4f145d36s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jul",
   "Magnetic Moment (μ/μN​)": "2.37",
   "Melting Point (°C)": "3017",
   "Melting Point (K)": "3290",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "5458",
   "Boiling Point (K)": "5731",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "16.69",
   "Atomic Radius (pm)": "200",
   "Covalent Radius (pm)": 170,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "64 (Ta__)",
   "Mohs Hardness": "6.5",
   "Young's Modulus (GPa)": "186",
   "Bulk Modulus (GPa)": "210",
   "Shear Modulus (GPa)": "83",
   "Thermal Conductivity (W/m·K)": "110",
   "Specific Heat (J/g·K)": "0.201",
   "Heat of Fusion (kJ/mol)": "35.4",
   "Heat of Vaporization (kJ/mol)": "468",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "31",
   "Electronegativity (Pauling Scale)": "1.5",
   "1st Ionization Energy (kJ/mol)": "761",
   "Standard Electrode Potential (V)": "-1.1",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "7.9 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ta (BCC): a = 3.31 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "2",
   "Abundance (O | A | U)": "O: 0.2 ppt | U: 0.01 ppm",
   "Sources": "Tantalite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10.83",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 74,
   "Symbol": "W",
   "Name": "Tungsten",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 6,
   "Block": "d",
   "Discoverer": "Fausto & Juan José Elhuyar",
   "Date": "1783",
   "Origin of Name (Etymology)": "Swedish: tung (heavy) + sten (stone)",
   "Atomic Mass (amu)": "183.84",
   "Protons": 74,
   "Electrons (Neutral)": 74,
   "Neutrons": "110 (for ___W)",
   "Known Isotopes": "___W–___W",
   "Natural Isotopic Composition (%)": "___W (0.12%), ___W (26.50%), ___W (14.31%), ___W (30.64%), ___W (28.43%)",
   "Isotopic Masses (amu)": "179.94670, 181.948204, 182.950223, 183.950931, 185.954364",
   "Electron Count in Ion(s)": "68 (W__), 70 (W__)",
   "Common Oxidation States": "+6, +4",
   "ElectronConfiguration": "1s2...4f145d46s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)(_)(_)(_)( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "3422",
   "Melting Point (K)": "3695",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "5555",
   "Boiling Point (K)": "5828",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "19.25",
   "Atomic Radius (pm)": "193",
   "Covalent Radius (pm)": 162,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "60 (W__)",
   "Mohs Hardness": "7.5",
   "Young's Modulus (GPa)": "411",
   "Bulk Modulus (GPa)": "320",
   "Shear Modulus (GPa)": "120",
   "Thermal Conductivity (W/m·K)": "190",
   "Specific Heat (J/g·K)": "0.176",
   "Heat of Fusion (kJ/mol)": "34",
   "Heat of Vaporization (kJ/mol)": "506",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "78.6",
   "Electronegativity (Pauling Scale)": "2.36",
   "1st Ionization Energy (kJ/mol)": "770",
   "Standard Electrode Potential (V)": "-0.31",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "1.9 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "W (BCC): a = 3.16 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "1.3",
   "Abundance (O | A | U)": "O: 1 ppb | U: 0.05 ppm",
   "Sources": "Wolframite, scheelite",
   "Toxicity": "Low",
   "Bio. Role": "Trace (debated)",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.47",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 75,
   "Symbol": "Re",
   "Name": "Rhenium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 7,
   "Block": "d",
   "Discoverer": "Noddack, Tacke, Berg",
   "Date": "1925",
   "Origin of Name (Etymology)": "Latin: Rhenus (the Rhine river)",
   "Atomic Mass (amu)": "186.21",
   "Protons": 75,
   "Electrons (Neutral)": 75,
   "Neutrons": "112 (for ___Re)",
   "Known Isotopes": "___Re–___Re",
   "Natural Isotopic Composition (%)": "___Re (37.40%), ___Re (62.60%)",
   "Isotopic Masses (amu)": "184.952955, 186.955753",
   "Electron Count in Ion(s)": "71 (Re__), 68 (Re__), 69 (Re__)",
   "Common Oxidation States": "+4, +7, +6",
   "ElectronConfiguration": "1s2...4f145d56s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "3.187",
   "Melting Point (°C)": "3186",
   "Melting Point (K)": "3459",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "5596",
   "Boiling Point (K)": "5869",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "21.02",
   "Atomic Radius (pm)": "188",
   "Covalent Radius (pm)": 151,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "53 (Re__)",
   "Mohs Hardness": "7",
   "Young's Modulus (GPa)": "463",
   "Bulk Modulus (GPa)": "320",
   "Shear Modulus (GPa)": "130",
   "Thermal Conductivity (W/m·K)": "140",
   "Specific Heat (J/g·K)": "0.15",
   "Heat of Fusion (kJ/mol)": "33",
   "Heat of Vaporization (kJ/mol)": "545",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "14.5",
   "Electronegativity (Pauling Scale)": "1.9",
   "1st Ionization Energy (kJ/mol)": "760",
   "Standard Electrode Potential (V)": "-0.2",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "5.6 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Re (HCP): a = 2.76, c = 4.46 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.0007",
   "Abundance (O | A | U)": "O: 1 ppt | U: 0.007 ppm",
   "Sources": "Molybdenite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "8.85",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 76,
   "Symbol": "Os",
   "Name": "Osmium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 8,
   "Block": "d",
   "Discoverer": "Smithson Tennant",
   "Date": "1803",
   "Origin of Name (Etymology)": "Greek: osme (a smell, odor)",
   "Atomic Mass (amu)": "190.23",
   "Protons": 76,
   "Electrons (Neutral)": 76,
   "Neutrons": "116 (for ___Os)",
   "Known Isotopes": "___Os–___Os",
   "Natural Isotopic Composition (%)": "___Os (0.02%), ___Os (1.59%), ___Os (1.96%), ___Os (13.24%), ___Os (16.15%), ___Os (26.26%), ___Os (40.78%)",
   "Isotopic Masses (amu)": "183.95248, 185.95383, 186.955750, 187.955838, 188.958147, 189.958447, 191.961480",
   "Electron Count in Ion(s)": "72 (Os__), 73 (Os__), 68 (Os__)",
   "Common Oxidation States": "+4, +3, +8",
   "ElectronConfiguration": "1s2...4f145d66s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (__)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "3033",
   "Melting Point (K)": "3306",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "5012",
   "Boiling Point (K)": "5285",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "22.59",
   "Atomic Radius (pm)": "185",
   "Covalent Radius (pm)": 144,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "63 (Os__)",
   "Mohs Hardness": "7",
   "Young's Modulus (GPa)": "550",
   "Bulk Modulus (GPa)": "350",
   "Shear Modulus (GPa)": "150",
   "Thermal Conductivity (W/m·K)": "130",
   "Specific Heat (J/g·K)": "0.139",
   "Heat of Fusion (kJ/mol)": "32",
   "Heat of Vaporization (kJ/mol)": "558",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "106.1",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "840",
   "Standard Electrode Potential (V)": "0.79",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "1.2 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Os (HCP): a = 2.74, c = 4.32 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.002",
   "Abundance (O | A | U)": "O: 0.4 ppt | U: 0.002 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "8.43",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 77,
   "Symbol": "Ir",
   "Name": "Iridium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 9,
   "Block": "d",
   "Discoverer": "Smithson Tennant",
   "Date": "1803",
   "Origin of Name (Etymology)": "Greek: iris (rainbow)",
   "Atomic Mass (amu)": "192.22",
   "Protons": 77,
   "Electrons (Neutral)": 77,
   "Neutrons": "116 (for ___Ir)",
   "Known Isotopes": "___Ir–___Ir",
   "Natural Isotopic Composition (%)": "___Ir (37.3%), ___Ir (62.7%)",
   "Isotopic Masses (amu)": "190.960594, 192.962926",
   "Electron Count in Ion(s)": "73 (Ir__), 74 (Ir__)",
   "Common Oxidation States": "+4, +3",
   "ElectronConfiguration": "1s2...4f145d76s2",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "0.1593",
   "Melting Point (°C)": "2446",
   "Melting Point (K)": "2719",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4428",
   "Boiling Point (K)": "4701",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "22.56",
   "Atomic Radius (pm)": "180",
   "Covalent Radius (pm)": 141,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "68 (Ir__); 62.5 (Ir__)",
   "Mohs Hardness": "6.5",
   "Young's Modulus (GPa)": "528",
   "Bulk Modulus (GPa)": "380",
   "Shear Modulus (GPa)": "160",
   "Thermal Conductivity (W/m·K)": "72",
   "Specific Heat (J/g·K)": "0.13",
   "Heat of Fusion (kJ/mol)": "28.1",
   "Heat of Vaporization (kJ/mol)": "566",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "151",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "880",
   "Standard Electrode Potential (V)": "0.85",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (passivates)",
   "Electrical Conductivity (S/m @ 20°C)": "2.0 x 10^7",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ir (FCC): a = 3.84 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.001",
   "Abundance (O | A | U)": "O: 1.5 ppt | U: 0.001 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "8.54",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 78,
   "Symbol": "Pt",
   "Name": "Platinum",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 10,
   "Block": "d",
   "Discoverer": "Antonio de Ulloa",
   "Date": "1735",
   "Origin of Name (Etymology)": "Spanish: platina (little silver)",
   "Atomic Mass (amu)": "195.08",
   "Protons": 78,
   "Electrons (Neutral)": 78,
   "Neutrons": "117 (for ___Pt)",
   "Known Isotopes": "___Pt–___Pt",
   "Natural Isotopic Composition (%)": "___Pt (0.014%), ___Pt (0.782%), ___Pt (32.967%), ___Pt (33.832%), ___Pt (25.242%), ___Pt (7.163%)",
   "Isotopic Masses (amu)": "189.95993, 191.96103, 193.962680, 194.964791, 195.964951, 197.96789",
   "Electron Count in Ion(s)": "74 (Pt__), 76 (Pt__)",
   "Common Oxidation States": "+4, +2",
   "ElectronConfiguration": "1s2...4f145d96s1",
   "Electron Configuration": "[Xe] 4f__ 5d_ 6s_ *",
   "Valence Orbital Diagram": "6s: (_) 5d: (__)(__)(__)(__)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1768.3",
   "Melting Point (K)": "2041.4",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3825",
   "Boiling Point (K)": "4098",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "21.45",
   "Atomic Radius (pm)": "177",
   "Covalent Radius (pm)": 136,
   "Van der Waals Radius (pm)": "175",
   "Ionic Radius(es) (pm)": "80 (Pt__); 62.5 (Pt__)",
   "Mohs Hardness": "3.5",
   "Young's Modulus (GPa)": "168",
   "Bulk Modulus (GPa)": "290",
   "Shear Modulus (GPa)": "110",
   "Thermal Conductivity (W/m·K)": "72",
   "Specific Heat (J/g·K)": "0.128",
   "Heat of Fusion (kJ/mol)": "29.3",
   "Heat of Vaporization (kJ/mol)": "575",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "205.1",
   "Electronegativity (Pauling Scale)": "2.28",
   "1st Ionization Energy (kJ/mol)": "870",
   "Standard Electrode Potential (V)": "1.18",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (Noble metal)",
   "Electrical Conductivity (S/m @ 20°C)": "9.4 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pt (FCC): a = 3.92 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.005",
   "Abundance (O | A | U)": "O: 0.5 ppt | U: 0.001 ppm",
   "Sources": "Platinum ores",
   "Toxicity": "Low (compounds)",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "9.09",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 79,
   "Symbol": "Au",
   "Name": "Gold",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 11,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Anglo-Saxon: gold",
   "Atomic Mass (amu)": "196.97",
   "Protons": 79,
   "Electrons (Neutral)": 79,
   "Neutrons": "118 (for ___Au)",
   "Known Isotopes": "___Au–___Au",
   "Natural Isotopic Composition (%)": "___Au (100%)",
   "Isotopic Masses (amu)": "196.966569",
   "Electron Count in Ion(s)": "76 (Au__), 78 (Au_)",
   "Common Oxidation States": "+3, +1",
   "ElectronConfiguration": "1s2...4f145d106s1",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ *",
   "Valence Orbital Diagram": "6s: (_) 5d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "0.1457",
   "Melting Point (°C)": "1064.2",
   "Melting Point (K)": "1337.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "2856",
   "Boiling Point (K)": "3129",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "19.3",
   "Atomic Radius (pm)": "174",
   "Covalent Radius (pm)": 136,
   "Van der Waals Radius (pm)": "166",
   "Ionic Radius(es) (pm)": "137 (Au_); 93 (Au__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "78",
   "Bulk Modulus (GPa)": "270",
   "Shear Modulus (GPa)": "100",
   "Thermal Conductivity (W/m·K)": "210",
   "Specific Heat (J/g·K)": "0.124",
   "Heat of Fusion (kJ/mol)": "29.2",
   "Heat of Vaporization (kJ/mol)": "599",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "222.8",
   "Electronegativity (Pauling Scale)": "2.54",
   "1st Ionization Energy (kJ/mol)": "890.1",
   "Standard Electrode Potential (V)": "1.52",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low (Noble metal)",
   "Electrical Conductivity (S/m @ 20°C)": "4.5 x 10^7",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Au (FCC): a = 4.08 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "0.004",
   "Abundance (O | A | U)": "O: 0.4 ppt | U: 0.001 ppm",
   "Sources": "Native gold",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "10.21",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 80,
   "Symbol": "Hg",
   "Name": "Mercury",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Liquid",
   "Period": 6,
   "Group": 12,
   "Block": "d",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Mercury, the Roman god",
   "Atomic Mass (amu)": "200.59",
   "Protons": 80,
   "Electrons (Neutral)": 80,
   "Neutrons": "122 (for ___Hg)",
   "Known Isotopes": "___Hg–___Hg",
   "Natural Isotopic Composition (%)": "___Hg (0.15%), ___Hg (9.97%), ___Hg (16.87%), ___Hg (23.10%), ___Hg (13.18%), ___Hg (29.86%), ___Hg (6.87%)",
   "Isotopic Masses (amu)": "195.96583, 197.966769, 198.968279, 199.968326, 200.970302, 201.970643, 203.973493",
   "Electron Count in Ion(s)": "78 (Hg__), 79 (in Hg___)",
   "Common Oxidation States": "+2, +1",
   "ElectronConfiguration": "1s2...4f145d106s2",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_",
   "Valence Orbital Diagram": "6s: (__) 5d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-38.8",
   "Melting Point (K)": "234.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "356.7",
   "Boiling Point (K)": "629.8",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "13.534",
   "Atomic Radius (pm)": "171",
   "Covalent Radius (pm)": 132,
   "Van der Waals Radius (pm)": "155",
   "Ionic Radius(es) (pm)": "102 (Hg__)",
   "Mohs Hardness": "N/A (Liquid)",
   "Young's Modulus (GPa)": "N/A (Liquid)",
   "Bulk Modulus (GPa)": "25",
   "Shear Modulus (GPa)": "11",
   "Thermal Conductivity (W/m·K)": "54 (Liquid)",
   "Specific Heat (J/g·K)": "0.147 (Liquid)",
   "Heat of Fusion (kJ/mol)": "2.30 (Liquid)",
   "Heat of Vaporization (kJ/mol)": "59.3",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "2",
   "1st Ionization Energy (kJ/mol)": "1007.1",
   "Standard Electrode Potential (V)": "0.85",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "1.0 x 10^6 (Liquid)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Rhombohedral (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Hg (Rhombohedral): a = 2.99, _ = 70.74°",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "0.085",
   "Abundance (O | A | U)": "O: 4 ppt | A: <1 ng/m_",
   "Sources": "Cinnabar",
   "Toxicity": "Very High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "14.72",
   "Vapor P. (Pa @ 25°C)": "0.33 (Liquid)",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 81,
   "Symbol": "Tl",
   "Name": "Thallium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 13,
   "Block": "p",
   "Discoverer": "William Crookes",
   "Date": "1861",
   "Origin of Name (Etymology)": "Greek: thallos (a green twig)",
   "Atomic Mass (amu)": "204.38",
   "Protons": 81,
   "Electrons (Neutral)": 81,
   "Neutrons": "124 (for ___Tl)",
   "Known Isotopes": "___Tl–___Tl",
   "Natural Isotopic Composition (%)": "___Tl (29.524%), ___Tl (70.476%)",
   "Isotopic Masses (amu)": "202.972344, 204.974427",
   "Electron Count in Ion(s)": "80 (Tl_), 78 (Tl__)",
   "Common Oxidation States": "+1, +3",
   "ElectronConfiguration": "1s2...4f145d106s26p1",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (_)( )( )",
   "DotStructure": "•Tl• (3 dots)",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "1.627",
   "Melting Point (°C)": "577",
   "Melting Point (K)": "1473",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1746",
   "Boiling Point (K)": "",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "11.85",
   "Atomic Radius (pm)": "156",
   "Covalent Radius (pm)": 145,
   "Van der Waals Radius (pm)": "196",
   "Ionic Radius(es) (pm)": "150 (Tl_); 88.5 (Tl__)",
   "Mohs Hardness": "1.25",
   "Young's Modulus (GPa)": "8",
   "Bulk Modulus (GPa)": "31",
   "Shear Modulus (GPa)": "13",
   "Thermal Conductivity (W/m·K)": "28",
   "Specific Heat (J/g·K)": "0.155",
   "Heat of Fusion (kJ/mol)": "6.8",
   "Heat of Vaporization (kJ/mol)": "163",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "36.4",
   "Electronegativity (Pauling Scale)": "1.62",
   "1st Ionization Energy (kJ/mol)": "589.4",
   "Standard Electrode Potential (V)": "-0.34",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "6.7 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Tl (HCP): a = 3.46, c = 5.53 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "0.85",
   "Abundance (O | A | U)": "O: 0.02 ppb | U: 0.008 ppm",
   "Sources": "Lorandite",
   "Toxicity": "Very High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "17.22",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 82,
   "Symbol": "Pb",
   "Name": "Lead",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 14,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "Anglo-Saxon: lead",
   "Atomic Mass (amu)": "207.2",
   "Protons": 82,
   "Electrons (Neutral)": 82,
   "Neutrons": "126 (for ___Pb)",
   "Known Isotopes": "___Pb–___Pb",
   "Natural Isotopic Composition (%)": "___Pb (1.4%), ___Pb (24.1%), ___Pb (22.1%), ___Pb (52.4%)",
   "Isotopic Masses (amu)": "203.973043, 205.974465, 206.975896, 207.976652",
   "Electron Count in Ion(s)": "80 (Pb__), 78 (Pb__)",
   "Common Oxidation States": "+2, +4",
   "ElectronConfiguration": "1s2...4f145d106s26p2",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (_)(_)( )",
   "DotStructure": "•Pb• (4 dots)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "327.5",
   "Melting Point (K)": "600.6",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1749",
   "Boiling Point (K)": "2022",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "11.34",
   "Atomic Radius (pm)": "154",
   "Covalent Radius (pm)": 146,
   "Van der Waals Radius (pm)": "202",
   "Ionic Radius(es) (pm)": "119 (Pb__); 77.5 (Pb__)",
   "Mohs Hardness": "1.5",
   "Young's Modulus (GPa)": "16",
   "Bulk Modulus (GPa)": "43",
   "Shear Modulus (GPa)": "17",
   "Thermal Conductivity (W/m·K)": "18",
   "Specific Heat (J/g·K)": "0.15",
   "Heat of Fusion (kJ/mol)": "5.2",
   "Heat of Vaporization (kJ/mol)": "169",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "34.4",
   "Electronegativity (Pauling Scale)": "1.87",
   "1st Ionization Energy (kJ/mol)": "715.6",
   "Standard Electrode Potential (V)": "-0.13",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "4.8 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pb (FCC): a = 4.95 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "14",
   "Abundance (O | A | U)": "O: 30 ppt | U: 0.009 ppm",
   "Sources": "Galena",
   "Toxicity": "High",
   "Bio. Role": "None",
   "Radioactive?": "No",
   "Half-life": "Stable",
   "Molar Vol. (cm³/mol)": "18.26",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 83,
   "Symbol": "Bi",
   "Name": "Bismuth",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 15,
   "Block": "p",
   "Discoverer": "Ancient",
   "Date": "Ancient",
   "Origin of Name (Etymology)": "German: wismut (white mass)",
   "Atomic Mass (amu)": "208.98",
   "Protons": 83,
   "Electrons (Neutral)": 83,
   "Neutrons": "126 (for ___Bi)",
   "Known Isotopes": "___Bi–___Bi",
   "Natural Isotopic Composition (%)": "___Bi (100%)",
   "Isotopic Masses (amu)": "208.980399",
   "Electron Count in Ion(s)": "80 (Bi__), 78 (Bi__)",
   "Common Oxidation States": "+3, +5",
   "ElectronConfiguration": "1s2...4f145d106s26p3",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (_)(_)(_)",
   "DotStructure": "•Bi: (1 pair, 3 singles)",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "4.11",
   "Melting Point (°C)": "271.4",
   "Melting Point (K)": "544.5",
   "Melting Point Pressure Dependency": "Decreases",
   "Boiling Point (°C)": "1564",
   "Boiling Point (K)": "1837",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "9.78",
   "Atomic Radius (pm)": "143",
   "Covalent Radius (pm)": 148,
   "Van der Waals Radius (pm)": "207",
   "Ionic Radius(es) (pm)": "103 (Bi__); 76 (Bi__)",
   "Mohs Hardness": "2.25",
   "Young's Modulus (GPa)": "32",
   "Bulk Modulus (GPa)": "29",
   "Shear Modulus (GPa)": "10",
   "Thermal Conductivity (W/m·K)": "12",
   "Specific Heat (J/g·K)": "0.142",
   "Heat of Fusion (kJ/mol)": "10",
   "Heat of Vaporization (kJ/mol)": "177",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "90.9",
   "Electronegativity (Pauling Scale)": "2.02",
   "1st Ionization Energy (kJ/mol)": "703",
   "Standard Electrode Potential (V)": "0.32",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Moderate",
   "Electrical Conductivity (S/m @ 20°C)": "8.7 x 10^5",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "0 (Semimetal)",
   "Crystal Structure (Solid)": "Rhombohedral",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Bi (Rhombohedral): a = 4.75, c = 11.86 (Hexagonal setting)",
   "Space Group": "R-3m",
   "Abundance (Earth's Crust, ppm)": "0.009",
   "Abundance (O | A | U)": "O: 20 ppt | U: 0.0001 ppm",
   "Sources": "Bismuthinite",
   "Toxicity": "Low",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Bi: 2.01_10__ y",
   "Molar Vol. (cm³/mol)": "21.31",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 84,
   "Symbol": "Po",
   "Name": "Polonium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 16,
   "Block": "p",
   "Discoverer": "Marie Curie",
   "Date": "1898",
   "Origin of Name (Etymology)": "Poland, Marie Curie's homeland",
   "Atomic Mass (amu)": "[209]",
   "Protons": 84,
   "Electrons (Neutral)": 84,
   "Neutrons": "125 (for ___Po)",
   "Known Isotopes": "___Po–___Po",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[209]",
   "Electron Count in Ion(s)": "80 (Po__), 82 (Po__)",
   "Common Oxidation States": "+4, +2",
   "ElectronConfiguration": "1s2...4f145d106s26p4",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (__)(_)(_)",
   "DotStructure": ":Po• (2 pairs, 2 singles)",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "0.706",
   "Melting Point (°C)": "254",
   "Melting Point (K)": "527",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "962",
   "Boiling Point (K)": "1235",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "9.196",
   "Atomic Radius (pm)": "135",
   "Covalent Radius (pm)": 140,
   "Van der Waals Radius (pm)": "197",
   "Ionic Radius(es) (pm)": "94 (Po__)",
   "Mohs Hardness": "2",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "1.8",
   "Specific Heat (J/g·K)": "0.13",
   "Heat of Fusion (kJ/mol)": "12.1",
   "Heat of Vaporization (kJ/mol)": "134.5",
   "Color in Solid State": "Gray/Metallic",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "136",
   "Electronegativity (Pauling Scale)": "2",
   "1st Ionization Energy (kJ/mol)": "812.1",
   "Standard Electrode Potential (V)": "+0.70 (approx)",
   "Acid/Base Behavior (if applicable)": "Amphoteric",
   "Reactivity": "Low",
   "Electrical Conductivity (S/m @ 20°C)": "2.5 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "0 (Metal)",
   "Crystal Structure (Solid)": "Cubic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Po (_-Cubic): a = 3.37 (α=β=γ=90°)",
   "Space Group": "Pm-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Po: 125 y",
   "Molar Vol. (cm³/mol)": "22.97",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 85,
   "Symbol": "At",
   "Name": "Astatine",
   "Classification": "Halogen (or Metalloid)",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 6,
   "Group": 17,
   "Block": "p",
   "Discoverer": "Corson, MacKenzie, Segrè",
   "Date": "1940",
   "Origin of Name (Etymology)": "Greek: astatos (unstable)",
   "Atomic Mass (amu)": "[210]",
   "Protons": 85,
   "Electrons (Neutral)": 85,
   "Neutrons": "125 (for ___At)",
   "Known Isotopes": "___At–___At",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[210]",
   "Electron Count in Ion(s)": "86 (At_), 84 (At_), 80 (At__)",
   "Common Oxidation States": "-1, +1, +5",
   "ElectronConfiguration": "1s2...4f145d106s26p5",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (__)(__)(_)",
   "DotStructure": ":At• (3 pairs, 1 single)",
   "Nuclear Spin (I)": "-5",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "302",
   "Melting Point (K)": "575",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "337",
   "Boiling Point (K)": "610",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "~7",
   "Atomic Radius (pm)": "127",
   "Covalent Radius (pm)": 150,
   "Van der Waals Radius (pm)": "202",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "1.5",
   "Specific Heat (J/g·K)": "0.12 (est.)",
   "Heat of Fusion (kJ/mol)": "N/A",
   "Heat of Vaporization (kJ/mol)": "N/A",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "233",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "887.7",
   "Standard Electrode Potential (V)": "+1.0 (approx)",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "3.3 x 10^4 (Predicted)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Unknown",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "At (Predicted FCC): a = 6.82 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___At: 8.1 h",
   "Molar Vol. (cm³/mol)": "20 (est.)",
   "Vapor P. (Pa @ 25°C)": "N/A",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 86,
   "Symbol": "Rn",
   "Name": "Radon",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas",
   "Period": 6,
   "Group": 18,
   "Block": "p",
   "Discoverer": "Friedrich Ernst Dorn",
   "Date": "1900",
   "Origin of Name (Etymology)": "From \"Radium\" (as it's a decay product)",
   "Atomic Mass (amu)": "[222]",
   "Protons": 86,
   "Electrons (Neutral)": 86,
   "Neutrons": "136 (for ___Rn)",
   "Known Isotopes": "___Rn–___Rn",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[222]",
   "Electron Count in Ion(s)": "86 (Rn), 84 (Rn__)",
   "Common Oxidation States": "0, +2",
   "ElectronConfiguration": "1s2...4f145d106s26p6",
   "Electron Configuration": "[Xe] 4f__ 5d__ 6s_ 6p_",
   "Valence Orbital Diagram": "6s: (__) 6p: (__)(__)(__)",
   "DotStructure": ":Rn: (4 pairs)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "-71",
   "Melting Point (K)": "202",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "-61.7",
   "Boiling Point (K)": "211.4",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "0.00973",
   "Atomic Radius (pm)": "120",
   "Covalent Radius (pm)": 150,
   "Van der Waals Radius (pm)": "220",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas)",
   "Young's Modulus (GPa)": "N/A (Gas)",
   "Bulk Modulus (GPa)": "4.6 (Solid)",
   "Shear Modulus (GPa)": "1.8 (Solid)",
   "Thermal Conductivity (W/m·K)": "0.005 (Gas)",
   "Specific Heat (J/g·K)": "0.094 (Gas)",
   "Heat of Fusion (kJ/mol)": "2.89",
   "Heat of Vaporization (kJ/mol)": "16.4",
   "Color in Solid State": "Colorless",
   "Refractive Index": "1.00121 (Gas)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "2.2",
   "1st Ionization Energy (kJ/mol)": "1037",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "Very low",
   "Electrical Conductivity (S/m @ 20°C)": "Insulator (Gas)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Solid)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Rn (FCC): a = 7.27 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "A: 1.8x10___ ppm",
   "Toxicity": "Uranium ores (trace)",
   "Bio. Role": "High (Radiological)",
   "Radioactive?": "None",
   "Half-life": "Yes",
   "Molar Vol. (cm³/mol)": "___Rn: 3.82 d",
   "Vapor P. (Pa @ 25°C)": "22.4 (Gas)",
   "Solubility (in H₂O)": "N/A (Gas)"
},
 {
   "Z": 87,
   "Symbol": "Fr",
   "Name": "Francium",
   "Classification": "Alkali Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 1,
   "Block": "s",
   "Discoverer": "Marguerite Perey",
   "Date": "1939",
   "Origin of Name (Etymology)": "France",
   "Atomic Mass (amu)": "[223]",
   "Protons": 87,
   "Electrons (Neutral)": 87,
   "Neutrons": "136 (for ___Fr)",
   "Known Isotopes": "___Fr–___Fr",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[223]",
   "Electron Count in Ion(s)": "86",
   "Common Oxidation States": "1",
   "ElectronConfiguration": "1s2...6p67s1",
   "Electron Configuration": "[Rn] 7s_",
   "Valence Orbital Diagram": "7s: (_)",
   "DotStructure": "Fr•",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "1.103",
   "Melting Point (°C)": "27",
   "Melting Point (K)": "300",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "677",
   "Boiling Point (K)": "950",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "~1.87",
   "Atomic Radius (pm)": "(Predicted: 348)",
   "Covalent Radius (pm)": 260,
   "Van der Waals Radius (pm)": "348",
   "Ionic Radius(es) (pm)": "180 (Fr_)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "30 (est.)",
   "Specific Heat (J/g·K)": "0.12 (est.)",
   "Heat of Fusion (kJ/mol)": "5 (est.)",
   "Heat of Vaporization (kJ/mol)": "62 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "44",
   "Electronegativity (Pauling Scale)": "0.7",
   "1st Ionization Energy (kJ/mol)": "380",
   "Standard Electrode Potential (V)": "-2.9 (approx)",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Extremely high",
   "Electrical Conductivity (S/m @ 20°C)": "3.3 x 10^6 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Fr (Predicted BCC): a = 6.50 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Fr: 22 min",
   "Molar Vol. (cm³/mol)": "71 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 88,
   "Symbol": "Ra",
   "Name": "Radium",
   "Classification": "Alkaline Earth Metal",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 2,
   "Block": "s",
   "Discoverer": "Pierre & Marie Curie",
   "Date": "1898",
   "Origin of Name (Etymology)": "Latin: radius (ray)",
   "Atomic Mass (amu)": "[226]",
   "Protons": 88,
   "Electrons (Neutral)": 88,
   "Neutrons": "138 (for ___Ra)",
   "Known Isotopes": "___Ra–___Ra",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[226]",
   "Electron Count in Ion(s)": "86",
   "Common Oxidation States": "2",
   "ElectronConfiguration": "1s2...6p67s2",
   "Electron Configuration": "[Rn] 7s_",
   "Valence Orbital Diagram": "7s: (__)",
   "DotStructure": "•Ra•",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "700",
   "Melting Point (K)": "973",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "1737",
   "Boiling Point (K)": "2010",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "5.5",
   "Atomic Radius (pm)": "260",
   "Covalent Radius (pm)": 221,
   "Van der Waals Radius (pm)": "283",
   "Ionic Radius(es) (pm)": "148 (Ra__)",
   "Mohs Hardness": "1.25",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "16",
   "Shear Modulus (GPa)": "6.1",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.12 (est.)",
   "Heat of Fusion (kJ/mol)": "9.0 (est.)",
   "Heat of Vaporization (kJ/mol)": "154 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "9.6",
   "Electronegativity (Pauling Scale)": "0.9",
   "1st Ionization Energy (kJ/mol)": "509.3",
   "Standard Electrode Potential (V)": "-2.9",
   "Acid/Base Behavior (if applicable)": "Strongly Basic",
   "Reactivity": "Very high",
   "Electrical Conductivity (S/m @ 20°C)": "5.6 x 10^6 (Predicted)",
   "Magnetic Properties": "Diamagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ra (BCC): a = 5.15 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Ra: 1600 y",
   "Molar Vol. (cm³/mol)": "45",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Reacts"
},
 {
   "Z": 89,
   "Symbol": "Ac",
   "Name": "Actinium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "André-Louis Debierne",
   "Date": "1899",
   "Origin of Name (Etymology)": "Greek: aktis (ray, beam)",
   "Atomic Mass (amu)": "[227]",
   "Protons": 89,
   "Electrons (Neutral)": 89,
   "Neutrons": "138 (for ___Ac)",
   "Known Isotopes": "___Ac–___Ac",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[227]",
   "Electron Count in Ion(s)": "86",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...6p66d17s2",
   "Electron Configuration": "[Rn] 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "1.1",
   "Melting Point (°C)": "1051",
   "Melting Point (K)": "1324",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "3198",
   "Boiling Point (K)": "3471",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "10.07",
   "Atomic Radius (pm)": "247",
   "Covalent Radius (pm)": 215,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "112 (Ac__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.14",
   "Heat of Fusion (kJ/mol)": "10",
   "Heat of Vaporization (kJ/mol)": "304",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "33.7",
   "Electronegativity (Pauling Scale)": "1.1",
   "1st Ionization Energy (kJ/mol)": "499",
   "Standard Electrode Potential (V)": "-2.5",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "1.7 x 10^6 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Ac (FCC): a = 5.31 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Ac: 21.77 y",
   "Molar Vol. (cm³/mol)": "22.55",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 90,
   "Symbol": "Th",
   "Name": "Thorium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Jöns Jacob Berzelius",
   "Date": "1828",
   "Origin of Name (Etymology)": "Thor, the Scandinavian god of war",
   "Atomic Mass (amu)": "232.04",
   "Protons": 90,
   "Electrons (Neutral)": 90,
   "Neutrons": "142 (for ___Th)",
   "Known Isotopes": "___Th–___Th",
   "Natural Isotopic Composition (%)": "___Th (100%) (Primordial)",
   "Isotopic Masses (amu)": "232.038055",
   "Electron Count in Ion(s)": "86",
   "Common Oxidation States": "4",
   "ElectronConfiguration": "1s2...6p66d27s2",
   "Electron Configuration": "[Rn] 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1750",
   "Melting Point (K)": "2023",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4788",
   "Boiling Point (K)": "5061",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "11.724",
   "Atomic Radius (pm)": "237",
   "Covalent Radius (pm)": 206,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "94 (Th__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "79",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.13",
   "Heat of Fusion (kJ/mol)": "13.5",
   "Heat of Vaporization (kJ/mol)": "350",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "112.7",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "587",
   "Standard Electrode Potential (V)": "-1.83",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "6.7 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Th (FCC): a = 5.08 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "9.6",
   "Abundance (O | A | U)": "O: 0.01 ppt | U: 0.01 ppm",
   "Sources": "Monazite",
   "Toxicity": "High (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Th: 1.405_10__ y",
   "Molar Vol. (cm³/mol)": "19.8",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 91,
   "Symbol": "Pa",
   "Name": "Protactinium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Hahn & Meitner",
   "Date": "1917",
   "Origin of Name (Etymology)": "Greek: protos (first) + actinium",
   "Atomic Mass (amu)": "231.04",
   "Protons": 91,
   "Electrons (Neutral)": 91,
   "Neutrons": "140 (for ___Pa)",
   "Known Isotopes": "___Pa–___Pa",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[231]",
   "Electron Count in Ion(s)": "86 (Pa__), 87 (Pa__)",
   "Common Oxidation States": "+5, +4",
   "ElectronConfiguration": "1s2...6p65f26d17s2",
   "Electron Configuration": "[Rn] 5f_ 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)( )( )( )( ) 5f: (_)(_)( )( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.01",
   "Melting Point (°C)": "1572",
   "Melting Point (K)": "1845",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4027",
   "Boiling Point (K)": "4300",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "15.37",
   "Atomic Radius (pm)": "233",
   "Covalent Radius (pm)": 200,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "90 (Pa__)",
   "Mohs Hardness": "5",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.12",
   "Heat of Fusion (kJ/mol)": "14.1",
   "Heat of Vaporization (kJ/mol)": "380",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "53",
   "Electronegativity (Pauling Scale)": "1.5",
   "1st Ionization Energy (kJ/mol)": "568",
   "Standard Electrode Potential (V)": "-1.66",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "5.6 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Tetragonal",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pa (Tetragonal): a = 3.92, c = 3.24 (α=β=γ=90°)",
   "Space Group": "I4/mmm",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Trace)",
   "Sources": "Uranium ores (trace)",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Pa: 32,760 y",
   "Molar Vol. (cm³/mol)": "15.18",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 92,
   "Symbol": "U",
   "Name": "Uranium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Martin Heinrich Klaproth",
   "Date": "1789",
   "Origin of Name (Etymology)": "Uranus, the planet",
   "Atomic Mass (amu)": "238.03",
   "Protons": 92,
   "Electrons (Neutral)": 92,
   "Neutrons": "146 (for ___U)",
   "Known Isotopes": "___U–___U",
   "Natural Isotopic Composition (%)": "___U (0.0055%), ___U (0.7204%), ___U (99.2741%)",
   "Isotopic Masses (amu)": "234.040952, 235.043929, 238.050788",
   "Electron Count in Ion(s)": "86 (U__), 88 (U__)",
   "Common Oxidation States": "+6, +4",
   "ElectronConfiguration": "1s2...6p65f36d17s2",
   "Electron Configuration": "[Rn] 5f_ 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)( )( )( )( ) 5f: (_)(_)(_)( )( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "1132.2",
   "Melting Point (K)": "1405.3",
   "Melting Point Pressure Dependency": "Increases",
   "Boiling Point (°C)": "4131",
   "Boiling Point (K)": "4404",
   "Boiling Point Pressure Dependency": "Increases",
   "Density (g/cm³)": "19.1",
   "Atomic Radius (pm)": "221",
   "Covalent Radius (pm)": 196,
   "Van der Waals Radius (pm)": "186",
   "Ionic Radius(es) (pm)": "102.5 (U__); 89 (U__); 76 (U__)",
   "Mohs Hardness": "6",
   "Young's Modulus (GPa)": "208",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "11",
   "Specific Heat (J/g·K)": "0.12",
   "Heat of Fusion (kJ/mol)": "12.6",
   "Heat of Vaporization (kJ/mol)": "180",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "50.9",
   "Electronegativity (Pauling Scale)": "1.38",
   "1st Ionization Energy (kJ/mol)": "597.6",
   "Standard Electrode Potential (V)": "-1.38",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "3.6 x 10^6",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Orthorhombic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "U (_-Orthorhombic): a=2.85, b=5.87, c=4.96 (α=β=γ=90°)",
   "Space Group": "Cmcm",
   "Abundance (Earth's Crust, ppm)": "2.7",
   "Abundance (O | A | U)": "O: 3.2 ppb | U: 0.0003 ppm",
   "Sources": "Uraninite (pitchblende)",
   "Toxicity": "High (Both)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___U: 4.468_10_ y",
   "Molar Vol. (cm³/mol)": "12.49",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 93,
   "Symbol": "Np",
   "Name": "Neptunium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Neptune, the planet",
   "Date": "",
   "Origin of Name (Etymology)": "",
   "Atomic Mass (amu)": "[237]",
   "Protons": 93,
   "Electrons (Neutral)": 93,
   "Neutrons": "144 (for ___Np)",
   "Known Isotopes": "___Np–___Np",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[237]",
   "Electron Count in Ion(s)": "88 (Np__), 89 (Np__), 87 (Np__)",
   "Common Oxidation States": "+5, +4, +6",
   "ElectronConfiguration": "1s2...6p65f46d17s2",
   "Electron Configuration": "[Rn] 5f_ 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)( )( )( )( ) 5f: (_)(_)(_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "3.3",
   "Melting Point (°C)": "639",
   "Melting Point (K)": "912",
   "Melting Point Pressure Dependency": "Decreases1",
   "Boiling Point (°C)": "3902",
   "Boiling Point (K)": "4175",
   "Boiling Point Pressure Dependency": "Increases2",
   "Density (g/cm³)": "20.45",
   "Atomic Radius (pm)": "221",
   "Covalent Radius (pm)": 190,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "101 (Np__); 87 (Np__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.14",
   "Heat of Fusion (kJ/mol)": "11.2",
   "Heat of Vaporization (kJ/mol)": "175",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "45.9",
   "Electronegativity (Pauling Scale)": "1.36",
   "1st Ionization Energy (kJ/mol)": "604.5",
   "Standard Electrode Potential (V)": "-1.31",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "8.3 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Orthorhombic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Np (_-Orthorhombic): a=6.66, b=4.72, c=4.89 (α=β=γ=90°)",
   "Space Group": "Pnma",
   "Abundance (Earth's Crust, ppm)": "",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Nuclear reactors",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Np: 2.144_10_ y",
   "Molar Vol. (cm³/mol)": "21.21",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 94,
   "Symbol": "Pu",
   "Name": "Plutonium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg, McMillan et al. (LBNL)",
   "Date": "1940",
   "Origin of Name (Etymology)": "Pluto, the dwarf planet",
   "Atomic Mass (amu)": "[244]",
   "Protons": 94,
   "Electrons (Neutral)": 94,
   "Neutrons": "150 (for ___Pu)",
   "Known Isotopes": "___Pu–___Pu",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[244]",
   "Electron Count in Ion(s)": "90 (Pu__), 91 (Pu__), 88 (Pu__)",
   "Common Oxidation States": "+4, +3, +6",
   "ElectronConfiguration": "1s2...6p65f67s2",
   "Electron Configuration": "[Rn] 5f_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(_)(_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "640",
   "Melting Point (K)": "913",
   "Melting Point Pressure Dependency": "Increases3",
   "Boiling Point (°C)": "3228",
   "Boiling Point (K)": "3501",
   "Boiling Point Pressure Dependency": "Increases4",
   "Density (g/cm³)": "19.816",
   "Atomic Radius (pm)": "221",
   "Covalent Radius (pm)": 187,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "100 (Pu__); 86 (Pu__)",
   "Mohs Hardness": "3.5",
   "Young's Modulus (GPa)": "96",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "10",
   "Specific Heat (J/g·K)": "0.13",
   "Heat of Fusion (kJ/mol)": "10.3",
   "Heat of Vaporization (kJ/mol)": "165",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.28",
   "1st Ionization Energy (kJ/mol)": "584.7",
   "Standard Electrode Potential (V)": "-1.3",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "6.7 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "Monoclinic",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Pu (_-Monoclinic): a=6.18, b=4.82, c=10.96, _=101.79°",
   "Space Group": "P2_/m",
   "Abundance (Earth's Crust, ppm)": "Trace",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Nuclear reactors",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Pu: 8.08_10_ y",
   "Molar Vol. (cm³/mol)": "12.29",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 95,
   "Symbol": "Am",
   "Name": "Americium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1944",
   "Origin of Name (Etymology)": "The Americas",
   "Atomic Mass (amu)": "[243]",
   "Protons": 95,
   "Electrons (Neutral)": 95,
   "Neutrons": "148 (for ___Am)",
   "Known Isotopes": "___Am–___Am",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[243]",
   "Electron Count in Ion(s)": "92 (Am__), 91 (Am__), 89 (Am__)",
   "Common Oxidation States": "+3, +4, +6",
   "ElectronConfiguration": "1s2...6p65f77s2",
   "Electron Configuration": "[Rn] 5f_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (_)(_)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-May",
   "Magnetic Moment (μ/μN​)": "1.6",
   "Melting Point (°C)": "1176",
   "Melting Point (K)": "1449",
   "Melting Point Pressure Dependency": "Increases5",
   "Boiling Point (°C)": "2011",
   "Boiling Point (K)": "2284",
   "Boiling Point Pressure Dependency": "Increases6",
   "Density (g/cm³)": "13.67",
   "Atomic Radius (pm)": "228",
   "Covalent Radius (pm)": 180,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "97.5 (Am__)",
   "Mohs Hardness": "2.5",
   "Young's Modulus (GPa)": "19",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "9",
   "Specific Heat (J/g·K)": "0.12",
   "Heat of Fusion (kJ/mol)": "10",
   "Heat of Vaporization (kJ/mol)": "158",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "9.9",
   "Electronegativity (Pauling Scale)": "1.13",
   "1st Ionization Energy (kJ/mol)": "578",
   "Standard Electrode Potential (V)": "-1.27",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "6.9 x 10^5",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Am (Double HCP): a = 3.47, c = 11.24 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Nuclear reactors",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Am: 7,370 y",
   "Molar Vol. (cm³/mol)": "17.86",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 96,
   "Symbol": "Cm",
   "Name": "Curium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1944",
   "Origin of Name (Etymology)": "Pierre and Marie Curie",
   "Atomic Mass (amu)": "[247]",
   "Protons": 96,
   "Electrons (Neutral)": 96,
   "Neutrons": "151 (for ___Cm)",
   "Known Isotopes": "___Cm–___Cm",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[247]",
   "Electron Count in Ion(s)": "93 (Cm__), 92 (Cm__)",
   "Common Oxidation States": "+3, +4",
   "ElectronConfiguration": "1s2...6p65f76d17s2",
   "Electron Configuration": "[Rn] 5f_ 6d_ 7s_ *",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)( )( )( )( ) 5f: (_)(_)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "0.47",
   "Melting Point (°C)": "1345",
   "Melting Point (K)": "1618",
   "Melting Point Pressure Dependency": "Increases7",
   "Boiling Point (°C)": "3110",
   "Boiling Point (K)": "3383",
   "Boiling Point Pressure Dependency": "Increases8",
   "Density (g/cm³)": "13.51",
   "Atomic Radius (pm)": "227",
   "Covalent Radius (pm)": 169,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "97 (Cm__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "9",
   "Specific Heat (J/g·K)": "0.14",
   "Heat of Fusion (kJ/mol)": "9.7",
   "Heat of Vaporization (kJ/mol)": "152",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "27.2",
   "Electronegativity (Pauling Scale)": "1.28",
   "1st Ionization Energy (kJ/mol)": "581",
   "Standard Electrode Potential (V)": "-1.2",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "5.6 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cm (Double HCP): a = 3.49, c = 11.33 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Nuclear reactors",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Cm: 1.56_10_ y",
   "Molar Vol. (cm³/mol)": "18.28",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 97,
   "Symbol": "Bk",
   "Name": "Berkelium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1949",
   "Origin of Name (Etymology)": "Berkeley, California (home of LBNL)",
   "Atomic Mass (amu)": "[247]",
   "Protons": 97,
   "Electrons (Neutral)": 97,
   "Neutrons": "150 (for ___Bk)",
   "Known Isotopes": "___Bk–___Bk",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[247]",
   "Electron Count in Ion(s)": "94 (Bk__), 93 (Bk__)",
   "Common Oxidation States": "+3, +4",
   "ElectronConfiguration": "1s2...6p65f97s2",
   "Electron Configuration": "[Rn] 5f_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Mar",
   "Magnetic Moment (μ/μN​)": "2.2",
   "Melting Point (°C)": "986",
   "Melting Point (K)": "1259",
   "Melting Point Pressure Dependency": "Increases9",
   "Boiling Point (°C)": "2627",
   "Boiling Point (K)": "2900",
   "Boiling Point Pressure Dependency": "Increases10",
   "Density (g/cm³)": "14.78",
   "Atomic Radius (pm)": "225",
   "Covalent Radius (pm)": 168,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "96 (Bk__); 83 (Bk__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "9",
   "Specific Heat (J/g·K)": "0.14",
   "Heat of Fusion (kJ/mol)": "9.4",
   "Heat of Vaporization (kJ/mol)": "142",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "601",
   "Standard Electrode Potential (V)": "-1.1",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "5.6 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Bk (Double HCP): a = 3.42, c = 11.07 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Bk: 1,380 y",
   "Molar Vol. (cm³/mol)": "16.8",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 98,
   "Symbol": "Cf",
   "Name": "Californium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1950",
   "Origin of Name (Etymology)": "California (state and university)",
   "Atomic Mass (amu)": "[251]",
   "Protons": 98,
   "Electrons (Neutral)": 98,
   "Neutrons": "153 (for ___Cf)",
   "Known Isotopes": "___Cf–___Cf",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[251]",
   "Electron Count in Ion(s)": "95 (Cf__), 96 (Cf__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...6p65f107s2",
   "Electron Configuration": "[Rn] 5f__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(__)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Jan",
   "Magnetic Moment (μ/μN​)": "-0.32",
   "Melting Point (°C)": "900",
   "Melting Point (K)": "1173",
   "Melting Point Pressure Dependency": "Increases11",
   "Boiling Point (°C)": "1472",
   "Boiling Point (K)": "1745",
   "Boiling Point Pressure Dependency": "Increases12",
   "Density (g/cm³)": "15.1",
   "Atomic Radius (pm)": "225",
   "Covalent Radius (pm)": 168,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "95 (Cf__)",
   "Mohs Hardness": "3",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "9",
   "Specific Heat (J/g·K)": "0.15",
   "Heat of Fusion (kJ/mol)": "9.2",
   "Heat of Vaporization (kJ/mol)": "134",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "15.6",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "608",
   "Standard Electrode Potential (V)": "-1",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "5.0 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Cf (Double HCP): a = 3.40, c = 11.02 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Cf: 900 y",
   "Molar Vol. (cm³/mol)": "16.5",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "Insoluble"
},
 {
   "Z": 99,
   "Symbol": "Es",
   "Name": "Einsteinium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1952",
   "Origin of Name (Etymology)": "Albert Einstein",
   "Atomic Mass (amu)": "[252]",
   "Protons": 99,
   "Electrons (Neutral)": 99,
   "Neutrons": "153 (for ___Es)",
   "Known Isotopes": "___Es–___Es",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[252]",
   "Electron Count in Ion(s)": "96 (Es__), 97 (Es__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...6p65f117s2",
   "Electron Configuration": "[Rn] 5f__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "-5",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "860",
   "Melting Point (K)": "1133",
   "Melting Point Pressure Dependency": "Increases13",
   "Boiling Point (°C)": "996",
   "Boiling Point (K)": "1269",
   "Boiling Point Pressure Dependency": "Increases14",
   "Density (g/cm³)": "8.84",
   "Atomic Radius (pm)": "226",
   "Covalent Radius (pm)": 165,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "94 (Es__)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "9.2 (est.)",
   "Heat of Vaporization (kJ/mol)": "126 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "28.5",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "619",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "5.0 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Es (Predicted FCC): a = 5.75 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Es: 471.7 d",
   "Molar Vol. (cm³/mol)": "18.6 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 100,
   "Symbol": "Fm",
   "Name": "Fermium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1952",
   "Origin of Name (Etymology)": "Enrico Fermi",
   "Atomic Mass (amu)": "[257]",
   "Protons": 100,
   "Electrons (Neutral)": 100,
   "Neutrons": "157 (for ___Fm)",
   "Known Isotopes": "___Fm–___Fm",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[257]",
   "Electron Count in Ion(s)": "97 (Fm__), 98 (Fm__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...6p65f127s2",
   "Electron Configuration": "[Rn] 5f__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(__)(__)(__)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "1527",
   "Melting Point (K)": "1800",
   "Melting Point Pressure Dependency": "Increases15",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Increases16",
   "Density (g/cm³)": "(Predicted: 9.7)",
   "Atomic Radius (pm)": "225",
   "Covalent Radius (pm)": 167,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "92 (Fm__)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "9.2 (est.)",
   "Heat of Vaporization (kJ/mol)": "117 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "33.9",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "627",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "4.5 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Fm (Predicted FCC): a = 5.70 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Fm: 100.5 d",
   "Molar Vol. (cm³/mol)": "19.8 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 101,
   "Symbol": "Md",
   "Name": "Mendelevium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "Seaborg et al. (LBNL)",
   "Date": "1955",
   "Origin of Name (Etymology)": "Dmitri Mendeleev",
   "Atomic Mass (amu)": "[258]",
   "Protons": 101,
   "Electrons (Neutral)": 101,
   "Neutrons": "157 (for ___Md)",
   "Known Isotopes": "___Md–___Md",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[258]",
   "Electron Count in Ion(s)": "98 (Md__), 99 (Md__)",
   "Common Oxidation States": "+3, +2",
   "ElectronConfiguration": "1s2...6p65f137s2",
   "Electron Configuration": "[Rn] 5f__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(__)(__)(__)(__)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "-8",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "827",
   "Melting Point (K)": "1100",
   "Melting Point Pressure Dependency": "Increases17",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Increases18",
   "Density (g/cm³)": "(Predicted: 10.3)",
   "Atomic Radius (pm)": "228",
   "Covalent Radius (pm)": 173,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "90 (Md__)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "9.2 (est.)",
   "Heat of Vaporization (kJ/mol)": "108 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "94.2",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "635",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "4.5 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Md (Predicted FCC): a = 5.65 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Md: 51.5 d",
   "Molar Vol. (cm³/mol)": "20.9 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 102,
   "Symbol": "No",
   "Name": "Nobelium",
   "Classification": "Actinide",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 3,
   "Block": "f",
   "Discoverer": "JINR (Dubna)",
   "Date": "1966",
   "Origin of Name (Etymology)": "Alfred Nobel",
   "Atomic Mass (amu)": "[259]",
   "Protons": 102,
   "Electrons (Neutral)": 102,
   "Neutrons": "157 (for ___No)",
   "Known Isotopes": "___No–___No",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[259]",
   "Electron Count in Ion(s)": "100 (No__), 99 (No__)",
   "Common Oxidation States": "+2, +3",
   "ElectronConfiguration": "1s2...6p65f147s2",
   "Electron Configuration": "[Rn] 5f__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 5f: (__)(__)(__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "2-Sep",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "827",
   "Melting Point (K)": "1100",
   "Melting Point Pressure Dependency": "Increases19",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Increases20",
   "Density (g/cm³)": "(Predicted: 9.9)",
   "Atomic Radius (pm)": "229",
   "Covalent Radius (pm)": 176,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "110 (No__); 89 (No__)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A",
   "Shear Modulus (GPa)": "N/A",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "9.2 (est.)",
   "Heat of Vaporization (kJ/mol)": "100 (est.)",
   "Color in Solid State": "Silvery-white",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.3",
   "1st Ionization Energy (kJ/mol)": "642",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "4.5 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "No (Predicted FCC): a = 5.65 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___No: 58 min",
   "Molar Vol. (cm³/mol)": "21.9 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 103,
   "Symbol": "Lr",
   "Name": "Lawrencium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 3,
   "Block": "d",
   "Discoverer": "LBNL & JINR",
   "Date": "1961",
   "Origin of Name (Etymology)": "Ernest Lawrence",
   "Atomic Mass (amu)": "[262]",
   "Protons": 103,
   "Electrons (Neutral)": 103,
   "Neutrons": "159 (for ___Lr)",
   "Known Isotopes": "___Lr–___Lr",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[262]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "3",
   "ElectronConfiguration": "1s2...5f147s27p1 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 7s_ 7p_ *",
   "Valence Orbital Diagram": "7s: (__) 7p: (_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "1627",
   "Melting Point (K)": "1900",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 15.6-16.6)",
   "Atomic Radius (pm)": "224",
   "Covalent Radius (pm)": 161,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "88 (Lr__)",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "60 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "10 (est.)",
   "Heat of Vaporization (kJ/mol)": "170 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "≤ 0",
   "Electronegativity (Pauling Scale)": "1.3 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "443.8",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "Basic",
   "Reactivity": "High",
   "Electrical Conductivity (S/m @ 20°C)": "4.8 x 10^5 (Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Lr (Predicted HCP): a = 3.54, c = 5.76 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "Extremely High",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Lr: 3.6 h",
   "Molar Vol. (cm³/mol)": "17.8 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 104,
   "Symbol": "Rf",
   "Name": "Rutherfordium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 4,
   "Block": "d",
   "Discoverer": "JINR & LBNL",
   "Date": "1964",
   "Origin of Name (Etymology)": "Ernest Rutherford",
   "Atomic Mass (amu)": "[267]",
   "Protons": 104,
   "Electrons (Neutral)": 104,
   "Neutrons": "163 (for ___Rf)",
   "Known Isotopes": "___Rf–___Rf",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[267]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "+4 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d27s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)(_)( )( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "(Predicted: ~2100)",
   "Melting Point (K)": "(Predicted: ~2400)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: ~5500)",
   "Boiling Point (K)": "(Predicted: ~5800)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 23.2)",
   "Atomic Radius (pm)": "216",
   "Covalent Radius (pm)": 157,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "54 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "23 (est.)",
   "Heat of Vaporization (kJ/mol)": "230 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.3 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "582",
   "Standard Electrode Potential (V)": "Predicted (-1.8)",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Rf (Predicted HCP): a = 3.16, c = 5.09 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Rf: 1.3 h",
   "Molar Vol. (cm³/mol)": "14.0 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 105,
   "Symbol": "Db",
   "Name": "Dubnium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 5,
   "Block": "d",
   "Discoverer": "JINR & LBNL",
   "Date": "1968",
   "Origin of Name (Etymology)": "Dubna, Russia (home of JINR)",
   "Atomic Mass (amu)": "[270]",
   "Protons": 105,
   "Electrons (Neutral)": 105,
   "Neutrons": "165 (for ___Db)",
   "Known Isotopes": "___Db–___Db",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[268]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "+5 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d37s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)(_)(_)( )( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 29.3)",
   "Atomic Radius (pm)": "204",
   "Covalent Radius (pm)": 149,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "45 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "30 (est.)",
   "Heat of Vaporization (kJ/mol)": "320 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.3 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "640",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Db (Predicted BCC): a = 3.33 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Db: 29 h",
   "Molar Vol. (cm³/mol)": "11.5 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 106,
   "Symbol": "Sg",
   "Name": "Seaborgium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 6,
   "Block": "d",
   "Discoverer": "JINR & LBNL",
   "Date": "1974",
   "Origin of Name (Etymology)": "Glenn T. Seaborg",
   "Atomic Mass (amu)": "[271]",
   "Protons": 106,
   "Electrons (Neutral)": 106,
   "Neutrons": "165 (for ___Sg)",
   "Known Isotopes": "___Sg–___Sg",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[271]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "+6 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d47s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)(_)(_)(_)( )",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 35.0)",
   "Atomic Radius (pm)": "195",
   "Covalent Radius (pm)": 143,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "41 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "34 (est.)",
   "Heat of Vaporization (kJ/mol)": "380 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.4 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "733",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Sg (Predicted BCC): a = 3.19 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Sg: 1.9 min",
   "Molar Vol. (cm³/mol)": "9.9 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 107,
   "Symbol": "Bh",
   "Name": "Bohrium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 7,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1981",
   "Origin of Name (Etymology)": "Niels Bohr",
   "Atomic Mass (amu)": "[270]",
   "Protons": 107,
   "Electrons (Neutral)": 107,
   "Neutrons": "163 (for ___Bh)",
   "Known Isotopes": "___Bh–___Bh",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[270]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "+7 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d57s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (_)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 37.1)",
   "Atomic Radius (pm)": "188",
   "Covalent Radius (pm)": 141,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "48 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "35 (est.)",
   "Heat of Vaporization (kJ/mol)": "400 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.5 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "740",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Bh (Predicted HCP): a = 2.78, c = 4.49 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Bh: 61 s",
   "Molar Vol. (cm³/mol)": "8.9 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 108,
   "Symbol": "Hs",
   "Name": "Hassium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 8,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1984",
   "Origin of Name (Etymology)": "Latin: Hassia (Hesse, a German state)",
   "Atomic Mass (amu)": "[277]",
   "Protons": 108,
   "Electrons (Neutral)": 108,
   "Neutrons": "169 (for ___Hs)",
   "Known Isotopes": "___Hs–___Hs",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[277]",
   "Electron Count in Ion(s)": "100",
   "Common Oxidation States": "+8 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d67s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (__)(_)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 40.7)",
   "Atomic Radius (pm)": "183",
   "Covalent Radius (pm)": 134,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "50 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "30 (est.)",
   "Heat of Vaporization (kJ/mol)": "360 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.5 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "740",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "Hs (Predicted HCP): a = 2.75, c = 4.35 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Hs: 16.5 min",
   "Molar Vol. (cm³/mol)": "8.5 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 109,
   "Symbol": "Mt",
   "Name": "Meitnerium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 9,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1982",
   "Origin of Name (Etymology)": "Lise Meitner",
   "Atomic Mass (amu)": "[278]",
   "Protons": 109,
   "Electrons (Neutral)": 109,
   "Neutrons": "169 (for ___Mt)",
   "Known Isotopes": "___Mt, ___Mt, ___Mt–___Mt",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[278]",
   "Electron Count in Ion(s)": "106 (Mt__), 105 (Mt__), 103 (Mt__)",
   "Common Oxidation States": "+3, +4, +6 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d77s2",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (__)(__)(_)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 37.4)",
   "Atomic Radius (pm)": "179",
   "Covalent Radius (pm)": 129,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "40 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "25 (est.)",
   "Heat of Vaporization (kJ/mol)": "350 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.6 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "800",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Mt (Predicted FCC): a = 3.87 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Mt: 7.6 s",
   "Molar Vol. (cm³/mol)": "8.8 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 110,
   "Symbol": "Ds",
   "Name": "Darmstadtium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 10,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1994",
   "Origin of Name (Etymology)": "Darmstadt, Germany (home of GSI)",
   "Atomic Mass (amu)": "[281]",
   "Protons": 110,
   "Electrons (Neutral)": 110,
   "Neutrons": "171 (for ___Ds)",
   "Known Isotopes": "___Ds, ___Ds–___Ds",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[281]",
   "Electron Count in Ion(s)": "104 (Ds__), 102 (Ds__)",
   "Common Oxidation States": "+6, +8 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d87s2 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (__)(__)(__)(_)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 34.8)",
   "Atomic Radius (pm)": "175",
   "Covalent Radius (pm)": 128,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "36 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "25 (est.)",
   "Heat of Vaporization (kJ/mol)": "300 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.7 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "910",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Diamagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Ds (Predicted BCC): a = 2.92 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Ds: 12.7 s",
   "Molar Vol. (cm³/mol)": "9.1 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 111,
   "Symbol": "Rg",
   "Name": "Roentgenium",
   "Classification": "Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 11,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1994",
   "Origin of Name (Etymology)": "Wilhelm Conrad Röntgen",
   "Atomic Mass (amu)": "[282]",
   "Protons": 111,
   "Electrons (Neutral)": 111,
   "Neutrons": "171 (for ___Rg)",
   "Known Isotopes": "___Rg, ___Rg, ___Rg–___Rg",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[282]",
   "Electron Count in Ion(s)": "108",
   "Common Oxidation States": "+3 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d97s2 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d_ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (__)(__)(__)(__)(_)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "Unknown",
   "Boiling Point (K)": "Unknown",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 28.7)",
   "Atomic Radius (pm)": "171",
   "Covalent Radius (pm)": 121,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "36 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "20 (est.)",
   "Heat of Vaporization (kJ/mol)": "170 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A (Metal)",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.8 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "1020",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low / Noble)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Rg (Predicted BCC): a = 2.91 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Rg: 2.1 min",
   "Molar Vol. (cm³/mol)": "9.8 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 112,
   "Symbol": "Cn",
   "Name": "Copernicium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Liquid or Gas (Predicted)",
   "Period": 7,
   "Group": 12,
   "Block": "d",
   "Discoverer": "GSI (Darmstadt)",
   "Date": "1996",
   "Origin of Name (Etymology)": "Nicolaus Copernicus",
   "Atomic Mass (amu)": "[285]",
   "Protons": 112,
   "Electrons (Neutral)": 112,
   "Neutrons": "173 (for ___Cn)",
   "Known Isotopes": "___Cn, ___Cn–___Cn",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[285]",
   "Electron Count in Ion(s)": "110",
   "Common Oxidation States": "+2 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s2 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_",
   "Valence Orbital Diagram": "7s: (__) 6d: (__)(__)(__)(__)(__)",
   "DotStructure": "Not Standard",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "Unknown",
   "Melting Point (K)": "Unknown",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: ~37)",
   "Boiling Point (K)": "(Predicted: ~310)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 23.7)",
   "Atomic Radius (pm)": "168",
   "Covalent Radius (pm)": 122,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Liquid/Gas)",
   "Young's Modulus (GPa)": "N/A (Liquid/Gas)",
   "Bulk Modulus (GPa)": "15 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "1.1 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "7 (est.)",
   "Heat of Vaporization (kJ/mol)": "54 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.9 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "1155",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Basic)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Cn (Predicted HCP): a = 3.60, c = 5.86 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Cn: 28 s",
   "Molar Vol. (cm³/mol)": "15.0 (est.)",
   "Vapor P. (Pa @ 25°C)": "5400 (est.)",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 113,
   "Symbol": "Nh",
   "Name": "Nihonium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 13,
   "Block": "p",
   "Discoverer": "RIKEN (Japan)",
   "Date": "2004",
   "Origin of Name (Etymology)": "Japanese: Nihon (Japan)",
   "Atomic Mass (amu)": "[286]",
   "Protons": 113,
   "Electrons (Neutral)": 113,
   "Neutrons": "173 (for ___Nh)",
   "Known Isotopes": "___Nh, ___Nh–___Nh, ___Nh",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[286]",
   "Electron Count in Ion(s)": "112 (Nh_), 110 (Nh__)",
   "Common Oxidation States": "+1, +3 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p1 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (_)( )( )",
   "DotStructure": "•Nh• (3 dots, predicted)",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "(Predicted: ~430)",
   "Melting Point (K)": "(Predicted: ~700)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: ~1130)",
   "Boiling Point (K)": "(Predicted: ~1400)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 16)",
   "Atomic Radius (pm)": "175",
   "Covalent Radius (pm)": 136,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "30 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "3.6 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "5.4 (est.)",
   "Heat of Vaporization (kJ/mol)": "64 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.6 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "704.9",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Nh (Predicted HCP): a = 3.48, c = 5.56 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Nh: 19.6 s",
   "Molar Vol. (cm³/mol)": "17.5 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 114,
   "Symbol": "Fl",
   "Name": "Flerovium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 14,
   "Block": "p",
   "Discoverer": "JINR & LLNL",
   "Date": "1999",
   "Origin of Name (Etymology)": "Georgy Flerov / Flerov Laboratory",
   "Atomic Mass (amu)": "[289]",
   "Protons": 114,
   "Electrons (Neutral)": 114,
   "Neutrons": "175 (for ___Fl)",
   "Known Isotopes": "___Fl–___Fl",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[289]",
   "Electron Count in Ion(s)": "112 (Fl__), 110 (Fl__)",
   "Common Oxidation States": "+2, +4 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p2 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (_)(_)( )",
   "DotStructure": "•Fl• (4 dots, predicted)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "(Predicted: ~ -60)",
   "Melting Point (K)": "(Predicted: ~210)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: ~60)",
   "Boiling Point (K)": "(Predicted: ~330)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 14)",
   "Atomic Radius (pm)": "180",
   "Covalent Radius (pm)": 143,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "35 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "5.2 (est.)",
   "Heat of Vaporization (kJ/mol)": "63 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.7 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "823.9",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "FCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Fl (Predicted FCC): a = 4.98 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Fl: 1.9 s",
   "Molar Vol. (cm³/mol)": "18.0 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 115,
   "Symbol": "Mc",
   "Name": "Moscovium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 15,
   "Block": "p",
   "Discoverer": "JINR & LLNL",
   "Date": "2003",
   "Origin of Name (Etymology)": "Moscow, Russia",
   "Atomic Mass (amu)": "[290]",
   "Protons": 115,
   "Electrons (Neutral)": 115,
   "Neutrons": "175 (for ___Mc)",
   "Known Isotopes": "___Mc–___Mc",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[289]",
   "Electron Count in Ion(s)": "112 (Mc__), 114 (Mc_)",
   "Common Oxidation States": "+3, +1 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p3 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (_)(_)(_)",
   "DotStructure": "•Mc: (1 pair, 3 singles, predicted)",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "(Predicted: ~400)",
   "Melting Point (K)": "(Predicted: ~670)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: ~1100)",
   "Boiling Point (K)": "(Predicted: ~1370)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 13.5)",
   "Atomic Radius (pm)": "187",
   "Covalent Radius (pm)": 162,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "162 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "2.1 (est.)",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "5.9 (est.)",
   "Heat of Vaporization (kJ/mol)": "138 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.8 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "538.3",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Amphoteric)",
   "Reactivity": "Predicted (Low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Paramagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Mc (Predicted BCC): a = 4.25 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Mc: 0.8 s",
   "Molar Vol. (cm³/mol)": "21.8 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 116,
   "Symbol": "Lv",
   "Name": "Livermorium",
   "Classification": "Post-Transition Metal",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 16,
   "Block": "p",
   "Discoverer": "JINR & LLNL",
   "Date": "2000",
   "Origin of Name (Etymology)": "Livermore, California (home of LLNL)",
   "Atomic Mass (amu)": "[293]",
   "Protons": 116,
   "Electrons (Neutral)": 116,
   "Neutrons": "177 (for ___Lv)",
   "Known Isotopes": "___Lv–___Lv",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[293]",
   "Electron Count in Ion(s)": "114 (Lv__), 112 (Lv__)",
   "Common Oxidation States": "+2, +4 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p4 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (__)(_)(_)",
   "DotStructure": ":Lv• (2 pairs, 2 singles, predicted)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "(Predicted: 153–453)",
   "Melting Point (K)": "(Predicted: 426–726)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: 762–862)",
   "Boiling Point (K)": "(Predicted: 1035–1135)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 12.9)",
   "Atomic Radius (pm)": "183",
   "Covalent Radius (pm)": 175,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "218 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "7 (est.)",
   "Heat of Vaporization (kJ/mol)": "142 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "",
   "Electron Affinity (kJ/mol)": "Unknown",
   "Electronegativity (Pauling Scale)": "1.8 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "708.9",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "Predicted (Acidic)",
   "Reactivity": "Predicted (Moderate)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted)",
   "Magnetic Properties": "Diamagnetic (predicted)",
   "Band Gap (eV)": "N/A",
   "Crystal Structure (Solid)": "HCP (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Lv (Predicted HCP): a = 4.80, c = 7.82 (α=β=90°, γ=120°)",
   "Space Group": "P6₃/mmc",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Lv: 53 ms",
   "Molar Vol. (cm³/mol)": "26.2 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 117,
   "Symbol": "Ts",
   "Name": "Tennessine",
   "Classification": "Halogen (or Metalloid)",
   "Standard State (0°C, 1 atm)": "Solid (Predicted)",
   "Period": 7,
   "Group": 17,
   "Block": "p",
   "Discoverer": "JINR & LLNL & ORNL",
   "Date": "2010",
   "Origin of Name (Etymology)": "Tennessee, US state",
   "Atomic Mass (amu)": "[294]",
   "Protons": 117,
   "Electrons (Neutral)": 117,
   "Neutrons": "177 (for ___Ts)",
   "Known Isotopes": "___Ts–___Ts",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[294]",
   "Electron Count in Ion(s)": "118 (Ts_), 116 (Ts_), 114 (Ts__), 112 (Ts__)",
   "Common Oxidation States": "-1, +1, +3, +5 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p5 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (__)(__)(_)",
   "DotStructure": ":Ts• (3 pairs, 1 single, predicted)",
   "Nuclear Spin (I)": "N/A",
   "Magnetic Moment (μ/μN​)": "N/A",
   "Melting Point (°C)": "(Predicted: 350–550)",
   "Melting Point (K)": "(Predicted: 623–823)",
   "Melting Point Pressure Dependency": "Predicted to increase",
   "Boiling Point (°C)": "(Predicted: 610)",
   "Boiling Point (K)": "(Predicted: 883)",
   "Boiling Point Pressure Dependency": "Predicted to increase",
   "Density (g/cm³)": "(Predicted: 7.2)",
   "Atomic Radius (pm)": "165",
   "Covalent Radius (pm)": 165,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "Unknown",
   "Young's Modulus (GPa)": "Unknown",
   "Bulk Modulus (GPa)": "180 (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "N/A",
   "Specific Heat (J/g·K)": "N/A",
   "Heat of Fusion (kJ/mol)": "10 (est.)",
   "Heat of Vaporization (kJ/mol)": "161 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "165.9 (Predicted)",
   "Electronegativity (Pauling Scale)": "1.9 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "723.6",
   "Standard Electrode Potential (V)": "Predicted",
   "Acid/Base Behavior (if applicable)": "N/A (forms acids)",
   "Reactivity": "Predicted (High)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted Semiconductor)",
   "Magnetic Properties": "",
   "Band Gap (eV)": "",
   "Crystal Structure (Solid)": "Unknown",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Ts (Predicted BCC): a = 4.02 (α=β=γ=90°)",
   "Space Group": "Im-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Ts: 51 ms",
   "Molar Vol. (cm³/mol)": "25.1 (est.)",
   "Vapor P. (Pa @ 25°C)": "Negligible",
   "Solubility (in H₂O)": "N/A"
},
 {
   "Z": 118,
   "Symbol": "Og",
   "Name": "Oganesson",
   "Classification": "Noble Gas",
   "Standard State (0°C, 1 atm)": "Gas or Solid (Predicted)",
   "Period": 7,
   "Group": 18,
   "Block": "p",
   "Discoverer": "JINR & LLNL",
   "Date": "2006",
   "Origin of Name (Etymology)": "Yuri Oganessian",
   "Atomic Mass (amu)": "[294]",
   "Protons": 118,
   "Electrons (Neutral)": 118,
   "Neutrons": "176 (for ___Og)",
   "Known Isotopes": "___Og, ___Og",
   "Natural Isotopic Composition (%)": "N/A (Synthetic)",
   "Isotopic Masses (amu)": "[294]",
   "Electron Count in Ion(s)": "118 (Og), 116 (Og__), 114 (Og__), 112 (Og__)",
   "Common Oxidation States": "0, +2, +4, +6 (Predicted)",
   "ElectronConfiguration": "1s2...5f146d107s27p6 (Predicted)",
   "Electron Configuration": "[Rn] 5f__ 6d__ 7s_ 7p_",
   "Valence Orbital Diagram": "7s: (__) 7p: (__)(__)(__)",
   "DotStructure": ":Og: (4 pairs, predicted)",
   "Nuclear Spin (I)": "0",
   "Magnetic Moment (μ/μN​)": "0",
   "Melting Point (°C)": "(Predicted: ~50)",
   "Melting Point (K)": "(Predicted: ~323)",
   "Melting Point Pressure Dependency": "",
   "Boiling Point (°C)": "(Predicted: ~160)",
   "Boiling Point (K)": "(Predicted: ~433)",
   "Boiling Point Pressure Dependency": "",
   "Density (g/cm³)": "(Predicted: 4.9-5.1)",
   "Atomic Radius (pm)": "157",
   "Covalent Radius (pm)": 157,
   "Van der Waals Radius (pm)": "N/A",
   "Ionic Radius(es) (pm)": "N/A",
   "Mohs Hardness": "N/A (Gas/Solid)",
   "Young's Modulus (GPa)": "N/A (Gas/Solid)",
   "Bulk Modulus (GPa)": "N/A (Predicted)",
   "Shear Modulus (GPa)": "N/A (Predicted)",
   "Thermal Conductivity (W/m·K)": "0.006 (Gas, est.)",
   "Specific Heat (J/g·K)": "0.09 (Gas, est.)",
   "Heat of Fusion (kJ/mol)": "2.5 (est.)",
   "Heat of Vaporization (kJ/mol)": "19 (est.)",
   "Color in Solid State": "N/A (Predicted)",
   "Refractive Index": "N/A",
   "Electron Affinity (kJ/mol)": "5.0 (Predicted)",
   "Electronegativity (Pauling Scale)": "2.0 (Predicted)",
   "1st Ionization Energy (kJ/mol)": "820-1130",
   "Standard Electrode Potential (V)": "N/A",
   "Acid/Base Behavior (if applicable)": "N/A",
   "Reactivity": "Predicted (Very low)",
   "Electrical Conductivity (S/m @ 20°C)": "(Predicted Insulator)",
   "Magnetic Properties": "",
   "Band Gap (eV)": "",
   "Crystal Structure (Solid)": "BCC (Predicted)",
   "Lattice Parameters (a, b, c in Å, angles α, β, γ)": "* Og (Predicted FCC): a = 6.75 (α=β=γ=90°)",
   "Space Group": "Fm-3m",
   "Abundance (Earth's Crust, ppm)": "Synthetic",
   "Abundance (O | A | U)": "N/A (Synthetic)",
   "Sources": "Particle accelerator",
   "Toxicity": "N/A (Radiological)",
   "Bio. Role": "None",
   "Radioactive?": "Yes",
   "Half-life": "___Og: 0.7 ms",
   "Molar Vol. (cm³/mol)": "50 (est.)",
   "Vapor P. (Pa @ 25°C)": "N/A",
   "Solubility (in H₂O)": "N/A"
}
]

function searchElement() {
  const searchedElement = document.getElementById('ptSearch').value.trim().toLowerCase();
  const ptOut = document.getElementById('ptOut');
  const element = elementData.find(el =>
    el.Symbol.toLowerCase() === searchedElement ||
    el.Name.toLowerCase() === searchedElement ||
    el.Z.toString() === searchedElement
  );
  if (element) {
    const elementId = "atom" + element.Symbol;
    const elementElem = document.getElementById(elementId);
    if (elementElem) {
      elementElem.click();
      elementElem.classList.add("hover-element");
      setTimeout(() => elementElem.classList.remove("hover-element"), 4000);
    } else {
      ptOut.textContent = `Element found, but no HTML element with ID "${elementId}" exists.`;
    }
  } else {
    ptOut.textContent = 'Invalid input. Please enter a valid element name, symbol, or atomic number.';
  }
}

document.getElementById('ptSearch').addEventListener('keypress', function (event) {
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

  if (min >= max) {
    document.getElementById('fg2_area').textContent = 'Minimum number must be less than the maximum number.';
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
    if ((op === '÷' || op === '/' || op === '%') && val === 0) val = 1;
    switch (op) {
      case '*':
        op = '×';
        break;
      case '/':
        op = '÷';
        break;
      case '**':
        op = '^';
        break;
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
  if (!/^[0-9+\-x×÷*/%^().\s]+$/.test(s)) throw new Error('Invalid tokens');
  const safe = s
    .replace(/×|x/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');
  return Function(`"use strict"; return (${safe})`)();
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

  setTimeout(fg2_next, 2000);
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
const snakeCanvas = document.getElementById("snakeCanvas");
const snakeCtx = snakeCanvas.getContext("2d");
const snakeScoreHolder = document.getElementById("snakeScore");
const snakeLeftBtn = document.getElementById("leftSnake");
const snakeUpBtn = document.getElementById("upSnake");
const snakeRightBtn = document.getElementById("rightSnake");
const snakeDownBtn = document.getElementById("downSnake");
const snakeStartBtn = document.getElementById("startSnakeBtn");
const snakePauseBtn = document.getElementById("pauseSnakeBtn");
const snakeSize = Math.floor(window.innerHeight * 0.65);
snakeCanvas.width = 25 * Math.floor(snakeSize / 25);
snakeCanvas.height = 25 * Math.floor(snakeSize / 25);
let snakeBox = Math.floor(snakeSize / 25);
snakeCanvas.width = 25 * snakeBox;
snakeCanvas.height = 25 * snakeBox;
let snake, snakeDirection, snakeFood, snakeScore, snakeFoodsEaten;
let snakeSpecialFood = null;
let snakeHighScore = localStorage.getItem("snakeHighScore") || 0;
document.getElementById("snakeHighScore").textContent = "High score = " + snakeHighScore;
let snakeSpecialFoodTimer = null;
let snakeSpecialFoodTime = 5000;
let snakePaused = false;
let snakeLastFrameTime = 0;
let snakeMoveDelay = 100;
let snakeAccumulatedTime = 0;
let snakeRunning = false;
function startSnakeGame() {
  snakeMoveDelay = 200;
  snake = [{ x: 3 * snakeBox, y: 3 * snakeBox }];
  snakeDirection = "RIGHT";
  snakeFood = randomFood();
  snakeScore = 0;
  snakeFoodsEaten = 0;
  snakeSpecialFood = null;
  snakePaused = false;
  snakeRunning = true;
  snakeLastFrameTime = 0;
  snakeAccumulatedTime = 0;
  snakePauseBtn.textContent = "Pause";
  snakeCanvas.focus();
  requestAnimationFrame(snakeGameLoop);
}
function randomFood() {
  return {
    x: Math.floor(Math.random() * 25) * snakeBox,
    y: Math.floor(Math.random() * 25) * snakeBox
  };
}
function spawnSpecialFood() {
  snakeSpecialFood = {
    x: Math.floor(Math.random() * 25) * snakeBox,
    y: Math.floor(Math.random() * 25) * snakeBox
  };
  clearTimeout(snakeSpecialFoodTimer);
  snakeSpecialFoodTimer = setTimeout(() => (snakeSpecialFood = null), snakeSpecialFoodTime);
}
function hitSpecialFood(snakeX, snakeY) {
  if (!snakeSpecialFood) return false;
  return (
    snakeX < snakeSpecialFood.x + snakeBox * 2 &&
    snakeX + snakeBox > snakeSpecialFood.x &&
    snakeY < snakeSpecialFood.y + snakeBox * 2 &&
    snakeY + snakeBox > snakeSpecialFood.y
  );
}
function snakeGameCheckCollision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}
snakePauseBtn.addEventListener("click", () => {
  if (!snakeRunning) return;
  snakePaused = !snakePaused;
  snakePauseBtn.textContent = snakePaused ? "Resume" : "Pause";
  if (!snakePaused) requestAnimationFrame(gameLoop);
});
function drawGame() {
  snakeCtx.fillStyle = "#000";
  snakeCtx.fillRect(0, 0, 25 * snakeBox, 25 * snakeBox);
  snakeCtx.beginPath();
  snakeCtx.arc(snakeFood.x + snakeBox / 2, snakeFood.y + snakeBox / 2, snakeBox / 2, 0, Math.PI * 2);
  snakeCtx.fillStyle = "#ac2727ff";
  snakeCtx.fill();
  if (snakeSpecialFood) {
    snakeCtx.beginPath();
    snakeCtx.arc(snakeSpecialFood.x + snakeBox, snakeSpecialFood.y + snakeBox, snakeBox, 0, Math.PI * 2);
    snakeCtx.fillStyle = "gold";
    snakeCtx.fill();
  }
  snake.forEach((segment, index) => {
    snakeCtx.fillStyle = index === 0 ? "rgba(13, 55, 128, 1)" : "rgba(53, 127, 208, 1)";
    snakeCtx.fillRect(segment.x, segment.y, snakeBox, snakeBox);
  });
}
function updateGame() {
  snakeLeftBtn.addEventListener("click", () => { if (snakeDirection !== "RIGHT") snakeDirection = "LEFT"; });
  snakeUpBtn.addEventListener("click", () => { if (snakeDirection !== "DOWN") snakeDirection = "UP"; });
  snakeRightBtn.addEventListener("click", () => { if (snakeDirection !== "LEFT") snakeDirection = "RIGHT"; });
  snakeDownBtn.addEventListener("click", () => { if (snakeDirection !== "UP") snakeDirection = "DOWN"; });
  document.addEventListener("keydown",
    event => {
      if (!snakeRunning) return;
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
      if ((key === "a" || key === "arrowleft") && snakeDirection !== "RIGHT") snakeDirection = "LEFT";
      else if ((key === "w" || key === "arrowup") && snakeDirection !== "DOWN") snakeDirection = "UP";
      else if ((key === "d" || key === "arrowright") && snakeDirection !== "LEFT") snakeDirection = "RIGHT";
      else if ((key === "s" || key === "arrowdown") && snakeDirection !== "UP") snakeDirection = "DOWN";
    },
    { passive: false }
  );
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeDirection === "LEFT") snakeX -= snakeBox;
  if (snakeDirection === "UP") snakeY -= snakeBox;
  if (snakeDirection === "RIGHT") snakeX += snakeBox;
  if (snakeDirection === "DOWN") snakeY += snakeBox;
  if (snakeX === snakeFood.x && snakeY === snakeFood.y) {
    snakeScore += 5;
    snakeFoodsEaten++;
    snakeMoveDelay -= 2.5;
    snakeFood = randomFood();
    if (snakeFoodsEaten % 10 === 0) spawnSpecialFood();
  } else {
    snake.pop();
  }
  if (snakeSpecialFood && hitSpecialFood(snakeX, snakeY)) {
    snakeScore += 50;
    snakeSpecialFood = null;
    clearTimeout(snakeSpecialFoodTimer);
  }
  const newHead = { x: snakeX, y: snakeY };
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= snakeCanvas.width || snakeY >= snakeCanvas.height ||
    snakeGameCheckCollision(newHead, snake)
  ) {
    gameOver();
    return;
  }
  snake.unshift(newHead);
  snakeScoreHolder.textContent = "Score: " + snakeScore;
}
function gameOver() {
  snakeRunning = false;
  clearTimeout(snakeSpecialFoodTimer);
  drawGame();
  snake = [];
  snakeFood = [];
  snakeCtx.font = "32px Arial";
  snakeCtx.fillStyle = "white";
  snakeCtx.textAlign = "center";
  const cx = snakeCanvas.width / 2;
  const cy = snakeCanvas.height / 2;
  if (snakeScore > snakeHighScore) {
    snakeHighScore = snakeScore;
    localStorage.setItem("snakeHighScore", snakeHighScore);
    document.getElementById("snakeHighScore").textContent =
      "High score = " + snakeHighScore;
    snakeCtx.fillText("Game Over!", cx, cy - 40);
    snakeCtx.fillText("Score: " + snakeScore, cx, cy);
    snakeCtx.fillText("New High Score: " + snakeHighScore + "!", cx, cy + 40);
  } else {
    snakeCtx.fillText("Game Over!", cx, cy - 20);
    snakeCtx.fillText("Score: " + snakeScore, cx, cy + 20);
  }
}
function snakeGameLoop(timestamp) {
  if (!snakeRunning) return;
  if (snakePaused) {
    snakeLastFrameTime = timestamp;
    requestAnimationFrame(snakeGameLoop);
    return;
  }
  if (!snakeLastFrameTime) snakeLastFrameTime = timestamp;
  const snakeDeltaTime = timestamp - snakeLastFrameTime;
  snakeLastFrameTime = timestamp;
  snakeAccumulatedTime += snakeDeltaTime;
  if (snakeAccumulatedTime >= snakeMoveDelay) {
    updateGame();
    snakeAccumulatedTime = 0;
    if (!snakeRunning) {
      gameOver();
      return;
    }
  }
  drawGame();
  requestAnimationFrame(snakeGameLoop);
}
snakeStartBtn.addEventListener("click", startSnakeGame);

// --------- Jet Shooter Game ----------
const jetShooterCanvas = document.getElementById('jetShooterCanvas');
const jetShooterCtx = jetShooterCanvas.getContext("2d");

const jetShooterScoreHolder = document.getElementById("jetShooterScore");
const jetShooterLeftBtn = document.getElementById("leftJetShooter");
const jetShooterRightBtn = document.getElementById("rightJetShooter");
const jetShooterShootBtn = document.getElementById("shootJetShooter");
const jetShooterStartBtn = document.getElementById("startJetShooterBtn");
const jetShooterPauseBtn = document.getElementById("pauseJetShooterBtn");

const jetShooterSize = Math.floor(window.innerHeight * 0.65);
jetShooterCanvas.width = 100 * Math.floor(jetShooterSize / 100);
jetShooterCanvas.height = 100 * Math.floor(jetShooterSize / 100);
let jetShooterBox = Math.floor(jetShooterCanvas.width / 100);

let jetShooterHighScore = parseInt(localStorage.getItem("jetShooterHighScore")) || 0;
document.getElementById("jetShooterHighScore").textContent = "High score = " + jetShooterHighScore;

let jetShooter, jetShooterBullets, jetShooterEnemies, jetShooterShields, jetShooterScore;
let jetShooterPaused = false;
let jetShooterRunning = false;
let jetShooterLastFrameTime = 0;
let jetShooterEnemyTimer = 0;
let jetShooterEnemySpawnRate = 2000;
let jetShooterShieldTimer = 0;
let jetShooterShieldSpawnRate = 10000;
let jetShooterHasShield = false;
function jetShooterGameStart() {
  jetShooter = { x: 50 * jetShooterBox, y: 97 * jetShooterBox, size: jetShooterBox * 4 };
  jetShooterBullets = [];
  jetShooterEnemies = [];
  jetShooterShields = [];
  jetShooterScore = 0;
  jetShooterPaused = false;
  jetShooterRunning = true;
  jetShooterHasShield = false;
  jetShooterPauseBtn.textContent = "Pause";
  jetShooterCanvas.focus();
  jetShooterLastFrameTime = performance.now();
  requestAnimationFrame(jetShooterGameLoop);
}
function jetShooterGameLoop(timestamp) {
  if (!jetShooterRunning) return;
  if (jetShooterPaused) {
    requestAnimationFrame(jetShooterGameLoop);
    return;
  }
  const delta = timestamp - jetShooterLastFrameTime;
  jetShooterLastFrameTime = timestamp;
  updateJetShooter(delta);
  drawJetShooter();
  requestAnimationFrame(jetShooterGameLoop);
}
function updateJetShooter(delta) {
  jetShooterBullets.forEach(b => (b.y -= b.speed));
  jetShooterBullets = jetShooterBullets.filter(b => b.y + b.size > 0);
  jetShooterEnemyTimer += delta;
  if (jetShooterEnemyTimer > jetShooterEnemySpawnRate) {
    spawnEnemy();
    jetShooterEnemyTimer = 0;
  }
  jetShooterShieldTimer += delta;
  if (jetShooterShieldTimer > jetShooterShieldSpawnRate) {
    spawnShield();
    jetShooterShieldTimer = 0;
  }
  jetShooterEnemies.forEach(e => (e.y += e.speed));
  jetShooterEnemies = jetShooterEnemies.filter(e => e.y < jetShooterCanvas.height);
  jetShooterShields.forEach(s => {
    s.y += s.speedY;
    s.angle += s.oscillationSpeed;
    s.x = s.baseX + Math.sin(s.angle) * s.amplitude;
  });
  jetShooterShields = jetShooterShields.filter(s => s.y < jetShooterCanvas.height);
  for (let i = jetShooterEnemies.length - 1; i >= 0; i--) {
    for (let j = jetShooterBullets.length - 1; j >= 0; j--) {
      if (jetShooterCheckCollision(jetShooterEnemies[i], jetShooterBullets[j])) {
        jetShooterEnemies.splice(i, 1);
        jetShooterBullets.splice(j, 1);
        jetShooterScore += 10;
        break;
      }
    }
  }
  for (let i = 0; i < jetShooterEnemies.length; i++) {
    if (jetShooterCheckCollision(jetShooterEnemies[i], jetShooter)) {
      if (jetShooterHasShield) {
        jetShooterHasShield = false;
        jetShooterEnemies.splice(i, 1);
        break;
      } else {
        jetShooterGameOver();
        return;
      }
    }
  }
  for (let i = 0; i < jetShooterShields.length; i++) {
    if (jetShooterCheckCollision(jetShooterShields[i], jetShooter)) {
      jetShooterExtraLife();
      jetShooterShields.splice(i, 1);
      break;
    }
  }
}
function drawJetShooter() {
  jetShooterCtx.clearRect(0, 0, jetShooterCanvas.width, jetShooterCanvas.height);
  const jx = jetShooter.x + jetShooter.size / 2;
  const jy = jetShooter.y + jetShooter.size / 2;
  jetShooterCtx.fillStyle = jetShooterHasShield ? "lightgreen" : "cyan";
  jetShooterCtx.beginPath();
  jetShooterCtx.moveTo(jx, jetShooter.y + jetShooter.size);
  jetShooterCtx.lineTo(jetShooter.x, jetShooter.y);
  jetShooterCtx.lineTo(jetShooter.x + jetShooter.size, jetShooter.y);
  jetShooterCtx.closePath();
  jetShooterCtx.fill();
  jetShooterCtx.fillStyle = "cyan";
  jetShooterCtx.beginPath();
  jetShooterCtx.arc(jx, jetShooter.y + jetShooter.size * 0.55, jetShooter.size * 0.15, 0, Math.PI * 2);
  jetShooterCtx.fill();
  jetShooterCtx.fillStyle = "orange";
  jetShooterCtx.beginPath();
  jetShooterCtx.moveTo(jx - jetShooter.size * 0.15, jetShooter.y);
  jetShooterCtx.lineTo(jx + jetShooter.size * 0.15, jetShooter.y);
  jetShooterCtx.lineTo(jx, jetShooter.y - jetShooter.size * 0.3);
  jetShooterCtx.closePath();
  jetShooterCtx.fill();
  jetShooterCtx.fillStyle = "yellow";
  jetShooterBullets.forEach(b => {
    jetShooterCtx.fillRect(b.x, b.y, b.size, b.size * 2);
  });
  jetShooterEnemies.forEach(e => {
    const cx = e.x + e.size / 2;
    const cy = e.y + e.size / 2;
    jetShooterCtx.fillStyle = "silver";
    jetShooterCtx.beginPath();
    jetShooterCtx.moveTo(cx, e.y + e.size);
    jetShooterCtx.lineTo(e.x, e.y);
    jetShooterCtx.lineTo(e.x + e.size, e.y);
    jetShooterCtx.closePath();
    jetShooterCtx.fill();
    jetShooterCtx.fillStyle = "cyan";
    jetShooterCtx.beginPath();
    jetShooterCtx.arc(cx, e.y + e.size * 0.55, e.size * 0.15, 0, Math.PI * 2);
    jetShooterCtx.fill();
    jetShooterCtx.fillStyle = "orange";
    jetShooterCtx.beginPath();
    jetShooterCtx.moveTo(cx - e.size * 0.15, e.y);
    jetShooterCtx.lineTo(cx + e.size * 0.15, e.y);
    jetShooterCtx.lineTo(cx, e.y - e.size * 0.3);
    jetShooterCtx.closePath();
    jetShooterCtx.fill();
  });
  jetShooterCtx.fillStyle = "gold";
  jetShooterShields.forEach(s => {
    jetShooterCtx.fillRect(s.x, s.y, s.size, s.size);
  });
  jetShooterScoreHolder.textContent = "Score: " + jetShooterScore;
}
function jetShooterCheckCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}
function spawnShield() {
  const size = jetShooterBox * 3;
  const y = -size;
  const speedY = 3 + Math.random() * 4;
  const baseX = Math.random() * (jetShooterCanvas.width - size);
  const amplitude = 100 + (Math.random() * 100);
  const oscillationSpeed = 0.02 + (Math.random() * 0.03);
  const angle = Math.random() * Math.PI / 180;
  const x = baseX + Math.sin(angle) * amplitude;
  jetShooterShields.push({
    x,
    y,
    size,
    speedY,
    baseX,
    angle,
    amplitude,
    oscillationSpeed
  });
}
function spawnEnemy() {
  const size = jetShooterBox * 4;
  const x = Math.random() * (jetShooterCanvas.width - size);
  const y = -size;
  const speed = 2 + Math.random() * 2;
  jetShooterEnemies.push({ x, y, size, speed });
}
jetShooterStartBtn.onclick = () => {
  if (jetShooterRunning) jetShooterGameStart();
  else {
    jetShooterGameStart();
    jetShooterStartBtn.textContent = "Restart"
  }
}
jetShooterPauseBtn.onclick = () => {
  if (!jetShooterRunning) return;
  jetShooterPaused = !jetShooterPaused;
  jetShooterPauseBtn.textContent = jetShooterPaused ? "Resume" : "Pause";
};
let movement = 0;
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (!jetShooterRunning) return;
  if (["arrowleft", "arrowright", "arrowup", "arrowdown", " "].includes(e.key.toLowerCase())) e.preventDefault();
  if (keys["arrowleft"] || keys["a"]) movement = -1;
  if (keys["arrowright"] || keys["d"]) movement = 1;
  if (keys[" "]) shootJetShooter();
});
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
  movement = 0;
});
let isShooting = false;
let lastShotTime = 0;
const FIRE_RATE = 150;
jetShooterLeftBtn.addEventListener('mousedown', () => { movement = -1; });
jetShooterLeftBtn.addEventListener('mouseup', () => { if (movement === -1) movement = 0; });
jetShooterLeftBtn.addEventListener('mouseleave', () => { if (movement === -1) movement = 0; });
jetShooterRightBtn.addEventListener('mousedown', () => { movement = 1; });
jetShooterRightBtn.addEventListener('mouseup', () => { if (movement === 1) movement = 0; });
jetShooterRightBtn.addEventListener('mouseleave', () => { if (movement === 1) movement = 0; });
jetShooterShootBtn.addEventListener('mousedown', () => { isShooting = true; });
jetShooterShootBtn.addEventListener('mouseup', () => { isShooting = false; });
jetShooterShootBtn.addEventListener('mouseleave', () => { isShooting = false; });
jetShooterLeftBtn.addEventListener('touchstart', (e) => { if (!jetShooterRunning) { return; } e.preventDefault(); movement = -1; }, { passive: false });
jetShooterLeftBtn.addEventListener('touchend', () => { if (movement === -1) movement = 0; });
jetShooterLeftBtn.addEventListener('touchcancel', () => { if (movement === -1) movement = 0; });
jetShooterRightBtn.addEventListener('touchstart', (e) => { if (!jetShooterRunning) { return; } e.preventDefault(); movement = 1; }, { passive: false });
jetShooterRightBtn.addEventListener('touchend', () => { if (movement === 1) movement = 0; });
jetShooterRightBtn.addEventListener('touchcancel', () => { if (movement === 1) movement = 0; });
jetShooterShootBtn.addEventListener('touchstart', (e) => { if (!jetShooterRunning) { return; } e.preventDefault(); isShooting = true; }, { passive: false });
jetShooterShootBtn.addEventListener('touchend', () => { isShooting = false; });
jetShooterShootBtn.addEventListener('touchcancel', () => { isShooting = false; });
function gameLoop() {
  if (movement === -1) {
    moveJetShooter(-0.25);
  } else if (movement === 1) {
    moveJetShooter(0.25);
  }
  const now = performance.now();
  if (isShooting && (now - lastShotTime > FIRE_RATE)) {
    shootJetShooter();
    lastShotTime = now;
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
function moveJetShooter(dir) {
  const step = jetShooterBox * 3;
  const newX = jetShooter.x + dir * step;
  if (newX >= 0 && newX + jetShooter.size <= jetShooterCanvas.width) {
    jetShooter.x = newX;
  }
}
function shootJetShooter() {
  jetShooterBullets.push({
    x: jetShooter.x + jetShooter.size / 2 - 2,
    y: jetShooter.y - 10,
    size: 4,
    speed: 10,
  });
}
function jetShooterExtraLife() {
  jetShooterHasShield = true;
}
function jetShooterGameOver() {
  jetShooterRunning = false;
  jetShooterEnemies = [];
  jetShooterBullets = [];
  jetShooterShields = [];
  if (jetShooterScore > jetShooterHighScore) {
    jetShooterHighScore = jetShooterScore;
    localStorage.setItem("jetShooterHighScore", jetShooterHighScore);
    document.getElementById("jetShooterHighScore").textContent =
      "High score = " + jetShooterHighScore;
  }
  requestAnimationFrame(() => {
    jetShooterCtx.clearRect(0, 0, jetShooterCanvas.width, jetShooterCanvas.height);
    jetShooterCtx.font = "32px Arial";
    jetShooterCtx.fillStyle = "white";
    jetShooterCtx.textAlign = "center";
    const cx = jetShooterCanvas.width / 2;
    const cy = jetShooterCanvas.height / 2;
    jetShooterCtx.fillText("GAME OVER!", cx, cy - 40);
    jetShooterCtx.fillText("Score: " + jetShooterScore, cx, cy);
    if (jetShooterScore >= jetShooterHighScore) {
      jetShooterCtx.fillText("New High Score: " + jetShooterHighScore + "!", cx, cy + 40);
    }
    jetShooterCtx.font = "20px Arial";
    jetShooterCtx.fillText("Press Start to Play Again", cx, cy + 90);
  });
}

// ========== UTILITIES =============

// -------- UNIT CONVERTER ----------
const unitGroups = {
  length: `
    <option value="ℓp">Planck length (ℓp)</option>
    <option value="qm">Quecto-meter (qm)</option>
    <option value="rm">Ronto-meter (rm)</option>
    <option value="ym">Yocto-meter (ym)</option>
    <option value="zm">Zepto-meter (zm)</option>
    <option value="am">Atto-meter (am)</option>
    <option value="fm">Femto-meter (fm)</option>
    <option value="pm">Pico-meter (pm)</option>
    <option value="nm">Nano-meter (nm)</option>
    <option value="µm">Micro-meter (µm)</option>
    <option value="mm">Millimeter (mm)</option>
    <option value="cm">Centimeter (cm)</option>
    <option value="dm">Decimeter (dm)</option>
    <option value="m">Meter (m)</option>
    <option value="km">Kilometer (km)</option>
    <option value="Mm">Megameter (Mm)</option>
    <option value="Gm">Gigameter (Gm)</option>
    <option value="Tm">Terameter (Tm)</option>
    <option value="Pm">Petameter (Pm)</option>
    <option value="Em">Exameter (Em)</option>
    <option value="Zm">Zettameter (Zm)</option>
    <option value="Ym">Yottameter (Ym)</option>
    <option value="Rm">Ronnameter (Rm)</option>
    <option value="bohrRadius">Bohr radius</option>
    <option value="classicalElectronRadius">Classical electron radius</option>
    <option value="comptonWavelength">Compton wavelength</option>
    <option value="inch">Inch (in)</option>
    <option value="foot">Foot (ft)</option>
    <option value="yard">Yard (yd)</option>
    <option value="mile">Mile (mi)</option>
    <option value="nauticalMile">Nautical mile (nmi)</option>
    <option value="fathom">Fathom</option>
    <option value="rod">Rod</option>
    <option value="chain">Chain</option>
    <option value="cubit">Cubit</option>
    <option value="span">Span</option>
    <option value="angstrom">Angstrom (Å)</option>
    <option value="au">Astronomical unit (au)</option>
    <option value="ly">Light-year (ly)</option>
    <option value="kly">Kilolight-year (kly)</option>
    <option value="Mly">Megalight-year (Mly)</option>
    <option value="Gly">Gigalight-year (Gly)</option>
    <option value="pc">Parsec (pc)</option>
    <option value="kpc">Kiloparsec (kpc)</option>
    <option value="Mpc">Megaparsec (Mpc)</option>
    <option value="Gpc">Gigaparsec (Gpc)</option>
    <option value="Tpc">Teraparsec (Tpc)</option>
    <option value="Ppc">Petaparsec (Ppc)</option>
    <option value="Epc">Exaparsec (Epc)</option>
    <option value="Zpc">Zettaparsec (Zpc)</option>
    <option value="Ypc">Yottaparsec (Ypc)</option>
  `,
  mass: `
    <option value="qg">Quectogram (qg)</option>
    <option value="rg">Rontogram (rg)</option>
    <option value="yg">Yoctogram (yg)</option>
    <option value="zg">Zeptogram (zg)</option>
    <option value="ag">Attogram (ag)</option>
    <option value="fg">Femtogram (fg)</option>
    <option value="pg">Picogram (pg)</option>
    <option value="ng">Nanogram (ng)</option>
    <option value="µg">Microgram (µg)</option>
    <option value="mg">Milligram (mg)</option>
    <option value="g">Gram (g)</option>
    <option value="dag">Decagram (dag)</option>
    <option value="hg">Hectogram (hg)</option>
    <option value="kg">Kilogram (kg)</option>
    <option value="Mg">Megagram (Mg)</option>
    <option value="Gg">Gigagram (Gg)</option>
    <option value="Tg">Teragram (Tg)</option>
    <option value="Pg">Petagram (Pg)</option>
    <option value="Eg">Exagram (Eg)</option>
    <option value="Zg">Zettagram (Zg)</option>
    <option value="Yg">Yottagram (Yg)</option>
    <option value="Rg">Ronnagram (Rg)</option>
    <option value="Qg">Quettagram (Qg)</option>
    <option value="ounce">Ounce (oz)</option>
    <option value="pound">Pound (lb)</option>
    <option value="stone">Stone (st)</option>
    <option value="quarter">UK Quarter</option>
    <option value="hundredweight">UK Hundredweight</option>
    <option value="tonUK">Ton (UK)</option>
    <option value="tonUS">Ton (US)</option>
    <option value="electronMass">Electron mass</option>
    <option value="protonMass">Proton mass</option>
    <option value="neutronMass">Neutron mass</option>
    <option value="atomicMassUnit">Atomic mass unit (u)</option>
    <option value="earthMass">Earth mass</option>
    <option value="sunMass">Sun mass</option>
    <option value="jupiterMass">Jupiter mass</option>
  `,
  area: `
    <option value="mm2">Square millimeter (mm²)</option>
    <option value="cm2">Square centimeter (cm²)</option>
    <option value="dm2">Square decimeter (dm²)</option>
    <option value="m2">Square meter (m²)</option>
    <option value="km2">Square kilometer (km²)</option>
    <option value="are">Are</option>
    <option value="hectare">Hectare (ha)</option>
    <option value="in2">Square inch (in²)</option>
    <option value="ft2">Square foot (ft²)</option>
    <option value="yd2">Square yard (yd²)</option>
    <option value="mi2">Square mile (mi²)</option>
    <option value="rod2">Square rod</option>
    <option value="chain2">Square chain</option>
    <option value="acre">Acre</option>
    <option value="dunam">Dunam</option>
    <option value="barn">Barn</option>
  `,
  volume: `
    <option value="mm3">Cubic millimeter (mm³)</option>
    <option value="cm3">Cubic centimeter (cm³)</option>
    <option value="dm3">Cubic decimeter (dm³)</option>
    <option value="m3">Cubic meter (m³)</option>
    <option value="km3">Cubic kilometer (km³)</option>
    <option value="milliliter">Milliliter (mL)</option>
    <option value="liter">Liter (L)</option>
    <option value="in3">Cubic inch (in³)</option>
    <option value="ft3">Cubic foot (ft³)</option>
    <option value="yd3">Cubic yard (yd³)</option>
    <option value="cup">Cup</option>
    <option value="tbsp">Tablespoon</option>
    <option value="tsp">Teaspoon</option>
    <option value="pt">Pint (pt)</option>
    <option value="qt">Quart (qt)</option>
    <option value="gal">Gallon (gal)</option>
    <option value="bbl">Barrel (bbl)</option>
    <option value="acre_ft">Acre-foot</option>
    <option value="cord">Cord</option>
    <option value="hogshead">Hogshead</option>
  `,
  angle: `
    <option value="radUnit">Radian (rad)</option>
    <option value="degUnit">Degree (°)</option>
    <option value="arcminUnit">Arcminute (′)</option>
    <option value="arcsecUnit">Arcsecond (″)</option>
    <option value="rev">Revolution (rev)</option>
    <option value="gradUnit">Grad (gon)</option>
    <option value="mradUnit">Milliradian (mrad)</option>
  `,
  temperature: `
    <option value="K">Kelvin (K)</option>
    <option value="C">Celsius (°C)</option>
    <option value="F">Fahrenheit (°F)</option>
    <option value="R">Rankine (°R)</option>
    <option value="Re">Réaumur (°Re)</option>
    <option value="De">Delisle (°De)</option>
    <option value="N">Newton (°N)</option>
    <option value="Ro">Rømer (°Ro)</option>
    <option value="gasMark">Gas mark</option>
    <option value="Leiden">Leiden</option>
    <option value="Planck">Planck temperature</option>
    <option value="triplePointWater">Triple point of water</option>
  `,
  energy: `
    <option value="J">Joule (J)</option>
    <option value="kJ">Kilojoule (kJ)</option>
    <option value="MJ">Megajoule (MJ)</option>
    <option value="GJ">Gigajoule (GJ)</option>
    <option value="TJ">Terajoule (TJ)</option>
    <option value="PJ">Petajoule (PJ)</option>
    <option value="EJ">Exajoule (EJ)</option>
    <option value="ZJ">Zettajoule (ZJ)</option>
    <option value="YJ">Yottajoule (YJ)</option>
    <option value="cal">Calorie (cal)</option>
    <option value="kcal">Kilocalorie (kcal)</option>
    <option value="Wh">Watt-hour (Wh)</option>
    <option value="kWh">Kilowatt-hour (kWh)</option>
    <option value="MWh">Megawatt-hour (MWh)</option>
    <option value="GWh">Gigawatt-hour (GWh)</option>
    <option value="eV">Electronvolt (eV)</option>
    <option value="keV">Kiloelectronvolt (keV)</option>
    <option value="MeV">Megaelectronvolt (MeV)</option>
    <option value="GeV">Gigaelectronvolt (GeV)</option>
    <option value="TeV">Teraelectronvolt (TeV)</option>
    <option value="erg">Erg</option>
    <option value="BTU">BTU (British Thermal Unit)</option>
    <option value="kcal_IT">Kilocalorie IT</option>
    <option value="tonTNT">Ton TNT</option>
    <option value="ft_lb">Foot-pound force</option>
    <option value="in_lb">Inch-pound force</option>
    <option value="hartree">Hartree</option>
    <option value="rydberg">Rydberg energy</option>
    <option value="planckEnergy">Planck energy</option>
  `,
  speed: `
    <option value="mps">Meter/second (m/s)</option>
    <option value="cmps">Centimeter/second (cm/s)</option>
    <option value="kmps">Kilometer/second (km/s)</option>
    <option value="kmph">Kilometer/hour (km/h)</option>
    <option value="mpm">Meter/minute (m/min)</option>
    <option value="mph">Mile/hour (mph)</option>
    <option value="fps">Foot/second (ft/s)</option>
    <option value="knots">Knot (kn)</option>
    <option value="c">Speed of light (c)</option>
    <option value="ly_per_year">Light-year per year</option>
    <option value="au_per_day">Astronomical unit/day</option>
    <option value="mach">Mach</option>
    <option value="planckSpeed">Planck speed</option>
  `,
  frequency: `
    <option value="Hz">Hertz (Hz)</option>
    <option value="kHz">Kilohertz (kHz)</option>
    <option value="MHz">Megahertz (MHz)</option>
    <option value="GHz">Gigahertz (GHz)</option>
    <option value="THz">Terahertz (THz)</option>
    <option value="PHz">Petahertz (PHz)</option>
    <option value="EHz">Exahertz (EHz)</option>
    <option value="ZHz">Zettahertz (ZHz)</option>
    <option value="YHz">Yottahertz (YHz)</option>
    <option value="cyclePerSecond">Cycle per second</option>
    <option value="rpm">Revolutions per minute (rpm)</option>
    <option value="rps">Revolutions per second (rps)</option>
    <option value="THz_light">THz (visible/IR light)</option>
    <option value="GHz_radio">GHz (radio)</option>
    <option value="MHz_radio">MHz (radio)</option>
    <option value="Hz_audio">Hz (audio)</option>
  `,
  pressure: `
    <option value="Pa">Pascal (Pa)</option>
    <option value="kPa">Kilopascal (kPa)</option>
    <option value="MPa">Megapascal (MPa)</option>
    <option value="GPa">Gigapascal (GPa)</option>
    <option value="TPa">Terapascal (TPa)</option>
    <option value="bar">Bar</option>
    <option value="mbar">Millibar</option>
    <option value="atm">Atmosphere (atm)</option>
    <option value="torr">Torr</option>
    <option value="psi">Pound/in² (psi)</option>
    <option value="mmHg">Millimeter mercury (mmHg)</option>
    <option value="cmHg">Centimeter mercury (cmHg)</option>
    <option value="inHg">Inch mercury (inHg)</option>
    <option value="mmH2O">Millimeter water (mmH2O)</option>
    <option value="cmH2O">Centimeter water (cmH2O)</option>
    <option value="inH2O">Inch water (inH2O)</option>
  `,
  time: `
    <option value="planckTime">Planck time</option>
    <option value="yoctosecond">Yoctosecond</option>
    <option value="zeptosecond">Zeptosecond</option>
    <option value="attosecond">Attosecond</option>
    <option value="femtosecond">Femtosecond</option>
    <option value="picosecond">Picosecond</option>
    <option value="nanosecond">Nanosecond</option>
    <option value="microsecond">Microsecond</option>
    <option value="millisecond">Millisecond</option>
    <option value="second">Second</option>
    <option value="decasecond">Decasecond</option>
    <option value="hectosecond">Hectosecond</option>
    <option value="kilosecond">Kilosecond</option>
    <option value="megasecond">Megasecond</option>
    <option value="gigasecond">Gigasecond</option>
    <option value="minute">Minute</option>
    <option value="hour">Hour</option>
    <option value="day">Day</option>
    <option value="week">Week</option>
    <option value="fortnight">Fortnight</option>
    <option value="month">Month</option>
    <option value="year">Year</option>
    <option value="siderealYear">Sidereal year</option>
    <option value="tropicalYear">Tropical year</option>
    <option value="leapYear">Leap year</option>
    <option value="decade">Decade</option>
    <option value="century">Century</option>
    <option value="millennium">Millennium</option>
    <option value="olympiad">Olympiad (4 years)</option>
    <option value="lustrum">Lustrum (5 years)</option>
  `,
  power: `
    <option value="W">Watt (W)</option>
    <option value="kW">Kilowatt (kW)</option>
    <option value="MW">Megawatt (MW)</option>
    <option value="GW">Gigawatt (GW)</option>
    <option value="TW">Terawatt (TW)</option>
    <option value="PW">Petawatt (PW)</option>
    <option value="EW">Exawatt (EW)</option>
    <option value="ZW">Zettawatt (ZW)</option>
    <option value="YW">Yottawatt (YW)</option>
    <option value="hp">Horsepower (mechanical)</option>
    <option value="hpMetric">Horsepower (metric)</option>
    <option value="ft_lb_per_s">Foot-pound/second</option>
    <option value="BTU_per_h">BTU/hour</option>
    <option value="cal_per_s">Calorie/second</option>
    <option value="kcal_per_h">Kilocalorie/hour</option>
    <option value="erg_per_s">Erg/second</option>
    <option value="planckPower">Planck power</option>
  `,
  fuelEconomy: `
    <option value="L_per_100km">Liters/100 km</option>
    <option value="m3_per_km">m³/km</option>
    <option value="m3_per_m">m³/m</option>
    <option value="mpg_US">Miles/gallon (US)</option>
    <option value="mpg_UK">Miles/gallon (UK)</option>
    <option value="km_per_L">Kilometers/liter</option>
  `,
  memory: `
    <option value="bit">Bit</option>
    <option value="kbit">Kilobit</option>
    <option value="Mbit">Megabit</option>
    <option value="Gbit">Gigabit</option>
    <option value="Tbit">Terabit</option>
    <option value="Pbit">Petabit</option>
    <option value="Ebit">Exabit</option>
    <option value="Zbit">Zettabit</option>
    <option value="Ybit">Yottabit</option>
    <option value="B">Byte</option>
    <option value="KB">Kilobyte</option>
    <option value="MB">Megabyte</option>
    <option value="GB">Gigabyte</option>
    <option value="TB">Terabyte</option>
    <option value="PB">Petabyte</option>
    <option value="EB">Exabyte</option>
    <option value="ZB">Zettabyte</option>
    <option value="YB">Yottabyte</option>
    <option value="Kibit">Kibibit</option>
    <option value="Mibit">Mebibit</option>
    <option value="Gibit">Gibibit</option>
    <option value="Tibit">Tebibit</option>
    <option value="Pibit">Pebibit</option>
    <option value="Eibit">Exbibit</option>
    <option value="Zibit">Zebibit</option>
    <option value="Yibit">Yobibit</option>
    <option value="KiB">Kibibyte</option>
    <option value="MiB">Mebibyte</option>
    <option value="GiB">Gibibyte</option>
    <option value="TiB">Tebibyte</option>
    <option value="PiB">Pebibyte</option>
    <option value="EiB">Exbibyte</option>
    <option value="ZiB">Zebibyte</option>
    <option value="YiB">Yobibyte</option>
  `,
  dataTransferUnits: `
    <option value="bit_per_s">Bit/second</option>
    <option value="kbit_per_s">Kilobit/second</option>
    <option value="Mbit_per_s">Megabit/second</option>
    <option value="Gbit_per_s">Gigabit/second</option>
    <option value="Tbit_per_s">Terabit/second</option>
    <option value="Pbit_per_s">Petabit/second</option>
    <option value="Ebit_per_s">Exabit/second</option>
    <option value="Zbit_per_s">Zettabit/second</option>
    <option value="Ybit_per_s">Yottabit/second</option>
    <option value="Kibit_per_s">Kibibit/second</option>
    <option value="Mibit_per_s">Mebibit/second</option>
    <option value="Gibit_per_s">Gibibit/second</option>
    <option value="Tibit_per_s">Tebibit/second</option>
    <option value="Pibit_per_s">Pebibit/second</option>
    <option value="Eibit_per_s">Exbibit/second</option>
    <option value="Zibit_per_s">Zebibit/second</option>
    <option value="Yibit_per_s">Yobibit/second</option>
    <option value="B_per_s">Byte/second</option>
    <option value="KB_per_s">Kilobyte/second</option>
    <option value="MB_per_s">Megabyte/second</option>
    <option value="GB_per_s">Gigabyte/second</option>
    <option value="TB_per_s">Terabyte/second</option>
    <option value="PB_per_s">Petabyte/second</option>
    <option value="EB_per_s">Exabyte/second</option>
    <option value="ZB_per_s">Zettabyte/second</option>
    <option value="YB_per_s">Yottabyte/second</option>
    <option value="KiB_per_s">Kibibyte/second</option>
    <option value="MiB_per_s">Mebibyte/second</option>
    <option value="GiB_per_s">Gibibyte/second</option>
    <option value="TiB_per_s">Tebibyte/second</option>
    <option value="PiB_per_s">Pebibyte/second</option>
    <option value="EiB_per_s">Exbibyte/second</option>
    <option value="ZiB_per_s">Zebibyte/second</option>
    <option value="YiB_per_s">Yobibyte/second</option>
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
    ℓp: 1.616255e-35,                 // Planck length
    qm: 1e-30,                        // quecto-meter
    rm: 1e-27,                        // ronto-meter
    ym: 1e-24,                        // yocto-meter
    zm: 1e-21,                        // zepto-meter
    am: 1e-18,                        // atto-meter
    fm: 1e-15,                        // femto-meter
    pm: 1e-12,                        // pico-meter
    nm: 1e-9,                         // nano-meter
    µm: 1e-6,                         // micro-meter
    mm: 1e-3,                         // milli-meter
    cm: 1e-2,                         // centi-meter
    dm: 1e-1,                         // deci-meter
    m: 1,                             // meter
    km: 1e3,                          // kilometer
    Mm: 1e6,                          // megameter
    Gm: 1e9,                          // gigameter
    Tm: 1e12,                         // terameter
    Pm: 1e15,                         // petameter
    Em: 1e18,                         // exameter
    Zm: 1e21,                         // zettameter
    Ym: 1e24,                         // yottameter
    Rm: 1e27,                         // ronnameter
    bohrRadius: 5.29177210903e-11,    // Bohr radius
    classicalElectronRadius: 2.8179403262e-15, // electron radius
    comptonWavelength: 2.426310238e-12, // Compton wavelength of electron
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
    nauticalMile: 1852,
    fathom: 1.8288,
    rod: 5.0292,
    chain: 20.1168,
    cubit: 0.4572,
    span: 0.2286,
    angstrom: 1e-10,
    au: 149597870700,          // astronomical unit
    ly: 9.4607304725808e15,    // light-year
    kly: 9.4607304725808e18,   // kilolight-year
    Mly: 9.4607304725808e21,   // megalight-year
    Gly: 9.4607304725808e24,   // gigalight-year
    pc: 3.085677581491367e16,     // parsec
    kpc: 3.085677581491367e19,    // kiloparsec
    Mpc: 3.085677581491367e22,    // megaparsec
    Gpc: 3.085677581491367e25,    // gigaparsec
    Tpc: 3.085677581491367e28,    // teraparsec
    Ppc: 3.085677581491367e31,    // petaparsec
    Epc: 3.085677581491367e34,    // exaparsec
    Zpc: 3.085677581491367e37,    // zettaparsec
    Ypc: 3.085677581491367e40     // yottaparsec
  },
  mass: {
    electronMass: 9.1093837015e-31,    // kg
    protonMass: 1.67262192369e-27,     // kg
    neutronMass: 1.67492749804e-27,    // kg
    atomicMassUnit: 1.66053906660e-27, // 1 u (Dalton)
    qg: 1e-30,    // quectogram
    rg: 1e-27,    // rontogram
    yg: 1e-24,    // yoctogram
    zg: 1e-21,    // zeptogram
    ag: 1e-18,    // attogram
    fg: 1e-15,    // femtogram
    pg: 1e-12,    // picogram
    ng: 1e-9,     // nanogram
    µg: 1e-6,     // microgram
    mg: 1e-3,     // milligram
    g: 1e-3,      // gram
    dag: 0.01,    // decagram
    hg: 0.1,      // hectogram
    kg: 1,        // kilogram (base SI unit)
    Mg: 1e3,      // megagram / tonne
    Gg: 1e6,      // gigagram
    Tg: 1e9,      // teragram
    Pg: 1e12,     // petagram
    Eg: 1e15,     // exagram
    Zg: 1e18,     // zettagram
    Yg: 1e21,     // yottagram
    Rg: 1e24,     // ronnagram
    Qg: 1e27,     // quettagram
    ounce: 0.028349523125,      // oz
    pound: 0.45359237,          // lb
    stone: 6.35029318,          // st
    quarter: 12.70058636,       // UK quarter
    hundredweight: 50.80234544, // UK hundredweight
    tonUK: 1016.0469088,        // long ton
    tonUS: 907.18474,           // short ton
    earthMass: 5.9722e24,       // kg
    sunMass: 1.98847e30,        // kg
    jupiterMass: 1.89813e27,    // kg
  },
  area: {
    mm2: 1e-6,        // square millimeter
    cm2: 1e-4,        // square centimeter
    dm2: 1e-2,        // square decimeter
    m2: 1,            // square meter
    km2: 1e6,         // square kilometer
    are: 100,         // 1 are = 100 m²
    hectare: 10000,   // 1 ha = 10,000 m²
    in2: 0.00064516,  // square inch
    ft2: 0.092903,    // square foot
    yd2: 0.836127,    // square yard
    mi2: 2.58999e6,   // square mile
    rod2: 25.2929,    // square rod
    chain2: 404.686,  // square chain
    acre: 4046.8564224, // acre in m²
    dunam: 1000,      // dunam = 1,000 m²
    barn: 1e-28       // barn (atomic scale)
  },
  volume: {
    mml3: 1e-9,         // cubic millimeter
    cml3: 1e-6,         // cubic centimeter (1 mL)
    dml3: 1e-3,         // cubic decimeter (1 L)
    m3: 1,             // cubic meter
    km3: 1e9,          // cubic kilometer
    liter: 1e-3,       // liter = 1 dm³
    milliliter: 1e-6,  // mL = 1 cm³
    centiliter: 1e-5,  // cL
    deciliter: 1e-4,   // dL
    hectoliter: 0.1,   // hL
    kiloliter: 1,      // kL = 1 m³
    in3: 1.63871e-5,   // cubic inch
    ft3: 0.0283168,    // cubic foot
    yd3: 0.764555,     // cubic yard
    tsp: 4.92892e-6,   // US teaspoon
    tbsp: 1.47868e-5,  // US tablespoon
    fl_oz: 2.9574e-5,  // US fluid ounce
    cup: 0.000236588,  // US cup
    pt: 0.000473176,   // US pint
    qt: 0.000946353,   // US quart
    gal: 0.00378541,   // US gallon
    ft3_us: 0.0283168, // US cubic foot (same as ft3)
    bbl: 0.158987,     // barrel (oil, US)
    acre_ft: 1233.48,  // acre-foot
    cord: 3.62456,     // cord of wood
    hogshead: 0.238481, // wine barrel
  },
  angle: {
    rad: 1,                     // radian
    deg: Math.PI / 180,         // degree
    arcmin: Math.PI / 10800,    // minute of arc
    arcsec: Math.PI / 648000,   // second of arc
    rev: 2 * Math.PI,           // revolution / turn
    grad: Math.PI / 200,        // grad / gon / grade
    mrad: 0.001,                // milliradian
    microrad: 1e-6,             // microradian
    sextant: Math.PI / 12,      // 1/6 of a circle (historical)
    quadrant: Math.PI / 2,      // 1/4 of a circle
    fullCircle: 2 * Math.PI,    // synonym for rev
    turn: 2 * Math.PI,          // synonym for rev
  },
  temperature: {
    K: { factor: 1, offset: 0, type: "absolute" },           // Kelvin
    C: { factor: 1, offset: 273.15, type: "relative" },      // Celsius
    F: { factor: 5 / 9, offset: 255.372222, type: "relative" }, // Fahrenheit
    R: { factor: 5 / 9, offset: 0, type: "absolute" },         // Rankine
    Re: { factor: 1.25, offset: 0, type: "absolute" },       // Réaumur
    De: { factor: -2 / 3, offset: 373.15, type: "relative" },  // Delisle
    N: { factor: 100 / 33, offset: 273.15, type: "relative" }, // Newton
    Ro: { factor: 21 / 40, offset: 273.15, type: "relative" }, // Rømer
    gasMark: { factor: 14, offset: 121, type: "relative" },   // Gas mark
    Leiden: { factor: 1, offset: 0.0001, type: "absolute" }, // Leiden
    Planck: { factor: 1.416784e32, offset: 0, type: "absolute" }, // Planck temperature
    triplePointWater: { factor: 273.16, offset: 0, type: "absolute" },
    microK: { factor: 1e-6, offset: 0, type: "absolute" },   // microkelvin
    milliK: { factor: 1e-3, offset: 0, type: "absolute" },   // millikelvin
  },
  energy: {
    J: 1,
    kJ: 1e3,
    MJ: 1e6,
    GJ: 1e9,
    TJ: 1e12,
    PJ: 1e15,
    EJ: 1e18,
    ZJ: 1e21,
    YJ: 1e24,
    cal: 4.184,          // small calorie
    kcal: 4184,          // kilocalorie / food calorie
    Wh: 3600,            // watt-hour
    kWh: 3.6e6,          // kilowatt-hour
    MWh: 3.6e9,
    GWh: 3.6e12,
    eV: 1.602176634e-19, // electronvolt
    keV: 1.602176634e-16,
    MeV: 1.602176634e-13,
    GeV: 1.602176634e-10,
    TeV: 1.602176634e-7,
    erg: 1e-7,           // CGS unit
    BTU: 1055.05585,         // British Thermal Unit (ISO)
    kcal_IT: 4184,           // IT calorie
    tonTNT: 4.184e9,         // ton of TNT
    ft_lb: 1.3558179483314,  // foot-pound force
    in_lb: 0.112984829,      // inch-pound force
    hartree: 4.3597447222071e-18, // atomic unit of energy
    rydberg: 2.1798723611035e-18, // Rydberg constant energy
    planckEnergy: 1.9561e9,       // Planck energy in joules
  },
  speed: {
    mps: 1,                 // meters per second
    cmps: 0.01,             // centimeters per second
    kmps: 1000,             // kilometers per second
    kmph: 1000 / 3600,      // kilometers per hour
    mpm: 1 / 60,            // meters per minute
    mph: 1609.344 / 3600,   // miles per hour
    fps: 0.3048,            // feet per second
    knots: 1852 / 3600,     // nautical miles per hour
    c: 299792458,           // speed of light in vacuum
    ly_per_year: 299792458, // 1 light-year per year = c (approx)
    au_per_day: 149597870700 / 86400, // astronomical unit per day
    mach: 340.29,           // speed of sound at sea level, 20°C
    planckSpeed: 299792458  // Planck speed = c (upper limit)
  },
  frequency: {
    Hz: 1,          // 1 cycle per second
    kHz: 1e3,       // kilohertz
    MHz: 1e6,       // megahertz
    GHz: 1e9,       // gigahertz
    THz: 1e12,      // terahertz
    PHz: 1e15,      // petahertz
    EHz: 1e18,      // exahertz
    ZHz: 1e21,      // zettahertz
    YHz: 1e24,      // yottahertz
    cyclePerSecond: 1,        // same as Hz
    rpm: 1 / 60,                // revolutions per minute → Hz
    rps: 1,                   // revolutions per second → Hz
    THz_light: 1e12,          // visible/infrared range
    GHz_radio: 1e9,           // typical radio frequency
    MHz_radio: 1e6,
    Hz_audio: 1,               // audible range starts ~20 Hz
  },
  pressure: {
    Pa: 1,                 // pascal
    kPa: 1e3,
    MPa: 1e6,
    GPa: 1e9,
    TPa: 1e12,
    bar: 1e5,
    mbar: 100,
    atm: 101325,
    torr: 101325 / 760,     // mmHg
    psi: 6894.75729,        // pound per square inch
    mmHg: 133.322387,       // millimeter of mercury
    cmHg: 1333.22387,       // centimeter of mercury
    inHg: 3386.389,         // inch of mercury
    mmH2O: 9.80665,         // millimeter of water
    cmH2O: 98.0665,         // centimeter of water
    inH2O: 249.0889,        // inch of water
  },
  time: {
    planckTime: 5.391247e-44,   // seconds
    yoctosecond: 1e-24,
    zeptosecond: 1e-21,
    attosecond: 1e-18,
    femtosecond: 1e-15,
    picosecond: 1e-12,
    nanosecond: 1e-9,
    microsecond: 1e-6,
    millisecond: 1e-3,
    second: 1,
    decasecond: 10,
    hectosecond: 100,
    kilosecond: 1000,
    megasecond: 1e6,
    gigasecond: 1e9,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    fortnight: 1209600,
    year: 31556952,               // Julian year (365.25 days)
    siderealYear: 31558149.764,  // Sidereal year
    tropicalYear: 31556925.216,  // Tropical year
    leapYear: 31622400,           // 366 days
    decade: 315569520,
    century: 3.1556952e9,
    millennium: 3.1556952e10,
    olympiad: 126230400,          // 4 years
    lustrum: 157784760,           // 5 years
  },
  power: {
    W: 1,
    kW: 1e3,
    MW: 1e6,
    GW: 1e9,
    TW: 1e12,
    PW: 1e15,
    EW: 1e18,
    ZW: 1e21,
    YW: 1e24,
    hp: 745.699872,             // mechanical horsepower
    hpMetric: 735.49875,        // metric horsepower
    ft_lb_per_s: 1.3558179483314, // foot-pound per second
    BTU_per_h: 0.29307107,      // BTU per hour
    cal_per_s: 4.184,            // small calorie per second
    kcal_per_h: 1.16222222,      // food kcal per hour
    erg_per_s: 1e-7,             // CGS unit
    planckPower: 3.62831e52       // Planck power (theoretical maximum)
  },
  fuelEconomy: {
    L_per_100km: 0.01,              // liters per km → m³/m (1 L = 0.001 m³, 100 km = 100,000 m)
    m3_per_km: 1e-3,                 // cubic meters per km
    m3_per_m: 1e-3 / 1000,           // cubic meters per meter
    mpg_US: 0.425143707,             // miles per gallon (US) → m³/m
    mpg_UK: 0.35400619,              // miles per gallon (UK)
    km_per_L: 0.001,                 // kilometers per liter → m/m³ (reverse of L/100km)
  },
  memory: {
    nibble: 4,
    bit: 1,
    kbit: 1e3,
    Mbit: 1e6,
    Gbit: 1e9,
    Tbit: 1e12,
    Pbit: 1e15,
    Ebit: 1e18,
    Zbit: 1e21,
    Ybit: 1e24,
    B: 8,
    KB: 8e3,
    MB: 8e6,
    GB: 8e9,
    TB: 8e12,
    PB: 8e15,
    EB: 8e18,
    ZB: 8e21,
    YB: 8e24,
    Kibit: 1024,
    Mibit: 1024 ** 2,
    Gibit: 1024 ** 3,
    Tibit: 1024 ** 4,
    Pibit: 1024 ** 5,
    Eibit: 1024 ** 6,
    Zibit: 1024 ** 7,
    Yibit: 1024 ** 8,
    KiB: 1024 * 8,
    MiB: 1024 ** 2 * 8,
    GiB: 1024 ** 3 * 8,
    TiB: 1024 ** 4 * 8,
    PiB: 1024 ** 5 * 8,
    EiB: 1024 ** 6 * 8,
    ZiB: 1024 ** 7 * 8,
    YiB: 1024 ** 8 * 8
  },
  dataTransferUnits: {
    bit_per_s: 1,
    kbit_per_s: 1e3,
    Mbit_per_s: 1e6,
    Gbit_per_s: 1e9,
    Tbit_per_s: 1e12,
    Pbit_per_s: 1e15,
    Ebit_per_s: 1e18,
    Zbit_per_s: 1e21,
    Ybit_per_s: 1e24,
    Kibit_per_s: 1024,
    Mibit_per_s: 1024 ** 2,
    Gibit_per_s: 1024 ** 3,
    Tibit_per_s: 1024 ** 4,
    Pibit_per_s: 1024 ** 5,
    Eibit_per_s: 1024 ** 6,
    Zibit_per_s: 1024 ** 7,
    Yibit_per_s: 1024 ** 8,
    B_per_s: 8,
    KB_per_s: 8e3,
    MB_per_s: 8e6,
    GB_per_s: 8e9,
    TB_per_s: 8e12,
    PB_per_s: 8e15,
    EB_per_s: 8e18,
    ZB_per_s: 8e21,
    YB_per_s: 8e24,
    KiB_per_s: 1024 * 8,
    MiB_per_s: 1024 ** 2 * 8,
    GiB_per_s: 1024 ** 3 * 8,
    TiB_per_s: 1024 ** 4 * 8,
    PiB_per_s: 1024 ** 5 * 8,
    EiB_per_s: 1024 ** 6 * 8,
    ZiB_per_s: 1024 ** 7 * 8,
    YiB_per_s: 1024 ** 8 * 8,
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
function convertTemperature(value, from, to) {
  if (!from || !to) throw "Unknown unit";
  let K = value * from.factor + from.offset;
  return (K - to.offset) / to.factor;
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
