import { Redirect } from 'expo-router';

// URL vieja de la versión anterior: se reemplaza por /carrito (no se apila).
export default function PedidoRedirigido() {
  return <Redirect href="/carrito" />;
}
