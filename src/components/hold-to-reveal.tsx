'use client'

import confetti from 'canvas-confetti'
import { MousePointerClickIcon } from 'lucide-react'
import { motion, useAnimation } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils'

interface HoldToRevealProps {
    onReveal: () => void
}

export function HoldToReveal({ onReveal }: HoldToRevealProps) {
    const { resolvedTheme } = useTheme()
    const timeoutRef = useRef<NodeJS.Timeout>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const controls = useAnimation()

    const handlePressStart = () => {
        controls.start({
            clipPath: 'inset(0 0% 0 0)',
            transition: { duration: 1.5, ease: 'easeInOut' },
        })

        timeoutRef.current = setTimeout(() => {
            triggerSuccess()
        }, 1500)
    }

    const handlePressEnd = () => {
        controls.start({
            clipPath: 'inset(0 100% 0 0)',
            transition: { duration: 0.3, ease: 'easeOut' },
        })

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    const triggerSuccess = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const originX = (rect.left + rect.width / 2) / window.innerWidth
            const originY = (rect.top + rect.height / 2) / window.innerHeight

            const colors =
                resolvedTheme === 'dark'
                    ? ['#c7c7c7', '#e0e0e0', '#b0b0b0', '#ffffff', '#909090']
                    : ['#1b1b1b', '#333333', '#000000', '#404040', '#252525']

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: originX, y: originY },
                colors,
            })
        }
        onReveal()
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <div className="w-full pb-20">
            <motion.button
                ref={buttonRef}
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    `border-foreground/20 bg-background/50 relative w-full
                    cursor-pointer touch-none overflow-hidden rounded-xl border
                    px-8 py-14 text-lg font-medium backdrop-blur-sm outline-none
                    select-none`
                )}
            >
                <span className="text-foreground relative">Hold to Reveal</span>

                <MousePointerClickIcon
                    className="text-foreground absolute right-6 bottom-4 size-6"
                />

                <motion.div
                    className="bg-foreground absolute inset-0 z-10 flex
                        items-center justify-center"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={controls}
                >
                    <span className="text-background text-lg font-medium">
                        Hold to Reveal
                    </span>
                </motion.div>
            </motion.button>
        </div>
    )
}
