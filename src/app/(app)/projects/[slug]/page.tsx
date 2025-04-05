import { redirect } from 'next/navigation'

import { LexicalRenderer } from '@/components/lexical-renderer'
import { PayloadMedia } from '@/components/payload-media'
import { ProjectNav } from '@/components/project-nav'

import { getProject, getProjects } from '../actions'

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

    return (
        <>
            <div className="relative flex flex-col pb-24">
                {/* Image */}
                <ProjectNav url={project.url} />

                <div
                    className="relative -ml-[1%] aspect-[4/3] w-[102%] overflow-hidden rounded-2xl
                        bg-foreground/[0.05] @[800px]:-ml-[15%] @[800px]:w-[130%]"
                >
                    <PayloadMedia
                        image={project.previewImage}
                        options={{ fill: true }}
                    />
                </div>

                <div className="grid gap-[50px] pt-[30px]">
                    <div className="grid gap-3">
                        <h3 className="text-bg w-fit shrink-0">
                            {project.title}
                        </h3>
                        <p className="text-bg text-base">{project.summary}</p>
                        {!!project.technologies && (
                            <ul className="mt-5 flex flex-wrap gap-4">
                                {project.technologies.map((tech) => {
                                    if (typeof tech == 'number') return null
                                    return (
                                        <li
                                            key={tech.id}
                                            className="rounded-md bg-foreground/[0.05] px-2 py-1 text-sm backdrop-blur-[3px]"
                                        >
                                            <p className="text-sm">
                                                {tech.name}
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>

                    <LexicalRenderer content={project.content_html} />
                </div>
            </div>
        </>
    )
}
