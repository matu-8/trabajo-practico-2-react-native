import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import TarjetaPlato from '@/components/TarjetaPlato';
import { colores } from '@/constants/colores';
import { CATEGORIAS, ETIQUETA_CATEGORIA, esCategoria, platos } from '@/data/platos';

export default function PlatosPorCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // Validación: cualquier texto llega como string; solo aceptamos las 4 categorías.
  if (!esCategoria(categoria)) {
    return (
      <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
        <Stack.Screen options={{ title: 'Categoría inexistente' }} />
        <Text style={estilos.texto}>
          "{categoria}" no es una categoría. Opciones: {CATEGORIAS.join(', ')}.
        </Text>
        <Link href="/menu" style={estilos.enlace}>
          Ver el menú
        </Link>
        <DondeEstoy />
      </ScrollView>
    );
  }

  const lista = platos.filter((plato) => plato.categoria === categoria);

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: ETIQUETA_CATEGORIA[categoria] }} />
      {lista.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 8 },
  texto: { fontSize: 15, color: colores.tinta },
  enlace: { fontSize: 15, fontWeight: '600', color: colores.primario },
});
