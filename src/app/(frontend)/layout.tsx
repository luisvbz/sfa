import React from 'react'
import './styles.css'
import BottomNav from './components/BottomNav'
import Link from 'next/link'

export const metadata = {
  title: 'Colegio SFA - Actividades',
  description: 'Calendario de Eventos y Comunicados Escolares',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#244c00" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.tailwind = window.tailwind || {};
            window.tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "primary": "#244c00",
                    "primary-light": "#e8f0d9",
                    "primary-fixed": "#b7f484",
                    "primary-dark": "#254d00",
                    "secondary": "#7f5616",
                    "secondary-light": "#f5eadb",
                    "secondary-dark": "#7a5720",
                    "surface": "#f7f9f4",
                    "background": "#f8fbee",
                    "border": "rgba(51, 102, 0, 0.12)",
                    "text-main": "#1a1a1a",
                    "text-muted": "#6b6b6b",
                    "on-surface": "#191d15",
                    "on-surface-variant": "#42493a",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-high": "#e7e9dd",
                    "tertiary-fixed": "#ffd8ed",
                    "tertiary": "#751e5f",
                    "tertiary-container": "#923778",
                    "on-tertiary-fixed": "#3b002e",
                    "secondary-container": "#fcc57b",
                  },
                  fontFamily: {
                    "body": ["DM Sans"],
                    "h1": ["DM Serif Display"],
                    "h2": ["DM Sans"],
                    "h3": ["DM Sans"],
                    "label": ["DM Sans"],
                    "caption": ["DM Sans"],
                    "small": ["DM Sans"],
                  }
                }
              }
            }
          `
        }} />
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(function(OneSignal) {
              OneSignal.init({
                appId: "${process.env.ONESIGNAL_APP_ID || process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || ''}",
              });
            });
          `
        }} />
      </head>
      <body className="bg-background text-on-surface">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white dark:bg-stone-950 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <img alt="SFA Logo" className="h-10 w-10 rounded-full" src="/logo.png" />
            <h1 className="text-2xl font-h1 text-emerald-900 dark:text-emerald-500">Colegio SFA</h1>
          </div>
          <div className="flex items-center">
            <Link href="/info" className="p-2 rounded-full hover:bg-stone-50 transition-transform active:scale-95 cursor-pointer flex items-center justify-center" aria-label="Información de la App">
              <span className="material-symbols-outlined text-emerald-900 dark:text-emerald-500" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>info</span>
            </Link>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="pt-20 pb-32 px-6 max-w-2xl mx-auto">
          {children}
        </main>

        {/* BottomNavBar */}
        <BottomNav />
      </body>
    </html>
  )
}
