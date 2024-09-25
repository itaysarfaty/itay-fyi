'use client'

import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

import { cn } from '@/utils'

import { TextScaffold } from './text-scaffold'
import { ThemeToggle } from './theme-toggle'

export const Footer = () => {
    return (
        <nav className="pb-[40px]">
            <div className="relative">
                <TextScaffold className="justify-between">
                    <ul className="flex flex-col flex-wrap gap-x-6 gap-y-3">
                        <Button
                            label="home"
                            href="/"
                            umamiEvent="Home button"
                        />
                        <Button
                            label="about"
                            href="/about"
                            umamiEvent="About button"
                        />
                        <Button
                            label="projects"
                            href="/projects"
                            umamiEvent="Projects button"
                        />
                    </ul>
                    <div className="flex h-full flex-col items-end justify-between gap-4">
                        <div className="absolute bottom-0 right-0 flex gap-5">
                            <ThemeToggle />
                            <IconButton
                                label="github"
                                href="https://github.com/itaysarfaty"
                                umamiEvent="Github button"
                            >
                                <GithubIcon className="stroke-[0.7px]" />
                            </IconButton>
                            <IconButton
                                label="linkedin"
                                href="https://www.linkedin.com/in/itaysarfaty/"
                                umamiEvent="Linkedin button"
                            >
                                <LinkedinIcon className="stroke-[0.7px]" />
                            </IconButton>
                        </div>
                    </div>
                </TextScaffold>
            </div>
        </nav>
    )
}

const IconButton = ({
    label,
    href,
    umamiEvent,
    children,
}: {
    label: string
    href: string
    umamiEvent?: string
    children: React.ReactNode
}) => {
    return (
        <motion.span
            whileHover={{
                rotate: [0, 7, -7, 0],
                transition: {
                    type: 'tween',
                    duration: 0.5,
                },
            }}
        >
            <Link
                href={href}
                data-umami-event={umamiEvent}
                className="cursor-pointer"
            >
                <AccessibleIcon label={label}>{children}</AccessibleIcon>
            </Link>
        </motion.span>
    )
}

const Button = ({
    label,
    href,
    umamiEvent,
}: {
    label: string
    href: string
    umamiEvent: string
}) => {
    const pathName = usePathname()
    const highlight = pathName === href
    return (
        <li>
            <Link
                href={href}
                data-umami-event={umamiEvent}
                className={cn('text-xl', highlight ? 'font-bold' : '')}
            >
                {label}
            </Link>
        </li>
    )
}
