import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Comunicados: CollectionConfig = {
  slug: 'comunicados',
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
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
            const res = await fetch('https://onesignal.com/api/v1/notifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
              },
              body: JSON.stringify({
                app_id: process.env.ONESIGNAL_APP_ID,
                headings: { en: "Nuevo Comunicado Escolar", es: "Nuevo Comunicado Escolar" },
                contents: { en: doc.titulo, es: doc.titulo },
                url: `${serverUrl}/comunicados/${doc.id}`,
                included_segments: ['All'],
              }),
            })
            
            if (!res.ok) {
               console.error("OneSignal Server Error (Comunicados):", await res.text())
            }
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
