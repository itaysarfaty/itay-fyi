'use client'

import {
    AnimatePresence,
    AnimationProps,
    motion,
    useReducedMotion,
} from 'framer-motion'
import { CheckIcon, MessageSquareShareIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface SharePertButtonProps {
    best: number
    likely: number
    worst: number
}

export const SharePertButton = ({
    best,
    likely,
    worst,
}: SharePertButtonProps) => {
    const [isShared, setIsShared] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    const onShare = () => {
        if (!navigator.clipboard || isShared) return
        // Copy to clipboard
        navigator.clipboard.writeText(
            `${window.location.origin}${window.location.pathname}?b=${best}&l=${likely}&w=${worst}`
        )
        setIsShared(true)
        setTimeout(() => setIsShared(false), 3000)
    }

    const animationProps: AnimationProps = shouldReduceMotion
        ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
          }
        : {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 10 },
          }

    return (
        <motion.button
            layout
            // @ts-ignore
            className="flex w-full shrink-0 items-center gap-1 rounded bg-foreground px-3 py-2
                font-sans text-sm font-normal text-background @xs:w-[98.23px]"
            onClick={onShare}
        >
            <AnimatePresence mode="wait">
                {isShared ? (
                    <motion.div
                        key="copied"
                        {...animationProps}
                        transition={{ duration: 0.2 }}
                        // @ts-ignore
                        className="flex items-center gap-1"
                    >
                        <CheckIcon className="-ml-1 h-4" />
                        Copied
                    </motion.div>
                ) : (
                    <motion.div
                        key="pending"
                        {...animationProps}
                        transition={{ duration: 0.2 }}
                        // @ts-ignore
                        className="flex items-center gap-1"
                    >
                        <MessageSquareShareIcon className="-ml-1 h-4" />
                        Share it
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
