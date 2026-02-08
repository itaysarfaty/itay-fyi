'use client'

import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react'
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
            initial={prefersReducedMotion ? { opacity: 0 } : { y: -100 }}
            animate={
                prefersReducedMotion
                    ? { opacity: showBar ? 1 : 0 }
                    : { y: showBar ? 0 : -100 }
            }
            transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: prefersReducedMotion ? 0 : 0.6,
            }}
            className={cn(
                `sticky top-0 z-40 mb-6 -ml-[1%] w-[102%] @[800px]:-ml-[15%]
                @[800px]:w-[130%]`
            )}
        >
            <div
                className="mt-4 flex h-[56px] w-full items-center justify-between rounded-2xl
                    bg-background/70 px-1.5 shadow-lg shadow-foreground/[0.04] ring-1
                    ring-foreground/[0.08] backdrop-blur-lg dark:bg-background/60"
            >
                <Link
                    href="/projects"
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm
                        font-normal transition-colors duration-200
                        hover:bg-foreground/[0.06]"
                >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Projects
                </Link>
                {url && (
                    <>
                        <div className="h-4 w-px bg-foreground/10" />
                        <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm
                                font-normal transition-colors duration-200
                                hover:bg-foreground/[0.06]"
                        >
                            Visit
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                        </Link>
                    </>
                )}
            </div>
        </motion.nav>
    )
}
