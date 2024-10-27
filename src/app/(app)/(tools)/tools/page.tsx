import { Hero } from '@/components/hero'
import { ToolCard } from '@/components/tool-card'

import { getTools } from './actions'

export default async function ToolsPage() {
    const tools = await getTools()
    return (
        <>
            <Hero title="Toolbox" subTitle="A collection of small tools" />
            <section className="grid gap-28 pb-28">
                {tools.docs.map((tool, index) => (
                    <ToolCard
                        key={tool.id}
                        margin={index === 0 ? '30px' : undefined}
                        {...tool}
                    />
                ))}
            </section>
        </>
    )
}
