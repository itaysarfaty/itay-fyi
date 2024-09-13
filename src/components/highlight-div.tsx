'use client'
import { cn } from '@/lib/utils'
import { motion, Variants } from 'framer-motion'

export interface HighlightProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const item: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
  },
}

export const Highlight = ({ children, className, delay = 0 }: HighlightProps) => {
  return (
    <span className={cn('inline-block relative w-fit')}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
        variants={item}
        // @ts-ignore
        className={cn('absolute top-0 left-0 h-full bg-green -z-10', className)}
      />
      {children}
    </span>
  )
}
