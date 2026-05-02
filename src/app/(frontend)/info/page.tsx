import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function InfoPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4 animate-in fade-in duration-300">
      <div className="bg-white border border-border p-10 rounded-[32px] shadow-sm w-full max-w-sm flex flex-col items-center gap-6">
        <h2 className="font-h1 text-[28px] text-primary">Información</h2>
        
        <div className="flex justify-center my-4">
          <a href="https://www.hikari-agencia.com/" target="_blank" rel="noreferrer" className="block hover:scale-105 transition-transform">
            <img 
              src="/Logo-para-fondo-claro.png" 
              alt="Hikari Agencia Logo" 
              className="w-48 object-contain"
            />
          </a>
        </div>
        
        <div className="space-y-2 mb-2">
          <p className="font-body text-[16px] text-on-surface font-semibold bg-surface-container-low py-1 px-4 rounded-full inline-block">SFA Padres v1.0</p>
          <p className="font-body text-[15px] text-text-muted mt-4">
            Diseño y Desarrollo por{' '}
            <a href="https://www.hikari-agencia.com/" target="_blank" rel="noreferrer" className="text-primary hover:text-emerald-700 font-bold underline decoration-primary/30 underline-offset-4">
              Hikari Agencia
            </a>
          </p>
          <p className="font-body text-[13px] text-text-muted uppercase tracking-widest pt-2">— Luis Vásquez —</p>
        </div>

        <Link href="/" className="mt-4 w-full bg-primary text-white py-4 rounded-full font-h2 text-[15px] font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-all cursor-pointer shadow-lg shadow-primary/20 hover:opacity-90">
          <span className="material-symbols-outlined">home</span>
          Volver al Inicio
        </Link>
      </div>
      
      <p className="mt-12 text-[11px] text-text-muted font-body text-center opacity-60">
        © {new Date().getFullYear()} Colegio SFA. Todos los derechos reservados.
      </p>
    </div>
  )
}
