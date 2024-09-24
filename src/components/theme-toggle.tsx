'use client'

import { motion } from 'framer-motion'
import {
    CircleIcon,
    LightbulbIcon,
    LightbulbOffIcon,
    MoonIcon,
    SunIcon,
} from 'lucide-react'
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

    if (!mounted) return <CircleIcon className="h-6 w-6 stroke-[0.7px]" />

    return (
        <button aria-label={props.alt} onClick={toggleTheme}>
            <motion.div
                whileTap={{ rotate: 180 }}
                transition={{
                    duration: 10,
                    type: 'spring',
                    stiffness: 100,
                    damping: 8,
                }}
            >
                <AccessibleIcon label={props.alt}>{props.icon}</AccessibleIcon>
            </motion.div>
        </button>
    )
}
