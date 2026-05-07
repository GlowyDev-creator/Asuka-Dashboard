// --- LÓGICA DE LA BASE DE DATOS (LocalStorage) ---

const noteInput = document.getElementById('note-input');
const dbStatus = document.getElementById('db-status');

// Cargar datos al iniciar
window.onload = () => {
    const savedNote = localStorage.getItem('user_note');
    if (savedNote) {
        noteInput.value = savedNote;
        dbStatus.innerText = "Estado: Datos cargados";
    }
    initBubbles();
};

// Función para guardar en la base de datos
function saveNote() {
    const content = noteInput.value;
    localStorage.setItem('user_note', content);
    
    dbStatus.innerText = "Estado: ¡Guardado!";
    dbStatus.style.color = "#3aebaf";
    
    setTimeout(() => {
        dbStatus.innerText = "Estado: En espera";
        dbStatus.style.color = "white";
    }, 2000);
}

// --- LÓGICA DEL RELOJ ---

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('time').innerText = `${h}:${m}:${s}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('es-ES', options);
}

setInterval(updateClock, 1000);
updateClock();

// --- EFECTOS VISUALES (Burbujas) ---

function initBubbles() {
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.style.position = 'absolute';
        const size = Math.random() * 100 + 50;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.background = 'rgba(255, 255, 255, 0.15)';
        b.style.borderRadius = '50%';
        b.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        b.style.left = Math.random() * 100 + '%';
        b.style.top = Math.random() * 100 + '%';
        
        b.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.3 },
            { transform: 'translateY(-100px) scale(1.2)', opacity: 0 }
        ], {
            duration: Math.random() * 4000 + 4000,
            iterations: Infinity
        });
        
        container.appendChild(b);
    }
}
