'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Hero } from '@/components/hero'

import { pertUtils as utils } from './_utils'
import { SDIndicator } from './components/sd-indicator'
import { SharePertButton } from './components/share-pert-button'
import { TimeInput } from './components/time-input'

type Params = 'b' | 'l' | 'w'

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

const PertContent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const getParamValue = (param: Params) =>
        parseFloat(searchParams.get(param) || '0')
    const best = getParamValue('b')
    const likely = getParamValue('l')
    const worst = getParamValue('w')

    const updateParam = (param: Params, value: number) => {
        const newSearchParams = new URLSearchParams(searchParams)
        if (isNaN(value) || value === 0) {
            newSearchParams.delete(param)
        } else {
            newSearchParams.set(param, value.toString())
        }
        router.replace(`?${newSearchParams.toString()}`, { scroll: false })
    }

    const { estimate, standardDeviation } = utils.calculateHours(
        best,
        likely,
        worst
    )

    return (
        <div className="pb-24">
            <div className="grid gap-20">
                <TimeInput
                    label="Best"
                    value={best}
                    onChange={(val) => updateParam('b', val)}
                />
                <TimeInput
                    label="Likely"
                    value={likely}
                    onChange={(val) => updateParam('l', val)}
                />
                <TimeInput
                    label="Worst"
                    value={worst}
                    onChange={(val) => updateParam('w', val)}
                />

                <div className="grid gap-20 sm:gap-20">
                    <div className="grid gap-4">
                        <h2 className="text-bg w-fit text-lg font-medium text-foreground">
                            Estimate
                        </h2>
                        <div className="flex select-none flex-wrap items-center gap-5">
                            <p className="text-bg w-fit text-base font-normal text-foreground">
                                {utils.hoursToString(
                                    Number(estimate.toFixed(2))
                                )}
                            </p>
                            <div className="flex items-center gap-5">
                                <SDIndicator />
                                <p className="text-bg mb-1 w-fit text-base font-normal text-foreground">
                                    {utils.hoursToString(
                                        Number(standardDeviation.toFixed(2))
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <SharePertButton
                            best={best}
                            likely={likely}
                            worst={worst}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
