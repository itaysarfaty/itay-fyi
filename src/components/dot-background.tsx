'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// Initial background from https://ibelick.com/

export const DotBackground = () => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX)
            mouseY.set(event.clientY)
            console.log('mouseY', mouseY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const springX = useSpring(mouseX, { stiffness: 150, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 150, damping: 30 })

    const mask = useTransform(
        [springX, springY],
        ([x, y]) =>
            `radial-gradient(circle at ${x}px ${y}px, hsl(var(--foreground)) 50px, transparent 150px)`
    )
    return (
        <div className="fixed inset-0 -z-10 bg-background">
            {/* Dots */}
            <div
                className="absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)]
                    [background-size:16px_16px]"
            />
            <motion.div
                // @ts-ignore
                className="absolute inset-0
                    bg-[radial-gradient(hsl(var(--foreground)/0.7)_1px,transparent_1px)]
                    [background-size:16px_16px]
                    dark:bg-[radial-gradient(hsl(var(--foreground)/0.4)_1px,transparent_1px)]"
                style={{
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
            />
            <div
                className="absolute inset-0 bg-background
                    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    md:[mask-image:radial-gradient(ellipse_40%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]"
            />
        </div>
    )
}
