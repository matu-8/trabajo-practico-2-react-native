import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import ItemCarrito from '@/components/ItemCarrito';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

// Solo existe con sesión (Stack.Protected en src/app/_layout.tsx).
// Al cerrar sesión, esta pantalla sale de la pila sin llamar a router.back().
export default function Cocina() {
  const { frente, pedidosEnCola, atenderSiguiente, cerrarSesion } = useApp();

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.espera}>Pedidos en espera: {pedidosEnCola.length}</Text>

      {frente ? (
        <View style={estilos.tarjeta}>
          <Text style={estilos.etiqueta}>Próximo a atender</Text>
          <Text style={estilos.numero}>Turno {frente.numero}</Text>
          {frente.items.map((plato, indice) => (
            <ItemCarrito key={`${plato.id}-${indice}`} plato={plato} posicion={indice + 1} />
          ))}
          <Text style={estilos.total}>Total: {formatearPrecio(frente.total)}</Text>
          {frente.nota !== '' && <Text style={estilos.nota}>Nota: {frente.nota}</Text>}
        </View>
      ) : (
        <Text style={estilos.texto}>No hay pedidos en la cola.</Text>
      )}

      <Pressable
        disabled={!frente}
        onPress={atenderSiguiente}
        style={frente ? estilos.botonAtender : estilos.botonDeshabilitado}>
        <Text style={estilos.textoBoton}>Atender siguiente</Text>
      </Pressable>

      <Pressable style={estilos.botonCerrar} onPress={cerrarSesion}>
        <Text style={estilos.textoBoton}>Cerrar sesión</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  espera: { fontSize: 15, fontWeight: '700', color: colores.tinta },
  tarjeta: { backgroundColor: colores.blanco, padding: 16, borderRadius: 12, gap: 6 },
  etiqueta: { fontSize: 13, color: colores.muted },
  numero: { fontSize: 28, fontWeight: '900', color: colores.tinta },
  total: { fontSize: 16, fontWeight: '700', color: colores.tinta, marginTop: 6 },
  nota: { fontSize: 15, color: colores.primarioOscuro, fontWeight: '600' },
  texto: { fontSize: 15, color: colores.tinta },
  botonAtender: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: colores.muted,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.6,
  },
  botonCerrar: {
    backgroundColor: colores.tinta,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
});
