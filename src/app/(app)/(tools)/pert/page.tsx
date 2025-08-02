'use client'

import { ClockIcon, RotateCcwIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

import { cn } from '@/utils'

import { pertUtils as utils } from './_utils'
import { AboutPert } from './components/about-pert'
import { CopyPertLink } from './components/copy-pert-link'
import { SDIndicator } from './components/sd-indicator'
import { TimeInput } from './components/time-input'

type Params = 'b' | 'l' | 'w'

const paramMap: Record<Params, string> = {
    b: 'best',
    l: 'likely',
    w: 'worst',
}

const getParamValue = (searchParams: URLSearchParams, param: Params) => {
    return parseFloat(searchParams.get(param) || '0')
}
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

export default function PertSuspenseWrapper() {
    return (
        <Suspense>
            <PertPage />
        </Suspense>
    )
}

function PertPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [hours, setHours] = useState({
        best: getParamValue(searchParams, 'b'),
        likely: getParamValue(searchParams, 'l'),
        worst: getParamValue(searchParams, 'w'),
    })

    const handleParamUpdate = (param: Params, value: number) => {
        setHours((prev) => ({ ...prev, [paramMap[param]]: value }))
        const newSearchParams = updateSearchParams(searchParams, param, value)
        router.replace(`?${newSearchParams.toString()}`, { scroll: false })
    }

    const handleReset = () => {
        setHours({ best: 0, likely: 0, worst: 0 })
        router.replace('/pert', { scroll: false })
    }

    const { estimate, standardDeviation } = utils.calculateHours(
        hours.best,
        hours.likely,
        hours.worst
    )
    const showEstimate = Boolean(hours.best && hours.likely && hours.worst)

    // // If shared remove the shared param and navigate screen down
    useEffect(() => {
        const shared = Boolean(searchParams.get('share'))
        if (shared) {
            const newSearchParams = new URLSearchParams(searchParams.toString())
            newSearchParams.delete('share')
            router.replace(`?${newSearchParams.toString()}`, { scroll: false })

            const element = document.getElementById('pert-estimate')
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'end',
                })
            }
        }
    }, [router, searchParams])

    // If params exists
    return (
        <div className="grid min-h-[calc(100vh-84px)] w-full place-items-center">
            <motion.div className="grid w-full gap-14 py-10">
                <div className="flex flex-row flex-wrap gap-10 sm:gap-16">
                    <TimeInput
                        label="Min"
                        value={hours.best}
                        onChange={(val) => handleParamUpdate('b', val)}
                        classNameDot="bg-green-500"
                    />
                    <TimeInput
                        label="Max"
                        value={hours.worst}
                        onChange={(val) => handleParamUpdate('w', val)}
                        classNameDot="bg-red-500"
                    />
                    <TimeInput
                        label="Likely"
                        value={hours.likely}
                        onChange={(val) => handleParamUpdate('l', val)}
                        classNameDot="bg-yellow-500"
                    />
                </div>

                {showEstimate ? (
                    <div
                        id="pert-estimate"
                        className={cn(
                            'grid min-h-[200px] gap-6 transition-opacity duration-150'
                        )}
                    >
                        <div className="border-foreground/10 grid h-full gap-4 rounded-lg border px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div className="-ml-[2px] flex items-center gap-2">
                                    <ClockIcon className="h-[18px] text-blue-500" />
                                    <h2 className="text-bg text-foreground w-fit text-lg font-medium">
                                        Estimate
                                    </h2>
                                </div>
                                <button onClick={handleReset}>
                                    <AccessibleIcon label="Reset">
                                        <RotateCcwIcon className="h-4" />
                                    </AccessibleIcon>
                                </button>
                            </div>

                            <div className="ml-[2px] flex h-fit min-h-10 flex-wrap items-center gap-5 gap-y-2 select-none">
                                <p className="text-bg text-foreground w-fit text-base font-light">
                                    {utils.hoursToString(
                                        Number(estimate.toFixed(2))
                                    )}
                                </p>
                                {Boolean(standardDeviation) && (
                                    <div className="flex items-center gap-5">
                                        <SDIndicator />
                                        <p className="text-bg text-foreground mb-1 w-fit text-base font-light">
                                            {utils.hoursToString(
                                                Number(
                                                    standardDeviation.toFixed(2)
                                                )
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <CopyPertLink
                                best={hours.best}
                                likely={hours.likely}
                                worst={hours.worst}
                            />
                        </div>
                    </div>
                ) : (
                    <AboutPert />
                )}
            </motion.div>
        </div>
    )
}
