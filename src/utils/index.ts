import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

export function generateRandomString(length = 5) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
    if (crypto && typeof crypto.getRandomValues === 'function') {
        const arr = new Uint8Array(length)
        crypto.getRandomValues(arr)
        return Array.from(arr)
            .map((b) => chars[b % 36])
            .join('')
    }

    // Fallback (not cryptographically secure)
    return Math.random()
        .toString(36)
        .slice(2, 2 + length)
}
