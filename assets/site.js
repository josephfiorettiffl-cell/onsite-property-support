
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('#primary-navigation');
if (menu && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
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
