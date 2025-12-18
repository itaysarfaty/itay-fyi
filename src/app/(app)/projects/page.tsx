import { Metadata } from 'next'

import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'

import { getProjects } from './actions'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Some things I made (not all)',
}
export default async function ProjectsPage() {
    const projects = await getProjects()
    if (!projects.docs.length) {
        return <Hero title="Projects" subTitle="Under constructions..." />
    }
    return (
        <>
            <Hero title="Projects" subTitle="Some things I made (not all)" />
            <section className="grid gap-40 pb-28 lg:gap-48">
                {projects.docs.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        margin={index === 0 ? '30px' : undefined}
                        {...project}
                    />
                ))}
            </section>
        </>
    )
}
