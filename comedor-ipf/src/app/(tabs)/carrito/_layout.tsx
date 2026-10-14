import { Stack } from 'expo-router';

import { estiloCabecera } from '@/constants/colores';

export default function LayoutCarrito() {
  return (
    <Stack screenOptions={{ ...estiloCabecera, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      <Stack.Screen name="nota" options={{ title: 'Nota para cocina' }} />
    </Stack>
  );
}
