import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@/payload.config'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { Pagination } from './pagination'

const getArticles = async (page?: number) => {
  'use server'
  try {
    const payload = await getPayloadHMR({ config })
    const articles = await payload.find({
      collection: 'articles',
      page: page ?? 1,
      limit: 5,
      pagination: true,
      sort: 'createdAt',
    })
    return articles
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: "Couldn't fetch articles" }
  }
}

export const ArticleList = async ({ page }: { page: string }) => {
  const pageNumberResult = z.coerce.number().safeParse(page)

  if (!pageNumberResult.success) {
    return <div>Invalid page number</div>
  }

  const pageNumber = pageNumberResult.data
  const articles = await getArticles(pageNumber)

  if ('error' in articles) {
    return <div>{articles.error}</div>
  }

  if (pageNumber < 1) {
    redirect('/')
  }
  if (pageNumber > articles.totalPages) {
    redirect(`?page=${articles.totalPages}`)
  }

  return (
    <section className="grid gap-8 items-center @lg:gap-10">
      <header>
        <h3 className=" bg-yellow w-fit  font-semibold pointer-events-none">good reads</h3>
      </header>
      <ul className="grid gap-8 @lg:gap-10">
        {articles.docs.map(({ title, id, link, tag }) => {
          return (
            <li key={id}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="lowercase grid gap-0 w-fit"
              >
                <p className=" w-fit pr-1 font-normal text-base text-black/50">{tag}</p>
                <p className="underline">{title}</p>
              </a>
            </li>
          )
        })}
      </ul>
      <Pagination page={pageNumber} totalPages={articles.totalPages} />
    </section>
  )
}
