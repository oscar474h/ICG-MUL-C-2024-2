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
  
  // Función para generar un número aleatorio de puntos entre 3 y 15
  function generarPuntosAleatorios(maxX, maxY) {
    const numPuntos = Math.floor(Math.random() * (15 - 3 + 1)) + 3; // Número entre 3 y 15
    let puntos = [];
    
    // Generar puntos aleatorios
    for (let i = 0; i < numPuntos; i++) {
      let x = Math.random() * maxX;
      let y = Math.random() * maxY;
      puntos.push(new Punto(x, y));
    }
  
    // Centramos los puntos en el lienzo
    return centrarPuntos(puntos, maxX, maxY);
  }
  
  // Función para centrar los puntos en el canvas
  function centrarPuntos(puntos, maxX, maxY) {
    let minX = Math.min(...puntos.map(p => p.getX()));
    let minY = Math.min(...puntos.map(p => p.getY()));
    let maxXCoord = Math.max(...puntos.map(p => p.getX()));
    let maxYCoord = Math.max(...puntos.map(p => p.getY()));
    
    let offsetX = (maxX - (maxXCoord - minX)) / 2 - minX;
    let offsetY = (maxY - (maxYCoord - minY)) / 2 - minY;
  
    return puntos.map(p => new Punto(p.getX() + offsetX, p.getY() + offsetY));
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
  
  // Función para dibujar la figura en SVG
  function dibujarVectorizado(puntos) {
    const svg = document.getElementById('canvasVectorizado');
    svg.innerHTML = ''; // Limpiar el contenido anterior
  
    // Crear el polígono
    const poligono = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let puntosStr = puntos.map(p => `${p.getX()},${p.getY()}`).join(' ');
  
    // Atributos del polígono
    poligono.setAttribute('points', puntosStr);
    poligono.setAttribute('fill', generarColorAleatorio()); // Color aleatorio
    poligono.setAttribute('stroke', 'black');
    
    svg.appendChild(poligono);
    
    // Mostrar si es cóncavo o convexo
    document.getElementById('tipoPoligono').textContent = `Tipo de Polígono: ${determinarTipoPoligono(puntos)}`;
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
  