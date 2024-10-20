'use client'

import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

import { useGlobalConfig } from '@/providers/global-config-provider'

// Initial background from https://ibelick.com/

export const Background = () => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const prefersReducedMotion = useReducedMotion()
    const { animateBg: bgAnimation } = useGlobalConfig()
    const disableAnimation = prefersReducedMotion || !bgAnimation

    useEffect(() => {
        if (disableAnimation) {
            mouseX.set(window.innerWidth / 2)
            mouseY.set(window.innerHeight / 2)
            return
        }
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX)
            mouseY.set(event.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY, disableAnimation])

    const springX = useSpring(mouseX, { stiffness: 150, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 150, damping: 30 })

    // on mobile max size is 150
    const circleSize = disableAnimation ? 200 : 150

    const mask = useTransform(
        [springX, springY],
        ([x, y]) =>
            `radial-gradient(circle at ${x}px ${y}px, hsl(var(--foreground)) 40px, transparent ${circleSize}px)`
    )
    return (
        <div className="fixed inset-0 -z-10 bg-background">
            {/* Dots */}
            <div
                className="bg-red absolute inset-0
                    bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)]
                    [background-size:16px_16px]"
            />
            <motion.div
                // @ts-expect-error
                className="absolute inset-0
                    bg-[radial-gradient(hsl(var(--foreground)/0.3)_1px,transparent_1px)]
                    [background-size:16px_16px]
                    dark:bg-[radial-gradient(hsl(var(--foreground)/0.2)_1px,transparent_1px)]"
                style={{
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 bg-background
                    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    md:[mask-image:radial-gradient(ellipse_40%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]"
            />
        </div>
    )
}
