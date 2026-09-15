# Backlog Convention

Documenta cómo estructuramos los backlogs de producto en este proyecto y en proyectos futuros.
Define el vocabulario, la granularidad y las reglas para que el backlog sea legible por humanos e IAs.

## Estructura

```
BACKLOG.md

Ronda <N> — <Nombre Corto>
  Objetivo: <frase corta>
    Criterios de Aceptación
    Tareas

  Objetivo: ...
    ...
```

### Ronda

Equivale a una **épica** en Scrum: un conjunto de trabajo que produce un incremento significativo
y jugable del producto. Cada ronda se implementa como **un change de OpenSpec** (ciclo
explore → propose → apply → archive).

- Una ronda puede tener uno o varios objetivos.
- Una ronda debe poder entregarse y validarse de forma independiente.
- No se mezclan rondas: se termina una antes de empezar la siguiente.

### Objetivo

Equivale a una **historia de usuario** en Scrum: un incremento usable desde la perspectiva
del usuario. Responde a _"qué puede hacer el usuario que antes no podía"_.

Formato recomendado:
```
**Como** <rol>, **quiero** <acción> **para** <beneficio>.
```

Cada objetivo tiene **Criterios de Aceptación** que definen cuándo está "hecho".
Sin criterios de aceptación, un objetivo no está completo.

### Criterios de Aceptación

Lista de condiciones verificables (sí/no) que debe cumplir el objetivo.
Pueden ser funcionales, visuales, de rendimiento o de comportamiento.

- Deben ser **independientes de la implementación**.
- No dicen _cómo_ se hace, dicen _qué_ debe pasar.
- Se redactan como `[ ]` checkbox para facilitar el seguimiento.

### Tarea

Unidad técnica de trabajo dentro de un objetivo. Una tarea:

- Corresponde a un **módulo, clase, componente o comportamiento** concreto.
- No llega al nivel de _"crear la función `validarMovimiento()` en el archivo X"_.
- Al completar una tarea, **algo es visible o testeable** (no necesariamente para el usuario final,
  pero sí para el desarrollador).
- Una tarea debería poder completarse en una sesión de trabajo.

### Reglas

1. **El backlog no prescribe la implementación.** Los detalles técnicos y las decisiones
   de diseño se toman en el ciclo OpenSpec de cada ronda (explore → propose → apply).
   El backlog define el _qué_, no el _cómo_.
2. **El backlog es vivo.** Se puede reordenar, dividir objetivos entre rondas cuando el entendimiento del producto cambia.
3. **No existe "Sprint".** El ciclo de entrega es el change de OpenSpec. No hay duración fija.
4. **Una ronda puede tener dependencias explícitas** de rondas anteriores. Se documentan
   al inicio de la ronda como "Requiere: Ronda N".
5. **Los objetivos pueden dividirse** si al empezar una ronda se descubre que son demasiado grandes.
   La división se documenta en el mismo backlog como una actualización.