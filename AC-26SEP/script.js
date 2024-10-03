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

// Clase Linea que utiliza objetos Punto para definir su inicio y final
class Linea {
    #start;
    #end;
    #color;

    constructor(start, end, color) {
        this.#start = start;  // start es un objeto Punto
        this.#end = end;      // end es un objeto Punto
        this.#color = color;
    }

    dibujar(svg) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.#start.x);
        line.setAttribute("y1", this.#start.y);
        line.setAttribute("x2", this.#end.x);
        line.setAttribute("y2", this.#end.y);
        line.setAttribute("stroke", this.#color);
        svg.appendChild(line);
    }
}

// Clase Circunferencia que utiliza un objeto Punto como centro
class Circunferencia {
    #center;
    #radius;
    #color;

    constructor(center, radius, color) {
        this.#center = center;  // center es un objeto Punto
        this.#radius = radius;
        this.#color = color;
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

    constructor(center, a, b, color) {
        this.#center = center;  // center es un objeto Punto
        this.#a = a;
        this.#b = b;
        this.#color = color;
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

const linea = new Linea(new Punto(50, 50), new Punto(200, 200), 'yellow');
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(new Punto(150, 100), 50, 'green');
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(new Punto(150, 200), 80, 50, 'purple');
elipse.dibujar(svgCanvas);
