'use client'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { useMemo } from 'react'

export interface HighlightProps {
  children: React.ReactNode
  className?: string
  delay?: number
  whileHover?: boolean
}

export const Highlight = ({
  children,
  className,
  whileHover = false,
  delay = 0,
}: HighlightProps) => {
  const item = useMemo<Variants>(
    () => ({
      hidden: { width: 0, transition: { duration: 0.8, ease: 'easeOut', delay } },
      visible: {
        width: '100%',
        transition: { duration: 0.8, ease: 'easeOut', delay },
      },
      hover: {
        width: '100%',
        transition: { duration: 0.8, ease: 'easeOut' },
      },
    }),
    [delay],
  )

  return (
    <motion.span
      initial={'hidden'}
      animate={whileHover ? 'hidden' : 'visible'}
      whileHover={'hover'}
      // @ts-ignore
      className={cn('inline-block relative w-fit')}
    >
      <motion.div
        variants={item}
        // @ts-ignore
        className={cn('absolute top-0 left-0 h-full  -z-10', className)}
      />
      {children}
    </motion.span>
  )
}
