import { Metadata } from 'next'

import { Hero } from '@/components/hero'

import { GuidedAbout } from '../../../components/guided-about'

export const metadata: Metadata = {
    title: 'Wizard',
    description: `I'm Itay Sarfaty, a software engineer based in New York specializing in full-stack web development. Computer Science graduate from Binghamton University.`,
}

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <GuidedAbout />
        </>
    )
}
