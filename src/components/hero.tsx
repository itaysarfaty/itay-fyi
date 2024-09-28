'use client'

import { motion } from 'framer-motion'

import { cn } from '@/utils'

import { HeroHeadShot } from './hero-head-shot'
import TextAnim from './text-animation/text-animation'

export interface HeaderProps {
    title: string
    subTitle: string
    className?: string
    showHeadshot?: boolean
}

export const Hero = ({
    title,
    subTitle,
    className,
    showHeadshot = false,
}: HeaderProps) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // @ts-ignore
            className={cn(
                'flex h-[calc(100svh-84px)] w-full items-center @container',
                className
            )}
        >
            <div className="flex items-center gap-8 sm:gap-12">
                {showHeadshot && <HeroHeadShot />}
                <header className="grid w-full gap-3">
                    <h1 className="text-4xl font-normal">{title}</h1>
                    <TextAnim text={subTitle} />
                </header>
            </div>
        </motion.section>
    )
}
