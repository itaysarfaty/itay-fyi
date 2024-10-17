import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import { AboutSection } from '@/components/about-section'
import { Hero } from '@/components/hero'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <AboutSection title="Hi there" margin="10%">
                    <p className="text-bg">
                        I&apos;m Itay <i>(EE-tie)</i>  a software engineer based
                        in New York. I work at CargoMatrix, a company
                        that&apos;s been innovating the logistics industry for
                        over 20 years.
                    </p>
                </AboutSection>
                <AboutSection title="Software">
                    <p className="text-bg">
                        I&apos;ve been coding for over six years and have a
                        knack for making things easy to use. I specialize in
                        frontend development, but in recent years I&apos;ve
                        expanded into full-stack work.
                    </p>
                </AboutSection>
                <AboutSection title="Design">
                    <p className="text-bg">
                        I&apos;m not a creative genius, but I&apos;m a self
                        proclaimed expert in functional design. The psychology
                        behind intuitive interfaces and how subtle choices
                        affect user experience captivates me.
                    </p>
                </AboutSection>
                <AboutSection title="Education">
                    <p className="text-bg">
                        Bachelor of Science in Computer Science, Binghamton
                        University, Class of 2022
                    </p>
                </AboutSection>
                <AboutSection title="Have a question?">
                    <Link
                        href={'https://www.linkedin.com/in/itaysarfaty/'}
                        data-umami-event="Linkedin connect button"
                        className="inline-block"
                    >
                        <p className="text-bg flex items-center gap-2">
                            Connect with me on LinkedIn
                            <ExternalLinkIcon className="h-4 w-4 stroke-[0.8] text-foreground" />
                        </p>
                    </Link>
                </AboutSection>
            </div>
        </>
    )
}
