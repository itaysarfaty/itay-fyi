'use client'

import {
    AnimatePresence,
    AnimationProps,
    motion,
    useReducedMotion,
} from 'framer-motion'
import { CheckIcon, MessageSquareShareIcon } from 'lucide-react'
import { useState } from 'react'

export interface SharePertButtonProps {
    best: number
    likely: number
    worst: number
}

export const CopyPertLink = ({ best, likely, worst }: SharePertButtonProps) => {
    const [isShared, setIsShared] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    const onShare = () => {
        if (!navigator.clipboard || isShared) return
        // Copy to clipboard
        navigator.clipboard.writeText(
            `${window.location.origin}${window.location.pathname}?share=:&b=${best}&l=${likely}&w=${worst}`
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
            // @ts-expect-error
            className="flex w-[128px] shrink-0 items-center gap-1 rounded border-[1px]
                border-foreground/10 bg-foreground/[0.04] p-3 px-3 py-2 font-sans text-sm
                font-medium text-foreground backdrop-blur-sm dark:bg-foreground/[0.018]"
            onClick={onShare}
        >
            <AnimatePresence mode="wait">
                {isShared ? (
                    <motion.div
                        key="clicked"
                        {...animationProps}
                        transition={{ duration: 0.2 }}
                        // @ts-expect-error
                        className="flex items-center gap-2"
                    >
                        <CheckIcon className="-ml-1 h-4 stroke-[3px] text-green-500" />
                        Copied it
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        {...animationProps}
                        transition={{ duration: 0.2 }}
                        // @ts-expect-error
                        className="flex items-center gap-2"
                    >
                        <MessageSquareShareIcon className="-ml-1 h-4 text-blue-500" />
                        Share link
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}