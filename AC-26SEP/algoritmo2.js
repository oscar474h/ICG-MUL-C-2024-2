// Clase Punto con encapsulamiento real
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(valor) {
        this.#x = valor;
    }

    set y(valor) {
        this.#y = valor;
    }
}

// Generar un color aleatorio
function colorAleatorio() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Clase Linea que utiliza objetos Punto para definir su inicio y final
class Linea {
    #start;
    #end;
    #color;

    constructor(start, end) {
        this.#start = start;  // start es un objeto Punto
        this.#end = end;      // end es un objeto Punto
        this.#color = colorAleatorio(); // Color aleatorio
    }

    dibujar(svg) {
        // Implementación del Algoritmo de Bresenham
        let x1 = this.#start.x;
        let y1 = this.#start.y;
        let x2 = this.#end.x;
        let y2 = this.#end.y;

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.#dibujarPunto(svg, new Punto(x1, y1)); // Dibujar cada punto de la línea

            if (x1 === x2 && y1 === y2) break;

            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    // Método auxiliar para dibujar puntos pequeños en la línea
    #dibujarPunto(svg, punto) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", punto.x);
        circle.setAttribute("cy", punto.y);
        circle.setAttribute("r", 1); // Puntos pequeños
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Clase Circunferencia que utiliza un objeto Punto como centro
class Circunferencia {
    #center;
    #radius;
    #color;

    constructor(center, radius) {
        this.#center = center;  // center es un objeto Punto
        this.#radius = radius;
        this.#color = colorAleatorio(); // Color aleatorio
    }

    dibujar(svg) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.#center.x);
        circle.setAttribute("cy", this.#center.y);
        circle.setAttribute("r", this.#radius);
        circle.setAttribute("fill", this.#color);
        svg.appendChild(circle);
    }
}

// Clase Elipse que utiliza un objeto Punto como centro
class Elipse {
    #center;
    #a;
    #b;
    #color;

    constructor(center, a, b) {
        this.#center = center;  // center es un objeto Punto
        this.#a = a;
        this.#b = b;
        this.#color = colorAleatorio(); // Color aleatorio
    }

    dibujar(svg) {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this.#center.x);
        ellipse.setAttribute("cy", this.#center.y);
        ellipse.setAttribute("rx", this.#a);
        ellipse.setAttribute("ry", this.#b);
        ellipse.setAttribute("fill", this.#color);
        svg.appendChild(ellipse);
    }
}

// Crear y dibujar las primitivas en el lienzo SVG
const svgCanvas = document.getElementById('svgCanvas');

// Dibujar una línea
const linea = new Linea(new Punto(50, 50), new Punto(200, 200));
linea.dibujar(svgCanvas);

// Dibujar una circunferencia
const circunferencia = new Circunferencia(new Punto(150, 100), 50);
circunferencia.dibujar(svgCanvas);

// Dibujar una elipse
const elipse = new Elipse(new Punto(150, 200), 80, 50);
elipse.dibujar(svgCanvas);

// Interactividad: Agregar un evento de clic para dibujar nuevas primitivas
svgCanvas.addEventListener('click', (event) => {
    const rect = svgCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Actualizar las coordenadas mostradas
    document.getElementById('info').innerText = `Coordenadas: (${Math.round(x)}, ${Math.round(y)})`;

    // Dibujar un nuevo punto (circulo) en la posición del clic
    const nuevoCirculo = new Circunferencia(new Punto(x, y), 5);
    nuevoCirculo.dibujar(svgCanvas);
});
