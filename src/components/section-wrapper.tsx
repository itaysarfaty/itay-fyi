'use client'

import { Variant, Variants, motion } from 'motion/react'
import { ReactNode } from 'react'

interface SectionWrapperProps {
    children: ReactNode
    delay?: number
}

const sectionVariant: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

export function SectionWrapper({ children, delay = 0 }: SectionWrapperProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={sectionVariant}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    )
}
