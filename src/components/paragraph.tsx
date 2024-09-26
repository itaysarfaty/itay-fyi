'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { cn } from '@/utils'

import { TextScaffold } from './text-scaffold'

export interface ParagraphProps {
    title: string
    children: React.ReactNode
}

export const ParagraphText = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return <p className={cn('text-xl leading-8', className)}>{children}</p>
}
export const Paragraph = ({ title, children }: ParagraphProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    // @ts-ignore
    const isInView = useInView(ref, {
        once: true,
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
            // @ts-ignore
            className="grid w-full gap-6"
            initial={{ opacity: 0, y: 70 }}
            animate={controls}
        >
            <TextScaffold>
                <h3 className="text-2xl font-semibold">{title}</h3>
            </TextScaffold>
            <TextScaffold>{children}</TextScaffold>
        </motion.section>
    )
}

Paragraph.Text = ParagraphText
