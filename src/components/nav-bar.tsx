'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TextScaffold } from './text-scaffold'
import { GithubIcon, LinkedinIcon } from 'lucide-react'

export const NavBar = () => {
  return (
    <div>
      <nav className="pb-[40px]">
        <TextScaffold className="justify-between">
          <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 sm:gap-x-10 gap-y-3">
            <NavButton label="home" href="/" />
            <NavButton label="about" href="/about" />
          </ul>
          <ul className="flex flex-row flex-wrap gap-x-6 ">
            <NavButton href="https://www.linkedin.com/in/itaysarfaty/">
              <LinkedinIcon className="stroke-[0.7] hover:stroke-1" />
            </NavButton>
            <NavButton href="https://github.com/itaysarfaty">
              <GithubIcon className="stroke-[0.7px] hover:stroke-1" />
            </NavButton>
          </ul>
        </TextScaffold>
      </nav>
    </div>
  )
}

const NavButton = ({
  label,
  href,
  children,
}: {
  label?: string
  href: string
  children?: React.ReactNode
}) => {
  const pathName = usePathname()
  const highlight = pathName === href
  return (
    <li>
      <Link href={href}>
        {children}
        {label && <p className={cn('text-2xl', highlight ? 'font-semibold' : '')}>{label}</p>}
      </Link>
    </li>
  )
}
