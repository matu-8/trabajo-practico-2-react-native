// ATENCION: este archivo es una version alternativa y MEJORADA de una
// consigna ya resuelta en `ejercicios.A2.A3.ts` (archivo original, sin tocar).
// No lo reemplaza: conviven los dos.
//
// Motivo: el archivo original usa datos de prueba propios ('1', '2', '3',
// 'Alan', 'Caren'...) que NO son los del enunciado. Estas copias ejecutan
// exactamente las operaciones del enunciado, para poder contrastar la salida
// con las respuestas de RESPUESTAS.md.

class Pila<T> {
  // El numeral (#) indica que el atributo es privado dentro de la clase:
  // nadie por fuera puede leer ni escribir #items directamente.
  #items: T[] = [];

  push(x: T): void {
    this.#items.push(x);
  }

  pop(): T | undefined {
    return this.#items.pop();
  }

  tope(): T | undefined {
    return this.#items.at(-1);
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }
}

class Cola<T> {
  #items: T[] = [];

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    return this.#items.shift();
  }

  frente(): T | undefined {
    return this.#items[0];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }
}

// ---------------------------------------------------------------------------
// A2 · Seguimiento de una pila
// ---------------------------------------------------------------------------
console.log('=== A2 · Pila ===');

const p = new Pila<string>();
p.push('Inicio');
p.push('Productos');
p.push('Detalle 3');
p.pop();
p.push('Perfil');

console.log('(1) tope():', p.tope());   // Perfil
console.log('(2) pop():', p.pop());     // Perfil   -> queda ['Inicio','Productos']
console.log('(3) tope():', p.tope());   // Productos
console.log('(4) vacia:', p.vacia);    // false

// ---------------------------------------------------------------------------
// A3 · Seguimiento de una cola
// ---------------------------------------------------------------------------
console.log('\n=== A3 · Cola ===');

const c = new Cola<string>();
c.encolar('Ana');
c.encolar('Beto');
c.desencolar();
c.encolar('Caro');
c.encolar('Dani');

console.log('(1) frente():', c.frente());        // Beto
console.log('(2) desencolar():', c.desencolar()); // Beto -> queda ['Caro','Dani']
console.log('(3) vacia:', c.vacia);             // false