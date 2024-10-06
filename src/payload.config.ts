import 'dotenv/config'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Media } from './collections/media'
import { Projects } from './collections/projects'
import { Technologies } from './collections/technologies'
import { Users } from './collections/users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        autoLogin:
            process.env.NODE_ENV === 'development'
                ? {
                      email: 'itaysarfaty@gmail.com',
                      password: 'password',
                  }
                : false,

        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Projects, Technologies, Users, Media],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: sqliteAdapter({
        client: {
            authToken: process.env.DATABASE_AUTH_TOKEN || '',
            url: process.env.DATABASE_URI || '',
        },
    }),
    sharp,
    plugins: [
        vercelBlobStorage({
            enabled: true, // Optional, defaults to true
            // Specify which collections should use Vercel Blob
            collections: {
                [Media.slug]: true,
            },
            // Token provided by Vercel once Blob storage is added to your Vercel project
            token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
        }),
    ],
})
