'use client'

import { format } from 'date-fns'
import { HTMLMotionProps, motion } from 'motion/react'

import { Project } from '@/payload-types'

import { MarkdownRenderer } from '@/components/markdown-renderer'
import { PayloadMedia } from '@/components/payload-media'
import { ProjectNav } from '@/components/project-nav'

interface ProjectPageContentProps {
    project: Project
}
const imageAnimationProps: HTMLMotionProps<'div'> = {
    initial: { y: 80, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

const contentAnimationProps: HTMLMotionProps<'div'> = {
    initial: { y: 80, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
}

export function ProjectPageContent({ project }: ProjectPageContentProps) {
    return (
        <div className="relative flex flex-col pb-24">
            {/* Image */}
            <ProjectNav url={project.url} />

            <motion.div
                {...imageAnimationProps}
                className="bg-foreground/5 relative -ml-[1%] aspect-4/3 w-[102%]
                    overflow-hidden rounded-2xl ring-1 ring-foreground/[0.06]
                    @[800px]:-ml-[15%] @[800px]:w-[130%]"
            >
                <PayloadMedia
                    image={project.previewImage}
                    options={{
                        fill: true,
                        sizes: '(max-width: 768px) 100vw, 60vw',
                        priority: true,
                    }}
                />
            </motion.div>

            <motion.div
                {...contentAnimationProps}
                className="grid gap-12 pt-8 lg:gap-16"
            >
                <div className="flex flex-col gap-4 lg:gap-5">
                    {/* Title and Summary */}
                    <div className="flex flex-col gap-2.5">
                        <h3
                            className="text-bg shrink-0 text-lg leading-tight
                                font-medium"
                        >
                            {project.title}
                        </h3>
                        <p
                            className="text-bg text-base leading-relaxed
                                opacity-75"
                        >
                            {project.summary}
                        </p>
                    </div>

                    {/* Divider and Date */}
                    <div className="flex items-center gap-4">
                        <div className="bg-border h-px flex-1" />
                        <p className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] opacity-75">
                            {format(new Date(project.completedAt), 'MMM yyyy')}
                        </p>
                        <div className="bg-border h-px flex-1" />
                    </div>

                    {/* Technologies */}
                    {!!project.technologies && (
                        <ul
                            aria-label="Technologies used"
                            className="flex flex-wrap gap-4"
                        >
                            {project.technologies.map((tech) => {
                                if (typeof tech == 'number') return null
                                return (
                                    <li
                                        key={tech.id}
                                        className="bg-foreground/5 rounded-md
                                            px-2 py-1 text-sm
                                            backdrop-blur-[3px]"
                                    >
                                        {tech.name}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>

                <MarkdownRenderer content={project.content} />
            </motion.div>
        </div>
    )
}
