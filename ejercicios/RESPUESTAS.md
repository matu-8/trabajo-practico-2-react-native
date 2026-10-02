# Trabajo Practico 2 - React Native - Enrutamiento
## Parte A · Estructuras de datos: la pila y la cola
### A1. Conceptos  
**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**
- LIFO hace referencia a Last in, First out y pertenece a la estructura de pila, las siglas FIFO significan First in First out y pertenece a la estructura de cola.  

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**
- En LIFO, un elemento ingresa por frente y sale por frente.  
- En FIFO, el primer elemento que ingresa por el final, sale por el frente.

**c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.**  

- Ejemplo vida real LIFO: Cuando se apilan cajas de pizza, y se retira una a una para colocar el producto dentro.
- Ejemplo en aplicacion LIFO: Cuando se vuelve hacia atras para ver un producto visto antes, en una aplicacion de compras.
- Ejemplo de vida real FIFO: Una fila de autos en una estacion de servicio, el primero en llegar es el primero en irse.
- Ejemplo en aplicacion FIFO: Cuando se produce un "lageo" en la aplicacion, se acumulan procesos (eventos) que no se resuleven en el momento pero luego de un determinado periodo, se finalizan uno a uno, en orden en que fueron surgiendo (el primer evento, se ejecuta primero).

### A2. Seguimiento de una pila
Se sigue la pila paso a paso (de base a tope):

| Instruccion | Pila resultante |
|---|---|
| `p.push('Inicio')` | `['Inicio']` |
| `p.push('Productos')` | `['Inicio', 'Productos']` |
| `p.push('Detalle 3')` | `['Inicio', 'Productos', 'Detalle 3']` |
| `p.pop()` | `['Inicio', 'Productos']` |
| `p.push('Perfil')` | `['Inicio', 'Productos', 'Perfil']` |

Salidas de los `console.log`:

- (1) `p.tope()` → `Perfil` (el tope es el ultimo elemento que entro, en este caso 'Perfil').
- (2) `p.pop()` → `Perfil` (devuelve y quita el tope).
- (3) `p.tope()` → `Productos` (ahora el tope es 'Productos').
- (4) `p.vacia` → `false` (quedan dos elementos: 'Inicio' y 'Productos').

Pila final de base a tope: `['Inicio', 'Productos']`

### A3. Seguimiento de una cola
Se sigue la cola paso a paso (de frente a final):

| Instruccion | Cola resultante |
|---|---|
| `c.encolar('Ana')` | `['Ana']` |
| `c.encolar('Beto')` | `['Ana', 'Beto']` |
| `c.desencolar()` | `['Beto']` |
| `c.encolar('Caro')` | `['Beto', 'Caro']` |
| `c.encolar('Dani')` | `['Beto', 'Caro', 'Dani']` |

Salidas de los `console.log`:

- (1) `c.frente()` → `Beto` (el frente es el primer elemento encolado que quedo en la cola).
- (2) `c.desencolar()` → `Beto` (devuelve y quita el frente).
- (3) `c.vacia` → `false` (quedan dos elementos: 'Caro' y 'Dani').

Cola final de frente a final: `['Caro', 'Dani']`

### A4. Analisis de la Implementacion
- El símbolo # (numeral) indica que un atributo es privado, dentro de una clase.
- El problema con la utilizacion de shift() es que desplaza los elementos de una lista uno a uno, haciendo el costo de pocesamiento muy grande. De manera seria, las colas de gran volumen se manejan mediante listas enlazadas (elementos con referencias en memoria, punteros).
- Para retirar un elemento de una pila, se ocupa el metodo pop(), y para las colas se utiliza el metodo shift(). No se pueden usar el mismo ya que en el caso de pop() saca el ultimo elemnto y lo devuelve, en cambio el shift() realiza lo mismo pero con el primer elemento.

### A5. Programacion: una cola eficiente
> Consigna de programacion. Se resuelve junto con la Parte G, en `src/estructuras/Cola.tsx`, usando un campo privado con el indice del frente en lugar de `shift()`.

### A6. Pila y cola dentro de Expo Router
a) Al Stack lo describe la estructura de un array de pantallas, de las cuales es visible la ultima pantalla, el tope. La accion que realiza el retroceso de pantalla es 'pop'.
b) Expo Router utiliza la estructura de archivos para la navegacion. Al efectuar dos toques rapidos en dos links, se realizarán las acciones según el orden en el que se accionaron.

## Parte B · Rutas basadas en archivos
### B1. del archivo a la URL
| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | Genera pantalla |
| `src/app/acerca.tsx` | Genera pantalla |
| `src/app/(tabs)/perfil.tsx` | Genera pantalla |
| `src/app/(tabs)/productos/index.tsx` | Genera pantalla |
| `src/app/(tabs)/productos/[id].tsx` | Genera pantalla |
| `src/app/docs/[...slug].tsx` | Genera pantalla |
| `src/app/_layout.tsx` | No genera pantalla, define las paginas de navegacion |
| `src/app/+not-found.tsx` | Genera la pantalla de no existencia de cierta pantalla |
| `src/app/Boton.tsx` | No genera pantalla, define un componente de boton |

### B2. de la URL al archivo
| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` (con una pantalla propia) | `src/app/ayuda/index.tsx` + `src/app/ayuda/[...slug].tsx` |

Notas:
- `/categorias/bebidas` tiene un solo segmento variable, por eso alcanza con `[categoria].tsx`. Si se quisiera soportar subniveles (`/categorias/bebidas/gaseosas`) habria que usar `[...categoria].tsx`.
- `/buscar` no necesita corchetes: los query params (`q`, `categoria`) no forman parte de la ruta y se leen con `useLocalSearchParams()`.
- El catch-all `[...slug].tsx` captura uno o mas segmentos, por eso sirve para ambas URLs de ayuda. Como exige al menos un segmento, para que `/ayuda` exista por separado hace falta ademas un `index.tsx` en la misma carpeta.

### B3. Verdadero o falso
**a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración.** → **FALSO.**
Las rutas se generan solas a partir de los archivos de la carpeta `app`. No existe ninguna tabla de registro. Lo que se declara en el `_layout.tsx` (por ejemplo `<Stack.Screen name="acerca" />`) es opcional y sirve solo para **configurar** la pantalla (titulo, header, presentacion), no para crearla.

**b) Los archivos `_layout.tsx` son pantallas que el usuario puede visitar.** → **FALSO.**
Un `_layout.tsx` no es una ruta: es un componente que envuelve a sus pantallas hijas y define el navegador (Stack, Tabs, Drawer). No genera ninguna URL.

**c) Una carpeta entre paréntesis, como (tabs), no aparece en la URL.** → **VERDADERO.**
Los grupos entre parentesis solo organizan los archivos y permiten compartir un layout. Expo Router los ignora al construir la URL, por eso `(tabs)/productos/index.tsx` genera `/productos` y no `/(tabs)/productos`.

**d) Para agregar una librería conviene usar npm install, porque siempre trae la última versión.** → **FALSO.**
`npm install` instala la última versión publicada, que puede no ser compatible con el SDK 57 y romper la app. Lo correcto es `npx expo install <paquete>`, que resuelve la version que corresponde al SDK activo.

**e) En package.json, "main": "expo-router/entry" reemplaza al viejo App.tsx.** → **VERDADERO.**
Define el punto de entrada del bundle de JavaScript. Con Expo Router el enrutamiento se hace por archivos, asi que ya no se necesita un `App.tsx` central.

**f) La ruta /_sitemap lista todas las rutas de la app y sirve para depurar.** → **VERDADERO.**
Expo Router genera automaticamente una pantalla interna en `/_sitemap` que muestra todas las rutas detectadas. Se puede desactivar con la opcion `sitemap: false` del plugin `expo-router`.

**g) Si existen docs/index.tsx y docs/[...slug].tsx, la URL /docs muestra docs/index.tsx.** → **VERDADERO.**
Las coincidencias exactas tienen prioridad sobre las rutas dinamicas, y el catch-all exige al menos un segmento. Como `/docs` no tiene nada despues de la barra, la resuelve `docs/index.tsx`.

**h) En SDK 57, expo-router usa el mismo número de versión mayor que el SDK (57).** → **FALSO.**
`expo-router` tiene su propia versionado independiente del SDK. En SDK 57 se distribuye como `expo-router@~57.x`, pero eso es una coincidencia de numeracion, no una regla: se actualiza segun las releases del paquete, no del SDK.

## Parte C · Navegar: <Link>, router y la pila
### C1. Métodos de router
| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | **Apila** una pantalla nueva arriba de la actual. Siempre agrega una entrada, aunque la ruta ya exista en la pila. |
| `router.navigate(href)` | Si la ruta ya esta en la pila, vuelve a esa instancia; si no esta, se comporta como `push`. Ideal para no duplicar pantallas. |
| `router.replace(href)` | **Reemplaza** la pantalla del tope por la nueva. La cantidad de elementos de la pila no cambia, por eso el "atras" no vuelve a la pantalla reemplazada. |
| `router.back()` | **Desapila** el tope y muestra la pantalla anterior. Si la pantalla actual es la primera, no hace nada. |
| `router.dismissTo(href)` | Descarta todas las pantallas que estan por encima de `href` hasta llegar a ella. Si `href` no esta en la pila, reemplaza la pantalla actual por esa ruta. |
| `router.dismissAll()` | Descarta todas las pantallas del Stack y vuelve a la primera del navegador mas cercano (equivale a `popToTop`). |
| `router.canGoBack()` | No modifica la pila. Devuelve `true` si hay alguna pantalla debajo en el historial y `false` si la actual es la primera. Sirve para mostrar u ocultar el boton de "atras". |
| `router.setParams({...})` | No navega ni apila: **actualiza los query params** de la ruta actual. Acepta valores estaticos o funciones `(prev) => nuevo` que reciben el valor actual. |

### C2. Simulación de la pila
Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante |
|---|---|---|
| 1 | `router.push("/productos/1")` | `[ /productos, /productos/1 ]` |
| 2 | `router.push("/productos/2")` | `[ /productos, /productos/1, /productos/2 ]` |
| 3 | `router.navigate("/productos/5")` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 4 | `router.push("/perfil")` | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]` |
| 5 | `router.replace("/buscar")` | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` |
| 6 | `router.back()` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 7 | `router.dismissTo("/productos")` | `[ /productos ]` |
| 8 | `router.canGoBack()` | → devuelve **`false`** |

Justificacion:
- (3) `navigate` busca la ruta en la pila. Como `/productos/5` no estaba, se comporta como `push`.
- (5) `replace` sustituye `/perfil` por `/buscar` en el tope: la pila mantiene la misma cantidad de elementos.
- (6) `back` quita el tope (`/buscar`) y reveal `/productos/5`.
- (7) `dismissTo("/productos")` descarta de una sola vez `/productos/5`, `/productos/2`, `/productos/1`.
- (8) Quedo solo `/productos` en la pila, no hay nada debajo, por eso `false`.

### C3. ¿Link o router?
**a) El usuario toca la tarjeta de un producto en una lista.** → `<Link>`
Es una navegacion directa del usuario, sin logica intermedia. `Link` es declarativo, no necesita JavaScript y aporta accesibilidad (se comporta como un boton real).
`href={{ pathname: '/productos/[id]', params: { id: String(producto.id) } }}`

**b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.** → `router.replace()`
La navegacion ocurre **despues** de una logica (respuesta de la API), asi que corresponde `router`. Ademas debe ser `replace` y no `push`: si se apila, el usuario podria volver con "atras" al formulario ya enviado y verifiquelo duplicado.

**c) Botón "Cancelar" dentro de un modal.** → `router.back()`
Un modal se cierra deshaciendo la navegacion que lo abrio. `back()` lo cierra y devuelve al usuario a la pantalla de la que venia.

**d) Después de un login exitoso hay que ir a la pantalla principal.** → `router.replace('/')`
Es navegacion post-logica. Si se usara `push('/')`, el login quedaria en la pila y al tocar "atras" el usuario volveria a la pantalla de login ya autenticado.

**e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.** → `router.dismissTo('/pedidos')`
`dismissTo` descarta en un solo paso todas las pantallas intermedias. Con `back()` habria que presionar tres veces.

### C4. Escribí el código
> Consigna de programacion. Se resuelve en la Parte G, usando `href` como objeto en `<Link>` y `StyleSheet.flatten()` para que el `<Pressable>` funcione con `asChild`.

### C5. Pensar
En la web cada `<Link>` se convierte en un `<a href>` real, con la URL visible en la barra de direcciones. Eso le da al usuario ventajas concretas: puede copiar la URL, compartirla, abrirla en otra pestaña, guardarla en marcadores y usar el boton de "atras" del navegador.

En el celular no hay barra de direcciones: la app es una sola "pestaña" y el historial lo administra el Stack, no el sistema. Por eso copiar o compartir un link no es algo nativo. Expo Router lo resuelve manteniendo la misma idea de URL como identificador unico de cada pantalla y permitiendo abrirla desde afuera con deep links (`Linking.createURL`). El `Link` sigue siendo la abstraccion correcta porque ademas permite disparar la accion con un simple toque, sin escribir la URL a mano.

## Parte D · Navegadores: Stack, Tabs y Drawer
### D1. Comparación
| Criterio | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Si: es una pila (LIFO), cada pantalla nueva se apila sobre la anterior. | No: cada tab conserva su propia pila, pero las tabs no se apilan entre si. | No: es un panel lateral que se abre y se cierra. Puede contener un navegador propio. |
| ¿Cómo cambia de pantalla el usuario? | Con un link o boton que navega, y con el gesto o boton de "atras" para desapilar. | Tocando el icono o la etiqueta de la tab en la barra inferior. | Deslizando desde el borde de la pantalla o con el boton de menu. |
| ¿Desde dónde se importa en SDK 57? | `import { Stack } from 'expo-router'` | `import { Tabs } from 'expo-router/js-tabs'` | `import { Drawer } from 'expo-router/drawer'` |
| Un caso de uso típico | Flujo lineal con pasos: login → formulario → confirmacion. | App con secciones siempre visibles: Inicio, Menu, Carrito. | App con muchas secciones de navegacion: Cocina, Ayuda, Ajustes. |

### D2. Cada tab tiene su pila
El usuario ve **el detalle del producto 4**.

Cada tab del navegador `Tabs` mantiene su propia pila independiente. Cuando el usuario salio a la tab Inicio, la pila de la tab Productos quedo congelada en `[ /productos, /productos/4 ]`, con el detalle en el tope. Cambiar de tab no borra la pila ni llama a `pop`, por eso al volver a Productos aparece exactamente donde estaba.

App que se comporta asi: **Instagram**. Si se abre el perfil de alguien, se toca una story y se cambia al perfil propio, al volver a la tab del perfil la story sigue abierta en el mismo lugar.

### D3. ¿Dónde va cada pantalla?
Regla practica: si la pantalla **debe mantener visible la barra de pestañas**, va dentro de la tab; si **debe taparla** (modal), va en el Stack raiz.

| Pantalla | Ubicacion | Motivo |
|---|---|---|
| a) Detalle de un producto | Dentro de la tab, `src/app/(tabs)/menu/[id].tsx` | La consigna pide que la barra de pestañas siga visible, asi que tiene que vivir en el Stack de la tab Menu. |
| b) Modal para confirmar una compra | Stack raiz, `src/app/confirmar.tsx` con `presentation: 'modal'` | Un modal tapa la barra de pestañas, y solo el Stack raiz puede superponerse a ella. |
| c) Pantalla de login que se abre como modal | Stack raiz, `src/app/login.tsx` con `presentation: 'modal'` | Es la misma logica que (b): si viviera dentro de una tab, la barra quedaria visible detras. |
| d) "Mis pedidos anteriores" dentro de Perfil | Dentro de la tab, `src/app/(tabs)/perfil/pedidos.tsx` | Pertenece a la seccion Perfil y no necesita aislar al usuario de la barra de navegacion. |

### D4. Configurar el Stack
**a) ¿Qué diferencia hay entre `screenOptions` y las `options` de un `Stack.Screen`?**
`screenOptions` son opciones **por defecto para todas** las pantallas del navegador. Las `options` de un `<Stack.Screen>` pisan esos valores **solo para esa pantalla**. El orden de prioridad es: `screenOptions` → `options` del `Stack.Screen` declarado en el layout → `options` que la propia pantalla setea con `<Stack.Screen options={...} />` o `navigation.setOptions()`.

**b) ¿Por qué (tabs) tiene `headerShown: false`?**
Porque `(tabs)` no es una pantalla real sino un **grupo** de rutas. El header del Stack raiz se dibujaria sobre la barra de pestañas de `Tabs`, y se verian dos barras superpuestas arriba. Como cada tab ya tiene su propia barra de navegacion, el header del Stack raiz debe ocultarse.

**c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?**
**Si, la pantalla existe.** Expo Router crea la ruta igual por el archivo; declararla en el Stack no la crea, solo agrega su entrada al navegador para poder **configurarla**. Sirve justamente para eso: asignarle un titulo, ocultar el header, cambiar la presentacion o la animacion, sin tener que hacerlo desde el codigo de la pantalla.

**d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?**
Valores posibles: `card` (default), `modal`, `transparentModal`, `containedModal`, `containedTransparentModal`, `fullScreenModal` y `formSheet`.

Para una hoja inferior al 50% usaria **`formSheet`**, acompanado de `sheetAllowedDetents: [0.5]` para fijar que la hoja se abre a la mitad de la pantalla y deja arrastrarla.

**e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga "Producto 7"?**
Desde la propia pantalla, declarando un `<Stack.Screen options={...} />` antes del contenido:

```tsx
import { Stack } from 'expo-router';

export default function DetalleProducto() {
  return (
    <>
      <Stack.Screen options={{ title: 'Producto 7' }} />
      {/* contenido de la pantalla */}
    </>
  );
}
```

La alternativa clasica es `useNavigation()` + `navigation.setOptions({ title: 'Producto 7' })` dentro de un `useEffect`. La primera es la recomendada en Expo Router porque se aplica en el mismo render y no provoca un render extra.

### D5. Tabs y Drawer en SDK 57
**a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**
A partir de SDK 56/57 Expo Router **dejo de exponer los navegadores de React Navigation** y los incluye en sus propios modulos. Por eso `Tabs` se importa de **`expo-router/js-tabs`** (`import { Tabs } from 'expo-router/js-tabs'`) y ya no de `expo-router`. Lo mismo aplica a los demas: `/js-stack`, `/js-top-tabs`, `/drawer`.

La alternativa experimental es **Native Tabs**: `import { NativeTabs } from 'expo-router/unstable-native-tabs'`. Usa la barra de pestañas nativa del sistema (iOS/Android), con mejor rendimiento y apariencia nativa, a costa de menos personalización que la version JavaScript.

**b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?**
Los dos paquetes de animación son **`react-native-reanimated`** y **`react-native-worklets`**, que son los que mueven la apertura y el cierre del panel. Ademas se necesita `react-native-gesture-handler` para los gestos de deslizamiento.

En el layout raiz hay que envolver toda la navegacion con **`GestureHandlerRootView`** de `react-native-gesture-handler`, porque los gestos deben registrarse en la raiz de la app para que funcionen en todas las pantallas.

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**
**No, no hace falta.** Desde SDK 56 el Drawer viene incluido en `expo-router` y por debajo usa `react-native-drawer-layout`. Ademas Expo Router dejo de permitir imports desde `@react-navigation/*` en el codigo de la aplicacion: hay que importar siempre desde `expo-router/*`.

**d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?**
Actua en el **navegador mas cercano (el actual)**. Si la pantalla esta dentro de una tab que tiene su propio Stack, `back()` desapila dentro de esa tab; no borra la tab ni sale del navegador de pestanas. Para volver al Stack raiz hay que usar `router.dismissTo()` o `router.dismissAll()`.

## Parte E · Rutas dinámicas, parámetros y hooks
### E1. Encontrá el error
El problema es la **comparacion entre tipos**. `useLocalSearchParams()` **siempre devuelve strings**, sin importar el tipo que tengan los datos en el fuente. Por eso:

- `productos.find((p) => p.id === id)` compara un `number` (`p.id`) contra un `string` (`id`), y siempre devuelve `undefined`, aunque el producto exista.
- `if (id === 3)` falla por la misma razon: `id` es `"3"` (string), no `3` (number).

Correccion: convertir el parametro a numero una sola vez, antes de usarlo.

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const idNumero = Number(id);                 // "3" -> 3
const producto = productos.find((p) => p.id === idNumero);
if (idNumero === 3) console.log('Es el chipá');
if (!producto) return <Text>No existe el producto {id}</Text>;
return <Text>{producto.nombre}</Text>;
```

Conviene validar tambien que el valor sea numerico (`Number.isNaN(idNumero)`) antes de buscar, para que una URL como `/productos/abc` no rompa nada.

### E2. Catch-all
Con `src/app/docs/[...slug].tsx`:

| URL | Valor de `slug` |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No coincide con esta ruta |

Un detalle importante: con la sintaxis de resto (`...`) el parametro **siempre llega como arreglo de strings**, incluso cuando hay un solo segmento. Por eso el tipo se declara como `useLocalSearchParams<{ slug: string[] }>()`.

Sobre `/docs`: el catch-all captura **uno o mas** segmentos, asi que con cero segmentos no hay coincidencia y la pantalla ni siquiera se monta. Para que `/docs` exista hay que agregar `src/app/docs/index.tsx`; si no existe, se muestra `+not-found.tsx`. Al trabajar con el valor conviene normalizar: `const path = Array.isArray(slug) ? slug.join('/') : (slug ?? '')`.

### E3. Anatomía de una URL
URL de ejemplo: `rutasipf://buscar?q=mate&categoria=bebidas`

**a) ¿Identificá el scheme, la ruta y los parámetros de búsqueda?**
- **Scheme:** `rutasipf` (el nombre con el que se registro la app, definido en `app.json`).
- **Ruta:** `/buscar` (el camino que decide que pantalla se muestra).
- **Parametros de busqueda:** `q=mate` y `categoria=bebidas` (van despues del `?`, separados por `&`).

**b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**
Devuelve un objeto con los parametros de la pantalla actual: `{ q: 'mate', categoria: 'bebidas' }`. Los valores llegan como **strings**, aunque sean numeros.

**c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**
**No.** Los corchetes (`[param]`) sirven para los **segmentos de la ruta** (path params), no para los query params. Los query params viajan siempre en la URL y se leen igual en cualquier archivo con `useLocalSearchParams()`, asi que `buscar.tsx` (sin corchetes) ya recibe `q` y `categoria`.

**d) ¿Por qué usar `router.setParams({ q: texto })` en lugar de `router.push` al escribir en el buscador?**
Dos razones:
1. **No apila pantallas.** Cada pulsacion de tecla con `push` crearia una entrada nueva en la pila: escribiendo "mate" quedarian cuatro pantallas y el boton "atras" llevaria a "m", "ma", "mat" en vez de salir del buscador.
2. **La busqueda queda en la URL y se puede compartir.** Con `setParams` la URL se actualiza en el lugar, queda `/buscar?q=mate` y ese link se puede copiar, enviar por mensaje o guardar. Ademas "atras" vuelve a la pantalla anterior real.

### E4. ¿Dónde estoy?
| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `/productos/3` | `/buscar` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

Notas:
- `usePathname()` devuelve la ruta **sin** los query params y con los segmentos ya resueltos: por eso en `/productos/3` no aparece `[id]` ni `(tabs)`.
- `useSegments()` devuelve los segmentos **sin normalizar**, tal como aparecen en el arbol de archivos. Por eso conserva el nombre del grupo `(tabs)` y el nombre literal del parametro `[id]`. Es util para preguntas como `segments[0] === '(tabs)'`.
- `useLocalSearchParams()` devuelve solo los parametros de la pantalla actual, y como ruta dinamica, `id` llega como texto.

### E5. Local vs global
**a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?**
`useLocalSearchParams()` devuelve **solo** los parametros de la pantalla que esta enfocada. `useGlobalSearchParams()` devuelve los parametros de **todas** las rutas activas del arbol de navegacion, dando prioridad a los de la pantalla actual, y se actualiza incluso cuando la pantalla no esta enfocada.

La opcion por defecto es **`useLocalSearchParams`**, porque es la simple y no tiene ambiguedad. Solo conviene `useGlobalSearchParams` cuando un **layout** necesita leer un parametro que pertenece a una pantalla hija (por ejemplo, el `_layout.tsx` raiz que quiere mostrar `q` en el header).

**b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.**
Ejecuta un efecto **cada vez que la pantalla gana el foco**, y la funcion de limpieza se ejecuta cuando **pierde** el foco (no cuando se desmonta). Es la herramienta correcta para consultar datos, reiniciar suscripciones o limpiar temporizadores cada vez que el usuario vuelve a la pantalla.

```tsx
useFocusEffect(
  useCallback(() => {
    cargarPedidosPendientes();               // al entrar o volver a /cocina
    const t = setInterval(cargarPedidosPendientes, 5000);
    return () => clearInterval(t);           // al salir, frena el temporizador
  }, [])
);
```

El callback debe estar envuelto en `useCallback` para no ejecutarse en cada render.

**c) La URL /productos/mate abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?**
**No es un error de Expo Router.** La ruta `/productos/mate` si coincide con el patron `productos/[id]`, asi que Expo Router abre la pantalla correctamente: `[id]` acepta cualquier texto. Expo Router no valida el contenido de los parametros dinamicos, solo la forma de la URL.

La responsabilidad es **de la aplicacion**. La pantalla debe validar el parametro: convertirlo con `Number()` o `parseInt()`, comprobar que no sea `NaN`, buscar en la fuente de datos y, si no encuentra el producto, mostrar un mensaje (o navegar a la 404). El caso `/productos/mate` es ademas una pista de un error de tipos: si los ids son numericos, el parametro deberia validarse como numerico.

## Parte F · Redirecciones, rutas protegidas y deep links
### F1. Redirect
**a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de router equivale?**
Durante el render navega a `/productos` en lugar de mostrar el contenido de la pantalla actual. Es equivalente a **`router.replace('/productos')`**, porque sustituye la pantalla en vez de apilarla.

**b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema que aparecería.**
Porque si usara `push`, la pantalla de origen quedaria **debajo** en la pila. El usuario veria la pantalla nueva, pero al presionar "atras" volveria a la pantalla que deberia redirigir, que volveria a redirigir, y asi indefinidamente: un ciclo de ir y volver del que no se puede salir. Con `replace` la pantalla de origen se elimina de la pila y solo queda la nueva.

### F2. Stack.Protected
```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={ conSesion }>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={ !conSesion }>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a) ¿Qué le pasa a una pantalla cuando su guard es false?**
Se **elimina del navegador**: no se la puede navegar y ademas se la **borra de la pila**. Si era la pantalla visible, el navegador vuelve automaticamente a la pantalla anterior.

**b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?**
Porque al cambiar `usuario`, el layout raiz se vuelve a renderizar con `conSesion = true`. Entonces el `Stack.Protected` que envuelve a `login` pasa a tener `guard={ false }`, y React Navigation saca la pantalla `login` del stack de forma automatica. Como el login es un modal, al disappear del stack se cierra solo.

**c) Aparece el aviso "The action 'NAVIGATE' … was not handled by any navigator". ¿Qué lo causa y cómo se evita?**
Ocurre cuando se despacha una accion `NAVIGATE` hacia una ruta que **ningun navegador activo puede atender**. Las causas mas comunes son:
1. Intentar navegar a una ruta protegida cuando su `guard` es `false` (la pantalla no existe en el arbol).
2. Usar `push` sobre una pantalla que ya no esta en el arbol, por ejemplo hacer `push('/')` justo despues de que el login se elimino.

Como evitarlo:
- No disparar navegaciones hacia rutas protegidas sin la condicion necesaria: primero iniciar sesion y recien alla navegar.
- Usar **`router.replace()`** en vez de `push` cuando la navegacion reemplaza una pantalla que va a desaparecer.
- Declarar las rutas con `Stack.Protected` en el layout en lugar de mostrarlas y ocultarlas con condicionales.

**d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?**
Centraliza la decision en **un solo lugar**, el layout raiz. Con `<Redirect>` condicional hay que repetir la misma logica en cada pantalla, es facil olvidarse en alguna y terminar con rutas desprotegidas, y ademas el mismo codigo de navegacion queda duplicado. Con `Stack.Protected` React Navigation se encarga solo de quitar y agregar pantallas del navegador cuando cambia el estado de la sesion.

### F3. 404, anchor y rutas tipadas
**a) `+not-found.tsx`**
Se define en **`src/app/+not-found.tsx`**. Es la pantalla que se muestra cuando ninguna ruta del arbol coincide con la URL visitada. Si se coloca dentro de un subdirectorio, solo atiende las URLs no resueltas de ese subarbol. Tambien se puede marcar un archivo de ruta como 404 exportando `unstable_settings = { notFound: true }`.

**b) `export const unstable_settings = { anchor: "(tabs)" }`**
Se declara dentro de **`+not-found.tsx`** (o de un `_layout.tsx` del grupo). Sirve para indicar que pantalla debe quedar **debajo en la pila** cuando la app se abre en frio por un deep link. Por defecto, al abrir `/categorias/bebidas` desde un link externo la app muestra solo esa pantalla y el boton "atras" cierra la app. Con `anchor: '(tabs)'` se apila la pantalla de tabs debajo, de modo que "atras" devuelve al usuario a la app.

**c) `typedRoutes`**
Con `"experiments": { "typedRoutes": true }` en `app.json`, Expo Router genera los tipos de las rutas y TypeScript valida cada `href`.

- Si se escribe `<Link href="/prodcutos" />` (con doble "c"), el editor marca error de TypeScript en el momento, porque esa ruta no existe en el mapa de rutas generado.
- Los tipos se generan automaticamente en **`.expo/types/router.d.ts`**. Esa carpeta es generada y esta en el `.gitignore`, asi que no se sube al repositorio.

### F4. Deep links
Scheme de la app: `comedoripf`. Compu de desarrollo: `192.168.1.20`. Plato a abrir: `/menu/7`.

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/comedoripf://menu/7` |
| Web (`npx expo start --web`) | `http://192.168.1.20:8081/menu/7` |

**¿Qué significa la parte `/--/` en la URL de Expo Go?**
Es un separador especial. Expo Go necesita saber si lo que viene es una ruta del **servidor de desarrollo** o un **deep link de la app**. Todo lo que va despues de `/--/` se interpreta como el deep link real (`comedoripf://menu/7`) y se abre dentro de Expo Go; sin ese separador, Expo Go intentaria servirlo como una pagina del proyecto.

**¿Por qué el scheme propio no funciona dentro de Expo Go?**
Porque un solo scheme por aplicacion puede estar registrado en el sistema. Expo Go se registro como `exp`, y los deep links con `comedoripf://` solo funcionan si hay una app instalada en el dispositivo que declare ese scheme en su `app.json`. Como Expo Go no puede registrar `comedoripf`, hay que "envolver" el deep link con `exp://<ip>:<puerto>/--/` para que sea Expo Go quien lo traduzca.

### F5. Errores comunes
**a) `<Link href="/perfil" asChild>` con un `<Pressable style={[estilos.boton, activo && estilos.activo]}>` produce: "You are passing an array of styles to a child of <Slot>".**
- **Causa:** con `asChild`, el `Link` no renderiza su propio componente: usa `<Slot>` para inyectarle su hijo. `<Slot>` solo acepta un objeto de estilo plano y no sabe interpretar un **array** de estilos.
- **Solucion:** aplanar el array antes de pasarlo, con `StyleSheet.flatten([estilos.boton, activo && estilos.activo])`, y pasarle a `style` el objeto resultante.

**b) Un compañero creó `src/app/TarjetaProducto.tsx` para reutilizar un componente y ahora la app tiene una ruta nueva.**
- **Causa:** **todo** archivo dentro de `app/` es una ruta. `TarjetaProducto.tsx` se cargo como la pantalla `/TarjetaProducto`, aunque el archivo no tenga un `export default` de pantalla valido.
- **Solucion:** mover el componente fuera de `app/` (por ejemplo a `src/components/TarjetaProducto.tsx`) e importarlo desde las pantallas. La regla es: en `src/app` solo van rutas; los componentes van en `src/components`.

**c) Después de iniciar sesión se usa `router.push("/")` y, al tocar atrás, el usuario vuelve al login.**
- **Causa:** `push` apila la pantalla principal **encima** del login. El login queda en la pila y "atras" vuelve a mostrarlo.
- **Solucion:** usar **`router.replace('/')`**, que reemplaza el login por la pantalla principal y lo saca del historial. Si el login es un modal protegido con `Stack.Protected`, ademas desaparece solo al iniciar sesion.

**d) Expo Go dice que el proyecto es incompatible después de instalar un paquete con `npm install`.**
- **Causa:** `npm install` trae la ultima version publicada del paquete, que puede no ser la compatible con el SDK 57. Expo Go valida las versiones nativas del proyecto y rechaza abrirlo.
- **Solucion:** instalar siempre con **`npx expo install <paquete>`**, que elige la version compatible con el SDK. Para recuperar el proyecto: borrar `node_modules`, reinstalar y levantar la cache con `npx expo start --clear`; si el problema persiste, usar un development build en lugar de Expo Go.