import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/constants/colores';

type Props = {
  titulo: string;
  descripcion: string;
  href: Href;
};

// Link con asChild: el Pressable recibe onPress/href del Link.
// El estilo es un objeto plano (un array provocaría el error de <Slot>, ver F5a).
export default function TarjetaAcceso({ titulo, descripcion, href }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable style={estilos.tarjeta}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.descripcion}>{descripcion}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    width: '48%',
    minHeight: 96,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colores.tinta,
    justifyContent: 'center',
    gap: 6,
  },
  titulo: { color: colores.fondo, fontSize: 18, fontWeight: '700' },
  descripcion: { color: colores.muted, fontSize: 13 },
});
