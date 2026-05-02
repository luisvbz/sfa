'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const MIN_MONTH = 2 // Marzo
const MAX_MONTH = 11 // Diciembre

export default function CalendarClient({
  initialMonth,
  initialYear
}: {
  initialMonth: number
  initialYear: number
}) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const [eventos, setEventos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar desde la colección de PayloadCMS (API REST estandar)
  useEffect(() => {
    const fetchEventos = async () => {
      setIsLoading(true)
      setSelectedDay(null)
      try {
        // Obtenemos los límites matemáticos del mes en Zona Horaria de Perú (GMT-5)
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate()
        const mesFormateado = String(currentMonth + 1).padStart(2, '0')
        const start = encodeURIComponent(`${currentYear}-${mesFormateado}-01T00:00:00.000-05:00`)
        const end = encodeURIComponent(`${currentYear}-${mesFormateado}-${String(lastDay).padStart(2, '0')}T23:59:59.999-05:00`)
        
        // Llamada nativa a la colección de PayloadCMS
        const url = `/api/eventos?limit=100&where[fecha][greater_than_equal]=${start}&where[fecha][less_than_equal]=${end}&sort=fecha`
        const res = await fetch(url)
        const data = await res.json()
        
        setEventos(data.docs || [])
      } catch (err) {
        console.error('Error fetching eventos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventos()
  }, [currentMonth, currentYear])

  const nextMonth = () => {
    if (currentMonth >= MAX_MONTH) return // Limitar hasta diciembre
    setCurrentMonth(currentMonth + 1)
  }

  const prevMonth = () => {
    if (currentMonth <= MIN_MONTH) return // Limitar atras hasta marzo
    setCurrentMonth(currentMonth - 1)
  }

  // Lógica para Swipe (Deslizar el dedo)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) nextMonth()
    if (isRightSwipe) prevMonth()
  }

  // Generar datos del calendario para el mes
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const startDayFallback = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Lunes = 0, Domingo = 6

  const emptyCells = Array.from({length: startDayFallback}).map((_, i) => <div key={`blank-${i}`} />)
  const daysList = Array.from({length: daysInMonth}).map((_, i) => i + 1)

  // Filtrado al hacer clic (forzando horario local para asegurar exactitud)
  let eventosMostrados = eventos
  if (selectedDay !== null) {
    eventosMostrados = eventos.filter((e: any) => {
      // Extraemos el día forzando el huso horario de Lima
      const matchDay = new Intl.DateTimeFormat('es-PE', { timeZone: 'America/Lima', day: 'numeric' }).format(new Date(e.fecha))
      return parseInt(matchDay, 10) === selectedDay
    })
  }

  const hoyReal = new Date()
  const esMesActualReal = hoyReal.getMonth() === currentMonth && hoyReal.getFullYear() === currentYear

  return (
    <>
      <section 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="bg-surface-container-lowest border border-border rounded-[28px] p-4 mb-12 shadow-sm touch-pan-y"
      >
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-h2 text-[20px] text-primary">{MESES[currentMonth]} {currentYear}</h3>
          <div className="flex gap-2">
            <button 
              onClick={prevMonth}
              disabled={currentMonth <= MIN_MONTH}
              className={`p-2 rounded-full transition-colors ${currentMonth <= MIN_MONTH ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-light text-primary hover:bg-primary-fixed'}`}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={nextMonth}
              disabled={currentMonth >= MAX_MONTH}
              className={`p-2 rounded-full transition-colors ${currentMonth >= MAX_MONTH ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-light text-primary hover:bg-primary-fixed'}`}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          <span className="font-label text-xs text-text-muted">L</span>
          <span className="font-label text-xs text-text-muted">M</span>
          <span className="font-label text-xs text-text-muted">M</span>
          <span className="font-label text-xs text-text-muted">J</span>
          <span className="font-label text-xs text-text-muted">V</span>
          <span className="font-label text-xs text-text-muted">S</span>
          <span className="font-label text-xs text-text-muted">D</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {emptyCells}
          {daysList.map((day) => {
             const isRealToday = esMesActualReal && day === hoyReal.getDate()
             const isSelected = selectedDay === day
             // Validamos para poner el punto indicador
             const hasEvent = eventos.some(e => {
               const evDay = parseInt(new Intl.DateTimeFormat('es-PE', { timeZone: 'America/Lima', day: 'numeric' }).format(new Date(e.fecha)), 10)
               return evDay === day
             })

             // Si estamos cargando mostramos el calendario atenuado o con skeleton
             if (isLoading) {
               return <div key={day} className="aspect-square rounded-xl bg-gray-100 animate-pulse m-1" />
             }

             return (
               <button 
                 key={day} 
                 onClick={() => setSelectedDay(isSelected ? null : day)} // toggle
                 className={`relative aspect-square flex items-center justify-center transition-all ${isSelected || isRealToday ? 'bg-primary text-white rounded-xl font-bold shadow-md transform scale-105' : 'text-on-surface hover:bg-surface-container-high rounded-xl'}`}>
                 
                 {day}

                 {/* Puntito indicador si hay evento en ese dia y no está seleccionado */}
                 {hasEvent && !isSelected && !isRealToday && (
                   <span className="absolute bottom-1 w-1 h-1 bg-secondary rounded-full"></span>
                 )}
               </button>
             )
          })}
        </div>
      </section>

      {/* Lista de Eventos */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-h3 text-[16px] text-primary">
            {selectedDay ? `Eventos del ${selectedDay} de ${MESES[currentMonth]}` : `Eventos de ${MESES[currentMonth]}`}
          </h3>
          {selectedDay && (
            <button onClick={() => setSelectedDay(null)} className="font-label text-xs text-secondary font-bold uppercase hover:underline">
              Ver todos ({eventos.length})
            </button>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // SKELETONS PARA CARGA
            Array.from({length: 3}).map((_, i) => (
              <div key={`skel-${i}`} className="bg-white border border-border rounded-[28px] p-4 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                <div className="flex-grow space-y-3 pt-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // RENDERIZAR REAL DATA
            <>
              {eventosMostrados.map((evento: any) => {
                const isGeneral = evento.curso === 'GENERAL'
                const icon = evento.categoria === 'Clase' ? 'school' : 
                             evento.categoria === 'Video' ? 'play_circle' : 
                             evento.categoria === 'Tarea' ? 'assignment' : 
                             'event'

                return (
                  <Link key={evento.id} href={`/evento/${evento.id}`} className="bg-white border border-border rounded-[28px] p-4 flex gap-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-h3 text-[16px] font-medium text-on-surface">{evento.titulo}</h4>
                        {evento.adjuntos && evento.adjuntos.length > 0 && (
                          <span className="material-symbols-outlined text-on-surface-variant text-[15px]">attach_file</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 text-text-muted">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span className="font-body text-[13px]">
                          {new Date(evento.fecha).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: 'numeric', month: 'long', year: 'numeric'})}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {evento.categoria && (
                          <span className="px-3 py-1 bg-[#fcc57b] text-[#775010] font-label text-[11px] rounded-full">
                            {evento.categoria}
                          </span>
                        )}
                        {evento.curso && (
                          <span className={`px-3 py-1 font-label text-[11px] rounded-full ${isGeneral ? 'bg-surface-container-high text-on-surface-variant' : 'bg-tertiary-fixed text-tertiary'}`}>
                            {evento.curso}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
              
              {eventosMostrados.length === 0 && (
                <div className="text-center py-6">
                   <p className="font-body text-text-muted">No hay actividades en este periodo.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
