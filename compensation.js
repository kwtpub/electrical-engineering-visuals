(()=>{
      const root=document.getElementById('compensation-demo');
      const find=cls=>root.querySelector('.'+cls);
      const steps=[
        ['В исходной цепи два резистора последовательно. Находим ток.','I = E ÷ (R₁ + R₂).','I = 12 В ÷ (2 Ом + 4 Ом) = 2 А.'],
        ['Находим напряжение между А и Б — это напряжение на R₂.','UАБ = I × R₂. Ток 2 А уже нашли; сопротивление R₂ = 4 Ом дано.','UАБ = 2 А × 4 Ом = 8 В. Потенциал А выше потенциала Б.'],
        ['Убираем R₂ и вместо него ставим идеальный источник ЭДС Eк = 8 В.','Сохраняем полярность: плюс у А, минус у Б; стрелка ЭДС вверх.','Eк = UАБ = 8 В. Источник E = 12 В и резистор R₁ = 2 Ом остаются.'],
        ['Снова находим ток в оставшейся ветви с R₁.','По Кирхгофу: E − I × R₁ − Eк = 0. Значит I = (E − Eк) ÷ R₁.','I = (12 В − 8 В) ÷ 2 Ом = 2 А. Ток сохранился!']
      ];
      function select(value){
        const n=Number(value);if(!Number.isInteger(n)||!steps[n])return;
        const replaced=n>=2;
        find('load').toggleAttribute('hidden',replaced);
        find('comp-source').toggleAttribute('hidden',!replaced);
        find('polarity').toggleAttribute('hidden',!replaced);
        find('part-name').textContent=replaced?'Eк':'R₂';find('part-value').textContent=replaced?'8 В':'4 Ом';
        root.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===n)));
        ['meaning','comp-formula','numbers'].forEach((cls,i)=>find(cls).textContent=steps[n][i]);
      }

      root.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
        const n = Number(button.dataset.step);
        select(n);
        try { localStorage.setItem('elteh-compensation', String(n)); } catch { /* Optional. */ }
      }));
      let saved = 0;
      try { saved = Number(localStorage.getItem('elteh-compensation')) || 0; } catch { /* Optional. */ }
      select(saved);
    })();
