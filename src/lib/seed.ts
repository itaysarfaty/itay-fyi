import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config })

  const articles = [
    {
      title: 'Introduction to React',
      tag: 'React',
      link: 'https://example.com/introduction-to-react',
    },
    {
      title: 'React Component Lifecycle',
      tag: 'React Lifecycle',
      link: 'https://example.com/react-component-lifecycle',
    },
    {
      title: 'State and Props in React',
      tag: 'React State Props',
      link: 'https://example.com/state-and-props-in-react',
    },
    {
      title: 'Handling Events in React',
      tag: 'React Events',
      link: 'https://example.com/handling-events-in-react',
    },
    {
      title: 'React Hooks: An Introduction',
      tag: 'React Hooks',
      link: 'https://example.com/react-hooks-introduction',
    },
    {
      title: 'Building Forms in React',
      tag: 'React Forms',
      link: 'https://example.com/building-forms-in-react',
    },
    {
      title: 'React Context API',
      tag: 'React Context',
      link: 'https://example.com/react-context-api',
    },
    {
      title: 'React Router: Navigation in React',
      tag: 'React Router',
      link: 'https://example.com/react-router-navigation',
    },
    {
      title: 'Optimizing Performance in React',
      tag: 'React Performance',
      link: 'https://example.com/optimizing-performance-in-react',
    },
    {
      title: 'Testing React Applications',
      tag: 'React Testing',
      link: 'https://example.com/testing-react-applications',
    },
  ]

  for (const article of articles) {
    await payload.create({
      collection: 'articles',
      data: article,
    })
  }
}

seed()
  .then(() => console.info('✅ Database seeded successfully'))
  .catch((e) => console.error('⛔️ Failed to seed ->', e))
