import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ComunicadosPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const { docs: comunicados } = await payload.find({
    collection: 'comunicados',
    sort: '-fechaPublicacion',
    limit: 50,
  })

  return (
    <>
      <section className="mb-8">
        <h2 className="font-h1 text-[28px] text-primary mb-4">Comunicados</h2>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full pl-12 pr-4 py-3 bg-white border-2 border-outline-variant rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-body text-[15px]" placeholder="Buscar avisos o noticias..." type="text"/>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {comunicados.map((comunicado) => {
          const adjuntos = comunicado.adjuntos as any[] || []

          // Priorizar FechaPublicacion, si no existe o es invalida, fallback a createdAt
          const fechaPub = comunicado.fechaPublicacion ? new Date(comunicado.fechaPublicacion) : new Date(comunicado.createdAt)
          const dateStr = fechaPub.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric'})
          
          return (
            <Link href={`/comunicados/${comunicado.id}`} key={comunicado.id} className="bg-white border border-border rounded-[28px] p-6 shadow-sm hover:shadow-md transition-shadow block cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="font-label text-[11px] text-secondary uppercase mb-1">Institucional</span>
                  <h3 className="font-h2 text-[20px] text-primary leading-tight">{comunicado.titulo}</h3>
                </div>
                <div className="bg-primary-light h-10 w-10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 ml-2">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-4">
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span className="font-caption text-[12px]">{dateStr}</span>
                </div>
                <div className="flex items-center gap-3">
                  {adjuntos.length > 0 && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-surface-container-low rounded-full text-primary-dark">
                      <span className="material-symbols-outlined text-[16px]">attachment</span>
                      <span className="font-caption text-[12px]">{adjuntos.length} Archivos</span>
                    </div>
                  )}
                  <div className="material-symbols-outlined text-primary hover:bg-primary-light rounded-full p-1 transition-colors">arrow_forward</div>
                </div>
              </div>
            </Link>
          )
        })}
        {comunicados.length === 0 && (
          <p className="text-center font-body text-text-muted py-6">No hay comunicados recientes.</p>
        )}
      </div>
    </>
  )
}
