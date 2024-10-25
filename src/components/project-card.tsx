'use client'

import { format } from 'date-fns'
import { useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { Project } from '@/payload-types'

import { MotionLink } from './motion-link'
import { PayloadMedia } from './payload-media'

export const ProjectCard = ({
    slug,
    title,
    createdAt,
    previewImage,
    summary,
    margin = '-30%',
}: Project & { margin?: string }) => {
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
            href={`/projects/${slug}`}
            className="group text-left"
            aria-label={`Open ${title} Project`}
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
        >
            <div className="flex flex-col">
                {/* Image */}
                <div
                    className="relative -ml-[1%] aspect-[4/3] w-[102%] overflow-hidden rounded-2xl
                        bg-foreground/[0.05] lg:-ml-[15%] lg:w-[130%]"
                >
                    <PayloadMedia
                        image={previewImage}
                        options={{ fill: true }}
                    />
                </div>

                <div className="mt-[30px] grid grid-cols-12 gap-5 px-0 lg:mt-[50px] lg:px-0">
                    <div className="order-2 col-span-12 flex items-center gap-8 lg:order-1 lg:col-span-4 lg:block">
                        <div className="h-px w-full bg-border lg:hidden" />
                        <p className="text-bg w-fit shrink-0 text-base lg:text-base">
                            {format(new Date(createdAt), 'MMMM yyyy')}
                        </p>
                    </div>
                    <div className="order-1 col-span-12 grid gap-3 lg:order-2 lg:col-span-8">
                        <h3 className="text-bg w-fit text-lg">{title}</h3>
                        <p className="text-bg w-fit text-base">{summary}</p>
                    </div>
                </div>
            </div>
        </MotionLink>
    )
}
