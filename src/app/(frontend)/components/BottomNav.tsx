'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  // Determinamos qué tab está activa
  // "/" y rutas que empiecen por "/evento" iluminan el Calendario
  const isEventosActive = pathname === '/' || pathname.startsWith('/evento/')
  
  // "/comunicados" iluminan Comunicados
  const isComunicadosActive = pathname.startsWith('/comunicados')

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white border-t border-stone-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-3xl">
      <Link href="/" className={`flex flex-col items-center justify-center transition-all cursor-pointer px-6 py-1.5 ${isEventosActive ? 'bg-emerald-50 text-emerald-900 rounded-2xl scale-97' : 'text-stone-400 hover:text-emerald-700'}`}>
        <span className="material-symbols-outlined mb-1" style={isEventosActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
          calendar_month
        </span>
        <span className={`font-label text-xs ${isEventosActive ? 'font-bold' : 'font-medium'}`}>Actividades</span>
      </Link>
      
      <Link href="/comunicados" className={`flex flex-col items-center justify-center transition-all cursor-pointer px-6 py-1.5 ${isComunicadosActive ? 'bg-emerald-50 text-emerald-900 rounded-2xl scale-97' : 'text-stone-400 hover:text-emerald-700'}`}>
        <span className="material-symbols-outlined mb-1" style={isComunicadosActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
          campaign
        </span>
        <span className={`font-label text-xs ${isComunicadosActive ? 'font-bold' : 'font-medium'}`}>Comunicados</span>
      </Link>
    </nav>
  )
}
