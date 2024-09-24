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
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest))
    const prefersReducedMotion = useReducedMotion()
    const [animationComplete, setAnimationComplete] = useState(false)

    useEffect(() => {
        if (prefersReducedMotion) return
        const controls = animate(count, text.length, {
            type: 'tween',
            duration: 1.5,
            ease: 'easeInOut',
            onComplete: () => {
                setTimeout(() => setAnimationComplete(true), 2300)
            },
        })
        return controls.stop
    }, [])

    if (prefersReducedMotion) return <h2 className="text-2xl">{text}</h2>
    return (
        <h2 className="text-2xl">
            <motion.span>{displayText}</motion.span>
            {!animationComplete && <CursorBlinker />}
        </h2>
    )
}
