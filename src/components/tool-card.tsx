'use client'

import { useAnimation, useInView } from 'framer-motion'
import { SquareArrowOutUpRightIcon, SquareArrowUpRightIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Tool } from '@/payload-types'

import { MotionLink } from './motion-link'

export const ToolCard = ({
    slug,
    title,
    description,
    actionLabel,
    margin = '-30%',
}: Tool & { margin?: string }) => {
    const ref = useRef<HTMLAnchorElement>(null)
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
        <MotionLink
            href={`/${slug}`}
            className="group text-left"
            aria-label={`Open ${title} Project`}
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h3 className="text-bg w-fit text-lg">{title}</h3>
                </div>
                <p className="text-bg w-fit text-base">{description}</p>
                <p className="flex items-center gap-3 text-sm">
                    <SquareArrowOutUpRightIcon className="h-4 w-4 stroke-[0.7px] text-foreground" />
                    {actionLabel ?? 'Use'}
                </p>
            </div>
        </MotionLink>
    )
}
