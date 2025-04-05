'use client'

import { useRef } from 'react'

export interface ParagraphProps {
    title: string
    children: React.ReactNode
}

export const AboutSection = ({ title, children }: ParagraphProps) => {
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
            className="grid w-fit gap-2 focus:outline-hidden"
            tabIndex={0}
            role="region"
            aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            onFocus={handleFocus}
        >
            <h3
                id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-bg w-fit"
            >
                {title}
            </h3>
            {children}
        </section>
    )
}
