import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface TooltipProps {
    children: React.ReactNode
    context: string
    side?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
    className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    context,
    side = 'top',
    delay = 500,
    className = '',
}) => {
    const [shouldShow, setShouldShow] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setShouldShow(true)
        }, delay)
    }

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setShouldShow(false)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const getTooltipClasses = () => {
        const baseClasses =
            'absolute px-2 py-1 bg-popover text-popover-foreground text-xs rounded whitespace-nowrap z-50 pointer-events-none  border border-border'

        const positionClasses = {
            top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
            left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
            right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
        }

        return `${baseClasses} ${positionClasses[side]}`
    }

    return (
        <div
            className={`relative inline ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <AnimatePresence>
                {shouldShow && (
                    <motion.div
                        className={getTooltipClasses()}
                        role="tooltip"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0,
                        }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0,
                        }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        {context}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
