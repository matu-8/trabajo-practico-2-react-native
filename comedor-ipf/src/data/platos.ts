import type { Categoria, Plato } from '@/types';

export const CATEGORIAS: readonly Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export const ETIQUETA_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

// Valida un parámetro de ruta: llega como texto, así que se compara contra la lista.
export function esCategoria(valor: string): valor is Categoria {
  return (CATEGORIAS as readonly string[]).includes(valor);
}

export function formatearPrecio(precio: number): string {
  return `$ ${precio}`;
}

export const platos: Plato[] = [
  { id: 1, nombre: 'Café con leche', precio: 800, descripcion: 'Taza grande con leche caliente.', categoria: 'desayuno' },
  { id: 2, nombre: 'Mate cocido con tostadas', precio: 700, descripcion: 'Dos tostadas con manteca y mermelada.', categoria: 'desayuno' },
  { id: 3, nombre: 'Medialunas x2', precio: 900, descripcion: 'Dos medialunas de manteca.', categoria: 'desayuno' },
  { id: 4, nombre: 'Milanesa con puré', precio: 2500, descripcion: 'Milanesa de carne de cerdo con puré casero.', categoria: 'almuerzo' },
  { id: 5, nombre: 'Guiso de arroz', precio: 2200, descripcion: 'Arroz con pollo y verduras.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Tarta de verdura', precio: 2000, descripcion: 'Porción de tarta de acelga y cebolla.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Agua mineral', precio: 600, descripcion: 'Botella de 500 ml sin gas.', categoria: 'bebidas' },
  { id: 8, nombre: 'Jugo de naranja', precio: 900, descripcion: 'Vaso de jugo natural.', categoria: 'bebidas' },
  { id: 9, nombre: 'Gaseosa', precio: 800, descripcion: 'Lata de 354 ml.', categoria: 'bebidas' },
  { id: 10, nombre: 'Alfajor de maicena', precio: 500, descripcion: 'Alfajor de dulce de leche.', categoria: 'kiosco' },
  { id: 11, nombre: 'Chipá', precio: 700, descripcion: 'Porción de chipá recién horneado.', categoria: 'kiosco' },
  { id: 12, nombre: 'Galletitas de agua', precio: 450, descripcion: 'Paquete individual.', categoria: 'kiosco' },
];

// Se busca por id numérico: el parámetro de ruta llega como string (ver ejercicio E1).
export function buscarPlato(id: string): Plato | undefined {
  const idNumero = Number(id);
  if (!Number.isInteger(idNumero)) return undefined;
  return platos.find((plato) => plato.id === idNumero);
}
