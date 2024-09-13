import { ArticleList } from '@/components/article-list'
import { Highlight } from '@/components/highlight-div'
import { Navbar } from '@/components/navbar'
import { DELAYS } from '@/lib/constants'

// Generate an array of 10 react article titles
export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  return (
    <div className="p-8 flex flex-col gap-28 text-xl @lg:text-2xl @lg:gap-[9rem] w-full container mx-auto test-red">
      <Navbar />
      <section>
        <h2 className="leading-9 text-pretty">
          i&apos;m a <Highlight delay={DELAYS[0]}>software engineer</Highlight> with 2 years of
          experience in the logistics industry
        </h2>
      </section>
      <ArticleList page={searchParams.page ?? '1'} />
    </div>
  )
}
