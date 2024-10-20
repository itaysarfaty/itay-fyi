'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { BracesIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

export interface ParagraphProps {
    title: string
    children: React.ReactNode
    margin?: string
}

export const AboutSection = ({
    title,
    children,
    margin = '-30%',
}: ParagraphProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    // @ts-ignore
    const isInView = useInView(ref, {
        once: true,
        margin,
    })

    useEffect(() => {
        if (!isInView) return
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        })
    }, [isInView, controls])

    return (
        <motion.section
            ref={ref}
            // @ts-expect-error
            className="grid w-fit gap-2"
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
        >
            <h3 className="text-bg w-fit">{title}</h3>
            {children}
        </motion.section>
    )
}
