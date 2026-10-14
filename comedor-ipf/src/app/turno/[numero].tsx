import { Link, Stack, useLocalSearchParams } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosEnCola, atendidos } = useApp();

  const numeroTurno = Number(numero);
  const numeroValido = Number.isInteger(numeroTurno) && numeroTurno > 0;

  // Posición en la cola: cuántos pedidos hay adelante (0 = sos el próximo).
  const posicion = numeroValido
    ? pedidosEnCola.findIndex((pedido) => pedido.numero === numeroTurno)
    : -1;
  const yaAtendido = numeroValido && atendidos.some((pedido) => pedido.numero === numeroTurno);

  let contenido: ReactNode;
  if (!numeroValido) {
    contenido = <Text style={estilos.texto}>"{numero}" no es un número de turno válido.</Text>;
  } else if (posicion === -1) {
    contenido = (
      <Text style={estilos.texto}>
        {yaAtendido
          ? `El turno ${numeroTurno} ya fue atendido.`
          : `No existe el turno ${numeroTurno}.`}
      </Text>
    );
  } else {
    contenido = (
      <>
        <Text style={estilos.etiqueta}>Tu número de turno</Text>
        <Text style={estilos.numero}>{numeroTurno}</Text>
        <Text style={estilos.texto}>
          Pedidos delante de vos: {posicion}
        </Text>
      </>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <Stack.Screen options={{ title: numeroValido ? `Turno ${numeroTurno}` : 'Turno' }} />
      {contenido}

      <Link href="/" asChild>
        <Pressable style={estilos.boton}>
          <Text style={estilos.textoBoton}>Volver al inicio</Text>
        </Pressable>
      </Link>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo, padding: 16, gap: 12, justifyContent: 'center' },
  etiqueta: { fontSize: 16, color: colores.muted, textAlign: 'center' },
  numero: { fontSize: 72, fontWeight: '900', color: colores.primario, textAlign: 'center' },
  texto: { fontSize: 16, color: colores.tinta, textAlign: 'center' },
  boton: {
    backgroundColor: colores.tinta,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
});
