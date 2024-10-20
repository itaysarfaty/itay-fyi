'use client'

import { Suspense } from 'react'

import { Hero } from '@/components/hero'

import { PertContent } from './page.client'

export default function PertPage() {
    return (
        <>
            <Hero title="Pert" subTitle="Improving Task Estimates" />
            <Suspense>
                <PertContent />
            </Suspense>
        </>
    )
}
