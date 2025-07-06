import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Art Forgery Detector',
  description: 'AI-powered art authentication service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}