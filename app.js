(() => {
  'use strict';
  const select = document.getElementById('current');
  const play = document.getElementById('play');
  const time = document.getElementById('time');
  const charge = document.getElementById('charge');
  const rate = document.getElementById('rate');
  const status = document.getElementById('status');
  const group = document.getElementById('particles');
  let current = 1, elapsed = 0, running = false, previous = 0, lastTick = -1;
  const dots = [];
  const format = value => value.toFixed(1).replace('.', ',');
  try {
    const saved = Number(localStorage.getItem('elteh-current'));
    if ([0.5, 1, 2].includes(saved)) current = saved;
  } catch { /* The simulation also works when storage is unavailable. */ }
  select.value = String(current);
  for (let i = 0; i < 240; i++) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', 'var(--particle)');
    group.appendChild(dot);
    dots.push(dot);
  }
  function draw() {
    dots.forEach((dot, index) => {
      const k = index - 180;
      const x = 350 + (elapsed - 0.1 / current) * 180 + k * 18 / current;
      dot.setAttribute('cx', String(x));
      dot.setAttribute('cy', String(60 + ((k % 3 + 3) % 3) * 25));
      dot.style.display = x > 12 && x < 688 ? '' : 'none';
    });
    const tick = Math.floor((elapsed + 1e-7) * 10);
    if (tick !== lastTick) {
      lastTick = tick;
      time.textContent = format(elapsed) + ' с';
      const count = Math.floor((elapsed + 1e-7) * current / 0.1);
      charge.textContent = format(count * 0.1) + ' Кл';
    }
    rate.textContent = format(current) + ' Кл';
  }
  function complete() {
    running = false;
    play.textContent = 'Ещё 5 секунд';
    status.textContent = 'За 5 с прошло ' + format(current * 5) + ' Кл при токе ' + format(current) + ' А.';
  }
  function reset() {
    running = false; elapsed = 0; lastTick = -1;
    play.textContent = 'Наблюдать 5 секунд';
    status.textContent = 'Выбери ток и начни наблюдение.';
    draw();
  }
  select.addEventListener('change', () => {
    current = Number(select.value);
    try { localStorage.setItem('elteh-current', String(current)); } catch { /* Optional. */ }
    reset();
  });
  play.addEventListener('click', () => {
    if (running) {
      running = false; play.textContent = 'Продолжить'; status.textContent = 'Наблюдение приостановлено.';
    } else {
      if (elapsed >= 5) reset();
      running = true; previous = performance.now(); play.textContent = 'Пауза';
      status.textContent = 'Считаем заряд, пересёкший выделенное сечение.';
    }
  });
  document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('step').addEventListener('click', () => {
    if (elapsed >= 5) reset();
    running = false;
    elapsed = Math.min(5, elapsed + 1);
    play.textContent = 'Продолжить';
    status.textContent = 'Добавлена 1 секунда наблюдения.';
    draw();
    if (elapsed >= 5) complete();
  });
  document.addEventListener('visibilitychange', () => {previous = performance.now();});
  function frame(now) {
    if (running && !document.hidden) {
      elapsed = Math.min(5, elapsed + Math.min((now - previous) / 1000, 0.1));
      draw();
      if (elapsed >= 5) complete();
    }
    previous = now;
    requestAnimationFrame(frame);
  }
  draw();
  requestAnimationFrame(frame);
})();
