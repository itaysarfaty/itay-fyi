import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

import { generateRandomString } from '@/utils'

export const Greetings: CollectionConfig = {
    slug: 'greetings',
    admin: {
        // useAsTitle: 'title',
    },
    hooks: {
        afterDelete: [
            async ({ doc }) => {
                revalidatePath(`/g/${doc.slug}`)
            },
        ],
        afterChange: [
            async ({ doc }) => {
                revalidatePath(`/g/${doc.slug}`)
            },
        ],
        beforeValidate: [
            async ({ data }) => {
                if (data && 'slug' in data && !data.slug) {
                    data.slug = generateRandomString()
                }
                return data
            },
        ],
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            unique: true,
            defaultValue: generateRandomString,
        },
        {
            name: 'greeting',
            type: 'textarea',
            required: true,
            defaultValue: '',
        },
    ],
}
