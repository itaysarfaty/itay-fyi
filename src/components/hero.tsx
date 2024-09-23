import { cn } from '@/lib/utils'

import { TextScaffold } from './text-scaffold'

export interface HeaderProps {
    title: string
    subTitle: string
    className?: string
}

export const Hero = ({ title, subTitle, className }: HeaderProps) => {
    return (
        <section
            className={cn(
                'flex h-[calc(100svh-84px)] w-full items-center @container',
                className
            )}
        >
            <header className="grid w-full gap-6">
                <TextScaffold>
                    <h1 className="text-5xl font-medium @[640px]:text-6xl">
                        {title}
                    </h1>
                </TextScaffold>
                <TextScaffold>
                    <h2 className="text-2xl">{subTitle}</h2>
                </TextScaffold>
            </header>
        </section>
    )
}
