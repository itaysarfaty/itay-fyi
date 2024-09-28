import { formatDistanceToNow } from 'date-fns'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import { capitalize } from '@/utils'

import { Hero } from '@/components/hero'

const dummyProjects = [
    {
        title: 'E-commerce Website',
        description:
            'A full-stack e-commerce website built with React, Node.js, and MongoDB.',
        date: new Date('2024-3-15'),
        slug: 'e-commerce-website',
    },
    {
        title: 'Social Media App',
        description:
            'A social media application with features like posting, commenting, and following users.',
        date: new Date('2022-09-30'),
        slug: 'social-media-app',
    },
    {
        title: 'Task Management System',
        description:
            'A web application for managing tasks and projects with features like assigning tasks and tracking progress.',
        date: new Date('2022-08-20'),
        slug: 'task-management-system',
    },
    {
        title: 'Weather App',
        description:
            "A weather application that displays current weather information based on user's location.",
        date: new Date('2022-07-10'),
        slug: 'weather-app',
    },
]
export default async function ProjectsPage() {
    return (
        <>
            <Hero title="Projects" subTitle="A featured selection" />
            <section className="grid gap-44 pb-28">
                {dummyProjects.map((project, index) => (
                    <Link
                        href={`/projects/${project.slug}`}
                        key={index}
                        className="group text-left"
                        aria-label={`Open ${project.title} Project`}
                    >
                        <div className="flex flex-col">
                            {/* Image */}
                            <div className="aspect-video w-full bg-foreground/[0.05]" />
                            <div className="mt-3 flex w-full flex-col px-1 sm:mt-6">
                                <div className="grid w-full gap-2">
                                    <div className="flex items-center gap-2">
                                        <h3>{project.title}</h3>
                                        <SquareArrowOutUpRightIcon
                                            className="inline-block h-4 w-4 stroke-[0.8] text-foreground opacity-50
                                                group-hover:stroke-1"
                                        />
                                    </div>

                                    <p className="text-sm font-normal">
                                        {capitalize(
                                            formatDistanceToNow(project.date, {
                                                addSuffix: true,
                                            })
                                        )}
                                    </p>
                                </div>
                                <p className="mt-3 sm:mt-6">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </>
    )
}
