'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

export const getProjects = async () => {
    const payload = await getPayload({ config })
    return payload.find({
        collection: 'projects',
        sort: '-completedAt',
    })
}

export const getProject = async (slug: string) => {
    const payload = await getPayload({ config })
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
