'use client'

import { useRef } from 'react'

export interface ParagraphProps {
    title: string
    titleElement?: React.ReactNode
    children: React.ReactNode
}

export const AboutSection = ({ title, titleElement, children }: ParagraphProps) => {
    const sectionRef = useRef<HTMLElement>(null)

    const handleFocus = () => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            })
        }
    }

    return (
        <section
            ref={sectionRef}
            className="[&>p]:text-bg grid w-fit gap-2 focus:outline-hidden"
            tabIndex={0}
            role="region"
            aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            onFocus={handleFocus}
        >
            <h3
                id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-fit"
            >
                {titleElement ?? title}
            </h3>
            {children}
        </section>
    )
}
