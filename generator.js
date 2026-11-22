(()=>{
      const root=document.getElementById('equivalent-generator-demo');
      const find=cls=>root.querySelector('.'+cls);
      const steps=[
        ['Исходная цепь: выделенная часть питает нагрузку справа.','Справа — нагрузка 2 Ом. Ток через неё в исходной цепи равен 1 А.','Заменим всю выделенную часть слева, сохранив поведение на выводах А и Б.'],
        ['Холостой ход: нагрузку отключили; вместо неё подключён идеальный вольтметр.','Без нагрузки между А и Б получается 4 В. Вольтметр ток не потребляет.','Это ЭДС будущего эквивалентного генератора: 4 В.'],
        ['Нагрузки нет. Источник 12 В временно заменён проводом.','Смотрим со стороны А и Б: резисторы 6 Ом и 3 Ом теперь соединены параллельно.','Вместе они дают 2 Ом — сопротивление будущего генератора.'],
        ['Вместо всей левой части — один источник и одно последовательное сопротивление.','Эквивалентный генератор: источник 4 В и сопротивление 2 Ом. Выводы А и Б те же.','Здесь 4 В — напряжение БЕЗ нагрузки. Нагрузку пока не подключали.'],
        ['Вернули ту же нагрузку к выводам А и Б.','Теперь источник 4 В питает два последовательных сопротивления по 2 Ом. Ток через нагрузку снова 1 А.','На нагрузке 2 В, как в исходной цепи. Замена сохранила её режим.']
      ];
      function select(value){
        const n=Number(value);if(!Number.isInteger(n)||!steps[n])return;
        const equivalent=n>=3, loaded=n===0||n===4, meter=n===1;
        find('eq-source').toggleAttribute('hidden',n===2);
        find('eq-source-wire').toggleAttribute('hidden',n!==2);
        find('eq-shunt').toggleAttribute('hidden',equivalent);find('eq-shunt-label').toggleAttribute('hidden',equivalent);
        find('eq-load').toggleAttribute('hidden',!loaded);find('eq-load-label').toggleAttribute('hidden',!loaded);
        find('eq-meter').toggleAttribute('hidden',!meter);find('eq-meter-symbol').toggleAttribute('hidden',!meter);
        find('eq-source-label').textContent=n===2?'0 В':equivalent?'4 В':'12 В';
        find('eq-series-label').textContent=equivalent?'Rэкв = 2 Ом':'R₁ = 6 Ом';
        find('eq-current').textContent=loaded?'I = 1 А ↓':meter?'4 В':'';
        ['stage-label','eq-action','eq-result'].forEach((cls,i)=>find(cls).textContent=steps[n][i]);
        root.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===n)));
      }

      root.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
        const n = Number(button.dataset.step);
        select(n);
        try { localStorage.setItem('elteh-generator', String(n)); } catch { /* Optional. */ }
      }));
      let saved = 0;
      try { saved = Number(localStorage.getItem('elteh-generator')) || 0; } catch { /* Optional. */ }
      select(saved);
    })();
