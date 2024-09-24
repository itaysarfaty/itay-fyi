'use client'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { SettingsMenu } from './settings'
import { TextScaffold } from './text-scaffold'

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
                    </ul>
                    <div className="flex h-full flex-col items-end justify-between gap-4">
                        <ul className="flex flex-row items-center gap-4">
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/itaysarfaty/"
                                    data-umami-event="Linkedin button"
                                >
                                    <LinkedinIcon className="stroke-[0.7] hover:stroke-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://github.com/itaysarfaty"
                                    data-umami-event="Github button"
                                >
                                    <GithubIcon className="stroke-[0.7px] hover:stroke-1" />
                                </Link>
                            </li>
                        </ul>
                        <span className="absolute bottom-0 right-0 grid place-items-center">
                            <SettingsMenu />
                        </span>
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
            <Link href={href} data-umami-event={umamiEvent}>
                <p className={cn('text-2xl', highlight ? 'font-semibold' : '')}>
                    {label}
                </p>
            </Link>
        </li>
    )
}
