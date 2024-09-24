import { Hero } from '@/components/hero'
import { Paragraph } from '@/components/paragraph'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <Paragraph
                    title="TLDR;"
                    text="Hi, I'm Itay (pronounced EE-tie). I've been working as a user interface engineer in the logistics industry for the past two years."
                />
                <Paragraph
                    title="Software"
                    text="I've been programming for over six years, earning a Bachelor's in Computer Science from Binghamton University along the way. Professionally, my focus has been on the frontend, where I built and maintained extensive component libraries using atomic design principles. Over the past year, I've been diving into full-stack projects with Next.js and really enjoy it."
                />
                <Paragraph
                    title="Design"
                    text="I've always been interested in design, though I don't consider myself super creative. What drives me is creating functional user interfaces that work intuitively. I'm particularly fascinated by the psychology behind effective design, which I actively read about on my own."
                />
                <Paragraph
                    title="Cooking"
                    text="If I'm not working you'll probably find me in the kitchen. Much like designing a user interface, I love the balance of science and art cooking offers. You can measure everything perfectly, but ultimately, each person will have a unique experience."
                />
            </div>
        </>
    )
}
