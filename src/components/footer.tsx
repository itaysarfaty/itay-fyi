'use client'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

import { cn } from '@/utils'

import { useIsMobile } from '@/hooks/is-mobile'

import { AnimateBgToggle } from './animate-bg-toggle'
import { MotionLink } from './motion-link'
import { ThemeToggle } from './theme-toggle'
import { Tooltip } from './tooltip'

export const Footer = () => {
    const isMobile = useIsMobile()
    return (
        <nav className="pb-[40px]">
            <div className="relative">
                <ul className="flex flex-col gap-4">
                    <Button label="Home" href="/" />
                    <Button label="About" href="/about" />
                    <Button label="Projects" href="/projects" />
                    <Button label="Tools" href="/tools" />
                </ul>
                <div
                    className="flex h-full flex-col items-end justify-between
                        gap-4"
                >
                    <div className="absolute right-0 bottom-0 flex gap-5">
                        {!isMobile && <AnimateBgToggle />}
                        <ThemeToggle />
                        <IconButton
                            label="Github"
                            href="https://github.com/itaysarfaty"
                            umamiEvent="Github button"
                        >
                            <GithubIcon className="stroke-[0.7px]" />
                        </IconButton>
                        <IconButton
                            label="LinkedIn"
                            href="https://www.linkedin.com/in/itaysarfaty/"
                            umamiEvent="Linkedin button"
                        >
                            <LinkedinIcon className="stroke-[0.7px]" />
                        </IconButton>
                    </div>
                </div>
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
        <MotionLink
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event={umamiEvent}
            className="h-fit cursor-pointer"
            initial={{ rotate: 0 }}
            whileHover={{
                rotate: [0, 7, -7, 0],
                transition: {
                    type: 'tween',
                    duration: 0.5,
                },
            }}
        >
            <Tooltip context={label} side="top">
                <AccessibleIcon label={label}>{children}</AccessibleIcon>
            </Tooltip>
        </MotionLink>
    )
}

const Button = ({ label, href }: { label: string; href: string }) => {
    const pathName = usePathname()
    const highlight = pathName === href
    return (
        <li>
            <Link href={href} className={cn(highlight ? 'font-medium' : '')}>
                {label}
            </Link>
        </li>
    )
}
