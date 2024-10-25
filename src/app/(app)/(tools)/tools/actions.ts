'use server'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export const getTools = async () => {
    const payload = await getPayloadHMR({ config })
    return payload.find({
        collection: 'tools',
    })
}
