# Integración de Notificaciones Push (OneSignal) con PayloadCMS

Esta guía te ayudará a configurar Payload para que envíe una notificación push automáticamente a los teléfonos de los padres cada vez que crees un **Evento** o un **Comunicado** nuevo desde el panel de administración.

Esto se logra utilizando un "Hook" interno de Payload (`afterChange`), el cual ejecuta código justo después de que la base de datos haya guardado el registro exitosamente.

---

## 1. Configurar tus Variables de Entorno (Requisito Previo)
Para usar OneSignal, necesitas autorización. Ingresa a tu panel interactivo de OneSignal -> Ir a tu App -> *Settings* -> **Keys & IDs**. Localiza el **App ID** y tu **REST API KEY**.

Luego, abre tu archivo `.env` localmente (y colócalas en *Environment Variables* si vas a Vercel) y añade estas dos líneas:

```env
ONESIGNAL_APP_ID=tu-app-id-aqui
ONESIGNAL_API_KEY=tu-api-key-aqui
```

---

## 2. Modificar la colección "Eventos"
Abre `src/collections/Eventos.ts`. Añade la propiedad `hooks` en el nivel superior de tu colección, por ejemplo justo encima de la parte que dice `fields: [...]`. 

Puedes copiar y pegar este bloque directamente:

```typescript
export const Eventos: CollectionConfig = {
  slug: 'eventos',
  admin: {
    useAsTitle: 'titulo',
  },
  
  // -- AÑADIR ESTE CÓDIGO DE HOOKS A CONTINUACIÓN --
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Ejecutamos esto SOLO si es la creación inicial (no cuando estamos editando uno antiguo)
        if (operation === 'create') {
          try {
            await fetch('https://onesignal.com/api/v1/notifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
              },
              body: JSON.stringify({
                app_id: process.env.ONESIGNAL_APP_ID,
                headings: { es: "Nuevo Evento Escolar" },
                contents: { es: doc.titulo }, // Manda el título exacto del evento recién creado
                included_segments: ['Subscribed Users'], // A quién enviarlo (por defecto a todos)
              }),
            })
          } catch (error) {
            console.error('Error reportado enviando OneSignal en Eventos:', error)
          }
        }
        return doc // Retornar siempre el 'doc' es obligatorio
      },
    ],
  },
  // -- FIN DEL CÓDIGO DE HOOKS --

  fields: [
    // Tus campos siguen estando aquí normalmente...
  ],
}
```

---

## 3. Modificar la colección "Comunicados"
El proceso es exactamente idéntico. Abre `src/collections/Comunicados.ts` y coloca el mismo código. La única recomendación es que le cambies el título fijo en la propiedad `headings` (ejemplo, en vez de "Nuevo Evento Escolar", cámbialo a "Nuevo Comunicado Importante") para que los padres sepan la diferencia de un vistazo apenas llegue la notificación.

```typescript
export const Comunicados: CollectionConfig = {
  slug: 'comunicados',
  admin: {
    useAsTitle: 'titulo',
  },
  
  // -- AÑADIR ESTE CÓDIGO DE HOOKS A CONTINUACIÓN --
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            await fetch('https://onesignal.com/api/v1/notifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
              },
              body: JSON.stringify({
                app_id: process.env.ONESIGNAL_APP_ID,
                headings: { es: "Nuevo Comunicado Institucional" }, // El título cambia sutilmente
                contents: { es: doc.titulo },
                included_segments: ['Subscribed Users'],
              }),
            })
          } catch (error) {
            console.error('Error reportado enviando OneSignal en Comunicados:', error)
          }
        }
        return doc
      },
    ],
  },
  // -- FIN DEL CÓDIGO DE HOOKS --

  fields: [
    // Tus campos siguen estando aquí normalmente...
  ],
}
```

## Resumen
Con este código, tu proyecto hará el puente por detrás. Tan pronto como tu bases de datos guarde el campo en Payload, este disparará el mensaje HTTP hacia la API de OneSignal. El panel de OneSignal se encargará instantáneamente del resto y enviará tu notificación PUSH a los dispositivos sin ninguna pantalla o interacción adicional.
