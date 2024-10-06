'use client'

import { motion } from 'framer-motion'
import { ChevronLeftIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/utils'

export interface ProjectNavProps {
    url?: string | null
}

export const ProjectNav = ({ url }: ProjectNavProps) => {
    const [showBar, setShowBar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY < lastScrollY || window.scrollY < 50) {
                    setShowBar(true)
                } else {
                    setShowBar(false)
                }
                setLastScrollY(window.scrollY)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [lastScrollY])

    return (
        <motion.div
            initial={{ y: -120 }}
            animate={{ y: showBar ? 0 : -120 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            // @ts-expect-error
            className={cn(
                `sticky top-10 z-50 mb-[30px] flex h-[60px] w-full justify-between
                overflow-hidden rounded-lg bg-[#e5e5e5] transition-transform duration-500
                @[800px]:-ml-[15%] @[800px]:w-[130%] dark:bg-[#1a1a1a]`
            )}
        >
            <Link
                href={'/projects'}
                className="flex h-full items-center gap-2 px-6 text-sm font-normal"
            >
                <ChevronLeftIcon className="-ml-1 h-4 w-4 stroke-2" />
                Back
            </Link>
            {url && (
                <Link
                    href={url}
                    className="flex h-full items-center gap-3 px-6 text-sm font-normal"
                >
                    Open
                    <ExternalLinkIcon className="-mr-1 h-4 w-4 stroke-2" />
                </Link>
            )}
        </motion.div>
    )
}
