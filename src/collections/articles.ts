import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'tag',
      label: 'Tag',
      type: 'text',
      required: true,
    },

    {
      name: 'link',
      label: 'Link',
      type: 'text',
      required: true,
      validate: (value) => {
        const urlPattern = /^(http|https):\/\/[^ "]+$/
        return urlPattern.test(value) ? true : 'Invalid URL format'
      },
    },
  ],
}
