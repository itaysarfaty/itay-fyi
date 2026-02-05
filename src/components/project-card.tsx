'use client'

import { format } from 'date-fns'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
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
    technologies,
    margin = '-30%',
}: Project & { margin?: string }) => {
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
                            options={{ fill: true }}
                        />
                        {/* Gradient overlay */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0
                                bottom-0 h-1/3 bg-gradient-to-t
                                from-background/30 to-transparent"
                        />
                    </div>
                </Tilt>

                {/* Text content */}
                <div
                    className="group-focus-visible:outline-foreground/50 mt-6
                        flex flex-col gap-4 px-0 group-focus-visible:rounded-md
                        group-focus-visible:outline-2
                        group-focus-visible:outline-offset-4 lg:mt-8 lg:gap-5"
                >
                    {/* Title and Summary */}
                    <div className="flex flex-col gap-2.5">
                        <h3
                            className="text-bg flex items-center gap-3 text-lg
                                leading-tight font-medium"
                        >
                            <span className="relative">
                                {title}
                                {/* Animated underline */}
                                <span
                                    aria-hidden="true"
                                    className="bg-foreground/40 absolute -bottom-0.5
                                        left-0 h-px w-0 transition-all
                                        duration-500 group-hover:w-full"
                                />
                            </span>
                            <SquareArrowOutUpRightIcon
                                className="text-foreground/50 h-4 w-4
                                    shrink-0 stroke-[1.5px] transition-colors"
                            />
                        </h3>
                        <p
                            className="text-bg text-base leading-relaxed
                                opacity-75 transition-opacity duration-300
                                group-hover:opacity-90"
                        >
                            {summary}
                        </p>
                    </div>

                    {/* Technology Tags */}
                    {!!technologies?.length && (
                        <ul
                            aria-label="Technologies used"
                            className="flex flex-wrap gap-2"
                        >
                            {technologies.map((tech) => {
                                if (typeof tech === 'number') return null
                                return (
                                    <li
                                        key={tech.id}
                                        className="bg-foreground/5 rounded-md
                                            px-2 py-0.5 text-xs
                                            backdrop-blur-[3px]"
                                    >
                                        {tech.name}
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    {/* Divider and Date */}
                    <div className="flex items-center gap-4">
                        <div
                            className="bg-border h-px flex-1 transition-colors
                                duration-300 group-hover:bg-foreground/15"
                        />
                        <p
                            className="shrink-0 font-sans text-xs uppercase
                                tracking-[0.2em] opacity-75"
                        >
                            {format(new Date(completedAt), 'MMM yyyy')}
                        </p>
                        <div
                            className="bg-border h-px flex-1 transition-colors
                                duration-300 group-hover:bg-foreground/15"
                        />
                    </div>
                </div>
            </div>
        </MotionLink>
    )
}
