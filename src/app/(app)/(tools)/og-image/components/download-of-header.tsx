import {
    AnimatePresence,
    AnimationProps,
    motion,
    useReducedMotion,
} from 'framer-motion'
import { CheckIcon, MessageSquareShareIcon } from 'lucide-react'
import { useState } from 'react'

export interface DownloadOGHeaderProps {
    onDownload: () => Promise<void>
}

export const DownloadOGHeader = ({ onDownload }: DownloadOGHeaderProps) => {
    const [isClicked, setIsClicked] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    const handleDownload = async () => {
        setIsClicked(true)
        await onDownload()
        setTimeout(() => setIsClicked(false), 3000)
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
            className="flex w-[140px] shrink-0 items-center gap-1 rounded border-[1px]
                border-foreground/10 bg-foreground/[0.04] p-3 px-3 py-2 font-sans text-sm
                font-medium text-foreground backdrop-blur-sm dark:bg-foreground/[0.018]"
            onClick={handleDownload}
        >
            <AnimatePresence mode="wait">
                {isClicked ? (
                    <motion.div
                        key="clicked"
                        {...animationProps}
                        transition={{ duration: 0.2 }}
                        // @ts-expect-error
                        className="flex items-center gap-2"
                    >
                        <CheckIcon className="-ml-1 h-4 stroke-[3px] text-green-500" />
                        Downloaded
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
                        Download
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
