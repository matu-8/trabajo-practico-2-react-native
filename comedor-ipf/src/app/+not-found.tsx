import { Link, Stack, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';

export default function NoEncontrada() {
  const pathname = usePathname();

  return (
    <View style={estilos.pantalla}>
      <Stack.Screen options={{ title: 'No encontrada' }} />
      <Text style={estilos.titulo}>404</Text>
      <Text style={estilos.texto}>No existe la pantalla {pathname}.</Text>

      <Link href="/" asChild>
        <Pressable style={estilos.boton}>
          <Text style={estilos.textoBoton}>Ir al inicio</Text>
        </Pressable>
      </Link>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo, padding: 16, gap: 12, justifyContent: 'center' },
  titulo: { fontSize: 64, fontWeight: '900', color: colores.primarioOscuro, textAlign: 'center' },
  texto: { fontSize: 16, color: colores.tinta, textAlign: 'center' },
  boton: {
    backgroundColor: colores.tinta,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
});
