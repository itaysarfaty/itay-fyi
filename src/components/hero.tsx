import { TextScaffold } from './text-scaffold'

export interface HeaderProps {
  title: string
  subTitle: string
}

export const Hero = ({ title, subTitle }: HeaderProps) => {
  return (
    <section className="h-[calc(100vh-84px)] flex items-center w-full">
      <header className="grid gap-6 w-full">
        <TextScaffold>
          <h1 className="text-5xl sm:text-6xl font-medium ">{title}</h1>
        </TextScaffold>
        <TextScaffold>
          <h2 className="text-2xl ">{subTitle}</h2>
        </TextScaffold>
      </header>
    </section>
  )
}
