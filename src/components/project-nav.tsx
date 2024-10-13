'use client'

import { motion } from 'framer-motion'
import { ChevronLeftIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils'

export interface ProjectNavProps {
    url?: string | null
}

const THRESHOLD = 100

export const ProjectNav = ({ url }: ProjectNavProps) => {
    const [showBar, setShowBar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const scrollDistance = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const scrollY = window.scrollY
                const isAtTop = scrollY === 0

                console.log(scrollDistance.current)
                if (isAtTop) {
                    setShowBar(true)
                    scrollDistance.current = 0
                }

                if (scrollDistance.current > THRESHOLD) {
                    setShowBar(true)
                    scrollDistance.current = THRESHOLD
                    return
                }

                if (scrollDistance.current < -THRESHOLD) {
                    setShowBar(false)
                    scrollDistance.current = -THRESHOLD
                    return
                }

                scrollDistance.current += lastScrollY - scrollY
                setLastScrollY(scrollY)
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
        <motion.nav
            initial={{ y: -120, opacity: 0.8 }}
            animate={{ y: showBar ? 0 : -120, opacity: showBar ? 1 : 0.8 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
            // @ts-expect-error
            className={cn(
                `sticky top-0 z-40 -ml-[1%] mb-[40px] w-[102%] @[800px]:-ml-[15%]
                @[800px]:w-[130%] sm:mb-[40px]`
            )}
        >
            <div className="relative h-[100px] rounded-b-lg bg-background sm:h-[100px]">
                <div
                    className="absolute bottom-0 left-0 flex h-[60px] w-full justify-between rounded-t-lg
                        bg-[#ededed] dark:bg-[#191919]"
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
                </div>
            </div>
        </motion.nav>
    )
}
