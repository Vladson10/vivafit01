import './globals.css'

export const metadata = {
  title: 'VivaFit',
  description: 'VivaFit - Tu bienestar en el móvil'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
