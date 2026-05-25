// Tab switching for services
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.services');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((t) => t.classList.toggle('tab--active', t === tab));
    panes.forEach((p) => {
      p.classList.toggle('services--hidden', p.dataset.pane !== target);
    });
  });
});

// Smooth scroll polyfill for older browsers + offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length <= 1) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const offset = 76;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Form handler — opens default mail client with prefilled data
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = data.get('name') || '';
  const phone = data.get('phone') || '';
  const service = data.get('service') || '';
  const message = data.get('message') || '';

  const subject = encodeURIComponent('Заявка с сайта — ' + service);
  const body = encodeURIComponent(
    'Имя: ' + name + '\n' +
    'Телефон: ' + phone + '\n' +
    'Услуга: ' + service + '\n\n' +
    'Комментарий: ' + message
  );

  window.location.href = 'mailto:papoyandavid@icloud.com?subject=' + subject + '&body=' + body;

  setTimeout(() => {
    alert('Спасибо! Я свяжусь с вами в ближайшее время.\nЕсли почтовый клиент не открылся — позвоните напрямую: +7 905 316-77-23');
    form.reset();
  }, 300);

  return false;
}
