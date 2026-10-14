// Punto C4 · Escribí el código
//
// Estos tres ejemplos no se ejecutan desde la carpeta `ejercicios` (no hay
// runtime de React Native acá). Son fragments de codigo pensados para leerse
// y luego copiarse dentro de una pantalla del proyecto `comedor-ipf`.
//
// Ojo: las rutas que se usan aca (`/productos/[id]`, `/perfil`, `/carrito`)
// son las del enunciado de la Parte C. En la Parte G las rutas reales son
// `/menu/[id]`, `/perfil` y `/carrito`.

import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// ---------------------------------------------------------------------------
// a) Un <Link> que abra el producto con id 8 usando href como objeto
// ---------------------------------------------------------------------------
// El href acepta dos formas: string o objeto. La forma objeto se usa cuando
// la ruta es dinamica y hay que pasarle parametros: `pathname` lleva la ruta
// CON los corchetes (no con el valor puesto) y `params` lleva los valores.
//
// El parametro se pasa como texto porque en la URL todo es texto.
export function LinkProducto8() {
  return (
    <Link
      href={{
        pathname: '/productos/[id]',
        params: { id: '8' },
      }}
    >
      Ver el producto 8
    </Link>
  );
}

// ---------------------------------------------------------------------------
// b) Un <Link> a /perfil que siempre apile, aunque la pantalla ya exista
// ---------------------------------------------------------------------------
// Por defecto <Link> navega con `navigate`: si /perfil ya esta en la pila,
// vuelve a esa instancia en vez de duplicarla. Con la prop `push` se fuerza
// el `router.push`, que apila siempre una pantalla nueva.
export function LinkPerfilSiempreApilado() {
  return (
    <Link push href="/perfil">
      Ir a mi perfil
    </Link>
  );
}

// ---------------------------------------------------------------------------
// c) Un boton (Pressable) propio que funcione como link a /carrito con asChild
// ---------------------------------------------------------------------------
// Con `asChild`, el <Link> no renderiza su propio <Text>: le pasa sus props
// (onPress, href, role) al primer hijo, que debe aceptar onPress. Asi el
// <Pressable> se convierte en el link.
//
// IMPORTANTE (ver punto F5a): cuando se usa asChild, `style` debe ser un
// objeto plano. Un array de estilos provoca el error
// "You are passing an array of styles to a child of <Slot>",
// porque <Slot> no sabe interpretar arrays. Por eso se usa
// StyleSheet.flatten() para aplanar el array antes de pasarlo.
export function BotonIrAlCarrito({ activo = false }: { activo?: boolean }) {
  return (
    <Link href="/carrito" asChild>
      <Pressable
        style={StyleSheet.flatten([estilos.boton, activo && estilos.botonActivo])}
      >
        <Text style={estilos.textoBoton}>Ir al carrito</Text>
      </Pressable>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Un boton propio reusable: el patron "Link + asChild + Pressable"
// ---------------------------------------------------------------------------
// Sirve para no repetir el mismo <Pressable> en cada link de la app.
export function BotonLink({
  href,
  children,
  activo = false,
}: {
  href: { pathname: string };
  children: string;
  activo?: boolean;
}) {
  return (
    <Link href={href} asChild>
      <Pressable
        style={StyleSheet.flatten([estilos.boton, activo && estilos.botonActivo])}
      >
        <Text style={estilos.textoBoton}>{children}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: '#1f6feb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonActivo: {
    backgroundColor: '#0d419d',
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

// ---------------------------------------------------------------------------
// Ejemplo de pantalla completa, para ver las tres variantes juntas
// ---------------------------------------------------------------------------
export default function PantallaProductos() {
  return (
    <View>
      <LinkProducto8 />
      <LinkPerfilSiempreApilado />
      <BotonIrAlCarrito />
      <BotonLink href={{ pathname: '/perfil' }} activo>
        Perfil
      </BotonLink>
    </View>
  );
}