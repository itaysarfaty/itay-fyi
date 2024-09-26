import { ExternalLinkIcon, Link2Icon, LinkIcon } from 'lucide-react'
import Link from 'next/link'

import { Hero } from '@/components/hero'
import { Paragraph, ParagraphText } from '@/components/paragraph'

export default function AboutPage() {
    return (
        <>
            <Hero title="About" subTitle="Thank's for taking an interest" />
            <div className="grid gap-[12rem] pb-[12rem]">
                <Paragraph title="Hi there">
                    <ParagraphText>
                        {`I'm Itay (pronounced EE-tie) a software engineer based in New York. I work at CargoMatrix, 
                        a logistics company, where I lead the front-end development.`}
                    </ParagraphText>
                </Paragraph>
                <Paragraph title="Software">
                    <ParagraphText>
                        {`I've been coding for over six years now and have a knack for making things work and easy to use. 
                        A lot of my professional experience has been front-end related; however, 
                        I've been venturing into full-stack development, and I love it.`}
                    </ParagraphText>
                </Paragraph>
                <Paragraph title="Design">
                    <ParagraphText>
                        {`I'm by no means a creative genius, but I'm passionate about functional design. I enjoy reading about
                         the psychology that drives intuitive interfaces. It's fascinating how small design choices can significantly 
                         impact user experience.`}
                    </ParagraphText>
                </Paragraph>
                <Paragraph title="Cooking">
                    <ParagraphText>
                        {`If I'm not working you'll probably find me cooking. 
                        Much like designing a user interface, I love the balance of science and art it offers. 
                        You can measure everything perfectly, but ultimately, each person will have a unique experience.`}
                    </ParagraphText>
                </Paragraph>
                <Paragraph title="Education">
                    <ParagraphText>
                        {`Bachelor of Science in Computer Science, Binghamton University, Class of 2022`}
                    </ParagraphText>
                </Paragraph>
                <Paragraph title="Have a question?">
                    <ParagraphText className="flex gap-2">
                        Feel free to connect on{' '}
                        <Link href={'https://www.linkedin.com/in/itaysarfaty/'}>
                            <span className="group flex w-fit items-center gap-2">
                                LinkedIn
                                <ExternalLinkIcon className="mb-[2px] h-4 w-4 stroke-[0.7] text-foreground" />
                            </span>
                        </Link>
                    </ParagraphText>
                </Paragraph>
            </div>
        </>
    )
}
