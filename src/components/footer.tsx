'use client'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

import { cn } from '@/lib/utils'

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

                            <Link
                                href="https://github.com/itaysarfaty"
                                data-umami-event="Github button"
                            >
                                <AccessibleIcon.Root label="github">
                                    <GithubIcon className="stroke-[0.7px] hover:stroke-1" />
                                </AccessibleIcon.Root>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/itaysarfaty/"
                                data-umami-event="Linkedin button"
                            >
                                <AccessibleIcon.Root label="linkedin">
                                    <LinkedinIcon className="stroke-[0.7] hover:stroke-1" />
                                </AccessibleIcon.Root>
                            </Link>
                        </div>
                    </div>
                </TextScaffold>
            </div>
        </nav>
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
