'use client'

import { motion } from 'framer-motion'

import { cn } from '@/utils'

import { HeroImage } from './hero-image'
import TextAnim from './text-animation/text-animation'

export interface HeaderProps {
    title: string
    subTitle: string
    className?: string
    imageSrc?: string
}

export const Hero = ({ title, subTitle, className, imageSrc }: HeaderProps) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // @ts-ignore
            className={cn(
                'flex h-[calc(100svh-84px)] w-full items-center',
                className
            )}
        >
            <div className="flex items-center gap-8 sm:gap-12">
                {imageSrc && <HeroImage src={imageSrc} />}
                <header className="grid w-full gap-3">
                    <h1 className="text-bg w-fit text-4xl font-normal">
                        {title}
                    </h1>
                    <TextAnim text={subTitle} />
                </header>
            </div>
        </motion.section>
    )
}
