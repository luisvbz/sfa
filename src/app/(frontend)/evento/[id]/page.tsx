import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DetalleEvento({ params }: { params: Promise<{ id: string }> }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { id } = await params
  
  let evento;
  try {
    evento = await payload.findByID({
      collection: 'eventos',
      id: id,
    })
  } catch (error) {
    return notFound()
  }

  if (!evento) return notFound()

  // Preparar metadatos visuales
  const fechaObj = new Date(evento.fecha)
  const diaTexto = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' })
  const diaNum = fechaObj.getDate()
  const mesTexto = fechaObj.toLocaleDateString('es-ES', { month: 'long' })
  const fechaFinal = `${diaTexto}, ${diaNum} ${mesTexto}`.replace(/^\w/, (c) => c.toUpperCase())
  
  const hourText = fechaObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  
  const isGeneral = evento.curso === 'GENERAL'
  const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBoNDSXqIrw9Hpbb7Gw-zB2F4-QgtLP5Dz9k0Q1oXgvQEdP_2ho0a2Qgk8InCP2DAKY5gBkSzMszxmo2yyYuIpDA9Xgl6HuwbG7aMwY1waqmLU2D0WQmipcQWqNKvVSLrcqRi1SQtOEEfsW6WbD6CSL564L7zOuo1YUz8LDYp9pjFp2pnsRvWX7hssFZfH6Tgw5WJalwZsZYy-4t9418tNFNZ5ywknQTPSIxzc05iOWvBh2nV6HyHx0TfxbrTmYLuUp3OutY34xWPM"
  const adjuntos = evento.adjuntos as any[] || []

  // Link para Google Calendar (supone 1 hora de duración base por defecto)
  const endDateObj = new Date(fechaObj.getTime() + 60 * 60 * 1000)
  const fechainicio = fechaObj.toISOString().replace(/-|:|\.\d\d\d/g, "")
  const fechafin = endDateObj.toISOString().replace(/-|:|\.\d\d\d/g, "")
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evento.titulo)}&dates=${fechainicio}/${fechafin}&details=${encodeURIComponent(evento.descripcion || "")}`

  return (
    <>
      <section className="space-y-6">
        <header>
          {evento.curso && (
            <div className="flex items-center gap-2 text-secondary mb-1">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span className="font-label text-[12px] uppercase tracking-widest">{evento.curso}</span>
              <span className="bg-primary px-4 py-1 rounded-full text-white font-label text-[12px] uppercase">{evento.categoria}</span>
            </div>
          )}
          <h2 className="font-h1 text-[36px] text-primary leading-tight">{evento.titulo}</h2>
        </header>

        <div className="flex items-center gap-2 pb-6 border-b border-border">
          <span className="material-symbols-outlined text-primary">calendar_today</span>
          <span className="font-h3 text-[16px] text-on-surface font-medium">{fechaFinal}</span>
        </div>

        {(evento.descripcion || evento.url) && (
          <div className="space-y-2">
            <h3 className="font-h2 text-[20px] font-medium text-primary">Sobre la actividad</h3>
            <div className="bg-white p-6 rounded-[28px] border border-border">
              {evento.descripcion && (
                <p className="font-body text-[15px] text-on-surface-variant whitespace-pre-wrap">
                  {evento.descripcion}
                </p>
              )}
              {evento.url && (
                <a href={evento.url} target="_blank" rel="noreferrer" className="block mt-4 font-body font-medium text-primary underline">
                  Enlace externo del evento &rarr;
                </a>
              )}
            </div>
          </div>
        )}

        {adjuntos.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-h2 text-[20px] font-medium text-primary">Archivos Adjuntos</h3>
            <div className="space-y-2">
              {adjuntos.map((file) => {
                const isPdf = file.mimeType === 'application/pdf'
                const fileIcon = isPdf ? 'picture_as_pdf' : 'description'
                
                return (
                  <a key={file.id} href={file.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-surface-container-low border border-border rounded-xl group hover:bg-primary-light transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">{fileIcon}</span>
                      </div>
                      <div>
                        <p className="font-h3 text-[16px] font-medium text-on-surface">{file.filename || file.alt || 'Documento adjunto'}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary">download</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-3 pb-8">
          <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="w-full bg-primary text-on-primary py-4 rounded-full font-h2 text-[16px] font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-lg shadow-primary/20 text-white cursor-pointer hover:opacity-90">
            <span className="material-symbols-outlined">event</span>
            Agregar a mi calendario
          </a>
          
          <Link href="/" className="w-full bg-transparent text-primary border border-border py-4 rounded-full font-h2 text-[16px] font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
            Regresar
          </Link>
        </div>
      </section>
    </>
  )
}
