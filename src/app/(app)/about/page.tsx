import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import { AboutSection } from '@/components/about-section'
import { Hero } from '@/components/hero'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <AboutSection title="Hi there">
                    <p>
                        I&apos;m Itay (pronounced EE-tie) a software engineer
                        based in New York. I lead the{' '}
                        <em className="font-light not-italic">
                            frontend development
                        </em>{' '}
                        at CargoMatrix, a logistics software company.
                    </p>
                </AboutSection>
                <AboutSection title="Software">
                    <p>
                        I&apos;ve been coding for{' '}
                        <em className="font-light not-italic">
                            over six years
                        </em>{' '}
                        now and have a knack for making things work and easy to
                        use. A lot of my professional experience has been
                        front-end related; however, in recent years I&apos;ve
                        been venturing into full-stack development, and I love
                        it.
                    </p>
                </AboutSection>
                <AboutSection title="Design">
                    <p>
                        I&apos;m by no means a creative genius, but I&apos;m a
                        self proclaimed expert in{' '}
                        <em className="font-light not-italic">functional</em>{' '}
                        design. I&apos;m fascinated by the psychology that
                        drives intuitive interfaces and how small design choices
                        can significantly impact user experience.
                    </p>
                </AboutSection>
                <AboutSection title="Cooking">
                    <p>
                        If I&apos;m not behind the screen, you&apos;ll find me
                        over the cutting board. What I love about cooking (or
                        designing) is that you can follow the best practices to
                        reach a{' '}
                        <em className="font-light not-italic">consistent</em>{' '}
                        outcome, but ultimately, each person&apos;s experience
                        will be uniquely theirs.
                    </p>
                </AboutSection>
                <AboutSection title="Education">
                    <p>
                        Bachelor of Science in{' '}
                        <em className="font-light not-italic">
                            Computer Science
                        </em>
                        , Binghamton University, Class of 2022
                    </p>
                </AboutSection>
                <AboutSection title="Have a question?">
                    <Link
                        href={'https://www.linkedin.com/in/itaysarfaty/'}
                        data-umami-event="Linkedin connect button"
                        className="inline-block"
                    >
                        <p className="flex items-center gap-2">
                            Feel free to connect on LinkedIn
                            <ExternalLinkIcon className="h-4 w-4 stroke-[0.8] text-foreground" />
                        </p>
                    </Link>
                </AboutSection>
            </div>
        </>
    )
}
