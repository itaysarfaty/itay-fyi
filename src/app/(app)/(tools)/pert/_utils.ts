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

const calculateHours = (best: number, likely: number, worst: number) => {
    const estimate = (best + 4 * likely + worst) / 6
    const standardDeviation = (worst - best) / 6
    return {
        estimate,
        standardDeviation,
    }
}

export const pertUtils = {
    hoursToString,
    calculateHours,
}
