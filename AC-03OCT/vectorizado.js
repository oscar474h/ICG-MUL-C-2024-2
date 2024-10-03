class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

// Función para verificar si un punto ya existe en la lista
function puntoExistente(puntos, nuevoPunto) {
    return puntos.some(p => p.getX() === nuevoPunto.getX() && p.getY() === nuevoPunto.getY());
}

// Función para generar un número aleatorio de puntos entre 3 y 15
function generarPuntosAleatorios(maxX, maxY) {
    const numPuntos = Math.floor(Math.random() * (15 - 3 + 1)) + 3; // Número entre 3 y 15
    let puntos = [];

    // Generar puntos aleatorios sin superposición
    while (puntos.length < numPuntos) {
        let x = Math.random() * maxX;
        let y = Math.random() * maxY;
        const nuevoPunto = new Punto(x, y);

        if (!puntoExistente(puntos, nuevoPunto)) {
            puntos.push(nuevoPunto);
        }
    }

    return ordenarPuntosEnSentidoHorario(puntos); // Ordenar en sentido horario
}

// Función para calcular el centroide de los puntos
function calcularCentroide(puntos) {
    const n = puntos.length;
    let sumX = 0;
    let sumY = 0;

    puntos.forEach(p => {
        sumX += p.getX();
        sumY += p.getY();
    });

    return new Punto(sumX / n, sumY / n); // Retorna el centroide
}

// Función para ordenar los puntos en sentido horario
function ordenarPuntosEnSentidoHorario(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        const anguloA = Math.atan2(a.getY() - centroide.getY(), a.getX() - centroide.getX());
        const anguloB = Math.atan2(b.getY() - centroide.getY(), b.getX() - centroide.getX());
        return anguloA - anguloB; // Ordenar por el ángulo respecto al centroide
    });
}

// Función para dibujar la figura en el SVG
function dibujarVectorizado(puntos) {
    const svg = document.getElementById('canvasVectorizado');
    svg.innerHTML = ''; // Limpiar el SVG antes de dibujar

    let d = `M ${puntos[0].getX()} ${puntos[0].getY()}`;

    // Construir la cadena de comandos para el polígono
    for (let i = 1; i < puntos.length; i++) {
        d += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
    }
    d += ' Z'; // Cerrar el polígono

    const color = generarColorAleatorio(); // Asignar un color aleatorio
    const poligono = `<path d="${d}" fill="${color}" stroke="black"/>`;

    svg.innerHTML = poligono; // Dibujar el polígono en el SVG

    // Mostrar si es cóncavo o convexo
    document.getElementById('tipoPoligono').textContent = `Tipo de Polígono: ${determinarTipoPoligono(puntos)}`;
}

// Función para generar un color aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Algoritmo para determinar si el polígono es cóncavo o convexo
function determinarTipoPoligono(puntos) {
    let esConvexo = true;
    let n = puntos.length;
    let signos = [];

    // Determinar el signo del producto cruzado entre los vectores de cada lado
    for (let i = 0; i < n; i++) {
        let dx1 = puntos[(i + 1) % n].getX() - puntos[i].getX();
        let dy1 = puntos[(i + 1) % n].getY() - puntos[i].getY();
        let dx2 = puntos[(i + 2) % n].getX() - puntos[(i + 1) % n].getX();
        let dy2 = puntos[(i + 2) % n].getY() - puntos[(i + 1) % n].getY();
        let cruz = dx1 * dy2 - dy1 * dx2;
        signos.push(cruz > 0);
    }

    esConvexo = signos.every((v, i, arr) => v === arr[0]);

    return esConvexo ? 'Convexo' : 'Cóncavo';
}

// Función que se llama al hacer clic en "Generar Figura"
function generarFigura() {
    const maxX = 500;
    const maxY = 500;
    let puntos = generarPuntosAleatorios(maxX, maxY);
    dibujarVectorizado(puntos);
}

// Añadir el evento de clic al botón
document.getElementById('generarBtn').addEventListener('click', generarFigura);

// Generar la primera figura al cargar la página
generarFigura();
