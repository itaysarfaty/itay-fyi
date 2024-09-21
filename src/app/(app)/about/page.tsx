import { Hero } from '@/components/hero'
import { Paragraph } from '@/components/paragraph'

export default async function AboutPage() {
  return (
    <>
      <Hero title="About" subTitle="Thank's for taking an interest" />
      <div className="grid gap-36 pb-24">
        <Paragraph
          title="TLDR;"
          text="The past two years I've been working as a user interface engineer in the logistics industry."
        />
        <Paragraph
          title="Software"
          text="When starting a new project, I prioritize core requirements. Focusing on the essentials, I can build a maintainable codebase — it's much easier to add features to reliable software than it is to add reliability to featureful software.
"
        />
        <Paragraph
          title="Design"
          text="My approach centers around functional design, where I strive to make choices based on human psychology. Just like an author has a purpose for every word, there should be a reason behind every element in a design."
        />
        <Paragraph
          title="Logistics"
          text="I've traveled across the U.S. to meet with clients and review their operations. During those visits, I saw the daily challenges warehouse workers and supervisors face. These insights have helped me build intuitive solutions with the CargoMatrix team."
        />
        <Paragraph
          title="Cooking"
          text="If I'm not working you'll probably find me in the kitchen. I love the balance of science and art cooking offers, much like designing a user interface. You can measure everything perfectly, but ultimately, each person will have a unique experience."
        />
      </div>
    </>
  )
}
