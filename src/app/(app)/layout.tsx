import { MotionConfig } from 'framer-motion'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter, Josefin_Slab } from 'next/font/google'

import { cn } from '@/utils'

import { Footer } from '@/components/footer'
import { SettingsMenu } from '@/components/settings'

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
            <head>
                {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        src="https://cloud.umami.is/script.js"
                        data-website-id="7a43974c-bf93-4f2e-8418-86ed2431cc4b"
                    />
                )}
            </head>
            <body
                className={cn(
                    `flex min-h-[100svh] w-full bg-background font-serif font-normal text-foreground
                    antialiased`,
                    fontSerif.variable,
                    fontSans.variable
                )}
            >
                <MotionConfig reducedMotion="user">
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
                </MotionConfig>
            </body>
        </html>
    )
}
