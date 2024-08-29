// Clase para coordenadas cartesianas
class Cartesiana {
    #x;
    #y;

    constructor(x, y) {
        this.#x = parseFloat(x);
        this.#y = parseFloat(y);
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(value) {
        if (typeof value === 'number') {
            this.#x = value;
        } else {
            console.error('Error: La coordenada x debe ser un número.');
        }
    }

    setY(value) {
        if (typeof value === 'number') {
            this.#y = value;
        } else {
            console.error('Error: La coordenada y debe ser un número.');
        }
    }
}

// Clase para coordenadas polares
class Polar {
    #r;
    #theta;

    constructor(r, theta) {
        this.#r = parseFloat(r);
        this.#theta = parseFloat(theta) * (Math.PI / 180); // Conversión a radianes
    }

    getRadio() {
        return this.#r;
    }

    getAngulo() {
        return this.#theta;
    }

    convertirACartesiana() {
        const cx = this.#r * Math.cos(this.#theta);
        const cy = this.#r * Math.sin(this.#theta);
        return new Cartesiana(cx, cy);
    }
}

function toggleMeasurementInputs() {
    const measurementType = document.getElementById('measurementType').value;
    document.getElementById('apotemaInput').classList.toggle('hidden', measurementType !== 'apotema');
    document.getElementById('ladoInput').classList.toggle('hidden', measurementType !== 'lado');
}

function toggleCoordInputs() {
    const coordType = document.getElementById('coordType').value;
    document.getElementById('cartesianInputs').classList.toggle('hidden', coordType !== 'cartesian');
    document.getElementById('polarInputs').classList.toggle('hidden', coordType !== 'polar');
}

function handleDrawing() {
    const n = parseInt(document.getElementById('n').value);
    const measurementType = document.getElementById('measurementType').value;
    const a = parseFloat(document.getElementById('a').value);
    const L = parseFloat(document.getElementById('L').value);
    const coordType = document.getElementById('coordType').value;

    // Calcula el radio del polígono según el tipo de medida y los valores proporcionados
    const radius = calculateRadius(measurementType, a, L, n);
    if (radius === null) return;

    // Obtiene las coordenadas del centro según el tipo de coordenada seleccionado
    let center;
    if (coordType === 'cartesian') {
        const x = parseFloat(document.getElementById('x').value);
        const y = parseFloat(document.getElementById('y').value);
        center = new Cartesiana(x, y);
    } else {
        const r = parseFloat(document.getElementById('r').value);
        const theta = parseFloat(document.getElementById('theta').value);
        const polarCoord = new Polar(r, theta);
 
