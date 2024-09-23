'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { TextScaffold } from './text-scaffold'

export interface ParagraphProps {
    title: string
    text: string
}

export const Paragraph = ({ title, text }: ParagraphProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    // @ts-ignore
    const isInView = useInView(ref, {
        once: true,
    })

    useEffect(() => {
        if (isInView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            })
        }
    }, [isInView, controls])

    return (
        <motion.section
            ref={ref}
            // @ts-ignore
            className="grid w-full gap-6"
            initial={{ opacity: 0, y: 70 }}
            animate={controls}
        >
            <TextScaffold>
                <h3 className="text-2xl font-semibold">{title}</h3>
            </TextScaffold>
            <TextScaffold>
                <p className="text-xl">{text}</p>
            </TextScaffold>
        </motion.section>
    )
}
