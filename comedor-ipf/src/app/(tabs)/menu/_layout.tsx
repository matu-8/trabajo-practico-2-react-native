import { Stack } from 'expo-router';

import { estiloCabecera } from '@/constants/colores';

export default function LayoutMenu() {
  return (
    <Stack screenOptions={{ ...estiloCabecera, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Plato' }} />
    </Stack>
  );
}
