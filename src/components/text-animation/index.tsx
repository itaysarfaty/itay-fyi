'use client'

import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

import CursorBlinker from './cursor-blinker'

export default function TextAnim({ text }: { text: string }) {
    const prefersReducedMotion = useReducedMotion()
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest))
    const [animationComplete, setAnimationComplete] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (!prefersReducedMotion && isMounted) {
            const controls = animate(count, text.length, {
                type: 'tween',
                duration: 1.5,
                ease: 'easeInOut',
                onComplete: () => {
                    setTimeout(() => setAnimationComplete(true), 2300)
                },
            })
            return controls.stop
        }
    }, [
        text.length,
        setAnimationComplete,
        count,
        prefersReducedMotion,
        isMounted,
    ])

    // Ensures this runs only on the client after the first render
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return <h2>{' '}</h2>
    return (
        <h2 className="text-bg">
            {!prefersReducedMotion ? (
                <>
                    <motion.span>{displayText}</motion.span>
                    {!animationComplete && <CursorBlinker />}
                </>
            ) : (
                <span>{text}</span>
            )}
        </h2>
    )
}
