'use client'
import { cn } from '@/lib/utils'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useLayoutEffect, useMemo } from 'react'

export interface HighlightProps {
  children: React.ReactNode
  className?: string
  delay?: number
  whileHover?: boolean
  id?: string
}

export const Highlight = ({
  children,
  className,
  whileHover = false,
  delay = 0,
  id,
}: HighlightProps) => {
  const controls = useAnimation()

  useLayoutEffect(() => {
    if (whileHover || !id) return
    const sessionId = `highlight-complete-${id}`
    const isComplete = sessionStorage.getItem(sessionId)

    if (isComplete !== 'true') {
      // First load: start animation and set sessionStorage
      controls.start('visible')
      sessionStorage.setItem(sessionId, 'true')
    } else {
      // Skip the animation on subsequent loads
      controls.set('visible') // Instantly set to visible
    }
  }, [controls, whileHover, id])

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
      animate={controls}
      whileHover={whileHover ? 'hover' : undefined}
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
