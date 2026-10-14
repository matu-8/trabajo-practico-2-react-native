import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';

// Artículos conocidos. Cualquier otra ruta de /ayuda/... cae en el mensaje genérico.
const ARTICULOS: Record<string, string> = {
  'pagos/efectivo': 'Se paga en caja al retirar el turno. Se aceptan billetes de hasta $ 10.000.',
  'pagos/tarjeta': 'Se aceptan tarjetas de débito y crédito en la caja del comedor.',
  horarios: 'Almuerzo de 11:30 a 14:00. Desayuno y kiosco de 7:30 a 10:30.',
};

export default function AyudaArticulo() {
  // El catch-all siempre llega como arreglo de strings (ver E2).
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const ruta = slug.join('/');
  const texto = ARTICULOS[ruta];

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: 'Ayuda' }} />
      <Text style={estilos.ruta}>/ayuda/{ruta}</Text>
      <Text style={estilos.texto}>
        {texto ?? 'Este artículo todavía no tiene contenido.'}
      </Text>
      <Link href="/ayuda" style={estilos.enlace}>
        Volver al índice de ayuda
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: colores.muted },
  texto: { fontSize: 16, color: colores.tinta },
  enlace: { fontSize: 15, fontWeight: '600', color: colores.primario },
});
