// Resources for fellows: filter cards by what a fellow is stuck on.
(function(){
  const bar=document.querySelector('.res-filter');
  if(!bar)return;
  bar.hidden=false;
  const btns=[...bar.querySelectorAll('button')], out=bar.querySelector('output');
  const groups=[...document.querySelectorAll('.res-group')];
  const cards=[...document.querySelectorAll('.res-list li')];
  const empty=document.querySelector('.res-empty');
  function apply(need){
    let n=0;
    cards.forEach(c=>{
      const show=need==='all'||(c.dataset.need||'').split(' ').includes(need);
      const was=c.hidden; c.hidden=!show;
      if(show){n++; if(was){c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}}
    });
    groups.forEach(g=>{g.hidden=![...g.querySelectorAll('li')].some(c=>!c.hidden)});
    btns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.need===need)));
    if(out)out.textContent=n+(n===1?' resource':' resources');
    if(empty)empty.hidden=n>0;
  }
  btns.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.need)));
  apply('all');
})();
