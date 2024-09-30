'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const HeroImage = ({ src }: { src: string }) => {
    return (
        <motion.div
            // @ts-ignore
            className="relative h-[6rem] w-[6rem] flex-shrink-0 overflow-hidden rounded-full
                sm:h-[8rem] sm:w-[8rem]"
            initial={{ rotate: 0 }}
            animate={{
                rotate: [0, 2, 0],
            }}
            transition={{
                duration: 1.2,
                ease: 'easeInOut',
                delay: 1.5,
                type: 'tween',
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
