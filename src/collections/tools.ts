import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
    slug: 'tools',
    admin: {
        useAsTitle: 'title',
    },
    disableDuplicate: true,
    hooks: {
        afterDelete: [
            async () => {
                revalidatePath(`/tools`)
            },
        ],
        afterChange: [
            async () => {
                revalidatePath(`/tools`)
            },
        ],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'actionLabel',
            label: 'Action Label',
            type: 'text',
            required: false,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
