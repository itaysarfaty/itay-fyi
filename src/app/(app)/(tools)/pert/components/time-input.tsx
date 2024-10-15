export const TimeInput = ({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (val: number) => void
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^\d{0,3}(\.\d{0,2})?$/
        const inputValue = e.target.value
        if (regex.test(inputValue)) {
            const float = parseFloat(inputValue)
            const parsedValue = isNaN(float) ? 0 : float
            onChange(parsedValue)
        }
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
                    onChange={handleChange}
                    placeholder={'0'}
                    className="w-full rounded-md bg-foreground/[0.04] p-3 text-base font-normal
                        backdrop-blur-sm dark:bg-foreground/[0.018]"
                />
                {/* Status box */}
                <p className="text-bg ml-1 w-fit text-base">Hours</p>
            </div>
        </div>
    )
}
