const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

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
        const y = cy + radio * Math.sin(i * ang
