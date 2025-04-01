import { ExternalLinkIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { AboutSection } from '@/components/about-section'
import { Hero } from '@/components/hero'

export const metadata: Metadata = {
    title: 'Code Wizard',

    description:
        'I’m Itay Sarfaty, a software engineer based in New York specializing in full-stack web development. Computer Science graduate from Binghamton University.',
}

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
                        I&apos;ve been developing for over six years,
                        specializing in frontend development, but recently
                        I&apos;ve expanded into full-stack work.
                    </p>
                </AboutSection>
                <AboutSection title="Design">
                    <p className="text-bg">
                        I&apos;m not a creative genius, but I excel in
                        functional design. I&apos;m captivated by the psychology
                        that makes interfaces intuitive.
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
