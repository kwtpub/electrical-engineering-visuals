(()=>{
      const root=document.getElementById('reciprocity-demo');
      const find=cls=>root.querySelector('.'+cls);
      function select(side){
        if(!['left','right'].includes(side))return;
        const left=side==='left';
        find('left-source').toggleAttribute('hidden',!left);
        find('right-source').toggleAttribute('hidden',left);
        find('left-meter').toggleAttribute('hidden',left);
        find('right-meter').toggleAttribute('hidden',!left);
        find('left-label').textContent=left?'12 В':'1 А';
        find('right-label').textContent=left?'1 А':'12 В';
        find('placement').textContent=left?'Источник 12 В — слева. Амперметр — справа.':'Тот же источник 12 В — справа. Амперметр — слева.';
        find('reading').textContent=left?'Ток в правой ветви: 1 А вниз.':'Ток в левой ветви: тоже 1 А вниз.';
        root.querySelectorAll('[data-side]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.side===side)));
      }

      root.querySelectorAll('[data-side]').forEach(button => button.addEventListener('click', () => {
        const value = button.dataset.side;
        select(value);
        try { localStorage.setItem('elteh-reciprocity', value); } catch { /* Optional. */ }
      }));
      let saved = 'left';
      try { saved = localStorage.getItem('elteh-reciprocity') ?? 'left'; } catch { /* Optional. */ }
      select(saved);
    })();
