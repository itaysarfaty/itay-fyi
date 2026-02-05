'use client'

import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'

import { useGlobalConfig } from '@/providers/global-config-provider'

// Initial background from https://ibelick.com/

const GRID_SPACING = 20
const DOT_RADIUS = 1
const WARP_RADIUS = 160
const MAX_SHRINK = 0.75
const MAX_PULL = 4

export const Background = () => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const circleSize = disableAnimation ? 250 : 200
    const halfGrid = GRID_SPACING / 2

    // Canvas animation for warped dots
    useEffect(() => {
        if (disableAnimation) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let fg = ''
        let baseAlpha = 0.3

        const updateColors = () => {
            fg = getComputedStyle(document.documentElement)
                .getPropertyValue('--foreground')
                .trim()
            baseAlpha = document.documentElement.classList.contains('dark')
                ? 0.35
                : 0.45
        }
        updateColors()

        const observer = new MutationObserver(updateColors)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        let w = 0
        let h = 0
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener('resize', resize)

        let animId: number
        const animate = () => {
            ctx.clearRect(0, 0, w, h)

            const mx = springX.get()
            const my = springY.get()

            const margin = circleSize + 10
            const startCol = Math.max(
                0,
                Math.floor((mx - margin - halfGrid) / GRID_SPACING)
            )
            const endCol = Math.min(
                Math.ceil(w / GRID_SPACING),
                Math.ceil((mx + margin - halfGrid) / GRID_SPACING)
            )
            const startRow = Math.max(
                0,
                Math.floor((my - margin - halfGrid) / GRID_SPACING)
            )
            const endRow = Math.min(
                Math.ceil(h / GRID_SPACING),
                Math.ceil((my + margin - halfGrid) / GRID_SPACING)
            )

            for (let row = startRow; row <= endRow; row++) {
                for (let col = startCol; col <= endCol; col++) {
                    const baseX = col * GRID_SPACING + halfGrid
                    const baseY = row * GRID_SPACING + halfGrid

                    const dx = baseX - mx
                    const dy = baseY - my
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist > circleSize) continue

                    // Flashlight alpha falloff
                    let alpha = baseAlpha
                    if (dist > 40) {
                        alpha *= 1 - (dist - 40) / (circleSize - 40)
                    }

                    let drawX = baseX
                    let drawY = baseY
                    let radius = DOT_RADIUS

                    // Warp: shrink + pull toward mouse (latex press)
                    if (dist < WARP_RADIUS) {
                        const t = dist / WARP_RADIUS
                        // Smooth cubic falloff for gentle transition at edges
                        const smooth = 1 - t * t * (3 - 2 * t)

                        // Dots near center get smaller
                        radius *= 1 - MAX_SHRINK * smooth

                        // Dots pull toward mouse with smooth bell curve
                        if (dist > 0.5) {
                            const pullT =
                                t * (1 - t * t * (3 - 2 * t)) * 2.5
                            const pullAmount = MAX_PULL * pullT
                            const angle = Math.atan2(dy, dx)
                            drawX -= Math.cos(angle) * pullAmount
                            drawY -= Math.sin(angle) * pullAmount
                        }
                    }

                    ctx.beginPath()
                    ctx.arc(
                        drawX,
                        drawY,
                        Math.max(0.1, radius),
                        0,
                        Math.PI * 2
                    )
                    ctx.fillStyle = `hsl(${fg} / ${alpha})`
                    ctx.fill()
                }
            }

            animId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            observer.disconnect()
        }
    }, [springX, springY, circleSize, disableAnimation, halfGrid])

    // CSS mask fallback for disabled animation
    const mask = useTransform(
        [springX, springY],
        ([x, y]) =>
            `radial-gradient(circle at ${x}px ${y}px, hsl(var(--foreground)) 40px, transparent ${circleSize}px)`
    )

    return (
        <div className="fixed inset-0 -z-10 bg-background">
            {/* Base dots */}
            <div
                className="bg-red absolute inset-0
                    bg-[radial-gradient(hsl(var(--foreground)/0.15)_1px,transparent_1px)]
                    bg-size-[20px_20px]"
            />
            {/* Animated dots with warp (canvas) */}
            {!disableAnimation && (
                <canvas
                    ref={canvasRef}
                    className="pointer-events-none absolute inset-0"
                />
            )}
            {/* Fallback CSS dots for disabled animation */}
            {disableAnimation && (
                <motion.div
                    className="absolute inset-0
                        bg-[radial-gradient(hsl(var(--foreground)/0.45)_1px,transparent_1px)]
                        bg-size-[20px_20px]
                        dark:bg-[radial-gradient(hsl(var(--foreground)/0.35)_1px,transparent_1px)]"
                    style={{
                        WebkitMaskImage: mask,
                        maskImage: mask,
                    }}
                />
            )}
            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0 bg-background
                    mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    sm:mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]
                    md:mask-[radial-gradient(ellipse_40%_50%_at_50%_50%,transparent_50%,hsl(var(--background))_100%)]"
            />
        </div>
    )
}
