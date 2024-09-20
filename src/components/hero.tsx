import { TextScaffold } from './text-scaffold'

export interface HeaderProps {
  title: string
  subTitle: string
}

export const Hero = ({ title, subTitle }: HeaderProps) => {
  return (
    <div className="h-[calc(100svh-80px)] flex items-center w-full">
      <div className="grid gap-6 w-full">
        <TextScaffold>
          <h1 className="text-5xl sm:text-6xl ">{title}</h1>
        </TextScaffold>
        <TextScaffold>
          <h1 className="text-2xl ">{subTitle}</h1>
        </TextScaffold>
      </div>
    </div>
  )
}
