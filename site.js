// Semester line: places stops by date and slides the "today" marker into place.
(function(){
  const cohortList=document.querySelector('.checklist[data-store="mf2026-nyush"]');
  const isCohort=!!cohortList;
  if(isCohort){
    // The official Global Graduation date was Nov 18, 2026. Change the local timeline's placeholder date.
    const graduation=document.querySelector('.track .stop[data-date="2026-11-26"]');
    if(graduation){
      graduation.dataset.date='2026-11-18';
      const label=graduation.querySelector('span');
      if(label)label.innerHTML='Global graduation<em>Nov 18 · date passed</em>';
    }
  }
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
  if(isCohort){
    const pagehead=document.querySelector('.pagehead .wrap');
    if(pagehead){
      const status=document.createElement('aside');
      status.setAttribute('aria-label','Class of 2026 status as of November 23, 2026');
      status.style.cssText='margin:22px 0;padding:18px 20px;border-left:5px solid #e0483f;border-radius:8px;background:#f4eff8;color:#241b2b;line-height:1.55';
      status.innerHTML='<strong>November check-in · Monday, November 23</strong><p style="margin:8px 0 0">The Showcase date (Nov 12) and the official Global Graduation date (Wednesday, Nov 18) have passed. The ceremony was scheduled for 10:00 am–12:00 pm ET under the theme <em>What Change Looks Like: Courage, Creativity, Community</em>. See the <a href="https://www.millenniumfellows.org/global-graduation-2026" target="_blank" rel="noopener">official Global Graduation 2026 page</a> for details. The program lists project reports for November and impact stories for December. Check your official email for current submission instructions and exact deadlines; contact your <a href="mailto:ina.lee@nyu.edu,xz5492@nyu.edu?subject=Class%20of%202026%20follow-up">Campus Co-Directors</a> if you need local follow-up.';
      const buttons=pagehead.querySelector('.btns');
      if(buttons)pagehead.insertBefore(status,buttons);else pagehead.appendChild(status);
      const intro=pagehead.querySelector('p:not(.label)');
      if(intro)intro.textContent='Use this hub to check your Class of 2026 milestones, any outstanding November requirements, and December follow-up.';
    }
    const semesterIntro=document.querySelector('.semester .sub');
    if(semesterIntro)semesterIntro.textContent='The November event dates have passed. Your remaining work may include the project report and December impact story. Check your official email for current submission details.';
    const topShowcase=document.querySelector('.pagehead .btns a[href="#showcase"]');
    if(topShowcase)topShowcase.textContent='Showcase · Nov 12 (date passed)';
    const checklistIntro=document.querySelector('.checklist[data-store="mf2026-nyush"]')?.parentElement?.querySelector('.intro');
    if(checklistIntro)checklistIntro.textContent='Tick off each requirement as you complete it. Progress is saved in this browser only. Past dates do not mean a task is complete, and boxes are not checked automatically.';
    const showcase=document.querySelector('#showcase');
    if(showcase){
      const label=showcase.querySelector('.label');
      if(label)label.textContent='Showcase follow-up · date passed';
      const description=showcase.querySelector('.intro');
      if(description)description.textContent='The Class of 2026 Fellowship Showcase was scheduled for Thursday, November 12, 2026, with mixed-media project presentations and remarks from faculty advisor Katherine Tosi. For event follow-up, contact the Campus Co-Directors.';
      const items=showcase.querySelectorAll('ul li');
      if(items.length>=3){
        items[0].innerHTML='<b>When:</b> Thursday, November 12, about 5:30 to 7:30 pm';
        items[1].innerHTML='<b>Format:</b> mixed-media project presentations';
        items[2].innerHTML='<b>Where:</b> E303, NYU Shanghai';
      }
      const firstButton=showcase.querySelector('.btns .btn');
      if(firstButton)firstButton.textContent='Email the Co-Directors about follow-up';
      const closing=showcase.querySelector('p:last-child');
      if(closing)closing.textContent='For questions about local graduation requirements or your project report, email your Campus Co-Directors. Check official program email for final instructions.';
    }
    const timeline=document.querySelector('.track');
    if(timeline)timeline.setAttribute('aria-label','Class of 2026 timeline: Global Town Hall August 20, portal opens August 31, National Day break October 1 to 7, Fellowship Showcase date November 12 has passed, Global Graduation was scheduled for November 18, and impact stories are due in December.');
    const showcaseDue=document.querySelector('label[for="c10"] .when');
    if(showcaseDue)showcaseDue.textContent='Nov 12 · date passed';
    const graduationDue=document.querySelector('label[for="c8"] .when');
    if(graduationDue)graduationDue.textContent='Nov 18 · date passed';
    const reportDue=document.querySelector('label[for="c7"] .when');
    if(reportDue)reportDue.textContent='November · check email for exact deadline';
  }
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
