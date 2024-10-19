import { MotionConfig } from 'framer-motion'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import { Inter, Lexend_Deca } from 'next/font/google'

import { cn } from '@/utils'

import { Divider } from '@/components/dividers'
import { Background } from '@/components/dot-background'
import { Footer } from '@/components/footer'
import { GlobalConfigProvider } from '@/providers/global-config-provider'

import './globals.css'

const fontSans = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
})

const fontSerif = Lexend_Deca({
    subsets: ['latin'],
    variable: '--font-serif',
})

const metaDescription =
    "I'm Itay (EE-tie), a software engineer based in New York. I work at CargoMatrix, a company that's been innovating the logistics industry for over 20 years."

export const metadata: Metadata = {
    title: 'Itay',
    description: metaDescription,
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ViewTransitions>
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
                        `flex min-h-[100vh] w-full bg-background font-serif font-extralight
                        text-foreground antialiased`,
                        fontSerif.variable,
                        fontSans.variable
                    )}
                >
                    <GlobalConfigProvider>
                        <Background />
                        <MotionConfig reducedMotion="user">
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <div className="w-full @container">
                                    <div className="container">
                                        <div className="mx-auto grid h-full max-w-[90%] gap-3 overflow-visible">
                                            {children}
                                            <div>
                                                <Divider className="mb-[1.5rem]" />
                                                <Footer />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ThemeProvider>
                        </MotionConfig>
                    </GlobalConfigProvider>
                </body>
            </html>
        </ViewTransitions>
    )
}
