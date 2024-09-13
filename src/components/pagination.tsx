'use client'
import { DELAYS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

// fade in from the bottom left to the center
const pagination: Variants = {
  hidden: {
    opacity: 0,
    x: '-10%',
    y: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
}

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

  return (
    <motion.nav
      // @ts-ignore
      className={cn('flex gap-4 w-fit', className)}
      initial="hidden"
      variants={pagination}
      animate="visible"
      transition={{ duration: 0.4, ease: 'easeOut', delay: DELAYS[2] }}
    >
      <span className="opacity-50 pointer-events-none hidden md:flex">/</span>
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
    </motion.nav>
  )
}
