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
  
  // Función para dibujar la figura en el canvas rasterizado
  function dibujarRasterizado(puntos) {
    const canvas = document.getElementById('canvasRasterizado');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());
  
    puntos.forEach(punto => {
      ctx.lineTo(punto.getX(), punto.getY());
    });
    
    ctx.closePath();
    ctx.stroke();
  
    document.getElementById('tipoPoligono').textContent = `Tipo de Polígono: ${determinarTipoPoligono(puntos)}`;
  }
  
  // Algoritmo para determinar si el polígono es cóncavo o convexo (mismo que en vectorizado.js)
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
  
  // Lista de puntos (modifica según sea necesario)
  let puntos = [
    new Punto(100, 100),
    new Punto(200, 150),
    new Punto(150, 250),
    new Punto(50, 200)
  ];
  
  // Llamar a la función para dibujar y determinar el tipo de polígono
  dibujarRasterizado(puntos);
  