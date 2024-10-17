'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { Hero } from '@/components/hero'

import { pertUtils as utils } from './_utils'
import { SDIndicator } from './components/sd-indicator'
import { SharePertButton } from './components/share-pert-button'
import { TimeInput } from './components/time-input'

type Params = 'b' | 'l' | 'w'

const paramMap: Record<Params, string> = {
    b: 'best',
    l: 'likely',
    w: 'worst',
}

const getParamValue = (searchParams: URLSearchParams, param: Params) =>
    parseFloat(searchParams.get(param) || '0')

const updateSearchParams = (
    searchParams: URLSearchParams,
    param: Params,
    value: number
) => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (isNaN(value) || value === 0) {
        newParams.delete(param)
        return newParams
    }
    newParams.set(param, value.toString())
    return newParams
}

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
    const [hours, setHours] = useState({
        best: getParamValue(searchParams, 'b'),
        likely: getParamValue(searchParams, 'l'),
        worst: getParamValue(searchParams, 'w'),
    })
    const showEstimate = Boolean(hours.best && hours.likely && hours.worst)

    const updateParam = (param: Params, value: number) => {
        setHours((prev) => ({ ...prev, [paramMap[param]]: value }))
        const newSearchParams = updateSearchParams(searchParams, param, value)
        router.replace(`?${newSearchParams.toString()}`, { scroll: false })
    }

    const { estimate, standardDeviation } = utils.calculateHours(
        hours.best,
        hours.likely,
        hours.worst
    )

    return (
        <div className="pb-24">
            <div className="grid gap-20">
                <TimeInput
                    label="Best"
                    value={hours.best}
                    onChange={(val) => updateParam('b', val)}
                />
                <TimeInput
                    label="Likely"
                    value={hours.likely}
                    onChange={(val) => updateParam('l', val)}
                />
                <TimeInput
                    label="Worst"
                    value={hours.worst}
                    onChange={(val) => updateParam('w', val)}
                />

                {showEstimate && (
                    <div className="grid gap-20 sm:gap-20">
                        <div className="grid gap-4">
                            <h2 className="text-bg w-fit text-lg font-medium text-foreground">
                                Estimate
                            </h2>
                            <div className="ml-[2px] flex select-none flex-wrap items-center gap-5">
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
                        <div className="flex justify-end sm:justify-normal">
                            <SharePertButton
                                best={hours.best}
                                likely={hours.likely}
                                worst={hours.worst}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
