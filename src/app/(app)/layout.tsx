import type { Metadata } from 'next'
import { Josefin_Slab } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import { NavBar } from '@/components/nav-bar'

const fontSans = Josefin_Slab({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Itay',
  description: 'My corner of the internet.',
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
          'flex min-h-[100svh] bg-background font-sans font-light antialiased w-full text-foreground',
          fontSans.variable,
        )}
      >
        <div className="container px-2">
          <div className="max-w-[90%] h-full mx-auto overflow-visible x-dash grid gap-3">
            {children}
            <NavBar />
          </div>
        </div>
      </body>
    </html>
  )
}
