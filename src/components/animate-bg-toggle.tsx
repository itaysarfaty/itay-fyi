'use client'

import { AnimationProps, motion, useReducedMotion } from 'framer-motion'
import { GripIcon, LoaderIcon, SquareIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

import { useGlobalConfig } from '@/providers/global-config-provider'

export const AnimateBgToggle = () => {
    const { animateBg, setConfig } = useGlobalConfig()
    const [mounted, setMounted] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        setMounted(true)
    }, [])

    const props = animateBg
        ? {
              icon: (
                  <GripIcon className="h-6 w-6 stroke-[0.7px] hover:stroke-1" />
              ),
              alt: 'Turn on light theme',
          }
        : {
              icon: (
                  <SquareIcon className="h-6 w-6 stroke-[0.7px] hover:stroke-1" />
              ),
              alt: 'Turn on dark theme',
          }

    const handleToggle = () => {
        setConfig({
            animateBg: !animateBg,
        })
    }

    const transition: AnimationProps['transition'] = {
        duration: 10,
        type: 'spring',
        stiffness: 200,
        damping: 10,
    }

    if (prefersReducedMotion) return null

    return (
        <motion.button
            aria-label={props.alt}
            onTap={handleToggle}
            whileTap={{ rotate: 180, transition, scale: 1.18 }}
            initial={prefersReducedMotion ? undefined : { rotate: -180 }}
            animate={{ rotate: 0 }}
            whileHover={{
                rotate: [0, 9, -9, 0],
                transition: {
                    type: 'tween',
                    duration: 0.5,
                },
            }}
            transition={transition}
        >
            {!mounted ? (
                <SquareIcon className="h-6 w-6 cursor-pointer stroke-[0.7px]" />
            ) : (
                <AccessibleIcon label={props.alt}>{props.icon}</AccessibleIcon>
            )}
        </motion.button>
    )
}
