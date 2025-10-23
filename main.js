// main.js - cuenta regresiva, formulario y pequeñas interacciones

// Countdown: target 8 de diciembre 15:00 (si ya pasó este año, usa el siguiente)
(function () {
    const now = new Date();
    let year = now.getFullYear();
    const targetCandidate = new Date(year, 11, 8, 15, 0, 0); // month 11 = diciembre
    const target = now > targetCandidate ? new Date(year + 1, 11, 8, 15, 0, 0) : targetCandidate;

    // declarar timer antes de usarlo para evitar ReferenceError
    let timer = null;

    function update() {
        const diff = target - new Date();
        if (diff <= 0) {
            const cd = document.getElementById('countdown');
            if (cd) cd.innerHTML = '<div><strong>¡Evento en curso!</strong></div>';
            if (timer) clearInterval(timer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 60000) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const elDays = document.getElementById('days');
        const elHours = document.getElementById('hours');
        const elMinutes = document.getElementById('minutes');
        const elSeconds = document.getElementById('seconds');

        if (elDays) elDays.textContent = String(days).padStart(2, '0');
        if (elHours) elHours.textContent = String(hours).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
    }

    // primera actualización inmediata
    update();
    // luego asignamos el interval al timer ya declarado
    timer = setInterval(update, 1000);
})();

// Simple slider auto-rotation (hero)
(function () {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let idx = 0;
    if (!slides || slides.length === 0) return;

    // inicializar estado
    slides.forEach((s, i) => {
        s.style.transition = 'opacity 400ms ease, transform 400ms ease';
        s.style.opacity = i === 0 ? '1' : '0.7';
        s.style.transform = i === 0 ? 'scale(1)' : 'scale(0.98)';
    });

    setInterval(() => {
        slides[idx].style.transform = "scale(0.98)";
        slides[idx].style.opacity = '0.7';
        idx = (idx + 1) % slides.length;
        slides.forEach((s, i) => {
            s.style.opacity = i === idx ? '1' : '0.7';
            s.style.transform = i === idx ? "scale(1)" : "scale(0.98)";
        });
    }, 3500);
})();

// Form handler for payment confirmation (no backend: demonstrates behaviour)
(function () {
    const form = document.getElementById('confirmForm');
    if (!form) return;
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const payload = Object.fromEntries(data.entries());
        // En producción enviar a tu servidor o a Google Forms / Zapier / webhook
        console.log("Confirmación enviada:", payload);

        if (msg) {
            msg.textContent = "Gracias. Tu confirmación fue recibida. En breve te contactaremos para validar.";
        }

        form.reset();
        setTimeout(() => {
            if (msg) msg.textContent = "";
        }, 8000);
    });
})();
