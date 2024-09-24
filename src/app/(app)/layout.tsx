import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter, Josefin_Slab } from 'next/font/google'

import { Footer } from '@/components/footer'
import { SettingsMenu } from '@/components/settings'
import { cn } from '@/lib/utils'

import './globals.css'

const fontSans = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
})

const fontSerif = Josefin_Slab({
    subsets: ['latin'],
    variable: '--font-serif',
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
                    `flex min-h-[100svh] w-full bg-background font-serif font-light text-foreground
                    antialiased`,
                    fontSerif.variable,
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="container px-2">
                        <div className="x-dash mx-auto grid h-full max-w-[90%] gap-3 overflow-visible">
                            {children}
                            <Footer />
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
