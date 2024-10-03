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
  
  // Función para dibujar la figura en SVG
  function dibujarVectorizado(puntos) {
    const svg = document.getElementById('canvasVectorizado');
    const poligono = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  
    let puntosStr = puntos.map(p => `${p.getX()},${p.getY()}`).join(' ');
    poligono.setAttribute('points', puntosStr);
    poligono.setAttribute('fill', 'none');
    poligono.setAttribute('stroke', 'black');
    
    svg.appendChild(poligono);
    
    document.getElementById('tipoPoligono').textContent = `Tipo de Polígono: ${determinarTipoPoligono(puntos)}`;
  }
  
  // Algoritmo para determinar si el polígono es cóncavo o convexo
  function determinarTipoPoligono(puntos) {
    let esConvexo = true;
    let n = puntos.length;
    let signos = [];
  
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
  
  // Lista de puntos (puedes modificarla según necesites)
  let puntos = [
    new Punto(100, 100),
    new Punto(200, 150),
    new Punto(150, 250),
    new Punto(50, 200)
  ];
  
  // Llamar a la función para dibujar y determinar el tipo de polígono
  dibujarVectorizado(puntos);
  