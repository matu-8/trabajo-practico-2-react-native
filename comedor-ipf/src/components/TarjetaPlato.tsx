import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';
import { formatearPrecio } from '@/data/platos';
import type { Plato } from '@/types';

type Props = {
  plato: Plato;
};

export default function TarjetaPlato({ plato }: Props) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <Pressable style={estilos.tarjeta}>
        <View style={estilos.textos}>
          <Text style={estilos.nombre}>{plato.nombre}</Text>
          <Text style={estilos.descripcion}>{plato.descripcion}</Text>
        </View>
        <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: colores.blanco,
    borderLeftWidth: 4,
    borderLeftColor: colores.primario,
  },
  textos: { flex: 1, gap: 2 },
  nombre: { fontSize: 16, fontWeight: '600', color: colores.tinta },
  descripcion: { fontSize: 13, color: colores.muted },
  precio: { fontSize: 15, fontWeight: '700', color: colores.primario, marginLeft: 8 },
});
