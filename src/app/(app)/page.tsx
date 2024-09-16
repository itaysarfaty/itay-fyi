import { ArticleList } from '@/components/article-list'
import { Highlight } from '@/components/highlight-div'
import { LoadingArticleList } from '@/components/loading-article-list'
import { Navbar } from '@/components/navbar'
import { DELAYS } from '@/lib/constants'
import { Suspense } from 'react'

// Generate an array of 10 react article titles
export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  return (
    <div className="p-8 flex flex-col gap-28 text-xl @lg:text-2xl @lg:gap-[9rem] w-full container mx-auto test-red">
      <Navbar />
      <section>
        <h2 className="leading-9 text-pretty">
          i&apos;m a{' '}
          <Highlight delay={0.5} className="bg-green">
            software engineer
          </Highlight>{' '}
          with two years of experience in the logistics industry
        </h2>
      </section>

      <section className="grid gap-8 items-center @lg:gap-10">
        <header className="flex gap-4 items-center @lg:gap-5">
          <h3 className=" w-fit  pointer-events-none">
            <Highlight className="bg-yellow" delay={1}>
              good reads
            </Highlight>
          </h3>
        </header>
        <Suspense fallback={<LoadingArticleList />} key={searchParams.page}>
          <ArticleList page={searchParams.page ?? '1'} />
        </Suspense>
      </section>
    </div>
  )
}
