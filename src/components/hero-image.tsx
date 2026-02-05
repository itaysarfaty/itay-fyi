'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export const HeroImage = ({ src }: { src: string }) => {
    return (
        <motion.div
            className="blob-morph relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden sm:h-40
                sm:w-40"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
            }}
        >
            <Image
                src={src}
                alt="Headshot"
                className="h-full w-full object-cover dark:brightness-[0.8]"
                fill
            />
        </motion.div>
    )
}
