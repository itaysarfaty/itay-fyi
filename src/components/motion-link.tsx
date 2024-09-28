import { motion } from 'framer-motion'
import Link from 'next/link'
import { ComponentProps, forwardRef } from 'react'

type LinkProps = ComponentProps<typeof Link>

const Component = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link ref={ref} {...props} />
))
Component.displayName = 'MotionLink'

export const MotionLink = motion.create(Component)
