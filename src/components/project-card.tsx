'use client'

import { format } from 'date-fns'
import { useAnimation, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import Tilt from 'react-parallax-tilt'

import { Project } from '@/payload-types'

import { MotionLink } from './motion-link'
import { PayloadMedia } from './payload-media'

// Once any card has animated, all future mounts skip the entrance
// animation so back-navigation restores the page instantly.
let hasAnimatedCards = false

export const ProjectCard = ({
    slug,
    title,
    previewImage,
    summary,
    completedAt,
    margin = '-30%',
    index = 0,
}: Project & { margin?: string; index?: number }) => {
    const skipAnimation = useRef(hasAnimatedCards)
    const ref = useRef<HTMLAnchorElement>(null)
    const controls = useAnimation()
    const isInView = useInView(ref, {
        once: true,
        // @ts-ignore
        margin,
    })

    useEffect(() => {
        if (skipAnimation.current) return
        if (!isInView) return
        hasAnimatedCards = true
        controls.start({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            },
        })
    }, [isInView, controls])

    const handleFocus = (event: React.FocusEvent) => {
        // Only scroll into view if focus was gained via keyboard (not mouse click)
        if (ref.current && event.target === event.currentTarget) {
            // Check if the element has focus-visible (indicates keyboard focus)
            const isFocusVisible = event.target.matches(':focus-visible')
            if (isFocusVisible) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                })
            }
        }
    }

    return (
        <MotionLink
            href={`/projects/${slug}`}
            className="group text-left focus:shadow-none focus:ring-0
                focus:outline-none focus-visible:outline-none"
            style={{ outline: 'none', boxShadow: 'none' }}
            aria-label={`Open ${title} Project`}
            ref={ref}
            initial={skipAnimation.current ? false : { opacity: 0, y: 80, scale: 0.98 }}
            animate={skipAnimation.current ? { opacity: 1, y: 0, scale: 1 } : controls}
            onFocus={handleFocus}
        >
            <div className="group flex flex-col">
                <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    transitionSpeed={5000}
                >
                    {/* Image */}
                    <div
                        className="bg-foreground/5 relative -ml-[1%] aspect-4/3
                            w-[102%] overflow-hidden rounded-2xl ring-1
                            ring-foreground/[0.06] duration-500
                            group-hover:scale-[1.01]
                            group-hover:ring-foreground/[0.1] lg:-ml-[15%]
                            lg:w-[130%]"
                    >
                        <PayloadMedia
                            image={previewImage}
                            options={{
                                fill: true,
                                sizes: '(max-width: 768px) 100vw, 60vw',
                                priority: index === 0,
                            }}
                        />
                    </div>
                </Tilt>

                {/* Text content */}
                <div
                    className="group-focus-visible:outline-foreground/50 mt-5
                        flex flex-col gap-4 group-focus-visible:rounded-md
                        group-focus-visible:outline-2
                        group-focus-visible:outline-offset-4 lg:mt-7"
                >
                    {/* Title + Date */}
                    <div
                        className="flex flex-wrap items-center
                            gap-x-4 gap-y-2"
                    >
                        <h3
                            className="text-bg text-lg leading-snug
                                font-medium tracking-tight sm:text-xl
                                lg:text-[1.375rem]"
                        >
                            {title}
                        </h3>
                        <time
                            className="text-bg rounded-lg bg-background/70
                                px-3 py-0.5 text-sm font-medium
                                opacity-75 shadow-sm
                                shadow-foreground/[0.04] ring-1
                                ring-foreground/[0.08] backdrop-blur-md
                                dark:bg-background/60"
                        >
                            {format(new Date(completedAt), 'MMM yyyy')}
                        </time>
                    </div>

                    {/* Summary */}
                    <p
                        className="text-bg text-base leading-relaxed"
                    >
                        {summary}
                    </p>
                </div>
            </div>
        </MotionLink>
    )
}
