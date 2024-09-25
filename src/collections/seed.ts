import { getPayload } from 'payload'

import config from '@payload-config'

const seed = async () => {
    const payload = await getPayload({ config })
}
seed()
    .then(() => console.info('✅ Database seeded successfully'))
    .catch((e) => console.error('⛔️ Failed to seed ->', e))
