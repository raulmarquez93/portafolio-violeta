import './styles/main.css';

const container = document.getElementById('bubbles');

if (container) {
  container.innerHTML = '';

  const COUNT = 48;                // cantidad de burbujas
  const DUR_MIN = 4, DUR_VAR = 8; // 8s–18s
  const SIZE_MIN = 10, SIZE_VAR = 40; // 14px–68px

  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement('div');
    const inner = document.createElement('div');

    // propiedades base
    const size  = SIZE_MIN + Math.random() * SIZE_VAR;
    const left  = Math.random() * 100;          
    const dur   = DUR_MIN + Math.random() * DUR_VAR;
    const delay = Math.random() * 5;
    const amp   = 6 + Math.random() * 16; // amplitud px

    // burbuja exterior (vertical)
    b.className = 'bubble';
    b.style.width  = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left   = `${left}%`;
    b.style.animationDuration = `${dur}s`;

    // burbuja interior (horizontal)
    inner.classList.add('bubble-inner');
    b.appendChild(inner);

    // 👇 Oscilación horizontal en el elemento HIJO (no en `b`)
    inner.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(${amp}px)` },
        { transform: `translateX(-${amp}px)` },
        { transform: 'translateX(0)' }
      ],
      {
        duration: 2500 + Math.random() * 2000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    );

    container.appendChild(b);
  }
}

const form = document.getElementById('contact-form');
const msg  = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = 'Enviando…';
    msg.classList.remove('opacity-0');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        msg.textContent = '¡Mensaje enviado! Te responderé muy pronto.';
        form.reset();
      } else {
        msg.textContent = 'Hubo un problema al enviar. Inténtalo de nuevo.';
      }
    } catch {
      msg.textContent = 'No hay conexión. Vuelve a intentarlo.';
    }
    setTimeout(() => msg.classList.add('opacity-0'), 4000);
  });
}
