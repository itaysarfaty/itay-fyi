import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

import {
    HTMLConverterFeature,
    lexicalEditor,
    lexicalHTML,
} from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
    },
    disableDuplicate: true,
    hooks: {
        afterDelete: [
            async ({ doc }) => {
                revalidatePath(`/projects`)
                revalidatePath(`/projects/${doc.slug}`)
            },
        ],
        afterChange: [
            async ({ doc }) => {
                revalidatePath(`/projects`)
                revalidatePath(`/projects/${doc.slug}`)
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
            type: 'text',
            required: true,
        },
        {
            name: 'completedAt',
            type: 'date',
            required: true,
        },
        {
            name: 'summary',
            type: 'textarea',
            required: true,
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
        {
            name: 'technologies',
            type: 'relationship',
            relationTo: 'technologies',
            hasMany: true,
        },
        {
            name: 'url',
            label: 'Project URL',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'previewImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Preview',
        },
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('content', { name: 'content_html' }),
    ],
}
