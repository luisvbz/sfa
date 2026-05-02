'use client'

import React, { useEffect, useState } from 'react'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Escuchar el evento que indica que el navegador permite instalar la PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir el popup automático por defecto en Chrome
      e.preventDefault()
      // Guardar el evento para dispararlo cuando el usuario haga clic
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Comprobar si la app ya corre instalada en modo standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setIsInstallable(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Ocultar botón automáticamente si la aplicación se instaló
    const handleAppInstalled = () => {
      setIsInstallable(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Mostrar el cuadro de diálogo de instalación nativo
    deferredPrompt.prompt()
    
    // Esperar a que el usuario responda
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstallable(false)
    }
    
    // El prompt solo puede ser usado de forma segura una vez
    setDeferredPrompt(null)
  }

  // Si no se puede instalar (Safari viejo, ya instalada o no PWA detectada aún), no mostrar nada.
  if (!isInstallable) return null

  return (
    <button 
      onClick={handleInstallClick}
      className="mt-4 w-full bg-surface-container-low border border-primary/20 text-primary py-3 rounded-[16px] font-h3 text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-primary-light active:scale-[0.98] transition-all shadow-sm"
    >
      <span className="material-symbols-outlined">install_mobile</span>
      Añadir SFA al Inicio
    </button>
  )
}
