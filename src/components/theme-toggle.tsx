'use client'

import {
    LightbulbIcon,
    LightbulbOffIcon,
    MoonIcon,
    SunIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme()
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

    return (
        <button aria-label={props.alt} onClick={toggleTheme}>
            <AccessibleIcon label={props.alt}>{props.icon}</AccessibleIcon>
        </button>
    )
}
