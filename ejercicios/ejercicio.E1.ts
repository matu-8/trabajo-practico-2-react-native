// Punto E1 · Encontrá el error
//
// El error NO esta en la busqueda del producto, sino en la COMPARACION:
// useLocalSearchParams() siempre devuelve strings, pero los ids de `productos`
// son numeros. Al comparar number === string el resultado siempre es false.
//
// Este archivo reproduce el error y muestra la correccion.

type Producto = {
  id: number;
  nombre: string;
};

const productos: Producto[] = [
  { id: 3, nombre: 'Chipá' },
  { id: 7, nombre: 'Empanada de carne' },
  { id: 8, nombre: 'Milo' },
];

// ---------------------------------------------------------------------------
// VERSION CON EL ERROR (la del enunciado)
// ---------------------------------------------------------------------------
function detalleConError(id: string) {
  // TypeScript ya marca estas dos comparaciones con el error TS2367
  // ("This comparison appears to be unintentional because the types
  // 'number' and 'string' have no overlap"). Los @ts-expect-error de abajo
  // lo documentan: si se eliminan, el error vuelve a aparecer.
  // @ts-expect-error number === string nunca es true
  const producto = productos.find((p) => p.id === id);
  // @ts-expect-error "3" === 3 nunca es true
  const esElChipa = id === 3;

  return { producto, esElChipa };
}

// ---------------------------------------------------------------------------
// VERSION CORREGIDA
// ---------------------------------------------------------------------------
function detalleCorregido(id: string) {
  const idNumero = Number(id); // "3" -> 3
  const producto = productos.find((p) => p.id === idNumero);
  const esElChipa = idNumero === 3;

  return { producto, esElChipa };
}

// ---------------------------------------------------------------------------
// Comparacion
// ---------------------------------------------------------------------------
console.log('=== Con el error (id = "3") ===');
console.log('producto:', detalleConError('3').producto); // undefined
console.log('es el chipa:', detalleConError('3').esElChipa); // false

console.log('\n=== Corregido (id = "3") ===');
console.log('producto:', detalleCorregido('3').producto); // { id: 3, nombre: 'Chipá' }
console.log('es el chipa:', detalleCorregido('3').esElChipa); // true

console.log('\n=== Corregido con un id que no existe ===');
console.log('producto:', detalleCorregido('999').producto); // undefined

console.log('\n=== Corregido con un id que no es numerico ===');
console.log('producto:', detalleCorregido('mate').producto); // undefined (no rompe)

// La validacion extra evita que un valor no numerico llegue a la busqueda:
function detalleValidado(id: string) {
  const idNumero = Number(id);
  if (Number.isNaN(idNumero)) return { producto: undefined, esElChipa: false };
  return detalleCorregido(id);
}

console.log('con Number.isNaN ->', detalleValidado('mate'));