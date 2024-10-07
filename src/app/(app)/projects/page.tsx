import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'

import { getProjects } from './actions'

export default async function ProjectsPage() {
    const projects = await getProjects()
    if (!projects.docs.length) {
        return <Hero title="Projects" subTitle="Under constructions..." />
    }
    return (
        <>
            <Hero title="Projects" subTitle="Just some things I made" />
            <section className="grid gap-28 pb-28">
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
