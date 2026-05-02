import type { CollectionConfig } from 'payload'

export const Eventos: CollectionConfig = {
  slug: 'eventos',
  admin: {
    useAsTitle: 'titulo',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            const res = await fetch('https://onesignal.com/api/v1/notifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
              },
              body: JSON.stringify({
                app_id: process.env.ONESIGNAL_APP_ID,
                headings: { en: "Nueva Actividad Escolar", es: "Nueva Actividad Escolar" },
                contents: { en: doc.titulo, es: doc.titulo },
                included_segments: ['Subscribed Users'],
              }),
            })
            
            if (!res.ok) {
               console.error("OneSignal Server Error (Eventos):", await res.text())
            }
          } catch (error) {
            console.error('Error enviando OneSignal en Eventos:', error)
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'fecha',
      type: 'date',
      label: 'Fecha',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
    },
    {
      name: 'curso',
      type: 'select',
      label: 'Curso',
      defaultValue: 'GENERAL',
      options: [
        { label: 'GENERAL', value: 'GENERAL' },
        { label: 'PERSONAL SOCIAL', value: 'PERSONAL SOCIAL' },
        { label: 'COMUNICACIÓN', value: 'COMUNICACIÓN' },
        { label: 'MATEMÁTICA', value: 'MATEMÁTICA' },
        { label: 'CIENCIA Y TECNOLOGÍA', value: 'CIENCIA Y TECNOLOGÍA' },
        { label: 'PSICOMOTRIZ', value: 'PSICOMOTRIZ' },
        { label: 'INGLÉS', value: 'INGLÉS' },
        { label: 'FRANCES -TALLER-', value: 'FRANCES -TALLER-' },
        { label: 'AJEDREZ -TALLER-', value: 'AJEDREZ -TALLER-' },
        { label: 'DANZA -TALLER-', value: 'DANZA -TALLER-' },
        { label: 'MÚSICA -TALLER-', value: 'MÚSICA -TALLER-' },
      ],
    },
    {
      name: 'categoria',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Actividad', value: 'Actividad' },
        { label: 'Anuncio', value: 'Anuncio' },
        { label: 'Clase', value: 'Clase' },
        { label: 'Enlace', value: 'Enlace' },
        { label: 'Tarea', value: 'Tarea' },
        { label: 'Recordatorio', value: 'Recordatorio' },
        { label: 'Video', value: 'Video' },
      ],
    },
    {
      name: 'adjuntos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Archivos Adjuntos',
    },
  ],
}
