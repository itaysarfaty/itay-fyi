import { cn } from '@/lib/utils'
import { TextScaffold } from './text-scaffold'

export interface HeaderProps {
  title: string
  subTitle: string
  className?: string
}

export const Hero = ({ title, subTitle, className }: HeaderProps) => {
  return (
    <section className={cn('h-[calc(100svh-84px)] flex items-center w-full @container', className)}>
      <header className="grid gap-6 w-full">
        <TextScaffold>
          <h1 className="text-5xl @[640px]:text-6xl font-medium ">{title}</h1>
        </TextScaffold>
        <TextScaffold>
          <h2 className="text-2xl ">{subTitle}</h2>
        </TextScaffold>
      </header>
    </section>
  )
}
