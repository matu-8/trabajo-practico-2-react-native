//Punto A5 cola eficiente

class colaEficiente {
  #items: string[] = [];

  encolar(x: string) { this.#items.push(x); }
  desencolar() {
    let element = this.#items[0]
    return element;
  }
  frente() { return this.#items[0]; }
  get vacia() { return this.#items.length === 0; }
  get tamanio() { return this.#items.length }
}

const fila = new colaEficiente()
fila.encolar('1');
fila.encolar('2');
fila.encolar('3');
fila.encolar('4');
console.log(fila.desencolar());
