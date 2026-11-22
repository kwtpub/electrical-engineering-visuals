(() => {
  'use strict';
  const root = document.getElementById('lab-three-nodes');
  const descriptions = {
    1: ['Узел 1: соединение ветвей с R₂, R₃ и R₇.', 'Входит: I₂. Выходят: I₃ и I₇.', 'I₂ = I₃ + I₇'],
    2: ['Узел 2: соединение ветвей с R₇, R₅ и R₆.', 'Входит: I₇. Выходят: I₅ и I₆.', 'I₇ = I₅ + I₆'],
    3: ['Узел 3: весь нижний провод и его ответвления до элементов.', 'Входят: I₃, I₅ и I₆. Выходит: I₂.', 'I₃ + I₅ + I₆ = I₂']
  };
  function select(value) {
    const n = Number(value);
    if (!descriptions[n]) return;
    root.querySelectorAll('[data-node]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.node) === n)));
    root.querySelectorAll('[data-highlight]').forEach(group => group.setAttribute('visibility', Number(group.dataset.highlight) === n ? 'visible' : 'hidden'));
    root.querySelectorAll('[data-dot]').forEach(dot => dot.classList.toggle('selected', Number(dot.dataset.dot) === n));
    ['connections', 'currents', 'balance'].forEach((cls, i) => root.querySelector('.' + cls).textContent = descriptions[n][i]);
  }
  root.querySelectorAll('[data-node]').forEach(button => button.addEventListener('click', () => {
    const n = Number(button.dataset.node);
    select(n);
    try { localStorage.setItem('elteh-node', String(n)); } catch { /* Optional. */ }
  }));
  let saved = 1;
  try { saved = Number(localStorage.getItem('elteh-node')) || 1; } catch { /* Optional. */ }
  select(saved);
})();
