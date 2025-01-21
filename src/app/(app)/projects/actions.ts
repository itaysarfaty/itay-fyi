'use server'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export const getProjects = async () => {
    const payload = await getPayloadHMR({ config })
    return payload.find({
        collection: 'projects',
        sort: 'completedAt',
    })
}

export const getProject = async (slug: string) => {
    const payload = await getPayloadHMR({ config })
    const res = await payload.find({
        collection: 'projects',
        limit: 1,
        where: {
            slug: {
                equals: slug,
            },
        },
    })
    return res.docs[0]
}
