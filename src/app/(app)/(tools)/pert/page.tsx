'use client'

import {
    BadgeAlertIcon,
    CircleHelp,
    FrownIcon,
    MessageSquareShareIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Hero } from '@/components/hero'

const calculateHours = (best: number, likely: number, worst: number) => {
    const estimate = (best + 4 * likely + worst) / 6
    const standardDeviation = (worst - best) / 6
    return {
        estimate,
        standardDeviation,
    }
}

const hoursToString = (hours: number) => {
    const units = [
        { label: 'month', value: 0 },
        { label: 'week', value: 0 },
        { label: 'day', value: 0 },
        { label: 'hr', value: Math.floor(hours) },
        {
            label: 'min',
            value: Math.floor((hours - Math.floor(hours)) * 60),
        },
    ]

    // Calculate days, weeks, and months
    units[2].value = Math.floor(units[3].value / 24)
    units[3].value = units[3].value % 24
    units[1].value = Math.floor(units[2].value / 7)
    units[2].value = units[2].value % 7
    units[0].value = Math.floor(units[1].value / 4)
    units[1].value = units[1].value % 4

    // Construct the result string
    return units
        .filter((unit) => unit.value > 0)
        .map(
            (unit) => `${unit.value} ${unit.label}${unit.value > 1 ? 's' : ''}`
        )
        .join('  ')
}

export default function PertPage() {
    const [best, setBest] = useState(4)
    const [likely, setLikely] = useState(7)
    const [worst, setWorst] = useState(5)

    const [debouncedValues, setDebouncedValues] = useState({
        best,
        likely,
        worst,
    })

    const { estimate, standardDeviation } = calculateHours(
        debouncedValues.best,
        debouncedValues.likely,
        debouncedValues.worst
    )

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValues({ best, likely, worst })
        }, 300) // Adjust the debounce delay as needed

        return () => {
            clearTimeout(handler)
        }
    }, [best, likely, worst])
    return (
        <>
            <Hero title="Pert" subTitle="Improving Task Estimates" />
            <div className="pb-24">
                <div className="-mb-6 flex w-full items-center justify-end">
                    <button className="text-bg flex items-center gap-3 text-sm">
                        Learn how
                        <CircleHelp className="h-5 w-5 stroke-[1.8px]" />
                    </button>
                </div>

                <div className="grid gap-20 sm:gap-24">
                    <TimeInput label="Best" value={best} onChange={setBest} />
                    <TimeInput
                        label="Likely"
                        value={likely}
                        onChange={setLikely}
                    />
                    <TimeInput
                        label="Worst"
                        value={worst}
                        onChange={setWorst}
                    />

                    <div className="grid gap-14 sm:flex sm:items-center sm:justify-between">
                        <div className="ml-1 grid select-none gap-2 sm:ml-0">
                            <h3 className="text-bg w-fit text-foreground">
                                {hoursToString(Number(estimate.toFixed(2)))}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span
                                    className="-ml-[6px] grid h-8 w-8 place-items-center rounded-full bg-foreground/5 pb-[6px]
                                        text-xl font-light leading-[0rem]"
                                >
                                    ±
                                </span>
                                <p className="text-bg mb-1 w-fit text-base font-light text-foreground">
                                    {hoursToString(
                                        Number(standardDeviation.toFixed(2))
                                    )}
                                </p>
                            </div>
                        </div>
                        <button
                            className="flex w-full shrink-0 items-center gap-1 rounded bg-foreground px-3 py-2
                                font-sans text-sm font-normal text-background sm:w-fit"
                            onClick={() => {}}
                        >
                            <MessageSquareShareIcon className="-ml-1 h-4" />
                            Share estimate
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const TimeInput = ({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (val: number) => void
}) => {
    return (
        <div className="grid gap-4">
            <label
                htmlFor={label}
                className="text-bg w-fit text-lg font-medium text-foreground"
            >
                {label}
            </label>

            <div className="grid gap-3">
                <input
                    id={label}
                    min={0}
                    max={999}
                    type="number"
                    value={value}
                    onChange={(e) => {
                        const value = e.target.value.slice(0, 3) // Limit to 3 characters
                        onChange(parseInt(value))
                    }}
                    placeholder={'0'}
                    className="w-full rounded-md bg-foreground/[0.04] p-3 text-base font-normal
                        backdrop-blur-sm dark:bg-foreground/[0.018]"
                />
                {/* Status box */}
                <p className="ml-1 text-base">Hours</p>
            </div>
        </div>
    )
}
