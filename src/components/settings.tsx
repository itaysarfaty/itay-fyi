'use client'

import { CogIcon, LightbulbIcon, LightbulbOffIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const SettingsMenu = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const themeToggleProps =
        resolvedTheme === 'dark'
            ? {
                  icon: <LightbulbIcon className="h-4 w-4" />,
                  label: 'Lights on',
              }
            : {
                  icon: <LightbulbOffIcon className="h-4 w-4" />,
                  label: 'Lights off',
              }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label="website settings">
                    <AccessibleIcon.Root label="settings">
                        <CogIcon className="stroke-[0.7px] hover:stroke-1" />
                    </AccessibleIcon.Root>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    sideOffset={15}
                    alignOffset={-0.5}
                    className="grid min-w-[10rem] gap-px bg-[var(--dash-color)] p-px font-sans text-sm
                        text-foreground"
                    side="top"
                    align="end"
                >
                    <DropdownMenu.Item
                        className="flex cursor-pointer items-center gap-2 bg-background p-2"
                        onClick={(e) => {
                            e.preventDefault()
                            toggleTheme()
                        }}
                    >
                        {themeToggleProps.icon} {themeToggleProps.label}
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
