import React from 'react'
import CalendarClient from './CalendarClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const hoy = new Date()
  let initialMonth = hoy.getMonth() // 0 = Enero, 11 = Diciembre
  let initialYear = hoy.getFullYear()

  // Forzar que el calendario siempre abra entre Marzo (2) y Diciembre (11)
  if (initialMonth < 2) initialMonth = 2
  
  return (
    <>
      <div className="mb-8">
        <h2 className="font-h1 text-[28px] text-primary mb-1">Calendario de Actividades</h2>
        <p className="font-body text-[15px] text-on-surface-variant">Mantente al día con los eventos escolares y tareas.</p>
      </div>

      <CalendarClient initialMonth={initialMonth} initialYear={initialYear} />
    </>
  )
}
