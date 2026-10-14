import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';

export default function AyudaIndice() {
  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: 'Ayuda' }} />
      <Text style={estilos.titulo}>Preguntas frecuentes</Text>

      <Link href={{ pathname: '/ayuda/[...slug]', params: { slug: ['pagos', 'efectivo'] } }} asChild>
        <Pressable style={estilos.opcion}>
          <Text style={estilos.opcionTexto}>Pagos en efectivo</Text>
        </Pressable>
      </Link>

      <Link href={{ pathname: '/ayuda/[...slug]', params: { slug: ['pagos', 'tarjeta'] } }} asChild>
        <Pressable style={estilos.opcion}>
          <Text style={estilos.opcionTexto}>Pagos con tarjeta</Text>
        </Pressable>
      </Link>

      <Link href={{ pathname: '/ayuda/[...slug]', params: { slug: ['horarios'] } }} asChild>
        <Pressable style={estilos.opcion}>
          <Text style={estilos.opcionTexto}>Horarios del comedor</Text>
        </Pressable>
      </Link>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 10 },
  titulo: { fontSize: 22, fontWeight: '800', color: colores.tinta, marginBottom: 4 },
  opcion: {
    backgroundColor: colores.blanco,
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colores.primario,
  },
  opcionTexto: { fontSize: 16, fontWeight: '600', color: colores.tinta },
});
