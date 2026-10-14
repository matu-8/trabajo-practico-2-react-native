import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import TarjetaPlato from '@/components/TarjetaPlato';
import { colores } from '@/constants/colores';
import { CATEGORIAS, ETIQUETA_CATEGORIA, platos } from '@/data/platos';

export default function Menu() {
  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria} style={estilos.seccion}>
          <View style={estilos.encabezado}>
            <Text style={estilos.subtitulo}>{ETIQUETA_CATEGORIA[categoria]}</Text>
            <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }}>
              <Text style={estilos.enlace}>Ver solo esta categoría</Text>
            </Link>
          </View>
          {platos
            .filter((plato) => plato.categoria === categoria)
            .map((plato) => (
              <TarjetaPlato key={plato.id} plato={plato} />
            ))}
        </View>
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 16 },
  seccion: { gap: 4 },
  encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  subtitulo: { fontSize: 18, fontWeight: '800', color: colores.tinta },
  enlace: { fontSize: 13, fontWeight: '600', color: colores.primario },
});
