import { useEffect } from 'react'
import { z } from 'zod'

export interface OnFirstLoadProps {
  disabled?: boolean
  onFirstLoad?: () => void
  onSubsequentLoad?: () => void
  id: string
}

const FirstLoadSchema = z.record(z.string(), z.coerce.boolean()).or(z.undefined())

export const useOnFirstLoad = ({
  disabled,
  onFirstLoad,
  onSubsequentLoad,
  id,
}: OnFirstLoadProps) => {
  useEffect(() => {
    if (disabled) return
    const savedData = sessionStorage.getItem('firstLoad')
    const parsedData = FirstLoadSchema.safeParse(savedData ? JSON.parse(savedData) : undefined)
    console.log(parsedData)

    if (!parsedData.success) return

    const firstLoadMap = parsedData.data ?? {}

    if (!firstLoadMap[id]) {
      // First load: start animation and set sessionStorage
      const newMap = { ...firstLoadMap, [id]: true }
      sessionStorage.setItem('firstLoad', JSON.stringify(newMap))
      onFirstLoad?.()
    } else {
      // Skip the animation on subsequent loads
      onSubsequentLoad?.()
    }
  }, [disabled, onFirstLoad, onSubsequentLoad, id])

  return null
}
