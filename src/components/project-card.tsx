'use client'

import { format } from 'date-fns'
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

    const handleFocus = () => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            })
        }
    }

    return (
        <MotionLink
            href={`/projects/${slug}`}
            className="group text-left focus:outline-none"
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
                        className="bg-foreground/5 relative -ml-[1%] aspect-4/3 w-[102%] overflow-hidden
                            rounded-2xl duration-500 group-hover:scale-[1.01] lg:-ml-[15%] lg:w-[130%]"
                    >
                        <PayloadMedia
                            image={previewImage}
                            options={{ fill: true }}
                        />
                    </div>
                </Tilt>

                {/* Text content */}
                <div className="border-border mt-[30px] grid grid-cols-12 gap-5 px-0 lg:mt-[50px] lg:px-0">
                    <div className="order-2 col-span-12 flex items-center gap-8 lg:order-1 lg:col-span-4 lg:block">
                        <div className="bg-border h-px w-full lg:hidden" />
                        <p className="text-bg w-fit shrink-0 text-base lg:text-base">
                            {format(new Date(completedAt), 'MMMM yyyy')}
                        </p>
                    </div>
                    <div
                        className="group-focus-within:outline-foreground/50 order-1 col-span-12 grid gap-3
                            group-focus-within:rounded-md group-focus-within:outline-2
                            group-focus-within:outline-offset-4 lg:order-2 lg:col-span-8"
                    >
                        <h3 className="text-bg w-fit text-lg">{title}</h3>
                        <p className="text-bg w-fit text-base">{summary}</p>
                    </div>
                </div>
            </div>
        </MotionLink>
    )
}
