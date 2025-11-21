'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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
                I have over 2 years of professional experience with a focus on
                product development, where I regularly take ownership of
                ambiguous tasks and turn them into user-centered solutions.
            </p>
        ),
    },
    {
        id: 'cooking',
        title: 'Cooking',
        content: (
            <p>
                I love cooking steak, sometimes dry-aging roasts at home and
                exploring new ways to bring out the flavor and texture.
            </p>
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
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        // Store ref in the map
        if (sectionRef.current) {
            sectionRefs.current.set(section.id, sectionRef.current)
        }
        return () => {
            sectionRefs.current.delete(section.id)
        }
    }, [section.id, sectionRefs])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio
                setIsInView(entry.isIntersecting && ratio > 0.3)
                onInView?.(section.id, ratio)
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

    // Line highlight position based on scroll
    const lineHighlightY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        ['-100%', '0%', '100%', '200%']
    )

    // Line highlight opacity based on scroll
    const lineHighlightOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.3, 0.7, 0.85, 1],
        [0, 0.5, 0.8, 0.8, 0.5, 0]
    )

    return (
        <motion.div
            ref={sectionRef}
            style={{ y, opacity, scale }}
            className="relative flex items-center py-24"
        >
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
                }}
                className="group relative w-full"
            >
                {/* Accent border that appears on scroll - hidden on mobile */}
                <motion.div
                    className="bg-foreground/30 absolute top-0 bottom-0 -left-6
                        hidden w-[1px] md:block"
                >
                    {/* Animated highlight that travels along the line */}
                    <motion.div
                        initial={{ y: '-100%', opacity: 0 }}
                        whileInView={{
                            y: ['0%', '100%'],
                            opacity: [0, 1, 1, 0],
                        }}
                        viewport={{ once: true, margin: '-120px' }}
                        transition={{
                            duration: 2.2,
                            delay: index * 0.08 + 1,
                            ease: [0.22, 1, 0.36, 1],
                            times: [0, 0.1, 0.9, 1],
                        }}
                        className="via-foreground absolute top-0 left-0 h-1/3
                            w-full bg-gradient-to-b from-transparent
                            to-transparent"
                        style={{
                            opacity: isInView ? 0.8 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </motion.div>

                <motion.div style={{ filter: `blur(${blur}px)` }}>
                    <AboutSection title={section.title}>
                        {section.content}
                    </AboutSection>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export const GuidedAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const sectionVisibility = useRef<Map<string, number>>(new Map())
    const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const handleSectionInView = (id: string, ratio: number) => {
        sectionVisibility.current.set(id, ratio)

        // Find the section with the highest visibility ratio
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
    }

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
