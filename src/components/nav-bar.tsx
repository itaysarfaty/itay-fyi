'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TextScaffold } from './text-scaffold'

export const NavBar = () => {
  return (
    <TextScaffold>
      <nav>
        <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 sm:gap-x-10 gap-y-2">
          <NavButton label="home" href="/" />
          <NavButton label="about" href="/about" />
          <NavButton label="projects" href="/projects" />
          <NavButton label="contact" href="/contact" />
        </ul>
      </nav>
    </TextScaffold>
  )
}

const NavButton = ({ label, href }: { label: string; href: string }) => {
  const pathName = usePathname()
  const highlight = pathName === href
  return (
    <li>
      <Link href={href}>
        <p className={cn('text-2xl', highlight ? 'font-medium' : '')}>{label}</p>
      </Link>
    </li>
  )
}
