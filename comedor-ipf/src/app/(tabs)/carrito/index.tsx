import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import ItemCarrito from '@/components/ItemCarrito';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

export default function Carrito() {
  const { carrito, total, nota, deshacerUltimo } = useApp();
  const vacio = carrito.length === 0;

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      {vacio ? (
        <Text style={estilos.texto}>El carrito está vacío. Agregá platos desde el Menú.</Text>
      ) : (
        <View>
          {carrito.map((plato, indice) => (
            <ItemCarrito key={`${plato.id}-${indice}`} plato={plato} posicion={indice + 1} />
          ))}
        </View>
      )}

      <View style={estilos.fila}>
        <Text style={estilos.total}>Total</Text>
        <Text style={estilos.total}>{formatearPrecio(total)}</Text>
      </View>

      <Pressable
        disabled={vacio}
        onPress={deshacerUltimo}
        style={vacio ? estilos.botonDeshabilitado : estilos.botonDeshacer}>
        <Text style={estilos.textoBoton}>Deshacer último</Text>
      </Pressable>

      <Link href="/carrito/nota" asChild>
        <Pressable style={estilos.botonSecundario}>
          <Text style={estilos.textoBotonSecundario}>Nota para cocina</Text>
        </Pressable>
      </Link>

      {nota !== '' && <Text style={estilos.texto}>Nota: {nota}</Text>}

      {vacio ? (
        <Pressable disabled style={estilos.botonDeshabilitado}>
          <Text style={estilos.textoBoton}>Confirmar pedido</Text>
        </Pressable>
      ) : (
        <Link href="/confirmar" asChild>
          <Pressable style={estilos.botonConfirmar}>
            <Text style={estilos.textoBoton}>Confirmar pedido</Text>
          </Pressable>
        </Link>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  texto: { fontSize: 15, color: colores.tinta },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  total: { fontSize: 18, fontWeight: '800', color: colores.tinta },
  botonDeshacer: {
    backgroundColor: colores.primarioOscuro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonConfirmar: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: colores.muted,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.6,
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.tinta,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
  textoBotonSecundario: { color: colores.tinta, fontSize: 15, fontWeight: '600' },
});
