'use client'

import { Variants, motion } from 'motion/react'

const cursorVariants: Variants = {
    blinking: {
        opacity: [0, 0, 1, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1],
        },
    },
}

export default function CursorBlinker() {
    return (
        <motion.div
            variants={cursorVariants}
            animate="blinking"
            className="bg-foreground inline-block h-5 w-px translate-y-1"
        />
    )
}
