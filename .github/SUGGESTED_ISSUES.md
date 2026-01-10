# Issues Sugeridos para FocusFlow

Estos son los issues iniciales sugeridos para el desarrollo de FocusFlow.
Puedes crearlos desde GitHub: https://github.com/solecitofo/FocusFlow/issues/new/choose

---

## 1. Implementar persistencia de datos

**Titulo:** `[Feature]: Implementar persistencia de datos con almacenamiento local`

**Labels:** `enhancement`, `priority: high`, `tdah: organizacion`

**Descripcion:**

### Problema o necesidad
Actualmente FocusFlow solo usa localStorage para algunas funciones (rutinas activas). Los datos de ideas, eventos y configuracion no persisten entre sesiones de forma confiable.

### Solucion propuesta
1. **Electron Store** o **SQLite** para almacenamiento local
2. Guardar automaticamente al hacer cambios
3. Cargar datos al iniciar la aplicacion
4. Opcion de backup/export de datos

### Beneficio para TDAH
- Reduce la ansiedad de perder informacion
- Permite continuar donde se dejo la ultima vez
- Reduce la carga cognitiva de tener que re-crear tareas

---

## 2. Completar modulo de Rutinas

**Titulo:** `[Feature]: Completar modulo de Rutinas`

**Labels:** `enhancement`, `priority: high`, `area: rutinas`, `tdah: organizacion`

**Descripcion:**

### Problema o necesidad
El modulo de Rutinas tiene la UI parcialmente implementada pero la funcionalidad no esta completa.

### Solucion propuesta
1. Completar el RutinaWizard para crear rutinas
2. Implementar activacion/desactivacion de rutinas
3. Sistema de recordatorios para pasos de rutina
4. Vista de progreso de rutina activa
5. Estadisticas de cumplimiento

### Tareas especificas
- [ ] Conectar RutinaWizard con AppContext
- [ ] Implementar ADD_RUTINA, UPDATE_RUTINA en reducer
- [ ] Crear vista de rutina activa con pasos
- [ ] Agregar notificaciones/recordatorios
- [ ] Persistir rutinas creadas

### Beneficio para TDAH
- Reduce la carga de decidir que hacer
- Automatiza secuencias de tareas
- Ayuda a construir habitos

---

## 3. Sistema de notificaciones

**Titulo:** `[Feature]: Sistema de notificaciones y recordatorios`

**Labels:** `enhancement`, `priority: high`, `tdah: memoria`

**Descripcion:**

### Problema o necesidad
FocusFlow tiene la estructura para recordatorios definida pero no hay implementacion real de notificaciones.

### Solucion propuesta
1. Notificaciones nativas de escritorio (Electron Notification API)
2. Sonidos personalizables (opcionales)
3. Recordatorios para:
   - Eventos de agenda
   - Tareas programadas para hoy
   - Pasos de rutinas activas
4. Configuracion de frecuencia y estilo

### Beneficio para TDAH
- Combate el olvido (memoria de trabajo limitada)
- Ayuda a mantenerse en track
- Reduce ansiedad por olvidar cosas importantes

---

## 4. Sincronizacion en la nube (futuro)

**Titulo:** `[Feature]: Sincronizacion opcional en la nube`

**Labels:** `enhancement`, `priority: low`

**Descripcion:**

### Problema o necesidad
Poder acceder a las tareas desde diferentes dispositivos.

### Solucion propuesta
- Integracion opcional con servicios como Firebase o Supabase
- Login opcional
- Sincronizacion automatica

---

## 5. Estadisticas y metricas

**Titulo:** `[Feature]: Dashboard de estadisticas y progreso`

**Labels:** `enhancement`, `priority: medium`, `tdah: enfoque`

**Descripcion:**

### Solucion propuesta
- Tareas completadas por dia/semana
- Tendencias de energia
- Rutinas cumplidas
- Visualizacion de progreso

### Beneficio para TDAH
- Motivacion visual del progreso
- Identificar patrones de productividad
