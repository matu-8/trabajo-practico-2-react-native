import { ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

export default function Atendidos() {
  const { atendidos } = useApp();

  // atendidos se guarda de base a tope: se invierte para mostrar el último atendido primero.
  const lista = [...atendidos].reverse();

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      {lista.length === 0 && <Text style={estilos.texto}>Todavía no se atendió ningún pedido.</Text>}

      {lista.map((pedido) => (
        <View key={pedido.numero} style={estilos.tarjeta}>
          <Text style={estilos.numero}>Turno {pedido.numero}</Text>
          <Text style={estilos.texto}>
            {pedido.items.map((plato) => plato.nombre).join(', ')}
          </Text>
          <Text style={estilos.total}>Total: {formatearPrecio(pedido.total)}</Text>
          {pedido.nota !== '' && <Text style={estilos.nota}>Nota: {pedido.nota}</Text>}
        </View>
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 10 },
  tarjeta: { backgroundColor: colores.blanco, padding: 14, borderRadius: 10, gap: 4 },
  numero: { fontSize: 18, fontWeight: '800', color: colores.tinta },
  texto: { fontSize: 14, color: colores.tinta },
  total: { fontSize: 14, fontWeight: '700', color: colores.tinta },
  nota: { fontSize: 14, color: colores.primarioOscuro, fontWeight: '600' },
});
