import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';

// Modal protegido con Stack.Protected (guard={!conSesion}).
// Si el inicio es exitoso, la pantalla desaparece sola del Stack: no hace falta router.back().
export default function Login() {
  const { iniciarSesion } = useApp();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    if (iniciarSesion(usuario, clave)) return;
    setError('Usuario o clave incorrectos.');
  }

  function cancelar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.texto}>Ingreso para el personal de cocina.</Text>

      <TextInput
        style={estilos.input}
        placeholder="Usuario"
        placeholderTextColor={colores.muted}
        autoCapitalize="none"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={estilos.input}
        placeholder="Clave"
        placeholderTextColor={colores.muted}
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />

      {error !== '' && <Text style={estilos.error}>{error}</Text>}

      <Pressable style={estilos.botonIngresar} onPress={ingresar}>
        <Text style={estilos.textoBoton}>Ingresar</Text>
      </Pressable>

      <Pressable style={estilos.botonSecundario} onPress={cancelar}>
        <Text style={estilos.textoBotonSecundario}>Cancelar</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo, padding: 16, gap: 12 },
  texto: { fontSize: 15, color: colores.tinta },
  input: {
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: colores.muted,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colores.tinta,
    width: '100%',
     maxWidth: 500,      // ancho máximo deseado
     alignSelf: 'center',
  },
  error: { color: colores.primarioOscuro, fontWeight: '600' },
  botonIngresar: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: "100%",
    maxWidth: 500,
    alignSelf:"center"
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.tinta,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: "100%",
    maxWidth: 500,
    alignSelf:"center"
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
  textoBotonSecundario: { color: colores.tinta, fontSize: 15, fontWeight: '600' },
});
