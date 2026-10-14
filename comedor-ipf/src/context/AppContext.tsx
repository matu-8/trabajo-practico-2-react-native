import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';
import type { Pedido, Plato } from '@/types';

// Credenciales fijas del personal de cocina (requisito G2.8 / decisión de la consigna).
const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = '1234';

type AppContextValue = {
  // Sesión
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  // Carrito: la pila de acciones es el propio carrito (base = primer plato agregado)
  carrito: Plato[];
  total: number;
  nota: string;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  guardarNota: (texto: string) => void;

  // Pedidos: cola de espera (frente = próximo a atender)
  confirmarPedido: () => Pedido | null;
  pedidosEnCola: Pedido[];
  frente: Pedido | undefined;
  atenderSiguiente: () => Pedido | undefined;
  atendidos: Pedido[];
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Las estructuras son mutables; el estado de React guarda copias (aArray)
  // para que cada cambio dispare un re-render.
  const [usuario, setUsuario] = useState<string | null>(null);

  const [pilaCarrito] = useState(() => new Pila<Plato>());
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState('');

  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [pedidosEnCola, setPedidosEnCola] = useState<Pedido[]>([]);

  const [pilaAtendidos] = useState(() => new Pila<Pedido>());
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  const correlativo = useRef(0);

  function iniciarSesion(usuarioIngresado: string, clave: string): boolean {
    const usuarioLimpio = usuarioIngresado.trim();
    if (usuarioLimpio !== USUARIO_COCINA || clave !== CLAVE_COCINA) return false;
    setUsuario(usuarioLimpio);
    return true;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  function agregarAlCarrito(plato: Plato) {
    pilaCarrito.push(plato);
    setCarrito(pilaCarrito.aArray());
  }

  function deshacerUltimo() {
    if (pilaCarrito.vacia) return;
    pilaCarrito.pop();
    setCarrito(pilaCarrito.aArray());
  }

  function guardarNota(texto: string) {
    setNota(texto);
  }

  function confirmarPedido(): Pedido | null {
    // Si el carrito ya fue confirmado (doble toque), no hay nada que encolar.
    if (pilaCarrito.vacia) return null;

    const items = pilaCarrito.aArray();
    correlativo.current += 1;
    const pedido: Pedido = {
      numero: correlativo.current,
      items,
      nota,
      total: items.reduce((suma, plato) => suma + plato.precio, 0),
    };

    colaPedidos.encolar(pedido);
    setPedidosEnCola(colaPedidos.aArray());

    while (!pilaCarrito.vacia) pilaCarrito.pop();
    setCarrito([]);
    setNota('');

    return pedido;
  }

  function atenderSiguiente(): Pedido | undefined {
    const pedido = colaPedidos.desencolar();
    if (!pedido) return undefined;

    pilaAtendidos.push(pedido);
    setPedidosEnCola(colaPedidos.aArray());
    setAtendidos(pilaAtendidos.aArray());
    return pedido;
  }

  const total = carrito.reduce((suma, plato) => suma + plato.precio, 0);

  const value: AppContextValue = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    carrito,
    total,
    nota,
    agregarAlCarrito,
    deshacerUltimo,
    guardarNota,
    confirmarPedido,
    pedidosEnCola,
    frente: pedidosEnCola[0],
    atenderSiguiente,
    atendidos,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const contexto = useContext(AppContext);
  if (!contexto) {
    throw new Error('useApp debe usarse dentro de <AppProvider>');
  }
  return contexto;
}
