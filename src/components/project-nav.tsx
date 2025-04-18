'use client'

import { ChevronLeftIcon, ExternalLinkIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
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
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const scrollY = window.scrollY
                const isAtTop = scrollY === 0

                if (isAtTop) {
                    setShowBar(true)
                    scrollDistance.current = 0
                }

                if (scrollDistance.current > THRESHOLD) {
                    setShowBar(true)
                    scrollDistance.current = THRESHOLD
                    return
                }

                if (scrollDistance.current < -20) {
                    setShowBar(false)
                    scrollDistance.current = -20
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
            initial={prefersReducedMotion ? { opacity: 0.0 } : { y: -120 }}
            animate={
                prefersReducedMotion
                    ? { opacity: showBar ? 1 : 0.0 }
                    : { y: showBar ? 0 : -120 }
            }
            transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: prefersReducedMotion ? 0.0 : 0.7,
            }}
            className={cn(
                `sticky top-0 z-40 mb-[40px] -ml-[1%] w-[102%] sm:mb-[40px] @[800px]:-ml-[15%]
                @[800px]:w-[130%]`
            )}
        >
            <div className="bg-background relative h-[100px] rounded-b-lg sm:h-[100px]">
                <div
                    className="bg-foreground/[0.05] dark:bg-foreground/[0.04] absolute bottom-0 left-0 flex
                        h-[60px] w-full justify-between rounded-lg backdrop-blur-xs"
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
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-full items-center gap-3 px-6 text-sm font-normal"
                        >
                            View
                            <ExternalLinkIcon className="-mr-1 h-4 w-4 stroke-2" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}
