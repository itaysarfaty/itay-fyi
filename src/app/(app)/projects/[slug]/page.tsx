import { redirect } from 'next/navigation'

import { getProject, getProjects } from '../actions'

import { ProjectPageContent } from './page.client'

export const generateStaticParams = async () => {
    const projects = await getProjects()
    return projects.docs.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = await getProject(slug)
    if (!project) redirect('/projects')

    return <ProjectPageContent project={project} />
}
