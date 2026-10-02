# Trabajo Practico 2 · React Native
## Estructura inicial de proyecto
# Comedor IPF - Estructura de carpetas

```
comedor-ipf/
├── app.json                      # "scheme": "comedoripf" y typedRoutes: true
├── package.json                  # "main": "expo-router/entry"
├── README.md
├── RESPUESTAS.md
└── src/
    ├── app/
    │   ├── _layout.tsx           # Stack raíz + Provider + GestureHandlerRootView
    │   │                         # + Stack.Protected + unstable_settings anchor "(tabs)"
    │   ├── +not-found.tsx        # 404: cualquier otra URL
    │   │
    │   ├── (tabs)/               # Tabs (expo-router/js-tabs)
    │   │   ├── _layout.tsx       # Tabs: index, menu, carrito
    │   │   ├── index.tsx         # /  (Inicio)
    │   │   ├── menu/
    │   │   │   ├── _layout.tsx   # Stack propio de la tab Menú
    │   │   │   ├── index.tsx     # /menu
    │   │   │   └── [id].tsx      # /menu/[id]
    │   │   └── carrito/
    │   │       ├── _layout.tsx   # Stack propio de la tab Carrito
    │   │       ├── index.tsx     # /carrito
    │   │       └── nota.tsx      # /carrito/nota
    │   │
    │   ├── categorias/
    │   │   └── [categoria].tsx   # /categorias/[categoria]
    │   ├── buscar.tsx            # /buscar?q=&categoria=
    │   ├── confirmar.tsx         # /confirmar (presentation: "modal")
    │   ├── turno/
    │   │   └── [numero].tsx      # /turno/[numero]
    │   ├── login.tsx             # /login (modal, solo sin sesión)
    │   │
    │   ├── cocina/               # Drawer (expo-router/drawer), solo con sesión
    │   │   ├── _layout.tsx
    │   │   ├── index.tsx         # /cocina
    │   │   └── atendidos.tsx     # /cocina/atendidos
    │   │
    │   ├── ayuda/
    │   │   ├── index.tsx         # /ayuda
    │   │   └── [...slug].tsx     # /ayuda/pagos/efectivo, etc.
    │   │
    │   └── pedido.tsx            # /pedido -> <Redirect href="/carrito" />
    │
    ├── components/
    │   ├── DondeEstoy.tsx        # usePathname, useSegments, useLocalSearchParams
    │   ├── TarjetaPlato.tsx
    │   ├── TarjetaAcceso.tsx
    │   └── ItemCarrito.tsx
    ├── context/
    │   └── AppContext.tsx        # sesión, carrito, cola, pilas
    ├── data/
    │   └── platos.ts             # mínimo 12 platos, 4 categorías
    ├── estructuras/
    │   ├── Pila.ts
    │   └── Cola.ts               # sin shift()
    └── types/
        └── index.ts              # Plato, Pedido, Categoria
```

## Correspondencia con las rutas de G1

| URL | Archivo |
|---|---|
| `/` | `src/app/(tabs)/index.tsx` |
| `/menu` | `src/app/(tabs)/menu/index.tsx` |
| `/menu/[id]` | `src/app/(tabs)/menu/[id].tsx` |
| `/categorias/[categoria]` | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=&categoria=` | `src/app/buscar.tsx` |
| `/carrito` | `src/app/(tabs)/carrito/index.tsx` |
| `/carrito/nota` | `src/app/(tabs)/carrito/nota.tsx` |
| `/confirmar` | `src/app/confirmar.tsx` |
| `/turno/[numero]` | `src/app/turno/[numero].tsx` |
| `/login` | `src/app/login.tsx` |
| `/cocina` | `src/app/cocina/index.tsx` |
| `/cocina/atendidos` | `src/app/cocina/atendidos.tsx` |
| `/ayuda` | `src/app/ayuda/index.tsx` |
| `/ayuda/...` | `src/app/ayuda/[...slug].tsx` |
| `/pedido` | `src/app/pedido.tsx` |
| cualquier otra | `src/app/+not-found.tsx` |
