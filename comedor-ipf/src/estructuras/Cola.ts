// Cola FIFO: el primero que entra es el primero que sale (frente).
// Sin shift(): se guarda el índice del frente (ver ejercicios/ejercicio.A5.solucion.ts).
// desencolar() es O(1) porque solo avanza el índice.
export class Cola<T = unknown> {
  #items: (T | undefined)[] = [];
  #indiceFrente = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;

    const elemento = this.#items[this.#indiceFrente];
    this.#items[this.#indiceFrente] = undefined; // libera la referencia para el GC
    this.#indiceFrente++;

    // Si quedó vacía, se reinicia para que el array no crezca indefinidamente
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

  // Devuelve una copia de frente a final.
  aArray(): T[] {
    return this.#items.slice(this.#indiceFrente) as T[];
  }
}
