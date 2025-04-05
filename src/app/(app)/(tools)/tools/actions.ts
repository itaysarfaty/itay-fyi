'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

export const getTools = async () => {
    const payload = await getPayload({ config })
    return payload.find({
        collection: 'tools',
    })
}
