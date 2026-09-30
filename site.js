// Semester line: places stops by date and slides the "today" marker into place.
(function(){
  const start=new Date(2026,7,1), end=new Date(2026,11,31), span=end-start;
  const pct=d=>Math.max(0,Math.min(100,(d-start)/span*100));
  document.querySelectorAll('.track').forEach(t=>{
    t.querySelectorAll('[data-date]').forEach(el=>{
      const [y,m,d]=el.dataset.date.split('-').map(Number);
      el.style.left=pct(new Date(y,m-1,d))+'%';
    });
    const now0=new Date();
    t.querySelectorAll('.stop').forEach(s=>{const [y,m,d]=s.dataset.date.split('-').map(Number);if(new Date(y,m-1,d)<=now0)s.classList.add('past')});
    const now=now0, p=pct(now), inRange=now>=start&&now<=end;
    const done=t.querySelector('.done'), mark=t.querySelector('.now');
    const vertical=()=>window.matchMedia('(max-width:700px)').matches;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(vertical()){
        const stops=[...t.querySelectorAll('.stop')];
        const passed=stops.filter(s=>{const [y,m,d]=s.dataset.date.split('-').map(Number);return new Date(y,m-1,d)<=now});
        const last=passed[passed.length-1];
        done.style.height=last?(last.offsetTop+9)+'px':'0';
      } else {
        done.style.width=p+'%';
        if(mark&&inRange){mark.style.left=p+'%';mark.style.opacity=1}
      }
    }));
  });
  // Cohort checklist, saved only in this browser.
  const list=document.querySelector('.checklist[data-store]');
  if(list){
    const key=list.dataset.store, saved=JSON.parse(localStorage.getItem(key)||'{}');
    const boxes=[...list.querySelectorAll('input')], out=document.querySelector('.progress b');
    const tally=()=>{if(out)out.textContent=boxes.filter(b=>b.checked).length+' of '+boxes.length};
    boxes.forEach(b=>{b.checked=!!saved[b.id];b.addEventListener('change',()=>{saved[b.id]=b.checked;localStorage.setItem(key,JSON.stringify(saved));tally()})});
    tally();
  }
})();
