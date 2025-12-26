'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

export async function getGreeting(slug: string) {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'greetings',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    if (!result.docs.length) {
        return null
    }

    return result.docs[0].greeting
}
