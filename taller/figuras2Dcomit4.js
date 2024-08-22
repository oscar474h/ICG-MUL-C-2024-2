const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false; // Variable para verificar si el usuario está dibujando

function actualizarCampos() {
    const tipoCoordenadas = document.getElementById('tipo-coordenadas').value;
    document.getElementById('coords-cartesianas').classList.toggle('hidden', tipoCoordenadas === 'polar');
    document.getElementById('coords-polars').classList.toggle('hidden', tipoCoordenadas === 'cartesian');
    actualizarInformacion();
}

function actualizarInformacion() {
    const maxX = canvas.width;
    const maxY = canvas.height;
    document.getElementById('info-coords').textContent =
        `Las coordenadas deben estar entre 0 y ${maxX} (x) y 0 y ${maxY} (y), que es el tamaño del canvas.`;
}

function convertirPolarACartesiano(r, angulo) {
    const radianes = angulo * Math.PI / 180;
    return [r * Math.cos(radianes), r * Math.sin(radianes)];
}

function dibujarEstrella(ctx, cx, cy, radio, puntos) {
    const angulo = (2 * Math.PI) / puntos;
    ctx.beginPath();
    for (let i = 0; i < puntos; i++) {
        const x = cx + radio * Math.cos(i * angulo);
        const y = cy + radio * Math.sin(i * angulo);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();  // Rellenar la figura
    ctx.stroke(); // Opcionalmente, dibujar el borde
}

function dibujar() {
    const figura = document.getElementById('figura').value;
    const tipoCoordenadas = document.getElementById('tipo-coordenadas').value;
    const colorRelleno = document.getElementById('color-relleno').value;
    const colorBorde = document.getElementById('color-borde').value;
    const tamaño = parseFloat(document.getElementById('tamaño').value);

    if (isNaN(tamaño) || tamaño <= 0) {
        alert('Por favor, ingresa un tamaño válido para la figura.');
        return;
    }

    let x, y;

    if (tipoCoordenadas === 'cartesian') {
        x = parseFloat(document.getElementById('x').value);
        y = parseFloat(document.getElementById('y').value);
    } else if (tipoCoordenadas === 'polar') {
        const r = parseFloat(document.getElementById('r').value);
        const theta = parseFloat(document.getElementById('theta').value);
        [x, y] = convertirPolarACartesiano(r, theta);
    }

    if (isNaN(x) || isNaN(y)) {
        alert('Por favor, ingresa coordenadas válidas.');
        return;
    }

    // Ajustar el tamaño del canvas si es necesario
    const maxX = Math.max(x + tamaño, canvas.width);
    const maxY = Math.max(y + tamaño, canvas.height);

    if (maxX > canvas.width || maxY > canvas.height) {
        canvas.width = maxX;
        canvas.height = maxY;
        actualizarInformacion(); // Actualizar mensajes informativos
    }

    ctx.fillStyle = colorRelleno; // Usar el color seleccionado para el relleno
    ctx.strokeStyle = colorBorde; // Usar el color seleccionado para el borde

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    switch (figura) {
        case 'star':
            dibujarEstrella(ctx, x, y, tamaño, 5); // Estrella de 5 puntos
            break;
        case 'square':
            ctx.rect(x - tamaño / 2, y - tamaño / 2, tamaño, tamaño);
            ctx.fill(); // Rellenar el cuadrado
            ctx.stroke(); // Opcionalmente, dibujar el borde
            break;
        case 'circle':
            ctx.arc(x, y, tamaño, 0, 2 * Math.PI);
            ctx.fill(); // Rellenar el círculo
            ctx.stroke(); // Opcionalmente, dibujar el borde
            break;
        case 'triangle':
            ctx.moveTo(x, y - tamaño / 2);
            ctx.lineTo(x + tamaño / 2, y + tamaño / 2);
            ctx.lineTo(x - tamaño / 2, y + tamaño / 2);
            ctx.closePath();
            ctx.fill(); // Rellenar el triángulo
            ctx.stroke(); // Opcionalmente, dibujar el borde
            break;
        case 'rectangle':
            ctx.rect(x - tamaño / 2, y - tamaño, tamaño, tamaño * 2); // Usamos tamaño para ancho y largo
            ctx.fill(); // Rellenar el rectángulo
            ctx.stroke(); // Opcionalmente, dibujar el borde
            break;
        case 'pentagon':
            dibujarEstrella(ctx, x, y, tamaño, 5); // Pentágono como una estrella de 5 puntos
            break;
        case 'dibujar':
            // Modo de dibujo libre
            activarModoDibujo();
            return;
        default:
            alert('Figura no soportada.');
    }
}

function activarModoDibujo() {
    isDrawing = true;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
}

function cambiarColorFondo() {
    document.body.style.backgroundColor = document.getElementById('color-fondo').value;
}

// Inicializar campos visibles según el tipo de coordenadas por defecto
document.addEventListener('DOMContentLoaded', function() {
    actualizarCampos();
    actualizarInformacion();
});
