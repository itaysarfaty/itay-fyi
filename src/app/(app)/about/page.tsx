import { Hero } from '@/components/hero'
import { Paragraph } from '@/components/paragraph'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <Paragraph
                    title="TLDR;"
                    text={`Hi, I'm Itay (pronounced EE-tie). 
                    I've been working as a user interface engineer in the logistics industry for the past two years.`}
                />
                <Paragraph
                    title="Software"
                    text={`I've been coding for over six years now, armed with a Bachelor's degree in Computer Science from 
                    Binghamton University and a knack for making things work and look good. I've been with CargoMatrix as a UI engineer, 
                    for the past two years, where I bring functional, user-friendly designs to life.`}
                />
                <Paragraph
                    title="Design"
                    text={`I've always had a keen interest in design, even if I don't consider myself a creative genius. 
                    What truly excites me is creating user interfaces that are functional and intuitive, leading to an experience that feel effortless. 
                    I'm fascinated by the psychology that makes this possible and enjoy reading about it on my free time.`}
                />
                <Paragraph
                    title="Cooking"
                    text={`If I'm not working you'll probably find me in the kitchen. 
                    Much like designing a user interface, I love the balance of science and art cooking offers. 
                    You can measure everything perfectly, but ultimately, each person will have a unique experience.`}
                />
            </div>
        </>
    )
}
