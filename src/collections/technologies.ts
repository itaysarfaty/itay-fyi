import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
    slug: 'technologies',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
    ],
}
