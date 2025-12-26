'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

import { GreetingMarkdownRenderer } from '@/components/greeting-markdown'
import { Hero } from '@/components/hero'
import { HoldToReveal } from '@/components/hold-to-reveal'

interface GreetingViewProps {
    greeting: string
}

export function GreetingView({ greeting }: GreetingViewProps) {
    const [isRevealed, setIsRevealed] = useState(false)

    const timeOfDay = useMemo(() => {
        const hour = new Date().getHours()
        if (hour < 12) return 'morning'
        else if (hour < 18) return 'afternoon'
        else return 'evening'
    }, [])

    return (
        <div className="w-full space-y-8">
            <Hero
                title={`Good ${timeOfDay}!`}
                subTitle={`Reveal your personal message below`}
            />

            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="hold-to-reveal"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: 0.5 }}
                    >
                        <HoldToReveal onReveal={() => setIsRevealed(true)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="greeting-content"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.4,
                            duration: 0.8,
                        }}
                        className="mx-auto max-w-2xl space-y-8 pb-20"
                    >
                        <GreetingMarkdownRenderer content={greeting} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
