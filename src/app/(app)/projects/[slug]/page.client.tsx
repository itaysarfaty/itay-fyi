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
const animationProps: HTMLMotionProps<'div'> = {
    initial: { y: 140, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.9, ease: 'easeOut' },
}

export function ProjectPageContent({ project }: ProjectPageContentProps) {
    return (
        <div className="relative flex flex-col pb-24">
            {/* Image */}
            <ProjectNav url={project.url} />

            <motion.div
                {...animationProps}
                className="bg-foreground/5 relative -ml-[1%] aspect-4/3 w-[102%]
                    overflow-hidden rounded-2xl @[800px]:-ml-[15%]
                    @[800px]:w-[130%]"
            >
                <PayloadMedia
                    image={project.previewImage}
                    options={{ fill: true }}
                />
            </motion.div>

            <motion.div
                {...animationProps}
                className="grid gap-[50px] pt-[30px]"
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
                                opacity-90"
                        >
                            {project.summary}
                        </p>
                    </div>

                    {/* Divider and Date */}
                    <div className="flex items-center gap-4">
                        <div className="bg-border h-px flex-1" />
                        <p className="text-bg shrink-0 text-base opacity-75">
                            {format(new Date(project.completedAt), 'MMMM yyyy')}
                        </p>
                        <div className="bg-border h-px flex-1" />
                    </div>

                    {/* Technologies */}
                    {!!project.technologies && (
                        <ul className="flex flex-wrap gap-4">
                            {project.technologies.map((tech) => {
                                if (typeof tech == 'number') return null
                                return (
                                    <li
                                        key={tech.id}
                                        className="bg-foreground/5 rounded-md
                                            px-2 py-1 text-sm
                                            backdrop-blur-[3px]"
                                    >
                                        <p className="text-sm">{tech.name}</p>
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
