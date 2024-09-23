'use client'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { TextScaffold } from './text-scaffold'

export const Footer = () => {
    return (
        <div>
            <nav className="pb-[40px]">
                <TextScaffold className="justify-between">
                    <ul className="flex flex-col flex-wrap gap-x-6 gap-y-3 sm:flex-row sm:gap-x-10">
                        <Button label="home" href="/" />
                        <Button label="about" href="/about" />
                    </ul>
                    <ul className="flex flex-row flex-wrap gap-x-6">
                        <Link href="https://www.linkedin.com/in/itaysarfaty/">
                            <LinkedinIcon className="stroke-[0.7] hover:stroke-1" />
                        </Link>
                        <Link href="https://github.com/itaysarfaty">
                            <GithubIcon className="stroke-[0.7px] hover:stroke-1" />
                        </Link>
                    </ul>
                </TextScaffold>
            </nav>
        </div>
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
