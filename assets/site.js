
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const form = document.querySelector('[data-request-form]');
if (form) {
  const status = document.querySelector('[data-form-status]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/request', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to send');
      form.reset();
      status.textContent = 'Request received. We’ll reply by email or phone.';
    } catch {
      status.textContent = 'Unable to send. Call 734-656-8652 or email service@onsitepropertysupport.com.';
    }
  });
}
