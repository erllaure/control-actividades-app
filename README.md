# Control de actividades

Aplicacion web local basada en tu Excel de control horario.

## Que hace

- Carga una plantilla semanal inspirada en el archivo `cobntrolde dirarop.xlsx`.
- Permite editar hora de inicio, hora final y actividad por cada bloque.
- Permite marcar con check las actividades realizadas.
- Muestra cumplimiento diario y semanal.
- Guarda tus cambios en el navegador con `localStorage`.

## Como usarla

1. Abre `index.html` en tu navegador.
2. Elige una fecha.
3. Edita los bloques del dia si quieres ajustar horas o actividades.
4. Marca el check cuando una actividad se haya cumplido.
5. Revisa el resumen semanal en el panel izquierdo.

## Botones principales

- `Agregar bloque`: crea un nuevo espacio horario.
- `Recargar plantilla del dia`: vuelve a cargar la plantilla base del Excel para ese dia.
- `Quitar checks`: deja el dia sin marcas de cumplimiento.
