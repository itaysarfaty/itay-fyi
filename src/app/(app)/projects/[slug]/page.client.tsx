'use client'

import { HTMLMotionProps, motion } from 'motion/react'

import { Project } from '@/payload-types'

import { LexicalRenderer } from '@/components/lexical-renderer'
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
                <div className="grid gap-3">
                    <h3 className="text-bg w-fit shrink-0">{project.title}</h3>
                    <p className="text-bg text-base">{project.summary}</p>
                    {!!project.technologies && (
                        <ul className="mt-5 flex flex-wrap gap-4">
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

                <LexicalRenderer content={project.content_html} />
            </motion.div>
        </div>
    )
}
