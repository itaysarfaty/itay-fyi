import { TextScaffold } from './text-scaffold'

export interface ParagraphProps {
  title: string
  text: string
}

export const Paragraph = ({ title, text }: ParagraphProps) => {
  return (
    <section className="grid gap-6 w-full">
      <TextScaffold>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </TextScaffold>
      <TextScaffold>
        <p className="text-xl">{text}</p>
      </TextScaffold>
    </section>
  )
}
