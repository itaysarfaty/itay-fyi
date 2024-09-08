import { ArticleList } from '@/components/article-list'
import { Navbar } from '@/components/navbar'

// Generate an array of 10 react article titles
export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  return (
    <div className="p-8 flex flex-col gap-36 text-xl @lg:text-2xl @lg:gap-48 w-full container mx-auto ">
      <Navbar />
      <section>
        <h2 className="leading-9">
          i&apos;m a <span className="bg-green font-semibold">software engineer</span> with{' '}
          <br className="@md:hidden" /> 2 years of experience in the logistics industry
        </h2>
      </section>
      <ArticleList page={searchParams.page ?? '1'} />
    </div>
  )
}
