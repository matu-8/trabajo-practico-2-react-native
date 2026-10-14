import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import TarjetaPlato from '@/components/TarjetaPlato';
import { colores } from '@/constants/colores';
import { CATEGORIAS, ETIQUETA_CATEGORIA, esCategoria, platos } from '@/data/platos';

// La búsqueda vive en la URL: /buscar?q=mate&categoria=bebidas
// Cambiar los params con setParams NO apila pantallas.
export default function Buscar() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  const categoriaActiva = esCategoria(categoria) ? categoria : undefined;
  const termino = q.trim().toLowerCase();

  const resultados = platos.filter((plato) => {
    const coincideCategoria = !categoriaActiva || plato.categoria === categoriaActiva;
    const coincideTexto =
      termino === '' ||
      plato.nombre.toLowerCase().includes(termino) ||
      plato.descripcion.toLowerCase().includes(termino);
    return coincideCategoria && coincideTexto;
  });

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <TextInput
        style={estilos.input}
        placeholder="Buscar plato..."
        placeholderTextColor={colores.muted}
        defaultValue={q}
        onChangeText={(texto) => router.setParams({ q: texto })}
      />

      <Text style={estilos.etiqueta}>Categoría</Text>
      <View style={estilos.chips}>
        <Pressable
          style={!categoriaActiva ? estilos.chipActivo : estilos.chip}
          onPress={() => router.setParams({ categoria: '' })}>
          <Text style={!categoriaActiva ? estilos.chipTextoActivo : estilos.chipTexto}>Todas</Text>
        </Pressable>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={categoriaActiva === cat ? estilos.chipActivo : estilos.chip}
            onPress={() => router.setParams({ categoria: cat })}>
            <Text style={categoriaActiva === cat ? estilos.chipTextoActivo : estilos.chipTexto}>
              {ETIQUETA_CATEGORIA[cat]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={estilos.etiqueta}>
        {resultados.length} resultado{resultados.length === 1 ? '' : 's'}
      </Text>
      {resultados.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 10 },
  input: {
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: colores.muted,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colores.tinta,
  },
  etiqueta: { fontSize: 14, fontWeight: '700', color: colores.tinta, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.muted,
    backgroundColor: colores.blanco,
  },
  chipActivo: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colores.tinta,
  },
  chipTexto: { color: colores.tinta, fontSize: 14 },
  chipTextoActivo: { color: colores.fondo, fontSize: 14, fontWeight: '700' },
});
