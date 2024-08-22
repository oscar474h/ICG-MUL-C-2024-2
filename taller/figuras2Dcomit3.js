const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let dibujando = false;

function actualizarCampos() {
    const tipoCoordenadas = document.getElementById('tipo-coordenadas').value;
    const figura = document.getElementById('figura').value;
    
    document.getElementById('coords-cartesianas').classList.toggle('hidden', tipoCoordenadas === 'polar' || figura === 'dibujar');
    document.getElementById('coords-polars').classList.toggle('hidden', tipoCoordenadas === 'cartesian' || figura === 'dibujar');
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
    ctx.fill();
    ctx.stroke();
}

function dibujar() {
    const figura = document.getElementById('figura').value;
    const tipoCoordenadas = document.getElementById('tipo-coordenadas').value;
    const colorRelleno = document.getElementById('color-relleno').value;
    const colorBorde = document.getElementById('color-borde').value;
    const tamaño = parseFloat(document.getElementById('tamaño').value);

    ctx.fillStyle = colorRelleno;
    ctx.strokeStyle = colorBorde;

    if (figura === 'dibujar') {
        canvas.addEventListener('mousedown', iniciarDibujo);
        canvas.addEventListener('mousemove', dibujarConMouse);
        canvas.addEventListener('mouseup', finalizarDibujo);
        return;
    } else {
        canvas.removeEventListener('mousedown', iniciarDibujo);
        canvas.removeEventListener('mousemove', dibujarConMouse);
        canvas.removeEventListener('mouseup', finalizarDibujo);
    }

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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    switch (figura) {
        case 'star':
            dibujarEstrella(ctx, x, y, tamaño, 5);
            break;
        case 'square':
            ctx.rect(x - tamaño / 2, y - tamaño / 2, tamaño, tamaño);
            ctx.fill();
            ctx.stroke();
            break;
        case 'circle':
            ctx.arc(x, y, tamaño, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
        case 'triangle':
            ctx.moveTo(x, y - tamaño / 2);
            ctx.lineTo(x + tamaño / 2, y + tamaño / 2);
            ctx.lineTo(x - tamaño / 2, y + tamaño / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        case 'rectangle':
            ctx.rect(x - tamaño / 2, y - tamaño, tamaño, tamaño * 2);
            ctx.fill();
            ctx.stroke();
            break;
        case 'pentagon':
            dibujarEstrella(ctx, x, y, tamaño, 5);
            break;
        default:
            alert('Figura no soportada.');
    }
}

function iniciarDibujo(evento) {
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(evento.offsetX, evento.offsetY);
}

function dibujarConMouse(evento) {
    if (!dibujando) return;
    ctx.lineTo(evento.offsetX, evento.offsetY);
    ctx.stroke();
}

function finalizarDibujo() {
    dibujando = false;
    ctx.closePath();
}

function cambiarColorFondo() {
    const colorFondo = document.getElementById('color-fondo').value;
    document.body.style.backgroundColor = colorFondo;
}

document.addEventListener('DOMContentLoaded', function() {
    actualizarCampos();
    actualizarInformacion();
});
