import { useTransition } from 'react'

export const TimeInput = ({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (val: number) => void
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
                    inputMode="decimal"
                    onChange={handleChange}
                    placeholder={'0'}
                    onFocus={handleFocus}
                    className="w-full rounded-md bg-foreground/[0.04] p-3 text-base font-normal
                        backdrop-blur-sm dark:bg-foreground/[0.018]"
                />
                {/* Status box */}
                <p className="text-bg ml-1 w-fit text-base">Hours</p>
            </div>
        </div>
    )
}
