'use client'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { SettingsMenu } from './settings'
import { TextScaffold } from './text-scaffold'

export const Footer = () => {
    return (
        <nav className="relative pb-[40px]">
            <TextScaffold className="justify-between">
                <ul className="flex flex-col flex-wrap gap-x-6 gap-y-3">
                    <Button label="home" href="/" />
                    <Button label="about" href="/about" />
                    <Button label="about" href="/about" />
                </ul>
                <ul className="flex h-full flex-col items-end justify-between gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <li>
                            <Link href="https://www.linkedin.com/in/itaysarfaty/">
                                <LinkedinIcon className="stroke-[0.7] hover:stroke-1" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://github.com/itaysarfaty">
                                <GithubIcon className="stroke-[0.7px] hover:stroke-1" />
                            </Link>
                        </li>
                    </div>
                    <li className="absolute bottom-[40px] right-0 grid place-items-center">
                        <SettingsMenu />
                    </li>
                </ul>
            </TextScaffold>
        </nav>
    )
}

const Button = ({ label, href }: { label: string; href: string }) => {
    const pathName = usePathname()
    const highlight = pathName === href
    return (
        <li>
            <Link href={href}>
                <p className={cn('text-2xl', highlight ? 'font-semibold' : '')}>
                    {label}
                </p>
            </Link>
        </li>
    )
}
