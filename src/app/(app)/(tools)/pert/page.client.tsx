import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/utils'

import { pertUtils as utils } from './_utils'
import { CopyPertLink } from './components/copy-pert-link'
import { SDIndicator } from './components/sd-indicator'
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

export const PertContent = () => {
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

    const shared = Boolean(searchParams.get('share'))
    // If shared remove the shared param and navigate screen down

    useEffect(() => {
        if (shared) {
            const newSearchParams = new URLSearchParams(searchParams.toString())
            newSearchParams.delete('share')
            router.replace(`?${newSearchParams.toString()}`, { scroll: false })

            // Scroll window down
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [shared])

    // If params exists
    return (
        <div className="pb-24">
            {/* @ts-expect-error */}
            <motion.div className="grid gap-14">
                <div className="flex flex-col gap-14 sm:flex-row sm:gap-16">
                    <TimeInput
                        label="Shortest"
                        value={hours.best}
                        onChange={(val) => updateParam('b', val)}
                        classNameDot="bg-green-500"
                    />
                    <TimeInput
                        label="Longest"
                        value={hours.worst}
                        onChange={(val) => updateParam('w', val)}
                        classNameDot="bg-red-500"
                    />
                    <TimeInput
                        label="Most Likely"
                        value={hours.likely}
                        onChange={(val) => updateParam('l', val)}
                        classNameDot="bg-blue-500"
                    />
                </div>

                <div
                    className={cn(
                        'grid gap-20 transition-opacity duration-150 sm:gap-20',
                        showEstimate ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <div className="grid gap-4">
                        <h2 className="text-bg w-fit text-lg font-medium text-foreground">
                            Estimate
                        </h2>
                        <div className="ml-[2px] flex select-none flex-wrap items-center gap-5">
                            <p className="text-bg w-fit text-base font-light text-foreground">
                                {utils.hoursToString(
                                    Number(estimate.toFixed(2))
                                )}
                            </p>
                            {Boolean(standardDeviation) && (
                                <div className="flex items-center gap-5">
                                    <SDIndicator />
                                    <p className="text-bg mb-1 w-fit text-base font-light text-foreground">
                                        {utils.hoursToString(
                                            Number(standardDeviation.toFixed(2))
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <CopyPertLink
                        best={hours.best}
                        likely={hours.likely}
                        worst={hours.worst}
                    />
                </div>
            </motion.div>
        </div>
    )
}
