import { Hero } from '@/components/hero'
import { Paragraph } from '@/components/paragraph'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <Paragraph
                    title="Hi there"
                    text={`I'm Itay (pronounced EE-tie). 
                    I've been working as a user interface engineer in the logistics industry for the past two years.`}
                />
                <Paragraph
                    title="Software"
                    text={`I've been coding for over six years now and have a knack for making things work and easy to use. 
                        For the past two years I've been leading the front-end development at CargoMatrix.`}
                />
                <Paragraph
                    title="Design"
                    text={`I'm by no means a creative genius, but I am passionate about functional design.
                        Intrigued by the psychology that drives intuitive interfaces, I often read about it on my free time.`}
                />
                <Paragraph
                    title="Cooking"
                    text={`If I'm not working you'll probably find me in the kitchen. 
                    Much like designing a user interface, I love the balance of science and art cooking offers. 
                    You can measure everything perfectly, but ultimately, each person will have a unique experience.`}
                />
                <Paragraph
                    title="Education"
                    text={`Bachelor of Science in Computer Science, Binghamton University, Class of 2022`}
                />
                <Paragraph
                    title="Have a question?"
                    text={`Feel free to connect on linkedin`}
                />
            </div>
        </>
    )
}
