
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('nav');
if (menu && nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));

const reveals = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:.12});
  reveals.forEach(el=>io.observe(el));
} else {
  reveals.forEach(el=>el.classList.add('visible'));
}

const form=document.querySelector('[data-request-form]');
if(form){
  const status=document.querySelector('[data-status]');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.textContent='Sending…';
    const payload=Object.fromEntries(new FormData(form).entries());
    try{
      const r=await fetch('/api/request',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const d=await r.json();
      if(!r.ok) throw new Error(d.error||'Unable to send');
      form.reset();
      status.textContent='Request received. We’ll reply by email or phone.';
    }catch(err){
      status.textContent='Unable to send. Call 734-656-8652 or email service@onsitepropertysupport.com.';
    }
  });
}
