import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';

// Poner en false para ocultar el recuadro en las capturas finales.
const DEBUG = true;

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname(): {pathname}</Text>
      <Text style={estilos.linea}>useSegments(): {JSON.stringify(segments)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams(): {JSON.stringify(params)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 24,
    padding: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colores.muted,
    backgroundColor: colores.blanco,
    gap: 4,
  },
  titulo: { fontWeight: '700', color: colores.tinta },
  linea: { fontFamily: 'monospace', fontSize: 12, color: colores.muted },
});
