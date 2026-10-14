import { Drawer } from 'expo-router/drawer';

import { colores, estiloCabecera } from '@/constants/colores';

export default function LayoutCocina() {
  return (
    <Drawer
      screenOptions={{
        ...estiloCabecera,
        drawerActiveTintColor: colores.primario,
        drawerInactiveTintColor: colores.tinta,
        drawerStyle: { backgroundColor: colores.fondo },
      }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina', drawerLabel: 'Pedidos en cola' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos', drawerLabel: 'Atendidos' }} />
    </Drawer>
  );
}
