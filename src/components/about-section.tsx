'use client'

export interface ParagraphProps {
    title: string
    children: React.ReactNode
}

export const AboutSection = ({ title, children }: ParagraphProps) => {
    return (
        <section className="grid w-fit gap-2">
            <h3 className="text-bg w-fit">{title}</h3>
            {children}
        </section>
    )
}
