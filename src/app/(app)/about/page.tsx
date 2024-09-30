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
                    <p>
                        I&apos;m Itay (pronounced EE-tie) a software engineer
                        based in New York. I lead the{' '}
                        <em>frontend development</em> at CargoMatrix, a
                        logistics software company.
                    </p>
                </AboutSection>
                <AboutSection title="Software">
                    <p>
                        I&apos;ve been coding for <em>over six years</em> now
                        and have a knack for making things easy to use. Most of
                        my career has focused on frontend development, but in
                        recent years I&apos;ve expanded into full-stack work, .
                    </p>
                </AboutSection>
                <AboutSection title="Design">
                    <p>
                        I&apos;m not a creative genius, but I&apos;m a self
                        proclaimed expert in <em>functional</em> design. The
                        psychology behind intuitive interfaces and how subtle
                        choices affect user experience captivates me.
                    </p>
                </AboutSection>
                <AboutSection title="Education">
                    <p>
                        Bachelor of Science in <em>Computer Science</em>,
                        Binghamton University, Class of 2022
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
