(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const a = el('potential-a'), b = el('potential-b'), packet = el('energy-packet');
  const play = el('voltage-play'), dot = el('energy-charge');
  let swapped = false, progress = 0, moving = false, previous = 0;
  const format = n => Number(n.toFixed(2)).toLocaleString('ru-RU');
  const difference = () => Number(a.value) - Number(b.value);
  function render() {
    const delta = difference(), q = Number(packet.value);
    el('potential-a-value').textContent = a.value + ' В';
    el('potential-b-value').textContent = b.value + ' В';
    el('level-a-label').textContent = a.value + ' В';
    el('level-b-label').textContent = b.value + ' В';
    el('level-a').style.height = Number(a.value) * 5 + '%';
    el('level-b').style.height = Number(b.value) * 5 + '%';
    el('potential-gap').textContent = format(delta) + ' В';
    el('voltmeter-label').textContent = swapped ? 'Вольтметр: U_BA' : 'Вольтметр: U_AB';
    el('voltmeter').textContent = format(swapped ? -delta : delta) + ' В';
    el('voltage-current').textContent = format(delta / 100) + ' А';
    el('voltage-work').textContent = format(progress >= 1 ? q * Math.abs(delta) : 0) + ' Дж';
    el('probe-status').textContent = swapped
      ? 'Красный щуп на B, чёрный на A. Поменялся знак показания, сама цепь не изменилась.'
      : 'Красный щуп на A, чёрный на B. Вольтметр подключён параллельно резистору.';
    const start = delta >= 0 ? 12 : 88, end = delta >= 0 ? 88 : 12;
    dot.setAttribute('cx', start + (end - start) * progress + '%');
    dot.setAttribute('visibility', moving || progress >= 1 ? 'visible' : 'hidden');
    play.disabled = delta === 0;
    if (delta === 0) el('voltage-status').textContent = 'Потенциалы равны: напряжение 0 В, ток через резистор 0 А. Направленного переноса в этой модели нет.';
    else if (progress >= 1) el('voltage-status').textContent = 'Заряд ' + format(q) + ' Кл прошёл от ' + (delta > 0 ? 'A к B' : 'B к A') + '. Резистору передано ' + format(q * Math.abs(delta)) + ' Дж.';
    else el('voltage-status').textContent = 'Положительный заряд движется от ' + (delta > 0 ? 'A к B' : 'B к A') + ': от большего потенциала к меньшему.';
  }
  function reset() {moving = false; progress = 0; play.textContent = 'Показать перенос заряда'; render();}
  [a, b].forEach(input => input.addEventListener('input', reset));
  packet.addEventListener('change', reset);
  el('swap-probes').addEventListener('click', () => {
    swapped = !swapped;
    el('swap-probes').setAttribute('aria-pressed', String(swapped));
    render();
  });
  play.addEventListener('click', () => {
    if (difference() === 0) return;
    if (moving) {moving = false; play.textContent = 'Продолжить перенос'; return;}
    if (progress >= 1) progress = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress = 1; play.textContent = 'Повторить перенос'; render(); return;
    }
    moving = true; previous = performance.now(); play.textContent = 'Пауза'; render();
  });
  document.addEventListener('visibilitychange', () => {previous = performance.now();});
  function frame(now) {
    if (moving && !document.hidden) {
      progress = Math.min(1, progress + Math.min((now - previous) / 1000, 0.1) / 2.5);
      if (progress >= 1) {moving = false; play.textContent = 'Повторить перенос';}
      render();
    }
    previous = now;
    requestAnimationFrame(frame);
  }
  render(); requestAnimationFrame(frame);
})();
