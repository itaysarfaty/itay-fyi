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
                <div className="flex flex-col gap-4">
                    {/* Title + Date */}
                    <div
                        className="flex flex-wrap items-center
                            gap-x-4 gap-y-2"
                    >
                        <h3
                            className="text-bg text-lg leading-snug font-medium
                                tracking-tight sm:text-xl lg:text-[1.375rem]"
                        >
                            {project.title}
                        </h3>
                        <time
                            className="text-bg rounded-lg bg-background/70
                                px-3 py-0.5 text-sm font-medium
                                opacity-75 shadow-sm
                                shadow-foreground/[0.04] ring-1
                                ring-foreground/[0.08] backdrop-blur-md
                                dark:bg-background/60"
                        >
                            {format(new Date(project.completedAt), 'MMM yyyy')}
                        </time>
                    </div>

                    {/* Summary */}
                    <p
                        className="text-bg text-base leading-relaxed"
                    >
                        {project.summary}
                    </p>

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
