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
  
  // Función para generar un número aleatorio de puntos entre 3 y 20
  function generarPuntosAleatorios(maxX, maxY) {
    const numPuntos = Math.floor(Math.random() * (20 - 3 + 1)) + 3; // Número entre 3 y 20
    let puntos = [];
    
    for (let i = 0; i < numPuntos; i++) {
      let x = Math.random() * maxX;
      let y = Math.random() * maxY;
      puntos.push(new Punto(x, y));
    }
    
    return puntos;
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
  
  // Función para dibujar la figura en el canvas rasterizado
  function dibujarRasterizado(puntos) {
    const canvas = document.getElementById('canvasRasterizado');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());
  
    puntos.forEach(punto => {
      ctx.lineTo(punto.getX(), punto.getY());
    });
    
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = generarColorAleatorio(); // Color aleatorio
    ctx.fill();
    ctx.stroke();
  
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
  
  // Función que se llama al hacer clic en "Generar Figura"
  function generarFigura() {
    const maxX = 500;
    const maxY = 500;
    let puntos = generarPuntosAleatorios(maxX, maxY);
    dibujarRasterizado(puntos);
  }
  
  // Añadir el evento de clic al botón
  document.getElementById('generarBtn').addEventListener('click', generarFigura);
  
  // Generar la primera figura al cargar la página
  generarFigura();
  