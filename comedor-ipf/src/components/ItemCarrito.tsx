import { StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';
import { formatearPrecio } from '@/data/platos';
import type { Plato } from '@/types';

type Props = {
  plato: Plato;
  posicion: number;
};

export default function ItemCarrito({ plato, posicion }: Props) {
  return (
    <View style={estilos.fila}>
      <Text style={estilos.posicion}>{posicion}</Text>
      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.muted,
  },
  posicion: { width: 24, color: colores.muted, fontWeight: '700' },
  nombre: { flex: 1, fontSize: 16, color: colores.tinta },
  precio: { fontSize: 15, fontWeight: '600', color: colores.tinta },
});
