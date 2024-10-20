import { useTransition } from 'react'

import { cn } from '@/utils'

export const TimeInput = ({
    label,
    value,
    onChange,
    classNameDot,
}: {
    label: string
    value: number
    onChange: (val: number) => void
    classNameDot?: string
}) => {
    const [isPending, startTransition] = useTransition()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const float = parseFloat(inputValue)
        const parsedValue = isNaN(float) ? 0 : float
        startTransition(() => {
            onChange(parsedValue)
        })
    }
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
    }
    return (
        <div className="grid w-full gap-4">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        'h-[0.8rem] w-[0.8rem] rounded-full bg-foreground',
                        classNameDot
                    )}
                />

                <label
                    htmlFor={label}
                    className="text-bg w-fit text-lg font-medium text-foreground"
                >
                    {label}
                </label>
            </div>

            <div className="grid gap-3">
                <input
                    id={label}
                    min={0}
                    max={999}
                    type="number"
                    value={value}
                    inputMode="decimal"
                    onChange={handleChange}
                    placeholder={'0'}
                    onFocus={handleFocus}
                    className="w-full rounded-md border-[1px] border-foreground/10 bg-foreground/[0.04] p-3
                        text-base font-normal backdrop-blur-sm dark:bg-foreground/[0.018]"
                />
                {/* Status box */}
                <p className="text-bg ml-1 w-fit text-base font-light">Hours</p>
            </div>
        </div>
    )
}
