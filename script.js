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
    if (round === 0){
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
  try { return eval(raw.replace(/π/g,'Math.PI')); } 
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
  try { theta = eval(match[2].replace(/π/g,'Math.PI')); } 
  catch { return null; }
  return { r, theta };
}
function updatePlaceholder() {
  const mode = document.getElementById('triMode').value;
  const op = document.getElementById('triOp').value;
  const input = document.getElementById('triVal');
  if (['asin','acos','atan','acsc','asec','acot'].includes(op))
    input.placeholder = 'Enter value';
  else if (['sinh','cosh','tanh','csch','sech','coth'].includes(op))
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
  const near = (a,b) => Math.abs(a-b)<tol;

  switch(op) {
    case 'sin':
      if(near(angle,0)||near(angle,2*pi)) return '0';
      if(near(angle,pi/6)||near(angle,11*pi/6)) return '1/2';
      if(near(angle,pi/4)||near(angle,7*pi/4)) return '√2/2';
      if(near(angle,pi/3)||near(angle,5*pi/3)) return '√3/2';
      if(near(angle,pi/2)) return '1';
      if(near(angle,pi)) return '0';
      break;
    case 'cos':
      if(near(angle,0)||near(angle,2*pi)) return '1';
      if(near(angle,pi/6)||near(angle,11*pi/6)) return '√3/2';
      if(near(angle,pi/4)||near(angle,7*pi/4)) return '√2/2';
      if(near(angle,pi/3)||near(angle,5*pi/3)) return '1/2';
      if(near(angle,pi/2)||near(angle,3*pi/2)) return '0';
      if(near(angle,pi)) return '-1';
      break;
    case 'tan':
      if(near(angle,0)||near(angle,pi)||near(angle,2*pi)) return '0';
      if(near(angle,pi/6)||near(angle,7*pi/6)) return '1/√3';
      if(near(angle,pi/4)||near(angle,5*pi/4)) return '1';
      if(near(angle,pi/3)||near(angle,4*pi/3)) return '√3';
      if(near(angle,pi/2)||near(angle,3*pi/2)) return 'undefined';
      break;
    case 'csc':
      if(near(angle,0)||near(angle,pi)||near(angle,2*pi)) return 'undefined';
      if(near(angle,pi/6)||near(angle,5*pi/6)) return '2';
      if(near(angle,pi/4)||near(angle,3*pi/4)) return '√2';
      if(near(angle,pi/3)||near(angle,2*pi/3)) return '2√3/3';
      if(near(angle,pi/2)) return '1';
      break;
    case 'sec':
      if(near(angle,pi/2)||near(angle,3*pi/2)) return 'undefined';
      if(near(angle,0)||near(angle,2*pi)) return '1';
      if(near(angle,pi/6)||near(angle,11*pi/6)) return '2√3/3';
      if(near(angle,pi/4)||near(angle,7*pi/4)) return '√2';
      if(near(angle,pi/3)||near(angle,5*pi/3)) return '2';
      if(near(angle,pi)) return '-1';
      break;
    case 'cot':
      if(near(angle,0)||near(angle,pi)||near(angle,2*pi)) return 'undefined';
      if(near(angle,pi/6)||near(angle,7*pi/6)) return '√3';
      if(near(angle,pi/4)||near(angle,5*pi/4)) return '1';
      if(near(angle,pi/3)||near(angle,4*pi/3)) return '1/√3';
      if(near(angle,pi/2)) return '0';
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

 else if (mode==='rad') {
    x = parseRadianInput(raw);
  } else {
    x = Number(raw);
  }
  if (isNaN(x)) { outEl.textContent='Invalid input'; return; }

  const toRad = v => mode==='deg'? v*Math.PI/180 : v;
  const fromRad = v => mode==='deg'? v*180/Math.PI : v;
  const angle = toRad(x);

  let res;
  try {
    if (polar) {
      res = evalTrig(op, polar.theta, mode);
    } else {
      res = evalTrig(op, angle, mode);
    }
    switch(op) {
      case 'sin': res=Math.sin(angle); break;
      case 'cos': res=Math.cos(angle); break;
      case 'tan': res=Math.tan(angle); break;
      case 'csc': res=1/Math.sin(angle); break;
      case 'sec': res=1/Math.cos(angle); break;
      case 'cot': res=1/Math.tan(angle); break;
      case 'asin': res=fromRad(Math.asin(x)); break;
      case 'acos': res=fromRad(Math.acos(x)); break;
      case 'atan': res=fromRad(Math.atan(x)); break;
      case 'asec': res=fromRad(Math.acos(1/x)); break;
      case 'acsc': res=fromRad(Math.asin(1/x)); break;
      case 'acot': res=fromRad(Math.atan(1/x)); break;
      case 'sinh': res=Math.sinh(x); break;
      case 'cosh': res=Math.cosh(x); break;
      case 'tanh': res=Math.tanh(x); break;
      case 'csch': res=1/Math.sinh(x); break;
      case 'sech': res=1/Math.cosh(x); break;
      case 'coth': res=1/Math.tanh(x); break;
      default: res=NaN;
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
  } catch(e) { outEl.textContent='Error: '+e.message; }
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
snakeCanvas.width = 25 *  Math.floor(snakeSize / 25);
snakeCanvas.height = 25 *  Math.floor(snakeSize / 25);
let snakeBox = Math.floor(snakeSize / 25);
snakeCanvas.width = 25 * snakeBox;
snakeCanvas.height = 25 * snakeBox;
let snake, snakeDirection, snakeFood,snakeScore, snakeFoodsEaten;
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
jetShooterRightBtn.addEventListener('touchstart', (e) => {  if (!jetShooterRunning) { return; } e.preventDefault(); movement = 1; }, { passive: false });
jetShooterRightBtn.addEventListener('touchend', () => { if (movement === 1) movement = 0; });
jetShooterRightBtn.addEventListener('touchcancel', () => { if (movement === 1) movement = 0; });
jetShooterShootBtn.addEventListener('touchstart', (e) => {  if (!jetShooterRunning) { return; } e.preventDefault(); isShooting = true; }, { passive: false });
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
    F: { factor: 5/9, offset: 255.372222, type: "relative" }, // Fahrenheit
    R: { factor: 5/9, offset: 0, type: "absolute" },         // Rankine
    Re: { factor: 1.25, offset: 0, type: "absolute" },       // Réaumur
    De: { factor: -2/3, offset: 373.15, type: "relative" },  // Delisle
    N: { factor: 100/33, offset: 273.15, type: "relative" }, // Newton
    Ro: { factor: 21/40, offset: 273.15, type: "relative" }, // Rømer
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
    rpm: 1/60,                // revolutions per minute → Hz
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
    Mibit_per_s: 1024**2,
    Gibit_per_s: 1024**3,
    Tibit_per_s: 1024**4,
    Pibit_per_s: 1024**5,
    Eibit_per_s: 1024**6,
    Zibit_per_s: 1024**7,
    Yibit_per_s: 1024**8,
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
    MiB_per_s: 1024**2 * 8,
    GiB_per_s: 1024**3 * 8,
    TiB_per_s: 1024**4 * 8,
    PiB_per_s: 1024**5 * 8,
    EiB_per_s: 1024**6 * 8,
    ZiB_per_s: 1024**7 * 8,
    YiB_per_s: 1024**8 * 8,
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
