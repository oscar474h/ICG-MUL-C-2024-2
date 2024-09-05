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
    const { cx, cy } = coordType === 'cartesian' 
        ? getCartesianCoords()
        : getPolarCoords();

    // Dibuja el polígono en el canvas
    drawPolygon(n, radius, cx, cy);
}

function getCartesianCoords() {
    const cx = parseFloat(document.getElementById('x').value);
    const cy = parseFloat(document.getElementById('y').value);
    return { cx, cy };
}

function getPolarCoords() {
    const r = parseFloat(document.getElementById('r').value);
    const theta = parseFloat(document.getElementById('theta').value) * (Math.PI / 180); // Conversión a radianes
    const cx = r * Math.cos(theta); // Conversión de coordenadas polares a cartesianas
    const cy = r * Math.sin(theta);
    return { cx, cy };
}

function calculateRadius(measurementType, a, L, n) {
    if (measurementType === 'apotema') {
        if (!isNaN(a)) {
            // Fórmula para calcular el radio a partir del apotema
            return a / Math.cos(Math.PI / n);
        } else {
            alert("Debes ingresar el apotema.");
            return null;
        }
    } else if (measurementType === 'lado') {
        if (!isNaN(L)) {
            // Fórmula para calcular el radio a partir del lado
            return L / (2 * Math.sin(Math.PI / n));
        } else {
            alert("Debes ingresar el lado.");
            return null;
        }
    } else {
        alert("Selecciona un tipo de medida.");
        return null;
    }
}

function drawPolygon(n, radius, cx, cy) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();

    const startAngle = Math.PI / 2 - Math.PI / n;

    for (let i = 0; i < n; i++) {
        const angle = startAngle + (2 * Math.PI * i / n);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.stroke();
}

