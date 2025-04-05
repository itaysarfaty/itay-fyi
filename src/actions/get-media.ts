'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

export const getMedia = async (id: number) => {
    const payload = await getPayload({ config })
    return payload.findByID({
        collection: 'media',
        id,
    })
}
