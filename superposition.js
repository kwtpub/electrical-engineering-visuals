(()=>{
      const root=document.getElementById('superposition-simple');
      const find=cls=>root.querySelector('.'+cls);
      const steps=[
        ['Дано: E₁ = 12 В; E₂ = 6 В; R = 6 Ом.','Ток вправо считаем положительным. Оба источника направлены вверх и в этом контуре действуют встречно.','Будем находить вклад каждого источника отдельно.','',''],
        ['Оставляем E₁ = 12 В. Источник E₂ заменяем проводом: его ЭДС теперь 0 В.','Сопротивление R = 6 Ом оставляем. Цепь по-прежнему замкнута.','Второй закон Кирхгофа: E₁ − I′ × R = 0.','I′ = E₁ ÷ R = 12 В ÷ 6 Ом = +2 А.','Вклад первого источника: 2 А вправо.'],
        ['Возвращаем E₂ = 6 В. Теперь E₁ заменяем проводом: его ЭДС равна 0 В.','Второй источник создаёт ток влево. Поэтому относительно выбранной стрелки ток отрицательный.','При том же обходе по часовой стрелке: −E₂ − I″ × R = 0.','I″ = −E₂ ÷ R = −6 В ÷ 6 Ом = −1 А.','Вклад второго источника: 1 А влево, то есть −1 А по нашей стрелке.'],
        ['Возвращаем оба источника. Складываем вклады с их знаками.','Принцип наложения для линейной цепи: общий ток равен алгебраической сумме частичных токов.','I = I′ + I″.','I = (+2 А) + (−1 А) = 1 А вправо.','Проверка по Кирхгофу: 12 В − (1 А × 6 Ом) − 6 В = 0 В.']
      ];
      function select(value){
        const n=Number(value);if(!Number.isInteger(n)||!steps[n])return;
        root.querySelectorAll('[data-step]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.step)===n)));
        find('source-one').toggleAttribute('hidden',n===2);
        find('source-two').toggleAttribute('hidden',n===1);
        find('wire-one').toggleAttribute('hidden',n!==2);
        find('wire-two').toggleAttribute('hidden',n!==1);
        find('source-one-label').textContent=n===2?'E₁ = 0 В':'E₁ = 12 В';
        find('source-two-label').textContent=n===1?'E₂ = 0 В':'E₂ = 6 В';
        const arrow=find('actual-arrow');arrow.toggleAttribute('hidden',n===0);
        arrow.setAttribute('x1',n===2?'66%':'34%');arrow.setAttribute('x2',n===2?'34%':'66%');
        find('actual-label').textContent=['Ток пока неизвестен','I′ = +2 А, вправо','I″ = −1 А, влево','I = +1 А, вправо'][n];
        ['action','rule','equation','calculation','result'].forEach((cls,i)=>{find(cls).textContent=steps[n][i];find(cls).hidden=!steps[n][i];});
      }

      root.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
        const value = button.dataset.step;
        select(value);
        try { localStorage.setItem('elteh-superposition', value); } catch { /* Optional. */ }
      }));
      let saved = 0;
      try { saved = localStorage.getItem('elteh-superposition') ?? 0; } catch { /* Optional. */ }
      select(saved);
    })();
