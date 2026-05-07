// --- SISTEMA DE ARRASTRE (Drag & Drop) ---
let activeWindow = null;
let offset = { x: 0, y: 0 };

document.querySelectorAll('.draggable').forEach(win => {
    const header = win.querySelector('.window-header');
    header.addEventListener('mousedown', (e) => {
        activeWindow = win;
        offset.x = e.clientX - win.offsetLeft;
        offset.y = e.clientY - win.offsetTop;
        win.style.zIndex = 1000;
        playSound();
    });
});

document.addEventListener('mousemove', (e) => {
    if (activeWindow) {
        activeWindow.style.left = (e.clientX - offset.x) + 'px';
        activeWindow.style.top = (e.clientY - offset.y) + 'px';
    }
    
    // --- EFECTO PARALLAX ---
    const bg = document.getElementById('parallax');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

document.addEventListener('mouseup', () => {
    if(activeWindow) activeWindow.style.zIndex = 10;
    activeWindow = null;
});

// --- EFECTO GENIE (Cerrar) ---
function closeWindow(btn) {
    const win = btn.closest('.window');
    win.classList.add('closing');
    playSound();
    setTimeout(() => win.style.display = 'none', 500);
}

// --- SONIDOS Y MÚSICA ---
function playSound() {
    const sound = document.getElementById('pop-sound');
    sound.currentTime = 0;
    sound.play();
}

let isPlaying = false;
function toggleMusic() {
    isPlaying = !isPlaying;
    const vinyl = document.getElementById('vinyl');
    const bars = document.querySelectorAll('.bar');
    
    if(isPlaying) {
        vinyl.classList.add('rotating');
        // Simular visualizador
        setInterval(() => {
            if(isPlaying) bars.forEach(b => b.style.height = Math.random() * 30 + 'px');
        }, 200);
    } else {
        vinyl.classList.remove('rotating');
        bars.forEach(b => b.style.height = '5px');
    }
    playSound();
}

// --- RESOURCE METER SIMULADO ---
setInterval(() => {
    const bar = document.getElementById('cpu-bar');
    if(bar) bar.style.width = (Math.random() * 40 + 60) + '%';
}, 2000);

// Mantener lógica de reloj y notas anterior...
function updateClock() {
    const now = new Date();
    document.getElementById('time').innerText = now.toLocaleTimeString('es-ES');
    document.getElementById('date').innerText = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}
setInterval(updateClock, 1000);
updateClock();

// Base de Datos Local
function saveNote() {
    const content = document.getElementById('note-input').value;
    localStorage.setItem('aero_note', content);
    playSound();
}
window.onload = () => {
    document.getElementById('note-input').value = localStorage.getItem('aero_note') || "";
};
