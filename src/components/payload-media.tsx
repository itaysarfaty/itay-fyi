'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ComponentProps } from 'react'

import { Media } from '@/payload-types'

import { getMedia } from '@/actions/get-media'

type PayloadMediaOptions = Partial<ComponentProps<typeof Image>>

const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL

function getImageUrl(media: Media): string | null {
    if (blobBaseUrl && media.filename) {
        return `${blobBaseUrl}/${encodeURIComponent(media.filename)}`
    }
    return media.url ?? null
}

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

    if (!media) {
        return null
    }

    const src = getImageUrl(media)
    if (!src) {
        return null
    }

    return <Image src={src} alt={media.alt} {...options} />
}
