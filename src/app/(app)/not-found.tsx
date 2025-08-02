'use client'

import { ArrowLeft, ArrowRight, CompassIcon, HomeIcon } from 'lucide-react'
import { motion, useSpring } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Create spring-animated values for smoother movement
    const springX = useSpring(0, { stiffness: 50, damping: 10 })
    const springY = useSpring(0, { stiffness: 50, damping: 10 })
    const springRotate = useSpring(0, { stiffness: 50, damping: 10 })

    // Update position based on mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Get mouse position relative to the center of the screen
            const x = e.clientX - window.innerWidth / 2
            const y = e.clientY - window.innerHeight / 2

            // Update the raw mouse position
            setMousePosition({ x, y })

            // Update spring values - these will animate smoothly
            springX.set(x * 0.03)
            springY.set(y * 0.03)
            springRotate.set(x * 0.015) // Reduced rotation amount for subtlety
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [springX, springY, springRotate])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <div className="max-w-xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-12"
                >
                    <motion.div
                        style={{
                            x: springX,
                            y: springY,
                            rotate: springRotate,
                        }}
                        className="mb-4 text-8xl font-thin"
                    >
                        404
                    </motion.div>

                    <div className="text-bg mb-6 text-2xl font-normal">
                        Page not found
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{ display: 'inline-block' }}
                >
                    <Link
                        className="border-foreground/10 bg-foreground/4 text-foreground
                            dark:bg-foreground/[0.018] flex w-[140px] shrink-0 items-center justify-center
                            gap-1 rounded border p-3 px-3 py-2 font-sans text-sm font-medium
                            backdrop-blur-xs"
                        href="/"
                    >
                        <motion.div
                            key="idle"
                            transition={{ duration: 0.2 }}
                            className="flex w-full items-center justify-center gap-2"
                        >
                            <HomeIcon className="-ml-1 h-4 text-blue-500" />
                            Home
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
