'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '@/utils'

import { HeroImage } from './hero-image'
import TextAnim from './text-animation'

export interface HeaderProps {
    title: string
    subTitle: string
    className?: string
    imageSrc?: string
}

export const Hero = ({ title, subTitle, className, imageSrc }: HeaderProps) => {
    const [height, setHeight] = useState<string>('')

    useEffect(() => {
        setHeight(`${window.innerHeight - 84}px`)
        // Clean up the event listener
    }, [])

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // @ts-ignore
            className={cn(
                'flex w-full items-center',
                className,
                height ? '' : 'h-[calc(100vh-84px)]'
            )}
            style={{ height }}
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
