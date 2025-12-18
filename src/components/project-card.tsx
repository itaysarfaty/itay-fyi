'use client'

import { format } from 'date-fns'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { useAnimation, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import Tilt from 'react-parallax-tilt'

import { Project } from '@/payload-types'

import { MotionLink } from './motion-link'
import { PayloadMedia } from './payload-media'

export const ProjectCard = ({
    slug,
    title,
    previewImage,
    summary,
    completedAt,
    margin = '-30%',
}: Project & { margin?: string }) => {
    const ref = useRef<HTMLAnchorElement>(null)
    const controls = useAnimation()
    const isInView = useInView(ref, {
        once: true,
        // @ts-ignore
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
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
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
                            w-[102%] overflow-hidden rounded-2xl duration-500
                            group-hover:scale-[1.01] lg:-ml-[15%] lg:w-[130%]"
                    >
                        <PayloadMedia
                            image={previewImage}
                            options={{ fill: true }}
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
                            {title}
                            <SquareArrowOutUpRightIcon
                                className="text-foreground/50 h-4 w-4
                                    stroke-[1.5px] transition-colors"
                            />
                        </h3>
                        <p
                            className="text-bg text-base leading-relaxed
                                opacity-90"
                        >
                            {summary}
                        </p>
                    </div>

                    {/* Divider and Date */}
                    <div className="flex items-center gap-4">
                        <div className="bg-border h-px flex-1" />
                        <p className="text-bg shrink-0 text-base opacity-75">
                            {format(new Date(completedAt), 'MMMM yyyy')}
                        </p>
                        <div className="bg-border h-px flex-1" />
                    </div>
                </div>
            </div>
        </MotionLink>
    )
}
