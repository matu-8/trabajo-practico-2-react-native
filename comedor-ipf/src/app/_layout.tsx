import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { estiloCabecera } from '@/constants/colores';
import { AppProvider, useApp } from '@/context/AppContext';

// Si se abre un deep link en frío (por ejemplo /categorias/bebidas),
// (tabs) queda debajo en la pila y "atrás" vuelve a la app.
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function LayoutRaiz() {
  const [fontsCargadas] = useFonts(Ionicons.font);
  if (!fontsCargadas) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

function NavegacionRaiz() {
  const { usuario } = useApp();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ ...estiloCabecera, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen
        name="confirmar"
        options={{ title: 'Confirmar pedido', presentation: 'modal' }}
      />

      {/* Solo existen con sesión iniciada */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Solo existe sin sesión: al iniciarla, el modal se cierra solo */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{ title: 'Personal de cocina', presentation: 'modal' }}
        />
      </Stack.Protected>
    </Stack>
  );
}
