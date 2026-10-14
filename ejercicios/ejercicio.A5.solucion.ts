// ATENCION: este archivo es una version alternativa y MEJORADA de una
// consigna ya resuelta en `ejercicio.A5.ts` (archivo original, sin tocar).
// No lo reemplaza: conviven los dos.
//
// Motivo: el A5 original tiene un error logico. Su `desencolar()` devuelve
// `this.#items[0]` pero NUNCA lo elimina, asi que llamarlo dos veces seguidas
// devuelve el mismo elemento. Ademas `#items.length` no sirve como `tamanio`
// cuando hay posiciones ya liberadas, y `#items[0]` como frente se rompe en
// cuanto se desencola algo.
//
// Este archivo implementa la consigna como pide el enunciado (indice del
// frente en un campo privado, sin shift()) y sirve para verificar el
// analisis de rendimiento del punto A4 de RESPUESTAS.md.

// Requisito: implementar encolar(x), desencolar(), frente() y los getters
// vacia y tamanio SIN usar shift().
//
// Pista del enunciado: se guarda en un campo privado el indice del frente.
// Asi desencolar() es O(1): en vez de mover todos los elementos, solo avanza
// un indice. El costo de shift() es O(n) porque reindexa el array entero.

class ColaEficiente<T> {
  // Almacen: T | undefined porque al desencolar se libera la posicion para
  // que el garbage collector pueda recolectar el elemento.
  #items: (T | undefined)[] = [];

  // Indice del primer elemento valido (el frente de la cola).
  #indiceFrente = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;

    const elemento = this.#items[this.#indiceFrente];
    this.#items[this.#indiceFrente] = undefined; // se libera la posicion
    this.#indiceFrente++;

    // Si ya no queda nada, se reinicia la cola para que el array no crezca
    // indefinidamente (si no, #items seguiria creciendo en cada ciclo).
    if (this.vacia) {
      this.#items = [];
      this.#indiceFrente = 0;
    }

    return elemento;
  }

  frente(): T | undefined {
    return this.#items[this.#indiceFrente];
  }

  get vacia(): boolean {
    return this.#indiceFrente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#indiceFrente;
  }
}

// ---------------------------------------------------------------------------
// Prueba
// ---------------------------------------------------------------------------
const cola = new ColaEficiente<string>();

cola.encolar('Ana');
cola.encolar('Beto');
cola.encolar('Caro');

console.log('frente:', cola.frente());         // Ana
console.log('tamanio:', cola.tamanio);        // 3
console.log('desencolar:', cola.desencolar()); // Ana  (ahora si lo quita)
console.log('frente:', cola.frente());         // Beto  (el frente avanzo)
console.log('tamanio:', cola.tamanio);        // 2
console.log('vacia:', cola.vacia);            // false

// El caso que fallaba con la version original: desencolar dos veces seguidas
// debe devolver elementos DISTINTOS.
console.log('desencolar:', cola.desencolar()); // Beto
console.log('desencolar:', cola.desencolar()); // Caro
console.log('vacia:', cola.vacia);            // true

// Desencolar con la cola vacia no debe romper nada.
console.log('desencolar (vacia):', cola.desencolar()); // undefined
console.log('frente (vacia):', cola.frente());         // undefined

// La cola debe seguir funcionando despues de vaciarse (reinicio interno).
cola.encolar('Dani');
console.log('tras reiniciar -> frente:', cola.frente()); // Dani
console.log('tras reiniciar -> tamanio:', cola.tamanio); // 1

// ---------------------------------------------------------------------------
// Comparacion de rendimiento: shift() (O(n)) vs indice del frente (O(1))
// ---------------------------------------------------------------------------
// Esto demuestra por que el enunciado pide NO usar shift().
//
// shift() tiene que desplazar todos los elementos que quedan para cerrar el
// hueco del frente: si la cola tiene N elementos, cada desencolar mueve N-1.
// El coste total de vaciar una cola de N elementos es O(N^2).
//
// Con el indice del frente, desencolar solo lee una posicion y avanza el
// indice: el coste total de vaciar la cola es O(N).

const N = 200_000;

function medirConShift(): number {
  const items: number[] = [];
  for (let i = 0; i < N; i++) items.push(i);
  const inicio = performance.now();
  while (items.length > 0) items.shift();
  return performance.now() - inicio;
}

function medirConIndice(): number {
  const c = new ColaEficiente<number>();
  for (let i = 0; i < N; i++) c.encolar(i);
  const inicio = performance.now();
  while (!c.vacia) c.desencolar();
  return performance.now() - inicio;
}

const msShift = medirConShift();
const msIndice = medirConIndice();

console.log(`\n=== Rendimiento vaciando ${N} elementos ===`);
console.log(`shift()          : ${msShift.toFixed(1)} ms`);
console.log(`indice del frente: ${msIndice.toFixed(1)} ms`);
console.log(`Diferencia       : ${(msShift / Math.max(msIndice, 0.001)).toFixed(1)}x`);