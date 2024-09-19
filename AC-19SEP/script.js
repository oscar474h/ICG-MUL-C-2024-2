class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

class Linea {
    constructor(start, end, color) {
        this._start = start;
        this._end = end;
        this._color = color;
    }

    dibujar(svg) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this._start.x);
        line.setAttribute("y1", this._start.y);
        line.setAttribute("x2", this._end.x);
        line.setAttribute("y2", this._end.y);
        line.setAttribute("stroke", this._color);
        svg.appendChild(line);
    }
}

class Circunferencia {
    constructor(center, radius, color) {
        this._center = center;
        this._radius = radius;
        this._color = color;
    }

    dibujar(svg) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this._center.x);
        circle.setAttribute("cy", this._center.y);
        circle.setAttribute("r", this._radius);
        circle.setAttribute("fill", this._color);
        svg.appendChild(circle);
    }
}

class Elipse {
    constructor(center, a, b, color) {
        this._center = center;
        this._a = a;
        this._b = b;
        this._color = color;
    }

    dibujar(svg) {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this._center.x);
        ellipse.setAttribute("cy", this._center.y);
        ellipse.setAttribute("rx", this._a);
        ellipse.setAttribute("ry", this._b);
        ellipse.setAttribute("fill", this._color);
        svg.appendChild(ellipse);
    }
}

// Crear y dibujar las primitivas con colores actualizados
const svgCanvas = document.getElementById('svgCanvas');

const linea = new Linea(new Vector(50, 50), new Vector(200, 200), 'yellow');
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(new Vector(150, 100), 50, 'green');
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(new Vector(150, 200), 80, 50, 'purple');
elipse.dibujar(svgCanvas);
