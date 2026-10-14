import { Link, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import ItemCarrito from '@/components/ItemCarrito';
import { colores } from '@/constants/colores';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

// Modal (presentation: "modal"). Al confirmar se usa router.replace:
// la confirmación sale de la pila y "atrás" en /turno no vuelve al formulario.
export default function Confirmar() {
  const { carrito, total, nota, confirmarPedido } = useApp();

  function confirmar() {
    const pedido = confirmarPedido();
    if (!pedido) return;
    router.replace({ pathname: '/turno/[numero]', params: { numero: String(pedido.numero) } });
  }

  function cancelar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/carrito');
    }
  }

  if (carrito.length === 0) {
    return (
      <View style={estilos.pantalla}>
        <Text style={estilos.texto}>No hay platos para confirmar.</Text>
        <Link href="/menu" asChild>
          <Pressable style={estilos.botonSecundario}>
            <Text style={estilos.textoBotonSecundario}>Ir al menú</Text>
          </Pressable>
        </Link>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>Resumen del pedido</Text>
      {carrito.map((plato, indice) => (
        <ItemCarrito key={`${plato.id}-${indice}`} plato={plato} posicion={indice + 1} />
      ))}

      <View style={estilos.fila}>
        <Text style={estilos.titulo}>Total</Text>
        <Text style={estilos.titulo}>{formatearPrecio(total)}</Text>
      </View>

      {nota !== '' && <Text style={estilos.texto}>Nota para cocina: {nota}</Text>}

      <Pressable style={estilos.botonConfirmar} onPress={confirmar}>
        <Text style={estilos.textoBoton}>Confirmar</Text>
      </Pressable>

      <Pressable style={estilos.botonSecundario} onPress={cancelar}>
        <Text style={estilos.textoBotonSecundario}>Cancelar</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
  titulo: { fontSize: 18, fontWeight: '800', color: colores.tinta },
  texto: { fontSize: 15, color: colores.tinta },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  botonConfirmar: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.tinta,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: colores.blanco, fontSize: 16, fontWeight: '700' },
  textoBotonSecundario: { color: colores.tinta, fontSize: 15, fontWeight: '600' },
});
