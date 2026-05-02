import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

export default async function DetalleComunicado({ params }: { params: Promise<{ id: string }> }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { id } = await params
  
  let comunicado;
  try {
    comunicado = await payload.findByID({
      collection: 'comunicados',
      id: id,
    })
  } catch (error) {
    return notFound()
  }

  if (!comunicado) return notFound()

  // Format Date
  const fechaPub = comunicado.fechaPublicacion ? new Date(comunicado.fechaPublicacion) : new Date(comunicado.createdAt)
  const dateStr = fechaPub.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric'})

  const adjuntos = comunicado.adjuntos as any[] || []

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .rich-text-content p { margin-bottom: 1.5rem; }
          .rich-text-content h4 { font-family: 'DM Sans'; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--color-primary, #244c00); }
        `
      }} />

      <article className="space-y-6 mt-4">
        <header className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="material-symbols-outlined text-[20px]">event</span>
            <span className="font-body text-[13px]">Publicado el {dateStr}</span>
          </div>
          <h2 className="font-h1 text-[36px] text-primary leading-tight">{comunicado.titulo}</h2>
        </header>

        {/* Payload Lexical Content */}
        <div className="rich-text-content text-on-surface-variant leading-relaxed bg-white border border-border p-6 rounded-[28px] overflow-hidden">
          {comunicado.contenido ? (
             <RichText data={comunicado.contenido} />
          ) : (
             <p className="text-text-muted italic">Sin contenido registrado.</p>
          )}
        </div>

        {/* Attachments */}
        {adjuntos.length > 0 && (
          <section className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">attach_file</span>
              <h3 className="font-h2 text-[20px] text-primary font-medium">Archivos Adjuntos</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adjuntos.map((file) => {
                const isPdf = file.mimeType === 'application/pdf'
                const fileIcon = isPdf ? 'picture_as_pdf' : (file.mimeType.includes('image') ? 'image' : 'calendar_today')
                
                return (
                  <a key={file.id} href={file.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-surface-container-low rounded-[28px] border border-border group hover:bg-white transition-colors cursor-pointer shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{fileIcon}</span>
                      </div>
                      <div>
                        <p className="font-body font-bold text-primary leading-none mb-1 text-[15px]">{file.filename}</p>
                        <p className="text-[12px] text-text-muted uppercase">{file.filename.split('.').pop()} • {file.filesize ? (file.filesize / 1024 / 1024).toFixed(2) : 0} MB</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary border border-border group-hover:bg-primary-container group-hover:text-white transition-all">
                      <span className="material-symbols-outlined">download</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}
        
        <div className="mt-8 pb-8">
           <Link href="/comunicados" className="w-full bg-transparent text-primary border border-border py-4 rounded-full font-h2 text-[16px] font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-all hover:bg-surface-container-low">
             <span className="material-symbols-outlined">arrow_back</span>
             Regresar a Comunicados
           </Link>
        </div>
      </article>
    </>
  )
}
