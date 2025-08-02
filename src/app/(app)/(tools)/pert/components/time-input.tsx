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
    const [, startTransition] = useTransition()

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
        <div className="grid flex-1 gap-2">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        'bg-foreground h-[0.8rem] w-[0.8rem] rounded-full',
                        classNameDot
                    )}
                />

                <label
                    htmlFor={label}
                    className="text-bg text-foreground w-fit text-lg font-medium"
                >
                    {label}
                </label>
            </div>

            <div className="grid gap-2">
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
                    className="border-foreground/10 bg-foreground/4 dark:bg-foreground/[0.018] w-full
                        rounded-md border p-3 text-base font-normal backdrop-blur-xs"
                />
                {/* Status box */}
                <p className="text-bg ml-1 w-fit text-base font-light">Hours</p>
            </div>
        </div>
    )
}
