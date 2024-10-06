'use server'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export const getMedia = async (id: number) => {
    const payload = await getPayloadHMR({ config })
    return payload.findByID({
        collection: 'media',
        id,
    })
}
