import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface PaginationProps {
  page: number
  totalPages: number
}

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const maxPagesToShow = 5

  if (totalPages === 1) return null

  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  // Adjust startPage if endPage is at the end of totalPages
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <nav className="flex gap-4 w-fit">
      <p className="pointer-events-none">page</p>
      <div className="flex gap-4 mt-[1px]">
        {pages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`?page=${pageNumber}`}
            className={cn('px-1 hover:bg-yellow', pageNumber === page ? 'bg-yellow' : '')}
            scroll={false}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
    </nav>
  )
}
