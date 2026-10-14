// Pila LIFO: el último elemento que entra es el primero que sale (tope).
export class Pila<T = unknown> {
  // El numeral (#) indica que el atributo es privado: nadie puede tocar el array desde afuera.
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

  get tamanio(): number {
    return this.#items.length;
  }

  // Devuelve una copia de base a tope. Modificarla no afecta a la pila.
  aArray(): T[] {
    return [...this.#items];
  }
}
