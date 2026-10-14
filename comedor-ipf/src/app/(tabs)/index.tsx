import { ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import TarjetaAcceso from '@/components/TarjetaAcceso';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';

export default function Inicio() {
  const { usuario } = useApp();

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.saludo}>Bienvenido al Comedor IPF</Text>
      <Text style={estilos.texto}>
        Pedí tu comida desde el celular y retirala cuando te llamen por tu turno.
      </Text>

      <View style={estilos.grilla}>
        <TarjetaAcceso titulo="Menú" descripcion="Ver los platos" href="/menu" />
        <TarjetaAcceso titulo="Buscar" descripcion="Por texto o categoría" href="/buscar" />
        <TarjetaAcceso titulo="Ayuda" descripcion="Pagos y horarios" href="/ayuda" />
        <TarjetaAcceso
          titulo="Cocina"
          descripcion={usuario ? 'Atender pedidos' : 'Ingreso del personal'}
          href={usuario ? '/cocina' : '/login'}
        />
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  saludo: { fontSize: 24, fontWeight: '800', color: colores.tinta },
  texto: { fontSize: 15, color: colores.tinta },
  grilla: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 8 },
});
