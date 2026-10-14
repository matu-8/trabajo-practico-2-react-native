import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';

import { colores, estiloCabecera } from '@/constants/colores';
import { useApp } from '@/context/AppContext';

export default function LayoutTabs() {
  const { carrito } = useApp();
  const cantidad = carrito.length;

  return (
    <Tabs
      screenOptions={{
        ...estiloCabecera,
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.muted,
        tabBarStyle: { backgroundColor: colores.tinta },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Comedor IPF',
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: cantidad > 0 ? cantidad : undefined,
        }}
      />
    </Tabs>
  );
}
