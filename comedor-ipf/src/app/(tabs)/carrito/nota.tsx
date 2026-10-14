import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';

export default function NotaCarrito() {
  const { nota, guardarNota } = useApp();
  const [texto, setTexto] = useState(nota);

  function guardar() {
    guardarNota(texto.trim());
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/carrito');
    }
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.texto}>Aclaración para la cocina (ej.: "sin sal").</Text>
      <TextInput
        style={estilos.input}
        multiline
        placeholder="Escribí tu aclaración..."
        placeholderTextColor={colores.muted}
        value={texto}
        onChangeText={setTexto}
      />
      <Pressable style={estilos.boton} onPress={guardar}>
        <Text style={estilos.textoBoton}>Guardar nota</Text>
      </Pressable>
      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo, padding: 16, gap: 12 },
  texto: { fontSize: 15, color: colores.tinta },
  input: {
    minHeight: 100,
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: colores.muted,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colores.tinta,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
});
