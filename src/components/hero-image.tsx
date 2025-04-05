'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'

export const HeroImage = ({ src }: { src: string }) => {
    return (
        <Tilt
            tiltMaxAngleX={26}
            tiltMaxAngleY={26}
            transitionSpeed={8000}
            glareBorderRadius="100%"
            className="rounded-full"
            glarePosition="bottom"
            glareMaxOpacity={0.25}
            perspective={400}
            glareEnable
            gyroscope
        >
            <motion.div
                className="relative h-[6rem] w-[6rem] flex-shrink-0 overflow-hidden rounded-full
                    sm:h-[11rem] sm:w-[11rem]"
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
        </Tilt>
    )
}
