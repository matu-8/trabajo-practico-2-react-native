class Pila {
  #items: string[] = []; //El numeral (#) usado en un atributo de una clase, indica que es un atributo privado
  push(x:string) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  tope() { return this.#items.at(-1); }
  get vacia() { return this.#items.length === 0; }
}

export const p = new Pila();
console.log('>>> pila ');
p.push('Inicio'); p.push('1'); p.push('2'); p.push('3');
p.pop();
console.log(p.tope());
console.log(p.pop());
console.log(p.tope());
console.log(p.vacia);



class Cola {
  #items: string[] = [];

  encolar(x: string) { this.#items.push(x); }
  desencolar() { return this.#items.shift(); }
  frente() { return this.#items[0]; }
  get vacia() { return this.#items.length === 0; }
}

export const c = new Cola();
console.log('>>> cola')
c.encolar('Alan'); c.encolar('Beto'); c.encolar('Caren');
c.desencolar();
c.encolar('Esteban');
c.encolar('Fabian')
console.log(c.frente());
console.log(c.desencolar());
console.log(c.vacia);
