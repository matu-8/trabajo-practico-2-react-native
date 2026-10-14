export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

export type Pedido = {
  numero: number;
  items: Plato[];
  nota: string;
  total: number;
};
