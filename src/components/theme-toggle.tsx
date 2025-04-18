'use client'

import { LoaderIcon, MoonIcon, SunIcon } from 'lucide-react'
import { AnimationProps, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const props =
        resolvedTheme === 'dark'
            ? {
                  icon: (
                      <MoonIcon className="h-6 w-6 -rotate-12 stroke-[0.7px] hover:stroke-1" />
                  ),
                  alt: 'Turn on light theme',
              }
            : {
                  icon: (
                      <SunIcon className="h-6 w-6 stroke-[0.7px] hover:stroke-1" />
                  ),
                  alt: 'Turn on dark theme',
              }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    const transition: AnimationProps['transition'] = {
        duration: 10,
        type: 'spring',
        stiffness: 200,
        damping: 10,
    }

    return (
        <motion.button
            aria-label={props.alt}
            onTap={toggleTheme}
            whileTap={{ rotate: 360, transition, scale: 1.18 }}
            initial={{ rotate: -180 }}
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
                <LoaderIcon className="h-6 w-6 cursor-pointer stroke-[0.7px]" />
            ) : (
                <AccessibleIcon label={props.alt}>{props.icon}</AccessibleIcon>
            )}
        </motion.button>
    )
}
