'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AboutSection } from '@/components/about-section'

interface Section {
    id: string
    title: string
    content: React.ReactNode
}

const sections: Section[] = [
    {
        id: 'intro',
        title: 'Hi there',
        content: (
            <p>
                I&apos;m Itay <i>(EE-tie)</i> a software engineer based in New
                York. I work at CargoMatrix, a company that&apos;s been
                innovating the logistics industry for over 20 years.
            </p>
        ),
    },
    {
        id: 'experience',
        title: 'Experience',
        content: (
            <p>
                I have almost 3 years of professional experience with a focus on
                product development, where I regularly take ownership of
                ambiguous tasks and turn them into user-centered solutions.
            </p>
        ),
    },
    {
        id: 'food',
        title: 'Food',
        content: (
            <>
                <p>
                    I&apos;ve always been a food person, so a lot of my side
                    projects tend to live somewhere between the kitchen and the
                    keyboard.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                    <Link
                        href="https://reciperemi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link"
                    >
                        <span className="flex items-center gap-1.5 font-medium">
                            Remi
                            <ExternalLinkIcon
                                className="text-foreground/40
                                    group-hover/link:text-foreground h-3 w-3
                                    transition-all duration-200
                                    group-hover/link:translate-x-0.5
                                    group-hover/link:-translate-y-0.5"
                            />
                        </span>
                        <span
                            className="text-foreground/80 mt-0.5 block
                                text-base"
                        >
                            AI-powered family cookbook
                        </span>
                    </Link>
                    <div className="bg-foreground/10 h-px w-1/2" />
                    <Link
                        href="https://apps.apple.com/us/app/rechek/id6749420397"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link"
                    >
                        <span className="flex items-center gap-1.5 font-medium">
                            Rechek
                            <ExternalLinkIcon
                                className="text-foreground/40
                                    group-hover/link:text-foreground h-3 w-3
                                    transition-all duration-200
                                    group-hover/link:translate-x-0.5
                                    group-hover/link:-translate-y-0.5"
                            />
                        </span>
                        <span
                            className="text-foreground/80 mt-0.5 block
                                text-base"
                        >
                            NYC restaurant inspections with on-device AI
                        </span>
                    </Link>
                </div>
            </>
        ),
    },
    {
        id: 'education',
        title: 'Education',
        content: (
            <p>
                Bachelor of Science in Computer Science, Binghamton University,
                Class of 2022
            </p>
        ),
    },
    {
        id: 'contact',
        title: 'Have a question?',
        content: (
            <Link
                href={'https://www.linkedin.com/in/itaysarfaty/'}
                data-umami-event="Linkedin connect button"
                className="inline-block"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p className="text-bg flex items-center gap-2">
                    Connect with me on LinkedIn
                    <ExternalLinkIcon
                        className="text-foreground h-4 w-4 stroke-[0.8]"
                    />
                </p>
            </Link>
        ),
    },
]

// Character cascade title component
const CascadeTitle = ({ title, index }: { title: string; index: number }) => {
    const chars = title.split('')
    return (
        <>
            {chars.map((char, charIndex) => (
                <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.08 + charIndex * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </>
    )
}

interface AnimatedSectionProps {
    section: Section
    index: number
    onInView?: (id: string, ratio: number) => void
    sectionRefs: React.RefObject<Map<string, HTMLDivElement | null>>
}

const AnimatedSection = ({
    section,
    index,
    onInView,
    sectionRefs,
}: AnimatedSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const refs = sectionRefs.current
        if (sectionRef.current) {
            refs.set(section.id, sectionRef.current)
        }
        return () => {
            refs.delete(section.id)
        }
    }, [section.id, sectionRefs])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                onInView?.(section.id, entry.intersectionRatio)
            },
            {
                threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
                rootMargin: '-10% 0px -10% 0px',
            }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [section.id, onInView])

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    // Parallax effect - subtle upward movement
    const y = useTransform(scrollYProgress, [0, 1], [60, -60])

    // Opacity fade in/out with smoother transitions
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.3, 0.7, 0.85, 1],
        [0, 0.5, 1, 1, 0.5, 0.2]
    )

    // Scale effect for depth
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [0.92, 0.98, 1, 0.98, 0.95]
    )

    // Blur effect for sections going out of view
    const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [5, 0, 0, 3])

    // Scroll-driven line fill
    const lineFill = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
    const dotTop = useTransform(lineFill, (v) => `${v * 100}%`)
    const dotOpacity = useTransform(
        scrollYProgress,
        [0.08, 0.15, 0.85, 0.92],
        [0, 1, 1, 0]
    )

    // Background number parallax — moves slightly faster than content
    const numberY = useTransform(scrollYProgress, [0, 1], [80, -80])

    // Title character count for content delay calculation
    const titleChars = section.title.split('')
    const contentDelay = index * 0.08 + titleChars.length * 0.03 + 0.1

    // Formatted section number
    const sectionNumber = String(index + 1).padStart(2, '0')

    return (
        <motion.div
            ref={sectionRef}
            style={{ y, opacity, scale }}
            className="relative flex items-center py-24"
        >
            {/* Large background section number — outside overflow container */}
            <motion.div
                className="text-foreground/[0.06] pointer-events-none absolute
                    top-0 right-0 text-[8rem] leading-none font-extralight
                    select-none"
                style={{ y: numberY }}
                aria-hidden="true"
            >
                {sectionNumber}
            </motion.div>

            <div className="group relative w-full overflow-hidden">
                {/* Scroll-driven progress line — hidden on mobile */}
                <div
                    className="absolute top-0 bottom-0 -left-6 hidden w-[1px]
                        md:block"
                >
                    {/* Base track */}
                    <div className="bg-foreground/10 absolute inset-0" />
                    {/* Active fill */}
                    <motion.div
                        className="bg-foreground/60 absolute top-0 left-0 h-full
                            w-full origin-top"
                        style={{ scaleY: lineFill }}
                    />
                    {/* Leading dot with glow */}
                    <motion.div
                        className="bg-foreground/60 absolute -left-[1px] h-[3px]
                            w-[3px] rounded-full"
                        style={{
                            top: dotTop,
                            opacity: dotOpacity,
                            boxShadow: '0 0 6px hsl(var(--foreground) / 0.2)',
                        }}
                    />
                </div>

                <motion.div style={{ filter: `blur(${blur}px)` }}>
                    <AboutSection
                        title={section.title}
                        titleElement={
                            <CascadeTitle title={section.title} index={index} />
                        }
                    >
                        {/* Content paragraph fade-in */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 12,
                                filter: 'blur(4px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: contentDelay,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {section.content}
                        </motion.div>
                    </AboutSection>
                </motion.div>
            </div>
        </motion.div>
    )
}

export const GuidedAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const sectionVisibility = useRef<Map<string, number>>(new Map())
    const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

    const handleSectionInView = useCallback((id: string, ratio: number) => {
        sectionVisibility.current.set(id, ratio)

        let maxRatio = 0
        let mostVisibleSection: string | null = null

        sectionVisibility.current.forEach((value, key) => {
            if (value > maxRatio) {
                maxRatio = value
                mostVisibleSection = key
            }
        })

        if (mostVisibleSection && maxRatio > 0.2) {
            setActiveSection(mostVisibleSection)
        }
    }, [])

    const scrollToSection = (id: string) => {
        const element = sectionRefs.current.get(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }

    return (
        <div ref={containerRef} className="relative">
            {/* Progress indicator */}
            <div
                className="fixed top-1/2 right-8 z-10 hidden -translate-y-1/2
                    md:block"
            >
                <div className="flex flex-col items-center gap-4">
                    {sections.map((section, index) => {
                        const isActive = activeSection === section.id
                        return (
                            <motion.div
                                key={section.id}
                                className="group relative flex items-center
                                    justify-end"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                {/* Tooltip label */}
                                <motion.div
                                    className="pointer-events-none absolute
                                        right-5 mr-2 opacity-0
                                        transition-opacity duration-200
                                        group-hover:opacity-100"
                                    initial={{ x: 10 }}
                                    whileHover={{ x: 0 }}
                                >
                                    <span
                                        className="text-bg rounded-md px-2 py-1
                                            text-xs whitespace-nowrap"
                                    >
                                        {section.title}
                                    </span>
                                </motion.div>

                                {/* Indicator dot */}
                                <motion.button
                                    onClick={() => scrollToSection(section.id)}
                                    className="cursor-pointer rounded-full
                                        border-0 p-0"
                                    animate={{
                                        width: isActive ? 10 : 8,
                                        height: isActive ? 10 : 8,
                                        backgroundColor: isActive
                                            ? 'hsl(var(--foreground) / 0.8)'
                                            : 'hsl(var(--foreground) / 0.25)',
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    whileHover={{
                                        backgroundColor:
                                            'hsl(var(--foreground) / 0.6)',
                                        scale: 1.3,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Main content */}
            <div className="grid gap-32 pb-[150px]">
                {sections.map((section, index) => (
                    <AnimatedSection
                        key={section.id}
                        section={section}
                        index={index}
                        onInView={handleSectionInView}
                        sectionRefs={sectionRefs}
                    />
                ))}
            </div>
        </div>
    )
}
