import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Comunicados: CollectionConfig = {
  slug: 'comunicados',
  admin: {
    useAsTitle: 'titulo',
  },
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
                headings: { es: "Nuevo Comunicado Escolar" },
                contents: { es: doc.titulo },
                included_segments: ['Subscribed Users'],
              }),
            })
          } catch (error) {
            console.error('Error enviando OneSignal en Comunicados:', error)
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
      name: 'contenido',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Contenido',
    },
    {
      name: 'fechaPublicacion',
      type: 'date',
      label: 'Fecha de Publicación',
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
