// Paleta oficial del Comedor IPF.
export const colores = {
  tinta: '#2b2d42', // texto principal, cabeceras, barra de pestañas
  muted: '#8d99ae', // textos secundarios, bordes, pestañas inactivas
  fondo: '#edf2f4', // fondo de pantallas
  primario: '#ef233c', // acciones principales (agregar, confirmar, atender)
  primarioOscuro: '#d80032', // acciones destructivas o de atención (deshacer, cerrar sesión, errores)
  blanco: '#ffffff',
} as const;

// Estilo común de cabeceras de Stack, Tabs y Drawer.
export const estiloCabecera = {
  headerStyle: { backgroundColor: colores.tinta },
  headerTintColor: colores.fondo,
} as const;
