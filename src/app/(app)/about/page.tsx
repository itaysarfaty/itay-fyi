import { Hero } from '@/components/hero'
import { Paragraph } from '@/components/paragraph'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <Paragraph
                    title="Me"
                    text="Hi, I'm Itay (pronounced EE-tie). I've been working as a user interface engineer in the logistics industry for the past two years. Below, you'll find some insights into my mindset when it comes to software, design, and more."
                />
                <Paragraph
                    title="Software"
                    text="When starting a project, I prioritize core requirements first. By focusing on the essentials, I build maintainable codebases — it's much easier to add features to reliable software than it is to add reliability to featureful software."
                />
                <Paragraph
                    title="Design"
                    text="My approach centers around functional design, where I make choices backed by human psychology. Just like an author has a purpose for every word, there should be a reason behind every element in a design."
                />
                <Paragraph
                    title="Cooking"
                    text="If I'm not working you'll probably find me in the kitchen. Much like designing a user interface, I love the balance of science and art cooking offers. You can measure everything perfectly, but ultimately, each person will have a unique experience."
                />
            </div>
        </>
    )
}
