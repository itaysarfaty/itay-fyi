import { notFound } from 'next/navigation'

import { getGreeting } from './actions'
import { GreetingView } from './greeting-view'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function GreetingPage({ params }: PageProps) {
    const { slug } = await params
    const greeting = await getGreeting(slug)

    if (!greeting) {
        notFound()
    }

    return <GreetingView greeting={greeting} />
}
