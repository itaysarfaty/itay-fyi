import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'

const fontSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Itay Sarfaty',
  description: "Itay Sarfaty's personal website",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen bg-background font-sans font-light antialiased @container ',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
