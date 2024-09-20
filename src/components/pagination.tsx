'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface PaginationProps {
  page: number
  totalPages: number
  className?: string
}

export const Pagination = ({ page, totalPages, className }: PaginationProps) => {
  const maxPagesToShow = 5

  if (totalPages === 1) return null

  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  // Adjust startPage if endPage is at the end of totalPages
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  const counts = { 1: 2, 2: 5 }
  const test = Object.entries(counts).sort(([_, a], [__, b]) => a - b)
  console.log(test)

  return (
    <nav
      // @ts-ignore
      className={cn('flex gap-4 w-fit', className)}
    >
      <p className="pointer-events-none">page</p>
      <div className="flex gap-4 mt-[1px]">
        {pages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`/${pageNumber}`}
            className={cn(
              'px-1 hover:bg-primary transition-colors duration-100',
              pageNumber === page ? 'bg-primary' : '',
            )}
            scroll={false}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
    </nav>
  )
}
