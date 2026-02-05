'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ComponentProps } from 'react'

import { Media } from '@/payload-types'

import { getMedia } from '@/actions/get-media'

type PayloadMediaOptions = Partial<ComponentProps<typeof Image>>

export const PayloadMedia = ({
    image,
    options,
}: {
    image: number | Media | null | undefined
    options?: PayloadMediaOptions
}) => {
    const [media, setMedia] = useState<Media | null>(
        typeof image === 'object' && image !== null ? image : null
    )
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (image == null || typeof image !== 'number') return
        const fetchMedia = async () => {
            setLoading(true)
            const fetchedMedia = await getMedia(image)
            setMedia(fetchedMedia)
            setLoading(false)
        }
        fetchMedia()
    }, [image])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2Icon className="h-10 w-10 animate-spin text-border" />
            </div>
        )
    }

    if (!media || !media.url) {
        return null
    }

    return <Image src={media.url} alt={media.alt} {...options} />
}
