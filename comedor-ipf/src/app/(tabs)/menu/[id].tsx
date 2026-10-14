import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';
import { buscarPlato, formatearPrecio } from '@/data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito, carrito } = useApp();

  // El id llega como texto: buscarPlato lo convierte y valida antes de comparar.
  const plato = buscarPlato(id);

  if (!plato) {
    return (
      <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={estilos.titulo}>No existe ningún plato con id "{id}".</Text>
        <Link href="/menu" asChild>
          <Pressable style={estilos.botonSecundario}>
            <Text style={estilos.textoBotonSecundario}>Volver al menú</Text>
          </Pressable>
        </Link>
        <DondeEstoy />
      </ScrollView>
    );
  }

  const cantidad = carrito.filter((item) => item.id === plato.id).length;

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={estilos.titulo}>{plato.nombre}</Text>
      <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      <Text style={estilos.texto}>{plato.descripcion}</Text>

      <Pressable style={estilos.boton} onPress={() => agregarAlCarrito(plato)}>
        <Text style={estilos.textoBoton}>Agregar al carrito</Text>
      </Pressable>

      {cantidad > 0 && (
        <Text style={estilos.texto}>En el carrito: {cantidad}</Text>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  titulo: { fontSize: 24, fontWeight: '800', color: colores.tinta },
  precio: { fontSize: 20, fontWeight: '700', color: colores.primario },
  texto: { fontSize: 15, color: colores.tinta },
  boton: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.tinta,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonSecundario: { color: colores.tinta, fontSize: 15, fontWeight: '600' },
});
